import { ExternalLink } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = ['About', 'Projects', 'Skills', 'Blog', 'Contact'];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Left - Name and title */}
          <div>
            <div className="font-mono text-[#00ff41] mb-2">CM</div>
            <p className="text-gray-400">Security AI Engineer</p>
          </div>

          {/* Center - Navigation */}
          <div className="flex flex-wrap justify-start md:justify-center gap-4">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                className="text-sm text-gray-400 hover:text-[#00d9ff] transition-colors"
              >
                {link}
              </button>
            ))}
          </div>

          {/* Right - Creative work link */}
          <div className="text-right">
            <p className="text-sm text-gray-400 mb-2">Also:</p>
            <a
              href="https://stealinglight.hk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#00d9ff] hover:text-[#00ff41] transition-colors inline-flex items-center gap-1"
            >
              Film & Photography
              <ExternalLink className="w-3 h-3" />
            </a>
            <p className="text-xs text-gray-500 font-mono mt-1">stealinglight.hk</p>
          </div>
        </div>

        {/* Bottom - Copyright */}
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-gray-500 font-mono">
            © {currentYear} Chris McMillon. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 font-mono mt-2">
            // Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
