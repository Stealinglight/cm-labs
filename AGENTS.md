# Repository Guidelines

This file provides guidance to AI assistants when working with code in this repository.

## Project Overview

A technical portfolio website built with React, TypeScript, and Vite. The site is a single-page application featuring sections for hero, about, skills, projects, blog, experience, and contact. Uses Radix UI primitives for accessible components and Tailwind CSS for styling.

## Development Commands

- `bun install` - Install dependencies (use `npm i` for infrastructure/)
- `bun run dev` - Start Vite dev server at http://localhost:3000 (opens automatically with hot reload)
- `bun run build` - Create production build in `dist/` directory
- `bun run test` - Run Vitest test runner in watch mode

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

## Testing

- Tests use Vitest with React Testing Library and jsdom
- Setup file: `src/setupTests.ts`
- Test files should live in `src/` and follow `*.test.tsx` or `*.spec.tsx` naming
- Example test exists at `src/App.test.tsx`
- Run tests with `bun run test` (starts Vitest in watch mode)

## Path Resolution

Vite is configured with `@` alias pointing to `src/` directory. However, existing code uses relative imports, so follow the established pattern unless refactoring.

## Code Style & Naming Conventions

- TypeScript with React functional components and hooks
- 2-space indentation, single quotes
- Component files use PascalCase.tsx naming (e.g., `HeroSection.tsx`)
- Prefer Tailwind-style utility classes in `className` over bespoke CSS; put any global tweaks in `src/index.css`
- No formatter/linter is configured - maintain consistency with existing code
- Interface definitions typically inline with components or at file top

## Commit & Pull Request Guidelines

- Git history is not available in this workspace, so no established commit convention is visible
- Use concise, imperative commit subjects (e.g., "Add projects section animation") and include scope if helpful
- For pull requests, include a clear summary, link any related issues, and add screenshots for visual changes

## Configuration & Assets

- Vite configuration lives in `vite.config.ts`
- Fonts are loaded via `@import` in `src/index.css`; update there if you change typography
