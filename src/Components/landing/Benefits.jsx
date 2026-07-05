import { Zap, Brain, Heart } from "lucide-react";

const benefits = [
  {
    icon: Zap,
    title: "Interaktif & Mudah Digunakan",
    desc: "Dirancang dengan antarmuka yang sederhana sehingga memudahkan siswa dalam mengakses materi pembelajaran secara mandiri.",
    color: "bg-brand-primary",
  },
  {
    icon: Brain,
    title: "Memahami Sejarah Lebih Baik",
    desc: "Visualisasi motion graphic membantu siswa memahami tokoh, peristiwa, dan perkembangan sejarah Kerajaan Nusantara secara lebih jelas.",
    color: "bg-brand-secondary",
  },
  {
    icon: Heart,
    title: "Pembelajaran Lebih Menarik",
    desc: "Penyajian materi melalui video motion graphic memberikan pengalaman belajar yang lebih menarik sehingga dapat meningkatkan motivasi belajar siswa.",
    color: "bg-brand-accent",
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
            Manfaat Media Pembelajaran
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((b, i) => {
            const Icon = b.icon;

            return (
              <div
                key={b.title}
                className="relative bg-bg-soft p-8 rounded-3xl border border-border overflow-hidden group hover:shadow-xl transition-all animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div
                  className={`absolute -top-6 -right-6 size-28 opacity-10 rounded-full group-hover:scale-125 transition-transform ${b.color}`}
                  aria-hidden
                />

                <div
                  className={`relative size-14 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg ${b.color}`}
                >
                  <Icon className="size-7" strokeWidth={2.2} />
                </div>

                <h3 className="relative font-display font-bold text-xl mb-3 text-ink">
                  {b.title}
                </h3>

                <p className="relative text-ink-soft leading-relaxed">
                  {b.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}