# Direction B — working notes

## Components pass: header, buttons, icons, cards (State of Arizona design system)

All values live in `styles/tokens.css`, each tagged `/* from-figma */`,
`/* derived */`, or `/* provisional */`. Component classes in `style.css`
read only tokens. No copy, section order, or interaction changes.

### Open items — need a decision or a real value

- **Radius token is provisional.** The brief's radius line was an unfilled
  placeholder (`[RADIUS TOKEN NAME AND VALUE]`). `--radius-component` currently
  reuses the existing 8px; every button and card reads it, so the real value
  is a one-line change.
- **Card spec is provisional.** There is no `reference/card-panel.png`, so cards use
  the brief's fallback: white, 1px Neutral 100 border, radius token, shadow sm.
- **Copper switch is five lines, not one.** CSS can't build a variable name
  from another variable, so the button family is five adjacent tokens
  (`--btn-50/100/400/500/600`). To switch, change `turquoise` to `copper` in
  those five lines. The focus ring follows the same family.

### Column grid

From the State of Arizona (Unity Design System) column-grid spec.

| | Desktop (≥ 768px) | Mobile (< 768px) |
|---|---|---|
| Columns | 12 × 78px | 4, fluid |
| Gutter | 24px | 16px |
| Content area | 1200px max | fluid |
| Outside margin | whatever is left, never below 32px | 32px |

All tokens are from-figma except `--grid-margin`, which is derived:
`max(32px, (100% − 1200px) / 2)`.

| Width | Margin | Content | Gutter |
|---|---|---|---|
| 320 | 32px | 256 | 16px |
| 375 | 32px | 311 | 16px |
| 768 | 32px | 689 | 24px |
| 1440 | ≈120px | 1200 | 24px |
| 2560 | ≈680px | 1200 | 24px |

No horizontal scroll at any of these widths.

**What changed**
- **Page margins:** these were hard-coded 9 times as a 1320px / 20px clamp.
  The header had its own 16px curve and the mobile menu used 20–32px. All of
  them now read `--grid-margin`, so the logo, hero headline, sections and
  footer share one left edge.
- **Gutters:** the hero tiles, Guest Services tiles, benefits, letter steps
  and Need Help grids had 16 / 20 / 44 × 40px gaps. They all read
  `--grid-gutter` now (24px, or 16px on phones). The old benefit-grid
  `column-gap: clamp(40px, 10vw, 120px)` tablet override was removed.
- **Hero tiles:** the tile column was a fixed 617px, sized for the old 16px
  gaps, which would have dropped the tiles to 2 columns. It's now
  `3 × 195px + 2 gutters` (633px), so the hero keeps its 3 × 2 grid.

**Flags**
- **Spec typo:** the mobile table says "Content area width 1200px fixed". That
  reads as a copy slip, since the mobile columns are fluid, so it wasn't applied.
- **Headline wrap:** with the content area narrowed from 1320 to 1200px, the
  hero headline column is 511px at 1440, so the headline wraps to 3 lines instead of 2.
- **Column spans not applied:** components keep their own column counts (for
  example 3 help cards, 4 benefit cards). They aren't snapped to 12-column spans,
  because that would change layouts rather than spacing.
- **Scrollbar:** the margin uses `100%` rather than `100vw`, so a 15px desktop
  scrollbar doesn't skew it. That's why a 1440 window with a scrollbar
  measures 112px rather than 120.

### Header

| Property | Value | Tag |
|---|---|---|
| Height | 72px | from-figma |
| Background | primary/dark `#02393D` (Turquoise 600) | from-figma |
| Shadow | shadow sm | from-figma |
| Side padding | the page grid margin (`--grid-margin`): about 120px at 1440, 32px on phones; the logo lines up with the content edge | derived from the grid spec |
| Nav text | white — 12.69:1 | derived |
| Chevrons and open-tab underline | Turquoise 100 — 7.50:1 | derived |
| Logo | 48px tall, to fit the bar | derived |
| Dropdown offset | tucks 8px under the bar (was 24px under the old 117px bar) | derived |
| Sign In / Sign Up | secondary, small (48px) | from-figma |

The dropdown and mobile menu already open on white with dark text and are unchanged.

### Buttons — two styles, two sizes

| | Medium (default) | Small (header only) |
|---|---|---|
| Height | 56px (min-height) | 48px |
| Min width | 80px | 64px |
| Padding | 12px 16px | 8px 12px |
| Gap, radius, shadow | 8px · radius token · shadow sm | same |

| State | Primary | Secondary |
|---|---|---|
| Default | T400 fill, white text | white fill, 1px T400 border, T400 text |
| Hover | T500 fill | T50 fill, **T500 text and border** (derived) |
| Pressed | T600 fill | T100 fill, **T600 text and border** (derived) |
| Focus | 2px white gap + 2px T400 outline | same |
| Disabled | N100 fill, N400 text (provisional) | same |

**Changed from the brief:** keeping T400 text on the secondary hover and pressed
fills fails AA (4.16:1 on T50, 3.05:1 on T100). The text steps darker with
the fill instead (6.52:1 and 7.50:1).

Where they're used: Apply Now, Sign Up, and Sign In to View Your Letter are primary.
Sign In / Sign Up in the header is secondary small. A Turquoise 400 button on
`#02393D` is only 2.46:1 at its edge, while the white secondary is 12.69:1.

### Focus ring

The same ring applies to every control: a 2px white gap, then a 2px Turquoise 400 outline.
On dark surfaces (header, hero, Guest Services, footer — `.surface-dark`) it
flips to a white outline with the section color showing through as the gap.
The default ring nearly vanishes there (T400 is 1.37:1 on hero gray and
1.05:1 on the guest gradient), and its white gap merges into the white cards.

### Icons

The gray-on-green / 22px icon pass was reverted at your request. Icons are
back to their original 30px size, and on tile hover the circle still fills
turquoise with a white icon. `--icon-size-md`, `--color-icon-bg`,
`--color-icon-inverse`, and the `.icon-md` / `.icon-circle` classes were
removed.

**Standard color:** content icons use `--color-primary` (Open Skies
Turquoise, T300 `#369992`), the same as the service tiles. There are two
exceptions, both at your request:
- the **Travel ID star** uses `--color-icon-accent` (Sunrise Copper 300 `#CC6C20`)
- the **Need Help arrows** use `--color-icon` (Neutral 500 `#464A53`, the
  Figma `icon/default` token)

The **alert-strip triangle** is a status icon, not a content icon. It uses
`--color-icon-alert`, which points at `--negative-300` (`#D92D20`, from-figma;
the design system's negative color) and measures 4.83:1 on the white strip.
It applies to both the several-alerts and single-alert layouts. It was copper 300
via `--color-cta-icon`, which has been removed. Only the 300 shade of the
negative ramp has been supplied so far.

These seven were bright-green sage and were moved over:

| Icon | Was | Now |
|---|---|---|
| Travel ID star badge | sage 300 (2.37:1, failing) | Copper 300, 3.66:1 on the white card |
| 4 benefit icons | sage 400 | Turquoise 300, 3.03:1 on the pale teal circle (narrow pass) |
| Need Help arrows (×6) | sage 500 | Neutral 500 (`--color-icon`), 8.88:1 on white |
| Language-picker chevron | sage 400 | Turquoise 300, 3.43:1 on white |

On white tiles the tile icon circle is white, so only the turquoise icon shows
until hover. The 3px sage accent borders on the dropdown, mobile menu, and
language panel are borders, not icons, and are unchanged.

**Kept:** the mobile-menu chevrons still use `--color-icon` (Neutral 500,
8.88:1 on white). The original sage was 2.37:1, which fails 3:1 for an icon
that shows expand state.

### Cards — one family

`.card` (white, N100 border, radius token, shadow sm) is used by:

| Card | Variant | Notes |
|---|---|---|
| Hero service tiles (6) | `.card--link` | whole tile is the existing `<a>` |
| Guest Services tiles (8) | `.card--link` | same |
| Need Help cards (6) | `.card--link` | border was 2px sage; now the card family |
| Benefit items (4) | `.card--padded` | not clickable; equal-height row |
| Letter step cards (4) | `.card--padded` | calm, neutral, always visible |
| Travel ID promo | `.card--padded` | content sits in a white card with dark text on the turquoise band |

- **Clickable hover:** Turquoise 400 border plus `--shadow-md`. The old lift and
  bold-on-hover are gone.
- **Focus:** the same ring as buttons.

### Section backgrounds (wayfinding)

| Section | Background |
|---|---|
| Hero | Havasu Falls photo under a 62% Neutral 600 scrim |
| Travel ID band | same T400→T500→T600 gradient as Guest Services (`--bg-section-promo`; was near-black). White card edge 5.15:1 or better |
| Benefits | **Neutral 50** (was white; derived so it differs from the adjacent white letter section) |
| Letter steps | white |
| Guest Services | turquoise gradient |
| Need Help | white |
| Footer | primary/dark `#02393D` + Turquoise 500 bottom bar |

Every adjacent pair differs. Need Help and Letter steps are both white, but
they aren't adjacent.

### Hero photo

Havasu Falls sits behind "Arizona MVD Services Without Leaving Home"
(`.az-hero`, tokens `--hero-image*` / `--overlay-hero-photo`).

| Item | Value | Tag |
|---|---|---|
| Desktop image | `assets/images/hero-havasu-falls.jpg`, 1500×1007, 388 KB | provisional (supplied photo) |
| Phone image (≤767px) | `assets/images/hero-havasu-falls-800.jpg`, 800px, 118 KB — only this one downloads on phones | derived |
| Scrim | Neutral 600 at 62%, uniform | derived |
| Crop | `cover`; centered on desktop, 64% from left on phones to keep the falls in frame | derived |
| Fallback | the old gray (`--overlay-hero-bg`) shows while loading or if the image fails | — |

- **Contrast:** white text holds ≥ 5.10:1 even over the pure-white waterfall
  spray (58% is the AA floor, at 4.46:1). It reads 6.79:1 over the sky, 7.80:1
  over the pool, and 9.61:1 over the canyon walls.
- **Checked** at 320, 375, 1440 and 2560 with no horizontal scroll. At 2560 the
  1500px photo upscales about 1.7×; a 2560-wide original would sharpen that.
- **Gotcha:** a relative `url()` inside a custom property resolves against the
  stylesheet that *uses* the `var()` (style.css), not tokens.css. So the
  token paths are written from `direction-b/`.

### Footer

Built from the State of Arizona footer component (Figma: 1 Column, Desktop and
Mobile). The Figma footer carries content this page doesn't have (description,
address, contact, social icons), and copy can't change. So the existing content
maps onto its layout, with element order unchanged:

| Figma area | Holds here |
|---|---|
| Main area (primary/dark) | ADOT logo, "All Rights Reserved." |
| Bottom bar (lighter band) | the four footer links (left), language picker (right, where Figma has social icons) |

| Property | Value | Tag |
|---|---|---|
| Background | primary/dark `#02393D` (was the turquoise gradient + 3px sage top border) | from-figma |
| Main padding | 48 / 120 / 48 / 120 at 1440. Figma top is 96; reduced to match the bottom at your request (this footer has much less content than the Figma one) | top derived, rest from-figma |
| Main padding, narrower | 32 / 32 / 32 / 32 at 375 (sides follow the grid margin) | derived |
| Space above footer | Need Help section bottom padding was a hard-coded 100px; now `--space-fluid-section-y` (40–60px) like every other section | derived |
| Gap | 32px | from-figma |
| Bottom bar background | Turquoise 500 `#135959` | provisional — Figma shows a lighter band but no swatch |
| Bar vertical padding / link gap | 20px / 16px | provisional — read from the frame, not the inspector |
| Links | white, underlined, 44px touch targets; stacked under 768px like the Figma mobile frame | derived |

- **Contrast:** white on `#02393D` is 12.69:1; white on the T500 bar is 8.07:1.
- **Focus:** the footer stays `.surface-dark`, so it keeps the white inverse focus ring.
- **Font size:** unchanged at 14px, because the State of Arizona type scale was reverted.

### Touch targets (≥ 44×44)

All buttons measured at 1440 and 375. Fixes made:
- alert dismiss buttons went from 32 to 44px
- the alert toggle got a 44px min-height
- the "See More" and "View All" text toggles got 44px line boxes

### Contrast results

| Pair | Ratio | Result |
|---|---|---|
| White nav text on `#02393D` | 12.69 | pass |
| T100 chevrons/underline on `#02393D` | 7.50 | pass |
| Secondary (white) edge on `#02393D` | 12.69 | pass |
| T400 text on white (secondary) | 5.15 | pass |
| White on T400 / T500 / T600 (primary states) | 5.15 / 8.07 / 12.69 | pass |
| Primary edge vs white / N50 | 5.15 / 4.81 | pass |
| Secondary hover T500 on T50 (derived) | 6.52 | pass |
| Secondary pressed T600 on T100 (derived) | 7.50 | pass |
| Focus T400 vs white gap | 5.15 | pass |
| Inverse focus white vs header / hero / gradient | 12.69 / 7.05 / ≥5.15 | pass |
| Mobile-menu chevron N500 on white | 8.88 | pass |
| Footer: white on `#02393D` / on T500 bar | 12.69 / 8.07 | pass |
| Card hover border T400 vs white | 5.15 | pass |
| Promo text on white card | 18.23 / 8.88 | pass |
| *As-specced* secondary hover T400 on T50 | 4.16 | **fail → fixed (derived)** |
| *As-specced* secondary pressed T400 on T100 | 3.05 | **fail → fixed (derived)** |
| T400 primary edge on `#02393D` | 2.46 | **fail → header uses secondary** |
| Mobile-menu chevron (sage, original) on white | 2.37 | **fail → fixed (icon token, kept after the revert)** |
| Disabled N400 on N100 | 3.50 | below 4.5, but disabled controls are exempt (1.4.3) |
| Card border N100 vs white | 1.48 | decorative; the shadow and content carry the edge |
| White card vs N50 (benefits) | 1.07 | decorative; benefit cards aren't interactive |
