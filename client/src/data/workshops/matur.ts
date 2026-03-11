import { Workshop } from "./types";

export const matur: Workshop = {
  name: "AI Product Shots",
  company: "Vitlíkisstovan",
  labs: [],
  singlePage: true,
  pageContent: {
    heroTitle: "AI Product Shots",
    heroSubtitle: "A practical helper for creating food product images with AI.",
    heroNote: "All prompts work with ChatGPT and Nano Banana.",
    image: "/images/verkstovur.jpeg",
    imageAlt: "Workshop",
    description: "",
    bullets: [],
    agenda: [],
    ctaText: "",
    ctaDescription: "",

    steps: [
      {
        id: "step-1",
        label: "Step 1",
        title: "Build product context",
        description: "Start here. Paste this into ChatGPT and let it interview you about your product. The goal is to create a short product context block that you can reuse in the next steps.",
        prompts: [
          {
            title: "Interview prompt",
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
        label: "Step 2A",
        title: "Create a basic product image from context",
        description: "Use this if you do not already have a real product image. Paste in your product context and let the AI create a simple, fitting first shot.",
        prompts: [
          {
            title: "Basic shot prompt (no product image)",
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
        label: "Step 2B",
        title: "Create a basic product shot from your real product",
        description: "Use this if you already have a product image. Upload your product image, then paste this prompt with your product context.",
        prompts: [
          {
            title: "Basic shot prompt (with product image)",
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
        label: "Step 3",
        title: "Explore different directions",
        description: "Once you have a basic shot, try different creative directions. Pick one that fits your goal.",
        prompts: [
          {
            title: "Clean webshop shot",
            subtitle: "You want a simple sales image for a webshop or catalog.",
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
            title: "Lifestyle scene",
            subtitle: "You want the product to feel more alive and real.",
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
            title: "Ingredients around the product",
            subtitle: "You want to show what is inside or what flavors it has.",
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
            title: "Exploded ingredients / composition shot",
            subtitle: "You want a more eye-catching visual that explains the product.",
            text: `Create a stylized product shot that shows the product together with its ingredients in an exploded composition.

Use this product context:
[PASTE PRODUCT CONTEXT]

[If needed: Use the uploaded product image as the reference.]

Show the product as the hero, with its main ingredients floating or arranged around it in a clean, elegant way.
Keep it realistic, appetizing, and visually clear.
Do not make it chaotic.`,
          },
          {
            title: "Blueprint / concept style",
            subtitle: "You want a more creative, design-like version for marketing or idea work.",
            text: `Create a blueprint-style concept image of this food product.

Use this product context:
[PASTE PRODUCT CONTEXT]

Show the product clearly in a technical or concept-sketch style.
Keep the product easy to understand.
Use a clean layout and make it feel like a design concept presentation.
Do not overcomplicate it.`,
          },
        ],
      },
    ],

    bottomTip: {
      title: "Let ChatGPT improve your prompt",
      description: "Not sure how to write a better prompt? Let the AI help you refine it.",
      prompt: {
        title: "Prompt improver",
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
