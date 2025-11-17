// components/ReviewsCarousel.jsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';

const REVIEWS = [
  { name: 'Venu Reddy', rating: 5, date: 'Oct 2025', title: 'Excellent service!', text: 'Car was exceptionally clean and the driver arrived exactly on time. The journey to Tirumala was smooth and relaxing. Perfect for families and first-time travellers.', extra: 'Loved how the driver explained temple routes politely.' },
  { name: 'Priya', rating: 5, date: 'Sep 2025', title: 'Very comfortable ride', text: 'The car was in great condition with comfortable seating. The driver was courteous and played soft music on request. A very pleasant experience overall.', extra: 'Perfect for airport pickups in busy hours.' },
  { name: 'Rahul Verma', rating: 4, date: 'Aug 2025', title: 'Value for money', text: 'Affordable pricing with professional service. Pickup was on time and the car smelled fresh. Just a minor delay during drop, otherwise wonderful.', extra: 'Reliable option for long-distance travel.' },
  { name: 'Sneha Iyer', rating: 5, date: 'Jul 2025', title: 'Very helpful staff', text: 'Driver helped with luggage, suggested darshan timings and even guided us near the temple area. Excellent professionalism from the team.', extra: 'Felt very safe throughout the journey.' },
  { name: 'Vikram Patel', rating: 4, date: 'Jun 2025', title: 'Smooth and peaceful', text: 'The AC was perfect and the driving style was very smooth. Great for elderly passengers. Highly recommended for Tirupati to Kalahasti trips.', extra: 'Quiet, comfortable and premium car interiors.' },
  { name: 'Anjali Gupta', rating: 5, date: 'May 2025', title: 'Safe and reliable', text: 'As a solo woman traveller, I felt extremely safe throughout the journey. Driver verified locations patiently. Appreciate the honesty and dependability.', extra: 'Trusted service for early morning rides.' },
  { name: 'Suresh Kumar', rating: 5, date: 'Apr 2025', title: 'Perfect for families', text: 'Our XL6 was spacious and perfect for a group of 6. Kids loved the smooth AC and music. Very professional service.', extra: 'Highly recommended for group temple tours.' },
  { name: 'Meera Joshi', rating: 4, date: 'Mar 2025', title: 'Good overall experience', text: 'Polite driver and neat car. The trip to Tirupati city was comfortable. Would book again!', extra: 'Affordable compared to other agencies.' },
  { name: 'Aditya Singh', rating: 5, date: 'Feb 2025', title: 'Prompt & professional', text: 'Customer support was fast and responsive. Driver arrived early and handled the luggage carefully. Excellent experience overall.', extra: 'Perfect for business trips.' },
  { name: 'Rekha Nair', rating: 5, date: 'Jan 2025', title: 'Highly recommended', text: 'Booking was smooth and hassle-free. The vehicle was spotless and the ride extremely comfortable.', extra: 'Would confidently book again.' }
];

export default function ReviewsCarousel({
  autoPlayInterval = 6000, // ms
  transitionDuration = 0.8 // seconds
}) {
  const length = REVIEWS.length;
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const hoveringRef = useRef(false);
  const containerRef = useRef(null);

  // Move to index with wrap
  const goTo = useCallback((i) => {
    setIndex(((i % length) + length) % length);
  }, [length]);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Autoplay
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      if (!hoveringRef.current) {
        goTo((i => i + 1)(index)); // advance
      }
    }, autoPlayInterval);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlayInterval, index, goTo]);

  // Pause on hover/focus
  const handleMouseEnter = () => (hoveringRef.current = true);
  const handleMouseLeave = () => (hoveringRef.current = false);
  const handleFocus = () => (hoveringRef.current = true);
  const handleBlur = () => (hoveringRef.current = false);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  // Swipe handlers with momentum behavior
  const handlers = useSwipeable({
    onSwipedLeft: (eventData) => {
      // if fast swipe, skip extra
      const vel = Math.abs(eventData.velocity || 0);
      if (vel > 1.2) goTo(index + 2);
      else goTo(index + 1);
    },
    onSwipedRight: (eventData) => {
      const vel = Math.abs(eventData.velocity || 0);
      if (vel > 1.2) goTo(index - 2);
      else goTo(index - 1);
    },
    trackMouse: true,
    delta: 20,
    preventScrollOnSwipe: true
  });

  // Smooth animate props
  const motionProps = {
    initial: { opacity: 0, x: 40, scale: 0.98 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: -40, scale: 0.98 },
    transition: { duration: transitionDuration, ease: 'easeInOut' }
  };

  return (
    <section
      className="max-w-4xl px-4 py-10 mx-auto"
      aria-roledescription="carousel"
    >
      <header className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 md:text-3xl">CUSTOMER REVIEWS</h3>
          <p className="max-w-xl mt-1 text-sm text-gray-600">
            Real-like reviews from travellers who booked with Tirupati Shankar Travels. Swipe or use arrows to navigate.
          </p>
        </div>

        <div className="items-center hidden gap-3 sm:flex">
          <button
            onClick={() => { prev(); }}
            aria-label="Previous review"
            className="p-2 bg-white border rounded-full shadow hover:shadow-md"
          >
            <ChevronLeft className="w-4 h-4 text-gray-700" />
          </button>

          <button
            onClick={() => { next(); }}
            aria-label="Next review"
            className="p-2 bg-white border rounded-full shadow hover:shadow-md"
          >
            <ChevronRight className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </header>

      <div
        ref={containerRef}
        {...handlers}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="relative overflow-hidden rounded-2xl"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            {...motionProps}
            className="w-full"
          >
            <article className="bg-white p-6 rounded-2xl shadow-xl border flex flex-col gap-4 md:gap-5 min-h-[250px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center text-lg font-bold text-white rounded-full shadow-md w-14 h-14 bg-gradient-to-br from-indigo-500 to-pink-500">
                    {REVIEWS[index].name.split(' ').map(n => n[0]).slice(0,2).join('')}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-gray-900">{REVIEWS[index].name}</p>
                    <p className="text-xs text-gray-500">{REVIEWS[index].date} • Verified customer</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 px-3 py-1 text-sm font-semibold text-yellow-700 bg-yellow-100 rounded-full">
                  <Star className="w-4 h-4" /> {REVIEWS[index].rating}.0
                </div>
              </div>

              <div>
                <h4 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                  <Quote className="w-5 h-5 text-indigo-500" /> {REVIEWS[index].title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{REVIEWS[index].text}</p>
                <p className="mt-2 text-xs italic text-gray-500">{REVIEWS[index].extra}</p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-gray-500">Verified traveler</div>
                <a
                  className="px-3 py-1 text-xs text-white transition bg-green-600 rounded-full shadow-sm hover:shadow-md"
                  href={`https://wa.me/919177563070?text=${encodeURIComponent(`Hi, I saw ${REVIEWS[index].name}'s review and need help with booking.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Need help
                </a>
              </div>
            </article>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to review ${i + 1}`}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${i === index ? 'bg-indigo-600 scale-110' : 'bg-gray-300'}`}
            />
          ))}
        </div>

        {/* Mobile arrows */}
        <div className="absolute -translate-y-1/2 left-3 top-1/2 sm:hidden">
          <button onClick={() => prev()} className="p-2 bg-white border rounded-full shadow"><ChevronLeft /></button>
        </div>
        <div className="absolute -translate-y-1/2 right-3 top-1/2 sm:hidden">
          <button onClick={() => next()} className="p-2 bg-white border rounded-full shadow"><ChevronRight /></button>
        </div>
      </div>
    </section>
  );
}
