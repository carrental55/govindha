'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Car, MapPin, Users, Cog, Fuel, Star, X } from 'lucide-react';

const cars = [
  {
    id: 1,
    name: 'Tesla Model 3',
    year: 2023,
    location: 'San Francisco',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Electric',
    price: 89, // price per km
    rating: 4.8,
    badges: ['Autopilot', 'Premium Audio', '+2 more'],
    type: 'Electric',
    status: 'Available',
    image: '/assets/tesla.jpg',
  },
  {
    id: 2,
    name: 'BMW X5',
    year: 2023,
    location: 'New York',
    seats: 7,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    price: 149,
    rating: 4.7,
    badges: ['Leather Seats', 'Navigation', '+2 more'],
    type: 'Luxury SUV',
    status: 'Available',
    image: '/assets/bmw.jpg',
  },
  {
    id: 3,
    name: 'Audi A4',
    year: 2023,
    location: 'Los Angeles',
    seats: 5,
    transmission: 'Automatic',
    fuel: 'Gasoline',
    price: 79,
    rating: 4.6,
    badges: ['Virtual Cockpit', 'Heated Seats', '+2 more'],
    type: 'Sedan',
    status: 'Available',
    image: '/assets/audi.jpg',
  },
];

const CarsListPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [bookingPopup, setBookingPopup] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [distanceText, setDistanceText] = useState('');
  const [duration, setDuration] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  // ✅ Populate fields from URL params and apply ScrollReveal animations
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setPickup(params.get('pickup') || '');
      setDrop(params.get('drop') || '');
      setDate(params.get('date') || '');
      setTime(params.get('time') || '');
      setDistanceText(params.get('distance') || '');
      setDuration(params.get('duration') || '');

      // Scroll animation
      const ScrollReveal = require('scrollreveal').default;
      const sr = ScrollReveal();
      sr.reveal('.head-reveal', { distance: '0px', duration: 1500, scale: 0.9 });
      sr.reveal('.reveal-y', { origin: 'bottom', distance: '60px', duration: 1200, interval: 150 });
    }
  }, []);

  // ✅ Handle "Book Now" click
  const handleBookNow = (car) => {
    setSelectedCar(car);
    setShowForm(true);
    // Calculate total price immediately if distance exists
    const distanceInKm = parseFloat(distanceText.replace(/[^\d.]/g, '')) || 0;
    setTotalPrice((distanceInKm * car.price).toFixed(2));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ✅ Handle Booking Form submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCar) return;

    const distanceInKm = parseFloat(distanceText.replace(/[^\d.]/g, '')) || 0;
    const calculatedPrice = (distanceInKm * selectedCar.price).toFixed(2);

    const bookingData = {
      carName: selectedCar.name,
      name,
      phone,
      pickup,
      drop,
      date,
      time,
      distance: distanceText,
      duration,
      price: calculatedPrice,
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      if (res.ok) {
        setBookingPopup(true);
        setShowForm(false);
        setName('');
        setPhone('');
      } else {
        alert('Booking failed: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error(error);
      alert('Booking failed. Please try again later.');
    }
  };

  return (
    <section className="px-4 py-20 bg-gray-50 sm:px-6 lg:px-20">
      {/* ✅ Booking Popup */}
      {bookingPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md p-8 text-center bg-white shadow-lg rounded-xl">
            <button
              onClick={() => setBookingPopup(false)}
              className="absolute text-gray-500 top-3 right-3 hover:text-gray-800"
            >
              <X />
            </button>
            <h2 className="mb-4 text-2xl font-bold text-green-600">Booking Confirmed!</h2>
            <p className="text-gray-700">Our driver will call you shortly.</p>
          </div>
        </div>
      )}

      {/* ✅ Car Listing */}
      <div className="mx-auto mb-16 text-center max-w-7xl head-reveal">
        <h1 className="flex items-center justify-center gap-3 text-4xl font-extrabold text-gray-800 sm:text-5xl">
          <Car className="w-12 h-12 text-blue-500" /> Our Cars
        </h1>
        <p className="mt-4 text-lg text-gray-600 sm:text-xl">
          Explore our premium selection of vehicles — handpicked for quality, comfort, and performance.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <div
            key={car.id}
            className="overflow-hidden transition duration-300 transform bg-white shadow-lg rounded-2xl hover:shadow-2xl hover:-translate-y-2 reveal-y"
          >
            <div className="relative w-full h-60">
              <Image src={car.image} alt={car.name} fill className="object-cover w-full h-full" />
              <span className="absolute px-3 py-1 text-xs font-semibold bg-white rounded-full shadow top-3 left-3">
                {car.type}
              </span>
              <span className="absolute px-3 py-1 text-xs text-white bg-green-600 rounded-full top-3 right-3">
                {car.status}
              </span>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-800">{car.name}</h2>
                <div className="flex items-center gap-1 font-medium text-yellow-500">
                  <Star className="w-5 h-5" /> {car.rating}
                </div>
              </div>

              <p className="mb-3 text-sm text-gray-500">{car.year}</p>

              <div className="flex items-center gap-3 mb-3 text-gray-600">
                <MapPin className="w-4 h-4 text-blue-500" />
                <span>{car.location}</span>
              </div>

              <div className="flex flex-wrap gap-3 mb-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-blue-500" /> {car.seats} seats
                </span>
                <span className="flex items-center gap-1">
                  <Cog className="w-4 h-4 text-blue-500" /> {car.transmission}
                </span>
                <span className="flex items-center gap-1">
                  <Fuel className="w-4 h-4 text-blue-500" /> {car.fuel}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {car.badges.map((badge, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs font-semibold bg-gray-100 border border-gray-200 rounded-full"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-blue-600">
                  ₹{car.price}
                  <span className="text-sm font-normal text-gray-500">/km</span>
                </p>
                <button
                  onClick={() => handleBookNow(car)}
                  className="px-4 py-2 font-medium text-white transition duration-300 bg-green-600 rounded-lg hover:bg-green-700"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Booking Form */}
      {showForm && selectedCar && (
        <div className="max-w-lg p-6 mx-auto mt-12 bg-white shadow-md rounded-xl">
          <h2 className="mb-4 text-2xl font-semibold text-center text-blue-700">
            Booking Details
          </h2>
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Pickup Location</label>
              <input
                type="text"
                readOnly
                value={pickup}
                className="w-full p-2 bg-gray-100 border border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Drop-off Location</label>
              <input
                type="text"
                readOnly
                value={drop}
                className="w-full p-2 bg-gray-100 border border-gray-300 rounded"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-1 font-medium">Date</label>
                <input
                  type="text"
                  readOnly
                  value={date}
                  className="w-full p-2 bg-gray-100 border border-gray-300 rounded"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium">Time</label>
                <input
                  type="text"
                  readOnly
                  value={time}
                  className="w-full p-2 bg-gray-100 border border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="mt-4 text-gray-800">
              <p>
                <strong>Distance:</strong> {distanceText}
              </p>
              <p>
                <strong>Duration:</strong> {duration}
              </p>
              <p>
                <strong>Total Price:</strong> {totalPrice} ₹
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default CarsListPage;
