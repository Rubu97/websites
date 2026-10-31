import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Images, ExternalLink, Expand, MapPin, Camera } from 'lucide-react';
import { Reveal, SectionHeading } from './Motion';
import { gallery, mapLinks } from '../data';

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  const [broken, setBroken] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = active !== null ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [active]);

  const markBroken = (index: number) => setBroken((b) => ({ ...b, [index]: true }));

  return (
    <section id="gallery" className="relative bg-ink-950 pb-24 pt-4 sm:pb-28">
      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            light
            center={false}
            eyebrow="Campus life"
            title={
              <>
                Real photos from our <span className="text-gradient">Google Maps</span> listing.
              </>
            }
            subtitle="Every photo below is loaded live from the school's official Google Maps page — uploaded by Local Guides and visitors, including the cover photo by Nibed D."
          />
          <Reveal delay={0.1}>
            <a
              href={mapLinks.photos}
              target="_blank"
              rel="noreferrer"
              className="btn-primary shadow-glow"
            >
              <Images className="h-5 w-5" />
              View all photos on Google Maps
              <ExternalLink className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <div className="mt-12 grid auto-rows-[12rem] grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-[14rem] md:grid-cols-3">
          {gallery.map((item, i) => (
            <motion.button
              key={item.src}
              type="button"
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-3xl border border-white/10 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 ${
                item.span ?? ''
              }`}
            >
              {broken[i] ? (
                <span className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 text-center">
                  <Camera className="h-8 w-8 text-gold-400" />
                  <span className="px-4 text-xs font-semibold text-ink-200/80">
                    {item.tag === 'Street View' ? 'Street View' : 'Photo'} — open on Google Maps
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-gold-300">
                    <MapPin className="h-3 w-3" />
                    Google Maps
                  </span>
                </span>
              ) : (
                <img
                  src={item.src}
                  alt={`${item.title} — ${item.tag}`}
                  loading="lazy"
                  onError={() => markBroken(i)}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/10 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />

              <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-ink-950/60 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-200 backdrop-blur">
                {item.tag}
              </span>

              <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
                <span>
                  <span className="block text-sm font-bold text-white drop-shadow">{item.title}</span>
                  {item.credit && (
                    <span className="mt-0.5 block text-[10px] font-semibold text-ink-200/80">
                      {item.credit}
                    </span>
                  )}
                </span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-all group-hover:opacity-100">
                  <Expand className="h-4 w-4" />
                </span>
              </span>
            </motion.button>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-6 text-center text-xs text-ink-300/70">
            Photos © their photographers · served from the school's{' '}
            <a
              href={mapLinks.place}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-gold-300 underline-offset-2 hover:underline"
            >
              Google Maps listing
            </a>{' '}
            — 45 photos, Street View and community uploads live there.
          </p>
        </Reveal>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-950/92 p-4 backdrop-blur-md"
            onClick={() => setActive(null)}
          >
            <motion.figure
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-white/15 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {broken[active] ? (
                <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-3 bg-ink-900">
                  <Camera className="h-10 w-10 text-gold-400" />
                  <a
                    href={mapLinks.place}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary btn-sm"
                  >
                    <MapPin className="h-4 w-4" />
                    Open on Google Maps
                  </a>
                </div>
              ) : (
                <img
                  src={gallery[active].src}
                  alt={gallery[active].title}
                  onError={() => markBroken(active)}
                  className="max-h-[75vh] w-full object-contain bg-ink-950"
                />
              )}
              <figcaption className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t border-white/10 bg-ink-950 px-5 py-4">
                <span className="text-sm font-bold text-white">{gallery[active].title}</span>
                {gallery[active].credit && (
                  <span className="text-[11px] font-semibold text-ink-300">
                    {gallery[active].credit}
                  </span>
                )}
                <a
                  href={mapLinks.photos}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-gold-300 hover:text-gold-200"
                >
                  More on Maps <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </figcaption>
              <button
                type="button"
                aria-label="Close photo"
                onClick={() => setActive(null)}
                className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-ink-950/70 text-white backdrop-blur transition-colors hover:bg-gold-500 hover:text-ink-950"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
