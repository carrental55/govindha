import mongoose from "mongoose";

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
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

let Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

export default async function handler(req, res) {
  const { MONGODB_URI } = process.env;

  try {
    if (!mongoose.connections[0].readyState) await mongoose.connect(MONGODB_URI);

    // ✅ Remove old bookings if total > 20
    const count = await Booking.countDocuments();
    if (count > 20) {
      const toRemove = count - 20;
      const oldest = await Booking.find().sort({ createdAt: 1 }).limit(toRemove);
      const idsToRemove = oldest.map((b) => b._id);
      await Booking.deleteMany({ _id: { $in: idsToRemove } });
    }

    // ✅ Get latest bookings
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({ bookings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
