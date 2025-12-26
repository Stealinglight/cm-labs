#!/usr/bin/env node
import 'source-map-support/register';
import { App } from 'aws-cdk-lib';
import { PortfolioStack } from '../lib/portfolio-stack';

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

// Create the stack
new PortfolioStack(app, 'PortfolioInfrastructureStack', {
  appName,
  githubOwner,
  githubRepository,
  branchName,
  customDomain,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  description: 'Infrastructure for portfolio website deployment via AWS Amplify',
});
