import { Check } from "lucide-react";
import aboutImg from "../../assets/about-illustration.jpg";

const points = [
  {
    dot: "bg-brand-accent/20 text-brand-accent",
    text: "Visualisasi tokoh dan kerajaan yang menarik serta ramah anak.",
  },
  {
    dot: "bg-brand-secondary/20 text-brand-secondary",
    text: "Narasi mudah dipahami sesuai kurikulum kelas IV SD.",
  },
  {
    dot: "bg-brand-primary/20 text-brand-primary",
    text: "Fokus pada Kerajaan Hindu, Buddha, dan Islam di Nusantara.",
  },
];

export default function AboutSection() {
  return (
    <section id="tentang" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="relative">
              <div
                className="absolute -inset-6 bg-brand-primary/10 rounded-[40px] blur-2xl"
                aria-hidden
              />
              
              <img
                src={aboutImg}
                alt="Ilustrasi candi dan motion graphic sejarah Indonesia"
                loading="lazy"
                className="relative w-full aspect-square object-cover rounded-3xl shadow-xl"
              />
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2 space-y-6">
            <span className="inline-block text-brand-primary font-bold text-sm uppercase tracking-widest">
              Tentang Sistem
            </span>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink leading-tight">
              Menghidupkan Kisah Kerajaan Nusantara
            </h2>

            <p className="text-ink-soft text-lg leading-relaxed">
              Menghadirkan inovasi pembelajaran untuk siswa kelas IV SDN
              Tambahrejo 02 agar sejarah tidak lagi membosankan. Melalui motion
              graphic, imajinasi siswa tentang masa lalu menjadi lebih nyata,
              hidup, dan menyenangkan.
            </p>

            <div className="grid grid-cols-1 gap-3">
              {points.map((p) => (
                <div
                  key={p.text}
                  className="flex items-start gap-4 p-4 bg-bg-soft rounded-2xl"
                >
                  <div
                    className={`size-8 rounded-full flex items-center justify-center shrink-0 ${p.dot}`}
                  >
                    <Check className="size-4" strokeWidth={3} />
                  </div>

                  <p className="font-medium text-ink">{p.text}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}