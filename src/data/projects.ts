import type { DiagramConfig } from './diagrams';
import {
  acrsDiagram,
  snapshotSleuthDiagram,
  stravaMCPDiagram,
  wristAgentDiagram,
} from './diagrams';

export type ProjectBadgeType = 'featured' | 'open-source';

export interface Project {
  id: string;
  name: string;
  tagline: string;
  badge: ProjectBadgeType;
  categories: string[];
  description: string;
  hashtags: string[];
  diagram: DiagramConfig;
  diagramCaption: string;
  githubUrl?: string;
  learnMoreUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'acrs',
    name: 'ACRS',
    tagline: 'Autonomous Compliance & Response System',
    badge: 'featured',
    categories: ['Multi-Agent AI', 'Compliance Automation'],
    description:
      'AI-powered multi-agent system for DoD compliance automation. A 5-agent pipeline (Detection → Analysis → Decision → Remediation/Escalation → Documentation) that automatically processes NIST 800-171/CMMC violations from Wazuh SIEM. Uses confidence-based routing: high-confidence violations get auto-remediated, uncertain cases escalate to human review. All actions logged to immutable S3 audit trails.',
    hashtags: [
      '#StrandsAgents',
      '#Claude',
      '#Bedrock',
      '#WazuhSIEM',
      '#NIST800-171',
      '#Python',
    ],
    diagram: acrsDiagram,
    diagramCaption: 'Confidence ≥ 0.8 → Auto-remediate | < 0.8 → Escalate',
    learnMoreUrl: '#',
  },
  {
    id: 'snapshot-sleuth',
    name: 'Snapshot Sleuth',
    tagline: 'AWS EBS Forensics Automation',
    badge: 'open-source',
    categories: ['Step Functions', 'Forensics'],
    description:
      'AWS-native automated EBS snapshot forensics platform. Orchestrates end-to-end investigation workflows with parallel forensic tool execution (YARA, ClamAV, EvidenceMiner, Log2Timeline), KMS-encrypted evidence storage, and pluggable case management.',
    hashtags: ['#AWS', '#CDK', '#StepFunctions', '#Lambda', '#TypeScript', '#Python'],
    diagram: snapshotSleuthDiagram,
    diagramCaption: 'Parallel forensic analysis → KMS-encrypted storage → Case management',
    githubUrl: 'https://github.com/Stealinglight/Snapshot-Sleuth',
  },
  {
    id: 'strava-mcp',
    name: 'StravaMCP',
    tagline: 'MCP Server for Strava API',
    badge: 'open-source',
    categories: ['MCP', 'Serverless'],
    description:
      'Remote MCP server for Strava API running on AWS Lambda. Use your Strava fitness data with Claude for activity analysis, training insights, and route planning. Runs completely free on AWS Free Tier.',
    hashtags: ['#MCP', '#AWS', '#Lambda', '#TypeScript', '#Strava'],
    diagram: stravaMCPDiagram,
    diagramCaption: 'Activities • Stats • Routes → Claude analysis',
    githubUrl: 'https://github.com/Stealinglight/StravaMCP',
  },
  {
    id: 'wrist-agent',
    name: 'wrist-agent',
    tagline: 'Apple Watch → Bedrock → Notes',
    badge: 'open-source',
    categories: ['Go', 'Voice AI'],
    description:
      'One-tap voice capture from Apple Watch that routes through AWS Lambda to Amazon Bedrock for AI processing, then automatically creates Notes or Reminders. Capture thoughts instantly and let AI organize them.',
    hashtags: ['#Go', '#AWS', '#Bedrock', '#AppleWatch', '#Voice'],
    diagram: wristAgentDiagram,
    diagramCaption: 'One tap → Voice → AI processing → Organized output',
    githubUrl: 'https://github.com/Stealinglight/wrist-agent',
  },
];
