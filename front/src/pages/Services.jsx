import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { mockServicesData } from '../data/mockServices';

const ICON_MAP = {
  network: '🌐',
  server: '🖥️',
};

function Services() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/services`)
      .then((res) => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(setData)
      .catch(() => {
        setError(true);
        setData(mockServicesData);
      });
  }, []);

  if (!data) return <p className="loading">Loading services…</p>;

  return (
    <section className="services">
      <h1>Services</h1>
      {error && <p className="notice">Using demo data — API unavailable.</p>}
      {data.categories.map((cat) => (
        <div key={cat.name} className="service-category">
          <h2>{cat.name}</h2>
          <div className="service-grid">
            {cat.services.map((svc) => (
              <div key={svc.id} className="service-card">
                <span className="service-icon">{ICON_MAP[svc.icon] || '⚙️'}</span>
                <h3>{svc.title}</h3>
                <p>{svc.summary}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default Services;
