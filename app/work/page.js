import Link from "next/link";
import LaptopMockup from "../components/LaptopMockup";
import PageIntro from "../components/PageIntro";
import PhoneMockup from "../components/PhoneMockup";
import SiteShell from "../components/SiteShell";
import { getProjects } from "../lib/projects";

export const metadata = {
  title: "Work | LYP"
};

export const dynamic = "force-dynamic";

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <SiteShell>
      <PageIntro
        eyebrow="Selected Work"
        title="Featured projects"
        body="A curated selection of work focused on atmosphere, precision, and clarity."
      />

      <section className="py-16 lg:py-20">
        {projects.length === 0 ? (
          <div className="rounded-2xl border border-stone-800 bg-white/[0.03] p-8">
            <p className="font-[family-name:var(--font-display)] text-3xl">目前沒有可顯示的作品。</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-400">
              Supabase 已連線成功，但 projects 資料表沒有回傳公開可讀取的資料。請確認資料列已新增，
              並且 RLS policy 允許 anon 使用者讀取。
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/work/${project.id}`}
                className="group grid gap-8 rounded-2xl border border-stone-800 bg-white/[0.03] p-6 transition hover:border-stone-600 hover:bg-white/[0.05] lg:grid-cols-[0.95fr_1.05fr]"
              >
                {project.title.includes("陪伴雲") || project.title.includes("CareNova") ? (
                  <PhoneMockup imageUrl={project.image_url} title={project.title} />
                ) : (
                  <LaptopMockup imageUrl={project.image_url} title={project.title} />
                )}

                <div className="space-y-5 self-center">
                  <div className="space-y-3">
                    <span className="font-[family-name:var(--font-display)] text-4xl text-stone-500 sm:text-5xl">
                      {project.display_id}
                    </span>
                    <h2 className="font-[family-name:var(--font-display)] text-3xl text-stone-100">
                      {project.title}
                    </h2>
                    <p className="max-w-2xl text-base leading-7 text-stone-300">
                      {project.subtitle || project.description}
                    </p>
                  </div>
                  <p className="text-sm leading-6 text-stone-400">
                    使用技術：{project.tech_stack.join(", ")}
                  </p>
                  <span className="inline-flex text-sm uppercase tracking-[0.24em] text-stone-400">
                    View detail
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </SiteShell>
  );
}
