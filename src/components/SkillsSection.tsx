export function SkillsSection() {
  const skills = {
    languages: ['Python', 'TypeScript', 'Go', 'Bash'],
    aiml: ['Strands Agents', 'AgentCore', 'AWS Bedrock', 'Claude API'],
    cloud: ['AWS', 'CDK', 'Lambda', 'S3', 'EventBridge', 'Step Functions'],
    security: ['Wazuh SIEM', 'NIST 800-171', 'CMMC', 'RMF'],
    development: ['Git', 'Docker', 'CI/CD', 'IaC'],
  };

  return (
    <section id="skills" className="py-24 px-6 bg-[#0f0f0f] relative">
      <div className="max-w-6xl mx-auto">
        <div className="font-mono text-[#00ff41] text-sm mb-8">
          <span className="opacity-50">02.</span> $ ls -la skills/
        </div>

        <h2 className="text-3xl md:text-4xl mb-16 tracking-wide uppercase">Technical Stack</h2>

        <div className="grid gap-8">
          {/* Languages */}
          <div className="border border-white/10 p-8 bg-[#1a1a1a]/30 hover:border-[#00d9ff]/30 transition-all">
            <h3 className="text-sm uppercase tracking-widest text-[#00d9ff] mb-6 font-mono">
              // Languages
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.languages.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-[#0a0a0a] border border-[#00ff41]/30 text-[#00ff41] font-mono text-sm hover:border-[#00ff41] hover:shadow-[0_0_10px_rgba(0,255,65,0.3)] transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* AI/ML Frameworks */}
          <div className="border border-white/10 p-8 bg-[#1a1a1a]/30 hover:border-[#00d9ff]/30 transition-all">
            <h3 className="text-sm uppercase tracking-widest text-[#00d9ff] mb-6 font-mono">
              // AI/ML Frameworks
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.aiml.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-[#0a0a0a] border border-[#00ff41]/30 text-[#00ff41] font-mono text-sm hover:border-[#00ff41] hover:shadow-[0_0_10px_rgba(0,255,65,0.3)] transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Cloud & Infrastructure */}
          <div className="border border-white/10 p-8 bg-[#1a1a1a]/30 hover:border-[#00d9ff]/30 transition-all">
            <h3 className="text-sm uppercase tracking-widest text-[#00d9ff] mb-6 font-mono">
              // Cloud & Infrastructure
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.cloud.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-[#0a0a0a] border border-[#00ff41]/30 text-[#00ff41] font-mono text-sm hover:border-[#00ff41] hover:shadow-[0_0_10px_rgba(0,255,65,0.3)] transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Security & Compliance */}
          <div className="border border-white/10 p-8 bg-[#1a1a1a]/30 hover:border-[#00d9ff]/30 transition-all">
            <h3 className="text-sm uppercase tracking-widest text-[#00d9ff] mb-6 font-mono">
              // Security & Compliance
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.security.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-[#0a0a0a] border border-[#00ff41]/30 text-[#00ff41] font-mono text-sm hover:border-[#00ff41] hover:shadow-[0_0_10px_rgba(0,255,65,0.3)] transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Development */}
          <div className="border border-white/10 p-8 bg-[#1a1a1a]/30 hover:border-[#00d9ff]/30 transition-all">
            <h3 className="text-sm uppercase tracking-widest text-[#00d9ff] mb-6 font-mono">
              // Development
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.development.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-[#0a0a0a] border border-[#00ff41]/30 text-[#00ff41] font-mono text-sm hover:border-[#00ff41] hover:shadow-[0_0_10px_rgba(0,255,65,0.3)] transition-all"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
