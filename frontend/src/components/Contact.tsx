import { MapPin, Phone, Mail, Clock, Navigation, QrCode } from 'lucide-react';
import { clinic, mapsEmbed, mapsLink } from '../data';
import { Reveal, SectionHeading } from './Motion';

const details = [
  { icon: MapPin, label: 'Address', value: clinic.address, href: mapsLink },
  { icon: Phone, label: 'Phone', value: clinic.phoneDisplay, href: clinic.phoneHref },
  { icon: Mail, label: 'Email', value: clinic.email, href: `mailto:${clinic.email}` },
  { icon: Clock, label: 'Hours', value: `${clinic.hours} · ${clinic.closed}` },
  { icon: QrCode, label: 'Plus code', value: clinic.plusCode },
];

export default function Contact() {
  return (
    <section id="contact" className="relative bg-ink-50/60 py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Visit Us"
          title={
            <>
              Find us in the heart of <span className="text-gradient">Sualkuchi</span>
            </>
          }
          subtitle="Walk in for a consultation or book online to skip the wait. We're on Hospital Road, Noh-Para — easy to reach from anywhere in Sualkuchi."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="grid gap-4">
              {details.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  className="flex items-start gap-4 rounded-3xl border border-ink-100 bg-white p-5 shadow-[0_20px_50px_-45px_rgba(7,25,42,0.9)]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-aqua-400 to-ink-600 text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-wider text-ink-400">
                      {label}
                    </span>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className="mt-0.5 block break-words text-sm font-semibold text-ink-800 hover:text-aqua-700"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="mt-0.5 block break-words text-sm font-semibold text-ink-800">
                        {value}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              <a href={mapsLink} target="_blank" rel="noreferrer" className="btn-primary btn-lg">
                <Navigation className="h-5 w-5" />
                Get directions
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full min-h-[380px] overflow-hidden rounded-3xl border border-ink-100 shadow-soft">
              <iframe
                title={`Map of ${clinic.name}`}
                src={mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[380px] w-full"
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
