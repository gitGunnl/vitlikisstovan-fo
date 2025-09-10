// client/src/pages/tilarbeidis.tsx
import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { siteUrl } from "@/lib/seo";

type TimelineEvent = {
  id: string;
  date: string;
  title: string;
  summary: string;
  mediaType?: "image" | "video";
  mediaSrc?: string;
};

const timelineData: TimelineEvent[] = [
  {
    id: "evt-001",
    date: "2025-05-01",
    title: "Verkætlanin fíggjað",
    summary:
      'Átakið tryggjaði sær játtan, ið gevur okkum tilfeingi at kanna nýtslumøguleikar av vitlíki hjá starvsfólki í úrvaldu bólkunum.',
  },
  {
    id: "evt-002",
    date: "2025-07-01",
    title: "Verkætlanin byrjar",
    summary: "Fyrsta arbeiðsætlanin kunngjørd.",
  },
  {
    id: "evt-003",
    date: "2025-07-07",
    title: "Verkstova um bólkaval",
    summary:
      'Verkstovan um at geva íblástur til hvørjir bólkar kunna hava størsta gagn av hesum átakinum og til at meta styrkistøl fyri yrkisbólkar til royndarverkætlanir.',
    mediaType: "image",
    mediaSrc: "/images/verkstova.jpeg",
  },
  {
    id: "evt-004",
    date: "2025-07-09",
    title: "Raðfesting í gongd",
    summary:
      'Vit meta nú um teir tjúgu bólkarnar eftir hesum styrkistølum: "Fáir skíggjar, stórt starvsfólkatal og vitlíkis-nýtslumøguleikar."',
  },
  {
    id: "evt-005",
    date: "2025-07-15",
    title: "Samrøða við miðlar",
    summary:
      "Hava gjørt fyrstu samrøðu við tíðarritið hjá Granskingarráðnum um verkætlanina og um leiklutin hjá vitlíki í føroyskum arbeiðslívi. Greinin er ikki komin út enn.",
  },
  {
    id: "evt-006",
    date: "2025-08-01",
    title: "Kanningarstig",
    summary:
      "Næsta stigið: seta okkum í samband við valdar bólkar og skipa fyri samrøður fyri at avdúkað dagligar avbjóðingar.",
  },
];

const Tilarbeidis = () => {
  const [activeSection, setActiveSection] = useState<string>("evt-001");
  const [visibleEvents, setVisibleEvents] = useState<Set<string>>(new Set());

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    // Keep DA locale to match previous rendering; adjust to 'fo-FO' if you prefer Faroese month names.
    return date.toLocaleDateString("da-DK", options);
  };

  const scrollToEvent = (eventId: string) => {
    const element = document.getElementById(eventId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = timelineData.map((evt) =>
        document.getElementById(evt.id)
      );
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(timelineData[i].id);
          break;
        }
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).id;
            setVisibleEvents((prev) => new Set([...prev, id]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "-50px 0px",
      }
    );

    // Observe all timeline items
    timelineData.forEach((evt) => {
      const el = document.getElementById(evt.id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initialize on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <SEO
        title="Til arbeiðis - Vitlíkisstovan"
        description="Arbeiðsdagur við vitlíki og effektivum verkfřrum."
        url={`${siteUrl}/tilarbeidis`}
      />

      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Verkætlanar dagføringar – Vitlíki til arbeiðis
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Fylg við okkara arbeiðsætlan, meðan vit menna vitlíki vegleiðingar
              til Føroyska vinnulívið.
            </p>
          </div>
        </section>

        {/* Status Boxes */}
        <section className="px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Current Focus */}
            <div className="bg-primary/15 border-2 border-primary/50 rounded-xl p-6 shadow-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔍</span>
                <div>
                  <h3 className="font-bold text-lg text-primary">
                    Núverandi uppgáva:
                  </h3>
                  <p className="text-foreground/90">
                    raðfesta úrvaldu yrkisbólkarnar eftir okkara styrkitøl.
                  </p>
                </div>
              </div>
            </div>

            {/* Next Up */}
            <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <span className="text-xl">📅</span>
                <div>
                  <h4 className="font-semibold text-accent">Næst:</h4>
                  <p className="text-foreground/80 text-sm">
                    seta okkum í samband við umboð frá úrvaldu bólkarnar og
                    avtala samrøður (aug. 2025).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Navigation (Desktop Only) */}
            <aside className="hidden lg:block lg:w-1/4">
              <div className="sticky top-24">
                <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-6">
                  VARÐAR
                </h3>
                <nav className="space-y-1" aria-label="Timeline navigation">
                  {timelineData.map((evt) => {
                    const isActive = activeSection === evt.id;
                    return (
                      <button
                        key={evt.id}
                        onClick={() => scrollToEvent(evt.id)}
                        aria-current={isActive ? "true" : undefined}
                        className={[
                          "block w-full text-left px-4 py-3 rounded-lg transition-all duration-300 border-l-[3px]",
                          isActive
                            ? "bg-primary/15 text-primary border-primary"
                            : "text-foreground/70 hover:text-foreground hover:bg-foreground/5 border-transparent",
                        ].join(" ")}
                      >
                        <div className="text-xs text-foreground/50 mb-1 font-medium">
                          {formatDate(evt.date)}
                        </div>
                        <div className="text-sm font-medium">{evt.title}</div>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Right Column - Timeline */}
            <main className="lg:w-3/4">
              <div className="space-y-8">
                {timelineData.map((evt) => (
                  <section
                    key={evt.id}
                    id={evt.id}
                    className={[
                      "transition-all duration-700 transform",
                      visibleEvents.has(evt.id)
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8",
                    ].join(" ")}
                  >
                    <div className="bg-background/60 border border-border/50 rounded-xl p-8 hover:border-primary/30 hover:bg-background/70 transition-all duration-300 group">
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="w-5 h-5 text-primary/80" />
                        <span className="text-sm text-primary/80 font-bold uppercase tracking-wide">
                          {formatDate(evt.date)}
                        </span>
                      </div>

                      <h3 className="text-2xl font-semibold mb-4 text-foreground group-hover:text-primary transition-colors">
                        {evt.title}
                      </h3>

                      <p className="text-foreground/80 mb-6 leading-relaxed text-lg">
                        {evt.summary}
                      </p>

                      {evt.mediaSrc && (
                        <div className="aspect-video w-full rounded-lg overflow-hidden border border-border/40">
                          {evt.mediaType === "video" ? (
                            <iframe
                              src={evt.mediaSrc}
                              className="w-full h-full"
                              allowFullScreen
                              title={evt.title}
                            />
                          ) : (
                            <img
                              src={evt.mediaSrc}
                              alt={evt.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              decoding="async"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </section>
                ))}
              </div>
            </main>
          </div>
        </div>

        {/* Roadmap Table */}
        <section className="mt-24 py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Arbeiðsætlan
            </h2>

            <div className="overflow-x-auto bg-background/60 border border-border/50 rounded-xl p-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border/60">
                    <th className="text-left py-3 px-2 font-semibold">Stig</th>
                    <th className="text-left py-3 px-2 font-semibold">
                      Tíðarskeið
                    </th>
                    <th className="text-left py-3 px-2 font-semibold">
                      Høvuðsuppgávur
                    </th>
                    <th className="text-left py-3 px-2 font-semibold">
                      Úrslit
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  <tr>
                    <td className="py-4 px-2 font-medium">
                      Fyrireiking & Kanning
                    </td>
                    <td className="py-4 px-2">jul. – aug. 2025</td>
                    <td className="py-4 px-2">
                      Verkætlanarbyrjan, val av vinnugreinum og
                      kanningarsamrøður.
                    </td>
                    <td className="py-4 px-2">Endaligt vinnugreinaval</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-2 font-medium">Menning (Stig 1)</td>
                    <td className="py-4 px-2">sep. – nov. 2025</td>
                    <td className="py-4 px-2">
                      Greina samrøður og skriva fyrstu vegleiðingarnar.
                    </td>
                    <td className="py-4 px-2 font-bold text-primary/90">
                      📦 Vegleiðingar 1 & 2
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-2 font-medium">Menning (Stig 2)</td>
                    <td className="py-4 px-2">nov. 2025 – jan. 2026</td>
                    <td className="py-4 px-2">
                      Halda fram við samrøðum og skriva næstu
                      vegleiðingarnar.
                    </td>
                    <td className="py-4 px-2 font-bold text-primary/90">
                      📦 Vegleiðingar 3 & 4
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-2 font-medium">Menning (Stig 3)</td>
                    <td className="py-4 px-2">feb. – apr. 2026</td>
                    <td className="py-4 px-2">
                      Menna og skriva seinastu vegleiðingarnar.
                    </td>
                    <td className="py-4 px-2 font-bold text-primary/90">
                      📦 Vegleiðingar 5 & 6
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 px-2 font-medium">Frágreiðing</td>
                    <td className="py-4 px-2">apr. – mai 2026</td>
                    <td className="py-4 px-2">
                      Skriva endaliga samandráttarfrágreiðing við úrslitum og
                      tilmælum.
                    </td>
                    <td className="py-4 px-2 font-bold text-primary/90">
                      📦 Endalig verkætlanarfrágreiðing
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Contact Banner */}
        <section className="mt-16 py-16 px-4 sm:px-6 lg:px-8 bg-primary/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Vilt tú vera partur av okkara ferð?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Fylg okkum á LinkedIn og Facebook, har vit deila nógv meira um
              vitlíki í Føroyum. Ver fyrst at læra um nýggjar møguleikar innan
              vitlíki!
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="https://linkedin.com/company/tøkni-tænastan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all duration-300 hover:shadow-lg"
              >
                {/* LinkedIn icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM10 16H8v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zM17 16h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0V16h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548V16z" />
                </svg>
                Fylg á LinkedIn
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61557593776267"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-lg transition-all duration-300 hover:shadow-lg"
              >
                {/* Facebook icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                  aria-hidden="true"
                >
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.991 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.413c0-3.017 1.792-4.683 4.533-4.683 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.493 0-1.957.927-1.957 1.878v2.255h3.328l-.532 3.47h-2.796v8.385C19.612 22.954 24 17.991 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                Fylg á Facebook
              </a>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Tilarbeidis;
