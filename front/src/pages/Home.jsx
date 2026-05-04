import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="hero">
      <h1>ISP &amp; Datacenter Networking Consultant</h1>
      <p className="tagline">
        Designing resilient networks — from BGP peering strategies to spine-leaf fabrics.
        Helping service providers and enterprises build infrastructure that scales.
      </p>
      <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
    </section>
  );
}

export default Home;
