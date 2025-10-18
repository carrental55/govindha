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
  price: { type: Number, default: 0 },
  date: { type: String, default: "" },
  time: { type: String, default: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) },
  createdAt: { type: Date, default: Date.now },
});

let Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { MONGODB_URI, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;

  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(MONGODB_URI);
    }

    const {
      packageName = 'N/A',
      carName = '',
      seats = '',
      name,
      phone,
      pickup,
      drop,
      distance = '',
      duration = '',
      price = 0,
      date = new Date().toLocaleDateString(),
      time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    } = req.body;

    // Validate only required fields
    if (!name || !phone || !pickup || !drop) {
      return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    // Check duplicate by name + phone + packageName + date
    const existingBooking = await Booking.findOne({ name, phone, packageName, date });
    if (existingBooking) {
      return res.status(400).json({ success: false, error: 'Duplicate booking detected' });
    }

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
      price: Number(price),
      date,
      time,
    });

    const message = `
🚗 *New Booking Received!*
📦 Package: ${packageName}
${carName ? `🚘 Car: ${carName} (${seats})` : ''}
👤 Customer: ${name}
📞 Phone: ${phone}
📍 Pickup: ${pickup}
🏁 Drop: ${drop}
${distance ? `📏 Distance: ${distance}` : ''}
${duration ? `⏱ Duration: ${duration}` : ''}
${price ? `💰 Price: ₹${price}` : ''}
📅 Date: ${date}
🕒 Time: ${time}
    `;

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

    res.status(200).json({ success: true, message: 'Booking saved and notified successfully!' });

  } catch (error) {
    console.error('❌ Error saving booking:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}
