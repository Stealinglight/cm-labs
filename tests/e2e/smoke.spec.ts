import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Collect console errors
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        console.error(`Console error: ${msg.text()}`);
      }
    });
  });

  test('homepage loads successfully', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(/Chris McMillon/i);
  });

  test('no application console errors on page load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // Ignore network errors from external resources (analytics, etc.)
        if (!text.includes('net::ERR_') && !text.includes('Failed to load resource')) {
          errors.push(text);
        }
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(errors).toHaveLength(0);
  });

  // Skip on mobile - navigation is behind hamburger menu
  // Desktop test is sufficient for smoke testing navigation
  test('navigation links work', async ({ page, isMobile }) => {
    test.skip(isMobile, 'Navigation test runs on desktop only');

    await page.goto('/');

    const sections = ['about', 'projects', 'skills', 'experience', 'blog', 'contact'];

    for (const section of sections) {
      // Click nav link
      await page.getByRole('button', { name: new RegExp(`^${section}$`, 'i') }).first().click();

      // Wait for scroll
      await page.waitForTimeout(500);

      // Verify section is in viewport
      const sectionElement = page.locator(`#${section}`);
      await expect(sectionElement).toBeVisible();
    }
  });

  // Skip on mobile - download link is in collapsed nav menu
  test('resume PDF download link is valid', async ({ page, request, isMobile }) => {
    test.skip(isMobile, 'Download link test runs on desktop only');

    await page.goto('/');

    // Find download link by href (in hero section)
    const downloadLink = page.locator('a[href*="Resume"][download]').first();
    await expect(downloadLink).toBeVisible();

    const href = await downloadLink.getAttribute('href');
    expect(href).toBeTruthy();

    // Verify PDF is accessible
    const response = await request.get(href!);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/pdf');
  });

  test('contact section renders correctly', async ({ page }) => {
    await page.goto('/');

    // Scroll to contact
    await page.locator('#contact').scrollIntoViewIfNeeded();

    // Verify contact section has expected content
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();

    // Check section renders with heading
    await expect(contactSection.locator('h2, h3').first()).toBeVisible();
  });
});
