'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield } from 'lucide-react';

const Nav = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    setIsAdmin(token === 'verified');
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-elegant">
      <div className="flex flex-wrap items-center justify-between px-4 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
        
        {/* ✅ Logo - Increased size */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/assets/logo.jpg"     // ✅ Correct path (no 'public/')
              alt="Company Logo"
              width={130}                 // ⬆️ Increased width
              height={120}                // ⬆️ Increased height
              className="object-contain rounded-lg"
              priority
            />
          </Link>
        </div>

        {/* ✅ Navigation Links */}
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
