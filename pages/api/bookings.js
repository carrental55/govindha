import mongoose from 'mongoose';

// Define Booking schema
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
    // Persistent connection
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
    }

    const { carName, name, phone, pickup, drop, distance, duration, price, date, time } = req.body;

    // Validate required fields
    if (!name || !phone || !pickup || !drop) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    // Save booking to MongoDB
    const booking = await Booking.create({
      carName,
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
Car: ${carName}
Customer: ${name}
Phone: ${phone}
Pickup: ${pickup}
Drop: ${drop}
Distance: ${distance}
Duration: ${duration}
Price: ${price}
Date: ${date} ${time}
    `;

    // Send Telegram notification
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
