
import { supabase } from '../supabaseClient.js';

export const getMyLeads = async (req, res) => {
  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .eq('agent_id', req.user.id)
    .order('created_at', { ascending: false });

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const updateLeadStatus = async (req, res) => {
  const { status } = req.body;
  const { data, error } = await supabase
    .from('leads')
    .update({ status })
    .eq('id', req.params.id)
    .eq('agent_id', req.user.id)
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

export const addLeadNote = async (req, res) => {
  const { text } = req.body;
  const { data, error } = await supabase
    .from('lead_notes')
    .insert([{ lead_id: req.params.id, text, author_id: req.user.id }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
};
