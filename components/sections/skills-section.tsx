import { section } from "@/constants/contents";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function SkillsSection() {
  const techs = section.skillsSection.techs ?? [];
  const TechIcon = ({ iconUrl, icon, alt }: { iconUrl?: string; icon?: string; alt: string }) => {
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
      className="scroll-section min-h-screen flex items-center justify-center"
    >
      <div className="container px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center">
          {section.skillsSection.title}
        </h2>
        {/* Grid of tech cards */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {techs.map((t) => (
            <Card key={t.name} className="backdrop-blur-sm bg-card/80 border-border/60">
              <CardHeader className="gap-2">
                <CardTitle className="text-xl md:text-2xl flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <TechIcon iconUrl={(t as any).iconUrl} icon={(t as any).icon} alt={`${t.name} logo`} />
                    {t.name}
                  </span>
                  <span
                    className={cn(
                      "text-xs md:text-sm px-2 py-1 rounded-full ring-1 ring-border",
                      t.level === "Advanced" && "bg-primary/10 text-primary",
                      t.level === "Intermediate" && "bg-secondary/10 text-secondary",
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
