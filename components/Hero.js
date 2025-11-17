'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin, Calendar, Clock, Search, X, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const CONTACT_NUMBER = '+91 9177563070';
const WHATSAPP_NUMBER_E164 = '919177563070';

const Hero = () => {
  const pickupRef = useRef(null);
  const dropRef = useRef(null);
  const router = useRouter();

  const pickupPlace = useRef(null);
  const dropPlace = useRef(null);

  // Controlled input state
  const [pickupText, setPickupText] = useState('');
  const [dropText, setDropText] = useState('');

  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [apiLoaded, setApiLoaded] = useState(false);

  // UI states
  const [showModal, setShowModal] = useState(false);
  const [pickupSelected, setPickupSelected] = useState(false);
  const [dropSelected, setDropSelected] = useState(false);
  const [calculating, setCalculating] = useState(false);

  // Load Google Maps script
  useEffect(() => {
    if (!document.getElementById('google-maps')) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.id = 'google-maps';
      script.async = true;
      script.defer = true;
      script.onload = () => setApiLoaded(true);
      document.body.appendChild(script);
    } else {
      setApiLoaded(true);
    }
  }, []);

  // Initialize Google Places Autocomplete restricted to India
  useEffect(() => {
    if (!apiLoaded || !window.google) return;

    const options = {
      fields: ['formatted_address', 'geometry', 'name'],
      componentRestrictions: { country: 'IN' },
    };

    // Create autocomplete instances bound to the DOM inputs (they are controlled, but autocomplete works with DOM ref)
    const pickupAutocomplete = new window.google.maps.places.Autocomplete(pickupRef.current, options);
    const dropAutocomplete = new window.google.maps.places.Autocomplete(dropRef.current, options);

    // When user selects a suggestion, update controlled state and mark selected
    pickupAutocomplete.addListener('place_changed', () => {
      const place = pickupAutocomplete.getPlace();
      pickupPlace.current = place;
      const text = place.formatted_address || place.name || '';
      setPickupText(text);
      setPickupSelected(true);
    });

    dropAutocomplete.addListener('place_changed', () => {
      const place = dropAutocomplete.getPlace();
      dropPlace.current = place;
      const text = place.formatted_address || place.name || '';
      setDropText(text);
      setDropSelected(true);
    });

    // Cleanup listeners on unmount
    return () => {
      if (pickupAutocomplete && pickupAutocomplete.removeListener) {
        try { pickupAutocomplete.removeListener('place_changed'); } catch {}
      }
      if (dropAutocomplete && dropAutocomplete.removeListener) {
        try { dropAutocomplete.removeListener('place_changed'); } catch {}
      }
    };
  }, [apiLoaded]);

  const handleCalculate = () => {
    // ensure user actually selected suggestions (not just typed)
    if (!pickupPlace.current || !dropPlace.current) {
      alert('Please select both pickup and drop-off locations from suggestions.');
      return;
    }

    setCalculating(true);

    const service = new window.google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [pickupPlace.current.geometry.location],
        destinations: [dropPlace.current.geometry.location],
        travelMode: 'DRIVING',
      },
      (response, status) => {
        setCalculating(false);

        if (status === 'OK') {
          const element = response.rows[0].elements[0];

          if (element.status === 'OK') {
            const distanceText = element.distance?.text || '';
            const durationText = element.duration?.text || '';
            const distanceMeters = element.distance?.value;

            setDistance(distanceText);
            setDuration(durationText);

            // If distance < 300 km -> show modal and stop
            if (typeof distanceMeters === 'number' && distanceMeters < 300000) {
              setShowModal(true);
              return;
            }

            // Otherwise navigate like before
            router.push(
              `/carlist?pickup=${encodeURIComponent(pickupText)}&drop=${encodeURIComponent(
                dropText
              )}&date=${pickupDate}&time=${pickupTime}&distance=${encodeURIComponent(
                distanceText
              )}&duration=${encodeURIComponent(durationText)}`
            );
          } else {
            alert('Could not calculate route. Please try different locations.');
          }
        } else {
          alert('Error: ' + status);
        }
      }
    );
  };

  const whatsappMessage = encodeURIComponent(
    `Hello, I need assistance with a booking. Pickup: ${pickupText || '[pickup]'}; Drop: ${dropText || '[drop]'}.`
  );
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER_E164}?text=${whatsappMessage}`;

  // Enable search only if user actually selected suggestions and not currently calculating
  const canSearch = pickupSelected && dropSelected && !calculating;

  return (
    <>
      <section className="px-4 py-16 text-center text-white bg-gradient-to-br from-blue-500 to-blue-700 sm:py-28">
        <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
          Find Your Perfect <span className="text-yellow-400">Rental Car</span>
        </h1>

        <p className="mb-12 text-lg text-gray-200 sm:text-xl">
          Discover amazing deals on quality vehicles. Book now and drive away with confidence.
        </p>

        <div className="grid items-end max-w-4xl grid-cols-1 gap-4 p-4 mx-auto text-black bg-white shadow-lg rounded-xl sm:grid-cols-5 sm:p-6">

          {/* Pickup */}
          <div className="relative">
            <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
              <MapPin className="w-5 h-5" /> Pickup Location
            </label>
            <input
              ref={pickupRef}
              value={pickupText}
              onChange={(e) => {
                setPickupText(e.target.value);
                setPickupSelected(false); // mark as not selected until they pick suggestion
                pickupPlace.current = null;
              }}
              placeholder="Enter pickup location"
              autoComplete="off"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Drop */}
          <div className="relative">
            <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
              <MapPin className="w-5 h-5" /> Drop-off Location
            </label>
            <input
              ref={dropRef}
              value={dropText}
              onChange={(e) => {
                setDropText(e.target.value);
                setDropSelected(false);
                dropPlace.current = null;
              }}
              placeholder="Enter drop-off location"
              autoComplete="off"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Date */}
          <div>
            <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
              <Calendar className="w-5 h-5" /> Pickup Date
            </label>
            <input
              type="date"
              className="w-full p-2 border border-gray-300 rounded"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
            />
          </div>

          {/* Time */}
          <div>
            <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
              <Clock className="w-5 h-5" /> Pickup Time
            </label>
            <input
              type="time"
              className="w-full p-2 border border-gray-300 rounded"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
            />
          </div>

          {/* Search */}
          <div>
            <button
              onClick={handleCalculate}
              disabled={!canSearch}
              className={`flex items-center justify-center w-full gap-2 p-2 text-white rounded ${
                canSearch ? 'bg-blue-600 hover:bg-blue-800' : 'bg-blue-300 cursor-not-allowed'
              }`}
              title={!canSearch ? 'Select both pickup and drop suggestions to enable search' : 'Search Cars'}
            >
              <Search className="w-5 h-5" />
              {calculating ? 'Calculating...' : 'Search Cars'}
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
              initial={{ y: -20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute p-2 text-gray-600 rounded-full top-3 right-3 hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="mb-2 text-lg font-semibold">Booking Unavailable</h3>
              <p className="mb-4 text-sm text-gray-600">
                Sorry, we cannot book trips below <strong>300 km</strong>.
              </p>

              <p className="mb-4 text-sm">
                Contact our agent:<br />
                <a href="tel:+919177563070" className="text-blue-600 underline">
                  +91 9177563070
                </a>
              </p>

              <div className="flex justify-end gap-3">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </a>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Hero;
