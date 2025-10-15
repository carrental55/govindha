'use client'; // Needed for useState

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';
import { Car, Menu, X, LogIn, LogOut, Shield } from 'lucide-react';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <nav className="sticky top-0 z-50 bg-white shadow-elegant">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-gray-800">
            <Car className="w-8 h-8" />
            <span className="text-xl font-bold">carrental</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="items-center hidden space-x-8 md:flex">
            <Link href="/" className="text-gray-700 transition-colors hover:text-blue-700">Home</Link>
            <Link href="/cars_list" className="text-gray-700 transition-colors hover:text-blue-700">Cars</Link>
            <Link href="#" className="text-gray-700 transition-colors hover:text-blue-700">About</Link>
            <Link href="/contact" className="text-gray-700 transition-colors hover:text-blue-700">Contact</Link>

            {isAdmin && (
              <Link href="/adminpage" className="flex items-center gap-2 text-gray-700 hover:text-blue-700">
                <Shield className="w-4 h-4" /> <span>Admin</span>
              </Link>
            )}
          </div>

          {/* Desktop Login/Logout */}
          <div className="items-center hidden space-x-4 md:flex">
            {!isAdmin ? (
              <Link href="/login" className="flex items-center gap-2 px-2 py-1 transition duration-300 rounded-sm hover:bg-gray-200">
                <LogIn className="w-4 h-4" /> <span>Login</span>
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-2 py-1 text-red-600 transition duration-300 rounded-sm hover:bg-gray-200"
              >
                <LogOut className="w-4 h-4" /> <span>Logout</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="small" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t sm:px-3">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-700">Home</Link>
              <Link href="/cars_list" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-700">Cars</Link>
              <Link href="#" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-700">About</Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-700">Contact</Link>

              {isAdmin && (
                <Link href="/adminpage" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-700">
                  <Shield className="inline w-4 h-4 mr-1" /> Admin
                </Link>
              )}
            </div>

            <div className="flex items-center px-3 pb-5 space-x-4">
              {!isAdmin ? (
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" size="small">
                    <LogIn className="w-4 h-4 mr-2" /> Login
                  </Button>
                </Link>
              ) : (
                <Button variant="ghost" size="small" color="error" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
