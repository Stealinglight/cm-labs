import * as cdk from 'aws-cdk-lib';
import * as amplify from '@aws-cdk/aws-amplify-alpha';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as codebuild from 'aws-cdk-lib/aws-codebuild';
import { Construct } from 'constructs';

export interface PortfolioStackProps extends cdk.StackProps {
  readonly appName: string;
  readonly githubOwner: string;
  readonly githubRepository: string;
  readonly branchName?: string;
  readonly customDomain?: string;
}

export class PortfolioStack extends cdk.Stack {
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

    // Retrieve GitHub token from Secrets Manager
    const githubToken = secretsmanager.Secret.fromSecretNameV2(
      this,
      'GitHubToken',
      'portfolio-github-token'
    );

    // Create Amplify App
    const amplifyApp = this.createAmplifyApp(githubToken);

    // Configure main branch
    const mainBranch = this.configureMainBranch(amplifyApp);

    // Configure custom domain if provided
    if (this.customDomain) {
      this.configureCustomDomain(amplifyApp, mainBranch);
    }

    // CloudFormation outputs
    new cdk.CfnOutput(this, 'AmplifyAppId', {
      value: amplifyApp.appId,
      description: 'Amplify App ID',
      exportName: `${this.stackName}-AmplifyAppId`,
    });

    new cdk.CfnOutput(this, 'AmplifyDefaultDomain', {
      value: `https://${this.branchName}.${amplifyApp.defaultDomain}`,
      description: 'Amplify default domain URL',
      exportName: `${this.stackName}-DefaultDomain`,
    });

    new cdk.CfnOutput(this, 'AmplifyConsoleUrl', {
      value: `https://console.aws.amazon.com/amplify/home?region=${this.region}#/${amplifyApp.appId}`,
      description: 'Amplify Console URL',
    });
  }

  private createAmplifyApp(githubToken: secretsmanager.ISecret): amplify.App {
    return new amplify.App(this, 'PortfolioApp', {
      appName: this.appName,
      sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
        owner: this.githubOwner,
        repository: this.githubRepository,
        oauthToken: githubToken.secretValue,
      }),
      autoBranchDeletion: true,
      buildSpec: this.getBuildSpec(),
      environmentVariables: {
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

  private getBuildSpec(): codebuild.BuildSpec {
    return codebuild.BuildSpec.fromObjectToYaml({
      version: 1,
      frontend: {
        phases: {
          preBuild: {
            commands: [
              'node --version',
              'npm --version',
              'npm ci',
            ],
          },
          build: {
            commands: ['npm run build'],
          },
        },
        artifacts: {
          baseDirectory: 'build',
          files: ['**/*'],
        },
        cache: {
          paths: ['node_modules/**/*'],
        },
      },
    });
  }

  private configureMainBranch(app: amplify.App): amplify.Branch {
    const branch = app.addBranch(this.branchName, {
      autoBuild: true,
      stage: 'PRODUCTION',
    });

    // Enable PR previews
    app.addCustomRule({
      source: '/<*>',
      target: '/index.html',
      status: amplify.RedirectStatus.NOT_FOUND_REWRITE,
    });

    return branch;
  }

  private configureCustomDomain(app: amplify.App, mainBranch: amplify.Branch): void {
    if (!this.customDomain) return;

    const domain = app.addDomain(this.customDomain, {
      enableAutoSubdomain: false,
    });

    domain.mapRoot(mainBranch);

    new cdk.CfnOutput(this, 'CustomDomainUrl', {
      value: `https://${this.customDomain}`,
      description: 'Custom domain URL',
      exportName: `${this.stackName}-CustomDomain`,
    });
  }
}
