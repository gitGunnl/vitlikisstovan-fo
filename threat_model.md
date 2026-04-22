# Threat Model

## Project Overview

Vitlíkisstovan is a mostly public marketing and educational website for AI training, workshops, guides, and consulting. The production stack is a React 18 + TypeScript + Vite frontend with a small Express backend that serves the built site, accepts public booking requests for an AI workshop, receives client-side form failure beacons, and runs scheduled monitoring checks against a Google Form. The backend uses the Replit Gmail connector to send booking notifications and monitoring alerts. Production scope should exclude `artifacts/mockup-sandbox/` because the mockup sandbox is assumed to be development-only and never deployed.

## Assets

- **Workshop booking and contact data** — visitor email addresses, selected booking dates/times, contact form messages, and browser error details. Abuse or disclosure can expose visitor information and harm trust.
- **Monitoring state and alert channel** — `data/monitoring.json`, alert history, recent failure reports, and the Gmail recipient configured through `ALERT_EMAIL_TO`. Integrity matters because false alerts or poisoned reports can hide real failures or create alert fatigue.
- **Private workshop materials** — `/verkstova` content is described by the project itself as private, proprietary, and intended only for paying participants. If shipped to every browser, confidentiality is lost.
- **Application and integration secrets** — Gmail connector access, environment variables, and any future database credentials. Leakage or misuse could allow email abuse or broader service compromise.
- **Site integrity and availability** — the public website, booking flow, and monitoring pipeline are business-critical. Public endpoints must resist abuse that would spam operators, visitors, or third-party services.

## Trust Boundaries

- **Browser to Express API** — `/api/booking` and `/api/monitoring/client-failure` accept untrusted internet traffic. All input, headers, and claimed client identity must be treated as attacker-controlled.
- **Browser to Google Forms** — public contact forms submit directly from the browser to Google Forms with `no-cors`. The frontend cannot trust transport success beyond the browser’s own error handling.
- **Express to Gmail via Replit connector** — the server can send outbound email with privileged connector access. Public requests that influence email content or recipients are high-risk.
- **Express to local disk** — monitoring events are persisted to `data/monitoring.json`. Public traffic can indirectly affect this stored state.
- **Public to restricted content boundary** — the site claims `/verkstova` is private/password-protected. Any protection must be enforced server-side or through a separately protected delivery path; client-side-only checks do not create a real trust boundary.
- **Production to dev-only boundary** — `artifacts/mockup-sandbox/` and other experimental assets should be ignored unless a production entry point imports or serves them.

## Scan Anchors

- **Production entry points:** `server/index.ts`, `client/src/main.tsx`, `client/src/App.tsx`
- **Highest-risk server areas:** `server/booking-api.ts`, `server/monitoring-api.ts`, `server/monitoring.ts`, `server/monitoring-mailer.ts`, `server/monitoring-storage.ts`
- **Highest-risk client areas:** `client/src/pages/verkstova.tsx`, `client/src/data/workshops/`, `client/src/lib/reportFormFailure.ts`, contact/booking form components
- **Public surfaces:** all site routes, `/api/booking`, `/api/monitoring/client-failure`, direct Google Forms submissions
- **Restricted surface to verify carefully:** `/verkstova`
- **Usually dev-only:** `artifacts/mockup-sandbox/`

## Threat Categories

### Spoofing

This project has no user account system in the main app, so the key spoofing risk is false client identity on public endpoints. Any IP-based throttling or trust decision on `/api/booking` or `/api/monitoring/client-failure` must use a trusted proxy configuration rather than raw request headers. External service calls must rely on Replit-managed credentials only and must not trust user-supplied identity claims.

### Tampering

Public callers can influence booking requests, monitoring beacons, stored monitoring state, and outbound alert content. The system must validate request bodies, constrain payload sizes, and ensure untrusted text cannot alter HTML emails, stored state semantics, or downstream workflows in unexpected ways. Client-side restrictions alone are not sufficient for any business rule that matters.

### Information Disclosure

The project claims that `/verkstova` contains private participant-only materials. Those materials must not be shipped in public frontend bundles, exposed through static assets, or retrievable without real server-side authorization. Booking/contact data and monitoring details must not leak through logs, responses, or publicly reachable files.

### Denial of Service

The two public API endpoints can trigger email sends, disk writes, and repeated monitoring work. They must resist spam, alert flooding, and resource exhaustion even when requests come from automated attackers. Outbound network calls should have timeouts, and rate limits must be tied to trustworthy signals.

### Elevation of Privilege

The main privilege boundary in this project is between the public site and content described as restricted or participant-only. Any “password protection” must be real access control, not a frontend convenience check. Public endpoints also must not let anonymous attackers gain privileged capabilities such as sending arbitrary emails, poisoning monitoring alerts, or forcing operator actions.
