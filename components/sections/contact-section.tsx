import { section } from "@/constants/contents";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-section min-h-screen flex items-center justify-center bg-primary"
    >
      <div className="container px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white">
          {section.contactSection.title}
        </h2>
        <p className="text-center text-white mt-4 max-w-2xl mx-auto">
          {section.contactSection.content}
        </p>
      </div>
    </section>
  );
}
