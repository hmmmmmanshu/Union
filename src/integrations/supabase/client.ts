// Supabase client configuration for Union
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

// Use placeholder values if environment variables are missing
const isDevelopment = import.meta.env.DEV;

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Log warning in development if using placeholder values
if (isDevelopment && (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY)) {
  console.warn('⚠️ Supabase environment variables not found. Using placeholder values. Please check your .env file.');
  console.warn('Expected variables: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY');
}