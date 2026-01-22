import { render, screen } from '@testing-library/react';
import { AboutSection } from '../../src/components/AboutSection';

describe('AboutSection', () => {
  it('renders the section heading', () => {
    render(<AboutSection />);
    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
  });

  it('displays current role information', () => {
    render(<AboutSection />);
    // Multiple instances of "AI Security Engineer" may exist, just verify at least one
    expect(screen.getAllByText(/AI Security Engineer/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/AWS Security - Operational Research & Development/i)).toBeInTheDocument();
  });

  it('displays correct career duration', () => {
    render(<AboutSection />);
    expect(screen.getByText(/May 2022 - Present \(~3-4 years\)/i)).toBeInTheDocument();
  });

  it('renders education section with GraduationCap header', () => {
    render(<AboutSection />);
    expect(screen.getByText(/Education/i)).toBeInTheDocument();
  });

  it('displays BS Cybersecurity education', () => {
    render(<AboutSection />);
    expect(screen.getByText(/BS Cybersecurity & Networking/i)).toBeInTheDocument();
    expect(screen.getByText(/UMGC - Minor in Data Science/i)).toBeInTheDocument();
  });

  it('displays SANS training', () => {
    render(<AboutSection />);
    expect(screen.getByText(/SANS Technology Institute/i)).toBeInTheDocument();
    expect(screen.getByText(/12-month training program/i)).toBeInTheDocument();
  });

  it('renders all focus areas', () => {
    render(<AboutSection />);
    const focusAreas = [
      'Agentic AI systems',
      'Security automation',
      'LLM integration',
      'Cloud security response',
      'Data enrichment',
    ];

    focusAreas.forEach((area) => {
      expect(screen.getByText(area)).toBeInTheDocument();
    });
  });

  it('displays location information', () => {
    render(<AboutSection />);
    expect(screen.getByText(/Seattle, Washington/i)).toBeInTheDocument();
  });

  it('displays background information', () => {
    render(<AboutSection />);
    expect(screen.getByText(/Film production \(DP\/Editor\)/i)).toBeInTheDocument();
    expect(screen.getByText(/CrossFit L1 Trainer/i)).toBeInTheDocument();
    expect(screen.getByText(/TCCC trained/i)).toBeInTheDocument();
  });

  it('includes link to creative work portfolio', () => {
    render(<AboutSection />);
    const link = screen.getByRole('link', { name: /stealinglight\.hk/i });
    expect(link).toHaveAttribute('href', 'https://stealinglight.hk');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('displays professional summary with AWS experience', () => {
    render(<AboutSection />);
    expect(screen.getByText(/With nearly 4 years at AWS/i)).toBeInTheDocument();
  });
});
