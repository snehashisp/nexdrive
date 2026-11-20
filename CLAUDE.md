# NexDrive: coding guidelines and project structure

NexDrive is a business-management PWA for UK driving instructors: a React 18 + TypeScript front end built with Vite, served by a small Express server (`server.js`). It currently runs in demo mode on in-memory data; the backend is specified (`API_DOCUMENTATION.md`, `database/`) but not built.

**Every change must follow the structure and rules in this file.** If a change cannot fit them, update this file in the same change and say why. In-depth explanations live in `docs/internal/` (start with `overview.md`).

## Commands

| Command | Use |
| --- | --- |
| `npm run dev` | Dev server with hot reload at http://nexdrive.localhost:3300 |
| `npm run check` | Type-check, lint, format check and unit tests. **Must pass before every commit** |
| `npm run format` | Apply Prettier |
| `npm test` / `npm run test:watch` | Vitest unit tests |
| `npm run build` / `npm start` | Production build into `dist/` / build and serve it with Express |

## Structure

```text
src/
├── main.tsx            Entry: global CSS, then <App/>, service-worker registration
├── app/                Application shell. Composes features; nothing imports from here
│   ├── App.tsx           Creates the store, provides AppStoreContext, URL sync, scroll reset
│   ├── AppView.tsx       Phone frame, current screen, footers, nav, sheets, toast, splash
│   ├── components/       Shell parts: BottomNav, StatusBar, SheetOverlay, Splash
│   ├── hooks/            useShellView (values for the shell)
│   ├── routing/          routes.ts (URL table, pathFor, openPath), useUrlSync.ts
│   └── store/            createAppStore.ts (composes slices), appSlice.ts, initialState.ts
├── features/<feature>/ One folder per business area: onboarding, dashboard, calendar, bookings,
│   │                     learners, notifications, referrals, subscription, settings
│   ├── components/       Screens and sheets: Foo.tsx + Foo.module.css
│   ├── hooks/            One view hook per screen/sheet: use<Screen>View.ts
│   └── stores/           <feature>Slice.ts: that feature's store actions
├── domain/             Business rules used by more than one feature (lessons, plans, referrals)
├── lib/                Pure, framework-free helpers (dates, format, validation) with tests
├── components/         Shared presentational components (Icon, Toast)
├── hooks/              Shared hooks: useViewContext, useStoreFacade, viewHelpers
├── stores/             AppStoreContext, useAppStore, useAppStoreApi
├── types/              models.ts (domain data), store.ts (AppData, action interfaces, AppStore)
├── config/             Static configuration (phone-frame sizes)
├── demo/               Demo-only code: seed data, workflow panel, fake server lookups
└── styles/             tokens.css (design tokens), base.css, app.css, interactions.css
```

### Import boundaries (enforced by ESLint)

- Direction is **shared → features → app**. Shared folders (`lib`, `domain`, `components`, `hooks`, `stores`, `types`, `config`) never import from `features`, `app` or `demo`.
- **A feature never imports from another feature.** If two features need the same code, move it to a shared folder (`domain/` for business rules, `lib/` for generic helpers, `components/` for UI). If one feature needs another feature's behaviour at run time, call that action through the store (`get().showToast(...)`, `store.openBooking(...)`).
- Only `app/` and `demo/` may import from `demo/`. Features reach demo stand-ins through store actions (for example `lookupReferralCode`).
- Use the `@/` alias for imports across folders and `./` for files in the same folder.

## Where things go

| Adding… | Put it in |
| --- | --- |
| A screen or sheet | `features/<f>/components/<Name>.tsx` + `<Name>.module.css`, its view hook in `features/<f>/hooks/use<Name>View.ts`; render it from `AppView.tsx` (screens) or `SheetOverlay.tsx` (sheets) |
| A screen URL | `SCREEN_PATHS` and `openPath` in `app/routing/routes.ts`, plus a case in `routes.test.ts` |
| Store data | A typed field in `AppData` (`types/store.ts`) and its initial value in `app/store/initialState.ts` |
| A store action | The signature in that feature's `…Actions` interface (`types/store.ts`), the implementation in `features/<f>/stores/<f>Slice.ts` |
| A domain type | `types/models.ts` |
| A rule shared by features (pricing, statuses, eligibility) | `domain/<area>.ts`, with a `*.test.ts` next to it |
| A generic helper | `lib/`, with a `*.test.ts` next to it |
| A brand colour, spacing or size | `styles/tokens.css` and `docs/brand/tokens.json` together |
| Demo data or demo-only behaviour | `demo/` |

## State (Zustand store)

- There is **one store** (`app/store/createAppStore.ts`), composed of one slice per feature. Do not add other global state (no React context for data, no module-level variables for data, no `localStorage` for app data).
- Each slice is declared as `SliceCreator<XActions>`; its actions must match the interface in `types/store.ts`. Read with `get()`, write with `get().setState(update, callback)`.
- Action names must not collide with data keys (data `toast` vs action `showToast`).
- Components do not change the store directly; they call handlers from their view hook, which call store actions.
- Business rules (validation, pricing, clash checks) belong in store actions or `domain/`, never in components.
- Local, purely visual component state (an open dropdown) may use `useState`.

## Components and view hooks

- Function components only; no class components.
- A screen or sheet component calls **one** view hook (`const v = useHomeView();`) and only places its values into JSX. No data fetching, business logic or store access inside components.
- View hooks start from `useViewContext()` and return the screen's display values and handlers. Use `useAppStore(selector)` for narrow subscriptions where possible.
- **New view hooks return an explicitly typed object built in one expression** (no `const v = { ...common }; v.x = …` pattern, no new uses of the loose `View` type). Existing hooks use that older pattern; convert them when you touch them substantially.
- Shared presentational components (`components/`) take explicit, typed props.

## Styling

- Each component has a CSS Module next to it (`Foo.module.css`), used as `className={styles.name}`. Class names describe the element (`header`, `backButton`, `priceRow`).
- **Colours, spacing and sizes come from tokens**: `var(--nd-ink)`, `var(--nd-violet)`, `var(--nd-space-4)`. No literal brand hex values in new CSS or TSX.
- Inline `style` is allowed **only** for values computed at run time (a colour that depends on state, a measured size).
- Global CSS (`base.css`, `app.css`) uses `:where(...)` for element selectors so component classes always win. Do not add global class rules; hover/focus helpers live in `interactions.css` only while elements still have run-time inline colours.

## Routing

- The store's navigation (`phase`, `ob`, `tab`, `stack`) is the source of truth; `useUrlSync` keeps the URL in step. Navigate with store actions (`pushScreen`, `back`, `goTab`, `open…`), never with `window.history` or `location` directly.
- Every screen reachable by navigation must have a URL in `routes.ts`, opened through the same action the buttons use, and a round-trip test in `routes.test.ts`.
- Sheets, toasts and form contents are not part of the URL.
- Asset and page links are absolute (`/assets/...`); Vite `base` is `/`.

## TypeScript

- All source is TypeScript: `.tsx` for files with JSX, `.ts` otherwise. No new `.js`/`.jsx` files in `src/`.
- `tsconfig.json` is `strict` except `noImplicitAny` and `strictNullChecks`, which are temporarily off for code converted from JavaScript. **New and substantially changed code must compile as if both were on**: annotate parameters and return types of exported functions, and handle `undefined`/`null` explicitly (prefer guards to `!`).
- No `any` without an `// eslint-disable-next-line @typescript-eslint/no-explicit-any` comment and a reason. Prefer `unknown` plus narrowing.
- Use the domain types from `types/models.ts` and `types/store.ts`; do not redeclare shapes inline.

## Naming and style

- Descriptive names. No new one- or two-letter names except loop indices and conventional ones (`e` for an event, `s` for store state inside a selector). Existing short names (`B`, `bf`, `lvm`…) may be renamed when touched.
- Components and their files: `PascalCase.tsx`. Hooks: `useSomething.ts`. Slices: `<feature>Slice.ts`. Tests: `<file>.test.ts` next to the code.
- Prettier formats everything (single quotes, 110 columns); do not hand-format.
- Comments explain **why** or give context a reader needs (units, formats, demo-only behaviour), in plain sentences. Do not restate the code.
- UK English in user-facing text and comments; dates as `YYYY-MM-DD` strings (`IsoDate`), times as `HH:MM` (`TimeHHMM`), money in pounds.

## Testing and verification

- `npm run check` must pass before every commit.
- Pure logic (anything in `lib/`, `domain/`, routing) gets unit tests next to it.
- For behaviour changes, run the app (`npm run dev`) and exercise the affected screens and the demo workflows in the DemoPanel.
- For refactors that must not change behaviour, compare the old and new builds screen by screen before committing.

## Documentation

- When structure, conventions or behaviour described in `docs/internal/*.md` change, update those files in the same commit and regenerate the HTML (`cd docs/internal/tools && npm run build`; needs Chrome).
- Record known shortcuts and debt in `docs/internal/gaps-and-quirks.md`, and mark items fixed there when you fix them.
- Keep this file in sync with any change to structure or rules.

## Git

- Work on a branch, never directly on `main`. One logical change per commit, with a message that says what changed and why, and how it was verified.
- Do not commit `dist/`, `node_modules/` or local environment files.

## Known transitional debt (do not copy these patterns)

- Loosely typed view-hook results (`View`) and the `v.x = …` assembly pattern.
- `useViewContext()` subscribes to the whole store, so every visible screen re-renders on any change.
- Short variable names inside the slices and view hooks.
- Some colours are still computed in view hooks and applied inline.
- `noImplicitAny` and `strictNullChecks` are off.

Details and next steps for each are in `docs/internal/gaps-and-quirks.md`.
