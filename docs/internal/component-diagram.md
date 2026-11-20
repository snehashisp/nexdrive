# Component diagrams

Five views of the same system, from the outside in. Dashed boxes and arrows are **planned but not built**. Background on each part: [overview.md](overview.md).

## 1. The running system

What exists at runtime today, and where the planned backend would attach.

```mermaid
flowchart TB
  subgraph Browser["Browser / installed PWA (phone or desktop)"]
    direction TB
    HTML["index.html"]
    CFG["js/config.js<br/>window.NEXDRIVE_CONFIG"]
    BUNDLE["bundle/index-hash.js<br/>React + the NexDrive app"]
    MEM[("App state<br/>(demo data in memory)")]
    SW["Service worker<br/>sw.js + sw-precache.js"]
    CACHE[("Cache Storage<br/>offline copies")]
    HTML --> CFG
    HTML --> BUNDLE
    BUNDLE --- MEM
    SW --- CACHE
  end

  subgraph Host["Node.js host (GoDaddy / local)"]
    direction TB
    EXP["server.js<br/>Express static server"]
    DIST[("dist/<br/>built files")]
    EXP --> DIST
  end

  Browser -- "HTTP GET (HTML, JS, CSS,<br/>fonts, icons, manifest)" --> EXP
  SW -. "intercepts every request,<br/>answers from cache when offline" .- Browser

  BUNDLE -- "Open in Google Maps<br/>(plain link, no API key)" --> MAPS["Google Maps"]
  BUNDLE -- "wa.me / mailto: share links" --> SHARE["WhatsApp / e-mail app"]

  subgraph Planned["Planned backend (specified, not built)"]
    direction TB
    API["NexDrive API<br/>Node.js + TypeScript"]
    PG[("PostgreSQL 15+<br/>database/schema.sql")]
    WORKER["Job worker<br/>BullMQ"]
    REDIS[("Redis")]
    EXT["Stripe · Twilio · Postmark/SES<br/>S3 · FCM/APNs push"]
    API --> PG
    API --> REDIS
    WORKER --> REDIS
    WORKER --> PG
    API --> EXT
    WORKER --> EXT
  end

  BUNDLE -. "HTTPS JSON + JWT<br/>(mode: 'live', not implemented)" .-> API

  classDef planned stroke-dasharray: 5 5,fill:#f6f6f6,color:#555;
  class API,PG,WORKER,REDIS,EXT planned;
```

## 2. Build and deploy pipeline

How source files become what the server serves.

```mermaid
flowchart LR
  SRC["src/<br/>JSX components, JS modules, CSS"] --> VITE
  IDX["index.html"] --> VITE
  PUB["public/<br/>config.js, sw.js, manifest,<br/>offline.html, assets/"] -- "copied unchanged" --> DIST
  VITE["vite build<br/>compile JSX · bundle · minify ·<br/>hash file names"] --> DIST[("dist/")]
  DIST --> BUILDJS["build.js<br/>list cacheable files +<br/>content hash"]
  BUILDJS -- "writes" --> PRE["dist/sw-precache.js"]
  DIST --> SERVER["server.js<br/>(npm start)"]

  DEV["npm run dev"] -. "no dist/: Vite dev server<br/>compiles each file on request" .-> SRC
```

On the hosting, the platform runs `npm install` → `npm run build` → `npm start`.

## 3. React component tree

Who renders whom. The data lives in the store, which `App` provides through context. Every box is a function component; each screen and sheet reads its display values from its own view hook.

```mermaid
flowchart TD
  MAIN["main.tsx<br/>createRoot + StrictMode"] --> APP

  APP["App (app/App.tsx)<br/>creates the store,<br/>provides AppStoreContext"]
  STORE["App store (Zustand)<br/>app/store + feature slices<br/>STATE + ACTIONS"]
  APP -- "creates" --> STORE
  APP --> VIEW
  HOOKS["view hooks<br/>useShellView, use&lt;Screen&gt;View<br/>state → display values"]
  STORE -. "useViewContext()" .-> HOOKS

  VIEW["AppView<br/>phone frame + layout"]

  VIEW --> PANEL["DemoPanel<br/>(wide screens, showDemoPanel)"]
  VIEW --> STATUS["StatusBar"]
  VIEW --> SCROLL{{"scroll area:<br/>exactly one screen,<br/>chosen by is.*"}}
  VIEW --> FOOT{{"footer buttons<br/>for some screens"}}
  VIEW --> NAV["BottomNav<br/>Home · Calendar · + · Learners · More"]
  VIEW --> PUSH["PushNotification<br/>(simulated reminder)"]
  VIEW --> TOAST["Toast"]
  VIEW --> OVER["SheetOverlay<br/>dimmed backdrop"]
  VIEW --> SPLASH["Splash<br/>launch animation"]

  SCROLL --> OB["Onboarding screens<br/>Welcome · Register · VerifyPhone ·<br/>InstructorDetails · ChoosePlan · TrialStarted<br/>+ OnboardingHeader"]
  SCROLL --> MAINS["Tab screens<br/>Home · Calendar · Learners · More"]
  SCROLL --> DETAIL["Pushed screens<br/>LearnerProfile · LearnerForm · BookingForm ·<br/>LessonDetails · Bookings · Notifications ·<br/>Subscription · Upgrade · UpgradeDone · Profile ·<br/>Pricing · BankDetails · Preferences · Security ·<br/>Referrals · ReferralQr · Credit"]

  FOOT --> FOOTS["OnboardingFooter · LearnerFormFooter ·<br/>BookingFormFooter · UpgradeFooter ·<br/>ProfileFooter · PricingFooter · BankDetailsFooter"]

  OVER --> SHEETS["Sheets (one at a time, chosen by sh.*)<br/>QuickAdd · LearnerActions · DeleteLearner ·<br/>PickLearner · PickBooking · Conflict ·<br/>ConfirmBooking · Message · CancelLesson · Maps ·<br/>CancelSubscription · Logout · Expired · ReferralDetail"]

  DETAIL -.-> QR["QrCode<br/>(ReferralQr only)"]
  HOOKS -.-> ICON["Icon / iconSet()<br/>ic, ics, icl"]
```

Footer components live in the same file as their screen (for example `LearnerFormFooter` is exported from `features/learners/components/LearnerForm.tsx`).

## 4. One interaction, end to end

Tapping **Confirm** in the "Confirm booking" sheet.

```mermaid
sequenceDiagram
  actor U as Instructor
  participant S as ConfirmBookingSheet (JSX)
  participant R as React
  participant A as Store (state + actions)
  participant AV as SheetOverlay → MessageSheet

  U->>S: click "Confirm"
  S->>A: onClick = v.cm.confirm → store.confirmBooking()
  A->>A: bfModel(): price, sessions, clashes
  A->>R: get().setState({ bookings, notifs, sheet: {type:'message'} })
  Note over R: the store notifies subscribed components, React batches the re-render
  R->>AV: re-render: useShellView() sees the message sheet,
  AV->>AV: MessageSheet calls useMessageView() (message preview)
  R->>U: page updated (only changed DOM nodes)
```

## 5. Module dependencies inside `src/`

Arrows point from the importer to what it imports. Imports only flow one way: shared code (`lib/`, `domain/`, `components/`, `hooks/`, `stores/`, `config/`) → `features/` → `app/`. A feature never imports from another feature; ESLint enforces this (`eslint.config.mjs`). Nothing in `lib/` imports React.

```mermaid
flowchart LR
  MAIN[main.tsx] --> APP
  MAIN --> CSS[styles/*.css]

  subgraph APPL[app/]
    APP[App.tsx] --> VIEW[AppView.tsx]
    APP --> STOREM[store/<br/>createAppStore, appSlice,<br/>initialState]
    VIEW --> SHV[hooks/useShellView]
    VIEW --> SHELL[components/<br/>BottomNav, StatusBar,<br/>Splash, SheetOverlay]
  end

  subgraph FEAT[features/]
    F1[onboarding · dashboard · calendar ·<br/>bookings · learners · notifications ·<br/>referrals · subscription · settings]
    FC[each: components/ screens + sheets,<br/>hooks/ view hooks, stores/ slice]
  end

  subgraph DEMO[demo/]
    SEEDS[seeds.ts, flows.ts, referral-codes.ts,<br/>demoSlice.ts, DemoPanel.tsx]
  end

  subgraph SHARED[shared]
    LIB[lib/<br/>dates, format, validation,<br/>inline-styles — TypeScript]
    COMP[components/<br/>Icon, iconSet, Toast]
    DOM[domain/<br/>bookings, plans, referrals]
    HK[hooks/ + stores/<br/>useViewContext, viewHelpers,<br/>AppStoreContext]
  end

  VIEW --> FEAT
  SHELL --> FEAT
  APP --> FEAT
  STOREM --> FEAT
  APP --> DEMO
  STOREM --> DEMO
  VIEW --> DEMO
  APP --> SHARED
  STOREM --> SHARED
  FEAT --> SHARED
  DEMO --> FEAT
  APP --> QRLIB[(qrcode-generator)]
  FEAT --> QRLIB
```
