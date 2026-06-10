---
name: Google Forms honeypot field validation
description: Why the guide-feedback honeypot omits .max(0) while older forms keep it
---

# Honeypot field + zod validation gotcha

The site has several static Google Forms (no-cors) lead forms with a hidden
`website` honeypot field and a "if website is non-empty, silently no-op" check
inside the submit handler.

**Gotcha:** if the zod schema validates the honeypot as `z.string().max(0)`,
the resolver blocks submission *before* the submit handler runs whenever a
bot/browser-autofill populates the field. The intended silent short-circuit in
the handler then becomes unreachable, and a real user hit by autofill sees a
submit that fails with no visible error (the field is hidden, so its
`FormMessage` never renders).

**Decision:** the guide-feedback form (`guideFeedbackSchema` in
`shared/schema.ts`, used by `client/src/components/site/GuideFeedback.tsx`)
keeps `website` as `z.string().optional().default("")` (no `.max(0)`) and
relies solely on the handler short-circuit.

**Why:** makes the honeypot behavior reachable and avoids breaking a real
submit on autofill.

**How to apply:** when adding a new honeypot, do NOT add `.max(0)` to the
schema; gate on the value in the submit handler instead. The older
workshop/ritlingur forms still use `.max(0)` — consider aligning them if you
touch them.
