import {
  Library,
  FlaskConical,
  Droplets,
  Zap,
  Users,
  BookOpen,
  ShieldCheck,
  HeartHandshake,
  type LucideIcon,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal, SectionHeading, Tilt } from './Motion';
import { facilities } from '../data';

const iconMap: Record<string, LucideIcon> = {
  Library,
  Flask: FlaskConical,
  Droplets,
  Zap,
  Users,
  BookOpen,
  ShieldCheck,
  HeartHandshake,
};

export default function Facilities() {
  return (
    <section id="campus" className="relative overflow-hidden bg-ink-950 py-24 sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,#0e2a41_0%,#07192a_55%,#04101b_100%)]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-gold-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-[24rem] w-[24rem] rounded-full bg-ink-500/20 blur-[120px]" />

      <div className="container-x relative">
        <SectionHeading
          light
          eyebrow="Campus & facilities"
          title={
            <>
              Everything a student needs, <span className="text-gradient">on campus</span>.
            </>
          }
          subtitle="A safe, well-serviced campus — from the library and learning lab to clean water, power and separate facilities for every child."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.map((f, i) => {
            const Icon = iconMap[f.icon] ?? BookOpen;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <Tilt intensity={6} className="h-full">
                  <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-all hover:border-gold-400/40 hover:bg-white/[0.07]">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-gold-300 to-gold-500 text-ink-950 shadow-[0_14px_30px_-12px_rgba(245,158,11,0.8)] transition-transform group-hover:-translate-y-1">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-white">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-200/80">{f.text}</p>
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-6 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:grid-cols-3 sm:p-8">
            {[
              { k: 'Library', v: '350+ books' },
              { k: 'Classrooms', v: '6 in good condition' },
              { k: 'Approach', v: 'All-weather road' },
            ].map((x) => (
              <div key={x.k} className="text-center">
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300">
                  {x.k}
                </div>
                <div className="mt-1.5 font-display text-lg font-extrabold text-white">{x.v}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
