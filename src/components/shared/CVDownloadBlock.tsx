import { Download } from "lucide-react";
import { PROFILE } from "@/data/profile";

const CVDownloadBlock = () => (
  <div className="glass rounded-[28px] p-6 md:p-7">
    <p className="font-data text-[11px] uppercase tracking-[0.28em] text-[var(--f1-muted)]">░ Race Documentation</p>
    <div className="mt-3 h-px bg-gradient-to-r from-white/60 via-white/10 to-transparent" />
    <p className="mt-4 max-w-md text-[15px] leading-7 text-[var(--f1-white)]">
      Download the full driver dossier including race history, technical specs, and championship credentials.
    </p>

    <a
      href={PROFILE.cvFile}
      download
      className="mt-6 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-[18px] border border-white/70 px-4 py-3 font-data text-[11px] uppercase tracking-[0.18em] text-[var(--f1-white)] transition-all duration-300 hover:border-[var(--f1-red)] hover:text-[var(--f1-red)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
    >
      <Download className="h-4 w-4" />
      Download Full CV — PDF
    </a>

    <p className="mt-4 font-data text-[10px] text-[var(--f1-muted)]">
      Branavan_Kuganesan_CV.pdf  ·  Updated 2026
    </p>
    <p className="mt-2 font-data text-[10px] text-[var(--f1-muted)]">
      {PROFILE.email}  ·  {PROFILE.phone}
    </p>
  </div>
);

export default CVDownloadBlock;
