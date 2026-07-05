import { Crown, MapPin, Mail, Phone } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white/70 py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Footer */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 text-white mb-5">
              <div className="size-9 bg-brand-primary rounded-lg flex items-center justify-center">
                <Crown className="size-5" />
              </div>

              <span className="font-display font-bold text-lg">
                Kerajaan Nusantara
              </span>
            </div>

            <p className="text-sm leading-relaxed">
              Sistem pembelajaran interaktif sejarah Kerajaan Indonesia untuk
              siswa kelas IV SDN Tambahrejo 02. Belajar lebih bermakna dengan
              motion graphic.
            </p>
          </div>

          {/* School */}
          <div>
  <h4 className="text-white font-display font-bold mb-5">
    Sekolah
  </h4>

  <ul className="space-y-3 text-sm">
    <li className="flex items-start gap-2">
      <MapPin className="size-4 mt-0.5 shrink-0 text-brand-primary" />

      <a
        href="https://www.google.com/maps/search/?api=1&query=SDN+Tambahrejo+02+Bandar+Batang+Jawa+Tengah"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-brand-primary transition-colors"
      >
        SDN Tambahrejo 02
        <br />
        Kecamatan Bandar, Kabupaten Batang,
        <br />
        Jawa Tengah (51254)
      </a>
    </li>
  </ul>
</div>

{/* Contact */}
<div>
  <h4 className="text-white font-display font-bold mb-5">
    Kontak
  </h4>

  <ul className="space-y-3 text-sm">

    {/* Email */}
    <li className="flex items-center gap-2">
      <Mail className="size-4 text-brand-primary" />

      <a
        href="mailto:sdtambahrejo02@yahoo.co.id"
        className="hover:text-brand-primary transition-colors"
      >
        sdtambahrejo02@yahoo.co.id
      </a>
    </li>

    {/* Telepon */}
    <li className="flex items-center gap-2">
      <Phone className="size-4 text-brand-primary" />

      <a
        href="tel:+62285689158"
        className="hover:text-brand-primary transition-colors"
      >
        (0285) 689158
      </a>
    </li>

  </ul>
</div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 border-t border-white/10 text-center text-xs">
          &copy; {year}  Media Pembelajaran Interaktif  — SDN Tambahrejo 02. Semua Hak Dilindungi.
        </div>
      </div>
    </footer>
  );
}