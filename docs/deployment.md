# Deployment

## Local

The Next.js project root is `apps/web`, so create its environment file from the repository root:

```bash
cp .env.example apps/web/.env.local
```

## Vercel

Recommended project configuration:

- Framework: Next.js
- Root Directory: `apps/web`
- Node.js: 24
- Install command: `pnpm install`
- Build command: `pnpm build`

Configure only the environment variables required by the deployment. Keep preview and production keys separate.

## Supabase

Do not reuse unrelated production databases. Create a dedicated project/environment when the product is ready, then apply migrations in `supabase/migrations` in order.

Before production:

1. review every RLS policy;
2. run Supabase security/performance advisors;
3. generate TypeScript DB types;
4. rotate any credential ever exposed outside a secret manager;
5. ensure service-role keys never reach client bundles.

## Promotion

`main` should represent releasable code. Use feature/foundation branches and previews, then merge after `pnpm check`, build and relevant AI evals pass.
