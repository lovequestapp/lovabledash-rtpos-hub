import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Add error handling for mobile debugging
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Show error on page for debugging
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: red;
    color: white;
    padding: 10px;
    z-index: 9999;
    font-family: monospace;
    font-size: 12px;
  `;
  errorDiv.textContent = `Error: ${event.error?.message || 'Unknown error'}`;
  document.body.appendChild(errorDiv);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    background: orange;
    color: white;
    padding: 10px;
    z-index: 9999;
    font-family: monospace;
    font-size: 12px;
  `;
  errorDiv.textContent = `Promise Error: ${event.reason}`;
  document.body.appendChild(errorDiv);
});

// Check if root element exists
const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error('Root element not found!');
  document.body.innerHTML = '<div style="padding: 20px; color: red;">Error: Root element not found!</div>';
} else {
  try {
    const root = createRoot(rootElement);
    root.render(<App />);
    console.log('React app initialized successfully');
  } catch (error) {
    console.error('React initialization error:', error);
    rootElement.innerHTML = `<div style="padding: 20px; color: red;">React Error: ${error}</div>`;
  }
}
