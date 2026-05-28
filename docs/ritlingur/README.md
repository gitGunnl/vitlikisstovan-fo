# Ritlingur — Vitlíki á arbeiðsplássinum

`vitliki-a-arbeidsplassinum.docx` is the editable Word source for the
"6 stig til betri vitlíkisnýtslu" ritlingur.

## Where it came from

The first version was generated one-off from the `/landsnet` page
(`client/src/pages/landsnet.tsx`) using `scripts/build-ritlingur-docx.ts`.
That script pulls the Faroese copy out of the page and writes a clean,
A4, print-ready `.docx` with real Word styles (Heading 1/2, Body Text,
Callout, numbered list), a "Vitlíkisstovan · Ritlingur" header, and a
page-number footer.

## How to edit going forward

Treat the `.docx` as the long-lived authoring source. Open it in
Microsoft Word or Google Docs, edit in place, and export to PDF by hand
when you need a distributable file. The website copy and this document
are intentionally **not** kept in sync automatically — once the `.docx`
has been refined editorially, it diverges from the web page on purpose.

## Regenerating from scratch (rare)

Only do this if you want to throw away manual edits and start over from
the current state of the landing page:

```bash
npx tsx scripts/build-ritlingur-docx.ts
```

This overwrites `vitliki-a-arbeidsplassinum.docx` in place.
