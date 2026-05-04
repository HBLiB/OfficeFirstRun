from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, field_validator
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.orm import DeclarativeBase, Session
from datetime import datetime, timezone
import os
import logging
import time

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("api")

# ---------------------------------------------------------------------------
# Database
# ---------------------------------------------------------------------------
DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data.db")
engine = create_engine(f"sqlite:///{DB_PATH}", echo=False)


class Base(DeclarativeBase):
    pass


class ContactSubmission(Base):
    __tablename__ = "contact_submissions"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    email = Column(String(255), nullable=False)
    company = Column(String(255), nullable=True)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


Base.metadata.create_all(engine)

# ---------------------------------------------------------------------------
# Seed data
# ---------------------------------------------------------------------------
SERVICES = {
    "categories": [
        {
            "name": "ISP Networking",
            "services": [
                {"id": 1, "title": "BGP Design & Optimization", "summary": "Full-mesh and route-reflector designs, policy tuning, community strategies.", "icon": "network"},
                {"id": 2, "title": "Peering Strategy (IXP, PNI)", "summary": "Evaluate peering options, negotiate PNI, deploy route-server sessions at IXPs.", "icon": "handshake"},
                {"id": 3, "title": "Transit Engineering", "summary": "Multi-homed transit selection, traffic engineering with BGP communities and MED.", "icon": "globe"},
                {"id": 4, "title": "MPLS/Segment Routing", "summary": "LDP/RSVP migration to SR-MPLS or SRv6, traffic-engineering tunnel design.", "icon": "route"},
            ],
        },
        {
            "name": "Datacenter Networking",
            "services": [
                {"id": 5, "title": "EVPN/VXLAN Fabric Design", "summary": "Spine-leaf fabric design with EVPN control plane for multi-tenant environments.", "icon": "server"},
                {"id": 6, "title": "Spine-Leaf Architecture", "summary": "Scalable L3 Clos topologies with ECMP, automated underlay provisioning.", "icon": "layers"},
                {"id": 7, "title": "DCI (Datacenter Interconnect)", "summary": "Stretched fabrics and DCI overlays for disaster recovery and workload mobility.", "icon": "link"},
                {"id": 8, "title": "Network Automation & Observability", "summary": "CI/CD pipelines for config management, streaming telemetry, and alerting.", "icon": "terminal"},
            ],
        },
    ]
}

CASE_STUDIES_LIST = [
    {
        "id": 1,
        "title": "Worldstream EVPN/VXLAN Fabric",
        "category": "Datacenter Networking",
        "challenge": "Legacy spanning-tree topology limiting scale across multiple datacenter halls.",
        "solution": "Designed and deployed a multi-pod EVPN/VXLAN spine-leaf fabric with automated provisioning.",
        "result": "Zero unplanned downtime post-migration, 3x port density increase.",
        "tech_tags": ["EVPN", "VXLAN", "Spine-Leaf", "Ansible", "Arista"],
        "quote": "All built by hand, before AI was an option.",
        "year": "2021",
    },
    {
        "id": 2,
        "title": "NEP Broadcast Streaming Telemetry",
        "category": "ISP Networking",
        "challenge": "No real-time visibility into broadcast-grade network performance across distributed PoPs.",
        "solution": "Deployed model-driven streaming telemetry with gNMI collectors, Prometheus, and Grafana dashboards.",
        "result": "Sub-second anomaly detection, 60% faster MTTR on transport issues.",
        "tech_tags": ["gNMI", "Streaming Telemetry", "Prometheus", "Grafana", "MPLS"],
        "quote": "All built by hand, before AI was an option.",
        "year": "2022",
    },
    {
        "id": 3,
        "title": "EBPI ACI + OpenStack Integration",
        "category": "Datacenter Networking",
        "challenge": "Siloed network and compute teams, manual VLAN provisioning for OpenStack tenants.",
        "solution": "Integrated Cisco ACI with OpenStack Neutron via ML2 plugin, automated tenant network lifecycle.",
        "result": "Tenant provisioning reduced from days to minutes, consistent policy enforcement.",
        "tech_tags": ["ACI", "OpenStack", "Neutron", "Python", "Cisco"],
        "quote": None,
        "year": "2020",
    },
    {
        "id": 4,
        "title": "Flow Analytics Platform",
        "category": "ISP Networking",
        "challenge": "Unbalanced egress traffic and no granular visibility into traffic patterns across transit providers.",
        "solution": "Built a NetFlow/sFlow analytics platform with BGP-aware traffic classification and cost modeling.",
        "result": "Even traffic distribution, 25% cost saving on 95th-percentile billing.",
        "tech_tags": ["NetFlow", "sFlow", "BGP", "Python", "Elasticsearch"],
        "quote": "All built by hand, before AI was an option.",
        "year": "2019",
    },
]

CASE_STUDIES = {"case_studies": [{k: v for k, v in cs.items() if k in ("id", "title", "category", "challenge", "solution", "result")} for cs in CASE_STUDIES_LIST]}
CASE_STUDIES_BY_ID = {cs["id"]: cs for cs in CASE_STUDIES_LIST}

TOPOLOGY = {
    "nodes": [
        {
            "id": "h-fw",
            "label": "h-fw (FortiGate)",
            "type": "firewall",
            "asn": 65000,
            "x": 400,
            "y": 50,
            "description": "Central hub firewall, BGP route reflector",
        },
        {
            "id": "h-srv",
            "label": "h-srv",
            "type": "server",
            "asn": 65010,
            "x": 200,
            "y": 250,
            "services": ["HAProxy", "Grafana", "NetBox", "Gitea", "h-cli"],
            "description": "Infrastructure services hub",
        },
        {
            "id": "h-oracle",
            "label": "h-oracle",
            "type": "server",
            "asn": 65100,
            "x": 400,
            "y": 250,
            "services": ["h-knowledge", "vLLM", "Ollama"],
            "description": "Dual RTX 5090, local LLM inference",
        },
        {
            "id": "h-titan",
            "label": "h-titan",
            "type": "server",
            "asn": 65101,
            "x": 600,
            "y": 250,
            "services": ["EVE-NG Pro"],
            "description": "RTX 3090/4070Ti, unlimited lab topologies (CLOS/EVPN/MPLS)",
        },
    ],
    "links": [
        {
            "source": "h-fw",
            "target": "h-srv",
            "protocol": "eBGP",
            "label": "AS65000 ↔ AS65010",
            "prefixes": 12,
        },
        {
            "source": "h-fw",
            "target": "h-oracle",
            "protocol": "eBGP",
            "label": "AS65000 ↔ AS65100",
            "prefixes": 8,
        },
        {
            "source": "h-fw",
            "target": "h-titan",
            "protocol": "eBGP",
            "label": "AS65000 ↔ AS65101",
            "prefixes": 30,
        },
    ],
    "metadata": {
        "title": "Homelab Network — Hub-Spoke BGP",
        "total_routes": 50,
        "description": "Production-grade homelab: hub-spoke BGP, full telemetry, EVE-NG lab integration",
    },
}

PROJECTS = {
    "projects": [
        {
            "id": 1,
            "name": "h-cli",
            "tagline": "AI-powered infrastructure management",
            "description": "9 Docker services, 44 hardening items, unified CLI for network operations.",
            "tech": ["Python", "Docker", "Redis", "FastAPI"],
            "status": "active",
            "url": None,
        },
        {
            "id": 2,
            "name": "h-ssh",
            "tagline": "Multi-vendor network automation",
            "description": "Parallel SSH/NETCONF/eAPI execution with commit-confirmed rollback.",
            "tech": ["Python", "Paramiko", "NETCONF", "eAPI"],
            "status": "active",
            "url": None,
        },
        {
            "id": 3,
            "name": "h-knowledge",
            "tagline": "LLM-optimized vendor knowledge base",
            "description": "50k+ verified vectors, 7-stage Redis pipeline for vendor documentation RAG.",
            "tech": ["Python", "Redis", "Qdrant", "vLLM"],
            "status": "active",
            "url": None,
        },
        {
            "id": 4,
            "name": "Batfish+MPLS",
            "tagline": "Network verification with MPLS support",
            "description": "Batfish fork adding MPLS/LDP/RSVP analysis for offline network verification.",
            "tech": ["Java", "Batfish", "MPLS"],
            "status": "in-development",
            "url": None,
        },
    ]
}

# ---------------------------------------------------------------------------
# Pydantic models
# ---------------------------------------------------------------------------

class ContactRequest(BaseModel):
    name: str
    email: EmailStr
    company: str | None = None
    message: str

    @field_validator("name")
    @classmethod
    def name_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v or len(v) > 100:
            raise ValueError("Name is required and must be 1-100 characters")
        return v

    @field_validator("message")
    @classmethod
    def message_not_empty(cls, v: str) -> str:
        v = v.strip()
        if not v or len(v) > 2000:
            raise ValueError("Message is required and must be 1-2000 characters")
        return v


# ---------------------------------------------------------------------------
# App
# ---------------------------------------------------------------------------
app = FastAPI(title="Freelancer POC API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def log_requests(request, call_next):
    start = time.perf_counter()
    response = await call_next(request)
    ms = int((time.perf_counter() - start) * 1000)
    logger.info("%s %s %s %dms", request.method, request.url.path, response.status_code, ms)
    return response


@app.get("/api/services")
def get_services():
    return SERVICES


@app.get("/api/case-studies")
def get_case_studies():
    return CASE_STUDIES


@app.get("/api/case-studies/{case_id}")
def get_case_study(case_id: int):
    cs = CASE_STUDIES_BY_ID.get(case_id)
    if not cs:
        raise HTTPException(status_code=404, detail="Case study not found")
    return cs


@app.get("/api/topology")
def get_topology():
    return TOPOLOGY


@app.get("/api/projects")
def get_projects():
    return PROJECTS


@app.post("/api/contact", status_code=status.HTTP_201_CREATED)
def post_contact(body: ContactRequest):
    with Session(engine) as session:
        submission = ContactSubmission(
            name=body.name,
            email=body.email,
            company=body.company,
            message=body.message,
        )
        session.add(submission)
        session.commit()
    return {"status": "ok", "message": "Thank you, we'll be in touch."}


@app.get("/api/health")
def get_health():
    return {
        "status": "ok",
        "timestamp": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "version": "0.1.0",
    }
