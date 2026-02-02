# Security Audit Design — CM-Labs Portfolio

**Date**: 2026-02-01
**Status**: Approved
**Type**: Full Stack Security Audit + Ongoing Enforcement

---

## Overview

### Purpose

Proactive security hardening and pre-launch validation for the CM-Labs technical portfolio website. This audit combines systematic domain-based coverage with attack-surface prioritization to focus effort where real risk exists.

### Philosophy

1. External-facing attack surface gets audited first within each domain
2. Every finding gets either remediated or documented as accepted risk
3. Enforcement mechanisms prevent regression — security isn't a one-time activity
4. Documentation serves dual purpose: operational reference AND portfolio demonstration

### Scope

**In Scope:**
- React application source code
- Vite build pipeline configuration
- GitHub Actions CI/CD workflows
- AWS Amplify infrastructure (CDK)
- All npm dependencies (direct and transitive)
- Secrets handling and environment variables

**Out of Scope:**
- AWS account-level security (IAM policies beyond Amplify)
- Domain registrar security
- Personal device security

### Deliverables

| Deliverable | Location |
|-------------|----------|
| Security Audit Report | `docs/security/SECURITY-AUDIT.md` |
| Security Policy | `docs/security/SECURITY-POLICY.md` |
| Public Security Policy | `SECURITY.md` (repo root) |
| Implemented Fixes | Throughout codebase |
| CI Security Pipeline | `.github/workflows/` |
| Pre-commit Hooks | `.husky/` or `lefthook.yml` |

---

## Attack Surface Analysis

### Entry Points (External → Internal)

| Entry Point | What's Exposed | Risk Level | Rationale |
|-------------|----------------|------------|-----------|
| Portfolio URL | Static React SPA, resume PDF, assets | Low | No backend, no user input, no dynamic content |
| GitHub Repository | Source code, CI workflows, commit history | Medium | Workflow injection vectors, potential secret leakage in history |
| GitHub Actions | CI/CD pipeline execution | Medium-High | Code execution capability, secrets access, supply chain risk |
| AWS Amplify Console | Deployment config, environment variables | Medium | Requires AWS credentials to access |
| NPM Dependencies | Third-party code in build and browser | Medium | Supply chain vulnerabilities, transitive risk |

### Risk Profile Summary

This portfolio is a **static site** with no server, database, or authentication. This dramatically reduces application-layer risk. The highest-risk areas are:

1. **CI/CD pipeline** — Most attractive attack vector (code execution, secrets access)
2. **Dependencies** — Primary application supply chain risk
3. **Secrets in repo/history** — Accidental exposure in commits
4. **GitHub workflow triggers** — Injection via PR titles, branch names, issue bodies

The application code itself (React components) is lower risk since it's purely client-side rendering of static data.

---

## Domain Audits

Audit order follows risk prioritization from attack surface analysis.

### Domain 1: Secrets Management

**Objective**: Ensure no secrets exist in repository history or configuration files.

**Audit Scope:**
- Full git history scan for secret patterns
- GitHub Actions secrets configuration and usage
- Environment variable handling in Amplify
- Hardcoded values in source code

**Tooling:**
| Tool | Purpose | Installation |
|------|---------|--------------|
| gitleaks | Git history secret scanning | brew install gitleaks |
| trufflehog | Deep entropy-based secret detection | brew install trufflehog |

**Checks:**
- [ ] No API keys, tokens, or credentials in git history
- [ ] No hardcoded secrets in source files
- [ ] .env.example documents required variables without values
- [ ] .gitignore excludes all secret-containing files
- [ ] GitHub Actions secrets used via secrets.* syntax

**Enforcement:**
- Pre-commit hook: gitleaks protect --staged
- CI step: gitleaks detect --source .

---

### Domain 2: CI/CD Pipeline Security

**Objective**: Harden GitHub Actions workflows against injection and supply chain attacks.

**Audit Scope:**
- All workflow files in .github/workflows/
- Workflow triggers and their exposure to external input
- Third-party action versions and pinning
- Workflow permissions and token scopes
- Secrets exposure in logs or artifacts

**Tooling:**
| Tool | Purpose | Installation |
|------|---------|--------------|
| actionlint | GitHub Actions static analysis | brew install actionlint |
| zizmor | Security-focused Actions analyzer | pip install zizmor |

**Checks:**
- [ ] No unsafe use of injectable inputs from github.event context
- [ ] All third-party actions pinned to full SHA (not tags)
- [ ] All workflows declare explicit permissions block
- [ ] No use of pull_request_target with write permissions
- [ ] Artifacts sanitized before upload
- [ ] No secrets printed to logs

**Enforcement:**
- CI step: actionlint .github/workflows/
- CI step: zizmor .github/workflows/
- Documented policy requiring SHA pinning for all actions

---

### Domain 3: Dependency Security

**Objective**: Identify and remediate vulnerable dependencies, establish update process.

**Audit Scope:**
- All npm dependencies (direct and transitive)
- Known CVEs in dependency tree
- License compliance
- Lock file integrity
- Unused dependencies

**Tooling:**
| Tool | Purpose | Installation |
|------|---------|--------------|
| npm audit / bun audit | Built-in vulnerability scan | Built-in |
| osv-scanner | Google OSV database scanner | brew install osv-scanner |
| license-checker | License compliance | npx license-checker |
| depcheck | Unused dependency detection | npx depcheck |

**Checks:**
- [ ] No critical or high severity CVEs (or documented acceptance)
- [ ] No unexpected copyleft licenses
- [ ] Lock file committed and used in CI
- [ ] No abandoned/unmaintained packages in critical paths
- [ ] Dev dependencies not in production bundle
- [ ] No dependencies with suspicious postinstall scripts

**Enforcement:**
- CI step: npm audit --audit-level=high
- CI step: osv-scanner --lockfile=package-lock.json
- Dependabot or Renovate configured for automated updates
- Weekly scheduled scan via GitHub Actions

---

### Domain 4: Application Security

**Objective**: Ensure React application follows secure coding patterns.

**Audit Scope:**
- React components for XSS vectors
- External link handling
- Content Security Policy
- Any runtime data fetching
- Asset integrity

**Tooling:**
| Tool | Purpose | Installation |
|------|---------|--------------|
| semgrep | Static analysis with React rules | brew install semgrep |
| eslint-plugin-security | Security-focused linting | Already installed |

**Checks:**
- [ ] No use of unsafe HTML injection patterns (or justified and sanitized)
- [ ] No use of dynamic code execution patterns
- [ ] External links have rel="noopener noreferrer"
- [ ] No unsanitized URL construction
- [ ] ESLint security rules enabled as errors

**Enforcement:**
- CI step: semgrep --config p/react
- CI step: eslint --max-warnings 0
- Pre-commit hook: eslint --fix

---

### Domain 5: Infrastructure Security

**Objective**: Harden AWS Amplify deployment and HTTP security headers.

**Audit Scope:**
- Amplify configuration and build settings
- CDK infrastructure code
- HTTP security headers
- HTTPS enforcement
- Branch and preview deployment settings

**Tooling:**
| Tool | Purpose | Installation |
|------|---------|--------------|
| cdk-nag | CDK security linting | npm package |
| securityheaders.com | External header analysis | Web service |
| curl -I | Header verification | Built-in |

**Checks:**
- [ ] HTTPS enforced with redirects
- [ ] HSTS header configured
- [ ] X-Frame-Options header set
- [ ] X-Content-Type-Options header set
- [ ] Content-Security-Policy header configured
- [ ] Referrer-Policy header set
- [ ] CDK IAM roles follow least privilege
- [ ] Preview deployments don't expose sensitive data

**Headers Configuration Target:**
```yaml
customHeaders:
  - pattern: '**/*'
    headers:
      - key: Strict-Transport-Security
        value: max-age=31536000; includeSubDomains
      - key: X-Frame-Options
        value: DENY
      - key: X-Content-Type-Options
        value: nosniff
      - key: Referrer-Policy
        value: strict-origin-when-cross-origin
      - key: Content-Security-Policy
        value: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;
```

**Enforcement:**
- CI step: cdk-nag on infrastructure changes
- Post-deploy verification of headers
- Lighthouse CI for security audits

---

## Enforcement Automation

### Local Development (Pre-commit Hooks)

**Tool**: Husky or lefthook

**Hooks:**
```bash
# pre-commit
gitleaks protect --staged --verbose
eslint --fix $(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx)$')
```

**Design Principle**: Hooks must complete in <5 seconds. Heavy scans stay in CI.

### CI Pipeline

**On Every Push/PR:**

| Step | Tool | Command | Blocking |
|------|------|---------|----------|
| Secrets | gitleaks | gitleaks detect --source . | Yes |
| Workflows | actionlint | actionlint .github/workflows/ | Yes |
| Dependencies | npm audit | npm audit --audit-level=high | Yes |
| Application | semgrep | semgrep --config p/react --error | Yes |
| Linting | eslint | eslint --max-warnings 0 | Yes |

**Scheduled (Weekly):**

| Tool | Command | Purpose |
|------|---------|---------|
| osv-scanner | osv-scanner --lockfile=package-lock.json | Comprehensive CVE scan |
| trivy | trivy fs --severity HIGH,CRITICAL . | Filesystem scan |

### Branch Protection Rules

Configure on main branch:
- [x] Require status checks before merge
- [x] Require branches to be up to date
- [x] Require linear history (no merge commits)
- [x] Do not allow force pushes
- [x] Do not allow deletions

---

## Documentation Deliverables

### 1. Security Audit Report (docs/security/SECURITY-AUDIT.md)

Structure:
- Executive Summary: Finding counts by severity, overall posture assessment
- Methodology: Reference to this design document
- Attack Surface Analysis: Summary from this document
- Findings: Each with severity, domain, location, description, evidence, remediation, verification
- Accepted Risks: Items intentionally not fixed, with justification
- Recommendations: Future improvements beyond current scope

### 2. Security Policy (docs/security/SECURITY-POLICY.md)

Structure:
- Security Practices: Code changes, dependencies, infrastructure policies
- Automated Security Controls: Pre-commit hooks, CI pipeline, scheduled scans
- Incident Response: Vulnerability and secrets exposure procedures
- Maintenance Schedule: Task frequency and ownership

### 3. Public Security Policy (SECURITY.md)

Standard GitHub security policy file with:
- Vulnerability reporting contact
- Required information for reports
- Response timeline commitments
- Link to detailed security practices

---

## Execution Plan

### Step-by-Step Sequence

| Step | Action | Domain | Complexity |
|------|--------|--------|------------|
| 1 | Install security tooling | Setup | Low |
| 2 | Run gitleaks on full history | Secrets | Low |
| 3 | Run trufflehog for deep scan | Secrets | Low |
| 4 | Audit GitHub Actions with actionlint | CI/CD | Medium |
| 5 | Audit GitHub Actions with zizmor | CI/CD | Medium |
| 6 | Run npm audit | Dependencies | Low |
| 7 | Run osv-scanner | Dependencies | Low |
| 8 | Check licenses | Dependencies | Low |
| 9 | Run semgrep on application | Application | Medium |
| 10 | Verify ESLint security rules | Application | Low |
| 11 | Run cdk-nag on infrastructure | Infrastructure | Medium |
| 12 | Verify security headers | Infrastructure | Low |
| 13 | Implement all remediations | All | Varies |
| 14 | Configure pre-commit hooks | Enforcement | Low |
| 15 | Add CI security pipeline steps | Enforcement | Medium |
| 16 | Configure branch protection | Enforcement | Low |
| 17 | Write SECURITY-AUDIT.md | Documentation | Medium |
| 18 | Write SECURITY-POLICY.md | Documentation | Medium |
| 19 | Write SECURITY.md | Documentation | Low |
| 20 | Final verification pass | All | Low |

### Success Criteria

- [ ] Zero secrets detected in git history
- [ ] All GitHub Actions pinned to SHA
- [ ] Zero high/critical dependency vulnerabilities (or documented acceptance)
- [ ] All security headers configured and verified
- [ ] Pre-commit hooks installed and functional
- [ ] CI pipeline blocking on security failures
- [ ] Branch protection rules active
- [ ] All three security documents written and committed

---

## Tooling Reference

### Complete Installation Commands

```bash
# macOS (Homebrew)
brew install gitleaks trufflehog actionlint osv-scanner semgrep

# Python tools
pip install zizmor

# Node tools (in project)
npm install --save-dev husky cdk-nag
npx husky init
```

### Tool Documentation Links

- gitleaks: https://github.com/gitleaks/gitleaks
- trufflehog: https://github.com/trufflesecurity/trufflehog
- actionlint: https://github.com/rhysd/actionlint
- zizmor: https://github.com/woodruffw/zizmor
- osv-scanner: https://github.com/google/osv-scanner
- semgrep: https://github.com/returntocorp/semgrep
- cdk-nag: https://github.com/cdklabs/cdk-nag

---

## Appendix: OWASP References

While this audit uses a custom methodology, the following OWASP resources informed the approach:

- OWASP Top 10: https://owasp.org/www-project-top-ten/
- OWASP CI/CD Security Top 10: https://owasp.org/www-project-top-10-ci-cd-security-risks/
- OWASP Dependency Check: https://owasp.org/www-project-dependency-check/

---

*Document generated as part of security audit brainstorming session.*
