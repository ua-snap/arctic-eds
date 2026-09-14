# Arctic-EDS: Nuxt 2 → Nuxt 4 migration plan

_Drafted 2026-09-12 on branch `nuxt4-migration-plan`. Goal: move to Nuxt 4 with **no functional changes** to what users see. Every place where "no functional change" is not fully achievable, or where there is more than one reasonable path, is called out as a numbered **Decision** in §4._

**Decision log**

| Decision | Status |
|---|---|
| D1 Node version | **Decided 2026-09-12: Node 22. Revised 2026-09-14 in PR review: Node 24** |
| D2 State management | **Decided 2026-09-12: Pinia** |
| D3 UI kit | **Decided 2026-09-12: Buefy 3 + Bulma 1. Refined 2026-09-14 in PR review: use Bulma 1 / Buefy 3 defaults, no 0.9 parity shims** |
| D11 rename `Map.vue` | **Decided 2026-09-14 in PR review: renamed to `LeafletMap.vue`** |
| D4–D10 | Open; recommendations stand until overridden |

---

## 0. TL;DR

- This is not a Nuxt upgrade so much as a **framework generation jump**: Nuxt 2 → 4 drags Vue 2 → 3, Vuex → Pinia, Webpack → Vite, Buefy 0.9 → 3, Bulma 0.9 → 1.0, and Node 16/18 → 22 along with it.
- The app is small (≈6,000 lines across 43 source files, 2 store modules, 6 pages, 1 layout). Roughly **80% of the edits are mechanical** (`mapGetters` → `mapState`, `process.env.x` → runtime config, `destroyed` → `unmounted`, `::v-deep` → `:deep()`).
- Two areas are **not** mechanical and carry the real risk:
  1. **Styling.** Buefy 3 hard-depends on Bulma 1.0, which rewrote its Sass to the module system and moved to CSS variables. Expect small visual drift and a rewrite of the two SCSS files. (Decision D3)
  2. **State + routing.** The report store reads route params through `vuex-router-sync`, which is dead (peer-depends on Vuex 3 / vue-router 3). Both store modules get rewritten as Pinia stores that read `useRoute()` directly. (Decision D2)
- Six libraries are dead ends and get removed (§3). Six others are used today but **not declared** in `package.json` (they ride in as transitive deps of Nuxt 2 / nuxt-buefy) and must be declared explicitly or they vanish: `lodash`, `bulma`, `buefy`, `vuex`, `vue`, `axios`.
- Deploy target stays static (`nuxt generate`). The generated output moves from `dist/` to `.output/public/` (Nuxt leaves a `dist` symlink). Whatever uploads to S3 should be checked (Decision D8; the deploy step is not in this repo).

---

## 1. Where the codebase is today

| Thing | Installed | Notes |
|---|---|---|
| Nuxt | 2.15.8 (`target: 'static'`) | `package.json` allows `^2.15.7` |
| Vue | 2.6.14 | undeclared, via nuxt |
| Vuex | 3.6.2 + `vuex-router-sync` 5.0.0 | store reads `rootState.route.params` |
| Buefy | 0.9.20 via `nuxt-buefy` 0.4.22 | `css: false`; module also injects **MDI icon font 5.8.55 from jsDelivr** into `<head>` |
| Bulma | 0.9.3 | undeclared, via buefy |
| Leaflet | 1.8.0 direct + `nuxt-leaflet` 0.0.25 → `vue2-leaflet` 2.7.1 | **no `<l-*>` components are used anywhere**; code uses the raw `L` global |
| proj4 / proj4leaflet | 2.8.0 / 1.0.2 | Alaska Albers `EPSG:3338` CRS for the overview maps |
| HTTP | `@nuxtjs/axios` 5.13.6 (`$axios.$get`) and `@nuxt/http` 0.6.4 (`$http.$get`) | two clients for two calls |
| lodash | 4.17.21 | undeclared; used in 5 files (`find`, `filter`, `cloneDeep`) |
| Sass | `sass` 1.51 + `sass-loader` 10 | `@import '~bulma'` webpack-style paths |
| Bundler | Webpack 4 + Babel | `core-js`, `raw-loader` (unused) in deps |
| Unit tests | Jest 27 + `vue-jest` 3 + `@vue/test-utils` 1 | **zero unit test files exist**; `npm test` runs an empty suite |
| E2E | Playwright 1.53, 10 tests in `tests/test-suite.spec.js` | drives `npm run dev` on port 3000; runs in GitHub Actions on PRs to `main` |
| Node | 18.20.8 local, **16.20.2 in CI** | Webpack 4 fails on Node ≥17 (`ERR_OSSL_EVP_UNSUPPORTED`) unless `NODE_OPTIONS=--openssl-legacy-provider`; Node 16 is the only version that runs the Nuxt 2 toolchain unmodified |
| Custom HTML | `app.html` with a large `<noscript>` block and a `.hide-if-noscript` wrapper | confirmed live on arcticeds.org |

Confirmed from the live site and from the Phase 0 baseline generate: it is a Nuxt 2 static build whose payload **bakes the community list into `state.js` at generate time** (see D9). The baseline `nuxt generate` takes ≈10 s and emits exactly **six routes** (`/`, `/about`, `/glossary`, `/guidance`, `/maps`, `/report`) plus a `200.html` SPA fallback. **No report routes are prerendered**: the six community links on the home page sit inside a `v-if="safeMode"` block, so in normal mode nothing links to a report and the crawler has nothing to follow. Report pages are served entirely by the `200.html` fallback (or S3's `#!` redirect).

---

## 2. Major libraries: old → new

Only the libraries that shape the app. Versions are the npm `latest` tags as of 2026-09-12.

| Library | Old | New | Why / notes |
|---|---|---|---|
| **Nuxt** | 2.15.8 | **4.5.2** | Requires Node `^22.19 \|\| ^24.11 \|\| >=26`. Vite 8 based. |
| **Vue** | 2.6.14 | **3.5.42** | Comes with Nuxt. Options API is kept (D10). |
| **Vue Router** | 3.x (bundled) | **5.3.1** (bundled) | Only touched via `this.$route` / `this.$router` and route config. |
| **State: Vuex** | 3.6.2 + vuex-router-sync | **Pinia 4.0.3 + @pinia/nuxt 1.0.2** | Vuex 4 exists but Nuxt 4 has no store integration and vuex-router-sync is dead. See D2. |
| **UI kit: Buefy** | 0.9.20 (via nuxt-buefy) | **Buefy 3.1.0** (`buefy` package, Vue 3 line; `@ntohq/buefy-next` was folded back into it) | Same component API by design. Registered via a Nuxt plugin instead of a module. See D3. |
| **CSS: Bulma** | 0.9.3 | **1.0.4** | Forced by Buefy 3 (`dependencies: bulma ^1.0.4`). Sass modules + CSS vars. See D3. |
| **Leaflet** | 1.8.0 | **1.9.4** | Stay on 1.x. Leaflet 2.0 is alpha, drops the `L` global and breaks proj4leaflet. |
| **proj4** | 2.8.0 | **2.22.0** | Drop-in. |
| **proj4leaflet** | 1.0.2 | **1.0.2** (unchanged, last release 2022) | Works with Leaflet 1.x. Unmaintained; flagged as a watch item, not a blocker. |
| **HTTP client** | @nuxtjs/axios + @nuxt/http | **built-in `$fetch`** (ofetch) | Two calls total. |
| **Bundler** | Webpack 4 + Babel | **Vite 8** (bundled) | `?raw` import replaces `raw-loader`. |
| **Sass** | 1.51 + sass-loader | **sass 1.104** (no loader) | `@import` is deprecated in Dart Sass; Bulma 1 needs `@use` anyway. |
| **lodash** | 4.17.21 (undeclared) | **lodash-es 4.18.1** (declared) | ESM build tree-shakes under Vite. |
| **Unit tests** | Jest 27 + vue-jest | **none, or Vitest 5 + @nuxt/test-utils 4.3** | No tests exist today. See D5. |
| **E2E** | Playwright 1.53 | **Playwright 1.63** | Optional bump; config stays. |
| **Node** | 18 local / 16 CI | **22 LTS** | See D1. |

---

## 3. Libraries that cannot come along

| Package | Why it's dead | Replacement |
|---|---|---|
| `nuxt-buefy` 0.4.x | Nuxt 2 module; pins `buefy ^0.9.29` (Vue 2 only) | `buefy` 3 + `app/plugins/buefy.js`; MDI `<link>` added to `app.head.link` by hand |
| `nuxt-leaflet` 0.0.x → `vue2-leaflet` | Vue 2 only; last published 2022 | Not needed: nothing uses `<l-*>` components. Keep the existing `leaflet.client.js` plugin. (`@nuxtjs/leaflet` exists but adds vue-leaflet components we don't use; see D6.) |
| `vuex-router-sync` 5 | peer deps `vuex ^3`, `vue-router ^3` | Pinia getters call `useRoute()` directly |
| `@nuxtjs/axios` 5 | Nuxt 2 module (`this.$axios`) | `$fetch` |
| `@nuxt/http` 0.6 | Nuxt 2 module (`this.$http`) | `$fetch` |
| `raw-loader`, `sass-loader`, `core-js`, `babel-core` bridge, `babel-jest` | Webpack/Babel toolchain | Vite handles all of it (`?raw`, Sass, targets) |
| `vue-jest` 3, `@vue/test-utils` 1, `jest` 27 | Vue 2 only / replaced | Remove, or Vitest (D5) |

---

## 4. Decisions you need to make

Each one has a recommendation. Nothing in §5 starts until D1–D3 are settled; the rest can be decided as their phase comes up.

### D1. Node version — DECIDED: Node 24 (revised from 22 in PR review)

**Revision (2026-09-14):** the repo moved to Node 24. Node 22's bundled npm 10 could not `npm ci` the lockfile (see Phase 6), which needed an npm-upgrade step in CI; Node 24 bundles npm 11, so CI installs with the stock toolchain. `.nvmrc` = `24`, `engines.node` = `>=24.11` (Nuxt 4.5's floor on the 24 line). The original analysis follows.

Nuxt 4.5 refuses Node < 22.19. Local is 18, CI is 16.
- **Recommended: Node 22 LTS.** Add `.nvmrc` = `22`, `engines.node = ">=22.19"` in `package.json`, bump `actions/setup-node` to `22`.
- Alternative: Node 24 LTS. Fine too; 22 has the longer track record with the Playwright container image.

### D2. State management — DECIDED: Pinia
- **Recommended: Pinia.** It is what Nuxt 4 integrates with (`@pinia/nuxt` gives auto-imported stores, SSR payload serialization, devtools). The two store modules are ≈475 lines and translate almost line-for-line: mutations and actions both become actions, getters stay getters, `rootState.route` becomes `useRoute()`. Components keep the Options API and swap `...mapGetters({ x: 'report/x' })` for `...mapState(useReportStore, { x: 'x' })` (Pinia even exports `mapGetters` as an alias).
- Alternative: Vuex 4. Works with Vue 3 but you write the Nuxt plugin wiring yourself, lose SSR state hydration for free, and still have to replace vuex-router-sync. Not less work.
- Non-mechanical bits either way: `closeReport` is a *mutation* that calls `this.$router.push` (becomes an action calling `navigateTo('/')`); `destroy` writes an undeclared `state.placeName`.

### D3. UI kit — DECIDED: Buefy 3 + Bulma 1 (Option A), with stock defaults

**Refinement (2026-09-14):** no bridge stylesheets. Bulma 1 and Buefy 3 render with their own defaults; the only Bulma variables passed are the site's three pre-existing overrides (sans-serif family, `$grey-dark`, `$turquoise`). Markup that relied on removed Bulma 0.9 features is rewritten with Bulma 1 layout: the About page image pair uses the new `fixed-grid`, and the maps layer rows use `columns`. Visual drift from the Nuxt 2 site is accepted and will be tuned separately. The original analysis follows.

Only seven Buefy components are used: `b-radio` (12×), `b-field` (7×), `b-button` (3×), `b-input`, `b-autocomplete`, `b-progress`, `b-message` (1× each).
- **Option A (recommended): Buefy 3.1 + Bulma 1.0.4.** Least code churn: templates stay as they are, and Buefy 3 deliberately kept the 0.9 component API. Cost: Bulma 1 is a rewrite (Sass `@use` modules, CSS custom properties, some retuned defaults for titles, buttons, inputs, spacing). The two SCSS files get rewritten; variable overrides move into a `@use 'bulma/sass' with (...)` block. **Some visual drift is likely and has to be screenshot-compared page by page.** The `label.b-radio.radio span.control-label` override in `bulma-overrides.scss` targets Buefy internals and may need retuning.
- **Option B: drop Buefy, keep Bulma 0.9.4.** Replace the seven components with plain Bulma markup plus one small autocomplete component (≈150–250 lines of new code). Zero visual drift on Bulma itself, one fewer dependency with a thin maintainer base, but it *is* new code in the search box and unit toggle, which the Playwright suite exercises heavily.
- Option C: Oruga (the community successor UI kit). Different API, biggest rewrite, no upside here.

### D4. Reproducing `app.html` (the `<noscript>` block)
Nuxt 4 has no `app.html`. The 100-line noscript body and the `.hide-if-noscript` wrapper still need to end up in the HTML.
- **Recommended:** move the noscript body to `app/assets/noscript.html`, import it in `nuxt.config.ts` with `readFileSync`, and emit it via `app.head.noscript: [{ innerHTML, tagPosition: 'bodyOpen' }]` plus a second noscript entry in `<head>` carrying the `.hide-if-noscript { display:none }` style. Use `app.rootAttrs: { class: 'hide-if-noscript' }` for the wrapper. Result: one `<div id="__nuxt" class="hide-if-noscript">` instead of two nested divs; functionally identical.
- Alternative: a Nitro `render:html` hook that prepends the block to `bodyPrepend`. More code, same result.

### D5. Unit test tooling
`npm test` runs Jest against zero test files.
- **Recommended: remove Jest and its five support packages.** Playwright is the real test suite and stays.
- Alternative: scaffold Vitest + `@nuxt/test-utils` so there is a place to put unit tests later. Adds ≈4 dev deps and a config file; no tests get written as part of this migration.

### D6. Leaflet wiring
- **Recommended: plain `leaflet` + the existing client plugin.** `app/plugins/leaflet.client.js` keeps importing `leaflet`, `leaflet/dist/leaflet.css`, `proj4`, `proj4leaflet` (wrapped in `defineNuxtPlugin`). Leaflet 1.9 still assigns `window.L`, and `store/map.js` / `MiniMap.vue` keep using the `L` global exactly as now. This is what keeps those files SSR-safe without any `<ClientOnly>` wrappers (leaflet touches `window` at import time, so it must never be imported by a module that runs on the server).
- Alternative: `@nuxtjs/leaflet` module. Brings vue-leaflet components and auto-imports we don't use.
- Watch item: Vite pre-bundles `proj4leaflet`'s UMD wrapper through its CommonJS path (`require('leaflet')`). Expected to resolve to the same Leaflet instance; verified in Phase 5, with a fallback of importing leaflet first and calling the factory manually.

### D7. Environment variable names
Today: `GEOSERVER_URL`, `SNAP_API_URL`, `RASDAMAN_URL`, `MOCK_API`, `EDS_SAFE_MODE`, `SITE_SLOW`, read at build time.
- **Recommended: keep the same names.** Map them in `nuxt.config.ts` → `runtimeConfig.public.{geoserverUrl, apiUrl, rasdamanUrl, mockApi, safeMode, siteSlow}` with the same defaults. README and any deploy scripts keep working unchanged. (Nuxt's own `NUXT_PUBLIC_*` names also work automatically, but nothing needs them for a static build.)
- Note: `mockApi`, `safeMode`, `siteSlow` become real booleans (`!!process.env.X`) rather than the raw string; every consumer only tests truthiness, so behaviour is identical.

### D8. Rendering mode and deploy pipeline
- **Recommended: keep SSR prerendering (`nuxt generate`), which is the Nuxt 4 equivalent of `target: 'static'`.** The same six routes prerender, plus `200.html`/`404.html` fallbacks. In normal mode Nuxt 4's crawler finds no report links either, so output parity is exact. In safe mode (`EDS_SAFE_MODE`) the crawler *would* additionally prerender the six linked report routes; harmless (report data is client-fetched), and it can be pinned off with `nitro.prerender.ignore` if you want byte-for-byte parity there too.
- Output path changes from `dist/` to `.output/public/` (Nuxt creates a `dist` symlink for compatibility). **The deploy step is not in this repo**; whoever runs it needs to confirm it follows the symlink or point it at `.output/public`.
- The `#!` redirect hack in `pages/index.vue` (S3 404 → `/#!/path`) is preserved as-is, moved from `created()` to `mounted()` so it never runs during prerender. Nuxt 4 also emits `200.html` / `404.html`, which S3's error document could point at instead; that is a hosting change and is out of scope unless you want it.
- Alternative: `ssr: false` (pure SPA). Simpler mental model, loses prerendered HTML for the text pages (SEO/OG previews).

### D9. Community list: baked at build time vs fetched at runtime
Today the live site's static payload contains the full community list, captured when `nuxt generate` ran (Nuxt 2 runs `SearchControls.fetch()` on the server and serializes the store). New communities tagged `eds` in the API do not appear until the next deploy.
- **Recommended: preserve current behaviour** by calling `fetchPlaces()` in a `useAsyncData` with `server: true` so the Pinia state is serialized into the payload during generate, exactly as now.
- Alternative: fetch at runtime (`server: false`). Always current, one extra ≈100 KB request on first load. This is a (small) functional change, so it needs your OK.
- The report data itself (`/eds/all/lat/lng`, "up to a few minutes") is fetched **client-side only**, both today (`mounted() { this.$fetch() }`) and after. The baseline generate never calls the report API (no report routes are crawled), and neither will Nuxt 4's.

### D10. Options API kept (recommended) vs. Composition API rewrite
Every component stays Options API. Vue 3 supports it fully, mixins still work, and it keeps the diff reviewable. A `<script setup>` rewrite can be a separate, later PR if wanted.

### D11. Optional clean-ups (default: **not** in this migration)
- ~~Rename `components/Map.vue` → `LeafletMap.vue`~~ **Done in PR review (2026-09-14).** (The component named `Map` shadowed the JS global inside `MapBlock.vue`.)
- Move `components/map_content.js` out of `components/` (Nuxt 4 scans `.js` there and would register a useless `<MapContent>` component). **This one I'd do**: `app/data/map_content.js`, imports updated. No behaviour change.
- Prettier 2 → 3, `page.$$` → locators in the Playwright suite, TypeScript. All deferred.

---

## 5. Work plan

Phases are sequential; each ends with the app building. Estimated effort assumes D3 = Option A.

### Phase 0. Baseline (½ day)
_Artifacts live in the gitignored `.baseline/` directory at the repo root: `dist-default/`, `dist-safe/`, `dist-mock-slow/` (generated sites), `screenshots/`, `playwright-report/`, `generate-*.log`, `versions.txt`._
- [x] Node 22 already installed via nvm (22.22.2); `.nvmrc` = `22` added (takes effect from Phase 1; the Nuxt 2 baseline runs on Node 18).
- [x] Playwright suite on `main`: **20 passed / 0 failed in 3.0 min** (10 tests × Chrome + Firefox, CI mode). Report in `.baseline/playwright-report/`. (Runner on Node 18 with `NODE_OPTIONS=--openssl-legacy-provider` so the Nuxt 2 dev server it spawns can build; Playwright 1.53 refuses Node 16.)
- [x] `npm run generate` on `main` (Node 16): ≈10 s, 6 routes + `200.html`, archived as `.baseline/dist-default/`; `EDS_SAFE_MODE=1` → `dist-safe/` (11 routes: the 5 community links get crawled, the lat/lng link does not); `MOCK_API=True SITE_SLOW=1` → `dist-mock-slow/`. Generated `<head>` tags and the noscript body prefix saved as text for the Phase 1 head/noscript rewrite.
- [x] Reference screenshots at 1920×1080 (viewport + full page) in `.baseline/screenshots/{default,safe,mock-slow}/`: home, about, glossary, guidance, maps, autocomplete open, lat/lng invalid/valid, Anchorage report (imperial + metric), lat/lng report, loading state, out-of-extent point, `SITE_SLOW` banner, safe-mode home/report. Two facts for Phase 7: an out-of-extent point returns an *empty* report today, not the error banner (the banner needs an API failure); and a safe-mode lat/lng URL never resolves (safe data is keyed by pre-baked points), so safe-mode capture 12 shows the permanent loading state. The safe set has no 06–08 captures because safe mode hides the search controls.

**Phase 0 status: complete (2026-09-12).** Everything above is reproducible with `.baseline/serve.py` + `.baseline/screenshot.mjs`; see `.baseline/README.md`.

### Phase 1. Scaffold Nuxt 4 (1 day)
- [ ] `package.json`: replace deps (see table below), `engines`, scripts: `dev: nuxt dev`, `build: nuxt build`, `generate: nuxt generate`, `preview: nuxt preview`, drop `start` (no server in a static build), drop or replace `test` (D5).
- [ ] New `nuxt.config.ts` (`defineNuxtConfig`), `compatibilityDate: '2026-09-12'`:
  - `app.head` ← old `head` (`hid` → `key`; keep umami `<script>` attrs verbatim; add the MDI 5.8.55 stylesheet `<link>` that nuxt-buefy used to inject, `rel="preload" as="style" onload="this.rel='stylesheet'"` to match). Known micro-difference: unhead drops the `<meta name="description" content="">` tag because its content is empty; every other head tag renders. Not user-visible; left as is.
  - `app.rootAttrs`, `app.head.noscript` (D4).
  - `css: ['~/assets/scss/main.scss']`.
  - `runtimeConfig.public` (D7).
  - `modules: ['@pinia/nuxt']`.
  - `hooks['pages:extend']`: push `/report/community/:communityId` and `/report/:lat/:lng` pointing at `pages/report.vue`'s file, plus `{ path: '/:pathMatch(.*)*', redirect: '/' }`. This is the literal translation of `router.extendRoutes`.
- [ ] Adopt the Nuxt 4 `app/` layout: `git mv` `components pages layouts plugins mixins assets` → `app/`; `static/` → `public/`; `store/` → `app/stores/` (rewritten in Phase 3). `~/` keeps resolving to `app/`, so imports do not change.
- [ ] `app/app.vue`: `<NuxtLayout><NuxtPage /></NuxtLayout>`.
- [ ] Delete: `app.html`, `.babelrc`, `jest.config.js` (D5), `plugins/vuex-router-sync.js`, `plugins/README.md`, `store/README.md`.
- [ ] `.gitignore`: add `.output`, `.nitro`, `.data`.
- [ ] `npm install`, commit the new lockfile. App will not build yet.

Dependency target for `package.json`:

```
dependencies:   nuxt ^4.5, vue ^3.5, pinia ^4.0, @pinia/nuxt ^1.0,
                buefy ^3.1, bulma ^1.0.4 (explicit), leaflet ^1.9.4, proj4 ^2.22,
                proj4leaflet ^1.0.2, parse-dms 0.0.5, lodash-es ^4.18
devDependencies: sass ^1.104, @playwright/test ^1.63, prettier ^2.7 (unchanged),
                 [vitest ^5, @nuxt/test-utils ^4.3, @vue/test-utils ^2.5 — only if D5 = Vitest]
removed:        @nuxt/http, @nuxtjs/axios, core-js, nuxt-buefy, nuxt-leaflet,
                nuxt-vuex-router-sync, raw-loader, vuex-router-sync, @vue/test-utils@1,
                babel-core, babel-jest, jest, sass-loader, vue-jest
```

### Phase 2. Styles: Bulma 1 + Buefy 3 (1 day, most of it visual comparison)
- [x] `app/plugins/buefy.js`: `defineNuxtPlugin(({ vueApp }) => vueApp.use(Buefy))`. **Gotcha found in Phase 5 testing:** Buefy 3 has no package `exports` map, so Node's resolver on the prerender/server side picks its CommonJS build, whose default import is a namespace object without `install`; Buefy silently fails to register, `<b-autocomplete>` renders as an unknown element, and its scoped slot throws (`Cannot read properties of undefined (reading 'option')`), which was the 500 on `/`. Fixed with `build.transpile: ['buefy']` so the ESM build is bundled on both sides.
- [ ] Rewrite `main.scss`: Google Fonts `@import url()` stays first; then `@use 'bulma/sass' with ($family-sans-serif: ..., $grey-dark: #312e30, $turquoise: #8ba09a)`; then `@use 'buefy/src/scss/buefy'`; then the existing custom rules. Drop the `~` prefixes (webpack-only). Check the exact `@use` form against the Buefy 3 docs when you get here.
- [ ] Split `bulma-overrides.scss`: the three Sass variables move into the `with (...)` block above; the `@font-face`, `body`, `table`, `.content`, radio/field spacing rules stay as plain CSS.
- [ ] Bulma 1 emits many deprecation-free but *different* defaults; diff the generated CSS against the Phase 0 baseline for `.title`, `.button`, `.input`, `.field`, `.message`, `.progress`, `.tile`, `.columns`. Retune overrides until screenshots match.
- [ ] `<style scoped>` blocks: `::v-deep X` → `:deep(X)` in `Map.vue`, `Term.vue`, `Footer.vue`, `LatLngSelector.vue` (×2), `PlaceSelector.vue`, `UnitRadio.vue`. (`::v-deep` still compiles in Vue 3 but warns.)

### Phase 3. State: Pinia stores (1 day)
- [ ] `app/stores/report.js` (`defineStore('report', () => { ... })` setup-style so `useRoute()` and `useRuntimeConfig()` are captured once):
  - state → `ref`s; every getter → `computed`; `rootState.route.params.*` → `route.params.*`.
  - mutations + actions → plain functions. `convertResults`, `setResults`, `setPlaces`, `setMetric`, `setImperial`, `destroy` unchanged in logic.
  - `closeReport()` → `navigateTo('/')` then clear state.
  - `apiFetch(url)`: `$fetch(url)` replaces `this.$axios.$get`. Mock branch: `const { default: mock } = await import('~/assets/mock.json')` (dynamic so the 2 MB file becomes a lazy chunk, never in the main bundle).
  - `safeModeFetch`, `fetchPlaces`: same treatment for `safe.json` (2.4 MB) and `safePlaces.json`; `this.$http.$get` → `$fetch`.
  - Keep the "convert on load unless fdd_cdd" rule and the `cloneDeep` semantics exactly.
- [ ] `app/stores/map.js`: keep `maps`, `layerObjects`, `legendControls` as **module-level plain objects** (the comment about Leaflet + reactivity applies to Pinia just the same). `Vue.set(...)` → `state.selectedLayers[mapName] = id`. `this.commit('map/x')` inside `toggleLayer` → direct calls. `process.env.*Url` → `useRuntimeConfig().public.*`.
- [ ] `mixins/safe.js`: `useRuntimeConfig().public.safeMode`.
- [ ] `mixins/numeric.js`: unchanged.
- [ ] Move `components/map_content.js` → `app/data/map_content.js`, fix the three imports (D11).

### Phase 4. Components and pages: Vue 3 + Nuxt 4 syntax (1–1½ days)
Global find/replace, then per-file items:
- [ ] `import { mapGetters } from 'vuex'` → `import { mapState } from 'pinia'` + `import { useReportStore } from '~/stores/report'` (or rely on `@pinia/nuxt` auto-import); `...mapGetters({ a: 'report/a' })` → `...mapState(useReportStore, { a: 'a' })`. 20 files.
- [ ] `this.$store.commit('report/x', p)` / `dispatch(...)` → `useReportStore().x(p)` (or `...mapActions`). Files: `UnitRadio`, `Map`, `LoadingStatus`, `Report`, `MapLayer`, `SearchControls`.
- [ ] `process.env.{safeMode,apiUrl,siteSlow}` in components → `this.$config.public.*`. Files: `DownloadCsvButton`, `Report`, `layouts/default`, `pages/index`.
- [ ] `layouts/default.vue`: `<Nuxt />` → `<slot />`.
- [ ] `Map.vue`, `MiniMap.vue`: `destroyed()` → `unmounted()`. Drop unused `lodash`/`mapGetters` imports.
- [ ] `MapLayer.vue`: `Vue.nextTick(fn)` → `import { nextTick } from 'vue'`; `nextTick(fn)`.
- [ ] `PlaceSelector.vue`: `<template slot-scope="props">` → `<template #default="props">` (Vue 3 removed `slot-scope`). Drop unused lodash import.
- [ ] `LatLngSelector.vue`: `@keydown.native.enter` → `@keydown.enter` (`.native` removed in Vue 3; Buefy's `b-input` forwards attrs/listeners to the inner `<input>`, verify the Enter key still submits).
- [ ] `Report.vue`: replace the Nuxt 2 `fetch()` / `this.$fetch()` / `this.$fetchState` trio with an explicit `mounted()` that sets a local `{ pending, error }` object around the store calls, and passes it to `<LoadingStatus :state>` unchanged. Client-only, as today.
- [ ] `SearchControls.vue`: `async fetch()` → `useAsyncData('places', () => store.fetchPlaces())` per D9.
- [ ] `pages/index.vue`: `created()` → `mounted()` for the `#!` redirect (never during prerender). `pages/report.vue`: `mapState`. `pages/maps.vue`: mixin only, no change.
- [ ] `pages/about|glossary|guidance.vue`: no changes (empty scripts, plain templates). `components/reports/*.vue` ×10: `mapState` swap only.
- [ ] `components/HeaderBanner`, `Footer`, `LegendItem`, `PreviewTable`, `Diff`, `UnitWidget`, `LayerList`, `Term`, `Navbar`: no logic changes (`Footer`/`Term` get the `:deep()` edit only).

### Phase 5. Leaflet plugin and maps (½ day)
- [ ] `app/plugins/leaflet.client.js`: same four imports inside `defineNuxtPlugin(() => {})`. Confirm `window.L.Proj.CRS` exists in the browser console (proj4leaflet through Vite's CJS interop, D6).
- [ ] `/maps`: all six map blocks render, default layers toggle on mount (the `nextTick` path), legends appear top-left, WMS tiles load from rasdaman/geoserver with the `EPSG:3338` grid.
- [x] **Regression found 2026-09-14 (missed by the Phase 7 pixel diff, which covered the full page but the pin is ~1,000 px of a 19,000 px capture):** the report mini-map marker was a broken image. Vite inlines `leaflet/dist/images/*.png` into `leaflet.css` as data URIs; `L.Icon.Default` derives its image folder from that CSS URL, fails on a data URI, and falls back to a bare relative `marker-icon.png`. Fix: import the three icon images in `leaflet.client.js` and pass them to `L.Icon.Default.mergeOptions`, removing the path-prefixing `_getIconUrl` (the documented pattern for Leaflet under a bundler).
- [ ] Report page mini-map: USGS topo tiles + marker at the right spot.

### Phase 6. Tests and CI (½ day)
- [x] `playwright.config.js`: `webServer.url` changed from `http://127.0.0.1:3000` to `http://localhost:3000`. **Found on the second CI run:** on Node 17+ Linux, `localhost` resolves to `::1` first, so `nuxt dev` listened on IPv6 and Playwright's IPv4 readiness probe never connected (180 s timeout). macOS resolves both, which is why it passed locally. `@playwright/test` resolved to 1.63 by the fresh install; run `npx playwright install` once for its browser builds.
- [x] `.github/workflows/playwright.yml`: Node from `.nvmrc`; `NODE_ENV: test` dropped. Keep `xvfb-run`; headless is already forced in CI.
- [x] **CI hydration race (found 2026-09-14).** After the migration, CI's Chrome dropdown tests timed out waiting for `.dropdown-item` in three of the four test runs on this branch (one passed only on retries, two failed); pre-migration CI had been green on every run since the workflow was added. The report API was not involved (it answers in ~0.3 s). Cause, established by reproduction: `nuxt dev` serves ~280 unbundled modules, so on a CI runner Vue can finish hydrating well after the page `load` event that `page.goto` waits for. The tests click the SSR-rendered search input before hydration, so Buefy's autocomplete never sees the `focus` event; its `hasFocus` flag stays false, and its value watcher only opens the dropdown when `hasFocus` is true. The typed value still reaches the component, which is exactly the state captured in all eight failed CI attempts (value present, input focused, clear icon shown, no dropdown). Holding all JavaScript until after the click reproduces it deterministically; waiting for hydration before clicking makes it pass. Firefox never failed because its tests run after Chrome's, against a warm dev server.
  Fix: `tests/test-suite.spec.js` navigates through a `gotoHydrated` helper that calls `page.goto` and then waits for `window.useNuxtApp().isHydrating === false` (the same check as `@nuxt/test-utils`' `waitUntil: 'hydration'`). Verified under a forced 4 s script delay on both `nuxt dev` and the generated build. No app or CI configuration change.
- [x] **Found on the first CI run (resolved by moving to Node 24):** `npm ci` under Node 22's bundled npm 10.9 fails with `lock file's cac@7.0.0 does not satisfy cac@6.7.14` (and the same for `commander`). `@bomb.sh/tab`, a dependency of `@nuxt/cli`, declares *optional* peer deps that the tree doesn't carry; npm 10's `ci` validation treats them as required, npm 11+ does not. Reproduced locally. Initial fix was an `npm@12` install step in CI; in PR review this was replaced by moving to Node 24 (npm 11), which needs no extra step.
- [x] Jest config and deps removed (D5 recommendation); `npm test` now runs Playwright.

### Phase 7. Verification (1 day)
- [x] Full Playwright suite green locally (Chrome + Firefox): 20/20. In GitHub Actions on Node 22: passed, 16 first try + 4 on retry.
  **Correction (2026-09-14):** those retries were *not* slow API requests, as first written here. Every CI timeout on this branch was the community search dropdown failing to open. See the CI hydration race note in Phase 6.
- [x] `npm run generate`; route list identical to the Phase 0 baseline (six routes + fallback).
- [x] Screenshot comparison against Phase 0 for every page; drift retuned to ≤ 0.05% in viewport captures (see results below).
- [ ] Manual checks: `MOCK_API=True npm run dev`, `EDS_SAFE_MODE=1` (maps nav hidden, CSV links hidden, pre-baked results), `SITE_SLOW=1` banner, print stylesheet (`no-print`), the `#!` redirect, view-source of a generated page for the noscript block, MDI icons in the search box and error button, OG/meta tags.
- [x] Bundle sanity: `mock.json` / `safe.json` are separate lazy chunks, not in the entry chunk.

### Phase 7 results (2026-09-12)

> **Superseded in part (2026-09-14).** The visual-parity work below was reverted in PR review: `bulma-tiles.scss`, `bulma-compat.scss` and the 0.9 variable overrides were removed in favour of stock Bulma 1 / Buefy 3 (see D3). The measurements are kept as a record of exactly where Bulma 1 differs from 0.9, which is the list to work from when tuning the new look. The functional results (suite, routes, console, head/noscript, variants rendering) still apply and were re-verified after the change.

**Status: complete for the default build.** Everything below is reproducible with the tooling in `.baseline/` (`serve.py`, `screenshot.mjs`, `compare.mjs`, `measure.mjs`, `measure-diff.mjs`, `console-check.mjs`); see `.baseline/README.md`.

- **Playwright suite:** 20 passed / 0 failed in 2.0 min against `nuxt dev` (was 3.0 min on Nuxt 2). Same 10 tests, Chrome + Firefox.
- **Generate:** same six routes plus `200.html`/`404.html`; `dist` symlink present; output 5.6 MB (was 6.5 MB). The two report-data fixtures are separate lazy chunks (1.2 MB + 0.7 MB), not in the entry chunk.
- **Console sweep** (dev server, every page + search flow + catch-all redirect): zero Vue warnings, no hydration mismatches. Only third-party YouTube-embed feature-policy noise and a dev-only Vue Router note that `#results` does not exist yet when a report route finishes navigating (same timing as before; the anchor appears after the fetch).
- **Head/noscript:** all head tags reproduced except the empty `<meta name="description" content="">` (unhead drops empty content); noscript block at body open; `#__nuxt` carries `hide-if-noscript`; umami attributes verbatim; MDI preload link present.

**Visual parity.** Pixel comparison of every page against the Phase 0 screenshots (threshold: per-channel distance > 40). First pass showed real drift; each cause was measured with element bounding boxes and fixed at the source rather than by eye:

| Cause | Symptom | Fix |
|---|---|---|
| Bulma 1 removed `.tile` entirely | About-page images stacked; maps layer rows lost their flex layout | `bulma-tiles.scss`: Bulma 0.9.3's tile rules carried forward verbatim |
| Vue 3 drops whitespace-only text nodes between elements | Nav items ≈4 px closer together (inline-block gaps gone) | `vue.compilerOptions.whitespace: 'preserve'` (Vue 2 behaviour) |
| Bulma 1 dropped `.title + .subtitle { margin-top: -1.25rem }` | Report subtitle 4 px higher | `bulma-compat.scss` restores the 0.25 rem net gap |
| Buefy 3 sets `line-height: 1.5` on `.b-radio` | Radio rows 4–6 px taller (report page +18 px) | `.b-radio.radio { line-height: 1.25 }` |
| Bulma 1 picks `is-primary` text colour by HSL lightness | Footer button text dark instead of white | `:root { --bulma-primary-invert-l: 100% }` |
| Bulma 1 zeroes the border on coloured buttons, and subtracts border width from button padding | Buttons 2 px smaller each way; footer 2 px higher | `--bulma-button-border-width: 1px` on coloured buttons, plus `$button-padding-horizontal: calc(1em + 1px)` so the padding lands on 0.9's values |
| Bulma 1 defaults: title weight 800, radius 0.375 rem, blue-tinted greys (`$scheme-s: 14%`, grey scale at hue 221) | Radii, input text colour, blockquote background | 0.9 values passed in the `@use 'bulma/sass' with (...)` block (`$scheme-s: 0%`, neutral grey scale, radii, `$title-weight: 600`) |
| Bulma 1 brightened `$blue`, `$cyan`, `$yellow`, `$red`, and renders link text at a fixed 58% lightness with a blue hover | Glossary term links and other links a different blue; warning/danger/info colours off | 0.9.3 colour values in the `with (...)` block; `--bulma-link-on-scheme-l: 53%` and the 0.9 `a:hover` grey in `bulma-compat.scss` |

Residual after fixes: every viewport capture ≤ 0.05% changed pixels; full-page captures ≤ 0.2%, attributable to 1-unit colour rounding (Bulma 1 round-trips colours through HSL) and anti-aliasing. Page heights and all measured element positions match the baseline exactly.

Variant builds were generated under Nuxt 4 and compared against their own Phase 0 captures:

| Build | Result |
|---|---|
| `MOCK_API=True SITE_SLOW=1` | 0.00–0.04% per capture after the message-component fix (the banner alone had been 6–12%). Mock report renders from the lazy-loaded fixture. |
| `EDS_SAFE_MODE=1` | 0.00–0.07% per capture. Same eleven HTML routes as Nuxt 2 (the five linked community reports get crawled; the lat/lng link does not). Safe-mode report renders from the lazy-loaded fixture; a safe-mode lat/lng URL stays on the loading screen exactly as before. |

Not verified: the real error banner (needs a dead API host).

### Phase 8. Docs (1 hour)
- [x] README: Node 24, `npm run preview`, `.output/public` + `dist` symlink, unchanged env var names.

**Total: ≈6–7 working days**, weighted toward visual verification rather than code.

---

## 6. File-by-file change matrix

| File | Change |
|---|---|
| `package.json`, `package-lock.json` | rewrite deps/scripts/engines |
| `nuxt.config.js` → `nuxt.config.ts` | full rewrite (head, runtimeConfig, pinia, pages:extend, noscript) |
| `app.html` | delete → `app/app.vue` + `app/assets/noscript.html` + head config |
| `.babelrc`, `jest.config.js` | delete (D5) |
| `.gitignore` | add `.output`, `.nitro`, `.data` |
| `.nvmrc` (new) | `24` |
| `.github/workflows/playwright.yml` | Node from `.nvmrc` (24), drop `NODE_ENV` |
| `playwright.config.js`, `tests/test-suite.spec.js` | no change |
| `README.md` | update build notes |
| `static/*` → `public/*` | move |
| `assets/scss/main.scss` | rewrite for Bulma 1 `@use` |
| `assets/scss/bulma-overrides.scss` | split: variables → `with()`, rest stays |
| `assets/{mock,safe,safePlaces}.json`, `images/*`, `ACKNO.TTF` | move under `app/assets/` |
| `layouts/default.vue` | `<Nuxt/>`→`<slot/>`, `$config` |
| `plugins/leaflet.client.js` | wrap in `defineNuxtPlugin` |
| `plugins/vuex-router-sync.js` | delete |
| `plugins/buefy.js` (new) | register Buefy 3 |
| `store/map.js` → `app/stores/map.js` | Pinia rewrite |
| `store/report.js` → `app/stores/report.js` | Pinia rewrite, `$fetch`, dynamic JSON imports |
| `mixins/safe.js` | runtime config |
| `mixins/numeric.js` | none |
| `components/map_content.js` → `app/data/map_content.js` | move only |
| `pages/index.vue` | `created`→`mounted`, `$config` |
| `pages/report.vue` | `mapState` |
| `pages/maps.vue` | none |
| `pages/about.vue`, `glossary.vue`, `guidance.vue` | none |
| `components/Report.vue` | fetch hooks → `mounted` + local state; `mapState`; `$config` |
| `components/SearchControls.vue` | `fetch()` → `useAsyncData` |
| `components/PlaceSelector.vue` | `slot-scope`→`#default`; `mapState`; `:deep` |
| `components/LatLngSelector.vue` | `.native` removed; `:deep` ×2 |
| `components/LoadingStatus.vue` | `mapState`; store action |
| `components/UnitRadio.vue` | `mapState`; store actions; `:deep` |
| `components/UnitWidget.vue`, `DownloadCsvButton.vue` | `mapState` (+ `$config` in the latter) |
| `components/Map.vue` → `app/components/LeafletMap.vue` | renamed; `unmounted`; store actions; `:deep`; drop dead imports |
| `components/MapLayer.vue` | `nextTick`; `mapState`; store action |
| `components/MapBlock.vue` | drop dead imports |
| `components/MiniMap.vue` | `unmounted`; `mapState` |
| `components/Term.vue`, `Footer.vue` | `:deep` |
| `components/LayerList.vue`, `LegendItem.vue`, `PreviewTable.vue`, `Diff.vue`, `HeaderBanner.vue`, `Navbar.vue` | none |
| `components/reports/*.vue` (10) | `mapState` swap only |

---

## 7. Things that look like bugs today (left alone unless you say otherwise)

- `store/map.js` `create()`: the `drag` handler references undefined `map.mapName` and `mapConfig`. Dead code because `dragging: false`, but would throw if dragging were ever enabled.
- `components/MapBlock.vue` `selectDefaultLayer()`: uses `this.map` (undefined) and is never called.
- `components/Diff.vue`: `typeof this.precision === undefined` compares to the value `undefined`, not the string, so the `precision = 2` default never applies. `toPrecision(undefined)` happens to behave like `toString()`, which is presumably what the tables have always shown.
- `store/report.js` `destroy()` / `closeReport()` set `state.placeName`, which is not in `state()` (getter of the same name shadows it).
- `components/SearchControls.vue` has `<style type="scss">` (should be `lang`); it is plain CSS so it works by accident.
- `components/SearchControls.vue` uses `column is-one-half`, which has never been a Bulma class (0.9 and 1.0 both define `is-half`). It had no effect; the two columns split evenly because they are the only two. Found by a template-class audit during PR review, and removed at reviewer request (2026-09-14).
- `store/report.js` `fetchPlaces()` in safe mode commits `safePlaces` and then still calls the API (the early return only fires on the *next* call).

None of these change during the migration. If you want any fixed, it should be a separate commit so the "no functional change" diff stays reviewable.

---

## 8. Risk register

| Risk | Likelihood | Mitigation |
|---|---|---|
| Bulma 1 visual drift | High (cosmetic) | Phase 0 screenshots, Phase 7 comparison, retune overrides |
| Buefy 3 prop/slot mismatch on `b-autocomplete` (`keep-first`, `clear-on-select`, `field`, `#empty`) | Low | Search box is covered by 8 of the 10 Playwright tests |
| proj4leaflet under Vite CJS interop | Low–Medium | Phase 5 console check; fallback is a manual factory call |
| `useRoute()` inside Pinia getters during prerender | Low | setup-style store captures the route once; getters are only read on the client for report pages |
| Deploy script expects `dist/` | Medium | `dist` symlink exists; confirm with whoever owns the S3 upload (D8) |
| Playwright suite flakiness from slow API | Pre-existing (≈25% per README) | unchanged; retries already configured in CI |
| MDI icons silently missing | Medium if forgotten | explicit `<link>` in `app.head`, checked in Phase 7 |

---

## 9. Open questions for you

1. D1–D3 above (Node 22? Pinia? Buefy 3 + Bulma 1?).
2. D9: keep baking the community list at build time, or fetch it live?
3. Where does the S3 deploy live, and does it upload `dist/`?
4. Any of the §7 bugs you want fixed on the way, as separate commits?
