import GuideArticle from "@/components/site/GuideArticle";

// --- Configuration & Content ---
// PLACEHOLDER: real markdown content (with :::prompt blocks) will be pasted here.
// Supports # / ## / ### headings, * or - bullet lists, --- rules, *italic* /
// **bold** / ***bold italic*** emphasis, and copyable :::prompt ... ::: blocks.

const blogContent = `
# Vitlíki til undirvísing

*Innihaldið kemur skjótt.*
`;

export default function AiForTeachingGuide() {
  return <GuideArticle content={blogContent} />;
}
