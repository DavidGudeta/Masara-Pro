
import express from 'express';
import { supabase } from '../supabaseClient.js';

const router = express.Router();

// GET all properties with optional filters
router.get('/', async (req, res) => {
  try {
    const { minPrice, maxPrice, status, type, location } = req.query;
    
    let query = supabase.from('properties').select('*');

    if (minPrice) query = query.gte('price', minPrice);
    if (maxPrice) query = query.lte('price', maxPrice);
    if (status) query = query.eq('status', status);
    if (type) query = query.eq('type', type);
    if (location) query = query.ilike('location', `%${location}%`);

    const { data, error } = await query;
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET single property
router.get('/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('properties')
    .select('*, agent:agent_id(*)')
    .eq('id', req.params.id)
    .single();
    
  if (error) return res.status(404).json({ error: 'Property not found' });
  res.json(data);
});

// POST new property (Agent/Admin)
router.post('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('properties')
      .insert([req.body])
      .select();
      
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE property
router.delete('/:id', async (req, res) => {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', req.params.id);
    
  if (error) return res.status(400).json({ error: error.message });
  res.status(204).send();
});

export default router;
