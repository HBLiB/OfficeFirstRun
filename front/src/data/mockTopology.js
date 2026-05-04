export const mockTopologyData = {
  nodes: [
    {
      id: "h-fw",
      label: "h-fw (FortiGate)",
      type: "firewall",
      asn: 65000,
      x: 400,
      y: 50,
      description: "Central hub firewall, BGP route reflector",
      services: []
    },
    {
      id: "h-srv",
      label: "h-srv",
      type: "server",
      asn: 65010,
      x: 150,
      y: 280,
      description: "Infrastructure services hub",
      services: ["HAProxy", "Grafana", "NetBox", "Gitea", "h-cli"]
    },
    {
      id: "h-oracle",
      label: "h-oracle",
      type: "gpu",
      asn: 65020,
      x: 400,
      y: 280,
      description: "Oracle Cloud ARM instance for compute workloads",
      services: ["Docker", "Monitoring Agent"]
    },
    {
      id: "h-titan",
      label: "h-titan",
      type: "lab",
      asn: 65030,
      x: 650,
      y: 280,
      description: "EVE-NG lab host for network simulation",
      services: ["EVE-NG", "Wireshark"]
    }
  ],
  links: [
    {
      source: "h-fw",
      target: "h-srv",
      protocol: "eBGP",
      label: "AS65000 ↔ AS65010",
      prefixes: 12
    },
    {
      source: "h-fw",
      target: "h-oracle",
      protocol: "eBGP",
      label: "AS65000 ↔ AS65020",
      prefixes: 8
    },
    {
      source: "h-fw",
      target: "h-titan",
      protocol: "eBGP",
      label: "AS65000 ↔ AS65030",
      prefixes: 30
    }
  ],
  metadata: {
    title: "Homelab Network — Hub-Spoke BGP",
    total_routes: 50,
    description: "Production-grade homelab: hub-spoke BGP, full telemetry, EVE-NG lab integration"
  }
};
