# Repository Guidelines

## Project Structure & Module Organization
- `index.html` is the Vite entry shell.
- `src/` contains the React/TypeScript app.
- `src/App.tsx` wires the page sections together.
- `src/components/` holds page sections and shared UI primitives (see `src/components/ui/`).
- `src/index.css` and `src/styles/globals.css` provide global styles and Tailwind utility output.
- `src/Attributions.md` documents any asset credits.

## Build, Test, and Development Commands
- `npm i`: install dependencies.
- `npm run dev`: start the Vite dev server with hot reload.
- `npm run build`: produce a production build in `build/`.
- `npm run test`: run the Vitest test runner in watch mode.

## Coding Style & Naming Conventions
- TypeScript + React functional components with hooks.
- 2-space indentation and single quotes are the prevailing style in `src/components/`.
- Component files use `PascalCase.tsx` (e.g., `HeroSection.tsx`).
- Prefer Tailwind-style utility classes in `className` over bespoke CSS; put any global tweaks in `src/index.css`.
- No formatter/linter is configured; keep changes consistent with nearby code.

## Testing Guidelines
- Tests run with Vitest and React Testing Library.
- `npm run test`: start Vitest in watch mode.
- Test files should live in `src/` and follow `*.test.tsx` or `*.spec.tsx`.
- Testing setup lives in `src/setupTests.ts`.

## Commit & Pull Request Guidelines
- Git history is not available in this workspace, so no established commit convention is visible.
- Use concise, imperative commit subjects (e.g., “Add projects section animation”) and include scope if helpful.
- For pull requests, include a clear summary, link any related issues, and add screenshots for visual changes.

## Configuration & Assets
- Vite configuration lives in `vite.config.ts`.
- Fonts are loaded via `@import` in `src/index.css`; update there if you change typography.
