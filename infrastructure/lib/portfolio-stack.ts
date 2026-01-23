import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import * as amplify from '@aws-cdk/aws-amplify-alpha';
import { ISecret, Secret } from 'aws-cdk-lib/aws-secretsmanager';
import { BuildSpec } from 'aws-cdk-lib/aws-codebuild';
import { Construct } from 'constructs';

export interface PortfolioStackProps extends StackProps {
  readonly appName: string;
  readonly githubOwner: string;
  readonly githubRepository: string;
  readonly branchName?: string;
  readonly customDomain?: string;
}

export class PortfolioStack extends Stack {
  private readonly appName: string;
  private readonly githubOwner: string;
  private readonly githubRepository: string;
  private readonly branchName: string;
  private readonly customDomain?: string;

  constructor(scope: Construct, id: string, props: PortfolioStackProps) {
    super(scope, id, props);

    this.appName = props.appName;
    this.githubOwner = props.githubOwner;
    this.githubRepository = props.githubRepository;
    this.branchName = props.branchName || 'main';
    this.customDomain = props.customDomain;

    // Validate custom domain format if provided
    if (this.customDomain && !this.isValidDomain(this.customDomain)) {
      throw new Error(
        `Invalid domain format: ${this.customDomain}. ` +
        'Domain must be a valid hostname (e.g., example.com or www.example.com)'
      );
    }

    // Retrieve GitHub token from Secrets Manager
    // NOTE: The secret must exist before deployment. Create it with:
    // aws secretsmanager create-secret --name portfolio-github-token --secret-string "YOUR_TOKEN"
    const githubToken = Secret.fromSecretNameV2(
      this,
      'GitHubToken',
      'portfolio-github-token'
    );

    // Create Amplify App
    const amplifyApp = this.createAmplifyApp(githubToken);

    // Configure SPA routing - rewrite all requests to index.html for client-side routing
    amplifyApp.addCustomRule({
      source: '/<*>',
      target: '/index.html',
      status: amplify.RedirectStatus.NOT_FOUND_REWRITE,
    });

    // Configure main branch
    const mainBranch = this.configureMainBranch(amplifyApp);

    // Configure custom domain if provided
    if (this.customDomain) {
      this.configureCustomDomain(amplifyApp, mainBranch);
    }

    // CloudFormation outputs
    new CfnOutput(this, 'AmplifyAppId', {
      value: amplifyApp.appId,
      description: 'Amplify App ID',
      exportName: `${this.stackName}-AmplifyAppId`,
    });

    new CfnOutput(this, 'AmplifyDefaultDomain', {
      value: `https://${this.branchName}.${amplifyApp.defaultDomain}`,
      description: 'Amplify default domain URL',
      exportName: `${this.stackName}-DefaultDomain`,
    });

    new CfnOutput(this, 'AmplifyConsoleUrl', {
      value: `https://console.aws.amazon.com/amplify/home?region=${this.region}#/${amplifyApp.appId}`,
      description: 'Amplify Console URL',
    });
  }

  private createAmplifyApp(githubToken: ISecret): amplify.App {
    return new amplify.App(this, 'PortfolioApp', {
      appName: this.appName,
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: this.githubOwner,
        repository: this.githubRepository,
        oauthToken: githubToken.secretValue,
      }),
      autoBranchCreation: {
        // Automatically create branches for pull requests
        patterns: ['feature/*', 'feat/*', 'fix/*', 'bugfix/*', 'hotfix/*'],
        autoBuild: true,
        pullRequestPreview: true,
      },
      autoBranchDeletion: true,
      buildSpec: this.getBuildSpec(),
      environmentVariables: {
        // _LIVE_UPDATES: Tells Amplify to use specific Node.js version
        // This ensures builds use Node 20.x instead of the default version
        '_LIVE_UPDATES': JSON.stringify([
          {
            pkg: 'node',
            type: 'nvm',
            version: '20',
          },
        ]),
      },
    });
  }

  private getBuildSpec(): BuildSpec {
    return BuildSpec.fromObjectToYaml({
      version: 1,
      frontend: {
        phases: {
          preBuild: {
            commands: [
              // Display versions for debugging
              'echo "Node version:" && node --version',
              'echo "NPM version:" && npm --version',
              // Install dependencies with error handling (package-lock.json is committed for Amplify)
              'echo "Installing dependencies..." && npm ci || (echo "npm ci failed" && exit 1)',
              // Run tests - fail the build if tests fail
              'echo "Running tests..." && npm run test -- --run || (echo "Tests failed" && exit 1)',
            ],
          },
          build: {
            commands: [
              // Build with explicit error handling
              'echo "Building application..." && npm run build || (echo "Build failed" && exit 1)',
              // Verify build output exists (Vite outputs to dist/)
              'echo "Verifying build output..." && ls -la dist/ || (echo "dist directory not found" && exit 1)',
            ],
          },
        },
        artifacts: {
          baseDirectory: 'dist',
          files: ['**/*'],
        },
        cache: {
          paths: ['node_modules/**/*'],
        },
      },
    });
  }

  private configureMainBranch(app: amplify.App): amplify.Branch {
    return app.addBranch(this.branchName, {
      autoBuild: true,
      stage: 'PRODUCTION',
    });
  }

  private configureCustomDomain(app: amplify.App, mainBranch: amplify.Branch): void {
    if (!this.customDomain) return;

    const domain = app.addDomain(this.customDomain, {
      // Enable auto-subdomain for preview branches (e.g., feature-new-ui.cm-sec.ai)
      enableAutoSubdomain: true,
      // Patterns for auto-subdomain creation matching autoBranchCreation patterns
      autoSubdomainCreationPatterns: ['feature/*', 'feat/*', 'fix/*', 'bugfix/*', 'hotfix/*'],
    });

    domain.mapRoot(mainBranch);
    domain.mapSubDomain(mainBranch, 'www');

    new CfnOutput(this, 'CustomDomainUrl', {
      value: `https://${this.customDomain}`,
      description: 'Custom domain URL',
      exportName: `${this.stackName}-CustomDomain`,
    });
  }

  private isValidDomain(domain: string): boolean {
    // Basic domain validation - checks for valid hostname format
    // Allows: example.com, www.example.com, subdomain.example.com
    const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
  }
}
