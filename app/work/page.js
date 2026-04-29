import Link from "next/link";
import LaptopMockup from "../components/LaptopMockup";
import PageIntro from "../components/PageIntro";
import PhoneMockup from "../components/PhoneMockup";
import SiteShell from "../components/SiteShell";
import { getProjects } from "../lib/projects";

export const metadata = {
  title: "Project | LYP"
};

export const dynamic = "force-dynamic";

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <SiteShell>
      <PageIntro
        eyebrow="Selected Project"
        title="Featured projects"
        body="A curated selection of projects focused on atmosphere, precision, and clarity."
      />

      <section className="py-20 lg:py-28">
        {projects.length === 0 ? (
          <div className="reveal border border-stone-800/80 bg-white/[0.035] p-10 shadow-2xl shadow-black/25 backdrop-blur">
            <p className="font-[family-name:var(--font-display)] text-3xl">目前沒有可顯示的作品。</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-400">
              Supabase 已連線成功，但 projects 資料表沒有回傳公開可讀取的資料。請確認資料列已新增，
              並且 RLS policy 允許 anon 使用者讀取。
            </p>
          </div>
        ) : (
          <div className="grid gap-10">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/work/${project.id}`}
                className="group reveal grid gap-10 border border-stone-800/80 bg-white/[0.035] p-6 shadow-2xl shadow-black/20 backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-stone-500/80 hover:bg-white/[0.055] hover:shadow-black/45 lg:grid-cols-[0.95fr_1.05fr] lg:p-8"
              >
                {project.title.includes("陪伴雲") || project.title.includes("CareNova") ? (
                  <PhoneMockup imageUrl={project.image_url} title={project.title} />
                ) : (
                  <LaptopMockup imageUrl={project.image_url} title={project.title} />
                )}

                <div className="space-y-7 self-center">
                  <div className="space-y-5">
                    <span className="font-[family-name:var(--font-display)] text-5xl text-stone-600 sm:text-6xl">
                      {project.display_id}
                    </span>
                    <h2 className="font-[family-name:var(--font-display)] text-4xl leading-none text-stone-100 sm:text-5xl">
                      {project.title}
                    </h2>
                    <p className="max-w-2xl text-base leading-7 text-stone-300">
                      {project.subtitle || project.description}
                    </p>
                  </div>
                  <p className="border-l border-stone-700 pl-4 text-sm leading-6 text-stone-400">
                    使用技術：{project.tech_stack.join(", ")}
                  </p>
                  <span className="inline-flex text-sm uppercase tracking-[0.28em] text-stone-400 transition group-hover:translate-x-2 group-hover:text-white">
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
