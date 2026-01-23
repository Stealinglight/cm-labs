import type { MouseEvent } from 'react';

/**
 * Scrolls to a section by ID with smooth behavior
 * @param sectionId - The ID of the section to scroll to (without the # prefix)
 */
export function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Creates an onClick handler for anchor links that scrolls smoothly
 * @param sectionId - The ID of the section to scroll to (without the # prefix)
 */
export function createScrollHandler(sectionId: string) {
  return (e: MouseEvent) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };
}
