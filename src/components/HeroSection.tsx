import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  const [displayText, setDisplayText] = useState('');
  const fullText = '$ whoami';

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-6"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(#00ff41 1px, transparent 1px), linear-gradient(90deg, #00ff41 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Floating code snippets */}
      <div className="absolute top-20 left-10 opacity-10 font-mono text-xs text-[#00ff41]">
        {'> agent.execute()'}
      </div>
      <div className="absolute bottom-32 right-16 opacity-10 font-mono text-xs text-[#00d9ff]">
        {'# Multi-agent orchestration'}
      </div>
      <div className="absolute top-40 right-24 opacity-10 font-mono text-xs text-[#00ff41]">
        {'from security import compliance'}
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Whoami command */}
        <div className="font-mono text-[#00ff41] mb-8 text-sm md:text-base">
          {displayText}
          <span className="animate-pulse">_</span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl tracking-wider mb-6 uppercase">
          CHRIS MCMILLON
        </h1>

        {/* Subheading */}
        <h2 className="text-2xl md:text-3xl text-gray-300 mb-8">
          Security AI Engineer
        </h2>

        {/* Description */}
        <p className="text-gray-400 max-w-2xl mx-auto mb-4 leading-relaxed">
          Building agentic AI systems for security operations and compliance automation.
        </p>
        <p className="text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          4+ years at AWS Security. Specializing in multi-agent architectures, LLM orchestration,
          and automated threat analysis.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-[#00d9ff] text-black hover:bg-[#00ff41] transition-all uppercase tracking-wider"
          >
            View Projects
          </button>
          <a
            href="/Chris_McMillon_Resume_AI_Security.pdf"
            download="Chris_McMillon_Resume_AI_Security.pdf"
            className="px-8 py-3 border border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff] hover:text-black transition-all uppercase tracking-wider"
            aria-label="Download Chris McMillon's resume as PDF"
          >
            Download CV
          </a>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 border border-white/20 text-white hover:border-white/40 transition-all uppercase tracking-wider"
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-[#00d9ff] hover:text-[#00ff41] transition-colors"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
