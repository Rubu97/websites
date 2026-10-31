export const school = {
  name: 'Ganesh Das High School',
  localName: 'গণেশ দাস হাই স্কুল',
  short: 'Ganesh Das H.S.',
  town: 'Sualkuchi, Assam',
  founded: 1954,
  address: '5H97+3MM, Kanchan Nagar, Sualkuchi, Assam 781103, India',
  plusCode: '5H97+3MM',
  udise: '18060501306',
  district: 'Kamrup (Rural), Assam',
  block: 'Hajo Block · Sualkuchi Cluster',
  medium: 'Assamese',
  classes: 'Class VI – X',
  board: 'Assam State Board (SEBA)',
  session: 'April – March',
  management: 'Government · Department of Education',
  type: 'Co-educational',
  location: 'Rural · All-weather road access',
};

export const stats = [
  { value: 1954, suffix: '', label: 'Established', sub: 'Seven decades in Sualkuchi' },
  { value: 411, suffix: '+', label: 'Students', sub: 'Classes VI to X' },
  { value: 21, suffix: '', label: 'Teachers', sub: 'Experienced & dedicated' },
  { value: 350, suffix: '+', label: 'Library Books', sub: 'Reading & book bank' },
  { value: 6, suffix: '', label: 'Classrooms', sub: 'In good condition' },
];

export const mapLinks = {
  photos: 'https://maps.app.goo.gl/ubkQUEnV4XEuiLME9',
  place: 'https://www.google.com/maps/search/?api=1&query=26.1677234%2C91.5641811',
  directions: 'https://www.google.com/maps/dir/?api=1&destination=26.1677234%2C91.5641811',
  embed: 'https://www.google.com/maps?q=26.1677234,91.5641811&z=17&hl=en&output=embed',
};

export const aboutPoints = [
  {
    title: 'Rooted in heritage',
    text: 'Founded in 1954 in Kanchan Nagar, Sualkuchi, our school has grown alongside the silk-weaving families of the Brahmaputra valley.',
  },
  {
    title: 'Learning for everyone',
    text: 'A co-educational government school where every child — regardless of background — gets a fair start and personal attention.',
  },
  {
    title: 'Character & confidence',
    text: 'We balance academics with values, culture and co-curricular work so students leave with integrity as well as marks.',
  },
];

export const journey = [
  {
    stage: 'Stage I',
    classes: 'Class VI – VIII',
    title: 'Middle School',
    text: 'Foundation years that build strong reading, writing, number sense and scientific curiosity in Assamese and English.',
    points: ['Activity-based learning', 'Regular internal assessment', 'Library & reading periods'],
  },
  {
    stage: 'Stage II',
    classes: 'Class IX – X',
    title: 'High School',
    text: 'Board preparation years guided by experienced teachers, focused on the SEBA Class X State Board examinations.',
    points: ['Subject teachers for every paper', 'Pre-board & revision series', 'Career guidance for Class XI'],
  },
];

export const subjects = [
  'Assamese',
  'English',
  'Mathematics',
  'Science',
  'Social Science',
  'MIL / Elective',
  'Health & Physical Education',
  'Art & Work Education',
];

export const facilities = [
  { icon: 'Library', title: 'Library & Book Bank', text: '350+ books, magazines and a book bank that issues titles to students all year.' },
  { icon: 'Flask', title: 'Science & CAL Lab', text: 'A computer-aided learning lab and practical science resources for hands-on study.' },
  { icon: 'Droplets', title: 'Drinking Water', text: 'Functional hand pumps provide safe drinking water inside the campus.' },
  { icon: 'Zap', title: 'Electricity', text: 'Full electric connection powers classrooms, lighting and lab equipment.' },
  { icon: 'Users', title: 'Separate Facilities', text: 'Separate, functional toilets for boys and girls maintained by the school.' },
  { icon: 'BookOpen', title: 'Bright Classrooms', text: 'Six classrooms in good condition, built for focus and daily teaching.' },
  { icon: 'ShieldCheck', title: 'Safe Campus', text: 'Enclosed premises with a boundary wall and an all-weather approach road.' },
  { icon: 'HeartHandshake', title: 'Caring Faculty', text: '21 teachers who know every student by name and follow up with guardians.' },
];

export type GalleryItem = {
  src: string;
  title: string;
  tag: string;
  span?: string;
};

export const gallery: GalleryItem[] = [
  { src: '/gallery/building.jpg', title: 'School building & courtyard', tag: 'Campus', span: 'md:col-span-2 md:row-span-2' },
  { src: '/gallery/classroom.jpg', title: 'A typical class in session', tag: 'Academics' },
  { src: '/gallery/library.jpg', title: 'Library & reading room', tag: 'Library' },
  { src: '/gallery/assembly.jpg', title: 'Morning assembly', tag: 'Daily life' },
  { src: '/gallery/lab.jpg', title: 'Computer-aided learning lab', tag: 'Labs' },
  { src: '/gallery/culture.jpg', title: 'Bihu & cultural activities', tag: 'Culture' },
];

/* Sample announcements — replace these with real school notices in this file. */
export type Notice = {
  tag: string;
  date: string;
  title: string;
  text: string;
  pinned?: boolean;
};

export const notices: Notice[] = [
  {
    tag: 'Admission',
    date: '28 Oct 2026',
    pinned: true,
    title: 'Admission enquiries open for the April 2027 session',
    text: 'Guardians may submit the admission enquiry form on this website or collect the offline form from the school office for Class VI entry.',
  },
  {
    tag: 'Examination',
    date: '15 Nov 2026',
    title: 'Half-yearly examinations — Classes VI to X',
    text: 'Datesheets will be shared class-wise through class teachers. Students must carry their school ID to every paper.',
  },
  {
    tag: 'Event',
    date: '14 Nov 2026',
    title: 'Children’s Day cultural programme',
    text: 'An afternoon of music, recitation and dance by our students, followed by the annual prize distribution.',
  },
  {
    tag: 'Meeting',
    date: '05 Nov 2026',
    title: 'Guardians’ meeting with class teachers',
    text: 'Parents and guardians are invited to discuss progress, attendance and examination preparation for the half-yearly term.',
  },
];

export const admissionSteps = [
  {
    step: '01',
    title: 'Send an enquiry',
    text: 'Fill the form on this page or visit the school office with basic details of the student.',
  },
  {
    step: '02',
    title: 'Collect the form',
    text: 'Collect the official admission form and note the documents required for submission.',
  },
  {
    step: '03',
    title: 'Submit documents',
    text: 'Submit the completed form with the listed documents before the announced last date.',
  },
  {
    step: '04',
    title: 'Confirm admission',
    text: 'Meet the head of the institution, complete the interaction and confirm the class allotment.',
  },
];

export const documents = [
  'Birth certificate of the student',
  'Transfer certificate (TC) from the previous school',
  'Mark sheet of the last class passed (Class V)',
  'Aadhaar of the student and guardian',
  'Two recent passport-size photographs',
  'Guardian’s address / ID proof',
];

export const classOptions = [
  'Class VI',
  'Class VII',
  'Class VIII',
  'Class IX',
  'Class X',
  'Transfer / other',
];
