import { motion } from "framer-motion";
import SectorHeader from "./SectorHeader";

const stats = [
  { label: "Consistency", value: 92 },
  { label: "Adaptability", value: 88 },
  { label: "Innovation", value: 95 },
  { label: "Teamwork", value: 90 },
  { label: "Problem Solving", value: 94 },
];

const DriverProfile = () => (
  <section className="relative py-24 px-4 md:px-8 max-w-5xl mx-auto">
    <SectorHeader sector="Sector 1" title="DRIVER PROFILE" subtitle="Official F1 Driver Statistics" />

    <div className="grid md:grid-cols-2 gap-8">
      {/* Driver card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="border border-border bg-card/60 backdrop-blur-md p-6 relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-primary to-transparent" />

        {/* Glowing corner accents */}
        <div className="absolute top-0 left-0 w-8 h-px bg-f1-cyan" />
        <div className="absolute top-0 left-0 w-px h-8 bg-f1-cyan" />
        <div className="absolute bottom-0 right-0 w-8 h-px bg-f1-cyan/30" />
        <div className="absolute bottom-0 right-0 w-px h-8 bg-f1-cyan/30" />

        <div className="flex items-start gap-4 mb-6">
          {/* Helmet-style frame */}
          <div className="w-20 h-20 rounded-lg bg-muted border border-border flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
            <span className="font-display text-3xl font-black text-primary relative">01</span>
          </div>
          <div className="flex-1">
            <h3 className="font-display text-2xl font-bold text-foreground">BRANAVAN</h3>
            <p className="font-body text-muted-foreground">IIT Tech Racing</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-6 h-4 bg-gradient-to-r from-f1-yellow via-primary to-f1-yellow rounded-sm" />
              <span className="font-body text-xs text-muted-foreground">🇱🇰 Sri Lanka</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 font-body">
          {[
            { label: "Nationality", value: "🇱🇰 Sri Lanka" },
            { label: "Team", value: "IIT" },
            { label: "Specialty", value: "Software Engineering" },
            { label: "Championship", value: "Active", highlight: true },
          ].map((item) => (
            <div key={item.label} className="flex justify-between items-center border-b border-border/50 pb-2">
              <span className="text-muted-foreground text-sm">{item.label}</span>
              <span className={`font-semibold ${item.highlight ? "text-f1-green" : "text-foreground"}`}>{item.value}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 p-3 bg-muted/30 border border-border/50">
          <p className="font-body text-muted-foreground text-sm leading-relaxed">
            <span className="text-f1-cyan font-display text-[10px] tracking-widest block mb-1">AMBITION</span>
            Work on advanced technologies and contribute to innovation across the engineering landscape.
          </p>
        </div>
      </motion.div>

      {/* Rating bars */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="border border-border bg-card/60 backdrop-blur-md p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-8 h-px bg-f1-cyan" />
        <div className="absolute top-0 left-0 w-px h-8 bg-f1-cyan" />

        <h3 className="font-display text-sm tracking-widest text-f1-cyan uppercase mb-6">Driver Ratings</h3>
        <div className="space-y-5">
          {stats.map((stat, i) => (
            <div key={stat.label}>
              <div className="flex justify-between mb-1.5">
                <span className="font-body text-sm text-foreground">{stat.label}</span>
                <span className="font-display text-xs text-f1-cyan">{stat.value}</span>
              </div>
              <div className="h-2.5 bg-muted rounded-sm overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${stat.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                  className="h-full rounded-sm relative"
                  style={{
                    background: `linear-gradient(90deg, hsl(var(--primary)), hsl(var(--f1-cyan)))`,
                    boxShadow: "0 0 8px hsl(var(--f1-cyan) / 0.3)",
                  }}
                />
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Overall rating */}
        <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
          <span className="font-display text-xs tracking-widest text-muted-foreground">OVERALL</span>
          <span className="font-display text-3xl font-black text-foreground">
            {Math.round(stats.reduce((a, b) => a + b.value, 0) / stats.length)}
          </span>
        </div>
      </motion.div>
    </div>
  </section>
);

export default DriverProfile;
