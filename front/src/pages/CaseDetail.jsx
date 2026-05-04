import LoadingSpinner from '../components/LoadingSpinner';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';
import { mockCaseStudiesData } from '../data/mockCaseStudies';

function CaseDetail() {
  const { id } = useParams();
  const [study, setStudy] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    document.title = study ? `${study.title} — H-Network` : 'Loading… — H-Network';
  }, [study]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/case-studies/${id}`)
      .then((res) => {
        if (res.status === 404) { setNotFound(true); return null; }
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then((d) => { if (d) setStudy(d); })
      .catch(() => {
        setError(true);
        const mock = mockCaseStudiesData.find((c) => String(c.id) === String(id));
        if (mock) setStudy(mock);
        else setNotFound(true);
      });
  }, [id]);

  if (notFound) {
    return (
      <section className="case-detail">
        <h1>Case Study Not Found</h1>
        <p>The requested case study does not exist.</p>
        <Link to="/services" className="btn btn-primary">Back to Services</Link>
      </section>
    );
  }

  if (!study) return <LoadingSpinner text="Loading case study…" />;

  return (
    <section className="case-detail">
      {error && <p className="notice notice-dark">Using demo data — API unavailable.</p>}
      <Link to="/services" className="back-link">← Back to Services</Link>
      <h1>{study.title}</h1>
      <div className="case-meta">
        <span className="badge badge-category">{study.category}</span>
        {study.year && <span className="badge badge-year">{study.year}</span>}
      </div>
      {study.tech_tags && study.tech_tags.length > 0 && (
        <div className="tech-tags">
          {study.tech_tags.map((tag) => (
            <span key={tag} className="badge badge-tech">{tag}</span>
          ))}
        </div>
      )}
      <div className="case-sections">
        <div className="case-block">
          <h2>Challenge</h2>
          <p>{study.challenge}</p>
        </div>
        <div className="case-block">
          <h2>Solution</h2>
          <p>{study.solution}</p>
        </div>
        <div className="case-block">
          <h2>Outcome</h2>
          <p>{study.result}</p>
        </div>
      </div>
      {study.quote && (
        <blockquote className="case-quote">"{study.quote}"</blockquote>
      )}
    </section>
  );
}

export default CaseDetail;
