"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Car, MapPin, Users, Fuel, Star } from 'lucide-react';

const cars = [
  {
    id: 1,
    name: 'SWIFT DZIRE - VXI BLUE COLOUR',
    location: 'Tirupati',
    seats: '4+1',
    fuel: 'Petrol',
    Day: 2000,
    rating: 4.8,
    badges: ['Secure Journey', 'Comfortable', 'Experience Driver'],
    status: 'Available',
    image: '/assets/dzireblue.jpg',
  },
  {
    id: 2,
    name: 'TOYOTA ETIOS - SILVER COLOUR',
    location: 'Tirupati',
    seats: '4+1',
    fuel: 'Diesel',
    Day: 2000,
    rating: 4.7,
    badges: ['Secure Journey', 'Comfortable', 'Experience Driver'],
    status: 'Available',
    image: '/assets/etiossilver.jpg',
  },
  {
    id: 3,
    name: 'INNOVA CRYSTA Z - GRANITE RED',
    location: 'Tirupati',
    seats: '6+1',
    fuel: 'Diesel',
    Day: 3500,
    rating: 4.6,
    badges: ['Secure Journey', 'Comfortable', 'Experience Driver'],
    status: 'Available',
    image: '/assets/innovared.jpg',
  },
  {
    id: 4,
    name: 'SWIFT DZIRE ZXI+ - RED COLOUR',
    location: 'Tirupati',
    seats: '4+1',
    fuel: 'Petrol',
    Day: 2000,
    rating: 4.6,
    badges: ['Secure Journey', 'Comfortable', 'Experience Driver'],
    status: 'Available',
    image: '/assets/swiftdzirered.jpg',
  },
  {
    id: 5,
    name: 'SWIFT DZIRE ZXI+ - WHITE COLOUR',
    location: 'Tirupati',
    seats: '4+1',
    fuel: 'Petrol',
    Day: 2000,
    rating: 4.6,
    badges: ['Secure Journey', 'Comfortable', 'Experience Driver'],
    status: 'Available',
    image: '/assets/swiftdzirewhite.jpg',
  },
  {
    id: 6,
    name: 'MARUTI SUZUKI XL6',
    location: 'Tirupati',
    seats: '5+1',
    fuel: 'Petrol',
    Day: 3000,
    rating: 4.6,
    badges: ['Secure Journey', 'Comfortable', 'Experience Driver'],
    status: 'Available',
    image: '/assets/xl6.jpg',
  },
  {
    id: 7,
    name: 'NEW DZIRE VXI -WHITE COLOUR',
    location: 'Tirupati',
    seats: '4+1',
    fuel: 'Petrol',
    Day: 2000,
    rating: 4.6,
    badges: ['Secure Journey', 'Comfortable', 'Experience Driver'],
    status: 'Available',
    image: '/assets/swiftdzirewhite.jpg',
  },
  {
    id: 8,
    name: 'DZIRE VXI -WHITE COLOUR',
    location: 'Tirupati',
    seats: '4+1',
    fuel: 'Petrol',
    Day: 2000,
    rating: 4.6,
    badges: ['Secure Journey', 'Comfortable', 'Experience Driver'],
    status: 'Available',
    image: '/assets/swiftdzirewhite.jpg',
  },
];

const FeaturedCars = () => {
  const [selectedCar, setSelectedCar] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    pickup: '',
    drop: '',
    date: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const ScrollReveal = require('scrollreveal').default;
      const sr = ScrollReveal();

      sr.reveal('.head-reveal', {
        distance: '0px',
        duration: 1500,
        scale: 0.85,
        easing: 'ease-in-out',
        reset: false,
      });

      sr.reveal('.reveal-y', {
        origin: 'bottom',
        distance: '100px',
        duration: 1500,
        interval: 200,
        easing: 'ease-in-out',
        reset: false,
      });
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookNow = (car) => {
    setSelectedCar(car);
    setFormData({
      name: '',
      phone: '',
      pickup: '',
      drop: '',
      date: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCar) return;

    // Mobile number validation (10-digit Indian number)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert('❌ Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageName: 'Day Package',
          carName: selectedCar.name,
          seats: selectedCar.seats,
          name: formData.name,
          phone: formData.phone,
          pickup: formData.pickup,
          drop: formData.drop,
          price: selectedCar.Day,
          date: formData.date,
          time: '',
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert('✅ Booking confirmed!');
        setSelectedCar(null);
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert('❌ Error submitting booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-4 py-20 bg-gray-100 sm:px-16">
      <div className="mx-auto mb-12 text-center max-w-7xl head-reveal">
        <h2 className="flex items-center justify-center gap-2 mb-2 text-3xl font-bold sm:text-4xl">
          <span className="text-blue-500">
            <Car className="w-12 h-12" />
          </span>
          <span className="text-gray-800">Available Per Day Rent Cars</span>
        </h2>
        <p className="text-lg text-gray-600">
          Discover our handpicked selection of affordable vehicles, perfect for any journey.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <div
            key={car.id}
            className="p-4 transition duration-300 bg-white shadow-md rounded-xl hover:shadow-lg hover:-translate-y-3 reveal-y"
          >
            <div className="relative overflow-hidden">
              <Image
                src={car.image}
                alt={car.name}
                width={500}
                height={300}
                className="object-cover w-full h-48 rounded-md sm:h-56 md:h-60"
              />

              <span className="absolute px-2 py-1 text-xs text-white bg-green-500 rounded-full top-2 right-2">
                {car.status}
              </span>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{car.name}</h3>
                <div className="flex items-center gap-1 text-sm text-yellow-500">
                  <Star className="w-5 h-5" />
                  {car.rating}
                </div>
              </div>

              <div className="flex items-center gap-1 my-4 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                <span>{car.location}</span>
              </div>

              <div className="flex flex-col gap-2 mt-2 text-sm text-gray-600 sm:items-center sm:flex-row sm:gap-10">
                <span className="inline-flex items-center gap-1">
                  <Users className="w-4 h-4 text-blue-500" /> {car.seats} seats
                </span>

                <span className="inline-flex items-center gap-1">
                  <Fuel className="w-4 h-4 text-blue-500" /> {car.fuel}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                {car.badges.map((badge, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-xs font-semibold border border-gray-200 rounded-full bg-gray-50"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between mt-4">
                <p className="text-lg font-bold text-blue-500">
                  ₹{car.Day}
                  <span className="text-sm font-normal text-gray-500"> /PER DAY</span>
              
                </p>
                <button
                  onClick={() => handleBookNow(car)}
                  className="px-4 py-2 text-sm font-semibold text-white transition bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Book Now
                </button>
              </div>
              <p className="text-lg font-bold text-blue-500"> <span className="text-sm font-semibold text-gray-500 underline"> Extra  ₹ 11/Per KM </span> </p>
                <p className="text-lg font-bold text-blue-500"> <span className="text-sm font-semibold text-green-500"> Tollgate,Parking and Other State Permit are Party Expences </span> </p>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
            <h3 className="mb-4 text-xl font-bold text-center text-gray-800">
              Book {selectedCar.name}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
              />
              <input
                type="text"
                name="pickup"
                placeholder="Pickup Location"
                value={formData.pickup}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
              />
              <input
                type="text"
                name="drop"
                placeholder="Drop Location"
                value={formData.drop}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
              />

              <div className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-md">
                Per Day Price: ₹{selectedCar.Day}
              </div>

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setSelectedCar(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Booking...' : 'Confirm Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedCars;
