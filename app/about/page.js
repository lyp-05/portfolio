import PageIntro from "../components/PageIntro";
import SiteShell from "../components/SiteShell";
import { services } from "../lib/content";

export const metadata = {
  title: "About | Lumen Portfolio"
};

export default function AboutPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="About"
        title="清晰、簡潔，讓內容本身成為視覺主角。"
        body="擅長將品牌概念轉化為可被記住的介面，透過留白、文字層級與節奏建立安靜但有辨識度的數位體驗。"
      />

      <section className="grid gap-12 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
        <div className="space-y-4 text-sm leading-7 text-stone-300">
          <p>
            服務內容包含品牌形象網站、個人作品集、互動展示頁與基礎前端開發。偏好乾淨版面、
            精準字距與不過度裝飾的動態表現。
          </p>
          <p>Base in Taipei, available for selected freelance collaborations and ongoing creative partnerships.</p>
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
