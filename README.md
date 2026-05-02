# storefront-paperbase

Next.js storefront for [Paperbase](https://paperbase.me): catalog, cart, checkout, orders, blog, and localized pages. Server routes proxy and authenticate against the Paperbase backend using your publishable key.

## Stack

- **Next.js** 16 (App Router, Turbopack in dev)
- **React** 19, **TypeScript**, **Tailwind CSS** 4
- **next-intl** — locales `en` and `bn` (locale prefix always on; routes live under `/[locale]/…`)

## Prerequisites

- Node.js 20+ (matches `@types/node` in this repo)
- npm, pnpm, yarn, or bun

## Environment variables

Create a `.env.local` (not committed) with:

| Variable | Required | Description |
|----------|----------|-------------|
| `PAPERBASE_BACKEND_ORIGIN` | Yes* | Backend origin without trailing slash, e.g. `https://api.paperbase.me` or `http://127.0.0.1:8000`. |
| `PAPERBASE_API_URL` | Yes* | Alternative to `PAPERBASE_BACKEND_ORIGIN`: full API base URL; the app strips `/api/v1` if present and derives the origin. |
| `PAPERBASE_PUBLISHABLE_KEY` | Yes | Storefront publishable key (must start with `ak_pk_`). |
| `NEXT_PUBLIC_PAPERBASE_BACKEND_ORIGIN` | No | Same origin as the backend for browser-facing behavior (images, tracker shim). Set for local dev so it matches `PAPERBASE_BACKEND_ORIGIN`. |
| `NEXT_PUBLIC_IMAGE_REMOTE_HOSTS` | No | Comma-separated extra hostnames allowed for `next/image` remote patterns. |
| `NEXT_PUBLIC_API_URL` | No | Base URL for client `apiFetch` calls to this app’s `/api/*` routes; empty means same origin. |

\* One of `PAPERBASE_BACKEND_ORIGIN` or `PAPERBASE_API_URL` is required.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You will be redirected to a locale-prefixed path (e.g. `/en`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server with Turbopack |
| `npm run build` | Production build |
| `npm start` | Start production server (after `build`) |
| `npm run lint` | ESLint |

## Fork sync (maintainers)

This repository can include a GitHub Action (`.github/workflows/sync-fork.yml`) that triggers upstream merges on `master` for configured fork repositories. Configure the matrix of fork repos and a `PAT_TOKEN` secret with permissions to call the GitHub merge-upstream API on those forks.

## Learn more

- [Next.js documentation](https://nextjs.org/docs)
- [next-intl](https://next-intl-docs.vercel.app/)
