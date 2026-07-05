import { Play, Sparkles } from "lucide-react";
import heroImg from "../../assets/hero-student.jpg";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative pt-12 pb-24 overflow-hidden"
    >
      {/* Background Blur */}
      <div
        className="absolute -top-20 -left-20 size-72 bg-brand-primary/20 rounded-full blur-3xl animate-blob"
        aria-hidden
      />

      <div
        className="absolute top-40 -right-20 size-96 bg-brand-secondary/15 rounded-full blur-3xl animate-blob"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative">

        {/* Left Content */}
        <div className="space-y-8 relative z-10 animate-fade-up">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-primary/10 text-brand-primary rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider">
            <Sparkles className="size-4" />
            SDN Tambahrejo 02 •
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-ink">
            Petualangan Seru Sejarah{" "}
            <span className="text-brand-secondary">
              Kerajaan Indonesia
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg text-ink-soft leading-relaxed max-w-xl">
            "Ayo belajar sejarah dengan cara yang lebih seru! Temukan kisah Kerajaan Kutai, Tarumanegara, Majapahit, Samudra Pasai, Demak, dan Mataram Islam melalui animasi motion graphic yang menarik dan mudah dipahami."
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#mediaplayer"
              className="bg-brand-primary text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-brand-primary/30 hover:bg-brand-primary/90 hover:-translate-y-0.5 transition-all inline-flex items-center gap-2"
            >
              <Play className="size-5 fill-current" />
              Mulai Belajar Sekarang
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative animate-float">
          <div
            className="absolute -inset-4 bg-brand-secondary/10 rounded-full blur-3xl"
            aria-hidden
          />

          <div className="relative aspect-[4/3] bg-card rounded-[40px] shadow-2xl shadow-brand-primary/10 border-8 border-white overflow-hidden">
            <img
              src={heroImg}
              alt="Siswa SD belajar sejarah kerajaan Indonesia lewat motion graphic"
              className="w-full h-full object-cover"
              width="1024"
              height="768"
            />
          </div>

          {/* Floating Badge */}
          <div className="absolute -top-4 -right-4 bg-blue-500 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-2 animate-pulse-soft">
            <div className="size-3 rounded-full bg-brand-accent" />
            <span className="font-bold text-sm text-white">
              Ayo Belajar
            </span>
            <div className="size-3 rounded-full bg-brand-accent" />
          </div>

          {/* Floating Points */}
          <div className="absolute -bottom-4 -left-4 bg-brand-primary text-white rounded-2xl px-4 py-3 shadow-xl">
            <div className="font-display font-bold text-2xl">
              ⭐⭐⭐
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}