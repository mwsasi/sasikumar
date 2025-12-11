import { createClient } from '@supabase/supabase-js';

// Configuration from your Supabase project settings
const supabaseUrl = 'https://ggfmjsuklcuopevdmpka.supabase.co';
const supabaseKey = 'sb_publishable_6lfAuxilRrtNXKyHyc4_xA_ypgFilHn';

export const supabase = createClient(supabaseUrl, supabaseKey);