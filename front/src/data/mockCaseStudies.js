export const mockCaseStudiesData = [
  {
    id: 1,
    title: "Regional ISP Peering Optimization",
    category: "ISP Networking",
    challenge: "High transit costs, single upstream dependency.",
    solution: "Established IXP presence at 3 exchanges, deployed route-server peering.",
    result: "40% transit cost reduction, improved latency.",
    tech_tags: ["BGP", "IXP", "Route Servers", "Peering Policy"],
    quote: "All built by hand, before AI was an option.",
    year: "2020"
  },
  {
    id: 2,
    title: "DC Fabric Migration to EVPN/VXLAN",
    category: "Datacenter Networking",
    challenge: "Legacy spanning-tree fabric hitting scale limits with 500+ VLANs.",
    solution: "Designed and migrated to spine-leaf EVPN/VXLAN fabric with zero downtime.",
    result: "10x scale improvement, sub-millisecond failover.",
    tech_tags: ["EVPN", "VXLAN", "Spine-Leaf", "Arista"],
    quote: null,
    year: "2022"
  }
];
