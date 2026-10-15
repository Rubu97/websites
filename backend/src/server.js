import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_DIR = path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'appointments.json');

app.use(cors());
app.use(express.json());

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, '[]', 'utf-8');

const TREATMENTS = [
  { id: 'checkup', name: 'Dental Check-up & Consultation', duration: 30, price: 'Free' },
  { id: 'cleaning', name: 'Teeth Cleaning & Scaling', duration: 45, price: 'From Rs. 800' },
  { id: 'filling', name: 'Tooth Filling / Restoration', duration: 45, price: 'From Rs. 700' },
  { id: 'whitening', name: 'Teeth Whitening', duration: 60, price: 'From Rs. 4,000' },
  { id: 'rct', name: 'Root Canal Treatment', duration: 90, price: 'From Rs. 3,500' },
  { id: 'crown', name: 'Crown & Bridge', duration: 60, price: 'From Rs. 3,000' },
  { id: 'extraction', name: 'Painless Tooth Extraction', duration: 30, price: 'From Rs. 500' },
  { id: 'braces', name: 'Braces & Aligners Consultation', duration: 45, price: 'From Rs. 25,000' },
  { id: 'implant', name: 'Dental Implants', duration: 90, price: 'From Rs. 20,000' },
  { id: 'kids', name: "Kids / Pediatric Dentistry", duration: 30, price: 'From Rs. 500' },
];

const OPEN_HOUR = 9; // 9 AM
const CLOSE_HOUR = 19; // 7 PM
const SLOT_MINUTES = 30;

function readAppointments() {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function writeAppointments(list) {
  fs.writeFileSync(DB_FILE, JSON.stringify(list, null, 2), 'utf-8');
}

function buildSlots() {
  const slots = [];
  for (let h = OPEN_HOUR; h < CLOSE_HOUR; h++) {
    for (let m = 0; m < 60; m += SLOT_MINUTES) {
      const hh = String(h).padStart(2, '0');
      const mm = String(m).padStart(2, '0');
      slots.push(`${hh}:${mm}`);
    }
  }
  return slots;
}

function isValidDate(str) {
  return /^\d{4}-\d{2}-\d{2}$/.test(str) && !Number.isNaN(Date.parse(str));
}

function isValidEmail(str) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
}

function isValidPhone(str) {
  return /^[0-9+\-\s()]{7,20}$/.test(str);
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Smile Care Dental Clinic API', time: new Date().toISOString() });
});

app.get('/api/services', (_req, res) => {
  res.json({ treatments: TREATMENTS });
});

app.get('/api/availability', (req, res) => {
  const { date } = req.query;
  if (!date || !isValidDate(date)) {
    return res.status(400).json({ error: 'A valid date (YYYY-MM-DD) is required.' });
  }
  const booked = readAppointments()
    .filter((a) => a.date === date && a.status !== 'cancelled')
    .map((a) => a.time);
  const slots = buildSlots().map((time) => ({ time, available: !booked.includes(time) }));
  const isSunday = new Date(`${date}T00:00:00`).getDay() === 0;
  res.json({ date, closed: isSunday, slots });
});

app.post('/api/appointments', (req, res) => {
  const { name, phone, email, treatment, date, time, notes } = req.body || {};
  const errors = [];

  if (!name || String(name).trim().length < 2) errors.push('Please provide your full name.');
  if (!phone || !isValidPhone(String(phone))) errors.push('Please provide a valid phone number.');
  if (!email || !isValidEmail(String(email))) errors.push('Please provide a valid email address.');
  if (!treatment || !TREATMENTS.some((t) => t.id === treatment)) errors.push('Please select a valid treatment.');
  if (!date || !isValidDate(date)) errors.push('Please select a valid date.');
  if (!time || !buildSlots().includes(time)) errors.push('Please select a valid time slot.');

  if (errors.length) return res.status(422).json({ error: 'Validation failed', details: errors });

  const day = new Date(`${date}T00:00:00`).getDay();
  if (day === 0) return res.status(409).json({ error: 'The clinic is closed on Sundays. Please choose another day.' });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (new Date(`${date}T00:00:00`) < today) {
    return res.status(409).json({ error: 'Please choose today or a future date.' });
  }

  const appointments = readAppointments();
  const clash = appointments.find(
    (a) => a.date === date && a.time === time && a.status !== 'cancelled'
  );
  if (clash) {
    return res.status(409).json({ error: 'That time slot has just been booked. Please pick another slot.' });
  }

  const treatmentInfo = TREATMENTS.find((t) => t.id === treatment);
  const record = {
    id: `SCD-${Date.now().toString(36).toUpperCase()}`,
    name: String(name).trim(),
    phone: String(phone).trim(),
    email: String(email).trim().toLowerCase(),
    treatment: treatmentInfo.name,
    treatmentId: treatmentInfo.id,
    date,
    time,
    notes: (notes || '').toString().trim().slice(0, 500),
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };

  appointments.push(record);
  writeAppointments(appointments);

  res.status(201).json({
    message: 'Appointment confirmed.',
    appointment: {
      id: record.id,
      name: record.name,
      treatment: record.treatment,
      date: record.date,
      time: record.time,
    },
  });
});

app.get('/api/appointments', (_req, res) => {
  const list = readAppointments()
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`))
    .map((a) => ({
      id: a.id,
      name: a.name,
      phone: a.phone,
      email: a.email,
      treatment: a.treatment,
      date: a.date,
      time: a.time,
      status: a.status,
      createdAt: a.createdAt,
    }));
  res.json({ count: list.length, appointments: list });
});

app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

app.listen(PORT, () => {
  console.log(`Smile Care Dental Clinic API running on http://localhost:${PORT}`);
});
