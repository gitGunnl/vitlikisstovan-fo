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
        <div className="flex items-center space-x-2">
          <img 
            src="/logo-header.png" 
            alt={siteConfig.siteName} 
            className="h-8 w-8 object-contain"
          />
          <span className="font-bold text-lg text-gray-900">{siteConfig.siteName}</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {siteConfig.nav.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-primary transition-all duration-200 hover:scale-105 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
              data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <Button asChild data-testid="cta-header">
            <a href={siteConfig.nav.cta.href}>
              {siteConfig.nav.cta.text}
            </a>
          </Button>
        </div>

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
            {siteConfig.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-accent/50 rounded-md transition-all duration-200"
                data-testid={`nav-mobile-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <Button asChild className="w-full" data-testid="cta-mobile">
                <a href={siteConfig.nav.cta.href} onClick={closeMobileMenu}>
                  {siteConfig.nav.cta.text}
                </a>
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}