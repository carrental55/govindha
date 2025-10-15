export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ success: false });
  
    const { password } = req.body;
  
    if (password === process.env.ADMIN_PASSWORD) {
      return res.status(200).json({ success: true });
    }
    return res.status(401).json({ success: false });
  }
  