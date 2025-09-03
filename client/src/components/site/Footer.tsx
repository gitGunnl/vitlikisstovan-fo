import { siteConfig } from "@/content/site";
import { Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-gradient-to-b from-muted to-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-3 mb-4 md:mb-0 group cursor-pointer">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105 overflow-hidden">
              <img 
                src="/logo.png" 
                alt={`${siteConfig.siteName} logo`}
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="font-bold text-lg">{siteConfig.siteName}</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            {/* Social Icons */}
            <div className="flex items-center space-x-4">
              <a 
                href={siteConfig.social.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
                data-testid="link-facebook"
                aria-label="Visit our Facebook page"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href={siteConfig.social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-200 hover:scale-110"
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
                className="hover:text-primary transition-colors duration-200 hover:underline underline-offset-4"
                data-testid="link-privacy"
              >
                Privacy
              </a>
              <a 
                href={siteConfig.footer.termsUrl} 
                className="hover:text-primary transition-colors duration-200 hover:underline underline-offset-4"
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
