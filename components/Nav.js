'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';
import { Car, Menu, X, Shield, LogIn, LogOut } from 'lucide-react';

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

          {/* Navigation Links (Home & Packages always visible) */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-700">Home</Link>
            <Link href="/packages" className="text-gray-700 hover:text-blue-700">Packages</Link>

            {isAdmin && (
              <Link href="/adminpage" className="items-center hidden gap-2 text-gray-700 md:flex hover:text-blue-700">
                <Shield className="w-4 h-4" /> <span>Admin</span>
              </Link>
            )}
          </div>

          {/* Desktop Login/Logout */}
          <div className="items-center hidden space-x-4 md:flex">
            {!isAdmin ? (
              <Link href="/login">
                <Button variant="ghost" size="small" className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" /> AdminLogin
                </Button>
              </Link>
            ) : (
              <Button variant="ghost" size="small" color="error" onClick={handleLogout} className="flex items-center gap-2">
                <LogOut className="w-4 h-4" /> Logout
              </Button>
            )}
          </div>

          {/* Mobile Hamburger Menu (AdminLogin/Logout only) */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              size="small"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu (AdminLogin/Logout only) */}
        {isMenuOpen && (
          <div className="px-4 pb-4 bg-white border-t md:hidden">
            {!isAdmin ? (
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" size="small" className="flex items-center justify-start w-full gap-2">
                  <LogIn className="w-4 h-4" /> AdminLogin
                </Button>
              </Link>
            ) : (
              <Button
                variant="ghost"
                size="small"
                color="error"
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-start w-full gap-2"
              >
                <LogOut className="w-4 h-4" /> Logout
              </Button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
