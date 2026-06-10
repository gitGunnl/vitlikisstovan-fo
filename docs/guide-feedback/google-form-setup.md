# Guide feedback ("Funnu eitt brek?") — Google Form setup

Every interactive guide (the ones under `/user-guides/...` rendered by
`GuideArticle`) shows a **"Funnu eitt brek?"** button near the bottom and a
matching link in the "Um hesa vegleiðingina" section. Readers use it to report
typos, broken prompts, or anything that could be improved.

The browser submits the report directly to a Google Form (no-cors), exactly like
the contact and ritlingur forms. There is **no backend** involved. Each report
automatically includes which guide it came from.

This document is the one-time setup the site operator runs in their own Google
account. **Until it is done, the feedback form intentionally shows an error
toast** (rather than silently dropping reports), because the config in
`client/src/content/site.ts` still has `PLACEHOLDER` values.

## 1. Create the Google Form

1. Go to https://forms.google.com and create a new blank form.
2. Title it something like **"Vitlíkisstovan — Afturmelding um vegleiðingar"**.
3. Add three questions, in this order:
   - **Boð** — type *Paragraph*, required. This is the mistake/issue text.
   - **Teldupostur** — type *Short answer*, not required. Optional reply address.
   - **Vegleiðing** — type *Short answer*, not required. The site fills this in
     automatically with the guide's title and route.
4. Open *Responses* → turn on **"Get email notifications for new responses"** so
   you're emailed for each report. Optionally link a Google Sheet too.

## 2. Find the formResponse URL and entry IDs

1. Click the three-dot menu → **Get pre-filled link**.
2. Fill the three fields with placeholder values (e.g. `BOÐ`, `EMAIL`, `GUIDE`)
   and click **Get link** → **Copy link**.
3. The link looks like:
   ```
   https://docs.google.com/forms/d/e/<FORM_ID>/viewform?usp=pp_url&entry.111=BOÐ&entry.222=EMAIL&entry.333=GUIDE
   ```
4. From that link, grab:
   - The **form ID** between `/e/` and `/viewform`.
   - The **message entry ID** (`entry.111` above).
   - The **email entry ID** (`entry.222` above).
   - The **guide entry ID** (`entry.333` above).
5. The submission endpoint is the same form ID with `/formResponse`:
   ```
   https://docs.google.com/forms/d/e/<FORM_ID>/formResponse
   ```

## 3. Paste the values into the site config

Edit `client/src/content/site.ts` and replace the placeholders in
`guideFeedbackForm`:

```ts
guideFeedbackForm: {
  formResponseUrl:
    "https://docs.google.com/forms/d/e/<FORM_ID>/formResponse",
  entryMessage: "entry.111",
  entryEmail: "entry.222",
  entryGuide: "entry.333",
},
```

Redeploy the site after editing. As soon as none of the values contain
`PLACEHOLDER`, the form goes live and submissions land in the Google Form.

## 4. Verify

1. Open any interactive guide, e.g.
   `https://vitlikisstovan.fo/user-guides/ai-for-kindergarten-guide`.
2. Click **"Funnu eitt brek?"**, write a test message, and submit.
3. Check that a row appears in the form responses (and the notification email
   arrives).
4. Confirm the **Vegleiðing** field shows the guide's title and route, so you
   know which guide the report is about.

## Notes

- The honeypot field (`website`) on the client short-circuits before the fetch,
  so bots never reach the Google Form.
- The optional email field is only sent when the reader fills it in.
- Client-side submission *failures* (network errors) are beaconed to
  `/api/monitoring/client-failure` with source `guide-feedback` if a monitoring
  backend is reachable — defense-in-depth, not the primary signal.
- The feedback block is hidden in the printed/PDF version of the guides
  (`no-print`), so it never shows up in the downloadable PDFs.
