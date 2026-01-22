import { render, screen } from '@testing-library/react';
import { ExperienceSection } from '../../src/components/ExperienceSection';

describe('ExperienceSection', () => {
  it('renders the section heading', () => {
    render(<ExperienceSection />);
    expect(screen.getByRole('heading', { name: /^Experience$/i })).toBeInTheDocument();
  });

  it('displays career progression header', () => {
    render(<ExperienceSection />);
    expect(
      screen.getByText(/SOC Analyst → Cloud Security Response → AI Security Engineering/i)
    ).toBeInTheDocument();
  });

  it('renders all three career phases', () => {
    render(<ExperienceSection />);
    expect(screen.getByText('Phase 1')).toBeInTheDocument();
    expect(screen.getByText('Phase 2')).toBeInTheDocument();
    expect(screen.getByText('Phase 3')).toBeInTheDocument();
  });

  it('displays Phase 1: Security Foundations', () => {
    render(<ExperienceSection />);
    expect(screen.getByText('Security Foundations')).toBeInTheDocument();
    expect(screen.getByText('2021 - 2023')).toBeInTheDocument();
  });

  it('displays Phase 2: Cloud Security Response', () => {
    render(<ExperienceSection />);
    expect(screen.getByText('Cloud Security Response')).toBeInTheDocument();
    expect(screen.getByText('2023 - 2024')).toBeInTheDocument();
  });

  it('displays Phase 3: AI Security Engineering', () => {
    render(<ExperienceSection />);
    expect(screen.getByText('AI Security Engineering')).toBeInTheDocument();
    expect(screen.getByText('2024 - Present')).toBeInTheDocument();
  });

  describe('Phase 3 roles', () => {
    it('displays AI Security Engineer role', () => {
      render(<ExperienceSection />);
      expect(screen.getByText('AI Security Engineer')).toBeInTheDocument();
      expect(screen.getByText('Operational Research & Development')).toBeInTheDocument();
      expect(screen.getByText('Jun 2025 - Present')).toBeInTheDocument();
    });

    it('displays Security Engineer (Response Platform) role', () => {
      render(<ExperienceSection />);
      expect(screen.getByText('Response Platform & Tooling')).toBeInTheDocument();
      expect(screen.getByText('Dec 2024 - Jun 2025')).toBeInTheDocument();
    });
  });

  describe('Phase 2 roles', () => {
    it('displays Data Enrichment & Automation role', () => {
      render(<ExperienceSection />);
      expect(screen.getByText('Data Enrichment & Automation')).toBeInTheDocument();
      expect(screen.getByText('Apr 2024 - Dec 2024')).toBeInTheDocument();
    });

    it('displays Cloud Responder role', () => {
      render(<ExperienceSection />);
      expect(screen.getByText('Cloud Responder')).toBeInTheDocument();
      expect(screen.getByText('Nov 2023 - Apr 2024')).toBeInTheDocument();
    });

    it('displays Internal Security team lead role', () => {
      render(<ExperienceSection />);
      expect(screen.getByText('Internal Security')).toBeInTheDocument();
      expect(screen.getByText('Security Engineer / Team Lead')).toBeInTheDocument();
      expect(screen.getByText('Feb 2023 - Nov 2023')).toBeInTheDocument();
    });
  });

  describe('Phase 1 roles', () => {
    it('displays AWS SOC CloudOps role', () => {
      render(<ExperienceSection />);
      // Text is broken up by AcronymTooltip, so use a function matcher
      expect(screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'h4' && content.includes('AWS') && element.textContent?.includes('SOC');
      })).toBeInTheDocument();
      expect(screen.getByText('Security Engineer / Tech Lead')).toBeInTheDocument();
      expect(screen.getByText('May 2022 - Feb 2023')).toBeInTheDocument();
    });

    it('displays Olezka Global SOC Analyst role', () => {
      render(<ExperienceSection />);
      expect(screen.getByText('Olezka Global')).toBeInTheDocument();
      // Text is broken up by AcronymTooltip, so use a function matcher
      expect(screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'p' && element.textContent === 'SOC Analyst';
      })).toBeInTheDocument();
      expect(screen.getByText('Dec 2021 - May 2022')).toBeInTheDocument();
    });
  });

  describe('Education & Certifications', () => {
    it('displays education section header', () => {
      render(<ExperienceSection />);
      expect(screen.getByText(/Education & Certifications/i)).toBeInTheDocument();
    });

    it('displays BS Cybersecurity', () => {
      render(<ExperienceSection />);
      expect(screen.getByText(/BS Cybersecurity/i)).toBeInTheDocument();
      expect(screen.getByText(/UMGC - Networking & Data Science/i)).toBeInTheDocument();
    });

    it('displays SANS training', () => {
      render(<ExperienceSection />);
      expect(screen.getByText(/SANS Training/i)).toBeInTheDocument();
      expect(screen.getByText(/12-month program/i)).toBeInTheDocument();
    });

    it('displays CrossFit L1 certification', () => {
      render(<ExperienceSection />);
      expect(screen.getByText(/CrossFit L1/i)).toBeInTheDocument();
      expect(screen.getByText(/Certified Trainer/i)).toBeInTheDocument();
    });

    it('displays TCCC training', () => {
      render(<ExperienceSection />);
      expect(screen.getByText(/TCCC Trained/i)).toBeInTheDocument();
      expect(screen.getByText(/Tactical Combat Casualty Care/i)).toBeInTheDocument();
    });
  });

  it('displays prior career background note', () => {
    render(<ExperienceSection />);
    expect(screen.getByText(/8 years in film production as Cinematographer\/DP across Asia/i)).toBeInTheDocument();
    expect(screen.getByText(/Intel, Toyota, Puma, Volkswagen/i)).toBeInTheDocument();
  });

  it('displays role highlights for AI Security Engineer', () => {
    render(<ExperienceSection />);
    expect(
      screen.getByText(/Member of AWS Security Operations OR&D team specializing in agentic solutions/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Conducted Tier 2 security response escalations/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Focused on data enrichment to improve security operations efficiency/i)
    ).toBeInTheDocument();
  });
});
