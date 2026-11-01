import crypto from 'node:crypto';
import net from 'node:net';
import tls from 'node:tls';

/**
 * In-memory per-IP rate limiting window (sliding 10-minute window, max 8 requests per IP).
 */
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const ipRequestTimestamps = new Map();

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com',
  '10minutemail.com',
  'tempmail.com',
  'guerrillamail.com',
  'yopmail.com',
  'trashmail.com',
  'sharklasers.com',
]);

const ALLOWED_ERP_SYSTEMS = new Set([
  'Microsoft Dynamics 365 Finance & Operations',
  'Microsoft Dynamics 365 Business Central',
  'Custom ERP / In-House Billing',
  'POS / Retail Billing System',
  'SAP S/4HANA or SAP ECC (via API Middleware)',
  'Oracle NetSuite or EBS (via API Middleware)',
  'Other ERP / Accounting Platform',
]);

function stripHtmlAndControlChars(value, maxLength = 500) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function validateSaudiOrInternationalPhone(rawPhone) {
  if (typeof rawPhone !== 'string') {
    return { valid: false, normalized: '' };
  }
  const cleaned = rawPhone.replace(/[\s\-().]/g, '');
  // Accept Saudi mobile/landline (+9665XXXXXXXX, 009665XXXXXXXX, 9665XXXXXXXX, 05XXXXXXXX, +9661XXXXXXXX)
  // or valid E.164 international business numbers (+ followed by 8 to 15 digits, not all identical digits)
  const saudiRegex = /^(?:\+?966|00966|0)?(5\d{8}|1[1-9]\d{7})$/;
  const intlRegex = /^\+?[1-9]\d{7,14}$/;

  if (/^(\d)\1+$/.test(cleaned.replace(/^\+/, ''))) {
    return { valid: false, normalized: cleaned };
  }

  const saudiMatch = cleaned.match(saudiRegex);
  if (saudiMatch) {
    return { valid: true, normalized: `+966${saudiMatch[1]}`, isSaudi: true };
  }

  if (intlRegex.test(cleaned)) {
    return {
      valid: true,
      normalized: cleaned.startsWith('+') ? cleaned : `+${cleaned}`,
      isSaudi: cleaned.startsWith('+966') || cleaned.startsWith('966'),
    };
  }

  return { valid: false, normalized: cleaned };
}

function validateBusinessEmail(rawEmail) {
  if (typeof rawEmail !== 'string') return { valid: false, reason: 'Email is required.' };
  const email = rawEmail.trim().toLowerCase();
  if (email.length > 160) {
    return { valid: false, reason: 'Email address exceeds maximum length.' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    return { valid: false, reason: 'Please enter a valid business email address.' };
  }
  const domain = email.split('@')[1];
  if (!domain || DISPOSABLE_EMAIL_DOMAINS.has(domain)) {
    return {
      valid: false,
      reason: 'Disposable email addresses are not accepted. Please use your corporate email.',
    };
  }
  return { valid: true, email };
}

function sanitizeUtmAttribution(rawUtm) {
  if (!rawUtm || typeof rawUtm !== 'object') {
    return {};
  }
  const allowedKeys = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'gclid',
    'landing_page',
    'referrer',
    'captured_at',
  ];
  const clean = {};
  for (const key of allowedKeys) {
    if (typeof rawUtm[key] === 'string' && rawUtm[key].trim() !== '') {
      // Redact any accidental email or phone from UTM parameters
      const redacted = stripHtmlAndControlChars(rawUtm[key], 120)
        .replace(/[^\s@]+@[^\s@]+\.[^\s@]+/g, '[redacted-email]')
        .replace(/\+?\d[\d\s\-()]{7,16}\d/g, '[redacted-phone]');
      clean[key] = redacted;
    }
  }
  return clean;
}

export function validateEnquiryPayload(body) {
  const fieldErrors = {};

  if (!body || typeof body !== 'object') {
    return {
      valid: false,
      isSpam: false,
      fieldErrors: { form: 'Invalid JSON request payload.' },
    };
  }

  // 1. Honeypot check (server-side anti-spam enforcement)
  const honeypot = typeof body.honeypotWebsite === 'string' ? body.honeypotWebsite.trim() : '';
  if (honeypot !== '') {
    return {
      valid: false,
      isSpam: true,
      fieldErrors: { honeypotWebsite: 'Automated spam submission rejected.' },
    };
  }

  // 2. Company Name
  const companyName = stripHtmlAndControlChars(body.companyName, 160);
  if (!companyName || companyName.length < 2) {
    fieldErrors.companyName = 'Please enter your company or legal entity name (minimum 2 characters).';
  }

  // 3. Contact Person's Name
  const contactName = stripHtmlAndControlChars(body.contactName, 120);
  if (!contactName || contactName.length < 2) {
    fieldErrors.contactName = 'Please enter the contact person’s full name.';
  }

  // 4. Business Email
  const emailCheck = validateBusinessEmail(body.email);
  if (!emailCheck.valid) {
    fieldErrors.email = emailCheck.reason;
  }

  // 5. Saudi / International Phone Number
  const phoneCheck = validateSaudiOrInternationalPhone(body.phone);
  if (!phoneCheck.valid) {
    fieldErrors.phone =
      'Please enter a valid Saudi (+966 5X XXX XXXX) or international business phone number.';
  }

  // 6. ERP / Accounting System
  const erpSystem = stripHtmlAndControlChars(body.erpSystem, 120);
  if (!erpSystem || !ALLOWED_ERP_SYSTEMS.has(erpSystem)) {
    fieldErrors.erpSystem = 'Please select a valid ERP, POS, or accounting system from the list.';
  }

  // 7. Monthly Invoice Volume
  const invoiceVolume = stripHtmlAndControlChars(body.invoiceVolume, 80);
  if (!invoiceVolume) {
    fieldErrors.invoiceVolume = 'Please select your approximate monthly invoice volume.';
  }

  // 8. Number of Branches
  const branchCount = stripHtmlAndControlChars(body.branchCount, 80);
  if (!branchCount) {
    fieldErrors.branchCount = 'Please select the number of branches or VAT group entities.';
  }

  // 9. Integration Requirement
  const integrationRequirement = stripHtmlAndControlChars(body.integrationRequirement, 3000);
  if (!integrationRequirement || integrationRequirement.length < 10) {
    fieldErrors.integrationRequirement =
      'Please describe your integration requirement (minimum 10 characters).';
  }

  // 10. Explicit Consent
  if (body.consent !== true) {
    fieldErrors.consent =
      'Explicit consent is required so our engineering team can process and respond to your enquiry.';
  }

  const sourcePage = stripHtmlAndControlChars(body.sourcePage || '/products/zatca-connect', 150);
  const utm = sanitizeUtmAttribution(body.utm);

  return {
    valid: Object.keys(fieldErrors).length === 0,
    isSpam: false,
    fieldErrors,
    sanitizedData: {
      companyName,
      contactName,
      email: emailCheck.email || '',
      phone: phoneCheck.normalized || '',
      isSaudiPhone: Boolean(phoneCheck.isSaudi),
      erpSystem,
      invoiceVolume,
      branchCount,
      integrationRequirement,
      consent: body.consent === true,
      sourcePage,
      utm,
    },
  };
}

function buildEmailContent(enquiry, enquiryId, submittedAt) {
  const recipient = process.env.ZATCA_LEAD_RECIPIENT_EMAIL || 'amd@sakytek.com';
  const subject = `[ZATCA Phase 2 Demo Enquiry] ${enquiry.companyName} — ${enquiry.erpSystem} (${enquiryId.slice(0, 8)})`;

  const utmLines = [
    `utm_source: ${enquiry.utm.utm_source || 'direct'}`,
    `utm_medium: ${enquiry.utm.utm_medium || 'none'}`,
    `utm_campaign: ${enquiry.utm.utm_campaign || 'none'}`,
    `utm_term: ${enquiry.utm.utm_term || 'none'}`,
    `utm_content: ${enquiry.utm.utm_content || 'none'}`,
    `gclid: ${enquiry.utm.gclid || 'none'}`,
    `landing_page: ${enquiry.utm.landing_page || enquiry.sourcePage}`,
    `referrer: ${enquiry.utm.referrer || 'direct'}`,
    `captured_at: ${enquiry.utm.captured_at || submittedAt}`,
  ].join('\n');

  const text = [
    'SAKY TECHNOLOGIES — ZATCA CONNECT PHASE 2 TECHNICAL DEMO ENQUIRY',
    '================================================================',
    `Enquiry Reference ID : ${enquiryId}`,
    `Submitted At (UTC)   : ${submittedAt}`,
    `Source Page          : ${enquiry.sourcePage}`,
    '',
    '1. CUSTOMER & COMPANY PROFILE',
    '-----------------------------',
    `Company Name         : ${enquiry.companyName}`,
    `Contact Person       : ${enquiry.contactName}`,
    `Business Email       : ${enquiry.email}`,
    `Business Phone       : ${enquiry.phone} (${enquiry.isSaudiPhone ? 'Saudi Arabia +966' : 'International'})`,
    `Consent Confirmed    : ${enquiry.consent ? 'YES (Explicit Checkbox Consent)' : 'NO'}`,
    '',
    '2. ERP & ZATCA PHASE 2 SCOPE',
    '----------------------------',
    `ERP / System         : ${enquiry.erpSystem}`,
    `Monthly Volume       : ${enquiry.invoiceVolume}`,
    `Branches / Entities  : ${enquiry.branchCount}`,
    '',
    '3. INTEGRATION REQUIREMENT DETAILS',
    '----------------------------------',
    enquiry.integrationRequirement,
    '',
    '4. UTM & CAMPAIGN ATTRIBUTION',
    '-----------------------------',
    utmLines,
    '================================================================',
  ].join('\n');

  const html = `
    <div style="font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 680px; margin: 0 auto; color: #1e293b; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
      <div style="background: #0d83fd; color: #ffffff; padding: 20px 24px;">
        <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; opacity: 0.9; font-weight: 700;">Saky ZATCA Connect · KSA Lead Desk</div>
        <h2 style="margin: 6px 0 0; font-size: 20px;">ZATCA Phase 2 Technical Demo Enquiry</h2>
      </div>
      <div style="padding: 24px;">
        <p style="margin: 0 0 16px; font-size: 13px; color: #475569;">
          Reference ID: <strong>${escapeHtml(enquiryId)}</strong> · Submitted: <strong>${escapeHtml(submittedAt)}</strong>
        </p>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
          <tr><td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9; font-weight: 600; width: 38%; background: #f8fafc;">Company Name</td><td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9;">${escapeHtml(enquiry.companyName)}</td></tr>
          <tr><td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9; font-weight: 600; background: #f8fafc;">Contact Person</td><td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9;">${escapeHtml(enquiry.contactName)}</td></tr>
          <tr><td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9; font-weight: 600; background: #f8fafc;">Business Email</td><td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${escapeHtml(enquiry.email)}">${escapeHtml(enquiry.email)}</a></td></tr>
          <tr><td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9; font-weight: 600; background: #f8fafc;">Phone Number</td><td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9;">${escapeHtml(enquiry.phone)}</td></tr>
          <tr><td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9; font-weight: 600; background: #f8fafc;">ERP / Accounting System</td><td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9;"><strong>${escapeHtml(enquiry.erpSystem)}</strong></td></tr>
          <tr><td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9; font-weight: 600; background: #f8fafc;">Monthly Invoice Volume</td><td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9;">${escapeHtml(enquiry.invoiceVolume)}</td></tr>
          <tr><td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9; font-weight: 600; background: #f8fafc;">Branches / Entities</td><td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9;">${escapeHtml(enquiry.branchCount)}</td></tr>
          <tr><td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9; font-weight: 600; background: #f8fafc;">Source Page</td><td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9;">${escapeHtml(enquiry.sourcePage)}</td></tr>
          <tr><td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9; font-weight: 600; background: #f8fafc;">Consent Confirmed</td><td style="padding: 8px 12px; border-bottom: 1px solid #f1f5f9;">Yes (Explicit)</td></tr>
        </table>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-bottom: 20px;">
          <div style="font-size: 12px; font-weight: 700; text-transform: uppercase; color: #0d83fd; margin-bottom: 6px;">Integration Requirement &amp; Scope</div>
          <div style="font-size: 14px; white-space: pre-wrap; line-height: 1.5;">${escapeHtml(enquiry.integrationRequirement)}</div>
        </div>
        <div style="background: #f1f5f9; border-radius: 8px; padding: 12px; font-size: 12px; font-family: monospace; color: #334155;">
          <strong>UTM &amp; Attribution Metadata:</strong><br/>
          utm_source=${escapeHtml(enquiry.utm.utm_source || 'direct')} | utm_medium=${escapeHtml(enquiry.utm.utm_medium || 'none')} | utm_campaign=${escapeHtml(enquiry.utm.utm_campaign || 'none')} | utm_term=${escapeHtml(enquiry.utm.utm_term || 'none')} | utm_content=${escapeHtml(enquiry.utm.utm_content || 'none')} | gclid=${escapeHtml(enquiry.utm.gclid || 'none')} | landing_page=${escapeHtml(enquiry.utm.landing_page || enquiry.sourcePage)}
        </div>
      </div>
    </div>
  `.trim();

  return { recipient, subject, text, html };
}

/**
 * Minimal RFC-5321 SMTP client over TLS (port 465) using Node built-in `tls`/`net`
 * so SMTP delivery works in serverless environments without external dependencies.
 */
async function sendViaNativeSmtp({ host, port, user, pass, from, to, replyTo, subject, text, html }) {
  return new Promise((resolve, reject) => {
    const portNum = Number(port) || 465;
    const useImplicitTls = portNum === 465;
    let buffer = '';
    let step = 0;

    const boundary = `----=_Part_${crypto.randomBytes(8).toString('hex')}`;
    const mimeMessage = [
      `From: "Saky ZATCA Connect Desk" <${from}>`,
      `To: <${to}>`,
      `Reply-To: <${replyTo}>`,
      `Subject: ${subject.replace(/[\r\n]/g, ' ')}`,
      `Date: ${new Date().toUTCString()}`,
      `Message-ID: <${crypto.randomUUID()}@sakytek.com>`,
      'MIME-Version: 1.0',
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
      '',
      `--${boundary}`,
      'Content-Type: text/plain; charset=utf-8',
      'Content-Transfer-Encoding: 8bit',
      '',
      text,
      '',
      `--${boundary}`,
      'Content-Type: text/html; charset=utf-8',
      'Content-Transfer-Encoding: 8bit',
      '',
      html,
      '',
      `--${boundary}--`,
      '.',
      '',
    ].join('\r\n');

    const socket = useImplicitTls
      ? tls.connect({ host, port: portNum, servername: host })
      : net.createConnection({ host, port: portNum });

    socket.setTimeout(12000, () => {
      socket.destroy();
      reject(new Error('SMTP connection timed out'));
    });

    socket.on('error', (err) => reject(err));

    socket.on('data', (chunk) => {
      buffer += chunk.toString('utf8');
      const lines = buffer.split('\r\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line) continue;
        const code = parseInt(line.slice(0, 3), 10);
        const isLastLine = line[3] === ' ' || line.length === 3;
        if (!isLastLine) continue;

        if (code >= 400) {
          socket.end();
          return reject(new Error(`SMTP Error ${code}: ${line}`));
        }

        if (step === 0 && code === 220) {
          step = 1;
          socket.write(`EHLO sakytek.com\r\n`);
        } else if (step === 1 && code === 250) {
          step = 2;
          socket.write(`AUTH LOGIN\r\n`);
        } else if (step === 2 && code === 334) {
          step = 3;
          socket.write(`${Buffer.from(user, 'utf8').toString('base64')}\r\n`);
        } else if (step === 3 && code === 334) {
          step = 4;
          socket.write(`${Buffer.from(pass, 'utf8').toString('base64')}\r\n`);
        } else if (step === 4 && code === 235) {
          step = 5;
          socket.write(`MAIL FROM:<${from}>\r\n`);
        } else if (step === 5 && code === 250) {
          step = 6;
          socket.write(`RCPT TO:<${to}>\r\n`);
        } else if (step === 6 && code === 250) {
          step = 7;
          socket.write(`DATA\r\n`);
        } else if (step === 7 && code === 354) {
          step = 8;
          socket.write(mimeMessage);
        } else if (step === 8 && code === 250) {
          step = 9;
          socket.write(`QUIT\r\n`);
          socket.end();
          return resolve({ provider: 'smtp', providerId: line.trim() });
        }
      }
    });
  });
}

async function deliverEnquiry({ enquiry, enquiryId, submittedAt }) {
  const { recipient, subject, text, html } = buildEmailContent(enquiry, enquiryId, submittedAt);
  const fromAddress = process.env.ZATCA_LEAD_FROM_EMAIL || 'noreply@sakytek.com';

  // Provider 1: Resend API (RESEND_API_KEY)
  if (process.env.RESEND_API_KEY) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Saky ZATCA Connect <${fromAddress}>`,
        to: [recipient],
        reply_to: enquiry.email,
        subject,
        text,
        html,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(`Resend delivery failed (HTTP ${res.status}): ${data.message || 'Unknown error'}`);
    }
    return { provider: 'resend', deliveryId: data.id || enquiryId, recipient };
  }

  // Provider 2: SendGrid API (SENDGRID_API_KEY)
  if (process.env.SENDGRID_API_KEY) {
    const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: recipient }], subject }],
        from: { email: fromAddress, name: 'Saky ZATCA Connect' },
        reply_to: { email: enquiry.email, name: enquiry.contactName },
        content: [
          { type: 'text/plain', value: text },
          { type: 'text/html', value: html },
        ],
      }),
    });
    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      throw new Error(`SendGrid delivery failed (HTTP ${res.status}): ${errText.slice(0, 200)}`);
    }
    const messageId = res.headers.get('x-message-id') || enquiryId;
    return { provider: 'sendgrid', deliveryId: messageId, recipient };
  }

  // Provider 3: Brevo API (BREVO_API_KEY)
  if (process.env.BREVO_API_KEY) {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Saky ZATCA Connect', email: fromAddress },
        to: [{ email: recipient, name: 'Saky Technologies Lead Desk' }],
        replyTo: { email: enquiry.email, name: enquiry.contactName },
        subject,
        textContent: text,
        htmlContent: html,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(`Brevo delivery failed (HTTP ${res.status}): ${data.message || 'Unknown error'}`);
    }
    return { provider: 'brevo', deliveryId: data.messageId || enquiryId, recipient };
  }

  // Provider 4: Native SMTP (SMTP_HOST, SMTP_USER, SMTP_PASS)
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    const smtpRes = await sendViaNativeSmtp({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 465,
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: recipient,
      replyTo: enquiry.email,
      subject,
      text,
      html,
    });
    return { provider: 'smtp', deliveryId: smtpRes.providerId || enquiryId, recipient };
  }

  // Provider 5: Configured Lead Webhook / CRM Endpoint (ZATCA_LEAD_WEBHOOK_URL)
  if (process.env.ZATCA_LEAD_WEBHOOK_URL) {
    const res = await fetch(process.env.ZATCA_LEAD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.ZATCA_LEAD_WEBHOOK_SECRET
          ? { 'X-Webhook-Secret': process.env.ZATCA_LEAD_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify({
        enquiryId,
        submittedAt,
        recipient,
        subject,
        enquiry,
      }),
    });
    if (!res.ok) {
      throw new Error(`Lead webhook delivery failed (HTTP ${res.status})`);
    }
    return { provider: 'webhook', deliveryId: enquiryId, recipient };
  }

  // Provider 6: FormSubmit AJAX Endpoint for amd@sakytek.com (if ZATCA_ENABLE_FORMSUBMIT === 'true')
  if (process.env.ZATCA_ENABLE_FORMSUBMIT === 'true') {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: 'https://sakytek.com',
        Referer: 'https://sakytek.com/products/zatca-connect',
      },
      body: JSON.stringify({
        _subject: subject,
        _template: 'table',
        enquiry_id: enquiryId,
        submitted_at: submittedAt,
        company_name: enquiry.companyName,
        contact_name: enquiry.contactName,
        business_email: enquiry.email,
        phone_number: enquiry.phone,
        erp_system: enquiry.erpSystem,
        monthly_invoice_volume: enquiry.invoiceVolume,
        branch_count: enquiry.branchCount,
        integration_requirement: enquiry.integrationRequirement,
        source_page: enquiry.sourcePage,
        utm_source: enquiry.utm.utm_source || 'direct',
        utm_medium: enquiry.utm.utm_medium || 'none',
        utm_campaign: enquiry.utm.utm_campaign || 'none',
        utm_term: enquiry.utm.utm_term || 'none',
        utm_content: enquiry.utm.utm_content || 'none',
        gclid: enquiry.utm.gclid || 'none',
        landing_page: enquiry.utm.landing_page || enquiry.sourcePage,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.success === 'false' || data.success === false) {
      throw new Error(data.message || `FormSubmit delivery failed (HTTP ${res.status})`);
    }
    return { provider: 'formsubmit', deliveryId: enquiryId, recipient };
  }

  // No delivery transport configured — fail honestly with 503
  const err = new Error(
    'Lead delivery transport is not configured on the server (missing RESEND_API_KEY, SENDGRID_API_KEY, BREVO_API_KEY, or SMTP_HOST/SMTP_USER/SMTP_PASS).'
  );
  err.code = 'DELIVERY_NOT_CONFIGURED';
  throw err;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({
      ok: false,
      code: 'METHOD_NOT_ALLOWED',
      message: 'Only POST requests are accepted on /api/zatca-enquiry.',
    });
  }

  // Check simulated failure header for automated failure-scenario testing
  const simulateFailure =
    req.headers['x-simulate-delivery-failure'] === '1' ||
    req.headers['x-simulate-delivery-failure'] === 'true';

  // Rate limiting per IP
  const clientIp =
    (req.headers['x-forwarded-for'] || '').toString().split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  const now = Date.now();
  const timestamps = (ipRequestTimestamps.get(clientIp) || []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );
  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    return res.status(429).json({
      ok: false,
      code: 'RATE_LIMITED',
      message: 'Too many enquiry attempts from this network. Please wait a few minutes or email amd@sakytek.com.',
    });
  }

  let parsedBody = req.body;
  if (typeof parsedBody === 'string') {
    try {
      parsedBody = JSON.parse(parsedBody);
    } catch {
      return res.status(400).json({
        ok: false,
        code: 'INVALID_JSON',
        message: 'Request body must be valid JSON.',
      });
    }
  }

  const validation = validateEnquiryPayload(parsedBody);

  if (validation.isSpam) {
    return res.status(400).json({
      ok: false,
      code: 'SPAM_DETECTED',
      message: 'Submission rejected by automated spam protection.',
    });
  }

  if (!validation.valid) {
    return res.status(422).json({
      ok: false,
      code: 'VALIDATION_ERROR',
      message: 'Please correct the highlighted fields and try again.',
      fieldErrors: validation.fieldErrors,
    });
  }

  if (simulateFailure) {
    return res.status(502).json({
      ok: false,
      code: 'DELIVERY_FAILED',
      message:
        'Simulated upstream email gateway failure: enquiry could not be delivered to amd@sakytek.com.',
    });
  }

  const enquiryId = crypto.randomUUID();
  const submittedAt = new Date().toISOString();

  try {
    const deliveryResult = await deliverEnquiry({
      enquiry: validation.sanitizedData,
      enquiryId,
      submittedAt,
    });

    timestamps.push(now);
    ipRequestTimestamps.set(clientIp, timestamps);

    return res.status(200).json({
      ok: true,
      enquiryId,
      deliveryId: deliveryResult.deliveryId,
      provider: deliveryResult.provider,
      recipient: deliveryResult.recipient,
      submittedAt,
      attributionReceived: {
        sourcePage: validation.sanitizedData.sourcePage,
        utm_source: validation.sanitizedData.utm.utm_source || 'direct',
        utm_medium: validation.sanitizedData.utm.utm_medium || 'none',
        utm_campaign: validation.sanitizedData.utm.utm_campaign || 'none',
        utm_term: validation.sanitizedData.utm.utm_term || 'none',
        utm_content: validation.sanitizedData.utm.utm_content || 'none',
        gclid: validation.sanitizedData.utm.gclid || 'none',
        landing_page:
          validation.sanitizedData.utm.landing_page || validation.sanitizedData.sourcePage,
      },
    });
  } catch (err) {
    const statusCode = err?.code === 'DELIVERY_NOT_CONFIGURED' ? 503 : 502;
    return res.status(statusCode).json({
      ok: false,
      code: err?.code || 'DELIVERY_FAILED',
      message:
        'We could not confirm delivery of your enquiry to our engineering desk at this moment. Please email amd@sakytek.com or call +65 6776 7822 directly.',
      reason: process.env.NODE_ENV !== 'production' ? err?.message : undefined,
    });
  }
}

