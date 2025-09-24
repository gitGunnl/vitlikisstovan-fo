import { useEffect } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { siteConfig } from "@/content/site";
import PodcastPlayer from "@/components/podcast/PodcastPlayer";
import episodes from "@/data/podcastEpisodes";
import "@/styles/podcast.css";

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
              <img src="/images/podcast/middle layer.png" alt="Faroe Islands landscape middle" />
            </div>
            <div className="parallax-layer layer-front" data-speed="0.8">
              {/* Front Layer - Close up elements */}
              <img src="/images/podcast/troll and sheep.png" alt="Faroe Islands landscape foreground" className="troll-sheep" />
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
                    From ancient myths about giants and witches to the true tale of the time locals used sheep to hack Google Maps — this podcast dives into the most fascinating, strange, and unforgettable stories from the Faroe Islands. Quirky, dark, or epic — the stories are real. The voices are AI.
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
                    <img src="/images/podcast/logo square.jpg" alt="Vitlíkisstovan Logo" className="tokni-logo-img" />
                  </div>
                  <div className="tokni-text">
                    <h3 className="tokni-title">A Vitlíkisstovan AI Project</h3>
                    <p className="tokni-description">Bringing Faroese stories to life with cutting-edge AI technology. Explore the intersection of tradition and innovation.</p>
                    <p className="tokni-social-text">Learn more about AI and our projects on social media:</p>
                    <div className="tokni-social-links">
                      <a href="https://linkedin.com/company/vitlikisstovan" className="tokni-social-link">
                        <i className="fab fa-linkedin"></i>
                      </a>
                      <a href="https://facebook.com/vitlikisstovan" className="tokni-social-link">
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
                <div className="player-container py-6">
                  <PodcastPlayer episodes={episodes} />
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
                    Book a presentation or workshop at <a href="https://vitlikisstovan.fo" className="cta-link">vitlikisstovan.fo</a> or call <span className="phone-number">919444</span> to invite a real human (and his AI helpers) to your team.
                  </p>
                  <div className="social-links" style={{ marginTop: '20px', display: 'flex', gap: '15px', justifyContent: 'center', position: 'relative', zIndex: 9999 }}>
                    <a 
                      href="https://facebook.com/vitlikisstovan" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="social-link"
                      style={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 20px',
                        backgroundColor: '#1877F2',
                        color: 'white',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        position: 'relative',
                        zIndex: 9999
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(24, 119, 242, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </a>
                    <a 
                      href="https://linkedin.com/company/vitlikisstovan" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="social-link"
                      style={{ 
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 20px',
                        backgroundColor: '#0A66C2',
                        color: 'white',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        position: 'relative',
                        zIndex: 9999
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(10, 102, 194, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      LinkedIn
                    </a>
                  </div>
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