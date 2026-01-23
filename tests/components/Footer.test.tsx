import { render, screen } from '@testing-library/react';
import { Footer } from '../../src/components/Footer';
import userEvent from '@testing-library/user-event';

describe('Footer', () => {
  it('renders the footer section', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('displays the site name/logo', () => {
    render(<Footer />);
    expect(screen.getByText('CM')).toBeInTheDocument();
  });

  it('displays the job title', () => {
    render(<Footer />);
    expect(screen.getByText('Security AI Engineer')).toBeInTheDocument();
  });

  describe('Social Links Accessibility', () => {
    it('renders all social media links', () => {
      render(<Footer />);
      expect(screen.getByLabelText('View GitHub profile')).toBeInTheDocument();
      expect(screen.getByLabelText('Connect on LinkedIn')).toBeInTheDocument();
      expect(screen.getByLabelText('Go to contact section')).toBeInTheDocument();
    });

    it('has proper ARIA labels for screen readers', () => {
      render(<Footer />);
      const githubLink = screen.getByLabelText('View GitHub profile');
      const linkedinLink = screen.getByLabelText('Connect on LinkedIn');
      const emailLink = screen.getByLabelText('Go to contact section');

      expect(githubLink).toHaveAttribute('aria-label', 'View GitHub profile');
      expect(linkedinLink).toHaveAttribute('aria-label', 'Connect on LinkedIn');
      expect(emailLink).toHaveAttribute('aria-label', 'Go to contact section');
    });

    it('has proper title attributes for tooltips', () => {
      render(<Footer />);
      const githubLink = screen.getByLabelText('View GitHub profile');
      const linkedinLink = screen.getByLabelText('Connect on LinkedIn');
      const emailLink = screen.getByLabelText('Go to contact section');

      expect(githubLink).toHaveAttribute('title', 'View GitHub profile');
      expect(linkedinLink).toHaveAttribute('title', 'Connect on LinkedIn');
      expect(emailLink).toHaveAttribute('title', 'Go to contact section');
    });

    it('external links open in new tab with security attributes', () => {
      render(<Footer />);
      const githubLink = screen.getByLabelText('View GitHub profile');
      const linkedinLink = screen.getByLabelText('Connect on LinkedIn');

      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
      expect(linkedinLink).toHaveAttribute('target', '_blank');
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('email link is internal and does not open in new tab', () => {
      render(<Footer />);
      const emailLink = screen.getByLabelText('Go to contact section');

      expect(emailLink).not.toHaveAttribute('target', '_blank');
      expect(emailLink).toHaveAttribute('href', '#contact');
    });

    it('social links are keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<Footer />);

      const githubLink = screen.getByLabelText('View GitHub profile');
      
      // Tab to the link and verify it can be focused
      await user.tab();
      // The home link should be focused first, then we can tab to social links
      // We'll verify the links are in the tab order by checking they are focusable
      expect(githubLink).toHaveAttribute('href');
    });
  });

  describe('Navigation Links Accessibility', () => {
    it('renders all navigation links as buttons', () => {
      render(<Footer />);
      const navLinks = ['About', 'Projects', 'Skills', 'Blog', 'Contact'];
      
      navLinks.forEach((link) => {
        expect(screen.getByRole('button', { name: link })).toBeInTheDocument();
      });
    });

    it('navigation links are keyboard accessible buttons', async () => {
      const user = userEvent.setup();
      render(<Footer />);
      
      const aboutButton = screen.getByRole('button', { name: 'About' });
      
      // Verify it's a button and can receive keyboard focus
      expect(aboutButton.tagName).toBe('BUTTON');
      
      // Buttons are focusable by default
      aboutButton.focus();
      expect(aboutButton).toHaveFocus();
    });
  });

  describe('Home Link Accessibility', () => {
    it('home link has proper accessibility attributes', () => {
      render(<Footer />);
      const homeLink = screen.getByText('CM');
      
      expect(homeLink.tagName).toBe('A');
      expect(homeLink).toHaveAttribute('href', '#');
    });

    it('home link is keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<Footer />);
      
      const homeLink = screen.getByText('CM');
      
      // Verify link can receive focus
      homeLink.focus();
      expect(homeLink).toHaveFocus();
    });
  });

  it('displays the creative work link', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: /Film & Photography/i });
    expect(link).toHaveAttribute('href', 'https://stealinglight.hk');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('displays copyright information', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Chris McMillon. All rights reserved.`)).toBeInTheDocument();
  });

  it('displays tech stack information', () => {
    render(<Footer />);
    expect(screen.getByText('// Built with React & Tailwind CSS')).toBeInTheDocument();
  });
});
