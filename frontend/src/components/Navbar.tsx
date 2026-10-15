import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, CalendarCheck } from 'lucide-react';
import { clinic } from '../data';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#why', label: 'Why Us' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
];

function ToothMark() {
  return (
    <span className="relative grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-aqua-400 to-ink-600 shadow-[0_10px_30px_-10px_rgba(34,211,238,0.8)]">
      <svg viewBox="0 0 64 64" className="h-6 w-6 fill-white">
        <path d="M32 6c-6 0-9 2.5-12.5 2.5C15 8.5 10 11 10 20c0 6 1.8 10 3.4 15.4C14.7 40 16 46 18.4 52c1.6 4 5.6 5 7.6 1 1.6-3.2 2-8 6-8s4.4 4.8 6 8c2 4 6 3 7.6-1C48 46 49.3 40 50.6 35.4 52.2 30 54 26 54 20c0-9-5-11.5-9.5-11.5C41 8.5 38 6 32 6z" />
      </svg>
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
            <ToothMark />
            <span className="leading-tight">
              <span
                className={`block font-display text-base font-extrabold ${
                  scrolled ? 'text-ink-950' : 'text-white'
                }`}
              >
                Smile Care
              </span>
              <span
                className={`block text-[11px] font-semibold uppercase tracking-[0.18em] ${
                  scrolled ? 'text-aqua-600' : 'text-aqua-200'
                }`}
              >
                Dental Clinic · Sualkuchi
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
                    ? 'text-ink-700 hover:bg-aqua-50 hover:text-aqua-700'
                    : 'text-ink-100/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={clinic.phoneHref}
              className={`flex items-center gap-2 text-sm font-semibold ${
                scrolled ? 'text-ink-700' : 'text-ink-100'
              }`}
            >
              <Phone className="h-4 w-4 text-aqua-500" />
              <span className="hidden xl:inline">{clinic.phoneDisplay}</span>
            </a>
            <a href="#booking" className="btn-primary btn-sm">
              <CalendarCheck className="h-4 w-4" />
              Book Appointment
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
                  className="block rounded-xl px-4 py-3 text-sm font-semibold text-ink-800 hover:bg-aqua-50"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setOpen(false)}
                className="btn-primary mt-2 w-full"
              >
                <CalendarCheck className="h-4 w-4" />
                Book Appointment
              </a>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
