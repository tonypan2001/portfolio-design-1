export const navigation = {
  logo: "PanStudio",
  menuItems: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "What we do", href: "#what-we-do" },
    { label: "Skills", href: "#skills" },
    { label: "Feedback", href: "#feedback" },
    { label: "Contact", href: "#contact" },
  ],
};

export const hero = {
  heroText: "Welcome to",
  heroTextWithGradient: "PanStudio",
  heroTextDetail:
    "Experience the next generation of web interfaces with stunning elements and modern design",
};

export const heroCard = {
  heroCardText: "Discover More",
  heroCardTextDetail:
    "Explore our innovative features and cutting-edge technology",
  heroCardBulletPoint: [
    { key: "01", text: "Interactive 3D experiences" },
    { key: "02", text: "Responsive across all devices" },
    { key: "03", text: "Modern glassmorphic design" },
  ],
};

export const section = {
  aboutSection: {
    title: "About",
    content:
      "I'm a frontend developer passionate about building clean, interactive, and performance-driven websites. I focus on creating intuitive UIs using modern technologies like Next.js, Tailwind CSS. Currently, I'm expanding my skills in 3D design and other frontend stacks.",
    stats: [
      { value: "4+", label: "Year coding" },
      { value: "5", label: "Core tools" },
      { value: "100", label: "Completed Projects" },
    ],
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Blender"],
    quote:
      "I craft clean, interactive UIs with a focus on performance and feel.",
  },
  whatWeDoSection: {
    title: "What we do",
    items: [
      {
        title: "Create Website",
        detail:
          "Design and build modern, fast websites tailored to your brand using Next.js, TypeScript, and performance best practices.",
        imageUrl:
          "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1172",
      },
      {
        title: "Responsive",
        detail:
          "Pixel‑perfect layouts that adapt to any device and screen size, delivering a consistent experience on mobile, tablet, and desktop.",
        imageUrl:
          "https://images.unsplash.com/photo-1625490939776-17cef70ec079?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
      },
      {
        title: "Deploy & Hosting",
        detail:
          "Production‑ready deployments with CI/CD and optimized hosting on Vercel, Netlify, or your preferred cloud provider.",
        imageUrl:
          "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop",
      },
    ],
  },
  skillsSection: {
    title: "Skills & Tools",
    content: [
      {
        label: "Frontend",
        items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "SCSS"],
      },
      {
        label: "Design",
        items: ["Figma", "Blender", "Canva"],
      },
    ],
    // Detailed tech cards (used by the UI)
    techs: [
      {
        name: "Next.js",
        category: "Frontend",
        level: "Advanced",
        years: 3,
        icon: "/icons/nextjs.svg",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg",
        summary:
          "App Router, server components, route handlers, metadata, and image optimization with strong TypeScript and performance focus.",
      },
      {
        name: "React",
        category: "Frontend",
        level: "Advanced",
        years: 4,
        icon: "/icons/react.svg",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        summary:
          "Hooks, context, suspense, and state management patterns with accessibility and UX best practices.",
      },
      {
        name: "TypeScript",
        category: "Frontend",
        level: "Advanced",
        years: 4,
        icon: "/icons/typescript.svg",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        summary:
          "Strong typing for React/Next projects, generics, utility types, and incremental typing for safety and DX.",
      },
      {
        name: "Tailwind CSS",
        category: "Frontend",
        level: "Advanced",
        years: 3,
        icon: "/icons/tailwindcss.svg",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        summary:
          "Utility-first styling, design systems, responsive layouts, and animations with clean, consistent UI patterns.",
      },
      {
        name: "SCSS",
        category: "Frontend",
        level: "Intermediate",
        years: 3,
        icon: "/icons/scss.svg",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
        summary:
          "Modular styles, variables/mixins, and layered architectures for maintainable styling when needed.",
      },
      {
        name: "Figma",
        category: "Design",
        level: "Advanced",
        years: 4,
        icon: "/icons/figma.svg",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        summary:
          "Wireframes to hi‑fi mocks, component libraries, and collaborative handoff workflows.",
      },
      {
        name: "Blender",
        category: "Design",
        level: "Intermediate",
        years: 2,
        icon: "/icons/blender.svg",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg",
        summary:
          "Basic modeling, lighting, and materials for simple 3D assets integrated into web experiences.",
      },
      {
        name: "Canva",
        category: "Design",
        level: "Intermediate",
        years: 4,
        icon: "/icons/canva.svg",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg",
        summary:
          "Quick branding assets, social graphics, and light compositing to support product visuals.",
      },
    ],
  },
  feedbackSection: {
    title: "Feedback from customers",
    testimonials: [
      {
        name: "Ava Thompson",
        role: "Product Manager",
        company: "Northstar Labs",
        rating: 5,
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop",
        quote:
          "They delivered a clean, responsive site ahead of schedule. The attention to detail and performance was outstanding.",
      },
      {
        name: "Daniel Chen",
        role: "Founder",
        company: "Atlas Studio",
        rating: 5,
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop",
        quote:
          "Seamless collaboration and great UX sense. Our conversions went up within the first week of launch.",
      },
      {
        name: "Maria Lopez",
        role: "Marketing Lead",
        company: "Crescent Co.",
        rating: 4,
        avatar:
          "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=256&auto=format&fit=crop",
        quote:
          "Fast delivery, clear communication, and pixel-perfect responsive design. Highly recommended!",
      },
    ],
  },
  contactSection: {
    title: "Let's Connect",
    content:
      "Have an idea, a project, or just want to say hi? Feel free to reach out — I'm always open to collaborations and new opportunities.",
    email: "prompan.ue@gmail.com",
    platform: [
      {
        label: "GitHub",
        href: "http://localhost:3000/",
      },
      {
        label: "X (Twitter)",
        href: "http://localhost:3000/",
      },
      {
        label: "LinkedIn",
        href: "http://localhost:3000/",
      },
    ],
  },
  footerSection: {
    title: "PanStudio",
    content: "© 2025 PanStudio — Designed & Built by Prompan Uechanwech",
  },
};
