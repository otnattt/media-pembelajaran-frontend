import {
  PlayCircle,
  HelpCircle,
  Award,
  BookOpen,
  Smile,
} from "lucide-react";

const features = [
  {
    icon: PlayCircle,
    title: "Play Motion Graphic",
    desc: "Video animasi yang menjelaskan silsilah dan peninggalan kerajaan secara interaktif.",
    bg: "bg-amber-100",
    color: "text-brand-primary",
  },
  {
    icon: HelpCircle,
    title: "Kuis Interaktif",
    desc: "Uji pemahamanmu dengan tantangan pilihan ganda yang seru setelah menonton materi.",
    bg: "bg-blue-100",
    color: "text-brand-secondary",
  },
  {
    icon: BookOpen,
    title: "Materi Sejarah",
    desc: "Kerajaan Hindu, Buddha, hingga Islam di Nusantara, disusun sesuai kurikulum.",
    bg: "bg-rose-100",
    color: "text-rose-500",
  },
 
];

export default function FeaturesSection() {
  return (
    <section id="fitur" className="py-24 bg-bg-soft">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-block text-brand-primary font-bold text-sm uppercase tracking-widest mb-3">
            Fitur Utama
          </span>

          <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink mb-4">
            Semua yang Kamu Butuhkan untuk Belajar
          </h2>

          <p className="text-ink-soft max-w-xl mx-auto">
            Didesain khusus untuk kemudahan belajar mandiri di sekolah maupun
            di rumah.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;

            return (
              <div
                key={f.title}
                className="group bg-card p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-border animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div
                  className={`size-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${f.bg} ${f.color}`}
                >
                  <Icon className="size-7" strokeWidth={2.2} />
                </div>

                <h3 className="font-display font-bold text-xl mb-3 text-ink">
                  {f.title}
                </h3>

                <p className="text-ink-soft text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}