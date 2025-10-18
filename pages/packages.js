'use client';
import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp, CheckCircle } from "lucide-react";

const packagesData = [
  {
    id: "1",
    title: "Tirumala Temple (5 Hours Package)",
    code: "1",
    images: ["/images/tirumala.jpg", "/assets/images/tirumala2.jpg"],
    short: "Pickup & drop at your desired location in Tirupati (City limits). Visit temples as part of the package.",
    inclusions: "Toll gate, parking charges, driver allowance, and fuel included.",
    exclusions: "Darshan tickets, entrance tickets, accommodation, and driver food (Rs.200 extra during meal time).",
    terms: [
      "Extra charges apply if distance/time exceeds limit.",
      "Night charges applicable after 10PM–6AM.",
      "A/C not functional on Ghat road (extra Rs.500 if needed).",
      "We don't provide darshan tickets.",
      "Keep valuables safe; company not responsible for loss.",
      "Package cost excludes GST.",
    ],
  },
  {
    id: "2",
    title: "Tirumala - Padmavathi Temple (7 Hours Package)",
    code: "2",
    images: ["/images/padmavathi.jpg", "/images/padmavathi2.jpg"],
    short: "Visit both Tirumala and Padmavathi temples comfortably with professional drivers and well-maintained vehicles.",
    inclusions: "Toll gate, parking charges, driver allowance, and fuel included.",
    exclusions: "Darshan tickets, entrance tickets, accommodation, and driver food (Rs.200 extra during meal time).",
    terms: [
      "Extra charges apply if distance/time exceeds limit.",
      "Night charges applicable after 10PM–6AM.",
      "A/C not functional on Ghat road (extra Rs.500 if needed).",
      "We don't provide darshan tickets.",
      "Keep valuables safe; company not responsible for loss.",
      "Package cost excludes GST.",
    ],
  },
];

export default function PackagesPage() {
  const [openDetails, setOpenDetails] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(null);
  const [formState, setFormState] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [loading, setLoading] = useState({});

  const toggleDetails = (id) => setOpenDetails(openDetails === id ? null : id);
  const toggleBooking = (id) => setBookingOpen(bookingOpen === id ? null : id);

  const handleChange = (pkgId, field, value) => {
    setFormState((s) => ({ ...s, [pkgId]: { ...s[pkgId], [field]: value } }));
  };

  const handleSubmit = async (pkgId) => {
    if (loading[pkgId]) return;

    const form = formState[pkgId];
    if (!form?.name || !form?.phone || !form?.pickup || !form?.drop) {
      return alert("Please fill out all fields.");
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(form.phone)) return alert("Please enter a valid 10-digit phone number.");

    const pkg = packagesData.find((p) => p.id === pkgId);

    try {
      setLoading((prev) => ({ ...prev, [pkgId]: true }));

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageName: pkg.title,
          name: form.name,
          phone: form.phone,
          pickup: form.pickup,
          drop: form.drop,
          distance: "",
          duration: "",
          price: "",
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted((s) => ({ ...s, [pkgId]: true }));
      } else {
        alert("Booking failed: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Booking failed. Please try again.");
    } finally {
      setLoading((prev) => ({ ...prev, [pkgId]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="py-10 text-center text-white shadow-md bg-gradient-to-r from-orange-600 to-red-500">
        <h1 className="text-3xl font-bold md:text-4xl">Tirumala Tirupati Tour Packages</h1>
        <p className="mt-2 text-sm text-gray-100">Comfortable • Affordable • Trusted Service</p>
      </header>

      <main className="px-4 py-10 mx-auto max-w-7xl">
        <h2 className="mb-10 text-2xl font-semibold text-center text-gray-800">Choose Your Tirupati–Tirumala Package</h2>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
          {packagesData.map((pkg) => {
            const form = formState[pkg.id] || {};

            return (
              <div key={pkg.id} className="overflow-hidden transition-shadow duration-300 bg-white shadow rounded-2xl hover:shadow-lg">
                <div className="relative w-full h-48 overflow-hidden sm:h-56 md:h-64 rounded-t-2xl">
                  <Image
                    src={pkg.images[0]}
                    alt={pkg.title}
                    fill
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">{pkg.title}</h3>
                    <span className="text-sm text-gray-500">Code: {pkg.code}</span>
                  </div>

                  <p className="mt-2 text-sm text-gray-600">{pkg.short}</p>

                  <div className="flex flex-wrap justify-between gap-3 mt-5">
                    <button onClick={() => toggleDetails(pkg.id)} className="flex items-center px-4 py-2 text-sm border rounded-lg hover:bg-gray-100">
                      {openDetails === pkg.id ? "Hide Details" : "View Details"}
                    </button>

                    <button onClick={() => toggleBooking(pkg.id)} className="px-4 py-2 text-sm text-white transition-all bg-orange-600 rounded-lg hover:bg-orange-700">
                      {bookingOpen === pkg.id ? "Close Booking" : "Book Now"}
                    </button>
                  </div>

                  {openDetails === pkg.id && (
                    <div className="pt-4 mt-5 text-sm border-t animate-fadeIn">
                      <h4 className="mb-2 font-semibold text-gray-700">Inclusions</h4>
                      <p className="text-gray-600">{pkg.inclusions}</p>
                      <h4 className="mt-3 mb-2 font-semibold text-gray-700">Exclusions</h4>
                      <p className="text-gray-600">{pkg.exclusions}</p>
                      <h4 className="mt-3 mb-2 font-semibold text-gray-700">Terms & Conditions</h4>
                      <ul className="pl-5 space-y-1 text-gray-600 list-decimal">{pkg.terms.map((term, i) => <li key={i}>{term}</li>)}</ul>
                    </div>
                  )}

                  {bookingOpen === pkg.id && (
                    <div className="pt-4 mt-5 border-t animate-fadeIn">
                      {submitted[pkg.id] ? (
                        <div className="flex items-center gap-2 p-4 text-green-800 border rounded-lg bg-green-50">
                          <CheckCircle size={20} /> Booking successful! We’ll contact you soon.
                        </div>
                      ) : (
                        <div className="grid gap-3 md:grid-cols-2">
                          <div>
                            <label className="block text-xs font-medium text-gray-700">Name</label>
                            <input type="text" value={form.name || ""} onChange={(e) => handleChange(pkg.id, "name", e.target.value)} placeholder="Your name" className="w-full py-2 text-sm border rounded-lg focus:ring-2 focus:ring-orange-400" />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700">Phone</label>
                            <input type="tel" value={form.phone || ""} onChange={(e) => handleChange(pkg.id, "phone", e.target.value)} placeholder="10-digit phone number" className="w-full py-2 text-sm border rounded-lg focus:ring-2 focus:ring-orange-400" maxLength={10} />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700">Pickup Location</label>
                            <input type="text" value={form.pickup || ""} onChange={(e) => handleChange(pkg.id, "pickup", e.target.value)} placeholder="Enter pickup location" className="w-full py-2 text-sm border rounded-lg focus:ring-2 focus:ring-orange-400" />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700">Drop Location</label>
                            <input type="text" value={form.drop || ""} onChange={(e) => handleChange(pkg.id, "drop", e.target.value)} placeholder="Enter drop location" className="w-full py-2 text-sm border rounded-lg focus:ring-2 focus:ring-orange-400" />
                          </div>

                          <div className="flex justify-end col-span-2 mt-5">
                            <button
                              onClick={() => handleSubmit(pkg.id)}
                              disabled={loading[pkg.id]}
                              className={`px-5 py-2 text-white rounded-lg ${loading[pkg.id] ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
                            >
                              {loading[pkg.id] ? "Loading..." : "Confirm Booking"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

     
    </div>
  );
}
