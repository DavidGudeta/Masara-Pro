
import express from 'express';
import { supabase } from '../supabaseClient.js';

const router = express.Router();

// GET notifications for a user
router.get('/:userId', async (req, res) => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', req.params.userId)
    .order('created_at', { ascending: false });
    
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

// MARK as read
router.put('/:id/read', async (req, res) => {
  const { data, error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', req.params.id)
    .select();
    
  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
});

// DELETE notification
router.delete('/:id', async (req, res) => {
  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', req.params.id);
    
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).send();
});

export default router;
