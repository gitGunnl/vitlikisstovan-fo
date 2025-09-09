import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/content/site";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur-header shadow-sm transition-all duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200">
          <img
            src="/logo-header.png"
            alt={siteConfig.siteName}
            className="h-8 w-8 object-contain"
          />
          <span className="font-bold text-lg text-gray-900">{siteConfig.siteName}</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="/um-okkum" className="text-foreground/80 hover:text-foreground transition-colors">
            Um okkum
          </a>
          <a href="/okkara-taenastur" className="text-foreground/80 hover:text-foreground transition-colors">
            Okkara tænastur
          </a>
          <a href="/blog" className="text-foreground/80 hover:text-foreground transition-colors">
            Blogg
          </a>
          <a href="/contact" className="text-foreground/80 hover:text-foreground transition-colors">
            Samband
          </a>
        </nav>



        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileMenu}
          data-testid="button-mobile-menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <nav className="md:hidden border-t border-gray-200 bg-white px-4 py-4 shadow-sm">
          <div className="space-y-2">
            <a
              href="/um-okkum"
              onClick={closeMobileMenu}
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-accent/50 rounded-md transition-all duration-200"
            >
              Um okkum
            </a>
            <a
              href="/okkara-taenastur"
              onClick={closeMobileMenu}
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-accent/50 rounded-md transition-all duration-200"
            >
              Okkara tænastur
            </a>
            <a
              href="/blog"
              onClick={closeMobileMenu}
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-accent/50 rounded-md transition-all duration-200"
            >
              Blogg
            </a>
            <a
              href="/contact"
              onClick={closeMobileMenu}
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-accent/50 rounded-md transition-all duration-200"
            >
              Samband
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}