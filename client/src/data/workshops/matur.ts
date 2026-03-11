import { Workshop } from "./types";
import webshopImg from "@assets/generated_images/example_webshop.png";
import lifestyleImg from "@assets/generated_images/example_lifestyle.png";
import ingredientsImg from "@assets/generated_images/example_ingredients.png";
import explodedImg from "@assets/generated_images/example_exploded.png";
import blueprintImg from "@assets/generated_images/example_blueprint.png";
import bundleImg from "@assets/generated_images/example_bundle.png";
import inUseImg from "@assets/generated_images/example_in_use.png";
import anglesImg from "@assets/generated_images/example_angles.png";
import creativeBgImg from "@assets/generated_images/example_creative_bg.png";

export const matur: Workshop = {
  name: "AI-vørumyndir",
  company: "Vitlíkisstovan",
  labs: [],
  singlePage: true,
  pageContent: {
    heroTitle: "AI-vørumyndir",
    heroSubtitle: "Ein hent hjálp til at gera myndir av matvørum við vitlíki.",
    heroNote: "Øll birtini virka við ChatGPT og Nano Banana.",
    image: "/images/verkstovur.jpeg",
    imageAlt: "Verkstova",
    description: "",
    bullets: [],
    agenda: [],
    ctaText: "",
    ctaDescription: "",

    steps: [
      {
        id: "step-1",
        label: "Stig 1",
        title: "Bygg vørukontekst",
        description: "Byrja her. Líma hetta inn í ChatGPT og lat tað spyrja teg um vøruna. Málið er at gera ein stuttan vørukontekstblokk, sum tú kanst brúka aftur í næstu stigunum.",
        prompts: [
          {
            title: "Samrøðubirt",
            text: `You are helping me create AI product shots for a food product.

Your job is to interview me, one question at a time, so you can build a short and useful product context block for image generation.

Ask short, practical questions only.

You should learn:
- what the product is
- who it is for
- what makes it special
- the mood or feeling it should give
- whether it should feel premium, homemade, healthy, playful, rustic, modern, indulgent, or something else
- key ingredients or flavor cues
- packaging type, if it has packaging
- whether I already have a real product image or not

Do not turn this into a brand workshop.
Keep it practical and focused on making good product images.

When you have enough information, stop asking questions and output:

PRODUCT CONTEXT:
[a short clear block I can copy into the next prompts]`,
          },
        ],
      },
      {
        id: "step-2a",
        label: "Stig 2A",
        title: "Ger eina grundleggjandi vørumynd út frá konteksti",
        description: "Brúka hetta, um tú ikki longu hevur eina veruliga mynd av vøruni. Líma tín vørukontekst inn og lat AI gera eina einfalda og hóskandi fyrstu mynd.",
        prompts: [
          {
            title: "Birt til grundleggjandi mynd (uttan vørumynd)",
            text: `Create a photorealistic product shot for this food product.

Use this product context:
[PASTE PRODUCT CONTEXT]

Create a simple, fitting first product image.
Keep it commercially believable and easy to understand.

The product should be the clear hero.
Use realistic packaging if packaging makes sense.
Keep the scene clean and not too busy.
Use soft natural or studio lighting.
Make it look like a real food product photo.

Do not make it too creative yet.
This is a strong basic shot that fits the product.`,
          },
        ],
      },
      {
        id: "step-2b",
        label: "Stig 2B",
        title: "Ger eina grundleggjandi vørumynd út frá veruligu vøruni",
        description: "Brúka hetta, um tú longu hevur eina vørumynd. Legg myndina av vøruni inn, og líma síðani hetta birtið inn saman við vørukontekstinum.",
        prompts: [
          {
            title: "Birt til grundleggjandi mynd (við vørumynd)",
            text: `Use the uploaded product image as the main reference.

Use this product context:
[PASTE PRODUCT CONTEXT]

Create a strong basic product shot that fits the product.

Keep the product shape, packaging, colors, and visible label details as accurate as possible.
Make the product the clear hero.
Use a clean and believable setting.
Use soft natural or studio lighting.
Keep the image commercially realistic and not too busy.

Do not make it too creative yet.
This should feel like a simple, fitting, professional product photo.`,
          },
        ],
      },
      {
        id: "step-3",
        label: "Stig 3",
        title: "Kanna ymiskar leiðir",
        description: "Tá tú hevur eina grundleggjandi mynd, kanst tú royna ymiskar skapandi leiðir. Vel ta, sum best hóskar til títt endamál.",
        prompts: [
          {
            title: "Rein webshop-mynd",
            subtitle: "Tú vilt hava eina einfalda sølumynd til ein webshop ella eitt katalog.",
            image: webshopImg,
            text: `Create a clean ecommerce product shot of this product.

Use this product context:
[PASTE PRODUCT CONTEXT]

[If needed: Use the uploaded product image as the reference.]

Show the product clearly on a clean simple background.
Use soft studio lighting and a subtle natural shadow.
Keep the composition simple and professional.
Make the product the only hero.`,
          },
          {
            title: "Lívsstílsmynd",
            subtitle: "Tú vilt, at vøran skal kennast meira livandi og verulig.",
            image: lifestyleImg,
            text: `Create a lifestyle product shot for this food product.

Use this product context:
[PASTE PRODUCT CONTEXT]

[If needed: Use the uploaded product image as the reference.]

Place the product in a fitting real-life setting.
Use a few simple props that match the product.
Keep the product as the main focus.
Use natural light and make it feel warm, believable, and commercial.`,
          },
          {
            title: "Rávørur rundan um vøruna",
            subtitle: "Tú vilt vísa, hvat er í vøruni, ella hvørjar smakkir hon hevur.",
            image: ingredientsImg,
            text: `Create a product shot where the product is shown together with its key ingredients.

Use this product context:
[PASTE PRODUCT CONTEXT]

[If needed: Use the uploaded product image as the reference.]

Place the product in the center and arrange a few key ingredients around it.
Keep the layout clean and attractive.
Make the ingredients clearly support the product story.
Use realistic food styling and soft light.`,
          },
          {
            title: "Sundursett tilfar / samansetingarmynd",
            subtitle: "Tú vilt hava eina meira eyðfangandi mynd, sum greiðir frá vøruni.",
            image: explodedImg,
            text: `Create a stylized product shot that shows the product together with its ingredients in an exploded composition.

Use this product context:
[PASTE PRODUCT CONTEXT]

[If needed: Use the uploaded product image as the reference.]

Show the product as the hero, with its main ingredients floating or arranged around it in a clean, elegant way.
Keep it realistic, appetizing, and visually clear.
Do not make it chaotic.`,
          },
          {
            title: "Blueprint / konseptstílur",
            subtitle: "Tú vilt hava eina meira skapandi, sniðgivna útgávu til marknaðarføring ella hugskotsarbeiði.",
            image: blueprintImg,
            text: `Create a blueprint-style concept image of this food product.

Use this product context:
[PASTE PRODUCT CONTEXT]

Show the product clearly in a technical or concept-sketch style.
Keep the product easy to understand.
Use a clean layout and make it feel like a design concept presentation.
Do not overcomplicate it.`,
          },
          {
            title: "Bólkamynd / bundle",
            subtitle: "Tú vilt vísa fleiri vørur saman sum eitt sett ella eina røð.",
            image: bundleImg,
            text: `Create a product shot showing this food product together with related products as a clean bundle or product line.

          Use this product context:
          [PASTE PRODUCT CONTEXT]

          [If needed: Use the uploaded product image as the reference.]

          Show 2 to 5 matching products together in a clear and attractive way.
          Keep the layout simple and commercially realistic.
          Make the products feel like they belong together as one brand family.
          Use soft, professional lighting and keep the composition clean.`,
          },
          {
            title: "Í brúk",
            subtitle: "Tú vilt vísa vøruna í sjálvari nýtsluni, so hon kennist meira verulig.",
            image: inUseImg,
            text: `Create a product shot showing this food product in use.

          Use this product context:
          [PASTE PRODUCT CONTEXT]

          [If needed: Use the uploaded product image as the reference.]

          Show the product being used in a natural and believable way.
          Make the product remain the main focus.
          Use realistic food styling and a simple setting.
          Keep it warm, appetizing, and commercially useful.`,
          },
          {
            title: "Fleiri vinklar",
            subtitle: "Tú vilt fáa eina greiðari fatan av vøruni við at vísa hana frá fleiri síðum.",
            image: anglesImg,
            text: `Create a clean product presentation showing this food product from multiple angles.

          Use this product context:
          [PASTE PRODUCT CONTEXT]

          [If needed: Use the uploaded product image as the reference.]

          Show the product from 3 to 4 useful angles, such as front, side, top, and close detail.
          Keep the layout tidy and easy to understand.
          Make it feel like a professional product overview.
          Use simple lighting and a clean background.`,
          },
          {
            title: "Skapandi bakgrund",
            subtitle: "Tú vilt hava eina meira eyðkenda og marknaðarvinarliga mynd við sterkari visuelli kenslu.",
            image: creativeBgImg,
            text: `Create a product shot for this food product with a creative and visually striking background.

          Use this product context:
          [PASTE PRODUCT CONTEXT]

          [If needed: Use the uploaded product image as the reference.]

          Keep the product as the clear hero.
          Use a bold but tasteful background that fits the product mood and brand style.
          Make the image feel premium, clean, and eye-catching.
          Do not let the background overpower the product.`,
          },
        ],
      },
    ],

    bottomTip: {
      title: "Lat ChatGPT bøta um títt birt",
      description: "Ikki vísur í, hvussu tú skrivar eitt betri birt? Lat AI hjálpa tær at tillaga tað.",
      prompt: {
        title: "Birtbøtari",
        text: `Take the product context below and the shot type I want, and write a short, strong image prompt for ChatGPT or Nano Banana.

Product context:
[PASTE PRODUCT CONTEXT]

Shot type:
[PASTE SHOT TYPE]

Keep the prompt simple, clear, and commercially useful.`,
      },
    },
  },
};