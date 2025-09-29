// This script will be injected by Netlify to provide environment variables
(function() {
  if (typeof window !== 'undefined') {
    window.__NETLIFY_ENV__ = {
      VITE_OPENAI_API_KEY: process.env.VITE_OPENAI_API_KEY
    };
  }
})();
