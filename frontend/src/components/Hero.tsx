import { motion } from 'framer-motion';
import { Star, ShieldCheck, Sparkles, MapPin, ChevronDown, CalendarHeart } from 'lucide-react';
import HeroScene from '../three/HeroScene';
import { clinic } from '../data';

const chips = [
  { icon: ShieldCheck, label: 'Sterilised & Safe' },
  { icon: Sparkles, label: 'Painless Treatments' },
  { icon: Star, label: '5.0 Google Rating' },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink-950 pt-28 pb-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_70%_0%,#12405f_0%,#0b2c44_38%,#07192a_72%,#050f19_100%)]" />
      <div className="pointer-events-none absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-aqua-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[26rem] w-[26rem] rounded-full bg-ink-500/25 blur-[120px]" />

      <div className="absolute inset-0 opacity-95">
        <HeroScene />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,15,25,0.92)_0%,rgba(5,15,25,0.6)_45%,rgba(5,15,25,0.15)_75%)] lg:bg-[linear-gradient(90deg,rgba(5,15,25,0.9)_0%,rgba(5,15,25,0.45)_42%,rgba(5,15,25,0.05)_70%)]" />

      <div className="container-x relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 backdrop-blur"
          >
            <span className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-aqua-400 text-aqua-400" />
              ))}
            </span>
            <span className="text-xs font-semibold text-ink-100">
              {clinic.rating.toFixed(1)} · {clinic.reviewCount} Google reviews
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-[3.9rem]"
          >
            Healthy smiles,
            <br />
            crafted with <span className="text-gradient">gentle precision</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-base leading-relaxed text-ink-100/85 sm:text-lg"
          >
            Welcome to <strong className="font-semibold text-white">{clinic.name}</strong>, Sualkuchi's
            trusted dental home. Modern equipment, sterile protocols and a caring team — for families
            across Assam who want painless, affordable dental care.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a href="#booking" className="btn-primary">
              <CalendarHeart className="h-5 w-5" />
              Book Your Appointment
            </a>
            <a href="#services" className="btn-ghost">
              Explore Treatments
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            {chips.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-2 text-xs font-semibold text-ink-100 backdrop-blur"
              >
                <Icon className="h-4 w-4 text-aqua-300" />
                {label}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 inline-flex items-center gap-2 text-sm text-ink-200/80"
          >
            <MapPin className="h-4 w-4 text-aqua-300" />
            {clinic.address}
          </motion.div>
        </div>
      </div>

      <a
        href="#services"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-ink-200/70 transition hover:text-white"
        aria-label="Scroll down"
      >
        <ChevronDown className="h-7 w-7 animate-float-slow" />
      </a>
    </section>
  );
}
