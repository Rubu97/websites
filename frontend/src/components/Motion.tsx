import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode, CSSProperties } from 'react';
import type * as React from 'react';
import { useRef } from 'react';

export function Reveal({
  children,
  delay = 0,
  y = 30,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Tilt({
  children,
  className,
  intensity = 10,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * intensity}deg) rotateX(${
      -py * intensity
    }deg) translateY(-6px) scale(1.02)`;
  };

  const reset = () => {
    const el = ref.current;
    if (el) el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg)';
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={`card-3d ${className ?? ''}`}
    >
      {children}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  light = false,
  center = true,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'}>
      <span
        className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.22em] ${
          light
            ? 'bg-white/10 text-gold-200 ring-1 ring-white/15'
            : 'bg-gold-50 text-gold-700 ring-1 ring-gold-200'
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
        {eyebrow}
      </span>
      <h2
        className={`mt-5 text-3xl font-extrabold leading-tight sm:text-4xl md:text-[2.75rem] ${
          light ? 'text-white' : 'text-ink-950'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed ${light ? 'text-ink-100/80' : 'text-ink-700/80'}`}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
