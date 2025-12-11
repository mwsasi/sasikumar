import { createClient } from '@supabase/supabase-js';

// Configuration for 'Pick Me 1' Project
const supabaseUrl = 'https://ilpxhsueqfxljxyvfodm.supabase.co'; 
const supabaseKey = 'sb_publishable_oFCHSAGoKypPUGkrX9E6Xg_B-JSw1uK';

export const supabase = createClient(supabaseUrl, supabaseKey);