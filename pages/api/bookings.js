import mongoose from 'mongoose';

// Define Booking schema
const BookingSchema = new mongoose.Schema({
  packageName: String,   // ✅ Optional now
  carName: String,
  seats: String,         // ✅ Optional now
  name: String,
  phone: String,
  pickup: String,
  drop: String,
  distance: String,
  duration: String,
  price: Number,
  date: String,
  time: String,
  createdAt: { type: Date, default: Date.now },
});

// Use existing model or create new
let Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { MONGODB_URI, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;

  try {
    // Connect to MongoDB if not already connected
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
    }

    const {
      packageName = "N/A",
      carName,
      seats = "N/A",
      name,
      phone,
      pickup,
      drop,
      distance = "",
      duration = "",
      price,
      date,
      time,
    } = req.body;

    // Validate required fields (except packageName/seats)
    if (!name || !phone || !pickup || !drop || !carName) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    // Save booking to MongoDB
    const booking = await Booking.create({
      packageName,
      carName,
      seats,
      name,
      phone,
      pickup,
      drop,
      distance,
      duration,
      price,
      date,
      time,
    });

    // Prepare Telegram message
    const message = `
🚗 *New Car Booking!*
Package: ${packageName}
Car: ${carName} (${seats})
Customer: ${name}
Phone: ${phone}
Pickup: ${pickup}
Drop: ${drop}
Price: ₹${price}
Date: ${date} ${time}
    `;

    // Send Telegram notification if credentials exist
    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      });
    }

    res.status(200).json({ success: true, message: 'Booking saved and notified' });
  } catch (error) {
    console.error('❌ Error saving booking:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
