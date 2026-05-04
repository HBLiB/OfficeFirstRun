import { useEffect } from 'react';

function About() {
  useEffect(() => { document.title = 'About — H-Network'; }, []);

  return (
    <section className="about">
      <h1>About</h1>
      <p>
        Independent networking consultant with over a decade of experience
        designing, deploying, and optimizing ISP and datacenter networks
        across Europe and North America.
      </p>
      <h2>Core Experience</h2>
      <ul>
        <li><strong>BGP &amp; Peering</strong> — Route policy design, IXP strategy, transit optimization for regional and national ISPs.</li>
        <li><strong>Datacenter Fabric Design</strong> — Spine-leaf architectures with EVPN/VXLAN, multi-site DCI, and automated provisioning.</li>
        <li><strong>Network Automation</strong> — CI/CD pipelines for network configuration using Ansible, Nornir, and GitOps practices.</li>
        <li><strong>Capacity Planning &amp; Migration</strong> — Traffic modeling, upgrade planning, and zero-downtime migration strategies.</li>
      </ul>
    </section>
  );
}

export default About;
