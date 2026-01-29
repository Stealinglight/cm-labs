import { useState, useEffect } from 'react';
import { Menu, X, Download } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
}

export function Navigation({ activeSection }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'blog', label: 'Blog' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection('hero')}
            className="font-mono text-[#00ff41] tracking-wider hover:text-[#00d9ff] transition-colors"
          >
            CM
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-sm tracking-wide transition-colors relative ${
                  activeSection === item.id
                    ? 'text-[#00d9ff]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#00d9ff]" />
                )}
              </button>
            ))}
            <a
              href="/Chris_McMillon_Resume_AI_Security.pdf"
              download="Chris_McMillon_Resume_AI_Security.pdf"
              className="flex items-center gap-2 px-4 py-2 border border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff] hover:text-black transition-all"
              aria-label="Download Chris McMillon's resume as PDF"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">Download CV</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10">
            <div className="flex flex-col gap-4 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-sm tracking-wide transition-colors ${
                    activeSection === item.id
                      ? 'text-[#00d9ff]'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <a
                href="/Chris_McMillon_Resume_AI_Security.pdf"
                download
                className="flex items-center gap-2 px-4 py-2 border border-[#00d9ff] text-[#00d9ff] hover:bg-[#00d9ff] hover:text-black transition-all w-full justify-center"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">Download CV</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
