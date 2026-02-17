
import { supabase } from '../supabaseClient.js';

export const getProperties = async (req, res) => {
  try {
    const { 
      minPrice, maxPrice, status, type, 
      beds, baths, location, agentId 
    } = req.query;

    let query = supabase.from('properties').select('*, agent:agent_id(*)');

    if (minPrice) query = query.gte('price', minPrice);
    if (maxPrice) query = query.lte('price', maxPrice);
    if (status && status !== 'ANY') query = query.eq('status', status);
    if (type) query = query.eq('type', type);
    if (beds) query = query.gte('beds', beds);
    if (baths) query = query.gte('baths', baths);
    if (location) query = query.ilike('location', `%${location}%`);
    if (agentId) query = query.eq('agent_id', agentId);

    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPropertyById = async (req, res) => {
  const { data, error } = await supabase
    .from('properties')
    .select('*, agent:agent_id(*)')
    .eq('id', req.params.id)
    .single();

  if (error || !data) return res.status(404).json({ error: 'Property not found' });
  res.json(data);
};

export const createProperty = async (req, res) => {
  try {
    // Only Agents/Admins can create
    const propertyData = {
      ...req.body,
      agent_id: req.user.id // Tie to the authenticated agent
    };

    const { data, error } = await supabase
      .from('properties')
      .insert([propertyData])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProperty = async (req, res) => {
  const { error } = await supabase
    .from('properties')
    .delete()
    .eq('id', req.params.id)
    .eq('agent_id', req.user.id); // Ensure they own it

  if (error) return res.status(400).json({ error: error.message });
  res.status(204).send();
};
