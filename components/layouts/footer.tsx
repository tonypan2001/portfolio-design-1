import Link from "next/link";
import { section as sectionEN } from "@/constants/contents";

export function Footer({ footer }: { footer?: typeof sectionEN.footerSection }) {
  const { title, content } = footer ?? sectionEN.footerSection;
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        <Link href="#home" className="font-semibold text-lg text-foreground">
          {title}
        </Link>
        <p className="text-sm text-muted-foreground">{content}</p>
      </div>
    </footer>
  );
}
