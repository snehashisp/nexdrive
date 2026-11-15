# Setup: run NexDrive locally and explore it

## 1. What you are going to run

Only the **front end** (the app that runs in the browser) and a **small web server** that hands its files to the browser. There is no API and no database connection yet. All data in the app is made-up demo data that lives in the browser's memory, and refreshing the page resets it. See [gaps-and-quirks.md](gaps-and-quirks.md).

## 2. Prerequisites

| Tool | Version | Why | Check with |
| --- | --- | --- | --- |
| Node.js | **20.19 or newer** (22.12+ also fine) | Runs the build tool (Vite) and the web server (Express) | `node --version` |
| npm | Comes with Node.js | Downloads the project's libraries | `npm --version` |
| Git | Any recent | Get the code | `git --version` |
| Chrome (or Edge) | Current | Explore the app, DevTools | |
| Docker Desktop + `psql` | Optional | Only if you want to load the planned database schema (section 7) | `docker --version`, `psql --version` |

Node.js is a program that runs JavaScript outside the browser. npm (Node Package Manager) installs JavaScript libraries listed in `package.json` into a local `node_modules/` folder, much like `pip install -r requirements.txt` or Maven/Gradle dependency resolution.

## 3. Get the code

```bash
git clone <repository url> nexdrive
cd nexdrive
git checkout react-vite-jsx     # the React + Vite version; see note below
npm install                      # downloads React, Vite, Express … into node_modules/
```

> **Branch note.** At the time of writing, the React + Vite version lives on `react-vite-jsx` and is not merged into `main` yet. The version on `main` uses the older "template + runtime" engine, and it has a bug that makes the page show a fragment of script text instead of the app (see [gaps-and-quirks.md](gaps-and-quirks.md#the-version-on-main-does-not-render)).

`npm install` reads `package.json` (the list of libraries and their allowed version ranges) and `package-lock.json` (the exact versions last installed). Commit the lock file whenever it changes; it keeps everyone on identical versions.

## 4. Run it

There are two ways. Use one at a time, because both use port 3300.

### Option A: development mode (when changing code)

```bash
npm run dev
```

Open **http://nexdrive.localhost:3300** in Chrome. This runs Vite's development server. When you save a file under `src/`, the page updates within a second without a reload. The service worker (offline support) is turned off in this mode on purpose.

### Option B: production mode (what the hosting runs)

```bash
npm start
```

This first runs `npm run build`, which creates the optimised app in `dist/`. It then starts `server.js`, the Express web server, which serves `dist/` at **http://nexdrive.localhost:3300**. Use this mode to test install-to-home-screen, offline mode and caching.

Stop either mode with **Ctrl+C** in the terminal.

### Why `nexdrive.localhost`?

Any name ending in `.localhost` points at your own machine; Chrome and Edge resolve it with no setup. It keeps NexDrive separate from anything else you run on `localhost:3000`. If it doesn't resolve (some command-line tools such as `curl` on Windows don't support it), use **http://127.0.0.1:3300**; it is the same server.

To use a different port: `PORT=4000 npm start` (macOS/Linux/Git Bash) or `$env:PORT=4000; npm start` (PowerShell). For dev mode, change `server.port` in `vite.config.mjs`.

## 5. Explore the app in Chrome

### The demo panel

On a window at least 1060px wide, a panel on the left lists **workflows** (onboarding, booking, multiple lessons, calendar, navigation, subscription, referrals, edge cases, empty state). Clicking one resets the demo data and jumps straight to that workflow's starting point. This is the fastest way to see every screen.

On a desktop the app is drawn inside a phone frame. On a narrow window or a phone it fills the screen.

### Useful demo values

| Where | Value |
| --- | --- |
| Sign-up → verify mobile | Code **482913** (or click the "fill code" helper) |
| Sign-up → referral code | **NEXDANIEL25** is valid; **NEXMARK14** is inactive; mobile **07700 900301** has already used a referral; **07700 900123** counts as a self-referral |
| Open the app with a referral link | http://nexdrive.localhost:3300/?ref=NEXDANIEL25 |
| "I already have an account" | Loads the populated demo account (no password check) |

### Settings you can flip

`public/js/config.js` is read by the app at start-up. It is not bundled, so in production mode you can edit `dist/js/config.js` and just reload the page.

| Setting | Effect |
| --- | --- |
| `showDemoPanel: false` | Hides the workflow panel and demo-only buttons (what real users should see) |
| `deviceFrame: false` | No phone frame on desktop; the app fills the browser |
| `launchAnimation: false` | Skips the logo animation at start-up |

More "preview" switches live at the top of `src/App.jsx` in `static defaultProps`: start on onboarding, empty data, subscription state (`trial`, `payment_failed`, `expired`), offline banner. Change one, save, and dev mode reloads.

### Chrome DevTools (F12)

| Panel | What to look at |
| --- | --- |
| **Device toolbar** (Ctrl+Shift+M) | Pick a phone size. The frame disappears and you see the app as on a phone |
| **Console** | JavaScript errors and warnings. In dev mode React prints extra warnings here |
| **Network** | In dev mode you see each source file served separately. In production mode you see one bundled JS and one CSS file under `/bundle/` |
| **Application → Manifest** | The install metadata (`manifest.webmanifest`) |
| **Application → Service workers** | Production mode only. Tick **Offline**, reload, and the app still opens. **Unregister** clears it if you get stale files |
| **Application → Cache storage** | The files the service worker saved for offline use |
| **Sources** | In dev mode, your `src/*.jsx` files appear as written, and you can set breakpoints in them |

Install the **React Developer Tools** Chrome extension. It adds a **Components** tab: select `App` to watch its `state` object change as you click around. That state is the single source of truth for everything on screen.

## 6. Where to start reading code

1. `src/main.jsx`: the entry point (about 20 lines).
2. `src/App.jsx`: the state (`init()`) and the actions (methods such as `openBooking`, `confirmBooking`, `saveLearner`).
3. `src/viewModel.js` → `buildViewModel()`: turns the state into display values.
4. `src/AppView.jsx`: picks which screen to show. Then any screen in `src/screens/`.

[overview.md](overview.md) explains each step.

## 7. Optional: load the planned database locally

Nothing in the app reads from this database yet; this is for backend work against the schema. See [database.md](database.md).

```bash
cp .env.example .env              # then set POSTGRES_PASSWORD (any local value) and FIELD_ENCRYPTION_KEY
docker compose up -d              # PostgreSQL 16 on localhost:5432, Redis 7 on localhost:6379

# load schema, reference data and demo data
export $(grep -v '^#' .env | xargs)                    # bash; in PowerShell set the variables by hand
psql "postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@localhost:5432/$POSTGRES_DB" -v ON_ERROR_STOP=1 -f database/schema.sql
psql "postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@localhost:5432/$POSTGRES_DB" -v ON_ERROR_STOP=1 -f database/seed.sql
psql "postgres://$POSTGRES_USER:$POSTGRES_PASSWORD@localhost:5432/$POSTGRES_DB" -v enc_key="$FIELD_ENCRYPTION_KEY" -f database/demo_data.sql
```

Generate an encryption key with `openssl rand -base64 32`. Stop the containers with `docker compose down` (add `-v` to delete the data volume too).

## 8. Troubleshooting

| Symptom | Cause / fix |
| --- | --- |
| `Port 3300 is already in use` | Another `npm run dev` / `npm start` is still running. Stop it, or use another port (section 4) |
| `npm install` or `vite` complains about the Node version | Vite 8 needs Node 20.19+ or 22.12+. Upgrade Node |
| `dist/index.html not found` | You ran `node server.js` directly. Run `npm start` (which builds first) or `npm run build` |
| Old screens after a change in production mode | The service worker served a cached copy. Reload once more, or DevTools → Application → Service workers → Unregister |
| Page shows a line of script text | You are on `main` (see section 3) |
| `nexdrive.localhost` does not open | Use `http://127.0.0.1:3300` |
