import Link from "next/link";
import { section } from "@/constants/contents";

export function Footer() {
  const { title, content } = section.footerSection;
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

