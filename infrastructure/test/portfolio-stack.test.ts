import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { PortfolioStack } from '../lib/portfolio-stack';

describe('PortfolioStack', () => {
  let app: App;
  
  beforeEach(() => {
    app = new App();
  });

  describe('Stack Creation', () => {
    it('creates stack with required resources', () => {
      const stack = new PortfolioStack(app, 'TestStack', {
        appName: 'test-app',
        githubOwner: 'test-owner',
        githubRepository: 'test-repo',
      });

      const template = Template.fromStack(stack);

      // Verify Amplify App is created
      template.hasResourceProperties('AWS::Amplify::App', {
        Name: 'test-app',
        Repository: 'https://github.com/test-owner/test-repo',
      });

      // Verify IAM Role is created
      template.hasResourceProperties('AWS::IAM::Role', {
        AssumeRolePolicyDocument: {
          Statement: [{
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Principal: {
              Service: 'amplify.amazonaws.com',
            },
          }],
        },
      });

      // Verify Branch is created
      template.hasResourceProperties('AWS::Amplify::Branch', {
        BranchName: 'main',
        EnableAutoBuild: true,
        Stage: 'PRODUCTION',
      });
    });

    it('uses custom branch name when provided', () => {
      const stack = new PortfolioStack(app, 'TestStack', {
        appName: 'test-app',
        githubOwner: 'test-owner',
        githubRepository: 'test-repo',
        branchName: 'develop',
      });

      const template = Template.fromStack(stack);

      template.hasResourceProperties('AWS::Amplify::Branch', {
        BranchName: 'develop',
      });
    });
  });

  describe('Build Configuration', () => {
    it('configures correct build specification', () => {
      const stack = new PortfolioStack(app, 'TestStack', {
        appName: 'test-app',
        githubOwner: 'test-owner',
        githubRepository: 'test-repo',
      });

      const template = Template.fromStack(stack);

      // Verify build spec is a string containing correct commands
      const resources = template.toJSON().Resources;
      const amplifyApp = Object.values(resources).find(
        (r: any) => r.Type === 'AWS::Amplify::App'
      ) as any;

      expect(amplifyApp.Properties.BuildSpec).toContain('npm ci');
      expect(amplifyApp.Properties.BuildSpec).toContain('npm run build');
      expect(amplifyApp.Properties.BuildSpec).toContain('baseDirectory: build');
    });

    it('sets Node 20 environment variable', () => {
      const stack = new PortfolioStack(app, 'TestStack', {
        appName: 'test-app',
        githubOwner: 'test-owner',
        githubRepository: 'test-repo',
      });

      const template = Template.fromStack(stack);

      const resources = template.toJSON().Resources;
      const amplifyApp = Object.values(resources).find(
        (r: any) => r.Type === 'AWS::Amplify::App'
      ) as any;

      const envVar = amplifyApp.Properties.EnvironmentVariables[0];
      expect(envVar.Name).toBe('_LIVE_UPDATES');
      expect(envVar.Value).toContain('"version":"20"');
    });
  });

  describe('Custom Rules', () => {
    it('adds SPA rewrite rule', () => {
      const stack = new PortfolioStack(app, 'TestStack', {
        appName: 'test-app',
        githubOwner: 'test-owner',
        githubRepository: 'test-repo',
      });

      const template = Template.fromStack(stack);

      template.hasResourceProperties('AWS::Amplify::App', {
        CustomRules: [
          {
            Source: '/<*>',
            Target: '/index.html',
            Status: '404-200',
          },
        ],
      });
    });
  });

  describe('CloudFormation Outputs', () => {
    it('creates required outputs', () => {
      const stack = new PortfolioStack(app, 'TestStack', {
        appName: 'test-app',
        githubOwner: 'test-owner',
        githubRepository: 'test-repo',
      });

      const template = Template.fromStack(stack);

      // Verify outputs exist
      template.hasOutput('AmplifyAppId', {});
      template.hasOutput('AmplifyDefaultDomain', {});
      template.hasOutput('AmplifyConsoleUrl', {});
    });

    it('includes custom domain output when provided', () => {
      const stack = new PortfolioStack(app, 'TestStack', {
        appName: 'test-app',
        githubOwner: 'test-owner',
        githubRepository: 'test-repo',
        customDomain: 'example.com',
      });

      const template = Template.fromStack(stack);

      template.hasOutput('CustomDomainUrl', {
        Value: 'https://example.com',
      });
    });

    it('does not include custom domain output when not provided', () => {
      const stack = new PortfolioStack(app, 'TestStack', {
        appName: 'test-app',
        githubOwner: 'test-owner',
        githubRepository: 'test-repo',
      });

      const template = Template.fromStack(stack);

      const outputs = template.toJSON().Outputs;
      expect(outputs).not.toHaveProperty('CustomDomainUrl');
    });
  });

  describe('Security', () => {
    it('references GitHub token from Secrets Manager', () => {
      const stack = new PortfolioStack(app, 'TestStack', {
        appName: 'test-app',
        githubOwner: 'test-owner',
        githubRepository: 'test-repo',
      });

      const template = Template.fromStack(stack);

      const resources = template.toJSON().Resources;
      const amplifyApp = Object.values(resources).find(
        (r: any) => r.Type === 'AWS::Amplify::App'
      ) as any;

      const tokenRef = JSON.stringify(amplifyApp.Properties.OauthToken);
      expect(tokenRef).toContain('portfolio-github-token');
      expect(tokenRef).toContain('secretsmanager');
    });

    it('enables auto branch deletion', () => {
      const stack = new PortfolioStack(app, 'TestStack', {
        appName: 'test-app',
        githubOwner: 'test-owner',
        githubRepository: 'test-repo',
      });

      const template = Template.fromStack(stack);

      template.hasResourceProperties('AWS::Amplify::App', {
        EnableBranchAutoDeletion: true,
      });
    });
  });

  describe('Resource Count', () => {
    it('creates expected number of resources', () => {
      const stack = new PortfolioStack(app, 'TestStack', {
        appName: 'test-app',
        githubOwner: 'test-owner',
        githubRepository: 'test-repo',
      });

      const template = Template.fromStack(stack);

      // Should have: App, Role, Branch, CDKMetadata
      template.resourceCountIs('AWS::Amplify::App', 1);
      template.resourceCountIs('AWS::IAM::Role', 1);
      template.resourceCountIs('AWS::Amplify::Branch', 1);
    });
  });
});
