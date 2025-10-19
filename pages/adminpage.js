"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";

export default function AdminBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token || token !== "verified") router.push("/login");
    else setAuthorized(true);
  }, [router]);

  useEffect(() => {
    if (!authorized) return;

    const fetchBookings = async () => {
      try {
        const res = await fetch("/api/getBookings");
        const data = await res.json();
        if (res.ok) setBookings(data.bookings);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [authorized]);

  if (!authorized || loading)
    return (
      <div className="flex items-center justify-center h-screen space-x-2 text-lg text-gray-600">
        <Loader2 className="animate-spin" />
        <span>Loading bookings...</span>
      </div>
    );

  if (!bookings.length)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        No bookings found in database.
      </div>
    );

  const renderField = (value) => (
    value ? (
      <span className="font-semibold text-red-600">{value}</span>
    ) : (
      <span className="italic text-gray-400">Not set</span>
    )
  );

  return (
    <div className="min-h-screen py-8 bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container px-4 mx-auto max-w-7xl">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-slate-900">Booking Management</h1>
        <p className="mb-8 text-lg text-slate-600">View all car rental bookings</p>

        <div className="overflow-hidden bg-white shadow-lg rounded-2xl">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-slate-900">All Bookings</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left divide-y text-slate-700 divide-slate-200">
              <thead className="font-semibold bg-slate-50 text-slate-900">
                <tr>
                  <th className="px-4 py-3">Package</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Vehicle</th>
                  <th className="px-4 py-3">Seats</th>
                  <th className="px-4 py-3">Pickup → Drop</th>
                  <th className="px-4 py-3">Distance</th>
                  <th className="px-4 py-3">Date & Time</th>
                  <th className="px-4 py-3">Price</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {bookings.map((b, idx) => (
                  <tr key={idx} className="transition hover:bg-slate-50">
                    {/* Highlight Day Package */}
                    <td className={`px-4 py-3 text-lg ${b.packageName === "Day Package" ? "text-blue-600 font-bold" : ""}`}>
                      {b.packageName || <span className="italic text-gray-400">Not set</span>}
                    </td>

                    <td className="px-4 py-3">
                      <div className="text-lg font-medium text-slate-900">{b.name}</div>
                      <div className="text-xs text-slate-400">{b.phone}</div>
                    </td>

                    <td className="px-4 py-3 text-lg">{b.carName || <span className="italic text-gray-400">Not set</span>}</td>

                    <td className="px-4 py-3 text-lg">{b.seats || <span className="italic text-gray-400">Not set</span>}</td>

                    <td className="px-4 py-3 text-lg">
                      {b.pickup || <span className="italic text-gray-400">Not set</span>} → {b.drop || <span className="italic text-gray-400">Not set</span>}
                    </td>

                    <td className="px-4 py-3 text-lg">{b.distance || <span className="italic text-gray-400">Not set</span>}</td>

                    <td className="px-4 py-3 text-lg">{b.date} {b.time}</td>

                    <td className="px-4 py-3 text-lg font-semibold text-slate-900">₹{b.price || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
