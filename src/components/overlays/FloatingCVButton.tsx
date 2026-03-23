import { Download } from "lucide-react";
import { PROFILE } from "@/data/profile";

const FloatingCVButton = () => (
  <a
    href={PROFILE.cvFile}
    download
    aria-label="Download CV PDF"
    className="group animate-cv-pulse fixed bottom-10 right-4 z-[200] inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[rgba(255,255,255,0.14)] bg-[var(--f1-red)] px-4 py-3 font-data text-[11px] uppercase tracking-[0.08em] text-white shadow-[0_18px_40px_rgba(232,0,45,0.32)] transition-all duration-300 hover:scale-[1.02] hover:pr-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:bottom-12 md:right-6 relative"
  >
    <Download className="h-4 w-4" />
    <span className="whitespace-nowrap transition-opacity duration-200 group-hover:opacity-0">⬇ Download CV</span>
    <span className="absolute left-10 max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-[220px] group-hover:opacity-100">
      Download Full CV — PDF
    </span>
  </a>
);

export default FloatingCVButton;
