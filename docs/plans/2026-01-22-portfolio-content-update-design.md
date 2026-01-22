# Portfolio Content Update Design

**Date:** 2026-01-22
**Status:** Approved

## Overview

Update portfolio website content to reflect accurate work history, refresh project descriptions, and fix placeholder content.

## Sections to Update

### 1. Experience Section

**Approach:** Hybrid timeline showing career progression through three phases.

#### Phase 1: Security Foundations (2021-2023)

**Olezka Global** — SOC Analyst (6 months)
- Traditional security monitoring, incident response, risk assessments
- Tools: CrowdStrike, Tenable, Fortinet, ServiceNow

**AWS SOC CloudOps** — Security Engineer / Tech Lead (10 months)
- Real-time incident management, automation scripts for alert triage

#### Phase 2: Cloud Security Response (2023-2024)

**AWS CloudOps Internal Security** — Security Engineer / Team Lead (10 months)
- Platform security (PRISM)

**AWS Security Cloud Responder** (6 months)
- Incident response at cloud scale

**AWS Cloud Security Data Enrichment** (9 months)
- Security automation frameworks, anomaly detection, AI-driven insights

#### Phase 3: AI Security Engineering (2024-Present)

**AWS Security Response Platform & Tooling** (7 months)
- LLM integration for validation, advanced search/analysis features

**AWS Security ORD** — AI Security Engineer (Current)
- Agentic solutions, Tier 2 escalations, data enrichment

---

### 2. About Section

**Keep current layout** (bio narrative + info cards), refresh content:

#### Info Cards Update

| Card            | Updated Value                                                                                      |
| --------------- | -------------------------------------------------------------------------------------------------- |
| **Role**        | AI Security Engineer at AWS Security ORD (2022 - Present, ~4 years)                                |
| **Location**    | Seattle, Washington                                                                                |
| **Focus Areas** | Agentic AI systems, Security automation, LLM integration, Cloud security response, Data enrichment |
| **Background**  | Film production (DP/Editor), CrossFit L1, TCCC trained                                             |
| **Education**   | BS Cybersecurity & Networking (UMGC), SANS training                                                |

#### Bio Refresh
- Current: AI Security Engineer at AWS Security ORD
- ~4 years at AWS, progressing from SOC to AI security
- Focus on agentic systems, automation, LLM integration
- Brief nod to creative background (problem-solving parallel)

---

### 3. Projects Section

**Four projects** with architecture diagrams:

#### Project 1: ACRS (Autonomous Compliance & Response System)
**Status:** Featured

**Description:** AI-powered multi-agent system for DoD compliance automation. Automatically detects, analyzes, and remediates NIST 800-171/CMMC violations with confidence-based decision routing.

**Architecture (5-agent pipeline):**
```
Wazuh Alert
     ↓
[Detection Agent] → Haiku 4.5 - Classify, map to NIST control
     ↓
[Analysis Agent] → Sonnet 4.5 - Root cause, remediation options
     ↓
[Decision Agent] → Sonnet 4.5 - Confidence scoring (threshold: 0.8)
     ↓
     ├── ≥ 0.8 → [Remediation Agent] → Execute with snapshot/rollback
     └── < 0.8 → [Documentation Agent] → Escalation ticket
                        ↓
                 Immutable S3 audit log
```

**Tech:** Strands Agents SDK, Amazon Bedrock (Claude), Wazuh SIEM, Python, FastAPI

**Tags:** #StrandsAgents #Claude #WazuhSIEM #NIST800-171 #CMMC #Python

---

#### Project 2: Snapshot-Sleuth
**Status:** Open Source
**GitHub:** github.com/Stealinglight/Snapshot-Sleuth

**Description:** AWS-native automated EBS snapshot forensics platform. Orchestrates end-to-end investigation workflows with parallel forensic tool execution and pluggable case management.

**Architecture (Step Functions pipeline):**
```
Trigger (CLI/EventBridge/API)
     ↓
[Validate Snapshot] → Lambda (TS)
     ↓
[Provision Environment] → Mount EBS volume
     ↓
[Parallel Forensic Analysis]
├── YARA (pattern detection)
├── ClamAV (malware scan)
├── EvidenceMiner (artifact extraction)
└── Log2Timeline (forensic timeline)
     ↓
[Upload to S3] → Evidence + Artifacts (KMS encrypted)
     ↓
[Notifications] → Slack / Email / GitHub Issues
     ↓
[Cleanup]
```

**Tech:** AWS Step Functions, Lambda (TS + Python), S3, CDK, CloudWatch

**Tags:** #AWS #CDK #StepFunctions #Lambda #Forensics #OpenSource

---

#### Project 3: StravaMCP (NEW)
**Status:** Open Source
**GitHub:** github.com/Stealinglight/StravaMCP

**Description:** Remote MCP server for Strava API running on AWS Lambda. Use your Strava fitness data with Claude for analysis and insights. Runs completely free on AWS Free Tier.

**Architecture:**
```
Claude Desktop/Code
     ↓
[MCP Protocol]
     ↓
[Lambda Function] → API Gateway
     ↓
[Strava API] → Activities, Stats, Routes
     ↓
Response to Claude
```

**Tech:** TypeScript, AWS Lambda, API Gateway, MCP SDK

**Tags:** #MCP #AWS #Lambda #TypeScript #Strava #OpenSource

---

#### Project 4: wrist-agent (NEW)
**Status:** Open Source
**GitHub:** github.com/Stealinglight/wrist-agent

**Description:** One-tap voice capture from Apple Watch that routes through AWS Lambda to Amazon Bedrock for AI processing, then creates Notes or Reminders automatically.

**Architecture:**
```
Apple Watch (one-tap)
     ↓
[Voice Recording]
     ↓
[Lambda Function]
     ↓
[Amazon Bedrock] → Claude processing
     ↓
[Apple Notes / Reminders]
```

**Tech:** Go, AWS Lambda, Amazon Bedrock, watchOS

**Tags:** #Go #AWS #Bedrock #AppleWatch #Voice #OpenSource

---

### 4. Contact Section

**Fix placeholder email:**
- From: `chris@example.com`
- To: `stealinglight@gmail.com`

---

## Files to Modify

| File                                   | Changes                                                                          |
| -------------------------------------- | -------------------------------------------------------------------------------- |
| `src/components/ExperienceSection.tsx` | Replace experiences array with 3-phase structure                                 |
| `src/components/AboutSection.tsx`      | Update role, dates, focus areas, add education                                   |
| `src/components/ProjectsSection.tsx`   | Update ACRS/Snapshot-Sleuth descriptions + diagrams, add StravaMCP + wrist-agent |
| `src/components/ContactSection.tsx`    | Fix email placeholder                                                            |

## Verification

1. `bun run dev` - Visual review of all updated sections
2. `bun run build` - Ensure production build succeeds
3. `bun run test` - Ensure tests still pass
4. Manual review of architecture diagrams for accuracy
