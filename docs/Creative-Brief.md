# Creative Brief: AZ MVD Now Homepage, Full-Color Directions

| | |
|---|---|
| **Status** | Draft v0.1 |
| **Date** | 2026-10-13 |
| **Owner** | Jon Hrach |
| **Audience** | Visual designers (one per direction), design reviewers, ADOT MVD stakeholders |
| **Related** | [PRD](PRD.md) · [Live wireframe prototype](https://jhrach-aura.github.io/amn-homepage/) · AZ MVD Now UX Writing Guide · Easy-Peasy AI Prompting Guide · [State of Arizona Digital Style Guide](https://agencyplatform.az.gov/sites/default/files/2025-02/State-of-Arizona-Digital-Style-Guide.pdf) |

---

## 1. Purpose and how to use this brief

The grayscale wireframe prototype has settled the **content, structure, and copy** of the new
AZ MVD Now homepage. This round adds **color, branding, and look and feel** (PRD §12.2).

Three designers will each take one creative direction (§6). We'll present all three to the
client side by side.

- **Decided** (§3): section order, navigation, copy, interactions, accessibility, and
  responsive behavior.
- **Open** (§6): palette, typography, imagery, iconography, component styling, and overall
  personality.
- **The rule of thumb:** apply a look and feel to the wireframe; don't redesign it. If you
  think the hierarchy or a component should change, show it as an annotated alternative next
  to the brief-compliant version.

## 2. Project snapshot

**What AZ MVD Now is:** Arizona MVD's service website. People come to finish a task
(renew a registration, schedule an appointment, apply for a Travel ID, respond to a letter)
without visiting an office.

**Who the homepage serves:**

| Audience | What they need from the design |
|---|---|
| Returning account holders | Get to Sign In fast; trust that it's the official site. |
| Guests with a one-off task | Find their service tile quickly; understand that no account is needed, but an MVD record is (PRD §12.7). |
| "Stressed and complex" visitors | Got a DUI or compliance letter. Calm, clear, steady design; no alarm colors or playful styling in "Got a Letter from MVD?" |
| New Arizona residents | Understand they need an office visit before signing up. |
| Spanish speakers | Español is easy to find. Layouts survive about 20–30% longer translated text. |
| Call-center agents (secondary) | Direct callers by section names and positions they already know ("scroll down to Guest Services", "the tile that says…"). |

**What success looks like:**
- People complete top tasks in usability testing (PRD §11).
- The site reads as an official State of Arizona site.
- Returning users and the call center still recognize AZ MVD Now.
- It meets WCAG 2.1 AA.

## 3. Fixed inputs: don't redesign

Take these from the PRD and the prototype as given. Style them; don't change them.

1. **Section order:**
   1. Header and 6-item nav (Vehicle, Driver License & ID, Title, **Voter Registration**,
      Other, Help, plus Sign In / Sign Up).
   2. Alert strip.
   3. Hero with 6 service tiles.
   4. Travel ID promo.
   5. Account sign-up pitch.
   6. "Got a Letter from MVD?" steps.
   7. Guest Services (8 tiles).
   8. Need Help? (6 cards).
   9. Footer with language picker.
2. **Copy.** It's written to the AZ MVD Now writing guide and Easy-Peasy principles, so don't
   rewrite headlines or labels. "Sign Up" is the client's preferred term (not "Activate").
3. **Behaviors:**
   - The alert strip is collapsed by default, holds at most 3 alerts, and stays visually
     quiet so it doesn't compete with the hero (PRD FR-06/07).
   - The letter steps are always visible: no hover reveal, no accordion (FR-14/15).
   - Desktop dropdown menus collapse into a hamburger at 1140px and narrower.
4. **Responsive:** design for 1440 (desktop) and 375 (mobile). Nothing may break between 320
   and 2560, with no horizontal scroll.
5. **Accessibility (WCAG 2.1 AA):**
   - Text contrast ≥ 4.5:1 (≥ 3:1 for large text, meaning 24px regular or 18.66px bold).
   - UI components and icons ≥ 3:1.
   - Visible focus states on every control.
   - Color is never the only way information is shown.
   - Touch targets ≥ 44×44px.
6. **Out of scope for this round:**
   - Site search, a later phase (PRD §12.1). Leave room in the header, but don't design
     a search field.
   - Inner pages.
   - The A2Z login screens (PRD §12.8).

## 4. Brand landscape

We have three sources. Colors and fonts below were measured from the live sites on
2026-10-13. State values come from ADOT's graphics guide and must be **verified against the
State of Arizona Digital Style Guide v1.2 (§16 Color Palette, §17 Typeface)** before final
use.

| | AZ MVD Now (azmvdnow.gov) | ADOT.gov/MVD | State of Arizona Agency Platform |
|---|---|---|---|
| **Role** | Service site (transactions) | Information site | Statewide digital brand all agencies adopt |
| **Age / platform** | About 10 years | About 3 years, Drupal | Current (guide v1.2, Mar 2025) |
| **Primary colors** | Navy `#0D1F59` (text and headings), action blue `#0288D1` | Navy `#003863`, red-orange `#DD4626` | Open Skies Turquoise `#369992`, Sunrise Copper `#CC6C20`, Desert Sage `#8CB27B` |
| **Other colors** | Express orange `#FF8B00`, sign-in red `#F35353`, accent `#FF4C00`, mid-blue `#28588B` | Turquoise `#369992` (accents), gray `#E3E7EF` | Verify full secondary palette in the State guide |
| **Type** | Open Sans (headings), Inter (body), Material Icons | Fira Sans, Archivo | Lexend (headlines, agency identifier), Archivo (body), Arial fallback |
| **Signature asset** | The car photo: a driver in a classic convertible on an Arizona desert highway | None strong | State logo with the "Mandala" pattern; the solid full-color logo is the default |
| **Equity** | Recognized for 10 years. MVD likes the photo. The call center navigates callers by its layout. | Already uses the State turquoise and Archivo | Required for consistency and recognition across state sites |
| **Debt** | Dated. Competing reds, oranges, and blues. Inconsistent buttons. Matches no other system. | Carousels, duplicated and deep nav, mixed ADOT/MVD content, "Click here to know more" links | Not yet applied to MVD; risk of losing AZ MVD Now recognition |

### Contrast reality check (white text on each color)

Several brand colors **fail AA for normal-size white text**. Every direction must define
darker "text-safe" shades for buttons and links, and use the original colors only for large
text, fills, or decoration.

| Color | White text contrast | Body text (4.5:1) | Large text / UI (3:1) |
|---|---|---|---|
| AMN navy `#0D1F59` | 15.47:1 | Pass | Pass |
| AMN mid-blue `#28588B` | 7.35:1 | Pass | Pass |
| AMN action blue `#0288D1` | 3.86:1 | **Fail** | Pass |
| AMN sign-in red `#F35353` | 3.40:1 | **Fail** | Pass |
| AMN express orange `#FF8B00` | 2.35:1 | **Fail** | **Fail** |
| ADOT navy `#003863` | 12.03:1 | Pass | Pass |
| ADOT red-orange `#DD4626` | 4.22:1 | **Fail** | Pass |
| State turquoise `#369992` | 3.43:1 | **Fail** | Pass |
| State copper `#CC6C20` | 3.66:1 | **Fail** | Pass |
| State sage `#8CB27B` | 2.39:1 | **Fail** | **Fail** |

For example, navy text `#0D1F59` on State turquoise reaches 4.51:1. Darker turquoise or
copper shades with white text are the other option.

## 5. Non-negotiables for every direction

The State brand is **required, with some flex**, so all three directions must meet these:

1. **State identity:** the State of Arizona logo and agency identifier in the header and/or
   footer, used exactly as the State guide specifies (no recoloring, stretching, or
   effects).
2. **AZ MVD Now sub-brand:** the AZ MVD Now logo stays as the service's own mark. Show how it
   sits alongside the State logo.
3. **Accessibility:** a token sheet with every text/background pair and its contrast ratio.
   No failing pairs in the design.
4. **Typography:** use the State typefaces (Lexend and Archivo), or document an exception
   with a reason. Only Direction A is expected to consider an exception.
5. **Call-center continuity:**
   - keep section names and order;
   - keep each section visually distinct (one color or background per section is fine), so
     an agent can say "scroll to the Guest Services section".
6. **One primary action color.** Exactly one primary CTA style and one secondary style. No
   competing button colors like today's red/orange/blue mix.
7. **Compliance checklist:** each direction ends with a short table showing which State
   guide items it meets, adapts, or deviates from, and why.

## 6. The three directions

### Direction A: Evolve AZ MVD Now ("familiar, refreshed")
**Intent:** keep everything people recognize about AZ MVD Now and modernize it within State
guardrails.

**Pitch to the client:** "Your customers and call center won't miss a beat. It's the AZ MVD
Now they know, cleaner and more accessible."

| | Guidance |
|---|---|
| **Palette** | Start from AMN navy `#0D1F59` and a darkened action blue (text-safe, ≥ 4.5:1). Replace the red sign-in button and orange "express" accents with one primary and one secondary CTA. A single warm accent is allowed for highlights. |
| **Type** | Refresh Open Sans/Inter with a clearer scale and weights, *or* move to Lexend/Archivo for State alignment. Show which, and why. |
| **Imagery** | The **car photo is the hero image**, with a fresh crop for desktop and mobile. Keep it full color and recognizable. |
| **Iconography** | Consistent outlined or filled set to replace Material Icons. Same stroke weight throughout. |
| **Do** | Keep the layout as close to today's AZ MVD Now as the wireframe allows. Add State logo and identifier elements in the header and footer. |
| **Avoid** | Reintroducing the red/orange/blue button mix; gradients and drop-shadow-heavy cards from the current site. |
| **Compliance level** | Lowest of the three. Expect deviations in palette and maybe type, and document them. |
| **Risk** | The client may be told it doesn't meet the statewide brand mandate. |

### Direction B: State of Arizona Agency Platform ("one Arizona")
**Intent:** AZ MVD Now looks like a first-class member of the State's digital family.

**Pitch to the client:** "It's instantly recognizable as an official State of Arizona
service, consistent with every other agency site."

| | Guidance |
|---|---|
| **Palette** | Open Skies Turquoise as primary, Sunrise Copper for the primary CTA or highlights, Desert Sage as support. Use navy or near-black for text. Darken turquoise and copper wherever they hold white text (§4). |
| **Type** | Lexend headlines, Archivo body (verify sizes and weights in the State guide). |
| **Imagery** | Arizona landscapes and real Arizonans, consistent with State guidance. The car photo is **optional**: as a secondary image (for example the Travel ID promo or account section), or omitted. |
| **Iconography** | Follow State/Agency Platform icon guidance if it has any; otherwise a simple outlined set. |
| **Do** | Present AZ MVD Now as the agency identifier/sub-brand within the State system. Make the section backgrounds distinct so call-center wayfinding still works. |
| **Avoid** | Losing the AZ MVD Now name. Generic stock photography. Turquoise or copper with white body text that fails contrast. |
| **Compliance level** | Highest. Should be fully compliant. |
| **Risk** | Lower recognition for long-time users. MVD may miss the car photo. |

### Direction C: Blend ("the State system, still unmistakably AZ MVD Now"). Recommended.
**Intent:** use the State system as the foundation and carry over AZ MVD Now's most valuable
assets.

**Pitch to the client:** "Compliant with the statewide brand, with the photo and layout your
customers and call center already know."

| | Guidance |
|---|---|
| **Palette** | State turquoise, copper, and sage as the color system. A deep navy (close to AMN `#0D1F59` or ADOT `#003863`) as the text and anchor color, which bridges the old and new brands. Copper or darkened turquoise for the one primary CTA. |
| **Type** | Lexend headlines, Archivo body. |
| **Imagery** | The **car photo stays the hero image**, full color, cropped and graded to sit naturally next to the State palette. Supporting imagery follows State guidance. |
| **Iconography** | One consistent set, styled to the State system. |
| **Do** | Keep AZ MVD Now's hierarchy and section names. Bring in ADOT.gov/MVD's lessons (§7). Show that the system scales to inner pages with one sample component or page header. |
| **Avoid** | Ending up as A with turquoise paint, or as B with the photo pasted in. The blend should feel intentional. |
| **Compliance level** | High. Deviations are limited to the sub-brand assets the State flex allows. |
| **Risk** | Pleasing nobody fully. Mitigate by keeping the rationale for each choice explicit. |

## 7. ADOT.gov/MVD: reference notes for all directions

ADOT.gov/MVD isn't a direction, but it's useful evidence.

- **Reuse:**
  - it already uses State turquoise `#369992` and Archivo, which shows the State system
    working for MVD content;
  - it has a clear footer pattern for State links.
- **Avoid:**
  - carousels (hidden content, poor accessibility);
  - duplicated and deep navigation;
  - vague links like "Click here to know more";
  - mixing ADOT and MVD content on the same page.
- **Consistency:** customers move between the two sites. A shared palette and type (likely
  the State system) makes the jump feel like one MVD.

## 8. What each designer delivers

Work in Figma, starting from the wireframe prototype's layout and content.

1. **Mood board and style tile:** palette, type pairing, imagery, iconography, and one or
   two components that capture the direction.
2. **Design tokens:**
   - color (with every text/background pair and its contrast ratio);
   - type scale, desktop and mobile;
   - spacing, radius, and elevation.
3. **Homepage comps:**
   - desktop 1440 and mobile 375 (tablet 768 optional), full page, with real copy from the
     prototype;
   - the Spanish view of at least the hero and one section, to show longer text holding up.
4. **Key states:**
   - nav dropdown open;
   - mobile nav open;
   - alert strip collapsed and expanded;
   - button and tile hover and focus;
   - the Guest Services "View All" state.
5. **Component sheet:**
   - header and nav;
   - buttons (primary, secondary, text link);
   - service tile;
   - Travel ID promo;
   - benefit item;
   - letter step card;
   - help card;
   - alert strip;
   - footer and language picker.
6. **Rationale (one page):** the idea, how it serves the audiences in §2, and the compliance
   checklist (§5 #7).

## 9. Presentation and evaluation

We'll present the three directions side by side, using the same pages and states so the
comparison is fair. The client and the team score each direction on:

| Criterion | Question |
|---|---|
| Recognition | Will returning users and MVD see this as AZ MVD Now? |
| State compliance | How fully does it meet the statewide brand? |
| Accessibility | Do all colors, type, and states meet WCAG 2.1 AA? |
| Task clarity | Can people find and start their task fast? Is the hierarchy obvious? |
| Call-center continuity | Can an agent still direct a caller by section and position? |
| Scalability | Will it extend to inner pages and future features like search? |
| Spanish readiness | Does it hold up with longer translated text? |
| Tone | Does it feel calm and trustworthy, especially in "Got a Letter from MVD?" |

**Recommendation framing:** show all three honestly. Recommend **Direction C** as the best
balance of compliance and recognition, with A and B as the bookends that make the tradeoff
visible.

The chosen direction becomes Prototype 2 (PRD §13) and then goes to usability testing.

## 10. Logistics and open items

| Item | Status |
|---|---|
| Timeline and review dates | TBD |
| Exact State color and type values | Verify against the State Digital Style Guide v1.2 §16–17. The site's bot check blocked an automated read. |
| Does the AZ MVD Now logo itself change? | TBD with the client |
| Car photo: license, original resolution, alternate crops | Confirm with MVD before designers rely on it |
| Do call-center scripts reference visual cues (for example "click the orange button")? | Ask the call center; it affects how much color can change |
| Photography source for Direction B | TBD (State library, ADOT, or licensed stock) |
| Figma file and handoff location | TBD |
