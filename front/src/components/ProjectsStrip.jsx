import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { mockProjectsData } from '../data/mockProjects';

function ProjectsStrip() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/projects`)
      .then((res) => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(setData)
      .catch(() => setData(mockProjectsData));
  }, []);

  if (!data) return null;

  return (
    <section className="projects-strip" id="projects">
      <h2>Projects</h2>
      <div className="projects-scroll">
        {data.projects.map((proj) => (
          <div key={proj.id} className="project-card">
            <div className="project-header">
              <h3>{proj.name}</h3>
              <span className={`status-badge status-${proj.status}`}>
                {proj.status === 'active' ? '● Active' : '◐ In Dev'}
              </span>
            </div>
            <p className="project-tagline">{proj.tagline}</p>
            <div className="project-tech">
              {proj.tech.map((t) => (
                <span key={t} className="badge badge-tech">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsStrip;
