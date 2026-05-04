import LoadingSpinner from '../components/LoadingSpinner';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { mockTopologyData } from '../data/mockTopology';

const NODE_COLORS = {
  firewall: '#e74c3c',
  server: '#3498db',
  gpu: '#2ecc71',
  lab: '#9b59b6',
};

const NODE_RADIUS = 30;

function Lab() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => { document.title = 'Lab — H-Network'; }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/topology`)
      .then((res) => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(setData)
      .catch(() => {
        setError(true);
        setData(mockTopologyData);
      });
  }, []);

  if (!data) return <LoadingSpinner text="Loading topology…" />;

  const nodeMap = {};
  data.nodes.forEach((n) => { nodeMap[n.id] = n; });

  return (
    <section className="lab">
      <div className="lab-header">
        <h1>{data.metadata.title}</h1>
        <p className="lab-desc">{data.metadata.description}</p>
        <span className="lab-routes">{data.metadata.total_routes} total routes</span>
      </div>
      {error && <p className="notice notice-dark">Using demo data — API unavailable.</p>}
      <div className="lab-canvas">
        <svg viewBox="0 0 800 400" className="topology-svg">
          {data.links.map((link, i) => {
            const src = nodeMap[link.source];
            const tgt = nodeMap[link.target];
            if (!src || !tgt) return null;
            const midX = (src.x + tgt.x) / 2;
            const midY = (src.y + tgt.y) / 2;
            return (
              <g key={i}>
                <line
                  x1={src.x} y1={src.y} x2={tgt.x} y2={tgt.y}
                  stroke="#555" strokeWidth="2" strokeDasharray="6,3"
                />
                <text x={midX} y={midY - 10} className="link-label" textAnchor="middle">
                  {link.protocol}
                </text>
                <text x={midX} y={midY + 6} className="link-sublabel" textAnchor="middle">
                  {link.prefixes} prefixes
                </text>
              </g>
            );
          })}
          {data.nodes.map((node) => (
            <g
              key={node.id}
              className="topo-node"
              onClick={() => setSelected(selected?.id === node.id ? null : node)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={node.x} cy={node.y} r={NODE_RADIUS}
                fill={NODE_COLORS[node.type] || '#888'}
                stroke={selected?.id === node.id ? '#fff' : '#333'}
                strokeWidth={selected?.id === node.id ? 3 : 1.5}
              />
              <text x={node.x} y={node.y - NODE_RADIUS - 8} textAnchor="middle" className="node-label">
                {node.label}
              </text>
              <text x={node.x} y={node.y + 5} textAnchor="middle" className="node-asn">
                AS{node.asn}
              </text>
            </g>
          ))}
        </svg>
      </div>
      {selected && (
        <div className="node-detail">
          <h3>{selected.label}</h3>
          <p className="node-type-badge" style={{ background: NODE_COLORS[selected.type] }}>
            {selected.type}
          </p>
          <p>AS {selected.asn}</p>
          <p>{selected.description}</p>
          {selected.services && selected.services.length > 0 && (
            <>
              <h4>Services</h4>
              <ul>
                {selected.services.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </>
          )}
        </div>
      )}
    </section>
  );
}

export default Lab;
