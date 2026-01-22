import { render, screen } from '@testing-library/react';
import { ProjectsSection } from '../../src/components/ProjectsSection';

describe('ProjectsSection', () => {
  it('renders the section heading', () => {
    render(<ProjectsSection />);
    expect(screen.getByRole('heading', { name: /Featured Work/i })).toBeInTheDocument();
  });

  describe('ACRS Project', () => {
    it('displays ACRS project title and description', () => {
      render(<ProjectsSection />);
      expect(screen.getByRole('heading', { name: /^ACRS$/i })).toBeInTheDocument();
      expect(screen.getByText(/Autonomous Compliance & Response System/i)).toBeInTheDocument();
    });

    it('displays ACRS project details', () => {
      render(<ProjectsSection />);
      // Text is broken up by AcronymTooltip elements, use function matcher
      expect(screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'p' &&
               element.textContent?.includes('AI-powered multi-agent system') &&
               element.textContent?.includes('DoD');
      })).toBeInTheDocument();
      // "5-agent pipeline" appears in both description and diagram title
      expect(screen.getAllByText(/5-agent pipeline/i).length).toBeGreaterThan(0);
    });

    it('displays ACRS technology tags', () => {
      render(<ProjectsSection />);
      expect(screen.getByText(/#StrandsAgents/i)).toBeInTheDocument();
      expect(screen.getByText(/#Claude/i)).toBeInTheDocument();
      // Multiple projects use #Bedrock, use getAllByText
      expect(screen.getAllByText(/#Bedrock/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/#WazuhSIEM/i)).toBeInTheDocument();
      expect(screen.getByText(/#NIST800-171/i)).toBeInTheDocument();
    });

    it('displays ACRS architecture diagram title', () => {
      render(<ProjectsSection />);
      expect(screen.getByText(/ACRS 5-Agent Pipeline/i)).toBeInTheDocument();
    });

    it('displays ACRS confidence threshold note', () => {
      render(<ProjectsSection />);
      expect(screen.getByText(/Confidence ≥ 0\.8 → Auto-remediate/i)).toBeInTheDocument();
    });

    it('has Featured badge', () => {
      render(<ProjectsSection />);
      const acrsSection = screen.getByRole('heading', { name: /^ACRS$/i }).closest('div');
      expect(acrsSection).toHaveTextContent(/Featured/i);
    });
  });

  describe('Snapshot Sleuth Project', () => {
    it('displays Snapshot Sleuth title and description', () => {
      render(<ProjectsSection />);
      expect(screen.getByRole('heading', { name: /^Snapshot Sleuth$/i })).toBeInTheDocument();
      expect(screen.getByText(/AWS EBS Forensics Automation/i)).toBeInTheDocument();
    });

    it('displays Snapshot Sleuth project details', () => {
      render(<ProjectsSection />);
      expect(
        screen.getByText(/AWS-native automated EBS snapshot forensics platform/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/parallel forensic tool execution/i)).toBeInTheDocument();
      expect(screen.getByText(/YARA, ClamAV, EvidenceMiner, Log2Timeline/i)).toBeInTheDocument();
    });

    it('displays Snapshot Sleuth technology tags', () => {
      render(<ProjectsSection />);
      // Multiple projects use common tags, verify at least one exists
      expect(screen.getAllByText(/#AWS/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/#CDK/i)).toBeInTheDocument();
      expect(screen.getByText(/#StepFunctions/i)).toBeInTheDocument();
      expect(screen.getAllByText(/#Lambda/i).length).toBeGreaterThan(0);
    });

    it('displays Snapshot Sleuth architecture diagram', () => {
      render(<ProjectsSection />);
      expect(screen.getByText(/Snapshot Sleuth Pipeline/i)).toBeInTheDocument();
    });

    it('has GitHub link with correct attributes', () => {
      render(<ProjectsSection />);
      const links = screen.getAllByRole('link', { name: /View on GitHub/i });
      const snapshotSleuthLink = links.find((link) =>
        link.getAttribute('href')?.includes('Snapshot-Sleuth')
      );
      expect(snapshotSleuthLink).toHaveAttribute(
        'href',
        'https://github.com/Stealinglight/Snapshot-Sleuth'
      );
      expect(snapshotSleuthLink).toHaveAttribute('target', '_blank');
      expect(snapshotSleuthLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('has Open Source badge', () => {
      render(<ProjectsSection />);
      const snapshotSection = screen.getByRole('heading', { name: /^Snapshot Sleuth$/i }).closest('div');
      expect(snapshotSection).toHaveTextContent(/Open Source/i);
    });
  });

  describe('StravaMCP Project', () => {
    it('displays StravaMCP title and description', () => {
      render(<ProjectsSection />);
      expect(screen.getByRole('heading', { name: /^StravaMCP$/i })).toBeInTheDocument();
      // Tagline appears, category "MCP" also exists - look for specific tagline text
      expect(screen.getByText((content, element) => {
        return element?.tagName.toLowerCase() === 'p' &&
               element.className.includes('text-xl') &&
               content === 'MCP Server for Strava API';
      })).toBeInTheDocument();
    });

    it('displays StravaMCP project details', () => {
      render(<ProjectsSection />);
      expect(
        screen.getByText(/Remote MCP server for Strava API running on AWS Lambda/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Use your Strava fitness data with Claude/i)).toBeInTheDocument();
      expect(screen.getByText(/Runs completely free on AWS Free Tier/i)).toBeInTheDocument();
    });

    it('displays StravaMCP technology tags', () => {
      render(<ProjectsSection />);
      expect(screen.getByText(/#MCP/i)).toBeInTheDocument();
      expect(screen.getByText(/#Strava/i)).toBeInTheDocument();
    });

    it('displays StravaMCP architecture diagram', () => {
      render(<ProjectsSection />);
      expect(screen.getByText(/StravaMCP Architecture/i)).toBeInTheDocument();
    });

    it('has GitHub link', () => {
      render(<ProjectsSection />);
      const links = screen.getAllByRole('link', { name: /View on GitHub/i });
      const stravaMCPLink = links.find((link) =>
        link.getAttribute('href')?.includes('StravaMCP')
      );
      expect(stravaMCPLink).toHaveAttribute(
        'href',
        'https://github.com/Stealinglight/StravaMCP'
      );
    });
  });

  describe('wrist-agent Project', () => {
    it('displays wrist-agent title and description', () => {
      render(<ProjectsSection />);
      expect(screen.getByRole('heading', { name: /^wrist-agent$/i })).toBeInTheDocument();
      expect(screen.getByText(/Apple Watch → Bedrock → Notes/i)).toBeInTheDocument();
    });

    it('displays wrist-agent project details', () => {
      render(<ProjectsSection />);
      expect(
        screen.getByText(/One-tap voice capture from Apple Watch/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/routes through AWS Lambda to Amazon Bedrock/i)).toBeInTheDocument();
      expect(screen.getByText(/automatically creates Notes or Reminders/i)).toBeInTheDocument();
    });

    it('displays wrist-agent technology tags', () => {
      render(<ProjectsSection />);
      expect(screen.getByText(/#Go/i)).toBeInTheDocument();
      expect(screen.getByText(/#AppleWatch/i)).toBeInTheDocument();
      expect(screen.getByText(/#Voice/i)).toBeInTheDocument();
    });

    it('displays wrist-agent architecture diagram', () => {
      render(<ProjectsSection />);
      expect(screen.getByText(/wrist-agent Pipeline/i)).toBeInTheDocument();
    });

    it('has GitHub link', () => {
      render(<ProjectsSection />);
      const links = screen.getAllByRole('link', { name: /View on GitHub/i });
      const wristAgentLink = links.find((link) =>
        link.getAttribute('href')?.includes('wrist-agent')
      );
      expect(wristAgentLink).toHaveAttribute(
        'href',
        'https://github.com/Stealinglight/wrist-agent'
      );
    });
  });

  it('renders all four projects', () => {
    render(<ProjectsSection />);
    expect(screen.getByRole('heading', { name: /^ACRS$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^Snapshot Sleuth$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^StravaMCP$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /^wrist-agent$/i })).toBeInTheDocument();
  });

  it('displays architecture diagrams for all projects', () => {
    render(<ProjectsSection />);
    expect(screen.getByText(/ACRS 5-Agent Pipeline/i)).toBeInTheDocument();
    expect(screen.getByText(/Snapshot Sleuth Pipeline/i)).toBeInTheDocument();
    expect(screen.getByText(/StravaMCP Architecture/i)).toBeInTheDocument();
    expect(screen.getByText(/wrist-agent Pipeline/i)).toBeInTheDocument();
  });
});
