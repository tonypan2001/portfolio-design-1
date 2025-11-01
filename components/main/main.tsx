"use client";
import { Navigation } from "../layouts/navigation";
import { WhatWeDoSection } from "../sections/what-we-do-section";
import { ContactSection } from "../sections/contact-section";
import { HeroSection } from "../sections/hero-section";
import { SkillsSection } from "../sections/skills-section";
import { WorksSection } from "../sections/works-section";
import { FeedbackSection } from "../sections/feedback-section";
import { Footer } from "../layouts/footer";
import { getContent, Lang } from "@/constants/i18n";

export default function MainPage({ lang = "en" as Lang }: { lang?: Lang }) {
  const content = getContent(lang);
  return (
    <main className="min-h-screen">
      <Navigation nav={content.navigation} />
      <HeroSection cardPosition="left" hero={content.hero} heroCard={content.heroCard} />
      <WhatWeDoSection whatWeDo={content.section.whatWeDoSection} />
      <WorksSection works={content.section.worksSection} />
      <SkillsSection skills={content.section.skillsSection} />
      <FeedbackSection feedback={content.section.feedbackSection} />
      <ContactSection contact={content.section.contactSection} />
      <Footer footer={content.section.footerSection} />
    </main>
  );
}
