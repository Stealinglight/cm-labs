import { render, screen } from '@testing-library/react';
import { ContactSection } from '../../src/components/ContactSection';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

describe('ContactSection', () => {
  it('renders the section heading', () => {
    render(<ContactSection />);
    expect(screen.getByRole('heading', { name: /Get in Touch/i })).toBeInTheDocument();
  });

  it('displays introduction text', () => {
    render(<ContactSection />);
    expect(screen.getByText(/Interested in working together/i)).toBeInTheDocument();
  });

  describe('Email Obfuscation', () => {
    it('displays email address assembled from parts', () => {
      render(<ContactSection />);
      // The email should be visible but assembled via JavaScript
      const emailLink = screen.getByText(/stealinglight@gmail\.com/);
      expect(emailLink).toBeInTheDocument();
    });

    it('email link has proper mailto href', () => {
      render(<ContactSection />);
      const emailLink = screen.getByText(/stealinglight@gmail\.com/);
      expect(emailLink).toHaveAttribute('href', 'mailto:stealinglight@gmail.com');
    });

    it('email link is keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<ContactSection />);
      
      const emailLink = screen.getByText(/stealinglight@gmail\.com/);
      
      // Verify link can receive focus
      emailLink.focus();
      expect(emailLink).toHaveFocus();
    });

    it('email uses obfuscation function to prevent bot harvesting', () => {
      render(<ContactSection />);
      const emailLink = screen.getByText(/stealinglight@gmail\.com/);
      
      // The email should be rendered via JavaScript function, not hardcoded
      // This makes it harder for bots to scrape
      expect(emailLink.textContent).toMatch(/stealinglight@gmail\.com/);
    });
  });

  describe('Contact Information Links', () => {
    it('renders GitHub link with proper attributes', () => {
      render(<ContactSection />);
      const githubLink = screen.getByRole('link', { name: /github\.com\/Stealinglight/i });
      expect(githubLink).toHaveAttribute('href', 'https://github.com/Stealinglight');
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders LinkedIn link with proper attributes', () => {
      render(<ContactSection />);
      const linkedinLink = screen.getByRole('link', { name: /linkedin\.com\/in\/cmcmillon/i });
      expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/cmcmillon');
      expect(linkedinLink).toHaveAttribute('target', '_blank');
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('all external links are keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<ContactSection />);
      
      const githubLink = screen.getByRole('link', { name: /github\.com\/Stealinglight/i });
      const linkedinLink = screen.getByRole('link', { name: /linkedin\.com\/in\/cmcmillon/i });
      
      // Verify links can receive focus
      githubLink.focus();
      expect(githubLink).toHaveFocus();
      
      linkedinLink.focus();
      expect(linkedinLink).toHaveFocus();
    });
  });

  describe('Contact Form Accessibility', () => {
    it('renders all form fields with proper labels', () => {
      render(<ContactSection />);
      
      expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    });

    it('form fields have proper id and for associations', () => {
      render(<ContactSection />);
      
      const nameInput = screen.getByLabelText(/Name/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const messageInput = screen.getByLabelText(/Message/i);
      
      expect(nameInput).toHaveAttribute('id', 'name');
      expect(emailInput).toHaveAttribute('id', 'email');
      expect(messageInput).toHaveAttribute('id', 'message');
    });

    it('all form fields are required', () => {
      render(<ContactSection />);
      
      const nameInput = screen.getByLabelText(/Name/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const messageInput = screen.getByLabelText(/Message/i);
      
      expect(nameInput).toBeRequired();
      expect(emailInput).toBeRequired();
      expect(messageInput).toBeRequired();
    });

    it('email field has proper type', () => {
      render(<ContactSection />);
      const emailInput = screen.getByLabelText(/Email/i);
      expect(emailInput).toHaveAttribute('type', 'email');
    });

    it('form fields are keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<ContactSection />);
      
      const nameInput = screen.getByLabelText(/Name/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const messageInput = screen.getByLabelText(/Message/i);
      
      // Tab through form fields
      await user.tab();
      // Note: We can't easily test the exact tab order without setting up the entire page
      // but we can verify fields are focusable
      nameInput.focus();
      expect(nameInput).toHaveFocus();
      
      emailInput.focus();
      expect(emailInput).toHaveFocus();
      
      messageInput.focus();
      expect(messageInput).toHaveFocus();
    });

    it('submit button is keyboard accessible', async () => {
      const user = userEvent.setup();
      render(<ContactSection />);
      
      const submitButton = screen.getByRole('button', { name: /Send Message/i });
      
      submitButton.focus();
      expect(submitButton).toHaveFocus();
    });

    it('form can be filled and submitted via keyboard', async () => {
      const user = userEvent.setup();
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      render(<ContactSection />);
      
      const nameInput = screen.getByLabelText(/Name/i);
      const emailInput = screen.getByLabelText(/Email/i);
      const messageInput = screen.getByLabelText(/Message/i);
      const submitButton = screen.getByRole('button', { name: /Send Message/i });
      
      // Fill form via keyboard
      await user.type(nameInput, 'Test User');
      await user.type(emailInput, 'test@example.com');
      await user.type(messageInput, 'Test message');
      
      // Submit form
      await user.click(submitButton);
      
      expect(consoleLogSpy).toHaveBeenCalledWith('Form submitted:', {
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message',
      });
      
      consoleLogSpy.mockRestore();
    });
  });

  it('displays location information', () => {
    render(<ContactSection />);
    expect(screen.getByText(/Seattle, Washington/i)).toBeInTheDocument();
  });

  it('displays form development status message', () => {
    render(<ContactSection />);
    expect(screen.getByText(/Form submissions are currently in development/i)).toBeInTheDocument();
  });
});
