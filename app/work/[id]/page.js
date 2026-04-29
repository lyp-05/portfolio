import Link from "next/link";
import { notFound } from "next/navigation";
import LaptopMockup from "../../components/LaptopMockup";
import MockupFlow from "../../components/MockupFlow";
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

function formatViewNumber(index) {
  return String(index + 1).padStart(2, "0");
}

function getImageName(imageUrl) {
  return String(imageUrl || "").split("/").pop()?.toLowerCase() || "";
}

function getDefaultMockupCaption() {
  return "可補充此畫面的使用情境、操作重點、資訊層級或視覺設計說明。";
}

function getSingleMockupCaption(project, imageUrl) {
  const imageName = getImageName(imageUrl);

  if (!project.title.includes("有梗菜市場")) {
    return getDefaultMockupCaption();
  }

  if (imageName.includes("cart")) {
    return "消費者可於購物車頁面查看剛剛加入的商品，並可依需求調整各商品的購買數量。頁面底部將自動即時計算並顯示總金額，方便使用者掌握消費明細。若消費者確認購買，點選「購買」按鈕後，系統將引導至聯絡資訊填寫頁面，以完成訂單流程。若消費者欲返回繼續選購，則可透過頁面左下方的「回到商品頁」按鈕返回商品列表，持續瀏覽與挑選商品。";
  }

  if (imageName.includes("submit")) {
    return "訂單完成後，系統會根據使用者剛購買的商品，從 localStorage 讀取最新訂單內容，並以 JavaScript 動態產生對應插圖，搭配 CSS 動畫呈現掉落效果，提升頁面互動性與趣味感。";
  }

  return getDefaultMockupCaption();
}

function getMockupGroups(project) {
  if (!project.title.includes("有梗菜市場")) {
    return project.gallery_urls.map((imageUrl) => ({
      type: "single",
      title: project.title,
      imageUrl,
      caption: getSingleMockupCaption(project, imageUrl)
    }));
  }

  const shopImages = project.gallery_urls.filter((imageUrl) => {
    const imageName = getImageName(imageUrl);
    return imageName.includes("shop1") || imageName.includes("shop2");
  }).sort((current, next) => getImageName(current).localeCompare(getImageName(next)));
  const otherImages = project.gallery_urls.filter((imageUrl) => {
    const imageName = getImageName(imageUrl);
    return !imageName.includes("shop1") && !imageName.includes("shop2");
  }).sort((current, next) => {
    const getOrder = (imageUrl) => {
      const imageName = getImageName(imageUrl);

      if (imageName.includes("cart")) {
        return 0;
      }

      if (imageName.includes("submit")) {
        return 1;
      }

      return 2;
    };

    return getOrder(current) - getOrder(next);
  });

  const groups = [];

  if (shopImages.length > 0) {
    groups.push({
      type: "flow",
      title: "商品詳情展開流程",
      images: shopImages,
      caption:
        "點擊商品後，透過 JavaScript 計算展開區塊位置，並使用 window.scrollTo 實現平滑捲動，使視窗自動聚焦於詳細資訊區域。"
    });
  }

  otherImages.forEach((imageUrl) => {
    const imageName = getImageName(imageUrl);

    groups.push({
      type: "single",
      title: imageName.includes("cart")
        ? "購物車與訂單確認"
        : imageName.includes("submit")
          ? "訂單完成互動回饋"
          : project.title,
      imageUrl,
      caption: getSingleMockupCaption(project, imageUrl)
    });
  });

  return groups;
}

function getProjectDetailContent(project) {
  if (!project.title.includes("有梗菜市場")) {
    return null;
  }

  return {
    heroSubtitle:
      "結合諧音「菜梗」的創意蔬果購物網站，透過幽默命名與互動設計提升使用者體驗。",
    introParagraphs: [
      "本專案為一個結合幽默與電商體驗的蔬果購物網站，以「菜梗」為核心概念，透過諧音命名（如「禁止蕉綠」、「橘外人」）重新設計商品呈現方式，讓使用者在瀏覽與購買過程中產生情緒連結與記憶點。",
      "在互動設計上，透過購物車狀態保存與訂單完成動畫，提升整體操作的流暢性與趣味性，使購物體驗不僅是功能操作，也是一種輕鬆有趣的互動過程。"
    ],
    highlights: [
      {
        title: "創意商品命名",
        description:
          "以諧音「菜梗」為核心，為每項蔬果設計具幽默感的名稱（如「禁止蕉綠」、「橘外人」），讓購物體驗更具記憶點與情緒連結。"
      },
      {
        title: "購物車體驗",
        description:
          "實作購物車狀態保存機制，使使用者在重新整理頁面後仍能保留商品內容，提升操作連續性。"
      },
      {
        title: "訂單完成動畫",
        description:
          "在結帳完成時加入商品掉落動畫，將購買結果轉化為視覺回饋，強化互動感與趣味性。"
      },
      {
        title: "首頁動態設計",
        description:
          "透過無限輪播提升首頁的視覺節奏與動態感。"
      }
    ]
  };
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) {
    return {
      title: "Project | LYP"
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
  const mockupGroups = getMockupGroups(project);
  const detailContent = getProjectDetailContent(project);
  const introParagraphs = detailContent?.introParagraphs || [
    project.overview,
    ...descriptionParagraphs
  ].filter(Boolean);

  return (
    <SiteShell>
      <section className="reveal grid gap-14 border-b border-stone-800/80 py-20 lg:grid-cols-[0.6fr_1.4fr] lg:py-28">
        <div className="space-y-8">
          <Link href="/work" className="text-sm uppercase tracking-[0.28em] text-stone-400 transition hover:-translate-x-1 hover:text-white">
            Back to project
          </Link>
          <p className="font-[family-name:var(--font-display)] text-7xl text-stone-700 sm:text-8xl">
            {project.display_id}
          </p>
        </div>

        <div className="space-y-8">
          <p className="text-xs uppercase tracking-[0.36em] text-stone-500">{project.category}</p>
          <h1 className={`max-w-4xl font-[family-name:var(--font-display)] text-5xl leading-tight sm:text-7xl ${
            detailContent ? "tracking-[0.08em]" : ""
          }`}>
            {project.title}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-stone-300 sm:text-xl">
            {detailContent?.heroSubtitle || project.subtitle || project.description}
          </p>
        </div>
      </section>

      <section className="reveal reveal-delay border-b border-stone-800/80 py-20 lg:py-28">
        <Mockup imageUrl={project.image_url} title={project.title} />
      </section>

      <section className="grid gap-12 border-b border-stone-800/80 py-20 lg:grid-cols-[0.7fr_1.3fr] lg:py-24">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.38em] text-stone-500">Project Info</p>
          <p className="font-[family-name:var(--font-display)] text-4xl">{project.category}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="border border-stone-800/80 bg-white/[0.035] p-6 shadow-xl shadow-black/15 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Title</p>
            <p className="mt-3 text-stone-100">{project.title}</p>
          </div>
          <div className="border border-stone-800/80 bg-white/[0.035] p-6 shadow-xl shadow-black/15 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Category</p>
            <p className="mt-3 text-stone-100">{project.category}</p>
          </div>
          <div className="border border-stone-800/80 bg-white/[0.035] p-6 shadow-xl shadow-black/15 backdrop-blur sm:col-span-2">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Technology</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech_stack.map((item) => (
                <span key={item} className="border border-stone-700/80 bg-stone-950/40 px-3 py-2 text-xs uppercase tracking-[0.18em] text-stone-300">
                  {item}
                </span>
              ))}
            </div>
          </div>
          {project.demo_url ? (
            <a
              href={project.demo_url}
              className="border border-stone-800/80 bg-white/[0.035] p-6 shadow-xl shadow-black/15 transition hover:-translate-y-0.5 hover:border-stone-500 sm:col-span-2"
              target="_blank"
              rel="noreferrer"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Demo</p>
              <p className="mt-3 break-all text-stone-100">{project.demo_url}</p>
            </a>
          ) : null}
        </div>
      </section>

      <section className="grid gap-12 border-b border-stone-800/80 py-20 lg:grid-cols-[0.7fr_1.3fr] lg:py-24">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.38em] text-stone-500">
            {detailContent ? "Project Intro" : "Description"}
          </p>
          {detailContent ? (
            <h2 className="font-[family-name:var(--font-display)] text-4xl leading-tight text-stone-100">
              專案介紹
            </h2>
          ) : null}
        </div>
        <div className="max-w-3xl space-y-7 text-lg leading-9 text-stone-300">
          {introParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      {detailContent ? (
        <section className="border-b border-stone-800/80 py-20 lg:py-24">
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.38em] text-stone-500">Design</p>
              <h2 className="font-[family-name:var(--font-display)] text-4xl leading-tight text-stone-100">
                Design Highlights
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-stone-400">
              將幽默命名、狀態保存與動畫回饋整合在購物流程中，讓電商介面保有清楚操作，也留下作品的個性。
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {detailContent.highlights.map((highlight, index) => (
              <article
                key={highlight.title}
                className="group border border-stone-800/80 bg-white/[0.035] p-7 shadow-xl shadow-black/15 backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-stone-600 hover:bg-white/[0.055] hover:shadow-black/35"
              >
                <p className="font-[family-name:var(--font-display)] text-4xl text-stone-700">
                  {formatViewNumber(index)}
                </p>
                <h3 className="mt-6 font-[family-name:var(--font-display)] text-3xl leading-tight text-stone-100">
                  {highlight.title}
                </h3>
                <p className="mt-5 text-sm leading-7 text-stone-400 transition group-hover:text-stone-300">
                  {highlight.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {project.gallery_urls.length > 0 ? (
        <section className="border-b border-stone-800/80 py-20 lg:py-28">
          <div className="mb-14 grid gap-6 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.38em] text-stone-500">Gallery</p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-4xl">Mockup views</h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-stone-400">
              以不同畫面狀態呈現產品的操作節奏與視覺細節，保留說明空間補充介面重點、使用情境與設計決策。
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {mockupGroups.map((group, index) => (
              <figure
                key={`${group.title}-${index}`}
                className={`group flex min-w-0 flex-col border border-stone-800/80 bg-white/[0.03] p-5 shadow-2xl shadow-black/20 backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-stone-600 hover:bg-white/[0.05] hover:shadow-black/40 sm:p-6 ${
                  group.type === "flow" ? "lg:col-span-2" : ""
                }`}
              >
                {group.type === "flow" ? (
                  <MockupFlow images={group.images} isPhoneProject={isPhoneProject} title={project.title} />
                ) : (
                  <div className="flex min-h-[20rem] min-w-0 items-center justify-center overflow-hidden border border-stone-800/60 bg-stone-950/30 px-5 py-10 shadow-inner shadow-black/30">
                    <Mockup imageUrl={group.imageUrl} title={`${project.title} ${index + 1}`} />
                  </div>
                )}

                <figcaption className="mt-6 flex flex-1 flex-col justify-between gap-8 border-t border-stone-800/80 pt-6">
                  <div className="space-y-5">
                    <p className="text-xs uppercase tracking-[0.32em] text-stone-500">
                      View {formatViewNumber(index)}
                    </p>
                    <h3 className="font-[family-name:var(--font-display)] text-3xl leading-tight text-stone-100 sm:text-4xl">
                      {group.title}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="h-px w-full bg-stone-800/80" />
                    <p className="min-h-[5.25rem] text-sm leading-7 text-stone-400">
                      {group.caption}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section className="flex flex-wrap items-center justify-between gap-6 py-20 lg:py-24">
        <Link href="/work" className="text-sm uppercase tracking-[0.28em] text-stone-400 transition hover:-translate-x-1 hover:text-white">
          Back to project
        </Link>
        <Link href="/contact" className="border border-stone-200 px-7 py-4 text-sm uppercase tracking-[0.24em] transition hover:-translate-y-0.5 hover:bg-stone-100 hover:text-stone-950">
          Contact
        </Link>
      </section>
    </SiteShell>
  );
}
