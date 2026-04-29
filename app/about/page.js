import PageIntro from "../components/PageIntro";
import SiteShell from "../components/SiteShell";
import { education, highlights, services } from "../lib/content";

export const metadata = {
  title: "About | LYP"
};

export default function AboutPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="About"
        title="我是廖盈芃，專注於網頁設計、前端實作與互動體驗。"
        body="目前就讀元智大學資訊傳播學系科技組，擅長從生活情境與使用者需求出發，將產品概念整理成清楚、易用且具有敘事感的數位介面。"
      />

      <section className="grid gap-14 py-20 lg:grid-cols-[0.75fr_1.25fr] lg:py-28">
        <div className="space-y-6 text-base leading-8 text-stone-300">
          <p>
            我的作品涵蓋蔬果銷售平台、二手交易平台與智慧照護服務，從趣味命名、信任機制到
            AI 照護情境，嘗試用不同角度回應真實生活中的需求。
          </p>
          <p>
            在設計與實作過程中，我重視資訊架構、操作流程與視覺一致性，希望使用者能直覺理解內容，
            也能感受到作品背後的概念。熟悉 HTML、CSS、JavaScript、jQuery、PHP、MySQL，並能使用
            Figma 進行介面規劃與原型設計。
          </p>
          <div className="border-t border-stone-800/80 pt-6">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Education</p>
            <p className="mt-3 text-stone-200">{education.school}</p>
            <p>{education.department}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <div key={service} className="border border-stone-800/80 bg-white/[0.035] p-7 shadow-xl shadow-black/15 transition hover:-translate-y-1 hover:border-stone-600 hover:bg-white/[0.055]">
              <p className="font-[family-name:var(--font-display)] text-3xl leading-tight">{service}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-stone-800/80 py-20 lg:py-28">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
          <p className="text-xs uppercase tracking-[0.42em] text-stone-500">Experience</p>
          <div className="space-y-5">
            <h2 className="font-[family-name:var(--font-display)] text-4xl leading-tight text-stone-100 sm:text-5xl">
              Highlights shaped by collaboration, design, and exploration.
            </h2>
            <p className="max-w-3xl text-base leading-8 text-stone-400">
              從團隊領導、競賽實作到海外交流，這些經驗延伸了我對溝通、使用者情境與跨文化視角的理解。
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="group flex min-h-[17rem] flex-col justify-between border border-stone-800/80 bg-white/[0.035] p-7 shadow-xl shadow-black/15 backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-stone-600 hover:bg-white/[0.055] hover:shadow-black/35 sm:p-8"
            >
              <div className="space-y-6">
                <div className="flex flex-col gap-4 border-b border-stone-800/80 pb-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-3">
                    <p className="text-[0.68rem] uppercase tracking-[0.3em] text-stone-500">
                      {item.meta}
                    </p>
                    <h3 className="font-[family-name:var(--font-display)] text-3xl leading-tight text-stone-100">
                      {item.title}
                    </h3>
                  </div>
                  <p className="shrink-0 text-left text-xs uppercase tracking-[0.22em] text-stone-500 sm:text-right">
                    {item.date}
                  </p>
                </div>
                <p className="text-sm leading-7 text-stone-400 transition group-hover:text-stone-300">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
