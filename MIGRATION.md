# Migration Guide: AngularJS (sande3p-v2) → React (sande3p-v3)

This document records every step taken to migrate the legacy AngularJS 1.x /
Grunt/Gulp site in `sande3p-v2/` into a modern React + Vite application in
`sande3p-v3/`.

## 1. Project scaffolding

1. Created a new folder `sande3p-v3/` alongside `sande3p-v2/`.
2. Scaffolded the project with Vite's React template:
   ```bash
   npm create vite@latest sande3p-v3 -- --template react
   ```
3. Installed additional runtime/dev dependencies:
   ```bash
   npm install react-router-dom firebase
   npm install -D sass
   ```
4. Pinned `vite` to `^5.4.11` and `@vitejs/plugin-react` to `^4.3.4` in
   `package.json` (the freshly scaffolded project pulled in Vite 8 /
   Rolldown-based tooling that failed with a
   `Cannot find native binding` error on this machine's Node version).
   After changing the versions, `node_modules` and `package-lock.json` were
   removed and `npm install` was re-run.

## 2. Asset migration

| Source (`sande3p-v2/app/...`) | Destination (`sande3p-v3/...`)      | Notes |
|---|---|---|
| `sass/**`                     | `src/assets/sass/**`                | Compiled via `sass` + Vite's built-in SCSS support |
| `data/*.json`                 | `public/data/*.json`                | Fetched at runtime with `fetch()`, same as the original `$http.get` calls |
| `external/**`                 | `public/external/**`                | Profile photos, project thumbnails |
| `fav/**`                      | `public/fav/**`                     | Favicons / manifest, referenced with absolute `/fav/...` paths |
| `build/**` (grunticon output) | `public/build/**`                   | SVG/PNG icon CSS + `grunticon.loader.js`, loaded the same way as before |
| `fonts/**`                    | `public/fonts/**`                   | Moved to `public` (not `src/assets`) so plain `url(/fonts/...)` references in SCSS resolve without relying on Sass's relative import graph |

All `../fonts/...` references inside `src/assets/sass/styles/_fonts.scss`
were rewritten to root-absolute `/fonts/...` paths with:
```bash
sed -i '' "s#\.\./fonts/#/fonts/#g" src/assets/sass/styles/_fonts.scss
```

## 3. Configuration & Firebase

- `src/config.js` — migrated from `app/js/config.js` (site copy, TCO stats,
  API endpoints). `basic` now points to `/data/basic.json` (served from
  `public/data`).
- `src/firebase.js` — migrated from the Firebase init block in
  `app/js/app.js`, upgraded from the Firebase v3 compat script tag to the
  modular Firebase v9+ SDK (`firebase/app`, `firebase/database`).

## 4. Utilities, services & hooks

| Original (Angular)                          | New (React)                              |
|---|---|
| `app/js/util.js` (`utilSvc`, `browserSvc`)  | `src/utils/util.js` (plain functions: `dateDiff`, `isLocalStorageSupported`, `getBrowser`, `getWins`, `getProTechs`, `getTechTitle`) |
| `app/js/services.js` (`dataSvc`)            | `src/services/dataService.js` (`fetch`-based `getBasic/getStat/getHistory/getLatestStat/getConfig`) |
| `app/js/services.js` (`cheatSvc`, AngularFire) | `src/services/cheatService.js` (`subscribeCheatsheet` using Firebase v9 `onValue`) |
| `a0-angular-storage` (`store`)              | `src/hooks/useLocalStorage.js` (`get`/`set` wrapper around `window.localStorage`) |
| `app/components/scrollspy/scrollspy.js`     | `src/hooks/useScrollspy.js` |
| `MainCtrl.js` browser/grunticon init         | `src/hooks/useBrowserClass.js` |

## 5. Components & pages

| Original                                             | New                                     |
|---|---|
| `app/components/footer/footer.html` + `FooterCtrl`   | `src/components/Footer.jsx` |
| `app/js/directive.js` (`progressiveImg`)              | `src/components/ProgressiveImg.jsx` |
| `app/components/landing/landing.html` + `LandingCtrl` | `src/pages/Landing.jsx` |
| `app/components/cheatsheet/*` + `CheatCtrl`           | `src/pages/Cheatsheet.jsx` (topic="git") |
| `app/components/react-native/*` + `CheatCtrl`         | `src/pages/Cheatsheet.jsx` (topic="reactnative", reused component) |
| `app/components/rem/*` + `RemCtrl`                    | `src/pages/Rem.jsx` |

Notes on behavioral changes:
- `ng-bind-html` / `ng-repeat` / `ng-model` were replaced with JSX
  expressions, `.map()`, and controlled inputs / `useState`.
- The `contenteditable` Angular directive on the Rem page was replaced with
  a native `contentEditable` React element using `onInput`.
- AngularFire's `$firebaseObject` realtime binding was replaced with
  Firebase v9's `onValue()` listener inside a `useEffect`, exposed through
  `subscribeCheatsheet()`.

## 6. Routing

- `app/js/app.js` (`ngRoute` + `$routeProvider`) was replaced with
  `react-router-dom`'s `<BrowserRouter>` / `<Routes>` in `src/App.jsx`.
- Route map:
  - `/` and `/landing` → `Landing`
  - `/cheatsheet` → `Cheatsheet` (git topic)
  - `/reactnative` → `Cheatsheet` (react-native topic)
  - `/rem` → `Rem`
  - `*` → `Landing` (fallback, matching the Angular `otherwise` redirect)

## 7. App entry point & global styles

- `index.html` — recreated the `<head>` from `app/index.html` /
  `app/favicon.html`: title, meta description, canonical link, favicon
  links, web manifest, and Google Fonts (`Roboto`, `Lora`).
- `src/main.jsx` — renders `<BrowserRouter><App /></BrowserRouter>` and
  imports the new `src/index.scss` global stylesheet (in place of Angular's
  `ng-app` bootstrap).
- `src/index.scss` — single entry point that `@import`s
  `assets/sass/main.scss` (the original Sass architecture was preserved
  as-is).
- Removed the default Vite/React template files (`App.css`, `index.css`,
  placeholder logos) that are no longer used.

## 8. Verification

1. `node node_modules/eslint/bin/eslint.js .` — 0 errors after fixing a
   handful of issues introduced during migration (unused catch bindings,
   an unnecessary regex escape, a `setState`-in-effect warning, and a
   temporal-dead-zone reference between two `useCallback`s in `Landing.jsx`).
2. `node node_modules/vite/bin/vite.js build` — production build succeeds
   (only expected Sass "legacy JS API" deprecation warnings from the
   inherited `@import`-based Sass architecture, no missing-asset or
   compile errors).
3. `node node_modules/vite/bin/vite.js` (dev server) — started successfully
   and served `http://localhost:5183/` with an HTTP 200 response.

## 9. Known follow-ups (not part of this migration pass)

- The Sass files still use the deprecated `@import` syntax and legacy
  color functions (`darken()`, `saturate()`). They compile fine today but
  should eventually be migrated to the `@use`/`sass:color` module system.
- `npm audit` reports 2 vulnerabilities (1 moderate, 1 high) in
  transitive dependencies; run `npm audit` in `sande3p-v3/` for details
  before deploying to production.
- The commented-out `roboto` and `lora` `@font-face` blocks were left
  disabled, exactly as they were in the original `_fonts.scss`.

## 10. Running the new project

```bash
cd sande3p-v3
npm install
npm run dev     # start local dev server
npm run build   # production build to dist/
npm run preview # preview the production build locally
```
