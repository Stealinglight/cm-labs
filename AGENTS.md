# Repository Guidelines

This file provides guidance to AI assistants when working with code in this repository.

## Project Overview

A technical portfolio website built with React, TypeScript, and Vite. The site is a single-page application featuring sections for hero, about, skills, projects, blog, experience, and contact. Uses Radix UI primitives for accessible components and Tailwind CSS for styling.

Deployed to [cm-sec.ai](https://cm-sec.ai) via AWS Amplify. Infrastructure managed with AWS CDK in `infrastructure/`.

## Development Commands

- `bun install` — Install dependencies (use `npm i` for `infrastructure/`)
- `bun run dev` — Start Vite dev server at http://localhost:3000 (opens automatically with hot reload)
- `bun run build` — Create production build in `dist/` directory
- `npx vitest run` — Run unit tests once (preferred for one-shot execution)
- `bun run test` — Run Vitest in watch mode
- `npm run test:e2e` — Run Playwright end-to-end tests
- `npm run test:e2e:update` — Update Playwright visual regression snapshots
- `npm run lint` — Run ESLint on `src/`
- `bun run preview` — Preview production build locally
- `bun run sync-locks` — Regenerate `package-lock.json` from `bun.lock`

**Important**: Use `npx vitest run` (not `bun run test`) for one-shot test execution. Bun's test runner doesn't properly set up the jsdom environment needed by React Testing Library. `bun run test` starts Vitest in watch mode, which is only useful for interactive development.

## Architecture

### Application Structure

The app follows a section-based architecture where `App.tsx` orchestrates page sections:

- **Entry Point**: `src/main.tsx` renders `App.tsx` into `#root` div from `index.html`
- **Main Component**: `src/App.tsx` manages scroll-based section tracking and renders all page sections in order
- **Page Sections**: Each major section (Hero, About, Skills, Projects, Blog, Experience, Contact) is a standalone component in `src/components/`
- **UI Primitives**: Reusable shadcn/ui-style components live in `src/components/ui/`

### Key Patterns

**Scroll Tracking**: App.tsx uses a scroll listener to determine which section is currently visible and passes `activeSection` to Navigation for highlighting.

**Section Navigation**: Navigation and other components use `document.getElementById()` + `scrollIntoView({ behavior: 'smooth' })` for smooth scrolling between sections. Each section component must have an `id` prop matching its route name (e.g., `id="hero"`, `id="projects"`).

**UI Component Library**: The project uses Radix UI primitives wrapped with Tailwind styling. All UI components use the `cn()` utility (from `src/components/ui/utils.ts`) which combines `clsx` and `tailwind-merge` for conditional className handling.

**Styling Approach**: Tailwind utility classes are preferred over custom CSS. Global styles and font imports are in `src/index.css`. The design uses a dark theme (#0a0a0a background) with neon accent colors (#00ff41 green, #00d9ff cyan).

## Project Structure & Module Organization

- `index.html` is the Vite entry shell
- `src/` contains the React/TypeScript app
- `src/App.tsx` wires the page sections together
- `src/components/` holds page sections and shared UI primitives (see `src/components/ui/`)
- `src/index.css` and `src/styles/globals.css` provide global styles and Tailwind utility output
- `src/Attributions.md` documents any asset credits
- `tests/` contains all test files (unit and e2e)
- `infrastructure/` contains the AWS CDK stack for Amplify deployment
- `scripts/` contains build and utility scripts (e.g., sitemap generation)
- `.github/workflows/` contains CI/CD pipeline definitions

## Testing

- Unit tests use Vitest with React Testing Library and jsdom
- Setup file: `tests/setupTests.ts`
- Unit test files live in `tests/components/` and follow `*.test.tsx` naming
- E2E tests live in `tests/e2e/` and use Playwright
- Visual regression tests capture full-page screenshots at multiple viewports
- Run unit tests: `npx vitest run`
- Run E2E tests: `npm run test:e2e`
- Update visual snapshots: `npx playwright test --update-snapshots`

**Visual regression gotcha**: Full-page screenshot tests are sensitive to any content change — even a single word edit in a component. After modifying component text or layout, update baselines with `npx playwright test --update-snapshots`.

## CI/CD

Five GitHub Actions workflows are configured in `.github/workflows/`:

- **ci.yml** — Runs on PRs and pushes to main: lint, unit tests, build, E2E tests
- **security-scan.yml** — Security scanning
- **deploy-infra.yml** — AWS CDK infrastructure deployment
- **claude.yml** — Claude Code agent integration
- **claude-code-review.yml** — Automated code review with Claude

## Dependency Management

This project uses **Bun** for local development and **npm** for Amplify deployments. Both lockfiles (`bun.lock` and `package-lock.json`) are committed.

After adding or updating dependencies with Bun:
```bash
bun add <package>
bun run sync-locks    # Regenerates package-lock.json for Amplify compatibility
```

Both lockfiles are treated as binary in Git (via `.gitattributes`) to prevent merge conflicts.

## Path Resolution

Vite is configured with `@` alias pointing to `src/` directory. However, existing code uses relative imports, so follow the established pattern unless refactoring.

## Code Style & Naming Conventions

- TypeScript with React functional components and hooks
- 2-space indentation, single quotes
- Component files use PascalCase.tsx naming (e.g., `HeroSection.tsx`)
- Prefer Tailwind-style utility classes in `className` over bespoke CSS; put any global tweaks in `src/index.css`
- ESLint is configured via `eslint.config.js` — run with `npm run lint`
- Interface definitions typically inline with components or at file top

## Commit & Pull Request Guidelines

- Use concise, imperative commit subjects (e.g., "Add projects section animation") and include scope if helpful
- For pull requests, include a clear summary, link any related issues, and add screenshots for visual changes

## Common Gotchas

**grep in shell scripts**: `grep` exits with code 1 when there are no matches. In CI pipelines or chained commands, this causes script failures. Always use `|| true` when grep's no-match exit code shouldn't be fatal:
```bash
grep "pattern" file.txt || true
```

**Husky in CI**: Git hooks via Husky will run during automated commits in CI, which can cause failures. Set `HUSKY=0` in the environment to skip hooks:
```bash
HUSKY=0 git commit -m "automated commit"
```

## Configuration & Assets

- Vite configuration lives in `vite.config.ts`
- Playwright configuration lives in `playwright.config.ts`
- Fonts are loaded via `@import` in `src/index.css`; update there if you change typography
