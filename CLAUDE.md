# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A technical portfolio website built with React, TypeScript, and Vite. The site is a single-page application featuring sections for hero, about, skills, projects, blog, experience, and contact. Uses Radix UI primitives for accessible components and Tailwind CSS for styling.

## Development Commands

- `npm i` - Install dependencies
- `npm run dev` - Start Vite dev server at http://localhost:3000 (opens automatically)
- `npm run build` - Create production build in `build/` directory
- `npm run test` - Run Vitest in watch mode

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

## Testing

- Tests use Vitest with React Testing Library and jsdom
- Setup file: `src/setupTests.ts`
- Test files should follow `*.test.tsx` or `*.spec.tsx` naming
- Example test exists at `src/App.test.tsx`

## Path Resolution

Vite is configured with `@` alias pointing to `src/` directory. However, existing code uses relative imports, so follow the established pattern unless refactoring.

## Code Style

- TypeScript with React functional components and hooks
- 2-space indentation, single quotes
- Component files use PascalCase.tsx naming
- No formatter/linter configured - maintain consistency with existing code
- Interface definitions typically inline with components or at file top
