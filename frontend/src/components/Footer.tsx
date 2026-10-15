import { MapPin, Phone, Mail, Star, ArrowUp } from 'lucide-react';
import { clinic } from '../data';

const nav = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#why', label: 'Why Us' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#booking', label: 'Book' },
  { href: '#contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink-950 pt-20 pb-10 text-ink-200">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-aqua-500/10 blur-[120px]" />
      <div className="container-x relative">
        <div className="grid gap-12 border-b border-white/10 pb-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-aqua-400 to-ink-600">
                <svg viewBox="0 0 64 64" className="h-6 w-6 fill-white">
                  <path d="M32 6c-6 0-9 2.5-12.5 2.5C15 8.5 10 11 10 20c0 6 1.8 10 3.4 15.4C14.7 40 16 46 18.4 52c1.6 4 5.6 5 7.6 1 1.6-3.2 2-8 6-8s4.4 4.8 6 8c2 4 6 3 7.6-1C48 46 49.3 40 50.6 35.4 52.2 30 54 26 54 20c0-9-5-11.5-9.5-11.5C41 8.5 38 6 32 6z" />
                </svg>
              </span>
              <span className="leading-tight">
                <span className="block font-display text-lg font-extrabold text-white">
                  {clinic.name}
                </span>
                <span className="block text-xs text-aqua-200/80">{clinic.localName}</span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-300/80">
              A modern dental clinic serving Sualkuchi and the wider Kamrup district with gentle,
              affordable and honest dental care.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-ink-100">
              <span className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-aqua-400 text-aqua-400" />
                ))}
              </span>
              {clinic.rating.toFixed(1)} on Google
            </span>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Explore
            </h4>
            <ul className="mt-5 grid grid-cols-2 gap-2 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-ink-300/80 transition-colors hover:text-aqua-300">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Contact
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-ink-300/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-aqua-400" />
                {clinic.address}
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-aqua-400" />
                <a href={clinic.phoneHref} className="hover:text-aqua-300">
                  {clinic.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-aqua-400" />
                <a href={`mailto:${clinic.email}`} className="hover:text-aqua-300">
                  {clinic.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-ink-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {clinic.name}, {clinic.town}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <span>{clinic.hours}</span>
            <a
              href="#home"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-ink-200 transition-colors hover:border-aqua-300/50 hover:text-aqua-300"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
