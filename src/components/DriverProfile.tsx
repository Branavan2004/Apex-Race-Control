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
        className="border border-border bg-card/60 backdrop-blur-md p-6 relative overflow-hidden"
      >
        {/* Red accent stripe */}
        <div className="absolute top-0 left-0 w-full h-1 bg-primary" />

        <div className="flex items-start gap-4 mb-6">
          {/* Helmet-style frame */}
          <div className="w-20 h-20 rounded-lg bg-muted border border-border flex items-center justify-center">
            <span className="font-display text-3xl font-black text-primary">01</span>
          </div>
          <div>
            <h3 className="font-display text-2xl font-bold text-foreground">BRANAVAN</h3>
            <p className="font-body text-muted-foreground">IIT Tech Racing</p>
          </div>
        </div>

        <div className="space-y-3 font-body">
          {[
            { label: "Nationality", value: "🇱🇰 Sri Lanka" },
            { label: "Team", value: "IIT" },
            { label: "Specialty", value: "Software Engineering" },
            { label: "Championship", value: "Active" },
          ].map((item) => (
            <div key={item.label} className="flex justify-between items-center border-b border-border/50 pb-2">
              <span className="text-muted-foreground text-sm">{item.label}</span>
              <span className="text-foreground font-semibold">{item.value}</span>
            </div>
          ))}
        </div>

        <p className="mt-6 font-body text-muted-foreground text-sm leading-relaxed">
          Ambition: Work on advanced technologies and contribute to innovation across the engineering landscape.
        </p>
      </motion.div>

      {/* Rating bars */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="border border-border bg-card/60 backdrop-blur-md p-6"
      >
        <h3 className="font-display text-sm tracking-widest text-f1-cyan uppercase mb-6">Driver Ratings</h3>
        <div className="space-y-5">
          {stats.map((stat, i) => (
            <div key={stat.label}>
              <div className="flex justify-between mb-1">
                <span className="font-body text-sm text-foreground">{stat.label}</span>
                <span className="font-display text-xs text-f1-cyan">{stat.value}</span>
              </div>
              <div className="h-2 bg-muted rounded-sm overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${stat.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-f1-cyan rounded-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default DriverProfile;
