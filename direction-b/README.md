# direction-b

Unpacked, human-readable source for `AZMVDNow-responsive-prototype.html`.

## How the bundle was encoded

The original file is a single self-contained HTML document produced by Claude's
artifact bundler. Everything — fonts, images, the React/ReactDOM vendor
libraries, and the component runtime — was gzip+base64-encoded into a JSON
manifest (`<script type="__bundler/manifest">`) and a JSON-encoded template
string (`<script type="__bundler/template">`). An inline bootstrap script
decoded each asset into a Blob/data URL, substituted the UUID placeholders
into the template, and swapped the whole document in via `DOMParser`.

The template itself is a Claude "DC" (declarative component) document: a
`<x-dc>` markup tree using custom binding syntax (`{{ expr }}`, `<sc-if>`,
`<sc-for>`, `style-hover`) plus a `<script type="text/x-dc" data-dc-script>`
tag holding a plain `class Component extends DCLogic { ... }`. A small
generated runtime (`dc-runtime.js`) interprets that markup/script pair with
React underneath — this is the actual framework the prototype is built on,
analogous to needing React itself to render JSX.

## What got extracted

- `index.html` — the `<x-dc>` markup (the page's real HTML/template)
- `style.css` — the two `<style>` blocks (Google Fonts `@font-face` rules +
  the component's responsive CSS), with font `url()`s pointed at local files
- `script.js` — the `data-dc-script` component logic (nav menus, mobile nav,
  alerts, language switcher, etc.), verbatim and unminified
- `assets/images/` — `az-mvd-now-logo.png`, `adot-logo.png`, and
  `unused-asset.jpg` (present in the bundle's manifest but not referenced
  anywhere in the template — kept for completeness)
- `assets/fonts/` — the 26 `woff2` files referenced by `style.css`, named by
  their original manifest UUID (several UUIDs are reused across multiple
  `@font-face` weight declarations in the source, so UUID-based names avoid
  misleading per-weight filenames)
- `vendor/` — `react.production.min.js`, `react-dom.production.min.js`
  (unpkg UMD builds), and `dc-runtime.js` (the decompressed, already-readable
  generated runtime — framework code, not hand-authored)

## Running it

`index.html` loads `script.js` into the runtime's `<script data-dc-script>`
element via a synchronous `XMLHttpRequest` (the runtime reads that element's
`textContent`, and browsers never fetch `script[src]` for non-JS `type`
attributes, so this keeps `script.js` as a normal standalone file instead of
inlining it). That requires serving over HTTP — `file://` blocks XHR to
sibling files. From the repo root:

```
npx http-server . -p 8756
```

then open `http://localhost:8756/direction-b/index.html`.

Verified side-by-side against the original bundled file at desktop (1400px)
and mobile (375px) widths — layout, fonts, icons, the nav hover dropdowns,
and the mobile accordion nav all match pixel-for-pixel with no console
errors.
