
import { supabase } from '../supabaseClient.js';

export const getProfile = async (req, res) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', req.user.id)
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const updateProfile = async (req, res) => {
  const { name, avatar, phone } = req.body;
  const { data, error } = await supabase
    .from('profiles')
    .update({ name, avatar, phone, updated_at: new Date() })
    .eq('id', req.user.id)
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data[0]);
};

export const getWishlist = async (req, res) => {
  const { data, error } = await supabase
    .from('wishlist')
    .select('*, property:property_id(*)')
    .eq('user_id', req.user.id);

  if (error) return res.status(400).json({ error: error.message });
  res.json(data.map(item => item.property));
};

export const addToWishlist = async (req, res) => {
  const { propertyId } = req.body;
  const { data, error } = await supabase
    .from('wishlist')
    .insert([{ user_id: req.user.id, property_id: propertyId }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
};

export const removeFromWishlist = async (req, res) => {
  const { propertyId } = req.params;
  const { error } = await supabase
    .from('wishlist')
    .delete()
    .eq('user_id', req.user.id)
    .eq('property_id', propertyId);

  if (error) return res.status(400).json({ error: error.message });
  res.status(204).send();
};
