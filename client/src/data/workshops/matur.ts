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
import storyboardImg from "@assets/generated_images/example_storyboard.png";

export const matur: Workshop = {
  name: "Vitlíkisvørumyndir",
  company: "Vitlíkisstovan",
  labs: [],
  singlePage: true,
  pageContent: {
    heroTitle: "Vitlíkisvørumyndir",
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
        title: "Samla vørukontekst",
        description: "Byrja her. Avrita hetta inn í ChatGPT, og lat so ChatGPT spyrja teg um vøruna. Málið er at gera eina stutta lýsing av tínari vøru, sum tú kanst brúka aftur í teimum næstu stigunum.",
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

Your first question should be: "Do you have a good product description you can hand over now? (You can copy the text, or add a pdf to this chat)"

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
        title: "Ger eina grundleggjandi vørumynd út frá kontekstinum",
        description: "Brúka hetta, um tú ikki longu hevur eina veruliga mynd av vøruni. Lím tín vørukontekst inn, og lat vitlíkið gera eina einfalda og hóskandi fyrstu mynd.",
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
        description: "Brúk hetta, um tú longu hevur eina vørumynd. Legg myndina av vøruni inn, og lím síðani hetta birtið inn saman við vørukontekstinum.",
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
        description: "Tá ið tú hevur eina grundleggjandi mynd, kanst tú royna ymiskar skapandi leiðir. Vel ta leiðina, sum hóskar best til títt endamál.",
        prompts: [
          {
            title: "Rein nethandilsmynd",
            subtitle: "Tú vilt hava eina einfalda sølumynd til ein nethandil ella eina vøruskrá.",
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
            title: "Rávørur uttan um vøruna",
            subtitle: "Tú vilt vísa, hvørjar rávørur eru í vøruni, ella hvønn smakk hon hevur.",
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
            subtitle: "Tú vilt hava eina meira eyðfangandi mynd, sum greiðir betur frá vøruni.",
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
            title: "Bólkamynd / vørupakki",
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
            title: "Í brúki",
            subtitle: "Tú vilt vísa vøruna í brúki, so hon kennist meira verulig.",
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
            subtitle: "Tú vilt hava eina meira eyðkenda og marknaðarvinarliga mynd við sterkari sjónligari kenslu.",
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
          {
            title: "Storyboard / 3×3 grid",
            subtitle: "Tú vilt hava eitt heildaryvurlit av vøruni í níggju myndum — sum eitt sniðgivið portfolio-upplag.",
            image: storyboardImg,
            text: `A clean 3×3 storyboard grid with nine equal sized panels on 4:5 ratio.

Use the reference image as the base product reference. Keep the same product, packaging design, branding, materials, colors, proportions and overall identity across all nine panels exactly as the reference. The product must remain clearly recognizable in every frame. The label, logo and proportions must stay exactly the same.

This storyboard is a high-end designer mockup presentation for a branding portfolio. The focus is on form, composition, materiality and visual rhythm rather than realism or lifestyle narrative. The overall look should feel curated, editorial and design-driven.

FRAME 1:
Front-facing hero shot of the product in a clean studio setup. Neutral background, balanced composition, calm and confident presentation of the product.

FRAME 2:
Close-up shot with the focus centered on the middle of the product. Focusing on surface texture, materials and print details.

FRAME 3:
Shows the reference product placed in an environment that naturally fits the brand and product category. Studio setting inspired by the product design elements and colours.

FRAME 4:
Product shown in use or interaction on a neutral studio background. Hands and interaction elements are minimal and restrained, the look matches the style of the package.

FRAME 5:
Isometric composition showing multiple products arranged in a precise geometric order from the top isometric angle. All products are placed at the same isometric top angle, evenly spaced, clean, structured and graphic.

FRAME 6:
Product levitating slightly tilted on a neutral background that matches the reference image color palette. Floating position is angled and intentional, the product is floating naturally in space.

FRAME 7:
Extreme close-up focusing on a specific detail of the label, edge, texture or material behavior.

FRAME 8:
The product in an unexpected yet aesthetically strong setting that feels bold, editorial and visually striking. Unexpected but highly stylized setting. Studio-based, and designer-driven. Bold composition that elevates the brand.

FRAME 9:
Wide composition showing the product in use, placed within a refined designer setup. Clean props, controlled styling, cohesive with the rest of the series.

CAMERA & STYLE:
Ultra high-quality studio imagery with a real camera look. Different camera angles and framings across frames. Controlled depth of field, precise lighting, accurate materials and reflections. Lighting logic, color palette, mood and visual language must remain consistent across all nine panels as one cohesive series.

OUTPUT:
A clean 3×3 grid with no borders, no text, no captions and no watermarks.`,
          },
        ],
      },
    ],

  },
};