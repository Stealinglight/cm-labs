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
                AI-powered multi-agent system for DoD compliance automation using Strands Agents 
                and Claude 4.5. Orchestrates compliance workflows across NIST 800-171, CMMC Level 2, 
                and RMF frameworks with automated response capabilities.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                <span className="font-mono text-xs text-[#00d9ff]">#StrandsAgents</span>
                <span className="font-mono text-xs text-[#00d9ff]">#Claude4.5</span>
                <span className="font-mono text-xs text-[#00d9ff]">#WazuhSIEM</span>
                <span className="font-mono text-xs text-[#00d9ff]">#NIST800-171</span>
                <span className="font-mono text-xs text-[#00d9ff]">#CMMC</span>
                <span className="font-mono text-xs text-[#00d9ff]">#Python</span>
              </div>

              {/* Architecture diagram */}
              <div className="bg-[#0a0a0a] border border-[#00ff41]/20 p-6 mb-6">
                <ArchitectureDiagram
                  title="ACRS Architecture"
                  nodes={[
                    { id: 'orchestrator', label: 'Multi-Agent\nOrchestrator', x: 50, y: 50, color: '#00d9ff' },
                    { id: 'nist', label: 'NIST 800-171\nAgent', x: 20, y: 150, color: '#00ff41' },
                    { id: 'cmmc', label: 'CMMC L2\nAgent', x: 50, y: 150, color: '#00ff41' },
                    { id: 'rmf', label: 'RMF\nAgent', x: 80, y: 150, color: '#00ff41' },
                    { id: 'response', label: 'Automated\nResponse', x: 50, y: 250, color: '#00d9ff' },
                  ]}
                  connections={[
                    { from: 'orchestrator', to: 'nist' },
                    { from: 'orchestrator', to: 'cmmc' },
                    { from: 'orchestrator', to: 'rmf' },
                    { from: 'nist', to: 'response' },
                    { from: 'cmmc', to: 'response' },
                    { from: 'rmf', to: 'response' },
                  ]}
                />
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
                    Open Source
                  </span>
                  <span className="px-3 py-1 bg-[#0a0a0a] border border-[#00ff41]/30 text-[#00ff41] text-xs font-mono">
                    Security Operations
                  </span>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed mb-6">
                AWS-native automated EBS snapshot forensics platform that orchestrates end-to-end 
                investigation workflows. Runs industry-standard forensic tools, captures evidence, 
                and integrates with case management systems.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                <span className="font-mono text-xs text-[#00d9ff]">#AWS</span>
                <span className="font-mono text-xs text-[#00d9ff]">#CDK</span>
                <span className="font-mono text-xs text-[#00d9ff]">#Lambda</span>
                <span className="font-mono text-xs text-[#00d9ff]">#StepFunctions</span>
                <span className="font-mono text-xs text-[#00d9ff]">#Forensics</span>
                <span className="font-mono text-xs text-[#00d9ff]">#OpenSource</span>
              </div>

              {/* Architecture diagram */}
              <div className="bg-[#0a0a0a] border border-[#00ff41]/20 p-6 mb-6">
                <ArchitectureDiagram
                  title="Snapshot Sleuth Architecture"
                  nodes={[
                    { id: 'snapshot', label: 'EBS\nSnapshot', x: 20, y: 50, color: '#00d9ff' },
                    { id: 'pipeline', label: 'Analysis\nPipeline', x: 50, y: 50, color: '#00ff41' },
                    { id: 'tools', label: 'Forensic\nTools', x: 50, y: 150, color: '#00ff41' },
                    { id: 'evidence', label: 'Evidence\nCollection', x: 80, y: 150, color: '#00d9ff' },
                    { id: 'report', label: 'Case\nReporting', x: 80, y: 250, color: '#00d9ff' },
                  ]}
                  connections={[
                    { from: 'snapshot', to: 'pipeline' },
                    { from: 'pipeline', to: 'tools' },
                    { from: 'tools', to: 'evidence' },
                    { from: 'evidence', to: 'report' },
                  ]}
                />
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
        </div>
      </div>
    </section>
  );
}
