# Sandābādo — ∞ LOVE

The Sandābādo music portal: album previews, the Whole Body Gathering, direct-to-fan store, contact, and release-list signup.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Add 30-second MP3 previews as `public/assets/01-preview.mp3` through `13-preview.mp3`. Configure the checkout, mail, and mailing-list values in `.env.local` before deploying.

Checkout uses Stripe-hosted Checkout Sessions and validates every cart item and price on the server. Use a restricted Stripe key in production.
