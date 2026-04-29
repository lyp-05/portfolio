import Link from "next/link";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Project" },
  { href: "/contact", label: "Contact" }
];

export default function SiteShell({ children }) {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      <div className="relative isolate min-h-screen overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(245,245,244,0.14),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(168,162,158,0.11),_transparent_28%),linear-gradient(rgba(245,245,244,0.025)_1px,_transparent_1px),linear-gradient(90deg,_rgba(245,245,244,0.025)_1px,_transparent_1px)] bg-[size:auto,auto,72px_72px,72px_72px]" />
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-16">
          <header className="sticky top-0 z-20 -mx-6 flex flex-wrap items-center justify-between gap-5 border-b border-stone-800/80 bg-stone-950/75 px-6 py-5 backdrop-blur-xl sm:-mx-10 sm:px-10 lg:-mx-16 lg:px-16">
            <Link href="/" className="font-[family-name:var(--font-display)] text-base uppercase tracking-[0.42em] transition hover:text-stone-300">
              LYP
            </Link>
            <nav className="flex gap-4 text-sm text-stone-300 sm:gap-8">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="uppercase tracking-[0.18em] transition hover:-translate-y-0.5 hover:text-white">
                  {item.label}
                </Link>
              ))}
            </nav>
          </header>
          {children}
        </div>
      </div>
    </main>
  );
}
