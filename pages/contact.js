import { useState } from 'react';
import { postAPI } from '../lib/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      await postAPI('/contact', form);
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  }

  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-6">Contact</h1>
      {status === 'sent' ? (
        <p className="text-green-600">Thanks! Your message has been sent.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <input
            required placeholder="Your name" value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
          <input
            required type="email" placeholder="Your email" value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
          <input
            placeholder="Subject" value={form.subject}
            onChange={(e) => update('subject', e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
          <textarea
            required rows={5} placeholder="Message" value={form.message}
            onChange={(e) => update('message', e.target.value)}
            className="w-full border rounded-md px-3 py-2"
          />
          <button type="submit" disabled={status === 'sending'} className="bg-brand text-white px-5 py-2 rounded-md font-medium">
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      )}
    </div>
  );
}