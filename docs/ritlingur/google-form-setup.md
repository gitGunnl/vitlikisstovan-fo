# Ritlingur — Google Form + Apps Script setup

The "Send mær ritlingin" form on `/landsnet` is a fully static lead-magnet
flow. The browser submits directly to a Google Form (no-cors), and a Google
Apps Script bound to that form sends the visitor the PDF and notifies the
operator. There is **no backend** involved.

This document is the one-time setup the site operator runs in their own
Google account.

## 1. Create the Google Form

1. Go to https://forms.google.com and create a new blank form.
2. Title it something like **"Vitlíkisstovan — Ritlingur umbøn"**.
3. Add two questions:
   - **Email** — type *Short answer*, required. Label: `Teldupostur`.
   - **Vil hoyra meira** — type *Multiple choice*, required. Options:
     `Ja` and `Nei` (exactly these strings, case-sensitive — the site
     sends one of them based on the consent checkbox).
4. Open *Responses* → link a new Google Sheet so submissions land in a
   spreadsheet you can read.

## 2. Find the formResponse URL and entry IDs

1. Click the three-dot menu → **Get pre-filled link**.
2. Fill both fields with placeholder values (e.g. `EMAIL_HERE`, `Ja`)
   and click **Get link** → **Copy link**.
3. The link looks like:
   ```
   https://docs.google.com/forms/d/e/<FORM_ID>/viewform?usp=pp_url&entry.123456=EMAIL_HERE&entry.789012=Ja
   ```
4. From that link, grab:
   - The **form ID** between `/e/` and `/viewform`.
   - The **email entry ID** (`entry.123456` above).
   - The **consent entry ID** (`entry.789012` above).
5. The submission endpoint is the same form ID with `/formResponse`:
   ```
   https://docs.google.com/forms/d/e/<FORM_ID>/formResponse
   ```

## 3. Paste the values into the site config

Edit `client/src/content/site.ts` and replace the placeholders in
`ritlingurForm`:

```ts
ritlingurForm: {
  formResponseUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSdXeEtAgFI0R1y1_HqILhMcH23_p71cVOHM4IfkkHt5H9s1Yw/formResponse",
  entryEmail: "entry.1973475723",
  entryConsent: "entry.1767828470",
  consentYesValue: "Ja",
  consentNoValue: "Nei",
  pdfDownloadUrl: "/seks-stig-til-goda-vitlikisnytslu.pdf",
},
```

`consentYesValue` / `consentNoValue` must match the option strings in
the Google Form exactly (including casing and accents). Redeploy the
site after editing.

## 4. Add the Apps Script auto-responder

1. In the form editor, click the three-dot menu → **Script editor**.
   This opens an Apps Script project bound to the form.
2. Replace the default code with:

   ```js
   // Vitlíkisstovan — Ritlingur auto-responder.
   //
   // Sends the requester the PDF link and notifies the operator.
   // Trigger: From Form → On form submit.

   const PDF_URL =
     "https://vitlikisstovan.fo/seks-stig-til-goda-vitlikisnytslu.pdf";
   const OPERATOR_EMAIL = "info@vitlikisstovan.fo";

   // The exact question titles you used in the form.
   const EMAIL_TITLE = "Teldupostur";
   const CONSENT_TITLE = "Vil hoyra meira";

   function onFormSubmit(e) {
     const responses = e.response.getItemResponses();
     let email = "";
     let consent = "";
     for (const r of responses) {
       const title = r.getItem().getTitle();
       if (title === EMAIL_TITLE) email = String(r.getResponse() || "").trim();
       if (title === CONSENT_TITLE) consent = String(r.getResponse() || "").trim();
     }
     if (!email) return;

     sendVisitorEmail_(email);
     sendOperatorEmail_(email, consent);
   }

   function sendVisitorEmail_(email) {
     const subject = "Seks stig til góða vitlíkisnýtslu — frá Vitlíkisstovuni";
     const htmlBody = [
       '<div style="font-family:-apple-system,BlinkMacSystemFont,\'Segoe UI\',Helvetica,Arial,sans-serif;color:#0A1F3D;line-height:1.65;max-width:560px;">',
       '<h2 style="margin:0 0 16px 0;color:#0A1F3D;font-weight:600;">Takk fyri áhugan</h2>',
       '<p style="margin:0 0 16px 0;">Her er ritlingurin <strong>Seks stig til góða vitlíkisnýtslu</strong> — ein stutt og praktisk vegleiðing til føroyskar almennar stovnar um, hvussu leiðslan kann taka eigaraskap fyri vitlíki á arbeiðsplássinum.</p>',
       '<p style="margin:24px 0;"><a href="' + PDF_URL + '" style="background:#1F525B;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;display:inline-block;font-weight:600;">Tak ritlingin niður (PDF)</a></p>',
       '<p style="margin:24px 0 8px 0;">Vil tú vita meira um, hvussu vit kunnu hjálpa tykkara stovni í gongd við vitlíki? Vit hava bæði verkstovur, ráðgeving og framløgur tilrættalagdar almennum stovnum.</p>',
       '<p style="margin-top:24px;">Vinarliga,<br>Vitlíkisstovan<br><a href="https://vitlikisstovan.fo" style="color:#1F525B;">vitlikisstovan.fo</a></p>',
       '</div>',
     ].join("");

     // Optional: attach the PDF directly instead of (or in addition to) linking.
     // Uncomment and replace FILE_ID with the Drive ID of the PDF you uploaded.
     // const attachment = DriveApp.getFileById("FILE_ID").getAs("application/pdf");

     MailApp.sendEmail({
       to: email,
       subject: subject,
       htmlBody: htmlBody,
       // attachments: [attachment],
       name: "Vitlíkisstovan",
     });
   }

   function sendOperatorEmail_(email, consent) {
     const subject = "Nýggj ritlingur-umbøn — " + email;
     const htmlBody = [
       "<h2>Nýggj ritlingur-umbøn</h2>",
       "<ul>",
       "<li><strong>Teldupostur:</strong> " + email + "</li>",
       "<li><strong>Vil hoyra meira:</strong> " + (consent || "—") + "</li>",
       "<li><strong>Tíðspunkt:</strong> " + new Date().toISOString() + "</li>",
       "</ul>",
       '<p style="color:#666;font-size:12px">Sent frá /landsnet ritlingur-umbiðingarforminum.</p>',
     ].join("");

     MailApp.sendEmail({
       to: OPERATOR_EMAIL,
       subject: subject,
       htmlBody: htmlBody,
       name: "Vitlíkisstovan",
     });
   }
   ```

3. Save the script.
4. In the left toolbar, click **Triggers** (alarm-clock icon) → **Add Trigger**:
   - Function: `onFormSubmit`
   - Event source: *From form*
   - Event type: *On form submit*
   - Save. Google will prompt for permission to send email on your
     behalf — accept.

## 5. Verify

1. Submit the form on `https://vitlikisstovan.fo/landsnet`.
2. Check that a row appears in the linked Google Sheet.
3. Check that the submitter inbox receives the PDF email within a minute.
4. Check that `info@vitlikisstovan.fo` receives the operator notification.

## Notes

- The PDF lives at `client/public/seks-stig-til-goda-vitlikisnytslu.pdf`
  and is served at `https://vitlikisstovan.fo/seks-stig-til-goda-vitlikisnytslu.pdf`.
  Replacing the file in the repo and redeploying updates the link
  automatically — the Apps Script doesn't need to change.
- `MailApp.sendEmail` has a daily quota of 100 emails for free Google
  accounts, 1500 for Workspace. Plenty for this lead flow.
- The honeypot field (`website`) on the client short-circuits before the
  fetch, so bots never reach the Google Form.
- The static deployment has no `/api/ritlingur` endpoint anymore —
  submission goes straight from the browser to Google Forms.
- Client-side submission *failures* (network errors before the fetch
  resolves) are still beaconed to `/api/monitoring/client-failure` with
  source `landsnet-ritlingur` if a monitoring backend is reachable. On
  the static deployment that endpoint also doesn't exist, so the beacon
  silently fails — which is fine; it's defense-in-depth, not the primary
  signal.
