// Fetches content from the custom CMS backend.
// NEXT_PUBLIC_API_URL must be set in .env.local (see .env.local.example).
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function fetchAPI(path) {
  const res = await fetch(`${API_URL}${path}`, {
    // Revalidate content every 60s so CMS edits show up without a redeploy.
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error(`Failed to fetch ${path}: ${res.status}`);
    return null;
  }

  return res.json();
}

export async function postAPI(path, data) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.message || 'Request failed');
  return body;
}

export { API_URL };