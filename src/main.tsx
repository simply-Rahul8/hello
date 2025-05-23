
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// src/api/fetchData.ts
export async function fetchSomething() {
  const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/your-endpoint`);
  if (!res.ok) {
    throw new Error("API call failed");
  }
  const data = await res.json();
  return data;
}


createRoot(document.getElementById("root")!).render(<App />);
