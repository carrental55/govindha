'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin, Calendar, Clock, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const pickupRef = useRef(null);
  const dropRef = useRef(null);
  const router = useRouter();

  const pickupPlace = useRef(null);
  const dropPlace = useRef(null);

  const [pickupText, setPickupText] = useState('');
  const [dropText, setDropText] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [apiLoaded, setApiLoaded] = useState(false);

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
      componentRestrictions: { country: 'IN' }, // Restrict to India
    };

    const pickupAutocomplete = new window.google.maps.places.Autocomplete(pickupRef.current, options);
    const dropAutocomplete = new window.google.maps.places.Autocomplete(dropRef.current, options);

    pickupAutocomplete.addListener('place_changed', () => {
      const place = pickupAutocomplete.getPlace();
      pickupPlace.current = place;
      setPickupText(place.formatted_address || place.name);
    });

    dropAutocomplete.addListener('place_changed', () => {
      const place = dropAutocomplete.getPlace();
      dropPlace.current = place;
      setDropText(place.formatted_address || place.name);
    });
  }, [apiLoaded]);

  const handleCalculate = () => {
    if (!pickupPlace.current || !dropPlace.current) {
      alert('Please select both pickup and drop-off locations.');
      return;
    }

    const service = new window.google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [pickupPlace.current.geometry.location],
        destinations: [dropPlace.current.geometry.location],
        travelMode: 'DRIVING',
      },
      (response, status) => {
        if (status === 'OK') {
          const element = response.rows[0].elements[0];
          if (element.status === 'OK') {
            const distanceText = element.distance.text;
            const durationText = element.duration.text;

            setDistance(distanceText);
            setDuration(durationText);

            router.push(
              `/carlist?pickup=${encodeURIComponent(pickupText)}&drop=${encodeURIComponent(
                dropText
              )}&date=${pickupDate}&time=${pickupTime}&distance=${distanceText}&duration=${durationText}`
            );
          } else {
            alert('Could not calculate route.');
          }
        } else {
          alert('Error: ' + status);
        }
      }
    );
  };

  return (
    <section className="px-4 py-16 text-center text-white bg-gradient-to-br from-blue-500 to-blue-700 sm:py-28">
      <h1 className="mb-4 text-4xl font-bold sm:text-5xl hero-reveal">
        Find Your Perfect <span className="text-yellow-400">Rental Car</span>
      </h1>
      <p className="mb-12 text-lg text-gray-200 sm:text-xl hero-reveal">
        Discover amazing deals on quality vehicles. Book now and drive away with confidence.
      </p>

      <div className="grid items-end max-w-4xl grid-cols-1 gap-4 p-4 mx-auto text-black bg-white shadow-lg rounded-xl sm:p-6 sm:grid-cols-5 hero-reveal">
        {/* Pickup Location */}
        <div className="relative z-50">
          <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
            <MapPin className="w-5 h-5" /> Pickup Location
          </label>
          <input
            ref={pickupRef}
            placeholder="Enter pickup location"
            autoComplete="off"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Drop-off Location */}
        <div className="relative z-50">
          <label className="flex items-center gap-2 mb-2 text-sm font-semibold text-gray-700">
            <MapPin className="w-5 h-5" /> Drop-off Location
          </label>
          <input
            ref={dropRef}
            placeholder="Enter drop-off location"
            autoComplete="off"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Pickup Date */}
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

        {/* Pickup Time */}
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

        {/* Search Button */}
        <div>
          <button
            onClick={handleCalculate}
            className="flex items-center justify-center w-full gap-2 p-2 text-white bg-blue-600 rounded hover:bg-blue-800"
          >
            <Search className="w-5 h-5" />
            Search Cars
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
