import PageIntro from "../components/PageIntro";
import SiteShell from "../components/SiteShell";
import { education, services } from "../lib/content";

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

      <section className="grid gap-12 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
        <div className="space-y-4 text-sm leading-7 text-stone-300">
          <p>
            我的作品涵蓋蔬果銷售平台、二手交易平台與智慧照護服務，從趣味命名、信任機制到
            AI 照護情境，嘗試用不同角度回應真實生活中的需求。
          </p>
          <p>
            在設計與實作過程中，我重視資訊架構、操作流程與視覺一致性，希望使用者能直覺理解內容，
            也能感受到作品背後的概念。熟悉 HTML、CSS、JavaScript、jQuery、PHP、MySQL，並能使用
            Figma 進行介面規劃與原型設計。
          </p>
          <div className="border-t border-stone-800 pt-5">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Education</p>
            <p className="mt-3 text-stone-200">{education.school}</p>
            <p>{education.department}</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <div key={service} className="border border-stone-800 bg-white/[0.03] p-6">
              <p className="font-[family-name:var(--font-display)] text-2xl">{service}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
