export const mockServicesData = {
  categories: [
    {
      name: "ISP Networking",
      services: [
        { id: 1, title: "BGP Design & Optimization", summary: "Full-mesh and route-reflector designs, policy tuning, community strategies.", icon: "network" },
        { id: 2, title: "Peering & Transit Strategy", summary: "IXP selection, peering policy, transit cost optimization.", icon: "network" },
        { id: 3, title: "MPLS / Segment Routing", summary: "Label-switched path design, traffic engineering, SR migration.", icon: "network" },
        { id: 4, title: "Network Automation", summary: "CI/CD for network configs, Ansible/Nornir pipelines, GitOps workflows.", icon: "network" },
      ],
    },
    {
      name: "Datacenter Networking",
      services: [
        { id: 5, title: "EVPN/VXLAN Fabric", summary: "Spine-leaf fabric design with EVPN control plane.", icon: "server" },
        { id: 6, title: "DC Interconnect", summary: "Multi-site DCI with stretched fabrics and disaster recovery.", icon: "server" },
        { id: 7, title: "Load Balancing & Traffic Management", summary: "L4/L7 load balancing architecture and health-check design.", icon: "server" },
      ],
    },
  ],
};
