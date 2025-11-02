## Blazing Electron Template

Starter template for Electron applications built on Electron Forge 7 and Vite 7 with a modern stack of React 19, MobX, and Panda CSS. The repository is intended for rapid prototyping and follow-up packaging of cross-platform desktop apps.

### Highlights
- Electron Forge with the Vite plugin: fast dev server and unified build for the `main`, `preload`, and `renderer` processes.
- React 19 + MobX: reactive MVVM model via `mobx-react-routing` and `mobx-view-model`.
- Dependency Injection with `tsyringe` and support for `reflect-metadata`.
- Panda CSS: atomic styles, token generation, and utilities.
- Preconfigured build targets (`ZIP`, `Squirrel`, `RPM`, `DEB`) and Fuse security settings for release builds.

### Project Structure
```
src/
├─ main/           # Electron main process
├─ preload.ts      # Preload script (isolated context)
└─ renderer/       # Client-side app (React + Panda CSS)
   ├─ app/         # App initialization and routing
   ├─ pages/       # MVVM pages (example: SignIn)
   └─ shared/      # Shared utilities, styles, and types
```
The main entry point for the renderer is `src/renderer/index.tsx`. Routes are defined in `src/renderer/app/routing.ts` and lazily load the View and ViewModel.

### Quick Start
1. Install dependencies (pnpm 9+ recommended):
   ```bash
   pnpm install
   ```
2. Start the dev environment (Electron + Vite dev server):
   ```bash
   pnpm start
   ```

### Commands
- `pnpm start` — Vite dev server + Electron in development mode.
- `pnpm package` — build platform artifacts without installers (output to `out/`).
- `pnpm make` — create full installers/packages (Squirrel, ZIP, RPM, DEB).
- `pnpm publish` — publish via the configured Electron Forge targets.
- `pnpm lint` — ESLint for TypeScript/TSX files.
- `pnpm prepare` — generate Panda CSS (`src/renderer/shared/styled-system`). Runs automatically during `pnpm install`.

### Environment and Configs
- The renderer reads variables with `RENDERER_` and `VITE_` prefixes (`vite.renderer.config.mts`).
- Preload scripts use the `PRELOAD_` prefix.
- The main process does not load `.env` by default; add manual loading if needed.
- TypeScript configuration is split into `tsconfig.main.json` and `tsconfig.renderer.json`, with shared options in `tsconfig.base.json`.
- Panda CSS is configured in `panda.config.ts`, and the PostCSS plugin is connected via `postcss.config.cjs`.

### MVVM Architecture
- `RouterStoreImpl` extends `RouterStoreBase` and creates a ViewModel for each route.
- The base class `PageViewModelImpl` registers the `RouterStore` via `tsyringe`.
- Pages export a `View` + `ViewModel` pair (see `pages/signin`), simplifying lazy loading and isolating business logic.

### Styling
- Panda CSS global layers are connected in `src/renderer/index.css`.
- Use `css(...)`, `cva(...)`, and patterns from `@renderer/shared/styled-system` for consistent styling.

### Build and Releases
- Electron Forge packages the app with `asar` enabled; the `@electron/fuses` plugin disables unsafe runtime options.

### Useful Links
- Electron Forge: https://www.electronforge.io/
- Vite: https://vitejs.dev/
- MobX: https://mobx.js.org/
- Panda CSS: https://panda-css.com/
- Mobx View Model: https://js2me.github.io/mobx-view-model
- Mobx React Routing: https://github.com/js2me/mobx-react-routing