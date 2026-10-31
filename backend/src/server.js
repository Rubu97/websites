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
const DB_FILE = path.join(DATA_DIR, 'enquiries.json');

app.use(cors());
app.use(express.json());

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, '[]', 'utf-8');

const CLASS_OPTIONS = [
  'Class VI',
  'Class VII',
  'Class VIII',
  'Class IX',
  'Class X',
  'Transfer / other',
];

function isValidPhone(str) {
  return /^[0-9+\-() ]{7,15}$/.test(str);
}

function readEnquiries() {
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function writeEnquiries(list) {
  fs.writeFileSync(DB_FILE, JSON.stringify(list, null, 2), 'utf-8');
}

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Ganesh Das High School API',
    time: new Date().toISOString(),
  });
});

app.post('/api/enquiries', (req, res) => {
  const { studentName, guardianName, phone, classChoice, message } = req.body || {};
  const errors = [];

  if (!studentName || String(studentName).trim().length < 2) {
    errors.push('Please provide the student’s name.');
  }
  if (!guardianName || String(guardianName).trim().length < 2) {
    errors.push('Please provide the guardian’s name.');
  }
  if (!phone || !isValidPhone(String(phone))) {
    errors.push('Please provide a valid mobile number.');
  }
  if (!classChoice || !CLASS_OPTIONS.includes(String(classChoice))) {
    errors.push('Please select the class the student is applying for.');
  }

  if (errors.length) return res.status(422).json({ error: 'Validation failed', details: errors });

  const record = {
    id: `GDHS-${Date.now().toString(36).toUpperCase()}`,
    studentName: String(studentName).trim().slice(0, 80),
    guardianName: String(guardianName).trim().slice(0, 80),
    phone: String(phone).trim().slice(0, 20),
    classChoice: String(classChoice),
    message: (message || '').toString().trim().slice(0, 500),
    createdAt: new Date().toISOString(),
  };

  const list = readEnquiries();
  list.push(record);
  writeEnquiries(list);

  res.status(201).json({
    message: 'Enquiry recorded. The school office will get in touch.',
    enquiry: {
      id: record.id,
      studentName: record.studentName,
      classChoice: record.classChoice,
    },
  });
});

app.get('/api/enquiries', (_req, res) => {
  const list = readEnquiries()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((e) => ({
      id: e.id,
      studentName: e.studentName,
      guardianName: e.guardianName,
      phone: e.phone,
      classChoice: e.classChoice,
      message: e.message,
      createdAt: e.createdAt,
    }));
  res.json({ count: list.length, enquiries: list });
});

app.use('/api', (_req, res) => {
  res.status(404).json({ error: 'Endpoint not found.' });
});

app.listen(PORT, () => {
  console.log(`Ganesh Das High School API running on http://localhost:${PORT}`);
});
