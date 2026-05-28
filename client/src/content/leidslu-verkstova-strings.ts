import { WORKSHOP_REGISTRATION_PRICE_DKK } from "@shared/schema";

export const leidsluStrings = {
  ctaLabel: "Skráset til verkstovuna",

  registration: {
    title: "Skráset teg til Leiðslu-verkstovuna",
    subtitle:
      "Vel ein dag, fyll út upplýsingarnar og samtykk, at vit senda eina rokning. Tú fært eina váttan á teldupost.",
    dateLabel: "Vel dag *",
    dateOptions: [
      { value: "2026-08-19", label: "19. august 2026", weekday: "Mikudagur" },
      { value: "2026-09-02", label: "2. september 2026", weekday: "Mikudagur" },
    ] as const,
    seatsLabel: "Hvussu nógv seti? *",
    seatsHelp: `Prísur: ${WORKSHOP_REGISTRATION_PRICE_DKK.toLocaleString("da-DK")} kr. fyri seti`,
    seatsMinus: "Minka eitt seti",
    seatsPlus: "Legg eitt seti afturat",
    nameLabel: "Títt navn *",
    namePlaceholder: "t.d. Jákup Joensen",
    organizationLabel: "Fyritøka *",
    organizationPlaceholder: "Navnið á tykkara fyritøku ella stovni",
    emailLabel: "Teldupostur til rokning *",
    emailPlaceholder: "navn@fyritoka.fo",
    phoneLabel: "Telefon *",
    phonePlaceholder: "t.d. 919444",
    totalLabel: "Tilsamans",
    invoiceNote:
      "Vit venda aftur við einum telduposti, um vit tørva V-tal, fakturatilvísing ella postadressu.",
    acknowledgeLabel:
      "Eg veit, at vit senda mær eina rokning fyri skrásetingina.",
    submit: "Skráset og bíða eftir rokning",
    submitting: "Sendir...",
    error:
      "Okkurt gekk galið. Royn vinarliga aftur, ella skriva til info@vitlikisstovan.fo.",
    successTitle: "Takk fyri skrásetingina",
    successBody:
      "Vit hava móttikið skrásetingina og senda tær eina váttan og eina rokning á teldupost innan fá dagar.",
    close: "Lat aftur",
  },

  stickyBanner: {
    title: "Klár at vera við á Leiðslu-verkstovuni?",
    subtitle: "Vel ein av tveimum døgum og fá eina rokning á teldupost.",
    bookButton: "Skráset til verkstovuna",
    writeButton: "Skriva til okkum",
    callButton: "Ring",
    dismiss: "Lat aftur",
  },

  finalCta: {
    heading: "Klár at vera við á Leiðslu-verkstovuni?",
    body:
      "Skráset teg til ein av tveimum døgum — 19. august 2026 ella 2. september 2026. Vit senda eina rokning á teldupost.",
    ctaButton: "Skráset til verkstovuna",
  },
};
