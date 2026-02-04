import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { BlogSection } from './components/BlogSection';
import { ExperienceSection } from './components/ExperienceSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { SEOHead } from './components/SEOHead';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'blog', 'experience', 'faq', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Call on mount to set initial section (handles hash navigation)
    handleScroll();

    // Listen to scroll events
    window.addEventListener('scroll', handleScroll);
    
    // Listen to hash changes for direct navigation
    window.addEventListener('hashchange', handleScroll);
    
    // Listen to popstate for browser back/forward
    window.addEventListener('popstate', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleScroll);
      window.removeEventListener('popstate', handleScroll);
    };
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen">
      <SEOHead section={activeSection as 'hero' | 'about' | 'projects' | 'experience' | 'skills' | 'contact' | 'blog' | 'faq'} />
      <Navigation activeSection={activeSection} />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <BlogSection />
        <ExperienceSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
