# Security Audit Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Execute a full-stack security audit with ongoing enforcement for the CM-Labs portfolio website.

**Architecture:** Domain-based audit (secrets → CI/CD → dependencies → application → infrastructure) with attack-surface prioritization. Each domain produces findings, remediations, and enforcement mechanisms. Final deliverables are three security documents.

**Tech Stack:** gitleaks, trufflehog, actionlint, zizmor, osv-scanner, semgrep, cdk-nag, husky (pre-commit hooks)

**Working Directory:** `/Volumes/DataDeuce/Projects/cm-labs/.worktrees/security-audit`

---

## Phase 1: Tool Installation & Setup

### Task 1: Install Security Tools via Homebrew

**Files:** None (system tools)

**Step 1: Install secret scanners**

```bash
brew install gitleaks trufflehog
```

Expected: Tools install successfully

**Step 2: Install CI/CD analyzers**

```bash
brew install actionlint
pip3 install zizmor
```

Expected: actionlint and zizmor available on PATH

**Step 3: Install dependency scanner**

```bash
brew install osv-scanner
```

Expected: osv-scanner available on PATH

**Step 4: Install application scanner**

```bash
brew install semgrep
```

Expected: semgrep available on PATH

**Step 5: Verify all tools**

```bash
gitleaks version && trufflehog --version && actionlint --version && zizmor --version && osv-scanner --version && semgrep --version
```

Expected: All tools report versions

---

## Phase 2: Secrets Management Audit

### Task 2: Scan Git History for Secrets

**Files:**
- Output: `docs/security/findings/secrets-gitleaks.txt`
- Output: `docs/security/findings/secrets-trufflehog.txt`

**Step 1: Create findings directory**

```bash
mkdir -p docs/security/findings
```

**Step 2: Run gitleaks on full history**

```bash
gitleaks detect --source . --verbose --report-path docs/security/findings/secrets-gitleaks.json 2>&1 | tee docs/security/findings/secrets-gitleaks.txt
```

Expected: Either "no leaks found" or list of findings to remediate

**Step 3: Run trufflehog for entropy-based detection**

```bash
trufflehog filesystem . --json 2>&1 | tee docs/security/findings/secrets-trufflehog.txt
```

Expected: Either empty output or list of high-entropy strings to review

**Step 4: Document findings**

If findings exist, document each with:
- File path and line
- Secret type detected
- Remediation action (rotate + remove from history OR false positive)

**Step 5: Commit findings documentation**

```bash
git add docs/security/findings/
git commit -m "audit: document secrets scan results"
```

---

### Task 3: Verify Secret Handling Patterns

**Files:**
- Review: `.gitignore`
- Review: `.github/workflows/*.yml`

**Step 1: Verify .env patterns in gitignore**

```bash
grep -E "\.env" .gitignore
```

Expected: `.env`, `.env.local`, `.env.*.local` are listed

**Step 2: Check for .env.example**

```bash
ls -la .env* 2>/dev/null || echo "No .env files found"
```

Expected: If app needs env vars, `.env.example` should exist with placeholder values

**Step 3: Verify GitHub Actions secrets usage**

```bash
grep -r "secrets\." .github/workflows/ | grep -v "GITHUB_TOKEN"
```

Expected: All secrets accessed via `${{ secrets.NAME }}` syntax, never hardcoded

**Step 4: Document secret handling status**

Add to findings if any issues found.

---

## Phase 3: CI/CD Pipeline Security Audit

### Task 4: Run actionlint on Workflows

**Files:**
- Input: `.github/workflows/*.yml`
- Output: `docs/security/findings/cicd-actionlint.txt`

**Step 1: Run actionlint**

```bash
actionlint .github/workflows/*.yml 2>&1 | tee docs/security/findings/cicd-actionlint.txt
```

Expected: List of warnings/errors or "no issues"

**Step 2: Review and categorize findings**

For each finding, determine:
- Security impact (injection risk, permission issue, etc.)
- Whether to fix or accept

---

### Task 5: Run zizmor Security Analysis

**Files:**
- Input: `.github/workflows/*.yml`
- Output: `docs/security/findings/cicd-zizmor.txt`

**Step 1: Run zizmor**

```bash
zizmor .github/workflows/ 2>&1 | tee docs/security/findings/cicd-zizmor.txt
```

Expected: Security-focused findings including:
- Unpinned actions (should use SHA)
- Missing permissions blocks
- Injection vulnerabilities

**Step 2: Document all findings with severity**

---

### Task 6: Pin GitHub Actions to SHA

**Files:**
- Modify: `.github/workflows/ci.yml`
- Modify: `.github/workflows/claude-code-review.yml`
- Modify: `.github/workflows/deploy-infra.yml`

**Step 1: Get current SHA for actions/checkout@v4**

```bash
gh api repos/actions/checkout/git/refs/tags/v4 --jq '.object.sha'
```

Expected: Full SHA hash (e.g., `b4ffde65f46336ab88eb53be808477a3936bae11`)

**Step 2: Get current SHA for actions/setup-node@v4**

```bash
gh api repos/actions/setup-node/git/refs/tags/v4 --jq '.object.sha'
```

**Step 3: Get current SHA for actions/upload-artifact@v4**

```bash
gh api repos/actions/upload-artifact/git/refs/tags/v4 --jq '.object.sha'
```

**Step 4: Get current SHA for gitleaks/gitleaks-action@v2**

```bash
gh api repos/gitleaks/gitleaks-action/git/refs/tags/v2 --jq '.object.sha'
```

**Step 5: Get current SHA for anthropics/claude-code-action@v1**

```bash
gh api repos/anthropics/claude-code-action/git/refs/tags/v1 --jq '.object.sha'
```

**Step 6: Get current SHA for aws-actions/configure-aws-credentials@v4**

```bash
gh api repos/aws-actions/configure-aws-credentials/git/refs/tags/v4 --jq '.object.sha'
```

**Step 7: Get current SHA for ad-m/github-push-action@v0.8.0**

```bash
gh api repos/ad-m/github-push-action/git/refs/tags/v0.8.0 --jq '.object.sha'
```

**Step 8: Update all workflow files with SHA pins**

Replace all `uses: action@vX` with `uses: action@SHA # vX`

Example transformation:
```yaml
# Before
uses: actions/checkout@v4

# After
uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11 # v4
```

**Step 9: Run actionlint to verify**

```bash
actionlint .github/workflows/*.yml
```

Expected: No new errors from SHA pinning

**Step 10: Commit pinned actions**

```bash
git add .github/workflows/
git commit -m "security: pin all GitHub Actions to SHA

Prevents supply chain attacks via compromised action tags.
All actions now reference immutable commit SHAs."
```

---

### Task 7: Add Explicit Permissions to Workflows

**Files:**
- Modify: `.github/workflows/ci.yml` (security and test jobs need permissions)

**Step 1: Add permissions to ci.yml security job**

The security job needs `contents: read` only. Add after `runs-on`:

```yaml
jobs:
  security:
    name: Security Checks
    runs-on: ubuntu-latest
    permissions:
      contents: read
```

**Step 2: Add permissions to ci.yml test job**

```yaml
  test:
    name: Build & Test
    runs-on: ubuntu-latest
    permissions:
      contents: read
```

**Step 3: Verify sitemap job already has permissions**

The sitemap job already has `permissions: contents: write` - verify it's present.

**Step 4: Run actionlint to verify**

```bash
actionlint .github/workflows/*.yml
```

**Step 5: Commit permissions changes**

```bash
git add .github/workflows/ci.yml
git commit -m "security: add explicit permissions to CI jobs

Follows principle of least privilege for GitHub token."
```

---

## Phase 4: Dependency Security Audit

### Task 8: Run npm audit

**Files:**
- Output: `docs/security/findings/deps-npm-audit.txt`

**Step 1: Run npm audit**

```bash
npm audit 2>&1 | tee docs/security/findings/deps-npm-audit.txt
```

Expected: List of vulnerabilities by severity

**Step 2: Run npm audit with high threshold**

```bash
npm audit --audit-level=high
echo "Exit code: $?"
```

Expected: Exit code 0 if no high/critical, non-zero otherwise

**Step 3: Document findings and remediation plan**

For each high/critical:
- Package name and CVE
- Impact assessment for this project
- Remediation (update, replace, or accept with justification)

---

### Task 9: Run osv-scanner

**Files:**
- Output: `docs/security/findings/deps-osv-scanner.txt`

**Step 1: Run osv-scanner**

```bash
osv-scanner --lockfile=package-lock.json 2>&1 | tee docs/security/findings/deps-osv-scanner.txt
```

Expected: Comprehensive CVE scan results

**Step 2: Compare with npm audit results**

Note any additional findings from OSV database.

---

### Task 10: Check License Compliance

**Files:**
- Output: `docs/security/findings/deps-licenses.txt`

**Step 1: Run license-checker**

```bash
npx license-checker --summary 2>&1 | tee docs/security/findings/deps-licenses.txt
```

Expected: Summary of licenses in use

**Step 2: Check for copyleft licenses**

```bash
npx license-checker --onlyAllow "MIT;ISC;Apache-2.0;BSD-2-Clause;BSD-3-Clause;0BSD;CC0-1.0;Unlicense" 2>&1 || echo "Found non-permissive licenses"
```

Expected: Success or list of packages with incompatible licenses

**Step 3: Commit findings**

```bash
git add docs/security/findings/
git commit -m "audit: document dependency security findings"
```

---

### Task 11: Fix Dependency Vulnerabilities

**Files:**
- Modify: `package.json`
- Modify: `package-lock.json`

**Step 1: Attempt automatic fix**

```bash
npm audit fix
```

**Step 2: Check if manual updates needed**

```bash
npm audit
```

**Step 3: If high/critical remain, update specific packages**

```bash
npm update <package-name>
```

**Step 4: Run tests to verify no breakage**

```bash
npm test
```

Expected: All 103 tests pass

**Step 5: Commit dependency updates**

```bash
git add package.json package-lock.json
git commit -m "security: update dependencies to fix vulnerabilities

Addresses findings from npm audit and osv-scanner."
```

---

## Phase 5: Application Security Audit

### Task 12: Run Semgrep Analysis

**Files:**
- Input: `src/**/*.{ts,tsx}`
- Output: `docs/security/findings/app-semgrep.txt`

**Step 1: Run semgrep with React rules**

```bash
semgrep --config p/react --config p/typescript src/ 2>&1 | tee docs/security/findings/app-semgrep.txt
```

Expected: Security findings or "no issues"

**Step 2: Run semgrep with security focus**

```bash
semgrep --config p/security-audit src/ 2>&1 | tee -a docs/security/findings/app-semgrep.txt
```

**Step 3: Document and categorize findings**

---

### Task 13: Verify External Link Security

**Files:**
- Review: `src/**/*.tsx`

**Step 1: Find all external links**

```bash
grep -r "target=\"_blank\"" src/ --include="*.tsx"
```

**Step 2: Verify all have rel="noopener noreferrer"**

```bash
grep -r "target=\"_blank\"" src/ --include="*.tsx" | grep -v "noopener"
```

Expected: No results (all external links should have noopener)

**Step 3: Fix any missing rel attributes**

If findings exist, update each file to add `rel="noopener noreferrer"`.

**Step 4: Commit fixes**

```bash
git add src/
git commit -m "security: add noopener noreferrer to external links"
```

---

### Task 14: Strengthen ESLint Security Rules

**Files:**
- Modify: `eslint.config.js`

**Step 1: Review current security rules**

Current config has some rules as `warn`. Upgrade critical ones to `error`.

**Step 2: Update eslint.config.js**

Change `eslint.config.js` to make all security rules errors:

```javascript
rules: {
  // Security rules - all as errors for enforcement
  'security/detect-object-injection': 'error',
  'security/detect-non-literal-regexp': 'error',
  'security/detect-unsafe-regex': 'error',
  'security/detect-buffer-noassert': 'error',
  'security/detect-child-process': 'error',
  'security/detect-disable-mustache-escape': 'error',
  'security/detect-no-csrf-before-method-override': 'error',
  'security/detect-possible-timing-attacks': 'error',
  'security/detect-pseudoRandomBytes': 'error',
  'security/detect-eval-with-expression': 'error',
  'security/detect-new-buffer': 'error',
  // ... keep TypeScript rules as-is
}
```

**Step 3: Run eslint to check for new errors**

```bash
npm run lint
```

**Step 4: Fix any new errors or adjust rules**

**Step 5: Commit ESLint changes**

```bash
git add eslint.config.js
git commit -m "security: strengthen ESLint security rules to errors"
```

---

## Phase 6: Infrastructure Security Audit

### Task 15: Add cdk-nag to Infrastructure

**Files:**
- Modify: `infrastructure/package.json`
- Modify: `infrastructure/bin/infrastructure.ts` (or equivalent entry point)

**Step 1: Install cdk-nag**

```bash
cd infrastructure && npm install cdk-nag --save-dev
```

**Step 2: Find the CDK app entry point**

```bash
cat infrastructure/bin/*.ts 2>/dev/null || ls infrastructure/bin/
```

**Step 3: Add cdk-nag Aspects**

Add to the CDK app entry point:

```typescript
import { Aspects } from 'aws-cdk-lib';
import { AwsSolutionsChecks } from 'cdk-nag';

// After app creation
Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));
```

**Step 4: Run cdk synth to see findings**

```bash
cd infrastructure && npx cdk synth 2>&1 | tee ../docs/security/findings/infra-cdk-nag.txt
```

**Step 5: Document findings**

**Step 6: Commit cdk-nag setup**

```bash
git add infrastructure/
git commit -m "security: add cdk-nag for infrastructure security linting"
```

---

### Task 16: Configure Security Headers

**Files:**
- Modify: `infrastructure/lib/portfolio-stack.ts`

**Step 1: Add custom headers to Amplify app**

In `createAmplifyApp` method, after creating the app, add:

```typescript
// Security headers for all responses
amplifyApp.addCustomRule({
  source: '/<*>',
  target: '/index.html',
  status: amplify.RedirectStatus.NOT_FOUND_REWRITE,
});
```

Note: Amplify handles headers differently. Check if `customHeaders` can be added via CDK or needs amplify.yml.

**Step 2: Create amplify.yml if needed**

If headers must be in amplify.yml:

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
```

**Step 3: Commit header configuration**

```bash
git add infrastructure/ amplify.yml
git commit -m "security: configure HTTP security headers for Amplify"
```

---

## Phase 7: Enforcement Automation

### Task 17: Set Up Pre-commit Hooks

**Files:**
- Create: `.husky/pre-commit`
- Modify: `package.json`

**Step 1: Install husky**

```bash
npm install husky --save-dev
```

**Step 2: Initialize husky**

```bash
npx husky init
```

**Step 3: Create pre-commit hook**

```bash
cat > .husky/pre-commit << 'EOF'
#!/bin/sh

# Run gitleaks on staged files
echo "Running gitleaks..."
gitleaks protect --staged --verbose
if [ $? -ne 0 ]; then
  echo "Gitleaks found secrets in staged files. Commit blocked."
  exit 1
fi

# Run eslint on staged TypeScript files
STAGED_TS=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(ts|tsx)$' | tr '\n' ' ')
if [ -n "$STAGED_TS" ]; then
  echo "Running ESLint on staged files..."
  npx eslint $STAGED_TS
  if [ $? -ne 0 ]; then
    echo "ESLint found errors. Commit blocked."
    exit 1
  fi
fi

echo "Pre-commit checks passed!"
EOF
chmod +x .husky/pre-commit
```

**Step 4: Add prepare script to package.json**

Add to scripts:

```json
"prepare": "husky"
```

**Step 5: Test pre-commit hook**

```bash
git add .husky/ package.json package-lock.json
git commit -m "security: add pre-commit hooks for secrets and lint"
```

Expected: Hook runs gitleaks and eslint before commit

---

### Task 18: Add Security Steps to CI

**Files:**
- Modify: `.github/workflows/ci.yml`

**Step 1: Add semgrep to security job**

Add after npm audit step:

```yaml
      - name: Run Semgrep
        run: |
          pip install semgrep
          semgrep --config p/react --config p/typescript --error src/
```

**Step 2: Add actionlint to security job**

Add step to validate workflows:

```yaml
      - name: Run actionlint
        run: |
          bash <(curl https://raw.githubusercontent.com/rhysd/actionlint/main/scripts/download-actionlint.bash)
          ./actionlint .github/workflows/
```

**Step 3: Commit CI changes**

```bash
git add .github/workflows/ci.yml
git commit -m "security: add semgrep and actionlint to CI pipeline"
```

---

### Task 19: Create Weekly Security Scan Workflow

**Files:**
- Create: `.github/workflows/security-scan.yml`

**Step 1: Create scheduled security scan workflow**

```yaml
name: Weekly Security Scan

on:
  schedule:
    - cron: '0 9 * * 1'  # Every Monday at 9 AM UTC
  workflow_dispatch:  # Allow manual trigger

permissions:
  contents: read
  security-events: write

jobs:
  security-scan:
    name: Comprehensive Security Scan
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11 # v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@60edb5dd545a775178f52524783378180af0d1f8 # v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run Gitleaks
        uses: gitleaks/gitleaks-action@cb7149a9b57195b609c63e8518d2c6056677d2d0 # v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Run npm audit
        run: npm audit --audit-level=high
        continue-on-error: true

      - name: Install OSV Scanner
        run: |
          curl -L https://github.com/google/osv-scanner/releases/latest/download/osv-scanner_linux_amd64 -o osv-scanner
          chmod +x osv-scanner

      - name: Run OSV Scanner
        run: ./osv-scanner --lockfile=package-lock.json
        continue-on-error: true

      - name: Run Semgrep
        run: |
          pip install semgrep
          semgrep --config p/react --config p/typescript --config p/security-audit src/ --sarif -o semgrep.sarif
        continue-on-error: true

      - name: Upload Semgrep SARIF
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: semgrep.sarif
        if: always()
```

**Step 2: Commit workflow**

```bash
git add .github/workflows/security-scan.yml
git commit -m "security: add weekly security scan workflow

Scheduled scan includes:
- Gitleaks secret detection
- npm audit for dependencies
- OSV Scanner for CVEs
- Semgrep for code analysis"
```

---

### Task 20: Configure Dependabot

**Files:**
- Create: `.github/dependabot.yml`

**Step 1: Create Dependabot configuration**

```yaml
version: 2
updates:
  # Main application dependencies
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
    open-pull-requests-limit: 10
    groups:
      development:
        dependency-type: "development"
        patterns:
          - "*"
      production:
        dependency-type: "production"
        patterns:
          - "*"

  # Infrastructure dependencies
  - package-ecosystem: "npm"
    directory: "/infrastructure"
    schedule:
      interval: "weekly"
      day: "monday"
    open-pull-requests-limit: 5

  # GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
    open-pull-requests-limit: 5
```

**Step 2: Commit Dependabot config**

```bash
git add .github/dependabot.yml
git commit -m "security: configure Dependabot for automated updates

Weekly updates for:
- npm packages (app and infrastructure)
- GitHub Actions versions"
```

---

## Phase 8: Documentation

### Task 21: Write SECURITY.md

**Files:**
- Create: `SECURITY.md`

**Step 1: Create public security policy**

```markdown
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
```

**Step 2: Commit SECURITY.md**

```bash
git add SECURITY.md
git commit -m "docs: add public security policy"
```

---

### Task 22: Write Security Policy

**Files:**
- Create: `docs/security/SECURITY-POLICY.md`

**Step 1: Create detailed security policy**

Write comprehensive policy covering:
- Security practices for code changes
- Dependency management policy
- Infrastructure security requirements
- Automated security controls
- Incident response procedures
- Maintenance schedule

**Step 2: Commit security policy**

```bash
git add docs/security/SECURITY-POLICY.md
git commit -m "docs: add detailed security policy"
```

---

### Task 23: Write Security Audit Report

**Files:**
- Create: `docs/security/SECURITY-AUDIT.md`

**Step 1: Compile all findings**

Aggregate findings from:
- `docs/security/findings/secrets-*.txt`
- `docs/security/findings/cicd-*.txt`
- `docs/security/findings/deps-*.txt`
- `docs/security/findings/app-*.txt`
- `docs/security/findings/infra-*.txt`

**Step 2: Write audit report**

Structure:
- Executive Summary
- Methodology
- Attack Surface Analysis
- Findings by Domain (with severity, remediation, verification)
- Accepted Risks
- Recommendations

**Step 3: Commit audit report**

```bash
git add docs/security/SECURITY-AUDIT.md
git commit -m "docs: add security audit report

Full-stack security audit covering:
- Secrets management
- CI/CD pipeline security
- Dependency security
- Application security
- Infrastructure security"
```

---

## Phase 9: Final Verification

### Task 24: Run All Security Tools

**Step 1: Run gitleaks**

```bash
gitleaks detect --source .
```

Expected: "no leaks found"

**Step 2: Run actionlint**

```bash
actionlint .github/workflows/*.yml
```

Expected: No errors

**Step 3: Run npm audit**

```bash
npm audit --audit-level=high
```

Expected: Exit code 0

**Step 4: Run semgrep**

```bash
semgrep --config p/react --config p/typescript --error src/
```

Expected: No errors

**Step 5: Run eslint**

```bash
npm run lint
```

Expected: No errors

**Step 6: Run tests**

```bash
npm test
```

Expected: All tests pass

---

### Task 25: Verify Pre-commit Hooks

**Step 1: Test hook with clean file**

```bash
touch test-hook.txt
git add test-hook.txt
git commit -m "test: verify pre-commit hook"
```

Expected: Hook runs, commit succeeds

**Step 2: Clean up test file**

```bash
git rm test-hook.txt
git commit -m "chore: remove test file"
```

---

### Task 26: Create Summary Commit

**Step 1: Review all changes**

```bash
git log --oneline security-audit...main
```

**Step 2: Create PR or prepare for merge**

Document all security improvements made in this audit.

---

## Success Criteria Checklist

- [ ] Zero secrets detected in git history
- [ ] All GitHub Actions pinned to SHA
- [ ] Zero high/critical dependency vulnerabilities (or documented acceptance)
- [ ] Pre-commit hooks installed and functional
- [ ] CI pipeline includes security steps
- [ ] Weekly security scan scheduled
- [ ] Dependabot configured
- [ ] ESLint security rules as errors
- [ ] SECURITY.md created
- [ ] docs/security/SECURITY-POLICY.md created
- [ ] docs/security/SECURITY-AUDIT.md created
- [ ] All tests passing
