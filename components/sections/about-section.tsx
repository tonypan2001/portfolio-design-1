import { section } from "@/constants/contents";

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-section relative min-h-screen flex items-center justify-center bg-background"
    >
      {/* Background/decoration layer ABOVE section background, BELOW content */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1172"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-5 select-none"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        {/* Decorative wave at the top (full-width image) */}
        <img
          src="/wave.svg"
          alt=""
          className="absolute inset-x-0 top-0 w-full h-40 md:h-48 object-cover select-none"
          loading="lazy"
          decoding="async"
        />
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-[0.06] bg-[url('/noise.svg')]" />
        {/* Fade out to site background at the bottom to blend into Skills */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />
      </div>
      <div className="container relative z-10 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground">
          {section.aboutSection.title}
        </h2>
        <p className="text-center mt-4 max-w-2xl mx-auto text-muted-foreground">
          {section.aboutSection.content}
        </p>
        <ul className="mt-6 flex flex-wrap justify-center gap-2">
          {section.aboutSection.tools.map((t) => (
            <li
              key={t}
              className="px-3 py-1 rounded-full bg-primary/5 text-foreground/80 text-sm ring-1 ring-primary/10"
            >
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-8 grid grid-cols-3 gap-6 max-w-xl mx-auto text-center">
          {section.aboutSection.stats.map((x) => (
            <div key={x.label}>
              <div className="text-3xl font-semibold tabular-nums text-foreground">
                {x.value}
              </div>
              <div className="text-muted-foreground text-sm">{x.label}</div>
            </div>
          ))}
        </div>
        <blockquote className="mt-8 text-center text-muted-foreground italic">
          {section.aboutSection.quote}
        </blockquote>
      </div>
    </section>
  );
}
