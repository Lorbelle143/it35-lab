import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tuznqmjvruexlaxxhchy.supabase.co' 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1em5xbWp2cnVleGxheHhoY2h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI4NTk3NTAsImV4cCI6MjA1ODQzNTc1MH0.z4h_tVKRargnOZgvlr6gcclv-7jlDAB_axjOv5h5N7'

export const supabase = createClient(supabaseUrl, supabaseKey);