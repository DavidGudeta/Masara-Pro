
import { supabase } from '../supabaseClient.js';

export const getMyChats = async (req, res) => {
  const { data, error } = await supabase
    .from('chats')
    .select('*, participant:participant_id(id, name, avatar, role)')
    .or(`user_id.eq.${req.user.id},participant_id.eq.${req.user.id}`)
    .order('updated_at', { ascending: false });

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const getMessages = async (req, res) => {
  const { chatId } = req.params;
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('chat_id', chatId)
    .order('created_at', { ascending: true });

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const sendMessage = async (req, res) => {
  const { chatId, text } = req.body;
  const { data, error } = await supabase
    .from('messages')
    .insert([{ chat_id: chatId, sender_id: req.user.id, text }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  
  // Update chat last message timestamp
  await supabase.from('chats').update({ updated_at: new Date() }).eq('id', chatId);
  
  res.status(201).json(data[0]);
};

export const getAppointments = async (req, res) => {
  const { data, error } = await supabase
    .from('appointments')
    .select('*, property:property_id(*), agent:agent_id(*), client:client_id(*)')
    .or(`client_id.eq.${req.user.id},agent_id.eq.${req.user.id}`)
    .order('scheduled_at', { ascending: true });

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const createAppointment = async (req, res) => {
  const { propertyId, agentId, scheduledAt, type } = req.body;
  const { data, error } = await supabase
    .from('appointments')
    .insert([{ 
      client_id: req.user.id, 
      property_id: propertyId, 
      agent_id: agentId, 
      scheduled_at: scheduledAt,
      type: type || 'IN_PERSON'
    }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data[0]);
};
