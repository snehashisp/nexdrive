# How the NexDrive codebase works

Written for an engineer who knows client/server, HTTP and backend programming, but has not worked with React or the JavaScript tool chain. Every tool or framework gets a short "how it works inside" box the first time it appears, followed by how this codebase uses it.

Diagrams for everything below: [component-diagram.md](component-diagram.md).

---

## 1. The product in one paragraph

NexDrive is a business app for independent UK driving instructors. They run their diary, learners, prices, booking messages, reminders, pickup navigation, referrals and subscription from their phone. It is a **web app that can be installed on a phone** (a Progressive Web App, section 7), so one codebase serves desktop browsers, phones and the home-screen "app".

## 2. What exists today and what doesn't

| Layer | State |
| --- | --- |
| Front end (`src/`, `public/`) | **Complete for demo use.** Every screen and workflow works, on made-up data held in browser memory |
| Web server (`server.js`) | **Complete for its job:** it serves the built front-end files. It has no API, no business logic and no database access |
| API, auth, payments, SMS/e-mail, push, jobs | **Not built.** Specified in `API_DOCUMENTATION.md` and `DEVELOPER_HANDOVER.md` |
| Database (`database/`) | **Schema written, not connected.** PostgreSQL DDL, seed and demo data exist; nothing reads or writes them yet ([database.md](database.md)) |

So the browser currently does everything a backend normally would: it holds the data, checks the rules (for example, no overlapping lessons) and "sends" messages (it only shows a confirmation). Full list: [gaps-and-quirks.md](gaps-and-quirks.md).

## 3. Repository map

```text
nexdrive/
├── index.html            Entry HTML page for the app (Vite's starting point, see §5)
├── vite.config.mts       Build tool + test runner settings (incl. the @/ import alias)
├── tsconfig.json         TypeScript settings (JS files still allowed while code is converted)
├── eslint.config.mjs     Lint rules, including import boundaries between features
├── .prettierrc.json      Code formatting settings
├── package.json          Library list + npm scripts (dev, build, start, check…)
├── package-lock.json     Exact installed library versions (generated, commit it)
├── build.js              Post-build step: writes the offline precache list into dist/
├── server.js             Express web server: serves dist/ (used in production and by `npm start`)
│
├── src/                  ← THE APP (React + TypeScript/JSX). Everything here gets compiled and bundled
│   ├── main.tsx            Entry point: mounts <App/> into the page
│   ├── app/                Application shell: wires the features together
│   │   ├── App.jsx           Root component: creates the store and provides it to the tree
│   │   ├── store/            The app store (Zustand): createAppStore.js composes the slices;
│   │   │                       appSlice.js (navigation, sheets, toasts, splash, clock); initialState.js
│   │   ├── hooks/            useShellView: values for the frame, status bar, nav, toast, sheets
│   │   ├── AppView.jsx       Top-level layout: phone frame, current screen, nav, sheets
│   │   ├── constants.js      Phone-frame sizes
│   │   └── components/       Shell pieces: bottom nav, status bar, splash, sheet overlay
│   ├── features/           One folder per business area; each holds its screens and sheets
│   │   │                     (components/), one view hook per screen/sheet (hooks/) and its
│   │   │                     store slice (stores/: that feature's actions)
│   │   ├── onboarding/       Welcome → register → verify → details → plan
│   │   ├── dashboard/        Home screen
│   │   ├── calendar/         Day / week / month views
│   │   ├── bookings/         Booking form, lesson details, booking list, message/maps/clash sheets
│   │   ├── learners/         Learner list, profile, form
│   │   ├── notifications/    Notification list, lesson-reminder push banner
│   │   ├── referrals/        Refer & earn, QR invite, NexDrive Credit
│   │   ├── subscription/     Plans, upgrade, cancel
│   │   └── settings/         Account (More), profile, pricing, bank details, preferences, security
│   ├── components/         Shared UI used across features: icons, toast
│   ├── hooks/              Shared hooks: useViewContext (what every view hook starts from),
│   │                         useStoreFacade, viewHelpers (lesson card, referral row)
│   ├── stores/             AppStoreContext: how components reach the store
│   ├── config/             Phone-frame sizes
│   ├── lib/                Pure helpers in TypeScript, with tests: dates, format, validation
│   ├── domain/             Business rules shared by several features: lesson statuses, plans, referrals
│   ├── demo/               Demo-only code: seed data, workflow panel, fake referral-code lookup
│   └── styles/             base.css (font + design tokens), app.css, interactions.css
│
├── public/               ← Static files copied into the build unchanged
│   ├── js/config.js        Runtime settings read by the app (demo mode, demo panel…)
│   ├── sw.js               Service worker (offline support)
│   ├── manifest.webmanifest  Install metadata (name, icons, colours)
│   ├── offline.html        Fallback page when offline with nothing cached
│   ├── assets/             Fonts, icons, logos, shared Nexyra site navigation
│   ├── css/product.css, js/product.js   Used by the marketing page
│
├── dist/                 ← Build output (generated by `npm run build`, git-ignored). This is what gets served
│
├── product/index.html    Public marketing page (plain HTML, not React; not served by server.js)
├── database/             PostgreSQL schema, migrations, seed + demo data (not connected yet)
├── docs/                 Business rules, user flows, security, brand; docs/internal = these notes
├── *.md (root)           Original handover pack: API contract, deployment, DB setup…
├── docker-compose.yml    Local PostgreSQL + Redis for future backend work
├── .htaccess, server/nginx.conf.example   Settings for hosting on Apache / Nginx instead of Node
└── design-system.html    Old visual reference page (currently broken, see gaps-and-quirks.md)
```

## 4. Tools and frameworks, one at a time

### 4.1 npm and `package.json`

> **How it works.** `package.json` lists dependencies with version ranges (`"react": "^18.3.1"` means 18.3.1 or any newer 18.x). `npm install` resolves them, downloads them into `node_modules/` and records the exact result in `package-lock.json`. `package.json` also holds **scripts**, named shell commands you run with `npm run <name>`. `npm start` is a shortcut for `npm run start`. npm runs a script called `pre<name>` automatically before `<name>`.

**In this repo:**

| Script | Runs | Purpose |
| --- | --- | --- |
| `npm run dev` | `vite` | Development server with instant reload |
| `npm run build` | `vite build && node build.js` | Compile `src/` + copy `public/` into `dist/`, then write the offline precache list |
| `npm start` | `prestart` (= `npm run build`), then `node server.js` | Build and serve, as the hosting does |
| `npm run check` | typecheck + lint + format check + tests | Run before committing |
| `npm run typecheck` | `tsc --noEmit` | Type-check the TypeScript files |
| `npm run lint` | `eslint .` | Code-quality rules and import boundaries |
| `npm run format` | `prettier --write …` | Reformat `src/` and tool configs |
| `npm test` | `vitest run` | Unit tests (`*.test.ts` next to the code they test) |
| `npm run clean` | delete `dist/` | |

Dependencies: `react`, `react-dom` (UI library), `zustand` (app store), `qrcode-generator` (QR codes), `express` (web server), `vite` and `@vitejs/plugin-react` (build tool). Dev dependencies (needed only on a developer machine, not to build or run): TypeScript, ESLint, Prettier, Vitest.

### 4.2 JavaScript modules (`import` / `export`)

> **How it works.** Each `.js`/`.jsx` file is a **module** with its own scope. A file makes things public with `export` and another file pulls them in with `import { name } from './file'`. A path starting with `./` or `../` is another file in the project. A bare name such as `'react'` means a package in `node_modules/`. Imports are **live bindings**: if the exporting module reassigns an exported `let` variable, importers see the new value.

**In this repo:** `src/lib/dates.ts` exports `let TODAY, NOW` (the current date and minute of the day) and a `syncClock()` function that updates them. Every other module imports them and always sees the current value (section 8.6).

### 4.3 React

> **How it works.** React is a library for building user interfaces from **components**. A component is a function or class that returns a *description* of some UI, not the UI itself. You never write "find this button and make it purple". You describe "given this data, the screen looks like this". When the data changes:
>
> 1. React calls your component again to get a new description. Descriptions are cheap plain JavaScript objects ("React elements"; the tree of them is often called the **virtual DOM**).
> 2. It compares the new tree with the previous one (**reconciliation**).
> 3. It applies only the differences to the real page (the **DOM**, the browser's live object model of the page).
>
> **State** is data that, when it changes, should redraw the page. A function component keeps local state with the `useState` hook; data shared by many components usually lives in a **store** outside React (here Zustand, section 4.8), which components subscribe to. Changing the state schedules a re-render; React batches several changes from the same event into one re-render.
>
> **Props** are inputs a parent passes to a child component, like function arguments: `<Toast toast={t} bottom={96} />` gives `Toast` two props.
>
> **Custom hooks** are your own functions built from other hooks, named `useSomething`. They are the usual way to share logic between components: a component calls `useHomeView()` and gets everything it needs to draw.
>
> **Context** passes a value to every component below a provider without threading it through props: `<AppStoreContext.Provider value={store}>` makes the store available to any component that calls `useContext(AppStoreContext)`.
>
> **Hooks** are functions starting with `use` that a function component calls on every render: `useState` (local state), `useRef` (a mutable box, often a DOM element), `useEffect(fn, deps)` (run `fn` after the render whenever `deps` change; the function `fn` returns runs as clean-up, for example to remove listeners when the component goes away).
>
> **Events:** React attaches one listener at the root of the page and routes clicks to whichever element's `onClick` prop matches ("synthetic events"). Handlers are plain functions.
>
> **Lists** need a `key` on each item so React can match items between renders.
>
> **Refs** (`useRef()`) give direct access to a real DOM element when you must, here to scroll a container back to the top.
>
> **StrictMode** (development only) deliberately renders twice and mounts → unmounts → mounts once, to expose code with hidden side effects. It does nothing in production.

**In this repo:**

- `src/main.tsx` does `createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)`. That hands the empty `<div id="root">` from `index.html` to React.
- All app data lives in **one store** (`src/app/store/createAppStore.js`), roughly 60 fields: which screen is open, the learners, the bookings, form drafts, toasts and so on. `initialState(phase, data)` builds them. Every user action is a store action defined in its feature's **slice** (`src/features/<feature>/stores/<feature>Slice.js`).
- `App` (`src/app/App.jsx`) is a function component. It creates the store once, subscribes to it with `useStore(store)`, starts listeners and timers in a `useEffect` (`mount()`), and resets the scroll position when the screen changes.
- **All other components are stateless functions** that only display what they're given (section 6).

### 4.4 JSX

> **How it works.** JSX is HTML-like syntax inside JavaScript. Browsers don't understand it, so a build step rewrites it into ordinary function calls:
>
> ```jsx
> <button onClick={save} style={{ color: 'red' }}>Save {name}</button>
> // becomes roughly:
> jsx('button', { onClick: save, style: { color: 'red' }, children: ['Save ', name] })
> ```
>
> The differences from HTML: `{ … }` embeds any JavaScript expression; `className` instead of `class`; `style` takes an object with camelCase keys (`fontSize`, not `font-size`); event props are camelCase (`onClick`). A component name starts with a capital letter (`<Home />`), and lowercase names are HTML tags. Conditional UI is written as `{cond && <X/>}` or `{cond ? <X/> : null}`, and lists as `{items.map((it, i) => <Row key={i} … />)}`. Text is escaped automatically, so user input can't inject HTML.

**In this repo:** the components under `src/app`, `src/features`, `src/components` and `src/demo` are JSX (`.jsx`), while `main.tsx` and `src/lib/` are already TypeScript. Components move to `.tsx` as each feature is converted. Styling is almost entirely inline `style={{ … }}` objects (section 8.3).

### 4.5 Vite (build tool and development server)

> **How it works.** Vite has two modes.
>
> - **Dev server** (`vite`): an HTTP server. When the browser requests `index.html`, it serves it. When the browser then asks for `/src/main.tsx`, Vite reads the file, compiles the JSX to JavaScript **on that request**, rewrites bare imports like `'react'` to URLs it can serve, and responds. Each source file is a separate request, so start-up is instant. It also keeps a WebSocket open to the page. When you save a file, it pushes the change and the page swaps that module in place (**hot module replacement**).
> - **Production build** (`vite build`): starts at `index.html`, follows every `import`, compiles JSX, and **bundles** everything into a few files with **content hashes** in their names (`bundle/index-FzDhyoyp.js`). It minifies them and rewrites `index.html` to reference them. Files in `public/` are copied as-is. Because the name changes whenever the content changes, browsers can cache these files forever.
>
> Plugins extend Vite. `@vitejs/plugin-react` adds the JSX compilation and React-specific dev features.

**In this repo** (`vite.config.mts`):

- `base: './'`: links in the built page are relative, so the app also works from a sub-folder.
- `build.assetsDir: 'bundle'`: compiled JS/CSS land in `dist/bundle/`, kept apart from `public/assets/`.
- `server.port: 3300`.
- CSS files are imported from `main.jsx` (`import './styles/base.css'`). Vite bundles them into one CSS file.

### 4.6 Node.js and Express (the web server)

> **How it works.** Node.js runs JavaScript on the server with an event loop (single thread, non-blocking I/O, similar in spirit to Python's asyncio). **Express** is a minimal HTTP framework. You build a pipeline of **middleware** functions `(req, res, next) => …`. Each one either sends a response or calls `next()` to pass the request on, like servlet filters or WSGI middleware. `express.static(dir)` is ready-made middleware that maps a URL path to a file under `dir`, and sets ETags and content types.

**In this repo** (`server.js`, about 80 lines; CommonJS `require` syntax, not `import`):

1. Refuses to start if `dist/index.html` is missing (you must build first).
2. `express.static('dist')`, with extra headers:
   - `/bundle/*`: `Cache-Control: max-age=1 year, immutable`, because the names are content-hashed.
   - `sw.js`, `sw-precache.js`: never cached, and allowed to control the whole site.
   - `.webmanifest`: correct content type.
3. **SPA fallback:** any `GET` that asks for HTML and matched no file gets `index.html`. (The app has no URL routes, so this rarely matters; see [gaps-and-quirks.md](gaps-and-quirks.md).)
4. Anything else: plain-text 404.
5. Listens on `PORT` (default 3300) and `HOST` (default `0.0.0.0`).

There are no API routes, no sessions and no security headers here (see gaps).

### 4.7 Service worker and PWA

> **How it works.** A **service worker** is a script the browser runs in the background, separate from any page. Once registered, it intercepts every network request from the site, like a programmable proxy living in the browser. It can answer from its own **Cache Storage**. Lifecycle: **install** (pre-download files), **activate** (clean up old caches), **fetch** (handle each request). The browser re-checks the worker script on each visit and installs a new version if it changed. A **web app manifest** (JSON) tells the phone the app's name, icons and colours, so it can be added to the home screen and open full-screen.

**In this repo:**

- `src/main.tsx` registers `sw.js`, in production builds only.
- `public/sw.js` (hand-written) behaves like this:
  - **Install:** pre-caches a core list plus every file named in `dist/sw-precache.js`.
  - **Navigations:** network first, falling back to the cached `index.html`, then to `offline.html`.
  - **Other requests:** answered from cache immediately while a fresh copy downloads in the background ("stale-while-revalidate").
- `build.js` runs after `vite build`. It scans `dist/` and writes `sw-precache.js`, which holds the file list plus a **version hash** of all file contents. The cache name includes that hash, so every deploy that changes any file gets a fresh cache, and the old one is deleted when the new worker activates.

### 4.8 Small libraries

- **Zustand**: a small state-management library. `createStore((set, get) => ({ ...data, ...actions }))` makes a store object that lives outside React; `useStore(store)` (a hook) subscribes a component, which re-renders whenever the store changes. It is the app's single store (section 6.1).
- **qrcode-generator**: computes QR code modules. It is used by `src/features/referrals/components/QrCode.jsx` (on-screen SVG) and the `qrPng()` store action in the referrals slice (the downloadable PNG, drawn on a canvas).

## 5. What happens when someone opens the app (production)

1. The browser requests `GET /`. Express finds `dist/index.html` and returns it.
2. The browser parses the HTML and requests:
   - `js/config.js`: a classic script that sets `window.NEXDRIVE_CONFIG` (runtime settings). It is deliberately **not** bundled, so each environment can edit it without rebuilding.
   - `bundle/index-<hash>.css` and `bundle/index-<hash>.js`: the compiled app, with React included.
3. The bundle runs `main.tsx`, which mounts `<App/>` into `<div id="root">`.
4. `App` creates the store; its initial data comes from the demo **seed** data (`src/demo/seeds.js`).
5. `App` renders `<AppView>` inside the store's context provider. `AppView` and each visible screen call their view hooks. React creates the page.
6. The store's `mount()` action, run from a `useEffect` in `App`:
   - listens for window resizes (the phone frame scales to fit)
   - starts a 15-second clock tick (lesson statuses move from upcoming → ongoing → completed in real time)
   - reads `?ref=CODE` from the URL (referral link)
   - plays the launch animation
7. After the page has loaded, `main.tsx` registers the service worker, which pre-caches every file for offline use.

In **dev mode** (`npm run dev`) steps 1–2 are served by Vite instead: `index.html` loads `/src/main.tsx` directly, and Vite compiles each file as it is requested. There is no service worker.

## 6. How the app is structured inside

Three layers, each in its own place:

```text
store (src/app/store + feature slices)  state + actions    "what is true, and how it changes"
   │  read through AppStoreContext
   ▼
view hooks (features/*/hooks, app/hooks)  state → display values  "what exactly to show: text, colours, handlers"
   │  each screen calls its own hook
   ▼
AppView + feature components (src/app, src/features)   JSX            "how it looks"
```

### 6.1 The store: state and actions

`initialState(phase, data)` (`src/app/store/initialState.js`) returns the full data object. The main fields:

| Field(s) | Meaning |
| --- | --- |
| `phase` | `'onboarding'` or `'app'` |
| `ob` | Current onboarding step: `welcome`, `register`, `verify`, `details`, `plan`, `started` |
| `tab` | Bottom-nav tab: `home`, `calendar`, `learners`, `more` |
| `stack` | Screens opened on top of the tab, e.g. `[{name:'learner', params:{lid:'L1'}}, {name:'learnerForm'}]`. The last entry is visible; `pushScreen()` adds one and `back()` pops it. **This is the app's whole navigation system; there is no URL routing** |
| `sheet` | The pop-up panel currently open, e.g. `{type:'conflict', cid:'b12'}`, or `null` |
| `learners`, `bookings`, `notifs`, `refs`, `credit` | The data, as arrays of plain objects |
| `inst`, `bank`, `sub`, `prefs` | The instructor's profile, bank details, subscription and preferences |
| `draft`, `lf`, `profForm`, `priceForm`, `bankForm`, `pw`, `reg`, `det` | Form contents while being edited |
| `toast` | A short message shown for 3 seconds |

Actions live next to the data in the same store, grouped into one slice per feature. An action reads the current state with `get()` and changes it with `get().setState(update, callback)`, which works like the old React `setState` but applies the change immediately. A slice calls another feature's action through `get()` too (for example the bookings slice calls `get().showToast(...)`), so features never import each other. Examples:

| Method | Does |
| --- | --- |
| `goTab(t)`, `pushScreen(name, params)`, `back()`, `openSheet(type, params)`, `showToast(text, kind)` | Navigation and feedback (`src/app/store/appSlice.js`) |
| `openBooking(lid, opts)`, `setDraft(patch)`, `pickSlot(t)`, `review()`, `confirmBooking()`, `openEdit(id)`, `saveEdit()`, `cancelLesson(id, reason)` | Booking flow (`features/bookings/stores/bookingsSlice.js`) |
| `bfModel()` | Pure calculation for the booking form: price, discount, sessions, clashes, validation errors |
| `overlap(date, startMin, durMin, excludeIds)` | The double-booking check |
| `openLearnerForm`, `saveLearner`, `deleteLearner` (archives) | Learners |
| `sendMsg`, `skipMsg` | "Send" the booking message (simulated: waits 0.7s, shows a toast) |
| `obNext`, `obBack`, `finishOb` | Onboarding steps |
| `runFlow(key)` | Demo panel: reset the data and jump to a workflow (`src/demo/demoSlice.js`) |
| `tick`, `schedulePush` | Clock tick and the simulated "lesson starts in 30 minutes" notification |

### 6.2 View hooks: state into display values

Each screen and sheet has a **view hook** next to it, in its feature's `hooks/` folder (`features/dashboard/hooks/useHomeView.js`, `features/bookings/hooks/useConflictView.js`…). The component calls it on every render and gets one object, conventionally called `v`, holding everything that screen needs already worked out:

- **Formatted text:** `"£80"`, `"Tue 4 Nov"`, `"3 lessons · 4 hours · £160"`.
- **Colours that depend on state:** for example, the highlighted tab or a selected option.
- **The screen's own sub-object:** `v.hm` (home), `v.cal` (calendar), `v.bf` (booking form), `v.lp` (learner profile)…
- **Event handlers:** small arrow functions such as `() => store.openBooking(null)`, which call store actions.
- **Common values** (`v.ic`, `v.back`, `v.go`, `v.padB`, `v.closeSheet`…) that most screens need.

Every view hook starts from `useViewContext()` (`src/hooks/`). It subscribes to the store (through `useStoreFacade()`) and works out what all screens share: which screen is visible (`is.home`…), layout sizes, icons, navigation handlers (`go`), upcoming lessons, credit totals and the `common` values. Helpers used by several features are in `src/hooks/viewHelpers.js`: `bookingCardView(store, booking)` (a lesson card) and `referralRowView(store, referral)`.

The app shell has its own hook, `useShellView()` (`src/app/hooks/`), for the phone frame, status bar, bottom nav, toast, sheet overlay, splash and which screen and footer to show.

### 6.3 The views: `AppView`, screens, sheets

- `AppView.jsx` draws the frame:
  - the demo panel, the phone frame, the status bar and the offline banner
  - the scrolling area, which shows exactly one screen chosen by `is.*`
  - the per-screen footer buttons, the bottom nav, the in-app push banner and the toast
  - the sheet overlay, which shows one sheet chosen by `sh.*`
  - the launch splash
- Every screen, sheet and component has the same shape:

  ```jsx
  export default function Home() {
    const v = useHomeView();                                // this screen's display values
    const { dismissReminder, go, hm, ic, icl, ics } = v;   // take what it uses
    if (!hm) return null;                                   // its data isn't there → render nothing
    return ( <div …> … {hm.greeting} … <button onClick={go.notifications}> … </div> );
  }
  ```

- They hold no state and contain almost no logic. They only place the values from their view hook into markup.
- Icons come in `v` as ready-made elements: `ic` (20px), `ics` (16px), `icl` (24px), built by `iconSet(size)` in `components/Icon.jsx`. `{ic.bell}` draws the bell icon.

### 6.4 One click, end to end

Tapping **Confirm** in the "Confirm booking" sheet:

1. In `ConfirmBookingSheet.jsx`, the button has `onClick={cm.confirm}`.
2. `cm.confirm` was created in the sheet's view hook `useConfirmBookingView()` as `() => store.confirmBooking()`.
3. The store action `confirmBooking()` (bookings slice) reads the state with `get()`, recomputes the booking with `bfModel()`, builds the new booking objects and a "Booking created" notification, then calls `get().setState({ bookings: [...], notifs: [...], sheet: { type: 'message', kind: 'new', ids } })`.
4. The store notifies every subscribed component. `SheetOverlay` (through `useShellView`) now sees the `message` sheet, and `MessageSheet` calls `useMessageView()`, which builds the message preview.
5. `AppView` → `SheetOverlay` → `MessageSheet` renders the preview. React updates only the parts of the page that changed.

The same loop drives every interaction: **event → store action → setState → subscribed components re-render → view hooks → JSX**. A sequence diagram is in [component-diagram.md](component-diagram.md#4-one-interaction-end-to-end).

## 7. Cross-cutting details

### 7.1 Configuration

| Where | What | Read by |
| --- | --- | --- |
| `public/js/config.js` → `window.NEXDRIVE_CONFIG` | `mode` (`demo`/`live`), `apiBaseUrl`, `referralBaseUrl`, `showDemoPanel`, `deviceFrame`, `launchAnimation` | `App.cfg()` at runtime |
| `DEFAULT_PREVIEW` in `src/app/App.jsx` | Preview switches: device size, start screen, empty data, subscription state, offline | `App` |
| `PORT`, `HOST` environment variables | Web server listen address | `server.js` |
| `.env` (from `.env.example`) | **Backend** secrets (database, Stripe, Twilio…), for the planned API only | Nothing yet |

`mode: 'live'` and `apiBaseUrl` exist but nothing uses them yet.

### 7.2 Styling

- **Each component has a CSS Module** next to it (`Pricing.jsx` + `Pricing.module.css`). The component imports it as `styles` and uses `className={styles.header}`. Vite renames the classes at build time, so names never clash between components.
- **Colours come from design tokens**: `src/styles/tokens.css` defines them as CSS variables (`--nd-ink`, `--nd-violet`, `--nd-error`, status colours…), mirroring `docs/brand/tokens.json`. Module CSS uses `var(--nd-…)`, never a literal brand hex.
- **Inline `style` remains only for values computed at run time** (for example a border colour that turns red when a field is invalid, or a phone-frame size). About 270 such declarations are left, against 7,200 moved into modules.
- `src/styles/base.css` holds the self-hosted font and a small reset; `src/styles/app.css` holds body defaults and every `@keyframes` animation. Their element rules are wrapped in `:where(…)`, which gives them zero specificity, so any component class overrides them.
- `src/styles/interactions.css` holds hover, focus and pressed-state classes such as `hover-bg-mist`. They still use `!important`, because some elements keep a run-time inline colour that the hover colour must beat.
- `main.tsx` imports the global CSS before `App`, so component modules come later in the bundle and win ties.

### 7.3 Dates and time

- Dates are `'YYYY-MM-DD'` strings. Times are `'HH:MM'` strings or "minutes since midnight" integers. Small helpers live in `src/lib/dates.ts` (`addDays`, `formatShortDate` = "Tue 4 Nov", `timeToMinutes`/`minutesToTime`…).
- `TODAY` and `NOW` come from the **device clock**, re-read every 15 seconds.
- The demo data was written around 7 Oct 2026. `shiftDemoDate()` shifts every seed date by (today − 7 Oct), so the demo always looks current.

### 7.4 Business rules in the front end

Implemented in the store slices and view hooks for demo purposes. The plan is that the API and database enforce them, with the UI only previewing:

- price = rate × hours × lessons − discount, where the discount can't exceed the value
- no overlapping lessons (`overlap()`)
- a learner must have a phone, address, postcode and licence before booking (`missing()`)
- the field formats: UK mobile, e-mail, postcode, DVLA licence, ADI number, theory certificate (`src/lib/validation.ts`)
- the referral reward = 20% of the referred instructor's plan

## 8. Things that look odd at first

All of these are listed with their impact in [gaps-and-quirks.md](gaps-and-quirks.md#part-b-non-standard-patterns). They exist because the app was originally exported from a design tool and then converted mechanically to React, keeping its behaviour identical.

1. **Wide view hooks.** Each screen has its own view hook, but every hook starts from `useViewContext()`, which subscribes to the whole store, so every visible screen re-renders on any change. Narrower selectors (`useAppStore((s) => s.bookings)`) would be the next step.
2. **A 2,100-line view-model function.**
3. **Run-time colours passed as values.** Most styling is in CSS Modules, but the view hooks still compute some colours (for example "selected" chip colours) and passes them to inline `style`.
4. **Very short variable names** (`s`, `v`, `B`, `L`, `bf`, `bk2`) inherited from the original code, mostly inside the store slices and view hooks. The shared helpers in `src/lib/` and the feature constants have descriptive names.
5. **Navigation is a stack in state**, not URLs. The browser's back button does not move between screens.
6. **A module-level mutable clock** (`TODAY`, `NOW`) instead of passing time in.

## 9. Where to look for…

| Task | File |
| --- | --- |
| Change wording or layout of a screen | `src/features/<feature>/components/<Screen>.jsx` (sheets live in the same folder) |
| Change what a button does | Find its `onClick={x.y}` → find `y:` in the screen's view hook (`features/<feature>/hooks/use<Screen>View.js`) → follow to the store action in `features/<feature>/stores/` |
| Change a calculation shown on screen | The screen's view hook (display) or `bfModel()` in the bookings slice (booking maths) |
| Add or change demo data | `src/demo/seeds.js` |
| Plans and prices | `src/features/subscription/plans.js` |
| Lesson status colours | `src/features/bookings/constants.js` |
| Referral rules and statuses | `src/features/referrals/constants.js`, `utils.js` |
| Demo workflows | `src/demo/flows.js` |
| Date / money / validation helpers | `src/lib/` |
| A component's look | Its `.module.css` file next to the `.jsx` |
| Brand colours | `src/styles/tokens.css` (and `docs/brand/tokens.json`) |
| Hover/focus colours | `src/styles/interactions.css` |
| Offline behaviour | `public/sw.js`, `build.js` |
| Server headers / port | `server.js` |
| Planned API contract | `API_DOCUMENTATION.md` |
| Planned data model | `database/schema.sql`, [database.md](database.md) |
