import { Briefcase, Calendar } from 'lucide-react';

export function ExperienceSection() {
  const experiences = [
    {
      company: 'AWS Security',
      team: 'Operational Research',
      title: 'AI Security Engineer',
      period: '2021 - Present',
      duration: '4 years',
      description:
        'Building agentic solutions for AWS Security, focusing on multi-agent systems, compliance automation, and LLM-powered security analysis.',
      highlights: [
        'Developed multi-agent systems for compliance automation workflows',
        'Built automated forensics analysis tools for cloud infrastructure',
        'Architected LLM orchestration systems for threat analysis',
        'Led research on agentic AI patterns for security operations',
      ],
    },
    {
      company: 'Freelance',
      team: null,
      title: 'Cinematographer & Camera Operator',
      period: '2013 - 2021',
      duration: '8 years',
      description:
        'Managed productions across Asia for brands like Intel, Tencent, Toyota. Led crews of 30+ in high-pressure environments.',
      highlights: [
        'Coordinated complex multi-location shoots across Asia',
        'Managed technical crews and production logistics',
        'Delivered projects under strict deadlines and budgets',
        'Specialized in crisis management and rapid problem-solving',
      ],
    },
  ];

  return (
    <section id="experience" className="py-24 px-6 bg-[#0a0a0a] relative">
      <div className="max-w-6xl mx-auto">
        <div className="font-mono text-[#00ff41] text-sm mb-8">
          <span className="opacity-50">05.</span> $ cat experience.json
        </div>

        <h2 className="text-3xl md:text-4xl mb-16 tracking-wide uppercase">Experience</h2>

        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              className="border border-white/10 bg-[#1a1a1a]/30 p-8 md:p-12 hover:border-[#00d9ff]/30 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase className="w-5 h-5 text-[#00d9ff]" />
                    <h3 className="text-2xl">{exp.company}</h3>
                  </div>
                  {exp.team && (
                    <p className="text-gray-400 ml-8 mb-2">{exp.team}</p>
                  )}
                  <p className="text-xl text-gray-300 ml-8">{exp.title}</p>
                </div>
                <div className="flex flex-col items-start md:items-end text-sm">
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="font-mono">{exp.period}</span>
                  </div>
                  <span className="font-mono text-[#00ff41]">{exp.duration}</span>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed mb-6">
                {exp.description}
              </p>

              <div className="border-t border-white/10 pt-6">
                <h4 className="text-sm uppercase tracking-widest text-[#00d9ff] mb-4">
                  Key Highlights
                </h4>
                <ul className="space-y-3">
                  {exp.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-3 text-gray-400">
                      <span className="text-[#00ff41] font-mono flex-shrink-0">→</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Additional certifications or education can go here */}
        <div className="mt-12 border border-white/10 bg-[#1a1a1a]/30 p-8">
          <h3 className="text-sm uppercase tracking-widest text-[#00d9ff] mb-6">
            Additional Qualifications
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-gray-400">
            <div>
              <p className="text-[#00ff41] font-mono text-sm mb-2">→ CrossFit L1</p>
              <p className="text-sm">Certified Trainer</p>
            </div>
            <div>
              <p className="text-[#00ff41] font-mono text-sm mb-2">→ Crisis Management</p>
              <p className="text-sm">Certified</p>
            </div>
            <div>
              <p className="text-[#00ff41] font-mono text-sm mb-2">→ Film Production</p>
              <p className="text-sm">8+ years managing large crews</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}