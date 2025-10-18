import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  packageName: { type: String, default: "" },
  carName: { type: String, default: "" },
  seats: { type: String, default: "" },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  pickup: { type: String, required: true },
  drop: { type: String, required: true },
  distance: { type: String, default: "" },
  duration: { type: String, default: "" },
  price: { type: Number, default: ""},
  date: { type: String, default: "" },
  time: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now }
});

let Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { MONGODB_URI } = process.env;

  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
    }

    const bookings = await Booking.find({}).sort({ createdAt: -1 });

    // Ensure packageName and seats exist for all bookings
    const updatedBookings = bookings.map(b => ({
      packageName: b.packageName || "",
      seats: b.seats || "",
      carName: b.carName,
      name: b.name,
      phone: b.phone,
      pickup: b.pickup,
      drop: b.drop,
      distance: b.distance || "",
      duration: b.duration || "",
      price: b.price,
      date: b.date,
      time: b.time,
      createdAt: b.createdAt
    }));

    res.status(200).json({ success: true, bookings: updatedBookings });
  } catch (error) {
    console.error('❌ Error fetching bookings:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
