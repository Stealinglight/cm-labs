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
      screen.getByText(/IT Support → SOC Analyst → Cloud Security Response → AI Security Engineering/i)
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
    expect(screen.getByText('2021 - 2022')).toBeInTheDocument();
  });

  it('displays Phase 2: Cloud Security Response', () => {
    render(<ExperienceSection />);
    expect(screen.getByText('Cloud Security Response')).toBeInTheDocument();
    expect(screen.getByText('2022 - 2024')).toBeInTheDocument();
  });

  it('displays Phase 3: AI Security Engineering', () => {
    render(<ExperienceSection />);
    expect(screen.getByText('AI Security Engineering')).toBeInTheDocument();
    expect(screen.getByText('2024 - Present')).toBeInTheDocument();
  });

  describe('Phase 3 roles', () => {
    it('displays OR&D Security Engineer role', () => {
      render(<ExperienceSection />);
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

    it('displays Cloud Security Responder role', () => {
      render(<ExperienceSection />);
      expect(screen.getByText('Cloud Responder')).toBeInTheDocument();
      expect(screen.getByText('Cloud Security Responder')).toBeInTheDocument();
      expect(screen.getByText('Nov 2023 - Apr 2024')).toBeInTheDocument();
    });

    it('displays CloudOps Security Engineer team lead role', () => {
      render(<ExperienceSection />);
      expect(screen.getByText('Security Operations')).toBeInTheDocument();
      expect(screen.getByText('Security Engineer / Team Lead')).toBeInTheDocument();
      expect(screen.getByText('May 2022 - Nov 2023')).toBeInTheDocument();
    });
  });

  describe('Phase 1 roles', () => {
    it('displays Olezka Global SOC Analyst role', () => {
      render(<ExperienceSection />);
      expect(screen.getByText('Olezka Global')).toBeInTheDocument();
      // Text is broken up by AcronymTooltip, so use a function matcher
      expect(screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'p' && element.textContent === 'SOC Analyst';
      })).toBeInTheDocument();
      expect(screen.getByText('Dec 2021 - May 2022')).toBeInTheDocument();
    });

    it('displays Caesars Entertainment role', () => {
      render(<ExperienceSection />);
      expect(screen.getByText('Caesars Entertainment')).toBeInTheDocument();
      expect(screen.getByText('IT Support Specialist II')).toBeInTheDocument();
      expect(screen.getByText('Jul 2021 - Apr 2022')).toBeInTheDocument();
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

    it('displays AA Cybersecurity', () => {
      render(<ExperienceSection />);
      expect(screen.getByText(/AA Cybersecurity/i)).toBeInTheDocument();
      expect(screen.getByText(/Northern Virginia Community College/i)).toBeInTheDocument();
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

  it('displays role highlights for OR&D Security Engineer', () => {
    render(<ExperienceSection />);
    expect(
      screen.getByText(/Build security tooling and APIs for AWS Security Operations organizations/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Conduct Tier 2 security response escalations/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Build MCP servers using FastMCP for AI agent integration/i)
    ).toBeInTheDocument();
  });
});
