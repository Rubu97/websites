import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ClipboardPen, MapPin } from 'lucide-react';
import { school, mapLinks } from '../data';

const links = [
  { href: '#about', label: 'About' },
  { href: '#academics', label: 'Academics' },
  { href: '#campus', label: 'Campus' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#notices', label: 'Notices' },
  { href: '#contact', label: 'Contact' },
];

function Crest({ className = 'h-11 w-11' }: { className?: string }) {
  return (
    <span className="relative grid place-items-center">
      <img
        src="/crest.svg"
        alt={`${school.name} crest`}
        className={`${className} drop-shadow-[0_8px_20px_rgba(245,158,11,0.35)]`}
      />
    </span>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="container-x">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 ${
            scrolled ? 'glass shadow-soft' : 'bg-transparent'
          }`}
        >
          <a href="#home" className="flex items-center gap-3">
            <Crest />
            <span className="leading-tight">
              <span
                className={`block font-display text-base font-extrabold ${
                  scrolled ? 'text-ink-950' : 'text-white'
                }`}
              >
                Ganesh Das High School
              </span>
              <span
                className={`block font-assamese text-[11px] font-semibold tracking-wide ${
                  scrolled ? 'text-gold-700' : 'text-gold-200'
                }`}
              >
                গণেশ দাস হাই স্কুল · শুয়ালকুচি
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  scrolled
                    ? 'text-ink-700 hover:bg-gold-50 hover:text-gold-700'
                    : 'text-ink-100/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={mapLinks.directions}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 text-sm font-semibold ${
                scrolled ? 'text-ink-700' : 'text-ink-100'
              }`}
            >
              <MapPin className="h-4 w-4 text-gold-500" />
              <span className="hidden xl:inline">Kanchan Nagar, Sualkuchi</span>
            </a>
            <a href="#admissions" className="btn-primary btn-sm">
              <ClipboardPen className="h-4 w-4" />
              Admission Enquiry
            </a>
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className={`grid h-10 w-10 place-items-center rounded-xl lg:hidden ${
              scrolled ? 'bg-ink-50 text-ink-900' : 'bg-white/10 text-white'
            }`}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass mt-2 overflow-hidden rounded-2xl p-3 shadow-soft lg:hidden"
            >
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-semibold text-ink-800 hover:bg-gold-50"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#admissions"
                onClick={() => setOpen(false)}
                className="btn-primary mt-2 w-full"
              >
                <ClipboardPen className="h-4 w-4" />
                Admission Enquiry
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
