import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  packageName: { type: String, default: "" }, // Added packageName
  carName: String,
  seats: { type: String, default: "" },       // Added seats
  name: String,
  phone: String,
  pickup: String,
  drop: String,
  distance: String,
  duration: String,
  price: String,
  date: String,
  time: String,
  createdAt: { type: Date, default: Date.now }
});

let Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { MONGODB_URI } = process.env;

  try {
    if (!mongoose.connections[0].readyState) {
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
      distance: b.distance,
      duration: b.duration,
      price: b.price,
      date: b.date,
      time: b.time,
      createdAt: b.createdAt
    }));

    res.status(200).json({ success: true, bookings: updatedBookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
}
