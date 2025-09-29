const fs = require('fs');
const path = require('path');

// Get the API key from environment
const apiKey = process.env.VITE_OPENAI_API_KEY;

if (apiKey) {
  // Find the main JS file in dist
  const distDir = path.join(__dirname, '../dist');
  const assetsDir = path.join(distDir, 'assets');
  
  if (fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(assetsDir);
    const jsFile = files.find(file => file.endsWith('.js'));
    
    if (jsFile) {
      const filePath = path.join(assetsDir, jsFile);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Inject the API key into the global window object
      const injection = `window.__OPENAI_API_KEY__="${apiKey}";`;
      content = injection + content;
      
      fs.writeFileSync(filePath, content);
      console.log('API key injected successfully');
    }
  }
} else {
  console.log('No API key found in environment');
}
