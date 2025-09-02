import { siteConfig } from "@/content/site";

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
    </footer>
  );
}
