import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin, ChevronDown, BookOpenCheck, Languages, Landmark } from 'lucide-react';
import { school } from '../data';

const HeroScene = lazy(() => import('../three/HeroScene'));

const chips = [
  { icon: GraduationCap, label: 'Classes VI – X' },
  { icon: Languages, label: 'Assamese Medium' },
  { icon: Landmark, label: 'Since 1954' },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink-950 pt-28 pb-16"
    >
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_75%_0%,#14456a_0%,#0b2c44_38%,#07192a_72%,#04101b_100%)]" />
      <div className="pointer-events-none absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-gold-500/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[26rem] w-[26rem] rounded-full bg-ink-500/25 blur-[120px]" />

      <div className="absolute inset-0 opacity-95">
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(4,16,27,0.94)_0%,rgba(4,16,27,0.66)_45%,rgba(4,16,27,0.18)_75%)] lg:bg-[linear-gradient(90deg,rgba(4,16,27,0.92)_0%,rgba(4,16,27,0.5)_42%,rgba(4,16,27,0.06)_70%)]" />

      <div className="container-x relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 backdrop-blur"
          >
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
              </span>
            </span>
            <span className="text-xs font-semibold tracking-wide text-ink-100">
              Government · Co-educational · Est. {school.founded}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 text-4xl font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-[3.7rem]"
          >
            Shaping bright futures in the heart of{' '}
            <span className="text-gradient">Sualkuchi</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-assamese text-lg font-semibold text-gold-200 sm:text-xl"
          >
            গণেশ দাস হাই স্কুল · কাঞ্চন নগর, শুয়ালকুচি
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-xl text-base leading-relaxed text-ink-100/85 sm:text-lg"
          >
            Welcome to <strong className="font-semibold text-white">{school.name}</strong> — a
            government high school educating the children of Kanchan Nagar and beyond since{' '}
            {school.founded}. Strong academics, caring teachers and Assamese values, for students of
            Class VI to X.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a href="#admissions" className="btn-primary">
              <BookOpenCheck className="h-5 w-5" />
              Admission Enquiry
            </a>
            <a href="#about" className="btn-ghost">
              Explore the School
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            {chips.map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-2 text-xs font-semibold text-ink-100 backdrop-blur"
              >
                <c.icon className="h-4 w-4 text-gold-400" />
                {c.label}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-10 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-200/70"
          >
            <ChevronDown className="h-4 w-4 animate-bounce text-gold-400" />
            Scroll to discover
          </motion.div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 right-6 z-10 hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-ink-100 backdrop-blur lg:flex">
        <MapPin className="h-4 w-4 text-gold-400" />
        {school.plusCode} · Sualkuchi, Assam
      </div>
    </section>
  );
}
