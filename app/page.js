import Link from "next/link";
import SiteShell from "./components/SiteShell";
import { projects } from "./lib/content";

export default function Home() {
  const featuredProject = projects[0];

  return (
    <SiteShell>
      <section className="grid flex-1 items-end gap-14 border-b border-stone-800 py-16 lg:grid-cols-[1.3fr_0.7fr] lg:py-24">
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
          <div className="flex flex-wrap gap-3">
            <Link
              href="/work"
              className="inline-flex items-center border border-stone-200 px-6 py-3 text-sm uppercase tracking-[0.24em] transition hover:bg-stone-100 hover:text-stone-950"
            >
              View work
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center border border-stone-700 px-6 py-3 text-sm uppercase tracking-[0.24em] text-stone-300 transition hover:border-stone-300 hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>

        <aside className="space-y-8 lg:justify-self-end">
          <div className="rounded-2xl border border-stone-800 bg-white/5 p-7 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.24em] text-stone-400">Currently</p>
            <p className="mt-4 max-w-xs font-[family-name:var(--font-display)] text-2xl leading-tight">
              Building minimalist digital experiences with a refined editorial tone.
            </p>
          </div>
          <Link
            href="/about"
            className="block rounded-2xl border border-stone-800 bg-stone-100 p-7 text-stone-950 transition hover:bg-white"
          >
            <p className="text-sm uppercase tracking-[0.24em] text-stone-500">Featured</p>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl">{featuredProject.title}</h2>
            <p className="mt-3 text-sm leading-7 text-stone-700">{featuredProject.description}</p>
          </Link>
        </aside>
      </section>
    </SiteShell>
  );
}
