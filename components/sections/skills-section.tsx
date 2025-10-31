import { section } from "@/constants/contents";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function SkillsSection() {
  const techs = section.skillsSection.techs ?? [];
  const TechIcon = ({
    iconUrl,
    icon,
    alt,
  }: {
    iconUrl?: string;
    icon?: string;
    alt: string;
  }) => {
    const src = iconUrl || icon;
    if (!src) return null;
    return (
      <img
        src={src}
        alt={alt}
        width={24}
        height={24}
        className="w-6 h-6 object-contain select-none"
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
      />
    );
  };
  return (
    <section
      id="skills"
      data-fv
      className="scroll-section relative min-h-screen flex items-center justify-center"
    >
      {/* Decorative bottom wave */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {/* Background image at low opacity */}
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2344"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20 select-none"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        {/* Top fade to blend into previous section */}
        <div className="absolute inset-x-0 top-0 h-32 md:h-40 bg-linear-to-b from-background to-transparent" />
        <img
          src="/wave-bottom.svg"
          alt=""
          className="absolute inset-x-0 bottom-0 w-full h-40 md:h-56 object-cover select-none"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="container relative z-10 px-4">
        <h2 className="fv-item text-4xl md:text-5xl font-bold text-center">
          {section.skillsSection.title}
        </h2>
        {/* Grid of tech cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {techs.map((t) => (
            <Card
              key={t.name}
              className="fv-item backdrop-blur-sm bg-card/80 border-border/60 transition-transform duration-200 ease-out will-change-transform hover:-translate-y-1 md:hover:-translate-y-2 hover:shadow-lg"
            >
              <CardHeader className="gap-2">
                <CardTitle className="text-xl md:text-2xl flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <TechIcon
                      iconUrl={(t as any).iconUrl}
                      icon={(t as any).icon}
                      alt={`${t.name} logo`}
                    />
                    {t.name}
                  </span>
                  <span
                    className={cn(
                      "text-xs md:text-sm px-2 py-1 rounded-full ring-1 ring-border",
                      t.level === "Advanced" && "bg-primary/10 text-primary",
                      t.level === "Intermediate" &&
                        "bg-secondary/10 text-secondary",
                    )}
                  >
                    {t.level}
                  </span>
                </CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  {t.category} • {t.years}+ yrs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm md:text-base text-muted-foreground">
                  {t.summary}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
