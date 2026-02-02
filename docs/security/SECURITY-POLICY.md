# Security Policy -- CM-Labs Portfolio

This document details the comprehensive security practices, automated controls, and procedures implemented for the CM-Labs portfolio project. It serves as the authoritative reference for maintaining the security posture established during the security audit.

**Last Updated:** 2026-02-01
**Version:** 1.0

---

## Table of Contents

1. [Security Practices](#security-practices)
2. [Automated Security Controls](#automated-security-controls)
3. [Incident Response](#incident-response)
4. [Maintenance Schedule](#maintenance-schedule)
5. [Security Tools Reference](#security-tools-reference)

---

## Security Practices

### Code Changes

All code modifications must follow these security requirements:

- **Pull Request Requirement**: All changes must be submitted via pull request -- no direct commits to `main`
- **Security Checks**: All CI security checks must pass before merge
- **Code Review**: Changes should be reviewed before merging (Claude Code Review available for automated assistance)
- **Secrets Policy**: Secrets, credentials, API keys, and tokens must NEVER be committed to the repository
- **SHA-Pinned Actions**: All GitHub Actions must use full SHA commit hashes, not version tags

### Dependencies

Dependency management follows a strict security-first approach:

| Requirement | Policy |
|-------------|--------|
| Update Mechanism | Automated via Dependabot |
| Update Frequency | Weekly (Mondays) |
| Critical CVE Response | Within 7 days |
| High CVE Response | Within 14 days |
| Vulnerability Scanning | Weekly scheduled + on every PR |

**Dependabot Configuration:**
- Main application (`/`): npm ecosystem, grouped by dev/prod
- Infrastructure (`/infrastructure`): npm ecosystem
- GitHub Actions: Automated SHA updates

### Infrastructure

Infrastructure security requirements:

- **Infrastructure as Code**: All infrastructure changes via AWS CDK
- **No Manual Changes**: Console modifications are prohibited -- all changes must be codified
- **OIDC Authentication**: AWS uses OpenID Connect for authentication -- no static credentials
- **cdk-nag Compliance**: All CDK stacks must pass cdk-nag security checks
- **Least Privilege**: IAM roles follow principle of least privilege

### Secret Handling

Secrets must be managed according to these standards:

| Pattern | Implementation |
|---------|---------------|
| Environment Files | Excluded via `.gitignore` (`.env`, `.env.local`, `.env.*.local`) |
| CI/CD Secrets | Stored in GitHub Secrets, referenced via `${{ secrets.NAME }}` |
| AWS Credentials | OIDC role assumption, never static keys |
| Local Development | Use `.env.local` files (gitignored) |

**Required GitHub Secrets:**
- `GITHUB_TOKEN` - Automatic, used for API access
- `CLAUDE_CODE_OAUTH_TOKEN` - Claude API authentication
- `GH_TOKEN` - GitHub API for PR operations
- `AWS_ROLE_TO_ASSUME` - AWS OIDC role ARN
- `AWS_REGION` - AWS deployment region

---

## Automated Security Controls

### CI Pipeline Security Checks

The CI pipeline (`ci.yml`) enforces security on every pull request and push to main:

| Step | Tool | Failure Behavior |
|------|------|------------------|
| Secret Detection | Gitleaks | Blocks merge |
| Dependency Audit | npm audit (high level) | Blocks merge |
| Static Analysis | Semgrep (React, TypeScript, security-audit rules) | Blocks merge |
| Linting | ESLint with security plugin | Blocks merge |
| Workflow Linting | actionlint | Blocks merge |

**Pipeline Order:**
1. Checkout code (SHA-pinned, `persist-credentials: false`)
2. Run Gitleaks secret scan
3. Install dependencies (`npm ci`)
4. Run ESLint security checks
5. Run npm audit
6. Run Semgrep static analysis
7. Run actionlint on workflows

### Weekly Security Scan

A comprehensive security scan runs every Monday at 9 AM UTC (`security-scan.yml`):

| Scan | Tool | Output |
|------|------|--------|
| Secret Detection | Gitleaks | GitHub Security Events |
| Dependency Vulnerabilities | npm audit | Console output |
| OSV Database Check | OSV Scanner | Console output |
| Static Analysis | Semgrep | SARIF to GitHub Code Scanning |

### Pre-commit Hooks

Local development should enforce security via pre-commit hooks:

```yaml
# Recommended .pre-commit-config.yaml
repos:
  - repo: https://github.com/gitleaks/gitleaks
    rev: v8.18.0
    hooks:
      - id: gitleaks
```

**Hook Responsibilities:**
- Prevent secrets from being committed
- Run before git commit completes
- Block commit if secrets detected

### ESLint Security Configuration

The project uses `eslint-plugin-security` with the following enforced rules:

| Rule | Purpose |
|------|---------|
| `security/detect-object-injection` | Prevent object injection attacks |
| `security/detect-non-literal-regexp` | Prevent ReDoS attacks |
| `security/detect-unsafe-regex` | Detect vulnerable regex patterns |
| `security/detect-buffer-buffer-allocation` | Prevent buffer overflow |
| `security/detect-eval-with-expression` | Block dynamic eval |
| `security/detect-no-csrf-before-method-override` | CSRF protection |
| `security/detect-possible-timing-attacks` | Timing attack prevention |

### GitHub Actions Security

All workflows follow these security practices:

| Practice | Implementation |
|----------|---------------|
| SHA Pinning | All actions use full commit SHA with version comment |
| Minimal Permissions | Explicit `permissions:` blocks on all jobs |
| No Credential Persistence | `persist-credentials: false` on checkout |
| OIDC for AWS | Role assumption instead of static keys |

**Example of Secure Action Reference:**
```yaml
- uses: actions/checkout@34e114876b0b11c390a56381ad16ebd13914f8d5 # v4
  with:
    persist-credentials: false
```

---

## Incident Response

### If a Vulnerability is Discovered

**Severity Assessment:**

| Severity | CVSS Score | Response Time |
|----------|------------|---------------|
| Critical | 9.0 - 10.0 | Immediate (same day) |
| High | 7.0 - 8.9 | Within 7 days |
| Medium | 4.0 - 6.9 | Within 30 days |
| Low | 0.1 - 3.9 | Next scheduled update |

**Response Procedure:**

1. **Assess**: Determine severity and exploitability
   - Is the vulnerability in production code or dev dependencies?
   - Is the vulnerable code path reachable?
   - What is the potential impact?

2. **Contain**: If critical/actively exploited
   - Consider temporary mitigation (WAF rules, feature flags)
   - Notify stakeholders if user data at risk

3. **Remediate**: Fix the vulnerability
   - Update vulnerable dependency
   - Apply code fix if application vulnerability
   - Test the fix thoroughly

4. **Document**: Record in security audit report
   - Add to `docs/security/findings/` if significant
   - Update this policy if process gaps identified

5. **Review**: Analyze how it happened
   - Why wasn't this caught earlier?
   - Do we need additional scanning rules?
   - Update automated controls if needed

### If Secrets are Exposed

**Immediate Actions (within 1 hour):**

1. **Rotate Immediately**: Change the exposed credential
   - AWS keys: Deactivate in IAM, create new keys
   - GitHub tokens: Revoke in Settings, create new token
   - API keys: Rotate in provider dashboard

2. **Audit Access**: Review logs for unauthorized use
   - AWS CloudTrail for AWS credentials
   - GitHub audit log for tokens
   - Provider logs for API keys

3. **Scan for Abuse**: Check for unauthorized changes
   - Review recent commits and PRs
   - Check infrastructure for modifications
   - Verify no unauthorized deployments

4. **Remove from History**: If committed to git
   - Use `git filter-branch` or BFG Repo Cleaner
   - Force push cleaned history (coordinate with team)
   - Notify GitHub to clear cached views

5. **Document**: Record the incident
   - What was exposed and for how long
   - What access was achieved (if any)
   - What preventive measures will be added

**Prevention Measures:**
- Pre-commit hooks with Gitleaks
- CI pipeline secret scanning
- `.gitignore` patterns for `.env` files
- Never store secrets in code or config files

### Reporting a Vulnerability

External security researchers should report vulnerabilities through:

1. **GitHub Private Vulnerability Reporting** (preferred)
2. **Email** to repository maintainer

**Response Commitment:**
- Acknowledgment: Within 48 hours
- Initial assessment: Within 7 days
- Resolution timeline: Communicated after assessment

---

## Maintenance Schedule

| Task | Frequency | Owner | Automation |
|------|-----------|-------|------------|
| Dependency updates | Weekly (Monday) | Dependabot | Automated PRs |
| Security scan review | Weekly | Maintainer | Manual review of scan results |
| npm audit check | Every PR | CI Pipeline | Automated, blocks merge |
| Semgrep analysis | Every PR | CI Pipeline | Automated, blocks merge |
| Secret scan | Every PR + Weekly | CI Pipeline | Automated |
| Full security audit | Quarterly | Maintainer | Manual comprehensive review |
| Policy review | Quarterly | Maintainer | Update this document |
| Tool updates | Monthly | Maintainer | Update scanner versions |

### Quarterly Audit Checklist

- [ ] Review and update all security tool versions
- [ ] Run full Semgrep scan with latest rulesets
- [ ] Review Dependabot configuration and alerts
- [ ] Audit GitHub Actions for new security features
- [ ] Review and rotate long-lived credentials
- [ ] Update security documentation
- [ ] Review and close stale security findings
- [ ] Test incident response procedures

---

## Security Tools Reference

### Tools Used in This Project

| Tool | Purpose | Version | Documentation |
|------|---------|---------|---------------|
| Gitleaks | Secret detection in git history | v8.x | [GitHub](https://github.com/gitleaks/gitleaks) |
| npm audit | Node.js dependency vulnerabilities | Built-in | [npm docs](https://docs.npmjs.com/cli/v8/commands/npm-audit) |
| OSV Scanner | Google's vulnerability database | Latest | [GitHub](https://github.com/google/osv-scanner) |
| Semgrep | Static analysis (SAST) | Latest | [semgrep.dev](https://semgrep.dev/) |
| actionlint | GitHub Actions linting | Latest | [GitHub](https://github.com/rhysd/actionlint) |
| eslint-plugin-security | JavaScript security linting | v3.x | [npm](https://www.npmjs.com/package/eslint-plugin-security) |
| cdk-nag | AWS CDK security compliance | Latest | [GitHub](https://github.com/cdklabs/cdk-nag) |
| Dependabot | Automated dependency updates | GitHub native | [GitHub Docs](https://docs.github.com/en/code-security/dependabot) |

### Running Security Scans Locally

```bash
# Secret scanning
gitleaks detect --source . --verbose

# Dependency audit
npm audit --audit-level=high

# OSV Scanner
osv-scanner --lockfile=package-lock.json

# Semgrep
semgrep --config p/react --config p/typescript --config p/security-audit src/

# Actionlint
actionlint .github/workflows/

# ESLint security rules
npm run lint
```

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-01 | Initial security policy from security audit |

---

*This document should be reviewed and updated quarterly or whenever significant security changes are made to the project.*
