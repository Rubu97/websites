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

/*
 * Real photographs served live from the school's Google Maps listing
 * (uploaded by Local Guide "Nibed D" and other visitors). The visitor's
 * browser loads them directly from Google's CDN, so they always match
 * the listing. Every photo is credited back to its Maps page.
 */
export const coverPhoto =
  'https://lh3.googleusercontent.com/grass-cs/AABkmLeCg-QCTYTWTRZlUKf_hloXBd36Jl1SIj0UIRwaa9zli8vSHc9LJiLzxCToDvjYeuFQX1C1xUhthfHs8OnTfeA8tn19qPSknK6DY2-z8acrCmbNnwn5mgbEemojjsIWhs-0gLQ1=w1600-h1200-k-no';

export const streetViewPhoto =
  'https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=JPRMpsKtD54I8Bi3mJkGdQ&cb_client=search.gws-prod.grass&w=1280&h=960&yaw=350.58517&pitch=0&thumbfov=100';

const gpsPhoto = (id: string) => `https://lh3.googleusercontent.com/gps-cs/${id}=w1200-h1200-p-k-no`;

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
  credit?: string;
  span?: string;
};

export const gallery: GalleryItem[] = [
  {
    src: coverPhoto,
    title: 'Ganesh Das High School, Kanchan Nagar',
    tag: 'Cover photo',
    credit: 'Nibed D · Google Maps',
    span: 'md:col-span-2 md:row-span-2',
  },
  {
    src: gpsPhoto('AAjk-CMOA-Cv0zD3o5NTtT-AE5tgvANHmuT_yM6OObvxQWA1Wr1Bjl0UEa9zxU25d1Xe09z52wYe5OOzAW5naSTkP6VIWWDaQCtYUZcoTAQGTXdQblzR7hdlkinzrfokzODdWzf0_jZk'),
    title: 'Ganesh Das High School',
    tag: 'Photo',
    credit: 'Nibed D · Google Maps',
  },
  {
    src: gpsPhoto('AAjk-COgQYIw4jaKXOtd6ygaDW6hwsa2a3Dd-yi2V9N1zRzM1EjyLJpV7isyJ_h5lcyBvuaWlJ1zDXYO89MAJdysJJ9l4Y5FIeeRZnUtPnNXCce7AMATJJH3fj283CqlB8prfcVsuieZ'),
    title: 'Ganesh Das High School',
    tag: 'Photo',
    credit: 'Nibed D · Google Maps',
  },
  {
    src: gpsPhoto('AAjk-CNsoEIuqKi_2XkKrAHeLCE659PYA78qIz8KbgCP-c4HzAfHZrXWDt33Nk6c22StO78_Z7qKKv2mchlOxJW_YZ-tor6bnDJMYb64M6pvI_Ai7YQSVmIh_dyWQYJgsu8ZEDc9RVYz'),
    title: 'Ganesh Das High School',
    tag: 'Photo',
    credit: 'Nibed D · Google Maps',
  },
  {
    src: gpsPhoto('AAjk-CPjnbr_HUJMpyLTgGR_qpYxlMsSojToSPpYzQhbaNYdbRbbxdGwwIVn9CAa7cFEePPscBMj0D8r8c9w4MlTVYFo28vi86mcMMK68rI9YZ7eZOF8ifEDeVpvY7SRv62dZsTccE-a'),
    title: 'Ganesh Das High School',
    tag: 'Photo',
    credit: 'Nibed D · Google Maps',
  },
  {
    src: gpsPhoto('AAjk-CNA_9LgwUmFNmbZ2cBDgucJoBUfTI7oTD04hm8Y8VRhR8wooKWDommOWNIHWs-4QcIS0JhJyPkaedrqXlGppg4j5xd1BY7jmbpFx_c4PuW4jFoWUcaHrtbtnHOyhY24Upk7_YfvOQ'),
    title: 'Ganesh Das High School',
    tag: 'Photo',
    credit: 'Nibed D · Google Maps',
  },
  {
    src: gpsPhoto('AAjk-CMURCf7BoixLfALeQFyNXFtEx80pjuztLJWY6ueDu9FUqiQc5lMUo_m-3Iu3Vlp-HaGfDzKpSQf-fXnEpJ5wxAJVS-7-GHM7D3tDFeigvU50w_brzMM3pq6cuaOXAvvu9Tj6YfSBQ'),
    title: 'Ganesh Das High School',
    tag: 'Photo',
    credit: 'Nibed D · Google Maps',
  },
  {
    src: gpsPhoto('AAjk-CM9Zy6-EAnq1nSjki-Rrypv13YMpvOMy2f3fKWGAeAr14wxZapqGWkSRE8JY3SMC8Fuz3xVkiNQBm2scgVEzxyxnJSTOPefiANGEjhM7qg0VFlrYt-uY1yUrZjyUtTUHfQ7V6nx'),
    title: 'Ganesh Das High School',
    tag: 'Photo',
    credit: 'Nibed D · Google Maps',
  },
  {
    src: streetViewPhoto,
    title: 'School frontage',
    tag: 'Street View',
    credit: 'Google Street View',
  },
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
