# Secrets Scan Report

**Date:** 2026-02-01
**Tools Used:** gitleaks v8.x, trufflehog v3.92.5
**Repository:** cm-labs
**Commits Scanned:** 78

## Executive Summary

| Tool | Real Secrets Found | False Positives | Status |
|------|-------------------|-----------------|--------|
| gitleaks | 0 | 0 | PASS |
| trufflehog | 0 | 11 | PASS |

**Overall Result: NO REAL SECRETS DETECTED**

## Gitleaks Results

**Command:** `gitleaks detect --source . --verbose --log-opts="--all"`

**Result:** No leaks found

- Commits scanned: 78
- Data scanned: ~1.69 MB
- Scan time: ~135ms

Gitleaks scanned the full git history and found no secrets, API keys, tokens, or credentials.

## Trufflehog Results

**Command:** `trufflehog filesystem . --json`

**Result:** 11 unverified findings, all false positives

### False Positive Analysis

All 11 findings from trufflehog are **false positives** located in `node_modules/` dependencies. These are example URLs used in documentation and type definitions, not real credentials.

#### Finding 1-8: Node.js Type Definitions (URI Detector)
- **Files:**
  - `node_modules/@types/node/https.d.ts` (line 428)
  - `node_modules/@types/node/http.d.ts` (line 1790)
  - `node_modules/@types/node/url.d.ts` (lines 551, 557, 716, 722)
- **Type:** URI with embedded credentials
- **Raw Values:** `https://abc:xyz@example.com`, `https://abc:123@example.com`, etc.
- **Assessment:** FALSE POSITIVE - These are example URLs in TypeScript type definition comments showing URL authentication syntax. `abc`, `xyz`, and `123` are placeholder values, not real credentials.
- **Remediation:** None required

#### Finding 9-10: tldts Library README (URI Detector)
- **File:** `node_modules/tldts/README.md` (lines 204, 257)
- **Type:** URI with embedded credentials
- **Raw Values:** `https://user:password@example.co.uk:8080/some/path`, `https://user:password@secure.example.co.uk:443/some/path`
- **Assessment:** FALSE POSITIVE - These are example URLs in library documentation demonstrating URL parsing functionality.
- **Remediation:** None required

#### Finding 11: keyv Library README (MongoDB Detector)
- **File:** `node_modules/keyv/README.md` (line 58)
- **Type:** MongoDB connection string
- **Raw Value:** `mongodb://user:pass@localhost:27017/dbname`
- **Assessment:** FALSE POSITIVE - This is an example connection string in library documentation showing how to configure keyv with MongoDB.
- **Remediation:** None required

## Conclusion

**No remediation is required.**

The repository has a clean secrets history:
- No AWS keys, tokens, or credentials in git history
- No GitHub tokens or API keys committed
- No database credentials exposed
- All trufflehog findings are documentation examples in third-party dependencies

## Recommendations

1. **Continue using `.gitignore`** - The current configuration correctly excludes `.env` files and other sensitive paths
2. **Add pre-commit hooks** - Consider adding gitleaks as a pre-commit hook to prevent future accidental commits
3. **Exclude `node_modules/`** - For future trufflehog scans, exclude node_modules to reduce false positives:
   ```bash
   trufflehog filesystem . --exclude-paths node_modules --json
   ```

## Raw Output Files

- `secrets-gitleaks.txt` - Full gitleaks output
- `secrets-gitleaks.json` - JSON report (empty, no findings)
- `secrets-trufflehog.txt` - Full trufflehog JSON output
