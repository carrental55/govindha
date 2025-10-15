import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  carName: String,
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
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
}
