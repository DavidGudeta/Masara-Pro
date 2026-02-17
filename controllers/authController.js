
import { supabase } from '../supabaseClient.js';

export const signup = async (req, res) => {
  const { email, password, name, role } = req.body;

  try {
    // 1. Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    // 2. Create profile in the public profiles table
    // Note: In a real Supabase setup, a trigger often handles this, 
    // but here we do it explicitly for the API flow.
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        { 
          id: authData.user.id, 
          name, 
          role: role || 'CUSTOMER',
          avatar: `https://i.pravatar.cc/150?u=${authData.user.id}`
        }
      ]);

    if (profileError) throw profileError;

    res.status(201).json({ 
      message: 'User created successfully',
      user: { id: authData.user.id, email, name, role } 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Fetch the additional profile data (role, name)
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    res.json({
      token: data.session.access_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: profile?.name || 'User',
        role: profile?.role || 'CUSTOMER',
        avatar: profile?.avatar || `https://i.pravatar.cc/150?u=${data.user.id}`
      }
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid login credentials' });
  }
};
