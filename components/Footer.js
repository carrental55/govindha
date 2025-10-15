'use client';

import Link from 'next/link';
import { Car, Facebook, Twitter, Instagram, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="px-4 py-16 text-gray-300 bg-gray-900 sm:px-6 lg:px-20">
      <div className="grid grid-cols-1 gap-10 mx-auto max-w-7xl md:grid-cols-4">
        {/* Company Info */}
        <div>
          <Link href="/" className="flex items-center space-x-2">
            <Car className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold">carrentals</span>
          </Link>
          <p className="my-4 leading-relaxed">
            Your trusted partner for premium car rentals. Experience the freedom of the road with our quality vehicles and exceptional service.
          </p>
          <div className="flex gap-4 mt-2">
            <Facebook className="cursor-pointer hover:text-white" />
            <Twitter className="cursor-pointer hover:text-white" />
            <Instagram className="cursor-pointer hover:text-white" />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:underline">Home</Link></li>
            <li><Link href="#" className="hover:underline">Our Cars</Link></li>
            <li><Link href="#" className="hover:underline">About Us</Link></li>
            <li><Link href="#" className="hover:underline">Contact</Link></li>
            <li><Link href="#" className="hover:underline">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="mb-4 font-semibold text-white">Services</h4>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:underline">Economy Cars</Link></li>
            <li><Link href="#" className="hover:underline">Luxury Vehicles</Link></li>
            <li><Link href="#" className="hover:underline">SUVs & Trucks</Link></li>
            <li><Link href="#" className="hover:underline">Electric Cars</Link></li>
            <li><Link href="#" className="hover:underline">Long-term Rentals</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-4 font-semibold text-white">Contact Us</h4>
          <ul className="space-y-3">
            <li className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-400" /> +1 (555) 123-4567
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-400" /> info@carrental.com
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-400" /> 123 Main St, City, State 12345
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col items-center justify-between pt-6 mt-10 text-sm text-gray-500 border-t border-gray-700 sm:flex-row">
        <p>&copy; {new Date().getFullYear()} carrentals. All rights reserved.</p>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Link href="#" className="hover:underline">Privacy Policy</Link>
          <Link href="#" className="hover:underline">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
