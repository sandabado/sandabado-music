# wholebodyearth-site

The Quincunx build for wholebody.earth: natal-chart readings, five pillar experiences, Supabase member access, and Stripe-backed event RSVPs.

## Run locally

1. Copy `.env.example` to `.env.local` and enter your Supabase, Swiss Ephemeris, and Stripe values.
2. In Supabase SQL Editor, run `supabase/migrations/001_quincunx_schema.sql`.
3. Run the Swiss Ephemeris service configured as `SWISSEPH_API_URL`.
4. Run `npm install`, then `npm run dev`.

The reading endpoint deliberately fails safely until `SWISSEPH_API_URL` is available. RSVP payments fail safely until Stripe is configured. Free RSVPs use Supabase directly.

## Stripe webhook

Send `checkout.session.completed` to `/api/webhook/stripe` and set `STRIPE_WEBHOOK_SECRET`. The handler verifies the signature before confirming the pending RSVP.

## Security notes

Never expose `SUPABASE_SERVICE_ROLE_KEY` to the browser. It is only used in the server-side Stripe webhook to update a confirmed RSVP.
