// Environment configuration
export const env = {
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  GOOGLE_MAPS_API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
};

// Validation function to check if required environment variables are set
export const validateEnv = () => {
  const missingVars = [];
  const invalidVars = [];

  if (!env.SUPABASE_URL) missingVars.push('VITE_SUPABASE_URL');
  if (!env.SUPABASE_ANON_KEY) missingVars.push('VITE_SUPABASE_ANON_KEY');
  
  // Specific validation for Google Maps API key
  if (!env.GOOGLE_MAPS_API_KEY) {
    missingVars.push('VITE_GOOGLE_MAPS_API_KEY');
  } else if (!/^AIza[A-Za-z0-9_-]{27,}$/.test(env.GOOGLE_MAPS_API_KEY)) {
    invalidVars.push('VITE_GOOGLE_MAPS_API_KEY');
  }

  if (missingVars.length > 0 || invalidVars.length > 0) {
    const errors = [];
    if (missingVars.length > 0) {
      errors.push(`Missing required environment variables: ${missingVars.join(', ')}`);
    }
    if (invalidVars.length > 0) {
      errors.push(`Invalid environment variables format: ${invalidVars.join(', ')}`);
    }
    throw new Error(errors.join('\n') + '\nPlease check your .env file and ensure all required variables are set correctly.');
  }
};