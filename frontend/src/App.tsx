import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarHeart, Phone } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import WhyUs from './components/WhyUs';
import Reviews from './components/Reviews';
import Booking from './components/Booking';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { clinic } from './data';

function FloatingCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3"
        >
          <a
            href={clinic.phoneHref}
            aria-label="Call the clinic"
            className="grid h-12 w-12 place-items-center rounded-full bg-white text-ink-800 shadow-soft ring-1 ring-ink-100 transition-transform hover:-translate-y-0.5"
          >
            <Phone className="h-5 w-5" />
          </a>
          <a href="#booking" className="btn-primary shadow-glow">
            <CalendarHeart className="h-5 w-5" />
            Book Appointment
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <WhyUs />
        <Reviews />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
