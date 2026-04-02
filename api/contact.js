import supabase from './_supabase.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    if (req.method === 'POST') {
      const { name, email, phone, message } = req.body;
      if (!name || !message) {
        return res.status(400).json({ error: 'Nome e mensagem são obrigatórios' });
      }
      const { data, error } = await supabase
        .from('contacts')
        .insert({ name, email, phone, message })
        .select()
        .single();
      if (error) throw error;
      return res.status(201).json({ success: true, data });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}
