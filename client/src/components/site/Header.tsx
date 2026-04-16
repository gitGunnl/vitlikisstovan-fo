import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, BookOpen, Briefcase, Headphones, Wrench } from "lucide-react";
import { siteConfig } from "@/content/site";

const dropdownItems = [
  { title: "Vegleiðingar", href: "/user-guides", icon: BookOpen },
  { title: "Vitlíki til arbeiðis", href: "/tilarbeidis", icon: Briefcase },
  { title: "Vitlíki poddvarp um Føroyar", href: "/podcast", icon: Headphones },
  { title: "Verkstovur", href: "/verkstova", icon: Wrench },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileSubMenuOpen, setIsMobileSubMenuOpen] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileSubMenuOpen(false);
  };

  const openDropdown = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsDropdownOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 500);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur-header shadow-sm transition-all duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200">
          <img
            src="/logo-header.png"
            alt={siteConfig.siteName}
            className="h-8 w-8 object-contain"
          />
          <span className="font-bold text-lg text-gray-900">{siteConfig.siteName}</span>
        </a>

        <nav className="hidden md:flex space-x-8 items-center">
          <a href="/um-okkum" className="text-foreground/80 hover:text-foreground transition-colors">
            Um okkum
          </a>
          <a href="/okkara-taenastur" className="text-foreground/80 hover:text-foreground transition-colors">
            Tænastur
          </a>

          <div
            className="relative"
            onMouseEnter={openDropdown}
            onMouseLeave={closeDropdown}
            onKeyDown={handleKeyDown}
          >
            <a
              href="/annad-fra-vitlikisstovuni"
              className="flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors"
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
              onFocus={openDropdown}
              onBlur={closeDropdown}
            >
              Annað frá Vitlíkisstovuni
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </a>

            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 ${
                isDropdownOpen
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 -translate-y-1 pointer-events-none'
              }`}
              role="menu"
              aria-label="Annað frá Vitlíkisstovuni undirflokkar"
            >
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[260px]">
                {dropdownItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      role="menuitem"
                      tabIndex={isDropdownOpen ? 0 : -1}
                      onFocus={openDropdown}
                      onBlur={closeDropdown}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:text-primary hover:bg-accent/50 transition-colors"
                    >
                      <Icon className="h-4 w-4 text-gray-400" />
                      {item.title}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <a href="/contact" className="text-foreground/80 hover:text-foreground transition-colors">
            Samband
          </a>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMobileMenu}
          data-testid="button-mobile-menu"
          aria-label={isMobileMenuOpen ? "Lat skerm aftur" : "Opna skerm"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
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
              Tænastur
            </a>

            <div>
              <button
                onClick={() => setIsMobileSubMenuOpen(!isMobileSubMenuOpen)}
                aria-expanded={isMobileSubMenuOpen}
                className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-accent/50 rounded-md transition-all duration-200"
              >
                Annað frá Vitlíkisstovuni
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMobileSubMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-200 ease-in-out ${isMobileSubMenuOpen ? 'max-h-60' : 'max-h-0'}`}>
                <div className="pl-4 space-y-1 mt-1">
                  {dropdownItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-accent/50 rounded-md transition-all duration-200"
                      >
                        <Icon className="h-4 w-4 text-gray-400" />
                        {item.title}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

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
