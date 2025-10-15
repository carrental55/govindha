'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Car, CheckCircle, Clock, XCircle } from "lucide-react";

export default function AdminBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  // Protect admin page
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token || token !== "verified") {
      router.push("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  // Fetch bookings only if authorized
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

  const getStatusBadge = (status) => {
    const styles = {
      confirmed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      rejected: "bg-red-100 text-red-800",
    };

    const icons = {
      confirmed: <CheckCircle className="w-4 h-4" />,
      pending: <Clock className="w-4 h-4" />,
      rejected: <XCircle className="w-4 h-4" />,
    };

    return (
      <span
        className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
          styles[status] || styles.pending
        }`}
      >
        {icons[status] || icons.pending}{" "}
        <span className="capitalize">{status || "pending"}</span>
      </span>
    );
  };

  const updateStatus = (index, status) => {
    const updated = [...bookings];
    updated[index].status = status;
    setBookings(updated);
  };

  if (!authorized || loading)
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-600">
        Loading bookings...
      </div>
    );

  if (!bookings.length)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        No bookings found in database.
      </div>
    );

  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    rejected: bookings.filter((b) => b.status === "rejected").length,
    pending: bookings.filter((b) => b.status === "pending").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <h1 className="mb-2 text-4xl font-bold text-slate-900">
          Booking Management
        </h1>
        <p className="mb-8 text-slate-600">
          Manage and track all car rental bookings
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-3 lg:grid-cols-3">
          <div className="flex items-center justify-between p-5 bg-white shadow-md rounded-xl">
            <div>
              <h3 className="text-sm font-medium text-slate-600">Total Bookings</h3>
              <div className="mt-2 text-3xl font-bold text-slate-900">{stats.total}</div>
            </div>
            <Car className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex items-center justify-between p-5 bg-white shadow-md rounded-xl">
            <div>
              <h3 className="text-sm font-medium text-slate-600">Confirmed</h3>
              <div className="mt-2 text-3xl font-bold text-slate-900">{stats.confirmed}</div>
            </div>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex items-center justify-between p-5 bg-white shadow-md rounded-xl">
            <div>
              <h3 className="text-sm font-medium text-slate-600">Rejected</h3>
              <div className="mt-2 text-3xl font-bold text-slate-900">{stats.rejected}</div>
            </div>
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
        </div>

        {/* Bookings Table */}
        <div className="overflow-hidden bg-white shadow-lg rounded-xl">
          <div className="p-5 border-b">
            <h2 className="text-2xl font-bold text-slate-900">All Bookings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-slate-700">
              <thead className="font-semibold bg-slate-50 text-slate-900">
                <tr>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Vehicle</th>
                  <th className="px-4 py-3">Rental Period</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Distance</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, idx) => (
                  <tr key={idx} className="transition border-b hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">{b.name}</div>
                      <div className="text-xs text-slate-400">{b.phone}</div>
                    </td>
                    <td className="px-4 py-3">{b.carName}</td>
                    <td className="px-4 py-3">{b.date} {b.time}</td>
                    <td className="px-4 py-3">{b.pickup} → {b.drop}</td>
                    <td className="px-4 py-3">{b.distance}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">₹{b.price}</td>
                    <td className="px-4 py-3">{getStatusBadge(b.status || "pending")}</td>
                    <td className="flex gap-2 px-4 py-3">
                      {b.status === "pending" && (
                        <>
                          <button
                            className="px-2 py-1 text-white bg-green-600 rounded"
                            onClick={() => updateStatus(idx, "confirmed")}
                          >
                            Accept
                          </button>
                          <button
                            className="px-2 py-1 text-white bg-red-600 rounded"
                            onClick={() => updateStatus(idx, "rejected")}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
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
