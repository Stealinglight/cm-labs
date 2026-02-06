import { MapPin, ExternalLink, GraduationCap } from 'lucide-react';
import { createScrollHandler } from '../utils/navigation';

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
                I'm an AI Security Engineer on the Operational Research & Development team at AWS Security,
                where I build agentic solutions for security automation and compliance.
              </p>
              <p>
                With over 4 years at AWS, I've progressed from SOC operations through cloud security response
                to my current focus on AI-driven security systems. My work involves{' '}
                <a href="#skills" onClick={createScrollHandler('skills')} className="text-[#00d9ff] hover:text-[#00ff41] transition-colors">multi-agent architectures</a>,{' '}
                <a href="#skills" onClick={createScrollHandler('skills')} className="text-[#00d9ff] hover:text-[#00ff41] transition-colors">LLM integration</a> for validation processes, and automated compliance frameworks.
              </p>
              <p>
                My background combines creative problem-solving from 8 years in film production (managing
                50+ person crews under pressure across Asia) with hardcore technical security engineering -
                giving me a unique perspective on coordinating complex distributed systems. See my{' '}
                <a href="#projects" onClick={createScrollHandler('projects')} className="text-[#00d9ff] hover:text-[#00ff41] transition-colors">featured projects</a> for examples.
              </p>
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm text-gray-500">
                  Creative work →{' '}
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
          <div className="space-y-6">
            {/* Current Role */}
            <div className="border border-white/10 p-6 bg-[#1a1a1a]/50">
              <h3 className="text-sm uppercase tracking-widest text-[#00d9ff] mb-3">Current Role</h3>
              <p className="mb-1">Security AI Engineer</p>
              <p className="text-gray-400 mb-2">AWS Security - Operational Research & Development</p>
              <p className="text-sm text-gray-500 font-mono">May 2022 - Present (~4 years)</p>
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
                  <span>Multi-Agent architectures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00ff41] font-mono">→</span>
                  <span>Security automation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00ff41] font-mono">→</span>
                  <span>LLM integration</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00ff41] font-mono">→</span>
                  <span>Cloud security response</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00ff41] font-mono">→</span>
                  <span>Data enrichment</span>
                </li>
              </ul>
            </div>

            {/* Education */}
            <div className="border border-white/10 p-6 bg-[#1a1a1a]/50">
              <h3 className="text-sm uppercase tracking-widest text-[#00d9ff] mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Education
              </h3>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-[#00ff41] font-mono">•</span>
                  <div>
                    <p className="text-gray-300">BS Cybersecurity & Networking (Minor in Data Science)</p>
                    <p className="text-gray-500">Univerity of Maryland GC</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00ff41] font-mono">•</span>
                  <div>
                    <p className="text-gray-300">AA Cybersecurity</p>
                    <p className="text-gray-500">Northern Virginia Community College</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00ff41] font-mono">•</span>
                  <div>
                    <p className="text-gray-300">SANS Technology Institute</p>
                    <p className="text-gray-500">SEC598 | SEC588 | SEC542 | SEC573</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Background */}
            <div className="border border-white/10 p-6 bg-[#1a1a1a]/50">
              <h3 className="text-sm uppercase tracking-widest text-[#00d9ff] mb-4">Background</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-[#00ff41] font-mono">•</span>
                  <span>Film & Commerical production (DP/Producer)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00ff41] font-mono">•</span>
                  <span>CrossFit/Weightlifting Coach</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00ff41] font-mono">•</span>
                  <span>TCCC trained</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
