import React from 'react';
import { Truck, Clock, Star, CreditCard, PhoneCall, Car, MapPin } from 'lucide-react';

export default function PriceTables() {
  const onlyDrop = [
    { route: 'Tirupati Airport to Tirumala', sedan: 1500, crysta: 2800, xl6: 2400 },
    { route: 'Tirupati Airport to Tirupati', sedan: 800, crysta: 1500, xl6: 1400 },
    { route: 'Tirupati Airport to Sri Kalahasti', sedan: 1500, crysta: 2300, xl6: 2000 },
    { route: 'Tirupati to Tirumala', sedan: 1100, crysta: 1800, xl6: 1600 },
    { route: 'Tirupati to Sri Kalahasti', sedan: 1800, crysta: 3200, xl6: 2800 },
  ];

  const packages = [
    { name: 'Tirumala', hours: '5 hrs', sedan: 2500, crysta: 4000, xl6: 3500 },
    { name: 'Sri Kalahasti', hours: '5 hrs', sedan: 3000, crysta: 5000, xl6: 4500 },
    { name: 'Kanipakam', hours: '6 hrs', sedan: 4000, crysta: 6000, xl6: 5500 },
    { name: 'Golden Temple', hours: '5 hrs', sedan: 5000, crysta: 7000, xl6: 6500 },
    { name: 'Arunachalam', hours: '8 hrs', sedan: 9000, crysta: 14000, xl6: 13000 },
    { name: 'Local Temples Places (5 Temples)', hours: '5 hrs', sedan: 2500, crysta: 3500, xl6: 3000 },
    { name: 'Day Rental', hours: 'Full Day', sedan: 2500, crysta: 4000, xl6: 3500 },
  ];

  return (
    <div className="max-w-6xl p-4 mx-auto md:p-6">
      {/* HEADER */}
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-orange-500 underline md:text-4xl drop-shadow-sm">
          Tirupati Shankar Travels
        </h2>
        <p className="max-w-2xl mx-auto mt-3 text-sm leading-relaxed text-gray-600 md:text-base">
        Tirupati Shankar Travels is your trusted travel partner for safe, affordable, and comfortable trips across all major spiritual destinations in and around Tirupati. Whether you're heading to Tirumala, Sri Kalahasti, Kanipakam, Golden Temple,Arunachalam Etc or exploring the divine local temples, we ensure a smooth and hassle-free travel experience for every devotee.

We offer well-maintained Sedans, Crystas, and XL6 vehicles, driven by experienced and polite chauffeurs who understand the routes, temple timings, and local guidelines. From airport pickups to full-day temple packages, our services are designed to provide convenience, punctuality, and peace of mind.

Choose from our Drop Services or Special Darshan Packages and enjoy seamless travel with transparent pricing, comfort, and complete devotion-focused planning. With Tirupati Shankar Travels, your spiritual journey begins the moment you start your ride.
        </p>
      </header>

      {/* ICON STRIP */}
      <div className="grid grid-cols-3 gap-3 mb-10 text-xs text-center md:grid-cols-5 md:text-sm">
        <div className="flex flex-col items-center gap-1 p-3 bg-white border shadow rounded-xl">
          <Car className="w-6 h-6 text-blue-600" />
          <span className="font-medium">Premium Cars</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-3 bg-white border shadow rounded-xl">
          <Clock className="w-6 h-6 text-green-600" />
          <span className="font-medium">On-Time Pickup</span>
        </div>
        <div className="flex flex-col items-center gap-1 p-3 bg-white border shadow rounded-xl">
          <MapPin className="w-6 h-6 text-red-600" />
          <span className="font-medium">Any Location</span>
        </div>
        <div className="flex flex-col items-center hidden gap-1 p-3 bg-white border shadow rounded-xl md:flex">
          <Star className="w-6 h-6 text-yellow-500" />
          <span className="font-medium">Top Rated</span>
        </div>
        <div className="flex flex-col items-center hidden gap-1 p-3 bg-white border shadow rounded-xl md:flex">
          <PhoneCall className="w-6 h-6 text-indigo-600" />
          <span className="font-medium">24/7 Support</span>
        </div>
      </div>

      {/* ONLY DROP */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 text-white rounded-md shadow-md bg-gradient-to-br from-blue-500 to-indigo-600">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">ONLY DROP</h3>
              <p className="text-sm text-gray-500">One-way travel pricing</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CreditCard className="w-4 h-4" />
            <span>Rates in INR</span>
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden overflow-x-auto bg-white border border-gray-200 shadow-lg md:block rounded-xl">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-blue-900 uppercase border-r">Route</th>
                <th className="px-6 py-3 text-xs font-bold tracking-wider text-right text-blue-900 uppercase border-r">Sedan</th>
                <th className="px-6 py-3 text-xs font-bold tracking-wider text-right text-blue-900 uppercase border-r">Crysta</th>
                <th className="px-6 py-3 text-xs font-bold tracking-wider text-right text-blue-900 uppercase">XL6</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {onlyDrop.map((row, idx) => (
                <tr key={idx} className="transition hover:bg-blue-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 border-r">{row.route}</td>
                  <td className="px-6 py-4 text-sm font-bold text-green-600 border-r">₹{row.sedan}</td>
                  <td className="px-6 py-4 text-sm font-bold text-purple-600 border-r">₹{row.crysta}</td>
                  <td className="px-6 py-4 text-sm font-bold text-orange-600">₹{row.xl6}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="grid gap-4 md:hidden">
          {onlyDrop.map((row, idx) => (
            <article
              key={idx}
              className="flex flex-col gap-3 p-4 transition transform bg-white border border-gray-200 shadow-md rounded-2xl hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-semibold text-gray-900">{row.route}</h4>
                  <p className="mt-1 text-xs text-gray-500">One-way drop</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-sm font-bold text-green-600">Sedan</div>
                    <div className="text-xs text-gray-500">₹{row.sedan}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-purple-600">Crysta</div>
                    <div className="text-xs text-gray-500">₹{row.crysta}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-orange-600">XL6</div>
                    <div className="text-xs text-gray-500">₹{row.xl6}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-gray-500">Comfort & clean cars • Verified drivers</div>
                <button
                  className="px-3 py-1 text-xs text-white bg-blue-600 rounded-full shadow hover:opacity-95"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Enquire
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PACKAGES */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 text-white rounded-md shadow-md bg-gradient-to-br from-green-500 to-emerald-600">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">PICKUP &amp; DROP (Packages)</h3>
              <p className="text-sm text-gray-500">Hourly curated packages</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Star className="w-4 h-4" />
            <span>Popular</span>
          </div>
        </div>

        {/* DESKTOP TABLE */}
        <div className="hidden overflow-x-auto bg-white border border-gray-200 shadow-lg md:block rounded-xl">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr className="bg-gradient-to-r from-green-50 to-emerald-50">
                <th className="px-6 py-3 text-xs font-bold tracking-wider text-left text-green-900 uppercase border-r">Location</th>
                <th className="px-6 py-3 text-xs font-bold tracking-wider text-center text-green-900 uppercase border-r">Hours</th>
                <th className="px-6 py-3 text-xs font-bold tracking-wider text-right text-green-900 uppercase border-r">Sedan</th>
                <th className="px-6 py-3 text-xs font-bold tracking-wider text-right text-green-900 uppercase border-r">Crysta</th>
                <th className="px-6 py-3 text-xs font-bold tracking-wider text-right text-green-900 uppercase">XL6</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {packages.map((row, idx) => (
                <tr key={idx} className="transition hover:bg-green-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 border-r">{row.name}</td>
                  <td className="px-6 py-4 text-sm text-center text-gray-700 border-r">{row.hours}</td>
                  <td className="px-6 py-4 text-sm font-bold text-blue-700 border-r">₹{row.sedan}</td>
                  <td className="px-6 py-4 text-sm font-bold text-purple-700 border-r">₹{row.crysta}</td>
                  <td className="px-6 py-4 text-sm font-bold text-orange-700">₹{row.xl6}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE CARDS */}
        <div className="grid gap-4 md:hidden">
          {packages.map((row, idx) => (
            <article
              key={idx}
              className="flex flex-col gap-3 p-4 transition transform bg-white border border-gray-200 shadow-md rounded-2xl hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-base font-semibold text-gray-900">{row.name}</h4>
                  <p className="mt-1 text-xs text-gray-500">{row.hours}</p>
                </div>
                <div className="space-y-1 text-sm text-right">
                  <div className="font-bold text-center text-blue-700">Sedan<br /><span className="text-xs font-normal text-gray-500">₹{row.sedan}</span></div>
                  <div className="font-bold text-center text-purple-700">Crysta<br /><span className="text-xs font-normal text-gray-500">₹{row.crysta}</span></div>
                  <div className="font-bold text-center text-orange-700">XL6<br /><span className="text-xs font-normal text-gray-500">₹{row.xl6}</span></div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-gray-500">Includes driver & tolls (where applicable)</div>
                <button
                  className="px-3 py-1 text-xs text-white bg-green-600 rounded-full shadow hover:opacity-95"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Enquire
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FOOTER with highlighted WhatsApp help */}
      <footer className="mt-8 text-sm text-center text-gray-600">
        <div className="flex flex-col items-center gap-3">
          <p>
            Prices are indicative. Contact <strong className="text-blue-700">Tirupati Shankar Travels</strong> for latest
            details or immediate booking.
          </p>

          <a
            href="https://wa.me/919177563070?text=Hello%2C%20I%20need%20assistance%20regarding%20your%20travel%20packages."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-4 py-2 rounded-full shadow-lg transform hover:-translate-y-0.5 transition"
            aria-label="Chat on WhatsApp"
          >
            {/* simple inline WhatsApp svg for crispness */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path fill="#fff" d="M20.52 3.48A11.92 11.92 0 0 0 12 0C5.373 0 .001 5.373 0 12c0 2.115.551 4.186 1.6 6.002L0 24l6.238-1.607A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12 0-3.203-1.247-6.214-3.48-8.52z"/>
              <path fill="#25D366" d="M20.52 3.48A11.92 11.92 0 0 0 12 0v24c2.115 0 4.186-.551 6.002-1.6L24 24l-1.6-1.6A11.92 11.92 0 0 0 24 12c0-3.203-1.247-6.214-3.48-8.52z" opacity="0.0"/>
              <path fill="#fff" d="M17.3 14.9c-.3-.15-1.77-.86-2.05-.96-.28-.1-.48-.15-.68.15-.2.3-.78.96-.96 1.16-.18.2-.35.22-.65.07-.3-.15-1.24-.46-2.36-1.46-.87-.77-1.46-1.72-1.63-2.02-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2 0-.38-.02-.53-.02-.15-.68-1.64-.93-2.25-.25-.59-.5-.51-.68-.52l-.58-.01c-.2 0-.52.07-.8.35-.28.28-1.06 1.04-1.06 2.54s1.09 2.94 1.24 3.14c.15.2 2.15 3.3 5.22 4.63 3.07 1.33 3.07.89 3.62.83.55-.06 1.77-.72 2.02-1.41.25-.69.25-1.28.18-1.41-.08-.12-.28-.18-.58-.33z"/>
            </svg>

            <div className="text-left">
              <div className="text-sm font-medium">Need help? Chat on WhatsApp</div>
              <div className="text-xs opacity-90">Agent: +91 9177563070</div>
            </div>
          </a>
        </div>
      </footer>
    </div>
  );
}
