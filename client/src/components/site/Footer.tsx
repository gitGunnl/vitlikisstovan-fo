import { siteConfig } from "@/content/site";
import { Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold">
              V
            </div>
            <span className="font-semibold">{siteConfig.siteName}</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <a 
                href={siteConfig.social.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-facebook"
                aria-label="Visit our Facebook page"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href={siteConfig.social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-linkedin"
                aria-label="Visit our LinkedIn page"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            
            {/* Footer Links */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>© {currentYear} {siteConfig.siteName}</span>
              <a 
                href={siteConfig.footer.privacyUrl} 
                className="hover:text-foreground transition-colors"
                data-testid="link-privacy"
              >
                Privacy
              </a>
              <a 
                href={siteConfig.footer.termsUrl} 
                className="hover:text-foreground transition-colors"
                data-testid="link-terms"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
