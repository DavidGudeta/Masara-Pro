
import { supabase } from '../supabaseClient.js';

export const submitDocument = async (req, res) => {
  try {
    const { type, name, fileUrl } = req.body;
    const { data, error } = await supabase
      .from('documents')
      .insert([{ 
        user_id: req.user.id, 
        type, 
        name, 
        file_url: fileUrl, 
        status: 'PENDING' 
      }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const verifyDocument = async (req, res) => {
  // Admin only logic
  const { status } = req.body; // VERIFIED or REJECTED
  const { data, error } = await supabase
    .from('documents')
    .update({ status, verified_at: new Date() })
    .eq('id', req.params.id)
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};
