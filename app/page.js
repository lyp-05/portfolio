const projects = [
  {
    id: "01",
    title: "Brand Archive",
    category: "Visual Direction",
    description:
      "A quiet digital archive that turns fragmented campaign assets into a cohesive editorial browsing experience."
  },
  {
    id: "02",
    title: "Studio Commerce",
    category: "Web Design",
    description:
      "A restrained storefront focused on tactile spacing, selective typography, and calm conversion flows."
  },
  {
    id: "03",
    title: "Motion Identity",
    category: "Creative Development",
    description:
      "A motion-led portfolio system balancing cinematic transitions with lightweight frontend performance."
  }
];

const contacts = [
  { label: "Email", value: "hello@portfolio.dev", href: "mailto:hello@portfolio.dev" },
  { label: "Instagram", value: "@portfolio.studio", href: "https://instagram.com" },
  { label: "Behance", value: "behance.net/portfolio", href: "https://behance.net" }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(245,245,244,0.18),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(168,162,158,0.18),_transparent_28%)]" />
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-16">
          <header className="flex items-center justify-between border-b border-stone-800 pb-5">
            <a href="#top" className="font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.35em]">
              Lumen Portfolio
            </a>
            <nav className="flex gap-4 text-sm text-stone-300 sm:gap-8">
              <a href="#about" className="transition hover:text-white">
                About
              </a>
              <a href="#work" className="transition hover:text-white">
                Work
              </a>
              <a href="#contact" className="transition hover:text-white">
                Contact
              </a>
            </nav>
          </header>

          <section
            id="top"
            className="grid flex-1 items-end gap-14 border-b border-stone-800 py-16 lg:grid-cols-[1.3fr_0.7fr] lg:py-24"
          >
            <div className="space-y-8">
              <p className="max-w-sm text-xs uppercase tracking-[0.32em] text-stone-400">
                Minimal portfolio for designers, creators, and independent studios
              </p>
              <div className="space-y-6">
                <h1 className="max-w-4xl font-[family-name:var(--font-display)] text-5xl leading-none sm:text-7xl lg:text-[6.5rem]">
                  Calm visuals. Precise stories. Focused work.
                </h1>
                <p className="max-w-xl text-base leading-7 text-stone-300 sm:text-lg">
                  我是一位重視節奏、留白與敘事的創作者，專注於數位作品集、品牌網站與具質感的視覺呈現。
                </p>
              </div>
            </div>

            <div className="space-y-8 lg:justify-self-end">
              <div className="rounded-[2rem] border border-stone-800 bg-white/5 p-7 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.24em] text-stone-400">Currently</p>
                <p className="mt-4 max-w-xs font-[family-name:var(--font-display)] text-2xl leading-tight">
                  Building minimalist digital experiences with a refined editorial tone.
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center border border-stone-200 px-6 py-3 text-sm uppercase tracking-[0.24em] transition hover:bg-stone-100 hover:text-stone-950"
              >
                Start a conversation
              </a>
            </div>
          </section>

          <section
            id="about"
            className="grid gap-12 border-b border-stone-800 py-16 lg:grid-cols-[0.7fr_1.3fr] lg:py-20"
          >
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-stone-400">About</p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <p className="text-lg leading-8 text-stone-200">
                擅長將品牌概念轉化為清晰、簡潔且可被記住的介面，讓內容本身成為視覺主角。
              </p>
              <div className="space-y-5 text-sm leading-7 text-stone-300">
                <p>
                  服務內容包含品牌形象網站、個人作品集、互動展示頁與基礎前端開發。偏好乾淨版面、
                  精準字距與不過度裝飾的動態表現。
                </p>
                <p>
                  Base in Taipei, available for selected freelance collaborations and ongoing creative partnerships.
                </p>
              </div>
            </div>
          </section>

          <section id="work" className="py-16 lg:py-20">
            <div className="flex items-end justify-between gap-6 border-b border-stone-800 pb-6">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-stone-400">Selected Work</p>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl sm:text-4xl">
                  Featured projects
                </h2>
              </div>
              <p className="hidden max-w-sm text-sm leading-6 text-stone-400 sm:block">
                A curated selection of work focused on atmosphere, precision, and clarity.
              </p>
            </div>

            <div className="mt-8 grid gap-5">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="grid gap-5 rounded-[1.75rem] border border-stone-800 bg-white/[0.03] p-6 transition hover:border-stone-600 hover:bg-white/[0.05] md:grid-cols-[120px_1fr_auto]"
                >
                  <span className="text-sm text-stone-500">{project.id}</span>
                  <div className="space-y-2">
                    <p className="text-sm uppercase tracking-[0.24em] text-stone-400">{project.category}</p>
                    <h3 className="font-[family-name:var(--font-display)] text-2xl text-stone-100">
                      {project.title}
                    </h3>
                    <p className="max-w-2xl text-sm leading-7 text-stone-300">{project.description}</p>
                  </div>
                  <div className="self-start text-sm uppercase tracking-[0.24em] text-stone-500">
                    View
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            id="contact"
            className="grid gap-12 border-t border-stone-800 py-16 lg:grid-cols-[1fr_0.9fr] lg:py-20"
          >
            <div className="space-y-5">
              <p className="text-sm uppercase tracking-[0.32em] text-stone-400">Contact</p>
              <h2 className="max-w-2xl font-[family-name:var(--font-display)] text-3xl leading-tight sm:text-5xl">
                有合作想法、專案邀約，或只是想打聲招呼，都可以直接聯絡我。
              </h2>
            </div>

            <div className="space-y-4">
              {contacts.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  className="flex items-center justify-between border-b border-stone-800 py-4 text-sm transition hover:border-stone-500 hover:text-white"
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <span className="uppercase tracking-[0.24em] text-stone-400">{contact.label}</span>
                  <span>{contact.value}</span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
