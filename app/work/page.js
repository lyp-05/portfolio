import PageIntro from "../components/PageIntro";
import SiteShell from "../components/SiteShell";
import { projects } from "../lib/content";

export const metadata = {
  title: "Work | Lumen Portfolio"
};

export default function WorkPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Selected Work"
        title="Featured projects"
        body="A curated selection of work focused on atmosphere, precision, and clarity."
      />

      <section className="py-16 lg:py-20">
        <div className="grid gap-5">
          {projects.map((project) => (
            <article
              key={project.id}
              className="grid gap-6 rounded-2xl border border-stone-800 bg-white/[0.03] p-6 transition hover:border-stone-600 hover:bg-white/[0.05] md:grid-cols-[120px_1fr]"
            >
              <span className="text-sm text-stone-500">{project.id}</span>
              <div className="space-y-5">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-[0.24em] text-stone-400">{project.category}</p>
                  <h2 className="font-[family-name:var(--font-display)] text-3xl text-stone-100">
                    {project.title}
                  </h2>
                  <p className="max-w-2xl text-sm leading-7 text-stone-300">{project.details}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.scope.map((item) => (
                    <span key={item} className="border border-stone-800 px-3 py-2 text-xs uppercase tracking-[0.18em] text-stone-400">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
