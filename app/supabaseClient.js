import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase project URL and public anon key
const supabaseUrl = 'https://kkngfawdtautxjktzsqj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrbmdmYXdkdGF1dHhqa3R6c3FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ5NjI0OTQsImV4cCI6MjA0MDUzODQ5NH0.4QeE1xwsQTPPqFQO2xTuHrbwP--9r-bfxUDD9klGMbs';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
