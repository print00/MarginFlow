# MarginFlow — Restaurant P&L Dashboard

A secure Next.js MVP for turning monthly restaurant bank statements into an understandable profit-and-loss view.

## Run locally

1. Copy `.env.example` to `.env` and set PostgreSQL plus a strong `AUTH_SECRET`.
2. Run `npm install`.
3. Run `npm run db:generate && npm run db:push && npm run db:seed`.
4. Run `npm run dev`.

The browser demo works immediately with preloaded data. Sign in with `alex@gardentable.demo` / `demo1234`.

## Security model

The Prisma schema supports owners and workspace membership. Auth API sessions use signed, HTTP-only cookies. Every mutation must scope by the authenticated `restaurantId`; the transaction route demonstrates this with `updateMany({ id, restaurantId })`, avoiding cross-workspace record access. Validate upload size/type before storage and use private object storage in production.
