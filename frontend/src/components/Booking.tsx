import { useEffect, useMemo, useState } from 'react';
import type * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarDays,
  Clock,
  User,
  Phone,
  Mail,
  MessageSquare,
  CheckCircle2,
  Loader2,
  AlertCircle,
  CalendarCheck2,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { services, clinic } from '../data';
import { Reveal, SectionHeading } from './Motion';

type Slot = { time: string; available: boolean };

type FormState = {
  name: string;
  phone: string;
  email: string;
  treatment: string;
  date: string;
  time: string;
  notes: string;
};

const todayISO = () => {
  const d = new Date();
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10);
};

const prettyTime = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
};

const prettyDate = (iso: string) => {
  if (!iso) return '';
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};

export default function Booking() {
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    email: '',
    treatment: '',
    date: '',
    time: '',
    notes: '',
  });
  const [slots, setSlots] = useState<Slot[]>([]);
  const [closed, setClosed] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<{
    id: string;
    name: string;
    treatment: string;
    date: string;
    time: string;
  } | null>(null);

  const min = useMemo(todayISO, []);

  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      setForm((f) => ({ ...f, treatment: id }));
    };
    window.addEventListener('select-treatment', onSelect as EventListener);
    return () => window.removeEventListener('select-treatment', onSelect as EventListener);
  }, []);

  useEffect(() => {
    if (!form.date) {
      setSlots([]);
      return;
    }
    let active = true;
    setLoadingSlots(true);
    fetch(`/api/availability?date=${form.date}`)
      .then((r) => r.json())
      .then((data) => {
        if (!active) return;
        setClosed(Boolean(data.closed));
        setSlots(data.slots ?? []);
        setForm((f) => ({ ...f, time: '' }));
      })
      .catch(() => {
        if (active) setSlots([]);
      })
      .finally(() => active && setLoadingSlots(false));
    return () => {
      active = false;
    };
  }, [form.date]);

  const update = (key: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSubmitting(true);
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors(data.details ?? [data.error ?? 'Something went wrong. Please try again.']);
        return;
      }
      setSuccess(data.appointment);
    } catch {
      setErrors(['We could not reach the clinic server. Please call us instead.']);
    } finally {
      setSubmitting(false);
    }
  };

  const resetAll = () => {
    setSuccess(null);
    setForm({ name: '', phone: '', email: '', treatment: '', date: '', time: '', notes: '' });
    setSlots([]);
    setErrors([]);
  };

  return (
    <section id="booking" className="relative overflow-hidden bg-white py-24">
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-aqua-100/70 blur-3xl" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Book Online"
          title={
            <>
              Reserve your visit in <span className="text-gradient">under a minute</span>
            </>
          }
          subtitle="Pick a treatment, choose a time that suits you and we'll confirm instantly. No waiting on hold."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.25fr]">
          <Reveal>
            <div className="flex h-full flex-col gap-5">
              <div className="rounded-3xl border border-ink-100 bg-gradient-to-br from-ink-950 to-ink-800 p-8 text-white shadow-soft">
                <CalendarCheck2 className="h-9 w-9 text-aqua-300" />
                <h3 className="mt-5 font-display text-xl font-bold">Why book online?</h3>
                <ul className="mt-5 space-y-3 text-sm text-ink-100/85">
                  {[
                    'Instant confirmation with a booking reference',
                    'Live slot availability — no double bookings',
                    'Free first consultation for new patients',
                    'Reschedule with a single phone call',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-mint-300" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-ink-100 bg-ink-50/70 p-6">
                <span className="flex items-center gap-2 text-sm font-bold text-ink-950">
                  <Clock className="h-4 w-4 text-aqua-600" />
                  Clinic hours
                </span>
                <p className="mt-2 text-sm text-ink-600">{clinic.hours}</p>
                <p className="text-sm text-ink-400">{clinic.closed}</p>
                <span className="mt-4 flex items-center gap-2 text-sm font-bold text-ink-950">
                  <Phone className="h-4 w-4 text-aqua-600" />
                  Need help?
                </span>
                <a href={clinic.phoneHref} className="mt-1 block text-sm text-aqua-700 underline">
                  {clinic.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-3 rounded-3xl border border-aqua-200 bg-aqua-50 p-5 text-sm text-ink-700">
                <ShieldCheck className="h-6 w-6 shrink-0 text-aqua-600" />
                Your details stay with the clinic and are used only to confirm your appointment.
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative rounded-3xl border border-ink-100 bg-white p-6 shadow-soft sm:p-8">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-6 text-center"
                  >
                    <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-mint-400/15 text-mint-400">
                      <CheckCircle2 className="h-11 w-11" />
                    </div>
                    <h3 className="mt-6 font-display text-2xl font-extrabold text-ink-950">
                      Appointment confirmed
                    </h3>
                    <p className="mt-2 text-sm text-ink-500">
                      Thank you, {success.name}. We look forward to seeing you.
                    </p>
                    <dl className="mx-auto mt-8 max-w-sm space-y-3 rounded-2xl border border-ink-100 bg-ink-50/60 p-6 text-left text-sm">
                      <div className="flex justify-between gap-4">
                        <dt className="text-ink-500">Reference</dt>
                        <dd className="font-bold text-ink-950">{success.id}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-ink-500">Treatment</dt>
                        <dd className="text-right font-semibold text-ink-900">{success.treatment}</dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-ink-500">Date</dt>
                        <dd className="text-right font-semibold text-ink-900">
                          {prettyDate(success.date)}
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-ink-500">Time</dt>
                        <dd className="font-semibold text-ink-900">{prettyTime(success.time)}</dd>
                      </div>
                    </dl>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                      <button onClick={resetAll} className="btn-primary">
                        <Sparkles className="h-4 w-4" />
                        Book another appointment
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={submit}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field icon={User} label="Full name">
                        <input
                          required
                          value={form.name}
                          onChange={(e) => update('name', e.target.value)}
                          placeholder="e.g. Anjali Das"
                          className="input"
                        />
                      </Field>
                      <Field icon={Phone} label="Phone number">
                        <input
                          required
                          value={form.phone}
                          onChange={(e) => update('phone', e.target.value)}
                          placeholder="+91 98640 00000"
                          className="input"
                        />
                      </Field>
                    </div>

                    <Field icon={Mail} label="Email address">
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        placeholder="you@example.com"
                        className="input"
                      />
                    </Field>

                    <Field icon={StethoscopeIcon} label="Treatment">
                      <select
                        required
                        value={form.treatment}
                        onChange={(e) => update('treatment', e.target.value)}
                        className="input"
                      >
                        <option value="" disabled>
                          Select a treatment
                        </option>
                        {services.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title} — {s.price}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field icon={CalendarDays} label="Preferred date">
                      <input
                        required
                        type="date"
                        min={min}
                        value={form.date}
                        onChange={(e) => update('date', e.target.value)}
                        className="input"
                      />
                    </Field>

                    <div>
                      <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-500">
                        <Clock className="h-3.5 w-3.5 text-aqua-600" />
                        Available time slots
                      </span>

                      {!form.date && (
                        <p className="rounded-2xl bg-ink-50 px-4 py-3 text-sm text-ink-500">
                          Select a date to see available slots.
                        </p>
                      )}

                      {form.date && loadingSlots && (
                        <p className="flex items-center gap-2 rounded-2xl bg-ink-50 px-4 py-3 text-sm text-ink-500">
                          <Loader2 className="h-4 w-4 animate-spin" /> Checking availability…
                        </p>
                      )}

                      {form.date && !loadingSlots && closed && (
                        <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                          The clinic is closed on {prettyDate(form.date)}. Please choose another day.
                        </p>
                      )}

                      {form.date && !loadingSlots && !closed && (
                        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                          {slots.map((s) => {
                            const selected = form.time === s.time;
                            return (
                              <button
                                type="button"
                                key={s.time}
                                disabled={!s.available}
                                onClick={() => update('time', s.time)}
                                className={`rounded-xl border px-2 py-2.5 text-xs font-semibold transition-all ${
                                  selected
                                    ? 'border-transparent bg-gradient-to-br from-aqua-400 to-ink-600 text-white shadow-glow'
                                    : s.available
                                      ? 'border-ink-100 bg-white text-ink-700 hover:border-aqua-300 hover:bg-aqua-50'
                                      : 'cursor-not-allowed border-ink-100 bg-ink-50 text-ink-300 line-through'
                                }`}
                              >
                                {prettyTime(s.time)}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <Field icon={MessageSquare} label="Notes (optional)">
                      <textarea
                        rows={3}
                        value={form.notes}
                        onChange={(e) => update('notes', e.target.value)}
                        placeholder="Tell us about any pain, sensitivity or previous treatment."
                        className="input resize-none"
                      />
                    </Field>

                    {errors.length > 0 && (
                      <div className="flex flex-col gap-1 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {errors.map((err) => (
                          <span key={err} className="flex items-start gap-2">
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                            {err}
                          </span>
                        ))}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary btn-lg w-full disabled:opacity-70"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" /> Confirming…
                        </>
                      ) : (
                        <>
                          <CalendarCheck2 className="h-5 w-5" /> Confirm appointment
                        </>
                      )}
                    </button>
                    <p className="text-center text-xs text-ink-400">
                      By booking you agree to be contacted about your appointment.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-500">
        <Icon className="h-3.5 w-3.5 text-aqua-600" />
        {label}
      </span>
      {children}
    </label>
  );
}

function StethoscopeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 3v6a5 5 0 0 0 10 0V3" />
      <path d="M9 14v2a5 5 0 0 0 9 3" />
      <circle cx="19" cy="14" r="2" />
      <path d="M6 3h2M11 3h2" />
    </svg>
  );
}
