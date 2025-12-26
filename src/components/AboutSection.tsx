import { MapPin, ExternalLink } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 bg-[#0a0a0a] relative">
      {/* Section indicator */}
      <div className="max-w-6xl mx-auto">
        <div className="font-mono text-[#00ff41] text-sm mb-8">
          <span className="opacity-50">01.</span> $ cat about.txt
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left column */}
          <div>
            <h2 className="text-3xl md:text-4xl mb-8 tracking-wide uppercase">About</h2>
            <div className="space-y-6 text-gray-400 leading-relaxed">
              <p>
                I'm a Security AI Engineer on the Operational Research team at AWS Security, 
                where I build agentic solutions for security automation and compliance.
              </p>
              <p>
                My background combines film production management (coordinating 30+ person crews 
                under pressure) with hardcore technical security engineering - giving me a unique 
                perspective on managing complex distributed systems.
              </p>
              <p>
                Currently focused on multi-agent AI architectures for security operations, automated 
                compliance frameworks, and LLM-powered threat analysis.
              </p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-gray-500">
                  Also: Creative work →{' '}
                  <a
                    href="https://stealinglight.hk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00d9ff] hover:text-[#00ff41] transition-colors inline-flex items-center gap-1"
                  >
                    stealinglight.hk
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-8">
            {/* Current Role */}
            <div className="border border-white/10 p-6 bg-[#1a1a1a]/50">
              <h3 className="text-sm uppercase tracking-widest text-[#00d9ff] mb-3">Current Role</h3>
              <p className="mb-1">AI Security Engineer</p>
              <p className="text-gray-400 mb-2">AWS Security - Operational Research</p>
              <p className="text-sm text-gray-500 font-mono">2021 - Present</p>
            </div>

            {/* Location */}
            <div className="border border-white/10 p-6 bg-[#1a1a1a]/50">
              <h3 className="text-sm uppercase tracking-widest text-[#00d9ff] mb-3">Location</h3>
              <p className="flex items-center gap-2 text-gray-400">
                <MapPin className="w-4 h-4" />
                Seattle, Washington
              </p>
            </div>

            {/* Focus Areas */}
            <div className="border border-white/10 p-6 bg-[#1a1a1a]/50">
              <h3 className="text-sm uppercase tracking-widest text-[#00d9ff] mb-4">Focus Areas</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-[#00ff41] font-mono">→</span>
                  <span>Agentic AI systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00ff41] font-mono">→</span>
                  <span>Security automation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00ff41] font-mono">→</span>
                  <span>Compliance frameworks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00ff41] font-mono">→</span>
                  <span>LLM orchestration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00ff41] font-mono">→</span>
                  <span>Threat analysis</span>
                </li>
              </ul>
            </div>

            {/* Background */}
            <div className="border border-white/10 p-6 bg-[#1a1a1a]/50">
              <h3 className="text-sm uppercase tracking-widest text-[#00d9ff] mb-4">Background</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-[#00ff41] font-mono">•</span>
                  <span>Film production & cinematography</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00ff41] font-mono">•</span>
                  <span>CrossFit L1 trainer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00ff41] font-mono">•</span>
                  <span>Crisis management certified</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
