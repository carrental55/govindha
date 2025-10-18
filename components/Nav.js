'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Car, Shield } from 'lucide-react';

const Nav = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    setIsAdmin(token === 'verified');
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-elegant">
      <div className="flex flex-wrap items-center justify-between px-4 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Car className="w-8 h-8 text-gray-800" />
          <span className="text-xl font-bold text-gray-800">carrental</span>
        </div>

        {/* Center Links - Always visible */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm sm:text-base">
          <Link href="/" className="font-medium text-gray-700 hover:text-blue-700">
            Home
          </Link>
          <Link href="/packages" className="font-medium text-gray-700 hover:text-blue-700">
            Packages
          </Link>
          <Link href="/dayscars" className="font-medium text-gray-700 hover:text-blue-700">
            DayRentCars
          </Link>

          {isAdmin && (
            <Link href="/adminpage" className="flex items-center gap-1 font-medium text-gray-700 hover:text-blue-700">
              <Shield className="w-4 h-4" />
              <span>Admin</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
