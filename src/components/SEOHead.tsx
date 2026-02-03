import { useEffect } from 'react';

interface SEOHeadProps {
  section?: 'hero' | 'about' | 'projects' | 'experience' | 'skills' | 'contact' | 'blog' | 'faq';
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
  blog: {
    titleSuffix: ' | Blog',
    description: 'Blog posts and articles by Chris McMillon on security automation, agentic AI systems, and multi-agent architectures.',
  },
  faq: {
    titleSuffix: ' | FAQ',
    description: 'Frequently asked questions about security automation, agentic AI systems, and consulting services by Chris McMillon.',
  },
};

const BASE_TITLE = 'Chris McMillon | AI Security Engineer & Security Consultant';
const BASE_URL = 'https://cm-sec.ai';

/**
 * SEOHead component for meta tag management.
 * Note: Dynamic meta tag updates based on scroll are primarily for user experience
 * and won't affect SEO as search engine crawlers don't execute JavaScript or track scroll.
 * For SEO purposes, the static meta tags in index.html are what matters.
 * 
 * This component could be enhanced with SSR/prerendering for better SEO support.
 */
export function SEOHead({ section = 'hero' }: SEOHeadProps) {
  useEffect(() => {
    // Safely access sectionMeta with validated key
    const validSection: keyof typeof sectionMeta = section in sectionMeta ? section : 'hero';
    // eslint-disable-next-line security/detect-object-injection
    const meta = sectionMeta[validSection];
    const newTitle = `${BASE_TITLE}${meta.titleSuffix}`;
    const newUrl = validSection === 'hero' ? BASE_URL : `${BASE_URL}/#${validSection}`;

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
  const [currentSection, setCurrentSection] = useState('hero');

  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'experience', 'skills', 'contact', 'blog', 'faq'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            const sectionId = entry.target.id || 'hero';
            setCurrentSection(sectionId);
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

  return currentSection;
}
