import { Crown } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-brand-primary/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3">
          <div className="size-10 bg-brand-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-primary/20">
            <Crown className="size-5" />
          </div>

          <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-ink">
            Kerajaan Nusantara
          </span>
        </a>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8 font-medium text-ink-soft">
          <a
            href="#tentang"
            className="hover:text-brand-secondary transition-colors"
          >
            Tentang
          </a>

          <a
            href="#fitur"
            className="hover:text-brand-secondary transition-colors"
          >
            Fitur
          </a>

          <a
            href="#mediaplayer"
            className="hover:text-brand-secondary transition-colors"
          >
            Video Materi
          </a>

          <a
            href="#kuis"
            className="hover:text-brand-secondary transition-colors"
          >
            Kuis
          </a>

         
        </div>
      </div>
    </nav>
  );
}