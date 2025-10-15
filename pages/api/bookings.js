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
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { MONGODB_URI, TELEGRAM_BOT, TELEGRAM_CHAT } = process.env;

  try {
    // Persistent connection
    if (!mongoose.connections[0].readyState) {
      await mongoose.connect(MONGODB_URI);
    }

    // Save booking
    const booking = await Booking.create(req.body);

    // Telegram notification
    const message = `
🚗 *New Car Booking!*
Car: ${req.body.carName}
Customer: ${req.body.name}
Phone: ${req.body.phone}
Pickup: ${req.body.pickup}
Drop: ${req.body.drop}
Distance: ${req.body.distance}
Duration: ${req.body.duration}
Price: ${req.body.price}
Date: ${req.body.date} ${req.body.time}
    `;

    if (TELEGRAM_BOT && TELEGRAM_CHAT) {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT,
          text: message,
          parse_mode: 'Markdown'
        })
      });
    }

    res.status(200).json({ success: true, message: 'Booking saved and notified' });
  } catch (error) {
    console.error('❌ Error saving booking:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
