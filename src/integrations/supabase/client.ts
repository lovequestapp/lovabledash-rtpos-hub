import { createClient } from '@supabase/supabase-js'

// For Lovable's native Supabase integration, the URL and key are automatically provided
// Check if we're in Lovable environment with native integration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Create client with graceful fallback for development
export const supabase = createClient(supabaseUrl, supabaseAnonKey)