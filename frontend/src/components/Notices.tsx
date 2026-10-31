import { motion } from 'framer-motion';
import { Pin, Megaphone, ArrowUpRight } from 'lucide-react';
import { Reveal, SectionHeading } from './Motion';
import { notices } from '../data';

export default function Notices() {
  const [pinned, ...rest] = notices;

  return (
    <section id="notices" className="relative overflow-hidden bg-white py-24 sm:py-28">
      <div className="pointer-events-none absolute -right-32 top-16 h-96 w-96 rounded-full bg-gold-100 blur-[110px]" />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Notice board"
          title={
            <>
              Latest from the <span className="text-gradient">school office</span>.
            </>
          }
          subtitle="Announcements for students and guardians — examinations, events, meetings and admissions."
        />

        <Reveal className="mt-12">
          <motion.a
            href="#admissions"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group relative block overflow-hidden rounded-3xl border-2 border-gold-300 bg-gradient-to-br from-gold-50 via-white to-ink-50 p-7 shadow-soft transition-all hover:shadow-glow sm:p-9"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold-200/70 blur-3xl" />

            <div className="relative flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-ink-950 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-300">
                <Pin className="h-3 w-3" />
                Pinned
              </span>
              <span className="rounded-full bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-gold-700 ring-1 ring-gold-200">
                {pinned.tag}
              </span>
              <span className="text-xs font-semibold text-ink-400">{pinned.date}</span>
            </div>

            <h3 className="relative mt-5 max-w-3xl text-2xl font-extrabold leading-snug text-ink-950 sm:text-3xl">
              {pinned.title}
            </h3>
            <p className="relative mt-3 max-w-2xl text-sm leading-relaxed text-ink-600 sm:text-base">
              {pinned.text}
            </p>

            <span className="relative mt-6 inline-flex items-center gap-2 text-sm font-bold text-gold-700">
              Enquire now
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </motion.a>
        </Reveal>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {rest.map((n, i) => (
            <motion.article
              key={n.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex flex-col rounded-3xl border border-ink-100 bg-ink-50/60 p-6 transition-all hover:-translate-y-1 hover:border-gold-300 hover:bg-white hover:shadow-soft"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-ink-600 ring-1 ring-ink-200">
                  {n.tag}
                </span>
                <span className="text-xs font-semibold text-ink-400">{n.date}</span>
              </div>

              <span className="mt-5 grid h-9 w-9 place-items-center rounded-xl bg-gold-100 text-gold-700 transition-colors group-hover:bg-gold-500 group-hover:text-ink-950">
                <Megaphone className="h-4.5 w-4.5" />
              </span>

              <h3 className="mt-4 text-base font-bold leading-snug text-ink-950">{n.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{n.text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
