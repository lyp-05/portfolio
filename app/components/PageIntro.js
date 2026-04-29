export default function PageIntro({ eyebrow, title, body }) {
  return (
    <section className="reveal grid gap-12 border-b border-stone-800/80 py-20 lg:grid-cols-[0.6fr_1.4fr] lg:py-28">
      <p className="text-xs uppercase tracking-[0.42em] text-stone-500">{eyebrow}</p>
      <div className="space-y-8">
        <h1 className="max-w-4xl font-[family-name:var(--font-display)] text-4xl leading-tight sm:text-6xl">
          {title}
        </h1>
        {body ? <p className="max-w-3xl text-base leading-8 text-stone-300 sm:text-xl">{body}</p> : null}
      </div>
    </section>
  );
}
