import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { ArchitectureDiagram } from './ArchitectureDiagram';

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6 bg-[#0a0a0a] relative">
      <div className="max-w-6xl mx-auto">
        <div className="font-mono text-[#00ff41] text-sm mb-8">
          <span className="opacity-50">03.</span> $ ls projects/
        </div>

        <h2 className="text-3xl md:text-4xl mb-16 tracking-wide uppercase">Featured Work</h2>

        <div className="space-y-16">
          {/* Project 1: ACRS */}
          <div className="border border-white/10 bg-[#1a1a1a]/30 overflow-hidden hover:border-[#00d9ff]/50 transition-all group">
            <div className="p-8 md:p-12">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-3xl md:text-4xl tracking-wide">ACRS</h3>
                  <span className="px-3 py-1 bg-[#00d9ff]/10 border border-[#00d9ff]/30 text-[#00d9ff] text-xs uppercase tracking-wider">
                    Featured
                  </span>
                </div>
                <p className="text-xl text-gray-300 mb-4">
                  Autonomous Compliance & Response System
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-[#0a0a0a] border border-[#00ff41]/30 text-[#00ff41] text-xs font-mono">
                    Multi-Agent AI
                  </span>
                  <span className="px-3 py-1 bg-[#0a0a0a] border border-[#00ff41]/30 text-[#00ff41] text-xs font-mono">
                    Compliance Automation
                  </span>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed mb-6">
                AI-powered multi-agent system for DoD compliance automation. A 5-agent pipeline (Detection →
                Analysis → Decision → Remediation/Escalation → Documentation) that automatically processes
                NIST 800-171/CMMC violations from Wazuh SIEM. Uses confidence-based routing: high-confidence
                violations get auto-remediated, uncertain cases escalate to human review. All actions logged
                to immutable S3 audit trails.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                <span className="font-mono text-xs text-[#00d9ff]">#StrandsAgents</span>
                <span className="font-mono text-xs text-[#00d9ff]">#Claude</span>
                <span className="font-mono text-xs text-[#00d9ff]">#Bedrock</span>
                <span className="font-mono text-xs text-[#00d9ff]">#WazuhSIEM</span>
                <span className="font-mono text-xs text-[#00d9ff]">#NIST800-171</span>
                <span className="font-mono text-xs text-[#00d9ff]">#Python</span>
              </div>

              {/* Architecture diagram */}
              <div className="bg-[#0a0a0a] border border-[#00ff41]/20 p-6 mb-6">
                <ArchitectureDiagram
                  title="ACRS 5-Agent Pipeline"
                  nodes={[
                    { id: 'wazuh', label: 'Wazuh\nSIEM', x: 10, y: 50, color: '#00d9ff' },
                    { id: 'detection', label: 'Detection\nAgent', x: 30, y: 50, color: '#00ff41' },
                    { id: 'analysis', label: 'Analysis\nAgent', x: 50, y: 50, color: '#00ff41' },
                    { id: 'decision', label: 'Decision\nAgent', x: 70, y: 50, color: '#00ff41' },
                    { id: 'remediation', label: 'Remediation\nAgent', x: 70, y: 150, color: '#00ff41' },
                    { id: 'escalation', label: 'Escalation\nTicket', x: 90, y: 100, color: '#ff6b6b' },
                    { id: 'documentation', label: 'Documentation\nAgent', x: 50, y: 200, color: '#00ff41' },
                    { id: 's3', label: 'S3 Audit\nLogs', x: 50, y: 280, color: '#00d9ff' },
                  ]}
                  connections={[
                    { from: 'wazuh', to: 'detection' },
                    { from: 'detection', to: 'analysis' },
                    { from: 'analysis', to: 'decision' },
                    { from: 'decision', to: 'remediation' },
                    { from: 'decision', to: 'escalation' },
                    { from: 'remediation', to: 'documentation' },
                    { from: 'escalation', to: 'documentation' },
                    { from: 'documentation', to: 's3' },
                  ]}
                />
                <p className="text-xs text-gray-500 mt-4 text-center font-mono">
                  Confidence ≥ 0.8 → Auto-remediate | {'<'} 0.8 → Escalate
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-2 px-6 py-3 bg-[#00d9ff]/10 border border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff] hover:text-black transition-all group/btn">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          {/* Project 2: Snapshot Sleuth */}
          <div className="border border-white/10 bg-[#1a1a1a]/30 overflow-hidden hover:border-[#00d9ff]/50 transition-all group">
            <div className="p-8 md:p-12">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-3xl md:text-4xl tracking-wide">Snapshot Sleuth</h3>
                  <span className="px-3 py-1 bg-[#00ff41]/10 border border-[#00ff41]/30 text-[#00ff41] text-xs uppercase tracking-wider">
                    Open Source
                  </span>
                </div>
                <p className="text-xl text-gray-300 mb-4">
                  AWS EBS Forensics Automation
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-[#0a0a0a] border border-[#00ff41]/30 text-[#00ff41] text-xs font-mono">
                    Step Functions
                  </span>
                  <span className="px-3 py-1 bg-[#0a0a0a] border border-[#00ff41]/30 text-[#00ff41] text-xs font-mono">
                    Forensics
                  </span>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed mb-6">
                AWS-native automated EBS snapshot forensics platform. Orchestrates end-to-end investigation
                workflows with parallel forensic tool execution (YARA, ClamAV, EvidenceMiner, Log2Timeline),
                KMS-encrypted evidence storage, and pluggable case management.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                <span className="font-mono text-xs text-[#00d9ff]">#AWS</span>
                <span className="font-mono text-xs text-[#00d9ff]">#CDK</span>
                <span className="font-mono text-xs text-[#00d9ff]">#StepFunctions</span>
                <span className="font-mono text-xs text-[#00d9ff]">#Lambda</span>
                <span className="font-mono text-xs text-[#00d9ff]">#TypeScript</span>
                <span className="font-mono text-xs text-[#00d9ff]">#Python</span>
              </div>

              {/* Architecture diagram */}
              <div className="bg-[#0a0a0a] border border-[#00ff41]/20 p-6 mb-6">
                <ArchitectureDiagram
                  title="Snapshot Sleuth Pipeline"
                  nodes={[
                    { id: 'trigger', label: 'Trigger\n(CLI/Event)', x: 10, y: 50, color: '#00d9ff' },
                    { id: 'validate', label: 'Validate\nSnapshot', x: 30, y: 50, color: '#00ff41' },
                    { id: 'provision', label: 'Provision\nEnvironment', x: 50, y: 50, color: '#00ff41' },
                    { id: 'yara', label: 'YARA', x: 20, y: 150, color: '#00ff41' },
                    { id: 'clamav', label: 'ClamAV', x: 40, y: 150, color: '#00ff41' },
                    { id: 'miner', label: 'Evidence\nMiner', x: 60, y: 150, color: '#00ff41' },
                    { id: 'timeline', label: 'Log2\nTimeline', x: 80, y: 150, color: '#00ff41' },
                    { id: 's3', label: 'S3\nEvidence', x: 50, y: 230, color: '#00d9ff' },
                    { id: 'notify', label: 'Notify\n(Slack/Email)', x: 80, y: 230, color: '#00d9ff' },
                  ]}
                  connections={[
                    { from: 'trigger', to: 'validate' },
                    { from: 'validate', to: 'provision' },
                    { from: 'provision', to: 'yara' },
                    { from: 'provision', to: 'clamav' },
                    { from: 'provision', to: 'miner' },
                    { from: 'provision', to: 'timeline' },
                    { from: 'yara', to: 's3' },
                    { from: 'clamav', to: 's3' },
                    { from: 'miner', to: 's3' },
                    { from: 'timeline', to: 's3' },
                    { from: 's3', to: 'notify' },
                  ]}
                />
                <p className="text-xs text-gray-500 mt-4 text-center font-mono">
                  Parallel forensic analysis → KMS-encrypted storage → Case management
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/Stealinglight/Snapshot-Sleuth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-[#00d9ff]/10 border border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff] hover:text-black transition-all group/btn"
                >
                  <Github className="w-4 h-4" />
                  <span>View on GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Project 3: StravaMCP */}
          <div className="border border-white/10 bg-[#1a1a1a]/30 overflow-hidden hover:border-[#00d9ff]/50 transition-all group">
            <div className="p-8 md:p-12">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-3xl md:text-4xl tracking-wide">StravaMCP</h3>
                  <span className="px-3 py-1 bg-[#00ff41]/10 border border-[#00ff41]/30 text-[#00ff41] text-xs uppercase tracking-wider">
                    Open Source
                  </span>
                </div>
                <p className="text-xl text-gray-300 mb-4">
                  MCP Server for Strava API
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-[#0a0a0a] border border-[#00ff41]/30 text-[#00ff41] text-xs font-mono">
                    MCP
                  </span>
                  <span className="px-3 py-1 bg-[#0a0a0a] border border-[#00ff41]/30 text-[#00ff41] text-xs font-mono">
                    Serverless
                  </span>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed mb-6">
                Remote MCP server for Strava API running on AWS Lambda. Use your Strava fitness data
                with Claude for activity analysis, training insights, and route planning.
                Runs completely free on AWS Free Tier.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                <span className="font-mono text-xs text-[#00d9ff]">#MCP</span>
                <span className="font-mono text-xs text-[#00d9ff]">#AWS</span>
                <span className="font-mono text-xs text-[#00d9ff]">#Lambda</span>
                <span className="font-mono text-xs text-[#00d9ff]">#TypeScript</span>
                <span className="font-mono text-xs text-[#00d9ff]">#Strava</span>
              </div>

              {/* Architecture diagram */}
              <div className="bg-[#0a0a0a] border border-[#00ff41]/20 p-6 mb-6">
                <ArchitectureDiagram
                  title="StravaMCP Architecture"
                  nodes={[
                    { id: 'claude', label: 'Claude\nDesktop/Code', x: 20, y: 50, color: '#00d9ff' },
                    { id: 'mcp', label: 'MCP\nProtocol', x: 50, y: 50, color: '#00ff41' },
                    { id: 'lambda', label: 'Lambda\nFunction', x: 50, y: 130, color: '#00ff41' },
                    { id: 'strava', label: 'Strava\nAPI', x: 80, y: 130, color: '#00d9ff' },
                  ]}
                  connections={[
                    { from: 'claude', to: 'mcp' },
                    { from: 'mcp', to: 'lambda' },
                    { from: 'lambda', to: 'strava' },
                  ]}
                />
                <p className="text-xs text-gray-500 mt-4 text-center font-mono">
                  Activities • Stats • Routes → Claude analysis
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/Stealinglight/StravaMCP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-[#00d9ff]/10 border border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff] hover:text-black transition-all group/btn"
                >
                  <Github className="w-4 h-4" />
                  <span>View on GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Project 4: wrist-agent */}
          <div className="border border-white/10 bg-[#1a1a1a]/30 overflow-hidden hover:border-[#00d9ff]/50 transition-all group">
            <div className="p-8 md:p-12">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-3xl md:text-4xl tracking-wide">wrist-agent</h3>
                  <span className="px-3 py-1 bg-[#00ff41]/10 border border-[#00ff41]/30 text-[#00ff41] text-xs uppercase tracking-wider">
                    Open Source
                  </span>
                </div>
                <p className="text-xl text-gray-300 mb-4">
                  Apple Watch → Bedrock → Notes
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="px-3 py-1 bg-[#0a0a0a] border border-[#00ff41]/30 text-[#00ff41] text-xs font-mono">
                    Go
                  </span>
                  <span className="px-3 py-1 bg-[#0a0a0a] border border-[#00ff41]/30 text-[#00ff41] text-xs font-mono">
                    Voice AI
                  </span>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed mb-6">
                One-tap voice capture from Apple Watch that routes through AWS Lambda to Amazon Bedrock
                for AI processing, then automatically creates Notes or Reminders. Capture thoughts
                instantly and let AI organize them.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                <span className="font-mono text-xs text-[#00d9ff]">#Go</span>
                <span className="font-mono text-xs text-[#00d9ff]">#AWS</span>
                <span className="font-mono text-xs text-[#00d9ff]">#Bedrock</span>
                <span className="font-mono text-xs text-[#00d9ff]">#AppleWatch</span>
                <span className="font-mono text-xs text-[#00d9ff]">#Voice</span>
              </div>

              {/* Architecture diagram */}
              <div className="bg-[#0a0a0a] border border-[#00ff41]/20 p-6 mb-6">
                <ArchitectureDiagram
                  title="wrist-agent Pipeline"
                  nodes={[
                    { id: 'watch', label: 'Apple\nWatch', x: 15, y: 50, color: '#00d9ff' },
                    { id: 'voice', label: 'Voice\nCapture', x: 35, y: 50, color: '#00ff41' },
                    { id: 'lambda', label: 'Lambda\n(Go)', x: 55, y: 50, color: '#00ff41' },
                    { id: 'bedrock', label: 'Amazon\nBedrock', x: 75, y: 50, color: '#00ff41' },
                    { id: 'notes', label: 'Apple\nNotes', x: 65, y: 150, color: '#00d9ff' },
                    { id: 'reminders', label: 'Apple\nReminders', x: 85, y: 150, color: '#00d9ff' },
                  ]}
                  connections={[
                    { from: 'watch', to: 'voice' },
                    { from: 'voice', to: 'lambda' },
                    { from: 'lambda', to: 'bedrock' },
                    { from: 'bedrock', to: 'notes' },
                    { from: 'bedrock', to: 'reminders' },
                  ]}
                />
                <p className="text-xs text-gray-500 mt-4 text-center font-mono">
                  One tap → Voice → AI processing → Organized output
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/Stealinglight/wrist-agent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-[#00d9ff]/10 border border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff] hover:text-black transition-all group/btn"
                >
                  <Github className="w-4 h-4" />
                  <span>View on GitHub</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
