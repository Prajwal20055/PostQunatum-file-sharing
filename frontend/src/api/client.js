// API base URL - can be configured via environment variable or auto-detected
// In production, set VITE_API_BASE_URL environment variable
// For development, defaults to current hostname with port 5000
const getApiBase = () => {
  // Check for environment variable (set at build time)
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // Auto-detect: use current hostname (works for network access)
  // If running on localhost, use localhost; otherwise use current hostname
  const hostname = window.location.hostname;
  const port = import.meta.env.VITE_API_PORT || '5000';
  
  // If accessing via IP address or domain, use that; otherwise use localhost
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return `http://localhost:${port}`;
  } else {
    return `http://${hostname}:${port}`;
  }
};

export const API_BASE = getApiBase();

export async function post(path, body) {
  const res = await fetch(API_BASE + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  return res;
}

export async function get(path) {
  const res = await fetch(API_BASE + path);
  return res;
}
