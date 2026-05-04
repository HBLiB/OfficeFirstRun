import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import Toast from '../components/Toast';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => { document.title = 'Contact — H-Network'; }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    setErrors([]);

    try {
      const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company || undefined,
          message: form.message,
        }),
      });

      if (res.status === 201) {
        setStatus('success');
        setForm({ name: '', email: '', company: '', message: '' });
        setToast({ message: 'Message sent successfully!', type: 'success' });
      } else if (res.status === 422) {
        const body = await res.json();
        setErrors(body.detail || []);
        setStatus('error');
        setToast({ message: 'Please fix the errors and try again.', type: 'error' });
      } else {
        setStatus('error');
        setErrors([{ field: '', message: 'Unexpected error. Please try again.' }]);
        setToast({ message: 'Something went wrong.', type: 'error' });
      }
    } catch {
      setStatus('error');
      setErrors([{ field: '', message: 'Could not reach the server. Please try again later.' }]);
      setToast({ message: 'Could not reach the server.', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact">
      <h1>Contact</h1>
      {status === 'success' && <p className="msg msg-success">Thank you, we'll be in touch.</p>}
      {status === 'error' && errors.map((err, i) => (
        <p key={i} className="msg msg-error">{err.field ? `${err.field}: ` : ''}{err.message}</p>
      ))}
      <form onSubmit={handleSubmit} className="contact-form">
        <label>
          Name *
          <input name="name" value={form.name} onChange={handleChange} required maxLength={100} />
        </label>
        <label>
          Email *
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>
          Company
          <input name="company" value={form.company} onChange={handleChange} />
        </label>
        <label>
          Message *
          <textarea name="message" value={form.message} onChange={handleChange} required maxLength={2000} rows={5} />
        </label>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Sending…' : 'Send Message'}
        </button>
      </form>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
}

export default Contact;
