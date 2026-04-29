import PageIntro from "../components/PageIntro";
import SiteShell from "../components/SiteShell";
import { contacts } from "../lib/content";

export const metadata = {
  title: "Contact | LYP"
};

export default function ContactPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Contact"
        title="有合作想法、專案邀約，或只是想打聲招呼，都可以直接聯絡我。"
        body="For selected freelance collaborations, identity sites, portfolio systems, and focused creative development."
      />

      <section className="grid gap-14 py-20 lg:grid-cols-[1fr_0.9fr] lg:py-28">
        <div className="border border-stone-800/80 bg-white/[0.035] p-8 shadow-2xl shadow-black/20 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.32em] text-stone-500">Availability</p>
          <p className="mt-6 max-w-lg font-[family-name:var(--font-display)] text-4xl leading-tight">
            Open to compact projects with a clear visual direction and thoughtful pacing.
          </p>
        </div>

        <div className="space-y-4">
          {contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              className="flex items-center justify-between gap-6 border-b border-stone-800/80 py-6 text-sm transition hover:-translate-y-0.5 hover:border-stone-500 hover:text-white"
              target={contact.href.startsWith("http") ? "_blank" : undefined}
              rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <span className="uppercase tracking-[0.28em] text-stone-500">{contact.label}</span>
              <span className="text-right text-base">{contact.value}</span>
            </a>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
