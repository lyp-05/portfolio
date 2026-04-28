import Link from "next/link";
import { notFound } from "next/navigation";
import LaptopMockup from "../../components/LaptopMockup";
import PhoneMockup from "../../components/PhoneMockup";
import SiteShell from "../../components/SiteShell";
import { getProjectById } from "../../lib/projects";

export const dynamic = "force-dynamic";

function splitParagraphs(value) {
  return String(value || "")
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return {
      title: "Work | LYP"
    };
  }

  return {
    title: `${project.title} | LYP`,
    description: project.description
  };
}

export default async function ProjectDetailPage({ params }) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    notFound();
  }

  const descriptionParagraphs = splitParagraphs(project.description || project.details);
  const isPhoneProject = project.title.includes("陪伴雲") || project.title.includes("CareNova");
  const Mockup = isPhoneProject ? PhoneMockup : LaptopMockup;

  return (
    <SiteShell>
      <section className="grid gap-12 border-b border-stone-800 py-16 lg:grid-cols-[0.65fr_1.35fr] lg:py-20">
        <div className="space-y-8">
          <Link href="/work" className="text-sm uppercase tracking-[0.24em] text-stone-400 transition hover:text-white">
            Back to work
          </Link>
          <p className="font-[family-name:var(--font-display)] text-6xl text-stone-500 sm:text-7xl">
            {project.display_id}
          </p>
        </div>

        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.24em] text-stone-400">{project.category}</p>
          <h1 className="max-w-4xl font-[family-name:var(--font-display)] text-5xl leading-tight sm:text-7xl">
            {project.title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-stone-300">
            {project.subtitle || project.description}
          </p>
        </div>
      </section>

      <section className="border-b border-stone-800 py-16 lg:py-20">
        <Mockup imageUrl={project.image_url} title={project.title} />
      </section>

      <section className="grid gap-10 border-b border-stone-800 py-16 lg:grid-cols-[0.75fr_1.25fr] lg:py-20">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.32em] text-stone-400">Project Info</p>
          <p className="font-[family-name:var(--font-display)] text-3xl">{project.category}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border border-stone-800 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Title</p>
            <p className="mt-3 text-stone-100">{project.title}</p>
          </div>
          <div className="border border-stone-800 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Category</p>
            <p className="mt-3 text-stone-100">{project.category}</p>
          </div>
          <div className="border border-stone-800 bg-white/[0.03] p-5 sm:col-span-2">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Technology</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech_stack.map((item) => (
                <span key={item} className="border border-stone-800 px-3 py-2 text-xs uppercase tracking-[0.18em] text-stone-300">
                  {item}
                </span>
              ))}
            </div>
          </div>
          {project.demo_url ? (
            <a
              href={project.demo_url}
              className="border border-stone-800 bg-white/[0.03] p-5 transition hover:border-stone-500 sm:col-span-2"
              target="_blank"
              rel="noreferrer"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Demo</p>
              <p className="mt-3 break-all text-stone-100">{project.demo_url}</p>
            </a>
          ) : null}
        </div>
      </section>

      <section className="grid gap-10 border-b border-stone-800 py-16 lg:grid-cols-[0.75fr_1.25fr] lg:py-20">
        <p className="text-sm uppercase tracking-[0.32em] text-stone-400">Description</p>
        <div className="space-y-6 text-base leading-8 text-stone-300">
          {project.overview ? <p>{project.overview}</p> : null}
          {descriptionParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      {project.gallery_urls.length > 0 ? (
        <section className="border-b border-stone-800 py-16 lg:py-20">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-stone-400">Gallery</p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl">Mockup views</h2>
            </div>
          </div>

          <div className="grid gap-x-8 gap-y-14 lg:grid-cols-2">
            {project.gallery_urls.map((imageUrl, index) => (
            <div
                key={`${imageUrl}-${index}`}
                className={index % 2 === 1 ? "lg:pt-20" : ""}
              >
                <Mockup imageUrl={imageUrl} title={`${project.title} ${index + 1}`} />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="flex flex-wrap items-center justify-between gap-6 py-16 lg:py-20">
        <Link href="/work" className="text-sm uppercase tracking-[0.24em] text-stone-400 transition hover:text-white">
          Back to work
        </Link>
        <Link href="/contact" className="border border-stone-200 px-6 py-3 text-sm uppercase tracking-[0.24em] transition hover:bg-stone-100 hover:text-stone-950">
          Contact
        </Link>
      </section>
    </SiteShell>
  );
}
