# AhDelights

Marketing website for AhDelights — handmade pastries in San Francisco.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Resend for contact form email delivery

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_TO_EMAIL` | Inbox that receives form submissions (default: `miguel.alviar45@gmail.com`) |
| `CONTACT_FROM_EMAIL` | Verified Resend from address (e.g. `AhDelights <onboarding@resend.dev>`) |

## Routes

- `/` — Landing
- `/contact` — Contact form
- `/privacy-policy` — Privacy policy
