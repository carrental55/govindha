'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';
import { Car, Phone, Mail, MapPin, LogIn, LogOut } from 'lucide-react';

const Footer = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    setIsAdmin(token === 'verified');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAdmin(false);
    window.location.href = '/login';
  };

  return (
    <footer className="px-4 py-16 text-gray-300 bg-gray-900 sm:px-6 lg:px-20">
      <div className="flex flex-col gap-8 mx-auto max-w-7xl">
        {/* Logo and Description */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold">carrentals</span>
          </Link>
          <p className="max-w-md leading-relaxed">
            Your trusted partner for premium car rentals. Experience the freedom of the road with our quality vehicles and exceptional service.
          </p>
        </div>

        {/* Contact Information */}
        <div className="flex flex-col gap-2 text-gray-300">
          <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-white">
            <Phone className="w-5 h-5 text-blue-400" /> +91 98765 43210
          </a>
          <a href="mailto:info@carrental.com" className="flex items-center gap-2 hover:text-white">
            <Mail className="w-5 h-5 text-blue-400" /> info@carrental.com
          </a>
          <a
            href="https://www.google.com/maps/search/?api=1&query=123+MG+Road+Bengaluru+India"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white"
          >
            <MapPin className="w-5 h-5 text-blue-400" /> 123, MG Road, Bengaluru, India
          </a>
        </div>

        {/* Admin Login / Logout Button */}
        <div className="pt-4">
          {!isAdmin ? (
            <Link href="/login">
              <Button
                variant="outlined"
                size="small"
                className="flex items-center gap-2 text-white border-gray-500 hover:border-blue-500 hover:text-blue-400"
              >
                <LogIn className="w-4 h-4" /> Admin Login
              </Button>
            </Link>
          ) : (
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-6 mt-10 text-sm text-gray-500 border-t border-gray-700">
        &copy; {new Date().getFullYear()} carrentals. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
