import { section } from "@/constants/contents";

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="scroll-section min-h-screen flex items-center justify-center"
    >
      <div className="container px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center">
          {section.skillsSection.title}
        </h2>
        <p className="text-center mt-4 max-w-2xl mx-auto">
          This is a placeholder section to demonstrate the navigation scroll
          effect.
        </p>
      </div>
    </section>
  );
}
