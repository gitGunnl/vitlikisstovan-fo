import { useEffect } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { siteConfig } from "@/content/site";

export default function Podcast() {
  useEffect(() => {
    // Set document title and meta description
    document.title = `Podcast – ${siteConfig.siteName}`;
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Listen to our podcast episodes and discover insights from industry experts.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Listen to our podcast episodes and discover insights from industry experts.';
      document.head.appendChild(meta);
    }

    // Add podcast-page class to body
    document.body.classList.add('podcast-page');

    // PARALLAX EFFECT CODE
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    const trollAndSheep = document.querySelector('.troll-sheep') as HTMLImageElement;
    
    let lastMouseX = 0;
    let rotationAngle = 0;
    let movingRight = false;
    
    // Parallax scroll handler
    const handleParallax = () => {
      const scrollTop = window.pageYOffset;
      
      parallaxLayers.forEach((layer: Element) => {
        const speed = parseFloat(layer.getAttribute('data-speed') || '0');
        const yPos = -(scrollTop * speed);
        
        if (layer.classList.contains('layer-front') && trollAndSheep) {
          (layer as HTMLElement).style.transform = `translateY(${yPos}px)`;
          if (rotationAngle !== 0) {
            trollAndSheep.style.transform = `rotate(${rotationAngle}deg)`;
          }
        } else {
          (layer as HTMLElement).style.transform = `translateY(${yPos}px)`;
        }
      });
    };
    
    // Mouse move handler for troll rotation
    const handleMouseMove = (e: MouseEvent) => {
      if (!trollAndSheep) return;
      
      const currentMouseX = e.clientX;
      const isMovingRight = currentMouseX > lastMouseX;
      
      if (isMovingRight !== movingRight) {
        movingRight = isMovingRight;
        rotationAngle = movingRight ? 3 : -3;
        
        trollAndSheep.style.transition = 'transform 0.5s ease';
        trollAndSheep.style.transform = `rotate(${rotationAngle}deg)`;
        trollAndSheep.style.transformOrigin = 'bottom center';
      }
      
      lastMouseX = currentMouseX;
    };
    
    // Scroll animations for cards
    const handleScrollAnimation = () => {
      const scrollElements = document.querySelectorAll('.illustration-card, .scroll-visible');
      
      scrollElements.forEach((el: Element) => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = elementTop <= (window.innerHeight || document.documentElement.clientHeight) / 1.25;
        
        if (elementVisible) {
          el.classList.add('in-view');
        }
      });
    };
    
    // Check if mobile
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    
    if (!isMobile) {
      window.addEventListener('scroll', handleParallax);
      window.addEventListener('mousemove', handleMouseMove);
      handleParallax(); // Initial call
    }
    
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation(); // Initial check

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('podcast-page');
      if (!isMobile) {
        window.removeEventListener('scroll', handleParallax);
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('scroll', handleScrollAnimation);
    };
  }, []);

  return (
    <>
      <Header />
      <div>
        {/* Header with Parallax Hero Section */}
        <header className="hero-section">
          <div className="parallax-container">
            <div className="parallax-layer layer-bg" data-speed="0.2">
              {/* Background Layer - Far mountains */}
              <img src="/images/podcast/background.png" alt="Faroe Islands landscape background" />
            </div>
            <div className="parallax-layer layer-mid" data-speed="0.5">
              {/* Middle Layer - Mid-distance hills */}
              <img src="/images/podcast/middle-layer.png" alt="Faroe Islands landscape middle" />
            </div>
            <div className="parallax-layer layer-front" data-speed="0.8">
              {/* Front Layer - Close up elements */}
              <img src="/images/podcast/troll-and-sheep.png" alt="Faroe Islands landscape foreground" className="troll-sheep" />
              <img src="/images/podcast/grass.png" alt="Grass foreground" className="grass" />
            </div>
            <div className="parallax-layer layer-clouds" data-speed="0.3">
              {/* Cloud Layer */}
              <img src="/images/podcast/cloud.png" alt="Clouds" />
            </div>
            <div className="hero-content">
              <div className="container">
                <h1 className="storybook-title">Most Interesting Stories <br />from the Faroe Islands</h1>
                <h2 className="subtitle">— Told by AI</h2>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="podcast-main">
          {/* Introduction Section */}
          <section className="intro-section">
            <div className="container">
              <div className="paper-bg">
                <div className="description-box">
                  <p className="podcast-description">
                    From ancient myths about giants and witches to the true tale of the time locals used sheep to hack Google Maps — this podcast dives into the most fascinating, strange, and unforgettable stories from the Faroe Islands. Quirky, dark, or epic — the stories are real. The voice is AI.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Tøkni Tænastan Marketing Section */}
          <section className="tokni-section">
            <div className="container">
              <div className="tokni-box">
                <div className="tokni-content">
                  <div className="tokni-logo">
                    <img src="/images/podcast/logo-square.jpg" alt="Tøkni Tænastan Logo" className="tokni-logo-img" />
                  </div>
                  <div className="tokni-text">
                    <h3 className="tokni-title">A Tøkni Tænastan AI Project</h3>
                    <p className="tokni-description">Bringing Faroese stories to life with cutting-edge AI technology. Explore the intersection of tradition and innovation.</p>
                    <p className="tokni-social-text">Learn more about AI and our projects on social media:</p>
                    <div className="tokni-social-links">
                      <a href="https://linkedin.com/company/tøkni-tænastan" className="tokni-social-link">
                        <i className="fab fa-linkedin"></i>
                      </a>
                      <a href="https://www.facebook.com/profile.php?id=61557593776267" className="tokni-social-link">
                        <i className="fab fa-facebook"></i>
                      </a>
                    </div>
                  </div>
                  <div className="sparkle sparkle-1">
                    <i className="fas fa-sparkles"></i>
                  </div>
                  <div className="sparkle sparkle-2">
                    <i className="fas fa-sparkles"></i>
                  </div>
                  <div className="sparkle sparkle-3">
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Podcast Player Section */}
          <section className="podcast-section">
            <div className="container">
              <div className="storybook-frame">
                <div className="frame-header">
                  <h2 className="section-title">Listen to Our Episodes</h2>
                </div>
                <div className="player-container">
                  {/* Placeholder for Podbean player - would be replaced with actual embed code */}
                  <div className="podcast-player">
                    <div className="player-placeholder">
                      <i className="fas fa-podcast"></i>
                      <p>Latest Episodes from the Faroe Islands</p>
                      {/* Podbean podcast player iframe */}
                      <iframe 
                        title="Most interesting stories from the Faroe Islands. Told by AI." 
                        allowTransparency={true}
                        height="315" 
                        width="100%" 
                        style={{ border: 'none', minWidth: 'min(100%, 430px)', height: '315px' }}
                        scrolling="no" 
                        data-name="pb-iframe-player" 
                        src="https://www.podbean.com/player-v2/?i=hqxzi-139ff97-pbblog-playlist&share=1&download=1&rtl=0&fonts=Arial&skin=1&font-color=auto&logo_link=episode_page&order=episodic&limit=10&filter=all&ss=a713390a017602015775e868a2cf26b0&btn-skin=7&size=315" 
                        loading="lazy" 
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section">
            <div className="container">
              <div className="village-board">
                <div className="board-content">
                  <h2 className="cta-title">✨ Want to use AI in a more exciting way at work?</h2>
                  <p className="cta-text">
                    Book a presentation or workshop at <a href="https://ritvit.fo" className="cta-link">ritvit.fo</a> or call <span className="phone-number">919444</span> to invite a real human (and his AI helpers) to your team.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}