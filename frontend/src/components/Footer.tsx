import { MapPin, Images, ExternalLink, Heart } from 'lucide-react';
import { school, mapLinks } from '../data';

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'About the school', href: '#about' },
      { label: 'Academics', href: '#academics' },
      { label: 'Campus & facilities', href: '#campus' },
      { label: 'Gallery', href: '#gallery' },
    ],
  },
  {
    title: 'Students',
    links: [
      { label: 'Notice board', href: '#notices' },
      { label: 'Admissions', href: '#admissions' },
      { label: 'Visit the school', href: '#contact' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#04101b] pt-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />

      <div className="container-x">
        <div className="grid gap-10 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <img src="/crest.svg" alt="" className="h-12 w-12" />
              <span className="leading-tight">
                <span className="block font-display text-lg font-extrabold text-white">
                  {school.name}
                </span>
                <span className="block font-assamese text-xs font-semibold text-gold-300">
                  {school.localName}
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-300/85">
              A government co-educational high school in Kanchan Nagar, Sualkuchi — serving the
              community with quality education since {school.founded}.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={mapLinks.directions}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-ink-100 transition-colors hover:border-gold-400/60 hover:text-gold-300"
              >
                <MapPin className="h-4 w-4 text-gold-400" />
                {school.plusCode}
              </a>
              <a
                href={mapLinks.photos}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-ink-100 transition-colors hover:border-gold-400/60 hover:text-gold-300"
              >
                <Images className="h-4 w-4 text-gold-400" />
                Photos on Maps
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-gold-300">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <a
                      href={l.href}
                      className="text-sm font-medium text-ink-200/85 transition-colors hover:text-gold-300"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-ink-300/70 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {school.name} · {school.block}, {school.district}
          </p>
          <p className="flex items-center gap-1.5">
            Educating Sualkuchi since {school.founded}
            <Heart className="h-3.5 w-3.5 fill-gold-500 text-gold-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
