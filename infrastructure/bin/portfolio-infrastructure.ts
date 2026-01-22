#!/usr/bin/env node
import 'source-map-support/register';
import { App, Aspects } from 'aws-cdk-lib';
import { AwsSolutionsChecks } from 'cdk-nag';
import { PortfolioStack } from '../lib/portfolio-stack';
import { TagComplianceAspect } from '../lib/aspects/tag-compliance-aspect';

const app = new App();

// Get configuration from context
const appName = app.node.tryGetContext('appName');
const githubOwner = app.node.tryGetContext('githubOwner');
const githubRepository = app.node.tryGetContext('githubRepository');
const branchName = app.node.tryGetContext('branchName');
const customDomain = app.node.tryGetContext('customDomain');

// Validate required context values
if (!appName || !githubOwner || !githubRepository) {
  throw new Error(
    'Required context values missing: appName, githubOwner, githubRepository. ' +
    'Please ensure these are defined in cdk.json or passed via -c flags.'
  );
}

// Hardcoded AWS account and region for deployment stability
const AWS_ACCOUNT_ID = '383579119744';
const AWS_REGION = 'us-west-2';

// Create the stack
new PortfolioStack(app, 'PortfolioInfrastructureStack', {
  appName,
  githubOwner,
  githubRepository,
  branchName,
  customDomain,
  env: {
    account: AWS_ACCOUNT_ID,
    region: AWS_REGION,
  },
  description: 'Infrastructure for portfolio website deployment via AWS Amplify',
  tags: {
    Project: 'Portfolio',
    Environment: 'Production',
    ManagedBy: 'CDK',
    Repository: `${githubOwner}/${githubRepository}`,
  },
});

// Apply CDK Aspects for governance and compliance
Aspects.of(app).add(new TagComplianceAspect(['Project', 'Environment', 'ManagedBy', 'Repository']));

// Apply cdk-nag for security and compliance checks
// This runs AWS Solutions best practice checks on the infrastructure
Aspects.of(app).add(new AwsSolutionsChecks({ verbose: true }));
