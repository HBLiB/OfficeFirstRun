from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr, field_validator
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.orm import DeclarativeBase, Session
from datetime import datetime, timezone

# ---------------------------------------------------------------------------
# Database
# ---------------------------------------------------------------------------
import os

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

CASE_STUDIES = {
    "case_studies": [
        {
            "id": 1,
            "title": "Regional ISP Peering Optimization",
            "category": "ISP Networking",
            "challenge": "High transit costs, single upstream dependency.",
            "solution": "Established IXP presence at 3 exchanges, deployed route-server peering.",
            "result": "40% transit cost reduction, improved latency.",
        },
        {
            "id": 2,
            "title": "Datacenter Fabric Migration",
            "category": "Datacenter Networking",
            "challenge": "Legacy spanning-tree topology causing outages and limiting scale.",
            "solution": "Designed and migrated to an EVPN/VXLAN spine-leaf fabric with automated deployment.",
            "result": "Zero unplanned downtime post-migration, 3x port density increase.",
        },
        {
            "id": 3,
            "title": "Multi-homed Transit Optimization",
            "category": "ISP Networking",
            "challenge": "Unbalanced egress traffic across three transit providers.",
            "solution": "Implemented BGP community-based traffic engineering and selective prepending.",
            "result": "Even traffic distribution, 25% cost saving on 95th-percentile billing.",
        },
        {
            "id": 4,
            "title": "DCI for Disaster Recovery",
            "category": "Datacenter Networking",
            "challenge": "No active-active capability between two geographically separated datacenters.",
            "solution": "Deployed DCI overlay with EVPN multi-homing and stretched VNIs.",
            "result": "RPO near-zero, seamless workload mobility during maintenance windows.",
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


@app.get("/api/services")
def get_services():
    return SERVICES


@app.get("/api/case-studies")
def get_case_studies():
    return CASE_STUDIES


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
