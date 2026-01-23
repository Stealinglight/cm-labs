import { Briefcase, Calendar, TrendingUp } from 'lucide-react';
import { AcronymTooltip } from './AcronymTooltip';
import { createScrollHandler } from '../utils/navigation';
import type { ReactNode } from 'react';

// Helper to render text with acronym tooltips
function renderWithAcronyms(text: string): ReactNode {
  const acronymPattern = /\b(SOC)\b/g;
  const parts = text.split(acronymPattern);

  return parts.map((part, index) => {
    if (part === 'SOC') {
      return <AcronymTooltip key={index} acronym={part} />;
    }
    return part;
  });
}

export function ExperienceSection() {
  const phases = [
    {
      phase: 'Phase 3',
      title: 'AI Security Engineering',
      period: '2024 - Present',
      roles: [
        {
          company: 'AWS Security',
          team: 'Operational Research & Development',
          title: 'AI Security Engineer',
          period: 'Jun 2025 - Present',
          description:
            'Building agentic solutions for AWS Security, focusing on multi-agent systems and automation for security operations.',
          highlights: [
            'Member of AWS Security Operations OR&D team specializing in agentic solutions',
            'Conducted Tier 2 security response escalations',
            'Focused on data enrichment to improve security operations efficiency',
          ],
        },
        {
          company: 'AWS Security',
          team: 'Response Platform & Tooling',
          title: 'Security Engineer',
          period: 'Dec 2024 - Jun 2025',
          description:
            'Drove continuous improvements to core operational and security platforms through LLM integration and advanced automation.',
          highlights: [
            'Expanded advanced search/analysis features for security workflows',
            'Automated validation processes using LLMs',
            'Enriched historical security data for improved incident response',
          ],
        },
      ],
    },
    {
      phase: 'Phase 2',
      title: 'Cloud Security Response',
      period: '2023 - 2024',
      roles: [
        {
          company: 'AWS Security',
          team: 'Data Enrichment & Automation',
          title: 'Security Engineer',
          period: 'Apr 2024 - Dec 2024',
          description:
            'Developed security automation frameworks and AI-driven solutions for incident response.',
          highlights: [
            'Built scalable automation reducing operational overhead',
            'Analyzed large datasets for anomaly detection',
            'Improved incident response through AI-driven insights',
          ],
        },
        {
          company: 'AWS Security',
          team: 'Cloud Responder',
          title: 'Security Engineer',
          period: 'Nov 2023 - Apr 2024',
          description:
            'Incident response at cloud scale - keeping all the clouds afloat.',
          highlights: [
            'Handled security incidents across AWS infrastructure',
            'Streamlined incident response processes',
          ],
        },
        {
          company: 'AWS CloudOps',
          team: 'Internal Security',
          title: 'Security Engineer / Team Lead',
          period: 'Feb 2023 - Nov 2023',
          description:
            'Led internal security engineering for critical AWS platforms.',
          highlights: [
            'Team/Tech Lead for platform security',
            'Maintained critical security infrastructure',
          ],
        },
      ],
    },
    {
      phase: 'Phase 1',
      title: 'Security Foundations',
      period: '2021 - 2023',
      roles: [
        {
          company: 'AWS SOC CloudOps',
          team: null,
          title: 'Security Engineer / Tech Lead',
          period: 'May 2022 - Feb 2023',
          description:
            'Real-time security incident management and automation for AWS CloudOps.',
          highlights: [
            'Tech/Team Lead for SOC operations',
            'Managed real-time security incidents',
            'Developed automation scripts for alert triage',
          ],
        },
        {
          company: 'Olezka Global',
          team: null,
          title: 'SOC Analyst',
          period: 'Dec 2021 - May 2022',
          description:
            'Traditional security monitoring and incident response across enterprise environments.',
          highlights: [
            'Monitored and responded to security events',
            'Conducted security and risk assessments',
            'Tools: CrowdStrike, Tenable, Fortinet, ServiceNow',
          ],
        },
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 px-6 bg-[#0a0a0a] relative">
      <div className="max-w-6xl mx-auto">
        <div className="font-mono text-[#00ff41] text-sm mb-8">
          <span className="opacity-50">05.</span> $ cat experience.json
        </div>

        <h2 className="text-3xl md:text-4xl mb-8 tracking-wide uppercase">Experience</h2>

        <p className="text-gray-400 mb-12 max-w-3xl">
          <TrendingUp className="w-4 h-4 inline mr-2 text-[#00d9ff]" />
          Career progression: SOC Analyst → Cloud Security Response → AI Security Engineering.{' '}
          <a
            href="#projects"
            onClick={createScrollHandler('projects')}
            className="text-[#00d9ff] hover:text-[#00ff41] transition-colors"
          >
            See my projects
          </a>{' '}
          for examples of my work.
        </p>

        <div className="space-y-12">
          {phases.map((phase, phaseIdx) => (
            <div key={phaseIdx} className="relative">
              {/* Phase header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="px-4 py-2 bg-[#00d9ff]/10 border border-[#00d9ff]/30">
                  <span className="text-[#00d9ff] font-mono text-sm">{phase.phase}</span>
                </div>
                <div>
                  <h3 className="text-xl text-white">{phase.title}</h3>
                  <span className="text-gray-500 font-mono text-sm">{phase.period}</span>
                </div>
              </div>

              {/* Roles in this phase */}
              <div className="space-y-6 ml-4 border-l border-white/10 pl-8">
                {phase.roles.map((role, roleIdx) => (
                  <div
                    key={roleIdx}
                    className="border border-white/10 bg-[#1a1a1a]/30 p-6 hover:border-[#00d9ff]/30 transition-all relative"
                  >
                    {/* Timeline dot */}
                    <div className="absolute -left-[41px] top-6 w-3 h-3 rounded-full bg-[#00ff41] border-2 border-[#0a0a0a]" />

                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Briefcase className="w-4 h-4 text-[#00d9ff]" />
                          <h4 className="text-lg text-white">{renderWithAcronyms(role.company)}</h4>
                        </div>
                        {role.team && (
                          <p className="text-gray-500 text-sm ml-6">{role.team}</p>
                        )}
                        <p className="text-gray-300 ml-6">{renderWithAcronyms(role.title)}</p>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm mt-2 md:mt-0">
                        <Calendar className="w-3 h-3" />
                        <span className="font-mono">{role.period}</span>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-4">{role.description}</p>

                    <ul className="space-y-1">
                      {role.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2 text-gray-500 text-sm">
                          <span className="text-[#00ff41] font-mono flex-shrink-0">→</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional qualifications */}
        <div className="mt-12 border border-white/10 bg-[#1a1a1a]/30 p-8">
          <h3 className="text-sm uppercase tracking-widest text-[#00d9ff] mb-6">
            Education & Certifications
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-400">
            <div>
              <p className="text-[#00ff41] font-mono text-sm mb-2">→ BS Cybersecurity</p>
              <p className="text-sm">UMGC - Networking & Data Science</p>
            </div>
            <div>
              <p className="text-[#00ff41] font-mono text-sm mb-2">→ SANS Training</p>
              <p className="text-sm">12-month program</p>
            </div>
            <div>
              <p className="text-[#00ff41] font-mono text-sm mb-2">→ CrossFit L1</p>
              <p className="text-sm">Certified Trainer</p>
            </div>
            <div>
              <p className="text-[#00ff41] font-mono text-sm mb-2">→ TCCC Trained</p>
              <p className="text-sm">Tactical Combat Casualty Care</p>
            </div>
          </div>
        </div>

        {/* Creative background note */}
        <div className="mt-6 p-4 border-l-2 border-[#00d9ff]/30 bg-[#1a1a1a]/20">
          <p className="text-gray-500 text-sm">
            <span className="text-[#00d9ff]">Prior career:</span> 8 years in film production as Cinematographer/DP across Asia
            (Intel, Toyota, Puma, Volkswagen). Managing 30+ person crews under pressure translates directly to
            coordinating complex distributed systems.
          </p>
        </div>
      </div>
    </section>
  );
}

