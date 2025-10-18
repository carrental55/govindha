'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { Car, MapPin, Users, Cog, Fuel, Star, ArrowRight } from 'lucide-react';

const cars = [
  {
    id: 1,
    name: 'SWIFT DZIRE - DXI BLUE COLOUR',
    location: 'Tirupati',
    seats: '4+1',
    fuel: 'Petrol',
    price: 15,
    Day:2000,
    rating: 4.8,
    badges: ['Secure Journey', 'Comfortable', 'Experience Driver'],
    status: 'Available',
    image: '/assets/dzireblue.jpg', // path relative to public folder
  },
  {
    id: 2,
    name: 'TOYOTA ETIOS - SILVER COLOUR',
   
    location: 'Tirupati',
    seats: '4+1',
    
    fuel: 'Diesel',
    price: 15,
    Day:2000,
    rating: '4.7',
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
    price: 25,
    Day:3500,
    rating: '4.6',
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
    price: 15,
    Day:2000,
    rating: '4.6',
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
    price: 15,
    Day:2000,
    rating: '4.6',
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
    price: 20,
    Day:3000,
    rating: 4.6,
    badges: ['Secure Journey', 'Comfortable', 'Experience Driver'],
   
    status: 'Available',
    image: '/assets/xl6.jpg',
  },
  {
    id: 7,
    name: 'SWIFT DZIRE - VXI',
    
    location: 'Tirupati',
    seats: '4+1',
    
    fuel: 'Diesel',
    price: 15,
    Day:2000,
    rating: 4.6,
    badges: ['Secure Journey', 'Comfortable', 'Experience Driver'],
    
    status: 'Available',
    image: '/assets/swiftdzirered.jpg',
  },
  {
    id: 8,
    name: 'SWIFT DZIRE NEW - VXI',
    
    location: 'Tirupati',
    seats: '4+1',
    
    fuel: 'Petrol',
    price: 15,
    Day:2000,
    rating: 4.6,
    badges: ['Secure Journey', 'Comfortable', 'Experience Driver'],
    
    status: 'Available',
    image: '/assets/swiftdzirewhite.jpg',
  },
  
  
  // add remaining cars similarly
];

const FeaturedCars = () => {
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

  return (
    <section className="px-4 py-20 bg-gray-100 sm:px-16">
      <div className="mx-auto mb-12 text-center max-w-7xl head-reveal">
        <h2 className="flex items-center justify-center gap-2 mb-2 text-3xl font-bold sm:text-4xl">
          <span className="text-blue-500"><Car className='w-12 h-12' /></span>
          <span className='text-gray-800'>Available Cars</span>
        </h2>
        <p className="text-lg text-gray-600">Discover our handpicked selection of Affordable vehicles, perfect for any journey</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map(car => (
          <div key={car.id} className="p-4 transition duration-300 bg-white shadow-md rounded-xl hover:shadow-lg hover:-translate-y-3 reveal-y">
            <div className="relative overflow-hidden">
              <Image 
                src={car.image} 
                alt={car.name} 
                width={500} 
                height={300} 
                className="object-cover w-full h-48 rounded-md sm:h-56 md:h-60" 
              />
              
              <span className="absolute px-2 py-1 text-xs text-white bg-green-500 rounded-full top-2 right-2">{car.status}</span>
            </div>

            <div className="mt-4">
              <div className='flex items-center justify-between'>
                <h3 className="text-lg font-semibold">{car.name}</h3>
                <div className="flex items-center gap-1 text-sm text-yellow-500"><Star className='w-5 h-5' />{car.rating}</div>
              </div>
             
              <div className="flex items-center gap-1 my-4 text-sm text-gray-500">
                <MapPin className='w-4 h-4' /><span>{car.location}</span>
              </div>
              <div className="flex flex-col gap-2 mt-2 text-sm text-gray-600 sm:items-center sm:flex-row sm:gap-10">
                <span className='inline-flex items-center gap-1'><Users className='w-4 h-4 text-blue-500' /> {car.seats} seats</span>
               
                <span className='inline-flex items-center gap-1'><Fuel className='w-4 h-4 text-blue-500' /> {car.fuel}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {car.badges.map((badge, i) => (
                  <span key={i} className="px-2 py-1 text-xs font-semibold border border-gray-200 rounded-full bg-gray-50">{badge}</span>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-lg font-bold text-blue-500"> ₹{car.price}<span className="text-sm font-normal text-gray-500">/km</span></p>
              </div>
            
              
            </div>
          </div>
        ))}
      </div>

   
    </section>
  )
}

export default FeaturedCars;
