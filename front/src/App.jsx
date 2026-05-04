import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Lab from './pages/Lab';
import CaseDetail from './pages/CaseDetail';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app dark">
      <nav className="navbar">
        <span className="logo">NetConsult</span>
        <div className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/lab">Lab</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <a href="/#projects">Projects</a>
        </div>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cases/:id" element={<CaseDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
