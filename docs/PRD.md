# PRD: AZ MVD Now (AMN) Homepage — Prototype Iteration

| | |
|---|---|
| **Status** | Draft v0.2 (open questions answered; see §12) |
| **Date** | 2026-10-13 |
| **Owner** | Jon Hrach |
| **Stakeholders** | TBD (ADOT MVD product owner, UX research, content, accessibility) |
| **Scope** | Prototype iteration and usability testing only — not a production build |
| **Source prototype** | [AZMVDNow-responsive-prototype.html](../AZMVDNow-responsive-prototype.html) (copied from "AMN Homepage Grayscale Prototype 1.html") |

---

## 1. Overview & purpose

AZ MVD Now (AMN) is Arizona MVD's online services portal. The homepage is the front door for
residents who want to finish MVD business online: renewing a registration, booking an
appointment, applying for a Travel ID, or responding to a letter from MVD.

"Grayscale Prototype 1" is a clickable, responsive concept of a redesigned homepage. This PRD
records what the prototype contains today, defines the requirements for the next rounds of
prototyping, and sets out what usability research must validate. It does not cover a
production build.

## 2. Problem statement

Many customers come to the AMN homepage with a single task in mind, and they often don't know
whether that task needs an account. The homepage has to:

- Help people find the service they need quickly, whether they browse or search.
- Make it clear which services guests can use without signing in, and which need an account.
- Persuade people to create an account by showing what they get from it.
- Tell people who received a compliance letter exactly what to do next.
- Work on phones and in languages other than English.

## 3. Goals and non-goals

### Goals (for this prototype phase)
1. Validate the information architecture: the 6-item global nav and its menu taxonomy.
2. Validate findability of the top tasks from the hero tiles, Guest Services, and nav. Search is a later phase (§12.1).
3. Make the difference between the guest path and the sign-in path clear.
4. Validate the "Got a Letter from MVD?" step-by-step guidance.
5. Confirm the layout and interactions work from small phones (≤410px) up to wide desktops.
6. Produce a full-color, fully branded prototype that is ready for testing and meets WCAG 2.1 AA (§12.2).

### Non-goals
- Production implementation, CMS integration, or deployment.
- Real authentication. Sign-in, sign-up, and Travel ID will hand off to the separate A2Z login system, with URLs TBD (§12.8).
- Site search, in both UI and backend. It is a separate, later effort (§12.1).
- Alert integration with MAX, where MVD managers will write alerts. Alerts stay as sample content; dev planning comes later (§12.4).
- Analytics instrumentation.
- Rebuilding the downstream service pages that tiles and menus link to.

## 4. Target users

| Persona | Needs from the homepage |
|---|---|
| **Returning account holder** | Sign in fast; find documents, receipts, plates and titles. |
| **Guest / one-off task** | Renew a registration, get a permit, or view receipts without an account. |
| **New to Arizona** | Learn how to transfer a license and register a vehicle. |
| **Letter recipient** | Understand a compliance letter and what action to take. |
| **Traveler** | Get an Arizona Travel ID (REAL ID) before flying. |
| **Non-English speaker** | Switch the page to Spanish first, then other languages common in Arizona (§12.5). |
| **Mobile user** | Do all of the above on a phone. |

## 5. Key user tasks (test scenarios)

1. Renew a vehicle registration without signing in.
2. Schedule an MVD appointment.
3. Start a Travel ID application.
4. You received a letter from MVD. Find out what to do.
5. Find the nearest MVD office or an Authorized Third Party.
6. Order a specialty or personalized plate.
7. Find out whether you need an account, and what you need before you can sign up (an existing MVD record).
8. Switch the page to Spanish.
9. ~~Search for "driver license renewal" and open the result.~~ Deferred: search is a later phase (§12.1).

## 6. Prototype inventory (current state)

The page, top to bottom:

| # | Section | Content | Interactions |
|---|---|---|---|
| 1 | **Header / global nav** | AZ MVD Now logo; tabs: Vehicle, Driver License & ID, Title, **Voter Registration** (a direct link with no menu), Other, Help; **Sign In / Sign Up** button | Hover or click opens a dropdown menu, and items with children open a flyout submenu. Esc or a click outside closes it. Below a breakpoint the tabs collapse into a hamburger that opens a 3-level accordion. Menu items and Sign In only show a "Prototype: …" toast. |
| 2 | **Alerts** | A slim strip (about 45px) directly under the header, outside the hero. Collapsed by default, it shows "⚠ **3 alerts:** Register to vote · New Look for AZ MVD Now · New service" and *View alerts*. Expanded, each alert has a bold title, a one-sentence message, and a descriptive link. | *View alerts* / *Hide alerts* toggle (`aria-expanded`). Each alert has its own dismiss button and the summary updates; focus moves to the next alert, or to the H1. With one alert left, its full text shows inline with no toggle; with none, the strip disappears. On mobile the summary shortens to "3 alerts" and *View*. Kept quiet on purpose so it doesn’t compete with the hero. |
| 3 | **Hero** | H1 "Arizona MVD Services Without Leaving Home"; sub "Take care of your MVD business online—quickly and securely." | 6 quick-service tiles: Registration Renewal, Schedule an Appointment, Voter Registration, Travel ID Application, New to Arizona, ADOT Website. **See More** scrolls to Guest Services. |
| 4 | **Travel ID promo** | "Get Airport-Ready with an Arizona Travel ID" + supporting copy | **Apply Now** (primary), **Learn More** (link) |
| 5 | **Account sign-up pitch** | "Do More with an AZ MVD Now Account" + 4 benefits: Skip the office visit · All documents in one place · Manage plates and titles · Pay and track receipts | Benefit icons scale on hover. **Sign Up** CTA (intro: "Sign up in minutes to get these benefits:"), plus a note: "New to Arizona? Visit an MVD office first, then sign up." (The client prefers "Sign Up" here, even though the writing guide calls for "Activate".) (The heading was "New to AZ MVD Now?", which new residents could confuse with "New to Arizona".) |
| 6 | **Got a Letter from MVD?** | Written for "stressed and complex" visitors (DUI or complex compliance letters). H2 and intro, then 4 numbered step cards: Sign in to AZ MVD Now ("No account? Sign up first.") → Find your letter → Scan the QR code → Review your compliance issues. Below the cards is an action row: **Sign In to View Your Letter** plus a quiet "Have a court order? Contact MVD before you act on it." note. | Static, with no hover or accordion. Cards show 4 across, 2×2 at ≤1100px, and 1 column at ≤620px; on mobile the steps come before the CTA. New-tab links show an external icon and screen-reader text. The desert-highway photo was removed because it didn’t match the content; the image file is still in the prototype file. |
| 7 | **Guest Services** | "No account needed. You’ll verify your identity using your existing MVD record." 8 tiles: Registration Renewal, Voter Registration, View Plate Gallery, Restricted 3-Day Permit, De-Insure Vehicle, Payment Summary, View Receipts, Aircraft Renewal | **View All / View Less** collapses the grid. |
| 8 | **Need Help?** | 6 cards: Contact Arizona MVD, Find an MVD Location, View Video Library, Provide Feedback, Report Fraud, Visit azdot.gov | External links |
| 9 | **Footer** | ADOT logo, "All Rights Reserved.", links: Forms and Publications, Privacy Statement, Help, Text Message Policy | Language picker (English, Español, Français, 中文) that loads Google Translate |
| — | **Search results view** (alternate state) | "Results" / "No Results Found", list of matches, "Frequently Searched" (Registration Renewal, Driver License Renewal, Schedule an Appointment), "Search azdot.gov/MVD" fallback, **Back to Home** | Prefix match against a fixed list of services built from the nav taxonomy plus extra services. **There is currently no search input in the page**, so this view can't be reached (see §10). |

### Visual design (as built)
- **Typefaces:** Roboto, Inter, Open Sans.
- **Palette:** navy `#1C3E61`; teal `#2D6D67` / `#459892`; CTA orange `#B25E1C`; tint `#E9F3F2`;
  secondary text `#5a5f73`. The prototype renders in grayscale through a filter. The next round is full color and fully branded (§12.2).
- **Responsive:** 13 breakpoints from 410px to 2010px; the tile grids and the letter-step row reflow.

## 7. Information architecture (global nav)

- **Vehicle**
  - Registration — Registration Renewal · Registration Reinstatement · Registration Replacement with Decal · Registration Refund
  - Plates — Specialty and Personalized Plates · Plate Replacement · Disability Placard Replacement · Duplicate Plate · Plate Order Status · Change Plate Background
  - Permits — 30-Day General Use Permit · Restricted 3-Day Permit
  - Off-Highway Decals — Off-Highway Decal Issue/Renewal · Off-Highway Decal Replacement · Required Course: Safe & Ethical Riding in Arizona
  - Motor Vehicle Record
  - Vehicle Fees/Taxes Paid
  - Emissions
  - Fleet Management
  - Watch Your Car
- **Driver License & ID**
  - Arizona Travel ID (REAL ID)
  - Driver License — Application · Replacement · Renewal · Record · At-home Permit Test
  - Identification Card — Application · Replacement
  - Commercial Driver License (CDL) — Application · Replacement · Renewal · Medical Status Verification
  - Mobile ID Management
- **Title**
  - Title Viewer · Title Information (Other Vehicles) · eTitle Transfer · Title Replacement · Sold Notice · Bill of Sale
- **Voter Registration** (top-level link to the AZ MVD Now voter registration page; moved out of Other)
- **Other**
  - Change Address · Aircraft Registration Renewal · Manage Insurance · Manage Compliance Issues · Compliance Issues Timeline · View Receipts · Dealer Licensing and Services · Apply for an Organization Account
- **Help**
  - Schedule an Appointment · Contact Us · MVD Invitation Code · Find an MVD Location · Provide Feedback · Report Fraud · View Video Library · View Forms

## 8. Functional requirements (next prototype iteration)

Priority: **P0** = required for the next usability round, **P1** = should have, **P2** = nice to have.

### Global navigation
- **FR-01 (P0)** Six top-level nav items that match §7: five tabs with dropdown menus and flyout submenus, plus **Voter Registration** after Title as a direct link with no chevron. Hovering it closes any open menu. Below 1140px the nav collapses to the hamburger so all six items never wrap onto two rows.
  *Acceptance:* each menu opens on click and on hover. It closes on Esc, on a click outside, and on mouse-leave after a short delay.
- **FR-02 (P0)** The menus are fully keyboard operable: Tab or arrow keys move between tabs and items, Enter or Space opens a menu, and focus returns to the tab when a menu closes.
- **FR-03 (P0)** On mobile, a hamburger opens a 3-level accordion with the same taxonomy, and only one branch is open at each level. Voter Registration is a plain row that opens its page and closes the drawer.
- **FR-04 (P1)** Menu leaf items go to a stub page or a real destination URL instead of only showing a toast, so testers can confirm they reached the right place.
- **FR-05 (P0)** The **Sign In / Sign Up** button is always visible in the header at every breakpoint.

### Alert banner
- **FR-06 (P0)** Support 1–3 simultaneous alerts (three is the confirmed maximum, §12.4) in a slim summary strip under the header, collapsed by default (count plus titles), so alerts don’t push down or compete with the hero and service tiles. No separate banners and no carousel. Each alert has a short title, a one-sentence message, and a descriptive link (not "Learn More"). Use no exclamation points. The region is a labeled `section`, not `role="alert"`.
- **FR-07 (P1)** A native toggle button (*View alerts* / *Hide alerts*, `aria-expanded` + `aria-controls`) reveals the alert details. Each alert is dismissible with a button labeled "Dismiss alert: <title>", and focus moves sensibly after dismissal. A single remaining alert shows inline without a toggle. (P2: dismissed alerts stay hidden for the session.)

### Hero and quick tiles
- **FR-08 (P0)** The hero shows ≤6 top-task tiles. The current set reflects the team’s best knowledge of priority (§12.3); validate it in testing and re-rank if analytics become available.
- **FR-09 (P0)** Each tile links to a stable destination. No hard-coded OAuth URLs (see §10). Where no stable URL exists, use the closest public page or a prototype stub (§12.8).
- **FR-10 (P1)** **See More** scrolls to Guest Services and moves focus to that section heading.

### Travel ID promo
- **FR-11 (P0)** **Apply Now** goes to a stable Travel ID entry point. Until one exists, link to the azdot.gov Travel ID page (§12.8). **Learn More** goes to the azdot.gov Travel ID page.

### Account sign-up pitch
- **FR-12 (P0)** Show four account benefits and a **Sign Up** CTA that goes to the sign-up entry point ("Sign Up" is used instead of the writing guide’s "Activate" term). Under the CTA, tell new residents they need to visit an MVD office before they can sign up, and link to the New to Arizona page. Sign-up requires an existing MVD record (§12.9). Don’t use "New to…" wording in this section.
- **FR-13 (P1)** Benefit hover effects are decorative only, and the content is the same without hover.

### Got a Letter from MVD?
- **FR-14 (P0)** Show the steps as a static numbered list (`<ol>`), all visible without interaction, so stressed visitors can scan them quickly. No hover-to-reveal content.
- **FR-15 (P0)** Make the steps the visual focus, and give the section one primary action (*Sign In to View Your Letter*). Step 1 links to sign-up. The court-order note links to Contact MVD and stays visually quieter than the steps. Keep the tone steady and factual, with no exclamation points.
- **FR-16 (P1)** Steps name screens exactly as they appear in the product and nav (*Your Account* › *Your Documents*, *Other* › *Manage Compliance Issues*). These labels need confirming against the live AZ MVD Now UI.

### Guest Services
- **FR-17 (P0)** Show the guest-accessible services (the Guest Services tiles are the authoritative list of no-sign-in services, §12.7), every one with a working destination (De-Insure Vehicle currently uses `#`). Make it clear that no account is needed but guests must verify their identity against an existing MVD record, which means they must have done business with MVD before.
- **FR-18 (P1)** **View All / View Less** shows how many tiles are hidden and announces the change to screen readers.

### Need Help?
- **FR-19 (P0)** Six help cards, each with a label, a one-line description, and an external link indicator.

### Search (deferred to a later phase, §12.1)
- **FR-20 (Later)** Add a visible search input (header or hero; placement TBD) wired to the existing results logic, with type-ahead suggestions (max 8).
- **FR-21 (Later)** The results view shows the match count, the query, result links, and **Back to Home**. The no-results view shows "Frequently Searched" plus an azdot.gov/MVD fallback.
- **FR-22 (Later)** The search tolerates synonyms and typos (for example, "tags" → plates, "REAL ID" → Travel ID).

### Footer and language
- **FR-23 (P0)** Footer links work. Footer "Help" currently uses `#`.
- **FR-24 (P1)** The language picker translates the page and remembers the choice for the session. English and **Spanish** are required, and Spanish is listed first after English. Other languages follow Arizona usage. Google Translate is acceptable for production; in the prototype the picker can be visual-only (§12.5).

## 9. Non-functional requirements

- **Accessibility:** WCAG 2.1 AA at prototype fidelity:
  - Interactive elements are native `button`/`a` elements, not `div role="button"`.
  - Focus is visible on every control.
  - Teal and orange text and fills are checked for 4.5:1 contrast on white and tint backgrounds.
  - Hover-only behavior always has a click or keyboard equivalent.
  - External links that open in a new tab say so.
  - Images have meaningful alt text.
  - Respect `prefers-reduced-motion` for tile lift and scale effects.
- **Responsive:** All sections are usable from 320px to 2560px with no horizontal scroll.
  Touch targets are ≥44×44px.
- **Performance:** The prototype loads in under 3s on a typical connection. Translation scripts load only when needed (already lazy).
- **Content:** Plain language at about an 8th-grade reading level, and consistent service names across the nav, tiles, and search.
- **Privacy:** No real customer data, and no live tokens in links.

## 10. Known issues and gaps in Prototype 1

1. **No search input.** The search and results logic exists, but no field is rendered, so the results view can't be reached. *Accepted: search is a later phase (§12.1).*
2. **Stale OAuth links.** The "Travel ID Application" tile and "Apply Now" link to Azure B2C authorize URLs with hard-coded `state`, `nonce`, and `code_challenge` values. These links will fail, and the values should not be shared. Replace them with stable entry URLs, or with the closest public page if none exist (§12.8).
3. **Placeholder links.** De-Insure Vehicle and footer Help use `href="#"`.
4. **Toast-only actions.** Nav menu items and Sign In / Sign Up only show a "Prototype: …" toast.
5. **Duplication.** Registration Renewal and Voter Registration appear in both the hero and Guest Services. Travel ID appears both as a hero tile and as its own promo section. *Accepted for now: current priority is intentional (§12.3).*
6. ~~**Alert content.** "Alert!" has no body message.~~ Fixed: replaced with the multi-alert region and sample content (FR-06).
7. **Accessibility.** Tabs, menu items, and the language picker are `div role="button"` elements. The letter section now uses native `button`, `ol`, and `h3` elements. Keyboard support depends on a custom handler and needs an audit.
8. **Third-party dependency.** Google Translate is used for localization. *Accepted for production; not needed in the prototype (§12.5).* Spanish is required.
9. **Naming mismatch.** The file is called "Grayscale". *Resolved by the next round being full color (§12.2).*

## 11. Research plan and success metrics

| Method | Purpose |
|---|---|
| Moderated usability test (5–8 participants per round, desktop and mobile) | Task success on the §5 scenarios |
| Tree test of the §7 taxonomy | Nav findability without visual design |
| First-click test on the hero and Guest Services | Tile labeling and placement |
| Accessibility walkthrough (keyboard + screen reader) | FR-02, FR-14, and §9 |

There is one prototype, so testing is iterative rather than a comparison of variants (§12.6). Include a Spanish-language session and check whether participants understand that guest services and sign-up need an existing MVD record.

**Metrics (targets TBD):** task success rate, time on task, first-click accuracy, tree-test
directness, SUS score, and the share of participants who can correctly say whether a task needs an account.

## 12. Decisions and remaining questions

Answers from the product owner (2026-10-13), with guidance on how each one affects the prototype.

### 12.1 Search
**Q:** Was the search bar removed on purpose, and if not, where should it go?

**Answer:** Search is a separate effort, after this first phase of the landing page. It needs more thought, planning, testing, and resources.

**Prototype guidance:**
- Keep search out of Prototype 2. FR-20–22 move to a later phase (see §8 Search).
- Leave space in the header layout for a future search field, but don't show a placeholder that looks broken or unfinished.
- The hidden search-results view and its logic can stay in the file, unused. Remove them if they get in the way of the full-color build.
- Drop search from this phase's test scenarios. Testers should find tasks by browsing (hero, Guest Services, nav).

### 12.2 Visual fidelity of the next round
**Q:** Should the next round be a true grayscale wireframe, or keep the brand palette?

**Answer:** The next round is a full-color, fully branded version of the landing page. Content and hierarchy may still change based on user testing and feedback.

**Prototype guidance:**
- Remove the grayscale filter and overlay, and apply the AZ MVD Now brand palette, type, icons, and imagery.
- Rename the file or version to drop "Grayscale" (fixes §10 #9).
- Check contrast against the real brand colors: teal text on white and white on orange need to meet 4.5:1 (§9).
- Build sections so content and order are easy to change after testing, with no copy baked into images.
- Revisit the removed desert-highway photo. Branded imagery can return where it supports the content, but not in "Got a Letter from MVD?"

### 12.3 Hero tasks and duplication with Guest Services
**Q:** Which top tasks belong in the hero, based on traffic data, and should we remove the duplication with Guest Services?

**Answer:** The current hero and Guest Services tasks are prioritized to the best of the team's knowledge.

**Prototype guidance:**
- Keep the current 6 hero tiles and 8 Guest Services tiles.
- Treat the duplication (Registration Renewal and Voter Registration in both) as intentional for now (§10 #5).
- Use testing to validate the order. Add first-click and task-success measures for hero versus Guest Services, and note which entry point participants use.
- If analytics become available, re-rank the tiles before production.

### 12.4 Alerts
**Q:** Where will alert content come from, who orders the alerts, and how often will they change? What is the maximum number of alerts at once?

**Answer:** The maximum is **three** alerts. An MVD manager with production access writes the alerts, and they are controlled in the **MAX** system. Automating them through a simple CMS needs more effort and planning with the dev team.

**Prototype guidance:**
- Keep the summary strip as designed for 1–3 alerts (FR-06/07). Don't design for more than three.
- Keep the alerts as hard-coded sample content in the prototype. Integration with MAX stays a non-goal for this phase.
- Use this alert data shape as the field list for the MAX conversation with dev:
  - title (short), message (one sentence), link label, link URL;
  - display order, plus start and end dates.
- Because alerts are written in MAX by a manager, not by a designer, the strip has to hold up with real-world copy. Write guidance for authors covering:
  - title length (2–5 words) and a one-sentence message;
  - a descriptive link label, never "Learn More";
  - no exclamation points;
  - plain wording that still reads well after Google Translate to Spanish (§12.5).
- Decide in MAX what happens when a fourth alert is published, for example blocking it or replacing the oldest. Use the order field to set what shows first.

### 12.5 Languages
**Q:** Which languages are required, and is Google Translate acceptable?

**Answer:** Prioritize the languages most spoken in Arizona. After English, Spanish is definitely required. **Google Translate is acceptable for production**, but it doesn't have to work in the prototype.

**Prototype guidance:**
- Show **Español** first in the language picker, right after English, and consider a visible "Español" link in the header.
- Keep Français and 中文 only if usage data supports them.
- The language picker can be visual-only in the prototype. Remove the Google Translate script load so the prototype has no third-party dependency during testing. Selecting a language can show the prototype toast instead.
- For production, Google Translate is fine for general content. Consider human-reviewed Spanish for legal and compliance wording, such as the "Got a Letter from MVD?" steps, where a mistranslation could cause harm.
- Still open: which languages come after Spanish.
- Add a Spanish-language task to usability testing (§5 #8).

### 12.6 Prototype variants
**Q:** Is "Prototype 1" one of several variants to compare in testing?

**Answer:** No. There is only one prototype for now.

**Prototype guidance:**
- Test one design, with no A/B comparison.
- Use moderated testing to find issues and feed iterations (Prototype 2, 3, …) rather than choosing between variants.

### 12.7 Guest services and identity verification
**Q:** Which services truly don't need sign-in, and what does guest identity verification involve?

**Answer:** The services that don't need sign-in are the ones listed in Guest Services. Guests verify their identity in one of these ways:

- Driver license or ID number, plus issue date and SSN
- SSN, plus last name and date of birth
- A **Mobile ID**, confirmed with a QR code

*Confirm the exact combinations with MVD. The answer as received read "SSN OR SSN, Last Name, DOB", so the grouping above is an interpretation.*

**Prototype guidance:**
- The Guest Services tile set is the authoritative list of no-sign-in services (FR-17).
- Keep the intro copy: "No account needed. You'll verify your identity using your existing MVD record."
- Add a short "What you'll need" line to Guest Services so guests can get their documents ready before they start, for example: "Have your driver license or ID, or your Mobile ID, ready."
- Promote Mobile ID with QR as the fastest path, and link to Mobile ID Management (§7) for people who don't have it yet.
- Don't ask for or show SSN fields on the homepage. Verification happens inside each guest service.
- In testing, check whether guests know what to have ready before they pick a service.

### 12.8 Entry URLs for Travel ID and sign-up
**Q:** What are the stable entry URLs for Travel ID and account sign-up?

**Answer:** Sign-up, sign-in, and Travel ID will hand off to a separate login system called **A2Z**. The entry URLs are still to be decided.

**Prototype guidance:**
- Remove the stale Azure B2C OAuth links (§10 #2) either way.
- Until stable URLs exist:
  - point *Travel ID Application* and *Apply Now* to the azdot.gov Travel ID page;
  - point *Sign Up* to `azmvdnow.gov/home`.
- Alternatively, use prototype stub pages that explain where the real flow begins.
- Every login-dependent action should go through one A2Z hand-off, so the URL can be swapped in one place when it's known:
  - header *Sign In / Sign Up*;
  - account *Sign Up*;
  - letter step 1 and *Sign In to View Your Letter*;
  - *Travel ID Application* and *Apply Now*.
- In the prototype, keep these as toasts or a single stub page labeled "A2Z sign-in (URL TBD)".
- Production requirement for dev: A2Z needs stable, shareable entry URLs, including a deep link that returns people to the task they started, such as Travel ID.

### 12.9 Sign-up requirements for new residents
**Q:** What exactly do new Arizona residents need before they can sign up for an account?

**Answer:** Arizona residents must have done business with Arizona MVD before signing up. **An MVD record is required.**

**Prototype guidance:**
- The note under *Sign Up* ("New to Arizona? Visit an MVD office first, then sign up.") is accurate. Keep it.
- The same rule applies to anyone without an MVD record, not only new residents. Consider adding "You'll need an existing MVD record to sign up." to the account section intro or to the sign-up flow.
- Guest Services and sign-up share the same prerequisite (an MVD record), so testing should check whether participants understand that before they start.

## 13. Next steps

1. Confirm with MVD the exact guest-verification combinations (§12.7), and with dev the A2Z entry URLs (§12.8) and MAX alert fields (§12.4). Agree which languages come after Spanish (§12.5).
2. Prototype 2: a full-color, branded build, chosen from the three directions in the [Creative Brief](Creative-Brief.md), that fixes the §10 issues and P0 requirements, especially links and accessibility semantics. Search stays out of scope.
3. Run the tree test on the §7 taxonomy alongside Prototype 2.
4. Run usability round 1, then update this PRD with findings and set metric targets.

---

## Appendix A: Link map (as built)

| Element | Destination |
|---|---|
| Hero: Registration Renewal / Guest: Registration Renewal | `azmvdnow.gov/guest/customeranonymous/titleregistration/registrationrenewal/search/vehicle` |
| Hero: Schedule an Appointment | `azmvdnow.gov/appointments` |
| Hero / Guest: Voter Registration | `azmvdnow.gov/guest/customeranonymous/voterregistration` |
| Hero: Travel ID Application, Promo: Apply Now | Azure B2C authorize URL (stale, see §10) |
| Hero: New to Arizona | `azdot.gov/mvd/services/driver-license-ID/new-to-arizona` |
| Hero: ADOT Website | `azdot.gov/mvd` |
| Promo: Learn More | `azdot.gov/mvd/services/driver-services/arizona-travel-id` |
| Account: Sign Up / Letter step 1: Sign up | `azmvdnow.gov/home` |
| Guest: View Plate Gallery | `azmvdnow.gov/plates` |
| Guest: Restricted 3-Day Permit | `azmvdnow.gov/guest/customeranonymous/titleregistration/permits/search/customer` |
| Guest: De-Insure Vehicle | `#` (placeholder) |
| Guest: Payment Summary | `azmvdnow.gov/guest/customeranonymous/titleregistration/vehiclepaymentsummary/search/customer` |
| Guest: View Receipts | `azmvdnow.gov/guest/customeranonymous/receipts/search/customer` |
| Guest: Aircraft Renewal | `azmvdnow.gov/guest/customeranonymous/aircraft/search` |
| Help: Contact Arizona MVD | `azdot.gov/mvd/contact-mvd` |
| Help: Find an MVD Location | `azdot.gov/mvd/mvd-hours-and-locations` |
| Help: View Video Library | `azmvdnow.gov/videos` |
| Help: Provide Feedback | `azmvdnow.gov/guest/customeranonymous/survey/search/customer` |
| Help: Report Fraud | `azmvdnow.gov/guest/incidentreport/select` |
| Help: Visit azdot.gov | `azdot.gov` |
| Footer: Forms and Publications | `azdot.gov/mvd/forms-library` |
| Footer: Privacy Statement | `azdot.gov/privacy-statement` |
| Footer: Help | `#` (placeholder) |
| Footer: Text Message Policy | `azmvdnow.gov/textmessagepolicy` |

## Appendix B: Prototype technical notes

- The file is a self-contained bundle (React 18 + "dc-runtime" template). Assets (2 PNG logos, 1 JPEG photo that is currently unused,
  web fonts) are embedded as gzip+base64 and unpacked at load time. It needs JavaScript to render.
- The page has two views, toggled by state: `home` and `results`/`noresults`. The search list is built from the nav taxonomy plus 7 extra services.
