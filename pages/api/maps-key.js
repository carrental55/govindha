export default async function handler(req, res) {
    res.status(200).json({ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY });
  }
  