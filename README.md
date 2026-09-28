# SellerForge AI

AI-powered Etsy Seller Toolkit — monorepo (React/Vite client + Node/Express server).

## Quick start

```bash
cp .env.example apps/server/.env
cp .env.example apps/client/.env   # only VITE_* vars are read by the client

npm install --workspace=apps/server
npm install --workspace=apps/client

npm run dev:server   # http://localhost:5000
npm run dev:client   # http://localhost:5173
```

See `/docs` (or the architecture doc you already have) for full system design.

## Required third-party accounts before this runs end-to-end
- MongoDB Atlas cluster (`MONGODB_URI`)
- Anthropic API key (`ANTHROPIC_API_KEY`) — powers all 11 AI tools
- Resend (or swap provider) for transactional email
- Stripe account + price IDs for Pro/Business plans

Everything else runs with zero external config (pricing/fee calculators are pure logic, no AI calls).
