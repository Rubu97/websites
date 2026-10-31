import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { stats } from '../data';

function useCountUp(target: number, duration = 1700) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, reduce]);

  return { ref, val };
}

function StatCard({
  value,
  suffix,
  label,
  sub,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  sub: string;
  index: number;
}) {
  const { ref, val } = useCountUp(value);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-6 text-center backdrop-blur transition-colors hover:border-gold-400/40 hover:bg-white/[0.07]"
    >
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="font-display text-3xl font-extrabold text-white sm:text-4xl">
        {val}
        <span className="text-gradient">{suffix}</span>
      </div>
      <div className="mt-2 text-sm font-bold uppercase tracking-[0.16em] text-gold-300">{label}</div>
      <div className="mt-1 text-xs text-ink-200/75">{sub}</div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="relative bg-ink-950 pb-16 pt-4">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
      <div className="container-x">
        <div className="grid grid-cols-2 gap-4 [&>*:last-child]:col-span-2 sm:gap-5 lg:grid-cols-5 lg:[&>*:last-child]:col-span-1">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
