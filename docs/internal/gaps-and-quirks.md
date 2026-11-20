# Incomplete parts and non-standard patterns

An honest list as of November 2026 (branch `react-vite-jsx`). **Nothing listed here has been changed.** Each item says what it is, why it matters, and where it lives, so it can be planned.

Severity: **High** = blocks real users or is a security risk · **Medium** = will bite during the next phase of work · **Low** = tidy-up.

---

## Part A: Incomplete

### A1. No backend at all (High)

| Missing | What the app does instead | Reference |
| --- | --- | --- |
| API server | Nothing. `server.js` only serves static files | `API_DOCUMENTATION.md` (contract), `DEVELOPER_HANDOVER.md` §5 and A1–A5 |
| Persistence | All data lives in browser memory and resets on reload | [database.md](database.md) |
| Authentication | "I already have an account" loads the demo account with no password. Passwords typed during sign-up are never stored or checked | API §1 |
| Phone verification | Fixed code `482913` | `App.obNext()` |
| Payments (Stripe) | "Add card" just shows "Card saved"; upgrades and credit are simulated | `useOnboardingView.ts` (`addCard`), `useSubscriptionView.ts` (`up.confirm`) |
| SMS / WhatsApp / e-mail | "Send message" waits 0.7s and shows a toast | `App.sendMsg()` |
| Push notifications | An in-app banner pretends to be a push, triggered by a timer | `App.schedulePush()` |
| Profile photo upload | Toast only | `useProfileView.ts` (`pf.photo`) |
| Background jobs (Redis/BullMQ) | Lesson status changes are computed in the browser every 15s | `App.tick()`, `liveStatus()` |
| Referral validation | Codes are checked against a hard-coded demo table | `REF_CODES` in `src/demo/referral-codes.ts` |
| `mode: 'live'` | The setting exists in `config.js` but no code reads it; there is no `api.js` client | `public/js/config.js` |

### A2. Database designed but unused (High)

Complete schema, but nothing connects to it, and the front-end data shapes differ from it (IDs, money units, statuses, times). See [database.md §7](database.md#7-front-end-model-vs-database-model).

### A3. The React conversion is not merged (High)

The React + Vite version is on branch `react-vite-jsx` and is **not committed or merged** at the time of writing.

#### The version on `main` does not render

On `main`, the page shows a fragment of script text instead of the app. Commit `36668b6` added a comment containing the text `<x-dc>` inside a `<script>` in `<head>`. The old runtime re-downloads the page as raw text and takes the **first** `<x-dc>` it finds, which is the one in the comment, and re-renders from there. The React version does not have this problem (the runtime is gone). If `main` must keep working before the merge, remove those characters from the comment.

### A4. Hosting and security gaps (High / Medium)

- **No security headers from `server.js`** (High). The CSP, HSTS, `X-Content-Type-Options`, `frame-ancestors` and so on are defined only in `.htaccess` (Apache) and `server/nginx.conf.example`. GoDaddy Node.js hosting runs `server.js`, so production currently sends none of them.
- **`'unsafe-eval'` is still in the CSP** in `.htaccess` and the nginx example. The React build no longer needs it. `'unsafe-inline'` for scripts is also no longer needed, since there are no inline scripts.
- **Known vulnerable dependencies** (Medium). `npm audit` reports `body-parser` (high) and `qs` (moderate), both pulled in by Express 4. `npm audit fix` resolves them.
- **Node version** (Medium). Vite 8 requires Node ≥ 20.19 (`engines` in `package.json`). Confirm the GoDaddy Node.js version before deploying.
- **The marketing page is not served by `server.js`** (Medium). `product/index.html` sits outside `public/`, so the Node deployment has no product page. Its asset links (`../css/product.css`) assume it sits next to the app's files.
- **`HOST` defaults to `0.0.0.0`** (Low). On a developer machine, the server is reachable from the local network.

### A5. Time zone (Medium)

`TODAY` and `NOW` come from the **device clock** in whatever time zone the device is set to. The spec says Europe/London with BST/GMT handling (handover §5 step 4).

### A6. Offline writes (Medium)

The offline banner exists (preview prop `offline`), but there is no queue of changes made offline. Offline support is read-only caching of the app files.

### A7a. TypeScript is not fully strict yet (Medium)

All source files are TypeScript and the domain data and store are typed (`src/types/`), but two strict checks are still off in `tsconfig.json`:

- `noImplicitAny`: many function parameters (mostly in store actions and view hooks) have no type annotation, so they are `any`.
- `strictNullChecks`: code that looks a learner or booking up by id assumes it exists. Turning this on reports about 150 places that need a guard or an assertion.

Also, each view hook returns a loosely typed object (`View`): the screen-specific values (`v.hm`, `v.bf`…) are `any` in the components. Next steps: give each view hook a precise return type, then turn on `noImplicitAny`, then `strictNullChecks`.

### A7. Few tests, no CI (Medium)

TypeScript, ESLint (including import boundaries between features), Prettier and Vitest are set up; `npm run check` runs them all. Unit tests cover only the shared helpers in `src/lib/` and the referral and plan rules. Screens and `App` actions have no tests, there are no end-to-end tests, and there is no CI pipeline. The test plan in `DEVELOPER_HANDOVER.md` A6 is not implemented.

### A8. Broken or outdated pieces of the repository (Medium / Low)

- **`design-system.html`** (Medium) loads `css/nexdrive-base.css`, `js/vendor/react*.js` and `js/nexdrive-runtime.js` from paths that no longer exist, and the old runtime has been removed. It doesn't render.
- **`.gitignore`** (Low) still lists `public/sw-precache.js`. That file is now written to `dist/`, which is ignored anyway.

#### Documentation that is out of date

| Document | Problem |
| --- | --- |
| `README.md`, `DEPLOYMENT.md`, `DEVELOPER_HANDOVER.md` §2, §8, A3, A8 | Describe the old "no build step, template + runtime" front end, `js/nexdrive-runtime.js`, `'unsafe-eval'` and a root-level `index.html` app |
| `public/js/config.js` comment | Points to `docs/developer-guide.md`, which does not exist |
| `database/schema.sql`, `migrations/002_*.sql` comments | Point to `docs/business-rules.md`; the file is `docs/BUSINESS_RULES.md`. That works on Windows but breaks on Linux and on GitHub |
| `DEVELOPER_HANDOVER.md` A10 | Links to `user-flows.md` and `database-schema.md`, which do not exist (the real files are `docs/USER_FLOWS.md` and `DATABASE_SETUP.md`) |
| `DEVELOPER_HANDOVER.md` §6 vs `DATABASE_SETUP.md` | The `complete-lessons` job runs "every 15 minutes" in one and "every 5 min" in the other |
| `API_DOCUMENTATION.md` §0.2 | The example uses booking status `"booked"`, which is not a value of `booking_status` |
| `CHANGELOG.md` | No entry for the Node/PWA packaging or the React conversion |

### A9. Placeholder business values (Medium)

- Subscription prices are marked "placeholder, confirm before launch" in `seed.sql`.
- The same prices are hard-coded in three places: `database/seed.sql`, `src/domain/plans.ts` (`PLANS`), and `product/index.html`. They must be changed together.
- The demo referral code `NEXMARK14` would fail the database's code format check (it needs two digits from 20 to 99).

---

## Part B: Non-standard patterns

Most of these come from how the app was made. It was exported from a design tool as one HTML template plus one logic class, then converted to React mechanically so that behaviour stayed identical. They work, but an experienced React developer will find them unusual.

| # | Pattern | What is usual instead | Impact |
| --- | --- | --- | --- |
| B1 | **One stateful class component (`App`, ~1,100 lines) holds every piece of state and every action** | Function components with hooks (`useState`, `useReducer`); state split by feature, or a store (Zustand, Redux Toolkit); context for shared data | Hard to test pieces in isolation; every change re-renders the whole app. Fixed: state and actions now live in a Zustand store, with actions split into one slice per feature |
| B2 | **A single "view model" object `v` (built by a ~2,100-line function) is passed to every component**, and each one destructures what it needs | Each component receives only the props it uses, or reads from a store; derived values computed close to where they're used (`useMemo`) | Unclear which component depends on what; one large function to change. Mostly fixed: each screen and sheet calls its own view hook in its feature folder; they still all start from one shared context hook that subscribes to the whole store |
| B3 | **Class component, not hooks** | Hooks are the norm since 2019. Classes still work but are legacy style | Most current docs and examples won't match. Fixed: `App` is a function component using hooks |
| B4 | **Inline `style={{…}}` on almost every element** (roughly 1,500 style objects) with literal hex colours, while `base.css` defines colour tokens (`--nd-violet`…) that the components don't use | CSS modules, a utility framework (Tailwind), styled components, or a component library; tokens referenced, not repeated | Theming or a brand change means editing many files. Mostly fixed: static styles are now in per-component CSS Modules using `var(--nd-…)` tokens (`src/styles/tokens.css`); about 270 run-time values remain inline, and some colours are still computed in the view model |
| B5 | **Hover/focus/pressed styles via `!important` utility classes** (`interactions.css`), needed because inline styles beat normal CSS | Normal CSS rules, possible once styles move out of inline objects | Fragile ordering; `!important` spreads. Still needed for elements that keep a run-time inline colour; can go once the view model stops passing colours |
| B6 | **Very short identifiers** (`s`, `p`, `v`, `B`, `L`, `d`, `m`, `hm`, `bf`, `bk2`, `sh`, `fS`, `fDM`, `bvm`, `rvm`) and dense one-line logic | Descriptive names | Slow to read; easy to misread. Partly fixed: the helpers in `src/lib/` and the feature constants now have descriptive names (`formatShortDate`, `timeToMinutes`, `formatGBP`, `isValidPostcode`…); the short names inside `App` and the view model remain |
| B7 | **Navigation is a stack in state** (`tab` + `stack`), with no URLs | A router (React Router) with a URL per screen | No deep links, no browser back button, no bookmarkable screens; the server's SPA fallback has nothing to route |
| B8 | **A module-level mutable clock**: `export let TODAY, NOW`, reassigned by `syncClock()`, plus `sd()` shifting all demo dates relative to 7 Oct 2026 | Pass "now" in explicitly, or use a date library and a clock abstraction | Hidden global state; tests need clock mocking |
| B9 | **Hand-rolled date/time helpers on `'YYYY-MM-DD'` strings and minutes** | A time-zone-aware library (Luxon, date-fns-tz) | BST/GMT and time-zone issues once real data arrives (A5) |
| B10 | **`setState` is sometimes followed by code that reads `this.state` in the same handler.** It was safe under the old runtime, where updates were synchronous. React applies updates later. One case was fixed during the conversion (demo flow "booking clash"); the rest were checked and are safe today | Read the new values from the update callback (`setState(update, callback)`) or compute them first | A trap for future edits: `this.state` is stale right after `setState`. No longer applies: the store applies updates immediately, so `get()` right after `setState` sees the new values |
| B11 | **Runtime config through a global** (`window.NEXDRIVE_CONFIG` from a separately loaded `js/config.js`) | `import.meta.env` / `.env` files baked in at build time | Deliberate (edit per environment without rebuilding), but differs from Vite convention |
| B12 | **Build tools listed in `dependencies`, not `devDependencies`** | Vite and plugins in `devDependencies` | Deliberate: the host runs the build and may skip dev dependencies. Installs are larger in production |
| B13 | **Hand-written service worker plus a custom `build.js`** for the precache list and cache versioning | `vite-plugin-pwa` / Workbox | More code to maintain; offline edge cases are ours to handle |
| B14 | **Mixed absolute and relative URLs.** Vite `base: './'` and image paths like `'assets/logos/…'` are relative, while `sw.js` uses root-absolute paths (`'/index.html'`, `'/sw-precache.js'`) | One consistent base path | Works at a domain root. Under a sub-folder (for example `user.github.io/nexdrive/`) the app loads but offline mode breaks |
| B15 | **Business rules implemented in the browser** (pricing, overlap check, validation, referral eligibility, reward maths) | The server is the authority; the UI only previews | Fine for a demo; must be duplicated or moved once the API exists (the handover says the server must recalculate) |
| B16 | **Demo-only code mixed into the app**: the workflow panel (`FLOWS`, `App.flow()`), sample-details buttons, fixed OTP, `REF_CODES`, "demo: qualify" buttons | Behind a build flag or in a separate dev-only module | Hidden by `showDemoPanel: false`, but it ships to production |
| B17 | **Front-end data shapes differ from the database** (string IDs, pounds as floats, hours as decimals, display statuses stored as data) | Front end mirrors the API contract | A mapping layer is needed later ([database.md §7](database.md#7-front-end-model-vs-database-model)) |
| B18 | **Repository mixes several things** (app, marketing page, DB spec, handover docs, Apache/Nginx configs) in one folder, with `index.html` at the root next to docs | Separate folders/packages (`apps/web`, `apps/marketing`, `db/`) | Easy to confuse what is served |
| B19 | **The Express server uses CommonJS (`require`)** while the app uses ES modules (`import`), and the package is `"type": "commonjs"`, so the Vite config needed the `.mjs` extension | One module system throughout | Cosmetic |
