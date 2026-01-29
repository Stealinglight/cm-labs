import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test.describe('Desktop', () => {
    test.use({ viewport: { width: 1280, height: 720 } });

    test('hero section', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const hero = page.locator('#hero');
      await expect(hero).toHaveScreenshot('hero-desktop.png');
    });

    test('projects section', async ({ page }) => {
      await page.goto('/');
      await page.locator('#projects').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500); // Wait for scroll animation

      const projects = page.locator('#projects');
      await expect(projects).toHaveScreenshot('projects-desktop.png');
    });

    test('full page at 1280px', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot('fullpage-1280.png', {
        fullPage: true,
      });
    });
  });

  test.describe('Tablet', () => {
    test.use({ viewport: { width: 768, height: 1024 } });

    test('full page at 768px', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot('fullpage-768.png', {
        fullPage: true,
      });
    });
  });

  test.describe('Mobile', () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test('hero section mobile', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      const hero = page.locator('#hero');
      await expect(hero).toHaveScreenshot('hero-mobile.png');
    });

    test('full page at 375px', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      await expect(page).toHaveScreenshot('fullpage-375.png', {
        fullPage: true,
      });
    });
  });
});
