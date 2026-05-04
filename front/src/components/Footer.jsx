import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <span className="footer-copy">&copy; 2026 H-Network</span>
      <nav className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/lab">Lab</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </footer>
  );
}

export default Footer;
