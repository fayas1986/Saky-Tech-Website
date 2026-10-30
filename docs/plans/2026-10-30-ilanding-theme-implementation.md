# iLanding Theme Implementation Plan for Saky Technologies

> **For Claude / Agent:** REQUIRED SUB-SKILL: Use executing-plans to implement this plan task-by-task.

**Goal:** Re-architect and restyle Saky Technologies enterprise website to adopt the iLanding modern, high-converting light SaaS design system (palette, typography, hero with stats cards, tabbed feature pillars, 4-box feature cards, vertical mockup showcase, testimonials, FAQ, contact cards, and footer) using React 19, TypeScript, and Tailwind CSS.

**Architecture:** Maintain existing React Router single-page app structure and strong data models in `data/`, while replacing the previous dark theme with iLanding's clean light design tokens (`#0d83fd` primary, `#2d465e` headings, `#f3f9ff` soft background, rounded cards, elevation shadows, and SVG decorative shapes). Integrate image assets directly from `public/assets/img/`.

**Tech Stack:** React 19, TypeScript, Tailwind CSS, Vite, Lucide React, Recharts.

---

### Task 1: Design Tokens & Typography Setup in `index.html` and `index.css`
**Files:**
- Modify: `index.html`
- Modify: `index.css`
- Modify: `App.tsx`

**Steps:**
1. Import `Nunito` and `Inter` Google Fonts in `index.html`.
2. Configure Tailwind theme extensions with iLanding's color tokens (`primary: #0d83fd`, `heading: #2d465e`, `body: #212529`, `surface: #ffffff`, `lightBg: #f3f9ff`).
3. Set base light scrollbar and outline focus colors in `index.css`.
4. Update `App.tsx` container to use light background (`bg-white text-slate-800`).

---

### Task 2: Navbar & Header Component
**Files:**
- Modify: `components/Navbar.tsx`

**Steps:**
1. Update top bar styling to iLanding's sticky white navbar with subtle glass blur and fine shadow.
2. Ensure logo displays Saky Technologies with dark navy text and blue accent mark.
3. Style desktop navigation links with hover states and active indicators.
4. Style dropdown menus for Products and Solutions with clean white cards and icons.
5. Add iLanding-style primary CTA button ("Contact Us" / "Book Consultation").
6. Verify responsive mobile menu with backdrop blur and accessible toggles.

---

### Task 3: Hero Section with Stats Bar & Customer Badges
**Files:**
- Modify: `components/Hero.tsx`

**Steps:**
1. Replace dark background with clean light background (`bg-gradient-to-b from-blue-50/50 via-white to-white`).
2. Implement pill badge ("Working for your success / Enterprise B2B Software & ERP").
3. Implement prominent headline with accent color and clear positioning copy.
4. Add dual CTAs: Primary blue button ("Discuss Requirements") and secondary outline link with icon ("Explore Products").
5. Implement right column hero illustration (`/assets/img/illustration-1.webp`) with floating customer avatars social proof badge (`/assets/img/avatar-1.webp` to `avatar-5.webp`).
6. Implement 4-card stats row at the bottom with trophy, briefcase, graph, and award metrics.

---

### Task 4: Offerings Pillars & Interactive Tabbed Showcase
**Files:**
- Modify: `components/OfferingsPillars.tsx`

**Steps:**
1. Implement iLanding-style tabbed nav (Tab 1: SaaS Products, Tab 2: Dynamics 365 ERP, Tab 3: Custom Engineering & BI).
2. For each active tab, display 2-column layout: Left column with title, subtitle, checkmark capabilities list, and CTA; Right column with corresponding illustration (`features-illustration-1.webp`, etc.).
3. Add 4-colored feature boxes grid (Orange, Blue, Green, Red) highlighting compliance, ERP connectors, scalability, and security.

---

### Task 5: 7 SaaS Products Showcase
**Files:**
- Modify: `components/Products.tsx`

**Steps:**
1. Set section background to alternating light blue (`bg-[#f3f9ff]`).
2. Display product cards with iLanding service card styling (white surface, icon box, title, description, badge, metrics, and "Explore Product ->" link).
3. Ensure filter tags (All, Compliance, Operations, ERP, Healthcare) work smoothly.

---

### Task 6: Business Challenges & Vertical Industry Solutions
**Files:**
- Modify: `components/BusinessChallenges.tsx`
- Modify: `components/IndustrySolutions.tsx`

**Steps:**
1. In `IndustrySolutions.tsx`, implement iLanding's Features 2 layout: 3-column split with left-aligned cards, central phone mockup (`/assets/img/phone-app-screen.webp`), and right-aligned cards.
2. In `BusinessChallenges.tsx`, restyle challenge-to-solution matrix as modern elevated cards with clear operational before/after comparisons.

---

### Task 7: Enterprise Integration & Trust Architecture
**Files:**
- Modify: `components/EnterpriseIntegration.tsx`
- Modify: `components/Trust.tsx`

**Steps:**
1. Modernize Microsoft Dynamics 365 and SAP ERP architecture highlights into clean light cards.
2. Update Trust & Security compliance section with verified badges, ISO/data sovereignty standards, and SLAs.

---

### Task 8: Testimonials, Global Social Proof & About Section
**Files:**
- Modify: `components/SocialProof.tsx`
- Modify: `pages/About.tsx`

**Steps:**
1. In `SocialProof.tsx`, implement iLanding testimonials with client avatar, star rating, quotes, and company names.
2. Add global offices cards (Singapore HQ, Oman, India) with phone, email, and Google Maps direction links.
3. In `pages/About.tsx`, restyle with iLanding's About pattern (dual imagery `about-5.webp` + `about-2.webp`, floating "15+ Years" badge, CEO profile card, and direct contact card).

---

### Task 9: Call To Action & Footer
**Files:**
- Modify: `components/CallToAction.tsx`
- Modify: `components/Footer.tsx`

**Steps:**
1. In `CallToAction.tsx`, implement iLanding's signature CTA banner with organic SVG decorative shapes (`shape-1`, `shape-2`) and dot pattern backgrounds.
2. In `Footer.tsx`, implement clean 4-column layout with company branding, quick links, product links, contact info, and copyright.

---

### Task 10: Subpages Polish & End-to-End Build Verification
**Files:**
- Modify: `pages/Contact.tsx`
- Modify: `pages/Solutions.tsx`
- Modify: `pages/SolutionERP.tsx`
- Modify: `pages/SolutionCustom.tsx`
- Modify: `pages/ProductDetail.tsx`

**Steps:**
1. Polish subpages with light theme consistency, clean headings, and iLanding card styles.
2. Run `npm run lint` (`tsc --noEmit`) to verify zero TypeScript errors.
3. Run `npm run build` to verify production build succeeds.

