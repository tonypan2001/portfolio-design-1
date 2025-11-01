import { section as sectionEN } from "@/constants/contents";
import { cn } from "@/lib/utils";

type WorksData = typeof sectionEN.worksSection;

export function WorksSection({ works }: { works?: WorksData }) {
  const data = works ?? sectionEN.worksSection;
  const items = data?.items ?? [];

  return (
    <section
      id="works"
      data-fv
      className="scroll-section relative py-20 md:py-28 bg-background"
    >
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="fv-item text-4xl md:text-5xl font-bold text-center text-foreground">
          {data.title}
        </h2>
        <p className="fv-item text-center mt-3 md:mt-4 max-w-2xl mx-auto text-muted-foreground">
          Selected projects with crisp visuals and smooth interactions.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {items.map((w) => (
            <a
              key={w.title}
              href={w.href}
              target={w.href?.startsWith("http") ? "_blank" : undefined}
              rel={w.href?.startsWith("http") ? "noopener noreferrer" : undefined}
              className={cn(
                "fv-item group relative overflow-hidden rounded-xl border border-border/60",
                "bg-muted/20 ring-1 ring-black/0 transition-all duration-500 ease-out",
                "hover:shadow-xl hover:scale-[1.01] will-change-transform"
              )}
            >
              {/* Background image */}
              <div aria-hidden className="absolute inset-0 -z-10">
                <div
                  className={cn(
                    "absolute inset-0 bg-center bg-cover",
                    "scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  )}
                  style={{ backgroundImage: `url(${w.imageUrl})` }}
                />
                {/* Readability overlay */}
                <div
                  className={cn(
                    "absolute inset-0",
                    "bg-[linear-gradient(to_bottom,rgba(0,0,0,0.15),rgba(0,0,0,0.45))]",
                    "group-hover:bg-[linear-gradient(to_bottom,rgba(0,0,0,0.25),rgba(0,0,0,0.6))]",
                    "transition-colors duration-500"
                  )}
                />
              </div>

              {/* Content */}
              <div className="relative p-5 md:p-6 text-white min-h-[220px] flex flex-col justify-end">
                <h3 className="text-xl md:text-2xl font-semibold drop-shadow-sm">
                  {w.title}
                </h3>

                {/* Details: hidden until hover, smooth reveal */}
                <div
                  className={cn(
                    "text-white/90 text-sm md:text-base mt-1",
                    "max-h-0 opacity-0 translate-y-2",
                    "group-hover:max-h-32 group-hover:opacity-100 group-hover:translate-y-0",
                    "transition-all duration-300 ease-out overflow-hidden"
                  )}
                >
                  {w.detail}
                </div>

                {/* Visit link: always visible */}
                <div className="mt-3 flex items-center gap-2 text-sm font-medium">
                  <span className="inline-flex items-center gap-1 text-white">
                    Visit work
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorksSection;
