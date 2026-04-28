import PageIntro from "../components/PageIntro";
import SiteShell from "../components/SiteShell";
import { contacts } from "../lib/content";

export const metadata = {
  title: "Contact | Lumen Portfolio"
};

export default function ContactPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Contact"
        title="有合作想法、專案邀約，或只是想打聲招呼，都可以直接聯絡我。"
        body="For selected freelance collaborations, identity sites, portfolio systems, and focused creative development."
      />

      <section className="grid gap-12 py-16 lg:grid-cols-[1fr_0.9fr] lg:py-20">
        <div className="rounded-2xl border border-stone-800 bg-white/[0.03] p-7">
          <p className="text-sm uppercase tracking-[0.24em] text-stone-400">Availability</p>
          <p className="mt-5 max-w-lg font-[family-name:var(--font-display)] text-3xl leading-tight">
            Open to compact projects with a clear visual direction and thoughtful pacing.
          </p>
        </div>

        <div className="space-y-4">
          {contacts.map((contact) => (
            <a
              key={contact.label}
              href={contact.href}
              className="flex items-center justify-between gap-6 border-b border-stone-800 py-4 text-sm transition hover:border-stone-500 hover:text-white"
              target={contact.href.startsWith("http") ? "_blank" : undefined}
              rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
            >
              <span className="uppercase tracking-[0.24em] text-stone-400">{contact.label}</span>
              <span className="text-right">{contact.value}</span>
            </a>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
