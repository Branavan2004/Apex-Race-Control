import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import ContactForm from "@/components/shared/ContactForm";
import CVDownloadBlock from "@/components/shared/CVDownloadBlock";
import { PROFILE } from "@/data/profile";
import { REFERENCES } from "@/data/siteData";

const channels = [
  { channel: "CH 01", icon: Phone, title: "PHONE", lines: [PROFILE.phone], href: "tel:+94724200700" },
  { channel: "CH 02", icon: Mail, title: "EMAIL", lines: [PROFILE.email], href: `mailto:${PROFILE.email}` },
  { channel: "CH 03", icon: Linkedin, title: "LINKEDIN", lines: ["branavan-kuganesan"], href: PROFILE.linkedin },
  { channel: "CH 04", icon: Github, title: "GITHUB", lines: ["Branavan2004"], href: PROFILE.github },
] as const;

const ContactRadio = () => (
  <section id="contact-radio" className="mx-auto max-w-7xl px-6 py-24 md:px-12">
    <div className="mb-12 max-w-3xl">
      <p className="font-data text-[11px] uppercase tracking-[0.32em] text-[var(--f1-red)]">Sector 8</p>
      <h2 className="mt-3 font-display text-4xl font-black tracking-[-0.03em] text-[var(--f1-white)] md:text-6xl">
        ESTABLISH CONTACT
      </h2>
      <p className="mt-4 text-[15px] leading-8 text-[var(--f1-white)]">
        Radio links, a direct transmission form, and downloadable race documentation packaged for internship outreach.
      </p>
    </div>

    <div className="grid gap-6 xl:grid-cols-[0.95fr,1.05fr]">
      <div className="glass rounded-[32px] p-6 md:p-8">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[var(--f1-red)] shadow-[0_0_12px_rgba(232,0,45,0.8)]" />
          <span className="font-data text-[10px] uppercase tracking-[0.28em] text-[var(--f1-muted)]">Open Channel</span>
        </div>

        <div className="mt-6">
          <svg viewBox="0 0 640 120" className="h-28 w-full" role="img" aria-label="Animated radio waveform">
            <motion.path
              d="M0 60 C40 10, 80 110, 120 60 S200 10, 240 60 S320 110, 360 60 S440 10, 480 60 S560 110, 640 60"
              fill="none"
              stroke="var(--f1-red)"
              strokeWidth="4"
              strokeLinecap="round"
              animate={{ pathLength: [0.2, 1, 0.2], opacity: [0.35, 1, 0.35] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </div>

        <p className="mt-2 font-display text-3xl font-black tracking-[-0.04em] text-[var(--f1-white)] md:text-5xl">
          ESTABLISH CONTACT
        </p>
        <p className="mt-4 font-data text-[11px] uppercase tracking-[0.32em] text-[var(--f1-red)]">
          OPEN CHANNEL — TEAM BRANAVAN RACING
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {channels.map((item) => (
            <a
              key={item.channel}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className="rounded-[22px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--f1-red)]/45"
            >
              <div className="flex items-center justify-between">
                <span className="font-data text-[10px] uppercase tracking-[0.24em] text-[var(--f1-muted)]">{item.channel}</span>
                <item.icon className="h-4 w-4 text-[var(--f1-red)]" />
              </div>
              <p className="mt-4 font-data text-[10px] uppercase tracking-[0.22em] text-[var(--f1-muted)]">{item.title}</p>
              {item.lines.map((line) => (
                <p key={line} className="mt-2 break-all font-display text-xl font-bold text-[var(--f1-white)]">
                  {line}
                </p>
              ))}
            </a>
          ))}
        </div>

        <div className="mt-8 rounded-[20px] border border-white/10 bg-[rgba(0,0,0,0.24)] px-4 py-3 font-data text-[10px] uppercase tracking-[0.18em] text-[var(--f1-white)]">
          📍 COLOMBO, SRI LANKA  ·  {PROFILE.timezone}  ·  AVAILABLE IMMEDIATELY
        </div>
      </div>

      <div className="space-y-6">
        <ContactForm />
        <CVDownloadBlock />
      </div>
    </div>

    <div className="mt-8 glass rounded-[28px] p-6 md:p-7">
      <p className="font-data text-[11px] uppercase tracking-[0.28em] text-[var(--f1-muted)]">Technical Stewards</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {REFERENCES.map((reference, index) => (
          <div key={reference.name} className="rounded-[22px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-5">
            <p className="font-data text-[10px] uppercase tracking-[0.24em] text-[var(--f1-red)]">Steward 0{index + 1}</p>
            <h3 className="mt-3 font-display text-xl font-black text-[var(--f1-white)]">{reference.name.toUpperCase()}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--f1-white)]">{reference.role} · {reference.org}</p>
            <p className="mt-4 font-data text-[10px] text-[var(--f1-muted)]">📧 {reference.email}</p>
            <p className="mt-2 font-data text-[10px] text-[var(--f1-muted)]">📞 {reference.phone}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-sm text-[var(--f1-muted)]">References available on request.</p>
    </div>
  </section>
);

export default ContactRadio;
