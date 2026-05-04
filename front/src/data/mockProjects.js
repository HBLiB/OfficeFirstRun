export const mockProjectsData = {
  projects: [
    {
      id: 1,
      name: "h-cli",
      tagline: "AI-powered infrastructure management",
      description: "9 Docker services, 44 hardening items, unified CLI for network operations.",
      tech: ["Python", "Docker", "Redis", "FastAPI"],
      status: "active",
      url: null
    },
    {
      id: 2,
      name: "NetBox Automator",
      tagline: "Source-of-truth sync for network devices",
      description: "Automated NetBox population from live network discovery via NAPALM and SNMP.",
      tech: ["Python", "NetBox", "NAPALM"],
      status: "active",
      url: null
    },
    {
      id: 3,
      name: "BGP Looking Glass",
      tagline: "Real-time route visibility dashboard",
      description: "Web-based looking glass for BGP route inspection across multiple vantage points.",
      tech: ["Go", "React", "gRPC"],
      status: "in-development",
      url: null
    }
  ]
};
