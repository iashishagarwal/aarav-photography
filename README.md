# Photo Website

A Next.js 14 photo showcase with theme controls and curated content sections. The project is built with the App Router, Tailwind CSS, and Framer Motion animations.

## Getting Started

Prerequisites:
- Node.js 18.17+ (use `nvm use 18` if you manage multiple versions)
- npm 9+ (ships with recent Node releases)

Installation and local development:

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:3000 by default.

## Available Scripts

- `npm run dev` – start a local development server with hot reloading.
- `npm run build` – create an optimized production build.
- `npm run start` – serve the production build locally (after `npm run build`).
- `npm run lint` – run ESLint using the Next.js configuration.

Run `npm run lint` and `npm run build` before pushing changes to catch issues early.

## Project Structure

- `app/` – App Router entry points and layout definitions.
- `components/` – Shared UI building blocks, including the floating control rail.
- `data/` – Static data sources that feed sections of the site.
- `lib/`, `hooks/`, `types/` – Utilities, reusable hooks, and shared TypeScript types.
- `public/` – Static assets served as-is.
- `tailwind.config.ts`, `postcss.config.js` – Styling configuration.

## Deploying to Netlify

Set the following in your Netlify site settings:

- **Build command:** `npm run build`
- **Publish directory:** `.next`

If you are not using a custom build image, add the Netlify Next.js runtime by installing `@netlify/plugin-nextjs` (Site settings → Build & deploy → Build hooks & plugins).

Before triggering a deploy, run `npm run build` locally to verify there are no TypeScript or runtime issues.

## Contributing

1. Create a new branch from `main`.
2. Run the lint and build scripts before pushing.
3. Open a pull request and tag a teammate for review.

Feel free to file issues or suggestions in your preferred tracking tool so the team can triage them.
