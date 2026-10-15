export const clinic = {
  name: 'Smile Care Dental Clinic',
  localName: 'স্মাইল কেয়ার ডেন্টাল ক্লিনিক শুয়ালকুচি',
  town: 'Sualkuchi, Assam',
  address: 'Hospital Road, Noh-Para, Sualkuchi, Assam 781103',
  plusCode: '5HF9+JV Sualkuchi, Assam',
  rating: 5.0,
  reviewCount: 3,
  hours: 'Mon – Sat · 9:00 AM – 7:00 PM',
  closed: 'Sunday closed',
  mapsQuery: 'Smile Care Dental Clinic, Hospital Road, Noh-Para, Sualkuchi, Assam 781103',
  phoneDisplay: '+91 98640 00000',
  phoneHref: 'tel:+919864000000',
  email: 'care@smilecaresualkuchi.in',
};

export const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  clinic.mapsQuery
)}&output=embed`;
export const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  clinic.mapsQuery
)}`;

export type Service = {
  id: string;
  title: string;
  blurb: string;
  duration: string;
  price: string;
};

export const services: Service[] = [
  {
    id: 'checkup',
    title: 'Dental Check-up',
    blurb: 'Complete oral examination, digital diagnosis and a personalised treatment plan.',
    duration: '30 min',
    price: 'Free',
  },
  {
    id: 'cleaning',
    title: 'Teeth Cleaning & Scaling',
    blurb: 'Professional scaling and polishing to remove tartar, stains and plaque build-up.',
    duration: '45 min',
    price: 'From Rs. 800',
  },
  {
    id: 'whitening',
    title: 'Teeth Whitening',
    blurb: 'Safe, shade-guided whitening for a brighter, camera-ready smile.',
    duration: '60 min',
    price: 'From Rs. 4,000',
  },
  {
    id: 'rct',
    title: 'Root Canal Treatment',
    blurb: 'Painless single and multi-visit RCT to save infected teeth and stop the ache.',
    duration: '90 min',
    price: 'From Rs. 3,500',
  },
  {
    id: 'filling',
    title: 'Fillings & Restoration',
    blurb: 'Tooth-coloured composite fillings that blend naturally with your enamel.',
    duration: '45 min',
    price: 'From Rs. 700',
  },
  {
    id: 'crown',
    title: 'Crown & Bridge',
    blurb: 'Durable ceramic crowns and bridges to restore strength and appearance.',
    duration: '60 min',
    price: 'From Rs. 3,000',
  },
  {
    id: 'extraction',
    title: 'Painless Extraction',
    blurb: 'Gentle removal of decayed or impacted teeth with modern anaesthesia.',
    duration: '30 min',
    price: 'From Rs. 500',
  },
  {
    id: 'braces',
    title: 'Braces & Aligners',
    blurb: 'Orthodontic assessment and treatment for straighter, healthier teeth.',
    duration: '45 min',
    price: 'From Rs. 25,000',
  },
  {
    id: 'implant',
    title: 'Dental Implants',
    blurb: 'Permanent tooth replacement that looks, feels and functions like the real thing.',
    duration: '90 min',
    price: 'From Rs. 20,000',
  },
  {
    id: 'kids',
    title: 'Kids Dentistry',
    blurb: 'Friendly, fear-free paediatric care that keeps little smiles healthy.',
    duration: '30 min',
    price: 'From Rs. 500',
  },
];

export type Review = {
  name: string;
  meta: string;
  when: string;
  text: string;
  stars: number;
};

export const reviews: Review[] = [
  {
    name: 'Rakesh Kalita',
    meta: 'Local Guide · 20 reviews',
    when: '2 years ago',
    text: 'Contact number share koribosun',
    stars: 5,
  },
  {
    name: 'Dharmendra Nath',
    meta: 'Google review',
    when: '9 years ago',
    text: 'nice',
    stars: 5,
  },
  {
    name: 'Kanak Baruah',
    meta: 'Google review',
    when: '9 years ago',
    text: '',
    stars: 5,
  },
];

export const timeSlots = (() => {
  const slots: string[] = [];
  for (let h = 9; h < 19; h++) {
    for (let m = 0; m < 60; m += 30) {
      slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }
  return slots;
})();
