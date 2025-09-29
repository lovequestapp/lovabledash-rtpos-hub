import { createClient } from '@supabase/supabase-js'

// Simple fallback configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key:', supabaseAnonKey ? 'Present' : 'Missing')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
