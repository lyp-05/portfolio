import Link from "next/link";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/contact", label: "Contact" }
];

export default function SiteShell({ children }) {
  return (
    <main className="min-h-screen bg-stone-950 text-stone-100">
      <div className="relative isolate min-h-screen overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(245,245,244,0.16),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(168,162,158,0.14),_transparent_30%)]" />
        <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-16">
          <header className="flex flex-wrap items-center justify-between gap-5 border-b border-stone-800 pb-5">
            <Link href="/" className="font-[family-name:var(--font-display)] text-sm uppercase tracking-[0.35em]">
              Lumen Portfolio
            </Link>
            <nav className="flex gap-4 text-sm text-stone-300 sm:gap-8">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="transition hover:text-white">
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
