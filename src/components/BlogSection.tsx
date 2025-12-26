import { Mail, ArrowRight } from 'lucide-react';

export function BlogSection() {
  const plannedTopics = [
    'Prompt Engineering for Security Operations',
    'Multi-Agent Architecture Patterns in Production',
    'Building Autonomous Compliance Systems',
    'LLM Orchestration at Scale',
  ];

  return (
    <section id="blog" className="py-24 px-6 bg-[#0f0f0f] relative">
      <div className="max-w-6xl mx-auto">
        <div className="font-mono text-[#00ff41] text-sm mb-8">
          <span className="opacity-50">04.</span> $ cat blog/README.md
        </div>

        <h2 className="text-3xl md:text-4xl mb-8 tracking-wide uppercase">Writing & Research</h2>

        <div className="border border-white/10 bg-[#1a1a1a]/30 p-8 md:p-12">
          <p className="text-xl text-gray-300 mb-8">
            Technical articles and insights on AI security
          </p>

          <p className="text-gray-400 leading-relaxed mb-12">
            Coming soon: Deep dives into agentic AI architecture patterns, prompt engineering 
            for security analysis, and building production security automation systems.
          </p>

          <div className="mb-12">
            <h3 className="text-sm uppercase tracking-widest text-[#00d9ff] mb-6">
              Planned Topics
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {plannedTopics.map((topic, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 bg-[#0a0a0a] border border-white/10 hover:border-[#00d9ff]/30 transition-all"
                >
                  <ArrowRight className="w-4 h-4 text-[#00ff41] flex-shrink-0 mt-1" />
                  <span className="text-gray-300">{topic}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <h3 className="text-sm uppercase tracking-widest text-[#00d9ff] mb-6">
              Subscribe for Updates
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
              <input
                type="email"
                placeholder="your.email@example.com"
                className="flex-1 px-4 py-3 bg-[#0a0a0a] border border-white/20 text-white placeholder-gray-500 focus:border-[#00d9ff] focus:outline-none font-mono text-sm"
              />
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#00d9ff] text-black hover:bg-[#00ff41] transition-all uppercase tracking-wider">
                <Mail className="w-4 h-4" />
                <span>Notify Me</span>
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-3 font-mono">
              // No spam, just technical content when it's ready
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
