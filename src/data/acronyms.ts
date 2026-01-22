export interface AcronymDefinition {
  fullName: string;
  description?: string;
}

export const acronyms: Record<string, AcronymDefinition> = {
  CMMC: {
    fullName: 'Cybersecurity Maturity Model Certification',
    description: 'DoD cybersecurity framework for defense contractors',
  },
  'NIST 800-171': {
    fullName: 'NIST Special Publication 800-171',
    description: 'Protecting Controlled Unclassified Information (CUI)',
  },
  RMF: {
    fullName: 'Risk Management Framework',
    description: 'NIST framework for managing organizational risk',
  },
  DoD: {
    fullName: 'Department of Defense',
  },
  SOC: {
    fullName: 'Security Operations Center',
  },
};
