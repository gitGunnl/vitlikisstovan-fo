import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, BookOpen, Briefcase, Headphones, Wrench, Presentation, Settings, Palette, Monitor, Sparkles } from "lucide-react";
import { siteConfig } from "@/content/site";

interface DropdownItem {
  title: string;
  href: string;
  icon: typeof BookOpen;
}

interface NavDropdown {
  label: string;
  href: string;
  items: DropdownItem[];
}

const navDropdowns: NavDropdown[] = [
  {
    label: "Tænastur",
    href: "/okkara-taenastur",
    items: [
      { title: "Verkstovur", href: "/ai-workshop", icon: Wrench },
      { title: "Fyrilestrar", href: "/okkara-taenastur/fyrilestur", icon: Presentation },
      { title: "Ráðgeving", href: "/okkara-taenastur/vitlikisupplaering", icon: Settings },
      { title: "Menning av serloysnum", href: "/okkara-taenastur/serloysnir", icon: Monitor },
      { title: "Skapandi vitlíki", href: "/okkara-taenastur/skapandi-vitliki", icon: Palette },
    ],
  },
  {
    label: "Annað frá Vitlíkisstovuni",
    href: "/annad-fra-vitlikisstovuni",
    items: [
      { title: "Vegleiðingar", href: "/user-guides", icon: BookOpen },
      { title: "Vitlíki til arbeiðis", href: "/tilarbeidis", icon: Briefcase },
      { title: "Vitlíki poddvarp um Føroyar", href: "/podcast", icon: Headphones },
      { title: "Verkstovur", href: "/verkstova", icon: Wrench },
      { title: "Vitlíki í verki", href: "/vitliki-i-verki", icon: Sparkles },
    ],
  },
];

function useDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 500);
  }, []);

  const forceClose = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(false);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { isOpen, open, close, forceClose };
}

function DesktopDropdown({ dropdown, isOpen, open, close, forceClose }: {
  dropdown: NavDropdown;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  forceClose: () => void;
}) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      forceClose();
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={open}
      onMouseLeave={close}
      onKeyDown={handleKeyDown}
    >
      <a
        href={dropdown.href}
        className="flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onFocus={open}
        onBlur={close}
      >
        {dropdown.label}
        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </a>

      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-200 ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-1 pointer-events-none'
        }`}
        role="menu"
      >
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[260px]">
          {dropdown.items.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                role="menuitem"
                tabIndex={isOpen ? 0 : -1}
                onFocus={open}
                onBlur={close}
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
  );
}

function MobileDropdown({ dropdown, closeMobileMenu }: {
  dropdown: NavDropdown;
  closeMobileMenu: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center">
        <a
          href={dropdown.href}
          onClick={closeMobileMenu}
          className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-accent/50 rounded-l-md transition-all duration-200"
        >
          {dropdown.label}
        </a>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Víðka undirflokkar"
          className="px-3 py-2 text-gray-700 hover:text-primary hover:bg-accent/50 rounded-r-md transition-all duration-200"
        >
          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <div className={`overflow-hidden transition-all duration-200 ease-in-out ${isOpen ? 'max-h-80' : 'max-h-0'}`}>
        <div className="pl-4 space-y-1 mt-1">
          {dropdown.items.map((item) => {
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
  );
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const taenasturDropdown = useDropdown();
  const annadDropdown = useDropdown();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prev => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="no-print sticky top-0 z-50 w-full border-b border-border bg-white/95 backdrop-blur-header shadow-sm transition-all duration-300">
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

          <DesktopDropdown
            dropdown={navDropdowns[0]}
            isOpen={taenasturDropdown.isOpen}
            open={taenasturDropdown.open}
            close={taenasturDropdown.close}
            forceClose={taenasturDropdown.forceClose}
          />

          <DesktopDropdown
            dropdown={navDropdowns[1]}
            isOpen={annadDropdown.isOpen}
            open={annadDropdown.open}
            close={annadDropdown.close}
            forceClose={annadDropdown.forceClose}
          />

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

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-[700px]' : 'max-h-0'}`}>
        <nav className="md:hidden border-t border-gray-200 bg-white px-4 py-4 shadow-sm">
          <div className="space-y-2">
            <a
              href="/um-okkum"
              onClick={closeMobileMenu}
              className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-accent/50 rounded-md transition-all duration-200"
            >
              Um okkum
            </a>

            {navDropdowns.map((dropdown) => (
              <MobileDropdown
                key={dropdown.href}
                dropdown={dropdown}
                closeMobileMenu={closeMobileMenu}
              />
            ))}

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
