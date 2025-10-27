import { section } from "@/constants/contents";

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-section min-h-screen flex items-center justify-center bg-primary"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_50%,var(--secondary-background-color),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[url('/noise.png')]" />
      </div>
      <div className="container px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white">
          {section.aboutSection.title}
        </h2>
        <p className="text-center text-white mt-4 max-w-2xl mx-auto">
          {section.aboutSection.content}
        </p>
        <ul className="mt-6 flex flex-wrap justify-center gap-2">
          {section.aboutSection.tools.map((t) => (
            <li
              key={t}
              className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-sm ring-1 ring-white/15"
            >
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-8 grid grid-cols-3 gap-6 max-w-xl mx-auto text-center">
          {section.aboutSection.stats.map((x) => (
            <div key={x.label}>
              <div className="text-3xl font-semibold tabular-nums text-white">
                {x.value}
              </div>
              <div className="text-white/70 text-sm">{x.label}</div>
            </div>
          ))}
        </div>
        <blockquote className="mt-8 text-center text-white/80 italic">
          {section.aboutSection.quote}
        </blockquote>
      </div>
    </section>
  );
}
