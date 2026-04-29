export default function LaptopMockup({ imageUrl, title }) {
  return (
    <div className="relative mx-auto w-full max-w-2xl rotate-[-2deg] transition duration-500 group-hover:-translate-y-2 group-hover:rotate-[-0.8deg]">
      <div className="absolute -inset-8 -z-10 rounded-[2rem] bg-white/[0.04] blur-3xl transition duration-500 group-hover:bg-white/[0.07]" />
      <div className="rounded-t-2xl border border-stone-600/80 bg-stone-900/95 p-3 shadow-[0_34px_90px_rgba(0,0,0,0.65)]">
        <div className="overflow-hidden rounded-lg border border-stone-700/80 bg-stone-950 aspect-[16/10]">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${title} screenshot`}
              className="h-full w-full object-cover brightness-95 contrast-105 transition duration-500 group-hover:scale-[1.025] group-hover:brightness-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,_rgba(245,245,244,0.12),_rgba(68,64,60,0.35))] px-8 text-center">
              <p className="font-[family-name:var(--font-display)] text-3xl text-stone-300">{title}</p>
            </div>
          )}
        </div>
      </div>
      <div className="mx-auto h-4 w-[108%] -translate-x-[4%] rounded-b-[1.5rem] border border-stone-700/80 bg-stone-800 shadow-xl shadow-black/50">
        <div className="mx-auto h-1.5 w-24 rounded-b-lg bg-stone-700" />
      </div>
    </div>
  );
}
