import LoadingSpinner from '../components/LoadingSpinner';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { mockServicesData } from '../data/mockServices';
import { mockCaseStudiesData } from '../data/mockCaseStudies';

const ICON_MAP = {
  network: '🌐',
  server: '🖥️',
};

function Services() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [cases, setCases] = useState([]);

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

    fetch(`${API_BASE_URL}/api/case-studies`)
      .then((res) => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then((d) => setCases(d.case_studies || []))
      .catch(() => setCases(mockCaseStudiesData));
  }, []);

  if (!data) return <LoadingSpinner text="Loading services…" />;

  return (
    <section className="services">
      <h1>Services</h1>
      {error && <p className="notice notice-dark">Using demo data — API unavailable.</p>}
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
      {cases.length > 0 && (
        <div className="case-studies-list">
          <h2>Case Studies</h2>
          <div className="service-grid">
            {cases.map((cs) => (
              <Link to={`/cases/${cs.id}`} key={cs.id} className="service-card case-card-link">
                <span className="badge badge-category">{cs.category}</span>
                <h3>{cs.title}</h3>
                <p>{cs.challenge}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default Services;
