export default function PageIntro({ eyebrow, title, body }) {
  return (
    <section className="grid gap-10 border-b border-stone-800 py-16 lg:grid-cols-[0.65fr_1.35fr] lg:py-20">
      <p className="text-sm uppercase tracking-[0.32em] text-stone-400">{eyebrow}</p>
      <div className="space-y-6">
        <h1 className="max-w-4xl font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-6xl">
          {title}
        </h1>
        {body ? <p className="max-w-2xl text-base leading-7 text-stone-300 sm:text-lg">{body}</p> : null}
      </div>
    </section>
  );
}
