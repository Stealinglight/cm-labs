import { useEffect } from 'react';

interface SEOHeadProps {
  section?: 'hero' | 'about' | 'projects' | 'experience' | 'skills' | 'contact';
}

interface SectionMeta {
  titleSuffix: string;
  description: string;
}

const sectionMeta: Record<string, SectionMeta> = {
  hero: {
    titleSuffix: '',
    description: 'Chris McMillon is an AI Security Engineer at AWS specializing in multi-agent systems, security automation, and LLM integration. Building agentic AI solutions for compliance and threat analysis.',
  },
  about: {
    titleSuffix: ' | About',
    description: 'Learn about Chris McMillon, AI Security Engineer specializing in security automation and agentic AI systems. Building multi-agent solutions for compliance and threat analysis at AWS.',
  },
  projects: {
    titleSuffix: ' | Projects',
    description: 'Security automation projects by Chris McMillon including multi-agent compliance systems, threat analysis pipelines, and LLM-powered security tools.',
  },
  experience: {
    titleSuffix: ' | Experience',
    description: 'Professional experience of Chris McMillon - AI Security Engineer at AWS, specializing in security automation, multi-agent systems, and compliance frameworks.',
  },
  skills: {
    titleSuffix: ' | Skills',
    description: 'Technical skills of Chris McMillon: AI/ML, security automation, multi-agent systems, LLM integration, AWS, Python, TypeScript, and cloud security.',
  },
  contact: {
    titleSuffix: ' | Contact',
    description: 'Contact Chris McMillon for security automation consulting, agentic AI system design, and multi-agent architecture expertise.',
  },
};

const BASE_TITLE = 'Chris McMillon | AI Security Engineer & Security Consultant';
const BASE_URL = 'https://cm-sec.ai';

/**
 * SEOHead component for dynamic meta tag updates based on current section.
 * Uses native document API for React 19 compatibility.
 */
export function SEOHead({ section = 'hero' }: SEOHeadProps) {
  useEffect(() => {
    const meta = sectionMeta[section] || sectionMeta.hero;
    const newTitle = `${BASE_TITLE}${meta.titleSuffix}`;
    const newUrl = section === 'hero' ? BASE_URL : `${BASE_URL}/#${section}`;

    // Update document title
    document.title = newTitle;

    // Update meta description
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', meta.description);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', newTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', meta.description);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', newUrl);
    }

    // Update Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', newTitle);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', meta.description);
    }

    const twitterUrl = document.querySelector('meta[name="twitter:url"]');
    if (twitterUrl) {
      twitterUrl.setAttribute('content', newUrl);
    }

    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', newUrl);
    }
  }, [section]);

  return null;
}

/**
 * Hook to detect current section based on scroll position.
 * Returns the section ID that is currently most visible in viewport.
 */
export function useCurrentSection(): string {
  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'experience', 'skills', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            const sectionId = entry.target.id || 'hero';
            // Dispatch custom event for section change
            window.dispatchEvent(new CustomEvent('sectionchange', { detail: sectionId }));
          }
        });
      },
      { threshold: [0.3, 0.5, 0.7] }
    );

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  return 'hero';
}
