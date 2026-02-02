# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

### Contact

Please report security vulnerabilities via GitHub's private vulnerability reporting feature or by emailing [your-email].

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact assessment
- Any suggested remediation

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 7 days
- **Resolution Timeline**: Communicated after assessment

## Security Practices

This project implements:

- Automated secret scanning (gitleaks)
- Dependency vulnerability scanning (npm audit, OSV Scanner)
- Static analysis (ESLint security rules, Semgrep)
- CI/CD pipeline security (actionlint, SHA-pinned actions)
- Pre-commit hooks for local enforcement

See `docs/security/SECURITY-POLICY.md` for detailed security practices.
