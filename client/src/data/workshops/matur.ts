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
import storyboardImg from "@assets/generated_images/example_storyboard.jpg";
import productVideo from "@assets/generated_images/product-video.mp4";

export const matur: Workshop = {
  name: "Vitlíkisvørumyndir",
  company: "Vitlíkisstovan",
  labs: [],
  singlePage: true,
  pageContent: {
    heroTitle: "Vitlíkisvørumyndir",
    heroSubtitle: "Hvussu tú kanst gera myndir av matvørum við vitlíki.",
    heroNote: "Fyri óroynd.",
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
            text: `You are helping me create high-quality AI product shots for a food product.

Your job is to interview me, one question at a time, so you can build a short and useful product context block for image generation.

Ask short, practical questions only.

You should learn:
- what the product is
- who it is for
- what makes it special
- the mood or feeling it should give
- whether it should feel premium, homemade, healthy, playful, rustic, modern, indulgent, natural, or something else
- key ingredients or flavor cues
- packaging type, shape, material, and finish, if it has packaging
- important brand colors or visual cues
- whether I already have a real product image or not
- whether I want the images to feel more clean studio, lifestyle, rustic, bright, dark, premium, minimal, or bold

Your first question should be: "What is the name of the product and do you have a good product description you can hand over now? (You can copy the text, or add a pdf to this chat)."

Do not turn this into a brand workshop.
Keep it practical and focused on making good product images.

When you have enough information, stop asking questions and output exactly this:

PRODUCT CONTEXT:
[a short clear block I can copy into the next prompts]

Make the context block compact but useful for image generation. Include product type, audience, mood, key ingredients/flavor cues, packaging, important visual cues, and whether a real product image exists.`,
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
            text: `Create a premium, photorealistic product shot for this food product.

Use this product context:
[PASTE PRODUCT CONTEXT]

Goal:
Create a strong foundational product image that feels commercially believable, polished, and high taste.

Art direction:
- The product must be the clear hero
- Keep the styling restrained and elegant
- Keep the scene clean, simple, and easy to understand
- Use packaging only if packaging naturally makes sense for this product
- Make the brand feel premium and visually coherent, not generic

Camera:
- Real commercial food photography look
- 85mm lens or 100mm macro lens feel
- Aperture around f/5.6 to f/8 for crisp product detail
- Clean framing, balanced composition, natural perspective
- High resolution, sharp focus on the product

Lighting:
- Soft diffused studio lighting or soft natural window-style lighting
- One large soft key light, gentle fill, subtle rim separation
- Controlled highlights and soft realistic shadows
- Accurate reflections and material response
- Bright but refined, not flat and not dramatic

Materials and realism:
- Realistic food texture, packaging texture, print detail, edges, folds, and seams
- Accurate material behavior for plastic, paper, glass, foil, cardboard, or matte coating
- Appetizing but believable food styling
- No warped packaging, no distorted label, no extra text, no random branding artifacts

Overall look:
- Premium commercial product photography
- Tasteful, modern, restrained
- Not too creative yet
- This should feel like a professional first product shot that could actually be used

Now create the image.`,
          },
        ],
      },
      {
        id: "step-2b",
        label: "Stig 2B",
        title: "Ger eina grundleggjandi vørumynd út frá veruligu vøruni",
        description: "Brúka hetta, um tú longu hevur eina vørumynd. Legg myndina av vøruni inn, og lím síðani hetta birtið inn saman við vørukontekstinum.",
        prompts: [
          {
            title: "Birt til grundleggjandi mynd (við vørumynd)",
            text: `Use the uploaded product image as the main reference.

Use this product context:
[PASTE PRODUCT CONTEXT]

Create a premium, photorealistic basic product shot that fits the product and keeps the reference highly consistent.

Reference fidelity:
- Keep the product shape, packaging form, proportions, colors, materials, and visible label details as accurate as possible
- Preserve the real-world identity of the product
- Do not redesign the label
- Do not invent new brand elements
- Do not distort text areas, logo placement, or packaging proportions

Art direction:
- Make the product the clear hero
- Use a clean, believable setting with restrained styling
- Keep the image commercially realistic and easy to understand
- Make it feel polished, premium, and useful

Camera:
- Real commercial product photography look
- 85mm lens feel
- Aperture around f/5.6 to f/8 for strong clarity across the product
- Straightforward framing with clean composition and realistic perspective
- High detail, high resolution, sharp focus

Lighting:
- Soft diffused studio light or soft natural directional light
- Large soft key, subtle fill, light edge separation
- Controlled reflections on packaging
- Realistic shadows with no harsh clutter
- Balanced, elegant contrast

Materials and realism:
- Preserve print texture, packaging finish, folds, seams, edges, and material behavior
- Accurate reflections for glossy surfaces and accurate softness for matte surfaces
- No extra text, no fake logos, no label warping, no random packaging changes

Overall look:
- Simple, fitting, professional product photo
- Not too creative yet
- Strong enough to use as the base for later variations

Now create the image.`,
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
            text: `Create a clean, premium ecommerce product shot of this product.

Use this product context:
[PASTE PRODUCT CONTEXT]

[If needed: Use the uploaded product image as the reference.]

Goal:
A polished sales-ready product image for ecommerce, catalog, or product listing use.

Composition:
- Show the product clearly on a clean, simple background
- Keep the product centered or slightly offset in a very controlled layout
- No distracting props
- The product must be the only hero

Camera:
- Real studio product photography look
- 85mm lens feel
- Aperture around f/8 for crisp, reliable detail
- Straight-on or slightly elevated angle, whichever fits the product best
- Clean, distortion-free perspective

Lighting:
- Soft studio lighting with a large diffused key light
- Gentle fill for clean shadow control
- Subtle grounded shadow under the product
- Controlled highlights and reflections
- Bright, premium, neutral lighting with good separation from background

Rendering quality:
- Accurate packaging texture, print, label details, and material finish
- Realistic edges, folds, seals, reflections, and shadows
- No warped labels, no fake extra text, no messy compositions

Overall feel:
- Professional ecommerce image
- Minimal, premium, commercially useful
- Clean enough to fit a serious webshop or product catalog

Now create the image.`,
          },
          {
            title: "Lívsstílsmynd",
            subtitle: "Tú vilt, at vøran skal kennast meira livandi og verulig.",
            image: lifestyleImg,
            text: `Create a premium lifestyle product shot for this food product.

Use this product context:
[PASTE PRODUCT CONTEXT]

[If needed: Use the uploaded product image as the reference.]

Goal:
Make the product feel real, desirable, and naturally part of a believable moment.

Scene:
- Place the product in a fitting real-life setting that supports the product category
- Use only a few carefully chosen props
- Keep the product as the main focus
- The styling should feel intentional, premium, and commercially useful, not busy

Camera:
- Real editorial food photography look
- 50mm or 85mm lens feel
- Aperture around f/2.8 to f/4 for shallow depth of field with the product still clearly readable
- Natural framing with a refined sense of composition
- Slight lived-in realism, but still polished

Lighting:
- Soft natural daylight or daylight-inspired studio light
- Directional but gentle light from one side
- Soft shadow transitions
- Subtle highlight rolloff and realistic atmosphere
- Warm, believable, appetizing light without looking yellow

Styling and realism:
- Props should match the brand and product mood
- Surfaces, crumbs, utensils, linens, or ingredients should feel restrained and tasteful
- Realistic food texture and believable packaging behavior
- No clutter, no chaotic styling, no extra branding elements

Overall feel:
- Warm, believable, commercial
- Premium lifestyle advertising image
- The product should still dominate the frame

Now create the image.`,
          },
          {
            title: "Rávørur uttan um vøruna",
            subtitle: "Tú vilt vísa, hvørjar rávørur eru í vøruni, ella hvønn smakk hon hevur.",
            image: ingredientsImg,
            text: `Create a premium product shot where the product is shown together with its key ingredients.

Use this product context:
[PASTE PRODUCT CONTEXT]

[If needed: Use the uploaded product image as the reference.]

Goal:
Visually explain the product through a clean and appetizing ingredient composition.

Composition:
- Place the product in the center or as the clear main hero
- Arrange a small number of key ingredients around it
- The ingredient layout should feel deliberate, balanced, and elegant
- Ingredients should support the product story clearly and immediately

Camera:
- Real commercial food photography look
- 85mm lens or slightly top-down 50mm setup depending on what suits the product
- Aperture around f/5.6 for good clarity across product and ingredients
- Clean composition with clear visual hierarchy

Lighting:
- Soft diffused key light with subtle fill
- Controlled highlights on packaging and ingredients
- Realistic shadow depth and good texture visibility
- Bright, fresh, appetizing light

Food styling:
- Ingredients should look fresh, realistic, and high quality
- Use realistic proportions and recognizable forms
- Keep the styling refined and not overloaded
- No random garnish that does not belong to the product

Materials and realism:
- Accurate packaging texture and label fidelity
- Realistic ingredient surfaces, moisture, matte finishes, gloss, seeds, flakes, grains, or powders where relevant
- No floating clutter, no messy pileups, no fake text artifacts

Overall feel:
- Clean, attractive, premium
- Ingredient storytelling without losing product clarity

Now create the image.`,
          },
          {
            title: "Sundursett tilfar / samansetingarmynd",
            subtitle: "Tú vilt hava eina meira eyðfangandi mynd, sum greiðir betur frá vøruni.",
            image: explodedImg,
            text: `Create a stylized premium product shot that shows the product together with its ingredients in a clean exploded composition.

Use this product context:
[PASTE PRODUCT CONTEXT]

[If needed: Use the uploaded product image as the reference.]

Goal:
Create a visually striking composition that feels elegant, modern, appetizing, and high-end.

Composition:
- Show the product as the hero
- Arrange the main ingredients floating or suspended around it in a controlled exploded layout
- Keep spacing intentional, readable, and visually rhythmic
- The composition should feel designed, not chaotic

Camera:
- High-end commercial studio photography look
- 85mm lens or 100mm macro-adjacent lens feel
- Aperture around f/5 to f/8 for strong overall clarity
- Slightly dynamic but still controlled framing
- Crisp focus and high resolution

Lighting:
- Soft studio key light with subtle directional shape
- Gentle fill and a faint rim or back edge for separation
- Controlled reflections and highlights
- Clean soft shadows or very subtle contact shadows
- Premium studio mood, not dark and not overdramatic

Styling and realism:
- Ingredients must look realistic, appetizing, and true to the product
- Material response must be accurate for powders, flakes, nuts, fruit, seeds, glaze, chocolate, liquids, or crumbs
- Keep the scene elegant and minimal
- No clutter, no visual noise, no surreal nonsense

Reference fidelity:
- If a reference image is provided, preserve the product identity, packaging, colors, proportions, and label character
- No label distortion, no extra text, no invented redesign

Overall feel:
- Clear, stylish, premium, editorial-commercial
- Stronger and more eye-catching than a standard product shot
- Still believable and well controlled

Now create the image.`,
          },
          {
            title: "Bólkamynd / vørupakki",
            subtitle: "Tú vilt vísa fleiri vørur saman sum eitt sett ella eina røð.",
            image: bundleImg,
            text: `Create a premium product shot showing these food products together as a clean bundle or product line.

Use this product context:
[PASTE PRODUCT CONTEXT]

[If needed: Use the uploaded product image as the reference.]

Goal:
Show a clear, attractive brand family with strong visual consistency.

Composition:
- Show 2 to 5 matching products together
- Arrange them in a balanced, commercially appealing layout
- Vary height and spacing slightly, but keep the composition clean and structured
- Make the products feel like they naturally belong together as one cohesive line

Camera:
- Real commercial product photography look
- 70mm to 85mm lens feel
- Aperture around f/8 for crisp group clarity
- Straight-on or slightly elevated angle depending on packaging
- Careful perspective control, no distortion

Lighting:
- Soft studio lighting with broad even coverage
- Subtle sculpting from one side to preserve form
- Clean controlled shadows
- Consistent reflections and material highlights across all products

Reference fidelity:
- Keep packaging design, branding style, material finish, color palette, and proportions consistent
- If based on a real reference, preserve label logic and product family character
- No random new branding or packaging forms

Overall feel:
- Simple, premium, commercially realistic
- Professional brand lineup image
- Cohesive, tidy, confident, and useful for presentation or sales

Now create the image.`,
          },
          {
            title: "Í brúki",
            subtitle: "Tú vilt vísa vøruna í brúki, so hon kennist meira verulig.",
            image: inUseImg,
            text: `Create a premium product shot showing this food product in use.

Use this product context:
[PASTE PRODUCT CONTEXT]

[If needed: Use the uploaded product image as the reference.]

Goal:
Show the product being used in a natural, appetizing, and believable way while keeping it clearly visible.

Scene:
- Show a realistic moment of use that matches the product
- The action should feel simple and commercially useful
- Keep the product as the main focus
- Hands, utensils, serving elements, or food context should support the story without stealing attention

Camera:
- Real editorial food photography look
- 50mm or 85mm lens feel
- Aperture around f/3.2 to f/5 depending on the scene
- Focus should stay clearly on the product and the main action
- Framing should feel natural but art directed

Lighting:
- Soft natural light or daylight-inspired studio light
- Directional soft key with realistic falloff
- Gentle fill and pleasing shadow depth
- Rich texture visibility for both product and food elements

Styling and realism:
- Realistic serving behavior, utensil placement, hand position, and food styling
- Appetizing textures and believable details
- No awkward hands, no strange anatomy, no cluttered backgrounds
- Packaging and label should remain accurate if visible

Overall feel:
- Warm, useful, real, appetizing
- Premium brand image showing actual use
- Polished but not overstyled

Now create the image.`,
          },
          {
            title: "Fleiri vinklar",
            subtitle: "Tú vilt fáa eina greiðari fatan av vøruni við at vísa hana frá fleiri síðum.",
            image: anglesImg,
            text: `Create a clean premium product presentation showing this food product from multiple angles.

Use this product context:
[PASTE PRODUCT CONTEXT]

[If needed: Use the uploaded product image as the reference.]

Goal:
Create a professional product overview that makes the form, packaging, and details easy to understand.

Composition:
- Show the product from 3 to 4 useful angles such as front, side, top, three-quarter, or close detail
- Arrange the views in a clean, structured layout
- Keep spacing even and the design presentation tidy
- Make the product feel like a premium packaged good in a presentation board

Camera:
- Real studio photography look
- Consistent lens logic across views, around 70mm to 85mm
- Aperture around f/8 for clear detail
- Neutral perspective and crisp rendering
- High resolution with strong detail control

Lighting:
- Consistent soft studio lighting across all angles
- Clean shadows and accurate reflections
- Material finish should remain believable from every view
- Bright and neutral with gentle sculpting

Reference fidelity:
- Keep product proportions, label placement, colors, material finish, and packaging structure consistent across all views
- No redesigning between angles
- No label drift, no shape changes, no extra text artifacts

Overall feel:
- Professional product overview
- Clean, tidy, premium, and easy to understand
- Useful for brand presentation, internal review, or ecommerce planning

Now create the image.`,
          },
          {
            title: "Skapandi bakgrund",
            subtitle: "Tú vilt hava eina meira eyðkenda og marknaðarvinarliga mynd við sterkari sjónligari kenslu.",
            image: creativeBgImg,
            text: `Create a premium product shot for this food product with a creative and visually striking background.

Use this product context:
[PASTE PRODUCT CONTEXT]

[If needed: Use the uploaded product image as the reference.]

Goal:
Create a more distinctive, eye-catching campaign-style image while keeping the product clear and desirable.

Art direction:
- Keep the product as the clear hero
- Use a bold but tasteful background that fits the product mood and brand style
- The background can be graphic, sculptural, color-driven, or stylized, but it must stay elegant
- Strong visual taste is more important than realism, but the product itself should still feel real

Camera:
- High-end commercial studio image
- 85mm lens feel
- Aperture around f/5.6
- Clean, intentional framing with premium composition
- Slightly more dramatic than ecommerce, but still controlled

Lighting:
- Stylized studio lighting with a clear lighting concept
- Soft but directional key light
- Refined highlight control and strong separation from the background
- Use subtle color contrast or tonal contrast where fitting
- Keep shadows deliberate and clean

Reference fidelity and realism:
- Preserve the product identity, packaging design, colors, proportions, and label character
- Accurate packaging materials and reflections
- No fake branding elements, no distorted label, no chaotic props

Overall feel:
- Premium, modern, memorable
- Brand-campaign energy
- Visually striking but still tasteful and commercially usable
- The background must elevate the product, not overpower it

Now create the image.`,
          },
          {
            title: "Storyboard / 3×3 grid",
            subtitle: "Tú vilt hava eitt heildaryvurlit av vøruni í níggju myndum — sum eitt sniðgivið portfolio-upplag.",
            image: storyboardImg,
            text: `A clean 3×3 storyboard grid with nine equal sized panels on 4:5 ratio.

Use the reference image as the base product reference. Keep the same product, packaging design, branding, materials, colors, proportions and overall identity across all nine panels exactly as the reference. The product must remain clearly recognizable in every frame. The label, logo and proportions must stay exactly the same.

This storyboard is a high-end designer mockup presentation for a branding portfolio. The focus is on form, composition, materiality and visual rhythm rather than realism or lifestyle narrative. The overall look should feel curated, editorial, premium and design-driven.

GLOBAL ART DIRECTION:
- Each frame must feel like part of one coherent visual series
- Consistent lighting logic, color palette, tonal range, material rendering and taste across all nine panels
- The styling should feel highly curated and intentional
- Premium product photography with refined restraint
- No cheap mockup feel, no random props, no inconsistent styling
- The product must remain elegant, sharp and materially believable in every frame

CAMERA & IMAGE QUALITY:
- Ultra high-quality studio imagery with a real camera look
- Use a mix of 50mm, 85mm and 100mm macro lens feel depending on the frame
- Controlled depth of field
- Precise focus placement
- Accurate reflections, edges, label detail and material response
- Sharp product rendering with premium photographic realism

LIGHTING:
- High-end studio lighting with one clear visual logic across the full series
- Soft but sculpted key light, subtle fill, refined edge separation
- Controlled reflections and realistic shadow behavior
- Elegant contrast, clean tonal transitions
- Lighting should feel intentional, expensive and coherent

FRAME 1:
Front-facing hero shot of the product in a clean studio setup. Neutral background. Balanced composition. Calm, confident, premium presentation of the product.

FRAME 2:
Close-up shot centered on the middle of the product. Focus on surface texture, print detail, label material, packaging finish and tactile realism. Macro lens feel.

FRAME 3:
Show the reference product placed in an environment that naturally fits the brand and product category. Studio-built environment inspired by the product design elements and color palette. Keep it elevated and restrained.

FRAME 4:
Product shown in use or light interaction on a neutral studio background. Hands and interaction elements are minimal, elegant and refined. The interaction must feel natural and premium.

FRAME 5:
Isometric composition showing multiple products arranged in a precise geometric order from a top isometric angle. All products are at the same angle, evenly spaced, clean, structured and graphic.

FRAME 6:
Product levitating slightly tilted on a neutral background that fits the reference image color palette. Floating position is intentional, elegant and believable, with realistic shadow logic and refined separation.

FRAME 7:
Extreme close-up focusing on a specific detail of the label, edge, texture, embossing, seal, fold, material finish or print behavior. Very tactile and premium. Macro precision.

FRAME 8:
The product in an unexpected yet aesthetically strong setting that feels bold, editorial and visually striking. Studio-based, designer-driven, highly composed. Bold but tasteful. The concept must elevate the brand.

FRAME 9:
Wide composition showing the product in use, placed within a refined designer setup. Clean props, controlled styling, coherent palette, elegant spacing, and strong series consistency.

OUTPUT:
- A clean 3×3 grid
- No borders
- No text
- No captions
- No watermarks
- No inconsistent product redesign between frames
- The final result should feel like a luxury branding portfolio board shot by a top product photographer

Now create the image.`,
          },
        ],
      },
      {
        id: "step-4",
        label: "Næsta stig",
        title: "Frá mynd til video",
        description: "Nú hevur tú góðar vørumyndir. Men visti tú, at tú eisini kanst skapa stutt vøruvideo út frá teimum? Tað krevur tó, at tú hevur atgongd til eitt gott vitlíkis-videoamboð. Um tú hevur áhuga í hesum, so kanst tú keypa tær atgong til RunwayML ella okkurt annað í ein mánað, og so nýta hetta til at gera títt video. Brúka ChatGPT til at hjálpa tær at skriva birt.",
        video: productVideo,
        prompts: [],
      },
    ],
  },
};