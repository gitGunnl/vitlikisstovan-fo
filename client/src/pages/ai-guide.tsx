
import { useEffect } from "react";
import styles from "./ai-guide.module.css";
import { updateMetaTags } from "@/lib/meta";
import { seoConfig } from "@/content/seo";
import { ChevronRight, Shield, Users, MessageCircle, Sparkles, FileText } from "lucide-react";

export default function AIGuide() {
  useEffect(() => {
    // Add Google Fonts link for scrapbook style when component mounts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Kalam:wght@300;400;700&display=swap';
    link.rel = 'stylesheet';
    link.id = 'ai-guide-fonts';
    document.head.appendChild(link);
    
    const fullTitle = `AI for Pedagogues - ${seoConfig.title}`;
    const description = "Easy, safe ways to cut daily admin so you spend more time with children";
    
    updateMetaTags({
      title: fullTitle,
      description: description,
      image: seoConfig.ogImage,
      url: `${window.location.origin}/ai-guide`,
      type: 'article',
      siteName: seoConfig.siteName
    });
    
    // Cleanup: Remove font link when component unmounts
    return () => {
      const fontLink = document.getElementById('ai-guide-fonts');
      if (fontLink) {
        fontLink.remove();
      }
    };
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.graphPaperBg}>
        <div className={styles.container}>
          {/* Header */}
          <header className={styles.header}>
            <div className={styles.paperSheet}>
              <h1 className={styles.mainTitle} data-testid="text-main-title">
                AI FOR PEDAGOGUES
              </h1>
              <p className={styles.subtitle} data-testid="text-subtitle">
                Less Paperwork, More Play
              </p>
              <p className={styles.bodyText} style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.6rem', fontStyle: 'italic' }}>
                Easy, safe ways to cut daily admin so you spend more time with children
              </p>
            </div>
          </header>

          {/* Main Content */}
          <main className={styles.content}>
            {/* Introduction Section */}
            <section className={styles.paperSheet}>
              <h2 className={styles.sectionTitle} data-testid="text-section-intro">
                WHO IT'S FOR
              </h2>
              <ul className={styles.principlesList}>
                <li className={styles.listItem}>
                  <span>Frontline pedagogues and early-years staff in the Faroe Islands</span>
                </li>
                <li className={styles.listItem}>
                  <span>Little or no AI experience</span>
                </li>
                <li className={styles.listItem}>
                  <span>Phone-first, low-tech setups</span>
                </li>
                <li className={styles.listItem}>
                  <span>Looking for quick wins you can use today</span>
                </li>
              </ul>
              
              <h3 className={styles.techniqueTitle} style={{ color: 'var(--scrap-green)', marginTop: '2.5rem' }}>How to Read It</h3>
              <p className={styles.bodyText}>
                Think "small, safe steps." Copy, paste, try them, and keep what works. 
                You stay in charge: always review AI's output.
              </p>
              
              <h3 className={styles.techniqueTitle} style={{ color: 'var(--scrap-red)' }}>Not For</h3>
              <ul className={styles.pitfallsList}>
                <li className={styles.listItem}>
                  <span className={styles.pitfallMarker}>✗</span>
                  <span><strong>Replacing your judgment or care.</strong> AI can draft and suggest; you decide and adapt.</span>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.pitfallMarker}>✗</span>
                  <span><strong>Deep theory or tool setup.</strong> No model specs or vendor tutorials here—just simple chat use.</span>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.pitfallMarker}>✗</span>
                  <span><strong>Work that needs personal or sensitive data.</strong> This guide uses anonymous or generic content only.</span>
                </li>
                <li className={styles.listItem}>
                  <span className={styles.pitfallMarker}>✗</span>
                  <span><strong>High-tech integrations.</strong> We focus on chat prompts and basic copy-paste.</span>
                </li>
              </ul>
            </section>

            {/* Safety First */}
            <section className={styles.paperSheet}>
              <h2 className={styles.sectionTitle} data-testid="text-section-safety">
                <Shield className={styles.promptIcon} style={{ display: 'inline-block', marginRight: '1rem' }} />
                BE CAREFUL WITH WHAT YOU PUT IN (NO PII)
              </h2>
              
              <div className={styles.highlightBox} style={{ background: '#fff3cd', borderColor: 'var(--scrap-red)' }}>
                <h3 className={styles.promptTitle}>A Simple Rule: Don't Feed AI Personal Data</h3>
                <p className={styles.highlightText}>
                  Imagine calling into a radio show. Once you say something, it's out there—anyone tuning in can hear it, 
                  and you can't take it back. AI chat tools often work similarly.
                </p>
              </div>
              
              <p className={styles.bodyText}>
                Some workplaces might provide special, secure AI systems approved for handling sensitive information. 
                But unless you're <strong>100% sure</strong> your setup is approved for private data, never share personal 
                details about children or colleagues—like names, addresses, health info, or other confidential information.
              </p>
              
              <div className={styles.tipCard}>
                <h3 className={styles.tipTitle} style={{ color: 'var(--scrap-green)' }}>
                  What's Safe to Share
                </h3>
                <ul className={styles.principlesList}>
                  <li className={styles.listItem}><span><strong>Generic information:</strong> Examples that don't reveal personal details</span></li>
                  <li className={styles.listItem}><span><strong>Public information:</strong> General educational material</span></li>
                  <li className={styles.listItem}><span><strong>Anonymized information:</strong> "I have a shy kid" or "energetic child"</span></li>
                  <li className={styles.listItem}><span><strong>Fictional examples:</strong> Made-up scenarios or generic situations</span></li>
                </ul>
              </div>
            </section>

            {/* How to Think About AI */}
            <section className={styles.paperSheet}>
              <h2 className={styles.sectionTitle}>HOW TO THINK ABOUT AI AS A PARTNER</h2>
              <p className={styles.bodyText}>
                Think of AI as your helpful, quick-thinking assistant who is always ready to jump in and support you 
                with your daily tasks. Just like any good colleague, the clearer your instructions and context, the 
                better the assistance you'll receive.
              </p>
              <p className={styles.bodyText}>
                AI can feel like another person in the room—always ready with a fresh idea—but it's also quite different: 
                it doesn't tire, never gets bored with repetitive questions, and often suggests things you'd never imagine yourself. 
                However, it can also behave unexpectedly: misunderstanding simple instructions, proposing odd or impractical ideas, 
                or missing things we consider obvious.
              </p>
              
              <div className={styles.highlightBox}>
                <p className={styles.highlightText}>
                  <strong>Tip:</strong> Save a detailed description of your typical classroom setup—like group sizes, 
                  common materials, and regular activities—in a note on your phone or computer. Then just paste this 
                  description into the beginning of your prompt, and AI will immediately understand your specific situation.
                </p>
              </div>
            </section>

            {/* Creative Sparring Partner */}
            <section className={styles.paperSheet}>
              <h2 className={styles.sectionTitle}>
                <Sparkles className={styles.promptIcon} style={{ display: 'inline-block', marginRight: '1rem' }} />
                CREATIVE SPARRING PARTNER
              </h2>
              <p className={styles.bodyText}>
                AI shines when your familiar routines start feeling stale or you suddenly need fresh, adaptable ideas. 
                It's like having a creative teammate who instantly provides a range of exciting, manageable activities 
                tailored precisely to your needs.
              </p>
              
              <div className={styles.promptBlock}>
                <h3 className={styles.promptTitle}>
                  Good example prompt (copy/paste this):
                </h3>
                <div className={styles.codeBlock}>
                  <pre className={styles.codeContent}>
{`I'm a kindergarten pedagogue in 
Vestmanna, Faroe Islands. Due to rain, 
we're indoors today.

- Children: 12 kids aged 3-4, energetic
- Theme: Ocean Life
- Materials available: Crayons, paper, 
  blocks, toilet-roll tubes, soft toys
- Space constraints: Small indoor area only

Also, we're working with these Faroese 
words today: "alda" (wave), "hvalur" 
(whale), "fiskur" (fish), and "tara" 
(seaweed)—could you weave something fun 
around those as well?

Please ask first if anything is unclear.`}
                  </pre>
                </div>
              </div>
              
              <p className={styles.bodyText}>
                <strong>Follow-up Prompts:</strong> If there is anything you don't like about the idea, 
                just tell the AI exactly what you don't like:
              </p>
              <ul className={styles.principlesList}>
                <li className={styles.listItem}><span>"Make these activities simpler and quicker to clean."</span></li>
                <li className={styles.listItem}><span>"We loved the storytelling activity. Suggest three similar ocean-themed activities."</span></li>
              </ul>
            </section>

            {/* Safety & Checklist Buddy */}
            <section className={styles.paperSheet}>
              <h2 className={styles.sectionTitle}>
                <Shield className={styles.promptIcon} style={{ display: 'inline-block', marginRight: '1rem' }} />
                SAFETY & CHECKLIST BUDDY
              </h2>
              <p className={styles.bodyText}>
                AI can serve as your extra set of eyes, quickly scanning your plans to spot anything you might have 
                overlooked or forgotten, reducing the likelihood that important details get missed.
              </p>
              
              <div className={styles.promptBlock}>
                <h3 className={styles.promptTitle}>
                  Good example prompt (copy/paste this):
                </h3>
                <div className={styles.codeBlock}>
                  <pre className={styles.codeContent}>
{`We're taking 18 five-year-olds and 
3 adults to a busy national running day. 
It will be crowded and loud, with 
changeable weather. 

Here is our current adults' "things to 
bring" list:

• 3 high-vis vests for adults + 6 spare
• Group identifiers: A/B/C lanyards
• Simple wristbands for children
• Clipboard with route map
• Small first-aid kit
• Hand wipes + sanitizer
• Rain shells for adults
• 2 trash bags (for wet gear)
• Whistles for adults (1 each)
• Phone power bank (1-2)

Please review the list and:
1. Flag any crucial items we may have 
   forgotten
2. Suggest a few nice-to-have extras
3. Offer two simple simplification tactics

Keep it short and practical.`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Parent-Comms Copilot */}
            <section className={styles.paperSheet}>
              <h2 className={styles.sectionTitle}>
                <MessageCircle className={styles.promptIcon} style={{ display: 'inline-block', marginRight: '1rem' }} />
                PARENT-COMMS COPILOT
              </h2>
              <p className={styles.bodyText}>
                Being a pedagogue isn't only about keeping children safe, happy, and engaged—it's also about making 
                sure parents feel comfortable, informed, and confident. But at the end of a busy day, finding exactly 
                the right words can feel exhausting.
              </p>
              <p className={styles.bodyText}>
                AI can step in here as your calm, clear-headed helper—your trusted colleague who takes your quick notes 
                and transforms them into warm, professional, and reassuring communications.
              </p>
              
              <div className={styles.highlightBox} style={{ background: '#fff8e1', borderColor: 'var(--scrap-brown)' }}>
                <p className={styles.highlightText}>
                  <strong>Important:</strong> Because Faroese is still a developing language for most AI tools, 
                  always treat the Faroese text as a <strong>first draft</strong>, not a finished version. 
                  Read it aloud, adjust the phrasing, and make sure it sounds natural and kind.
                </p>
              </div>
              
              <div className={styles.promptBlock}>
                <h3 className={styles.promptTitle}>
                  Good example prompt (copy/paste):
                </h3>
                <div className={styles.codeBlock}>
                  <pre className={styles.codeContent}>
{`I'm a kindergarten pedagogue in Tórshavn 
(Faroe Islands). A gale warning is expected 
this afternoon. We want to ask parents: 
If possible, please pick up by 14:30. 
We remain open for families who cannot 
come early.

Please write clearly and simply:

1. Parent Note: A warm, reassuring message 
   (100-120 words) in Faroese first, then 
   English and Ukrainian.
2. Short SMS: Two-line reminder in Faroese, 
   English and Ukrainian.
3. Tiny FAQ (3 questions):
   • "What if we can't come early?"
   • "Why is picking up early safer?"
   • "Do times change tomorrow?"
4. Phone Phrasebook: Six friendly yet clear 
   sentences I can use for quick calls

Writing style: Plain language, short sentences, 
calm, reassuring, and respectful.`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Story/Game/Image Maker */}
            <section className={styles.paperSheet}>
              <h2 className={styles.sectionTitle}>
                <Sparkles className={styles.promptIcon} style={{ display: 'inline-block', marginRight: '1rem' }} />
                STORY / GAME / IMAGE MAKER
              </h2>
              <p className={styles.bodyText}>
                When you need a quick way to capture children's attention or gently address everyday issues, 
                this AI role becomes your instant creative helper.
              </p>
              
              <div className={styles.promptBlock}>
                <h3 className={styles.promptTitle}>
                  Good example prompt (copy/paste this):
                </h3>
                <div className={styles.codeBlock}>
                  <pre className={styles.codeContent}>
{`Create a short, playful story (about 1 minute 
long when read aloud) for my 4-year-olds in 
Klaksvík to gently remind them why it's 
important to wash their hands after playing 
outside.

Please include these Faroese words naturally 
in the story: "hendur" (hands), "reint" (clean), 
"bakteriur" (germs), and "spælipláss" (playground).

Make it relatable by mentioning common outdoor 
play activities they love, like playing in the 
sand, climbing, or picking up stones.

Output:
1) The story (clear and simple)
2) A short, repeatable phrase or gesture 
   children can practice together

Please ask first if anything is unclear.`}
                  </pre>
                </div>
              </div>
              
              <p className={styles.bodyText}>
                <strong>Follow-up prompts:</strong>
              </p>
              <ul className={styles.principlesList}>
                <li className={styles.listItem}><span>"Great! Now make an image of the characters from the story, create the image in a kids friendly watercolor style."</span></li>
                <li className={styles.listItem}><span>"Make the story shorter and simpler—about 30 seconds long."</span></li>
                <li className={styles.listItem}><span>"Include a funny talking animal character the children will remember."</span></li>
              </ul>
            </section>

            {/* Paperwork & Handover Scribe */}
            <section className={styles.paperSheet}>
              <h2 className={styles.sectionTitle}>
                <FileText className={styles.promptIcon} style={{ display: 'inline-block', marginRight: '1rem' }} />
                PAPERWORK & HANDOVER SCRIBE
              </h2>
              <p className={styles.bodyText}>
                Being a pedagogue means spending your days focused on children, but the required paperwork and 
                documentation tasks often stretch into your personal time. AI can step in here as your organized, 
                always-ready assistant.
              </p>
              
              <div className={styles.promptBlock}>
                <h3 className={styles.promptTitle}>
                  Good example prompt (copy/paste):
                </h3>
                <div className={styles.codeBlock}>
                  <pre className={styles.codeContent}>
{`I'm a kindergarten pedagogue in Runavík 
(Faroe Islands). Today was busy with fewer 
staff. I quickly jotted down these notes 
(no personal identifiers):

• Daily observations: energetic outdoor play; 
  calmer afternoon; snack went well; minor 
  conflict resolved quickly.
• Incident: Small bump at playground 
  (time: 10:15), quick first-aid applied, 
  child fine, parent informed by phone.
• Handover: Tomorrow's focus—more structured 
  indoor play; materials—check building blocks

Please write clearly and simply:

1. Daily observation entry: Two neutral, 
   concise sentences for our daily log
2. Incident report: Short structured text 
   ready to paste into our form
3. Handover note: Clear end-of-day summary 
   (max five short bullets)

Use natural Faroese. Keep it neutral, factual, 
and never include names or personal data.`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section className={styles.paperSheet}>
              <h2 className={styles.sectionTitle} data-testid="text-section-conclusion">
                REMEMBER
              </h2>
              <p className={styles.bodyText}>
                Working with AI is a skill that improves with practice. Start with simple requests, 
                experiment with different approaches, and gradually tackle more complex challenges.
              </p>
              <p className={styles.bodyText}>
                AI is a tool to augment your capabilities, not replace your judgment. 
                Always review, verify, and adapt AI outputs to your specific needs and the children in your care.
              </p>
              <div className={styles.signatureBox}>
                <p className={styles.signature}>Happy prompting!</p>
                <p className={styles.date}>— Your AI Guide for Pedagogues</p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
