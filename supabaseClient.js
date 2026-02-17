
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mcfhymldanfholwepxko.supabase.co';
const supabaseKey = 'sb_publishable_WhvHVYlG3YnRiqTgg0EGuQ_20p4odmP';

export const supabase = createClient(supabaseUrl, supabaseKey);
