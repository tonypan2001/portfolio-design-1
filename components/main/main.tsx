"use client";
import { Navigation } from "../layouts/navigation";
import { WhatWeDoSection } from "../sections/what-we-do-section";
import { ContactSection } from "../sections/contact-section";
import { HeroSection } from "../sections/hero-section";
import { SkillsSection } from "../sections/skills-section";
import { FeedbackSection } from "../sections/feedback-section";
import { Footer } from "../layouts/footer";

export default function MainPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection cardPosition="left" />
      <WhatWeDoSection />
      <SkillsSection />
      <FeedbackSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
