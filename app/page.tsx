import { HeroSection } from "@/components/hero-section"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection cardPosition="right" />

      {/* Additional sections for scroll demonstration */}
      <section id="features" className="scroll-section min-h-screen flex items-center justify-center bg-secondary/30">
        <div className="container px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center">Features Section</h2>
          <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto">
            This is a placeholder section to demonstrate the navigation scroll effect.
          </p>
        </div>
      </section>

      <section id="about" className="scroll-section min-h-screen flex items-center justify-center">
        <div className="container px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center">About Section</h2>
          <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto">
            Another section to showcase the active navigation states.
          </p>
        </div>
      </section>

      <section id="contact" className="scroll-section min-h-screen flex items-center justify-center bg-secondary/30">
        <div className="container px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center">Contact Section</h2>
          <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto">
            Get in touch with us for more information.
          </p>
        </div>
      </section>
    </main>
  )
}
