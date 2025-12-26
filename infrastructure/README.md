# Portfolio Infrastructure

AWS CDK infrastructure for deploying the portfolio website via AWS Amplify Hosting.

## Prerequisites

1. **AWS CLI** configured with appropriate credentials
   ```bash
   aws configure
   ```

2. **AWS CDK CLI** installed globally
   ```bash
   npm install -g aws-cdk
   ```

3. **GitHub Personal Access Token** stored in AWS Secrets Manager
   - Secret name: `portfolio-github-token`
   - Required permissions: `repo` (full control of private repositories)
   - Create the secret:
     ```bash
     aws secretsmanager create-secret \
       --name portfolio-github-token \
       --description "GitHub token for Amplify deployments" \
       --secret-string "YOUR_GITHUB_TOKEN_HERE"
     ```

4. **Node.js 20.x or higher**

## Installation

Install infrastructure dependencies:

```bash
cd infrastructure
npm install
```

## Configuration

Configuration is managed via `cdk.json` context values:

- `appName`: Name of the Amplify app (default: `portfolio-site`)
- `githubOwner`: GitHub username (default: `Stealinglight`)
- `githubRepository`: Repository name (default: `cm-labs`)
- `branchName`: Main branch name (default: `main`)
- `customDomain`: Optional custom domain (not set by default)

To override defaults, use CDK context flags:

```bash
npm run deploy -- -c customDomain=yourdomain.com
```

## Deployment

### First-Time Setup

1. **Bootstrap CDK** (only needed once per account/region):
   ```bash
   npm run cdk bootstrap
   ```

2. **Verify the configuration** by synthesizing the CloudFormation template:
   ```bash
   npm run synth
   ```
   Review the output in `cdk.out/` directory.

3. **Deploy the stack**:
   ```bash
   npm run deploy
   ```

### Subsequent Deployments

Check what changes will be made:
```bash
npm run diff
```

Deploy changes:
```bash
npm run deploy
```

## Stack Outputs

After deployment, the stack provides the following outputs:

- **AmplifyAppId**: The Amplify application ID
- **AmplifyDefaultDomain**: The default Amplify hosting URL
- **AmplifyConsoleUrl**: Direct link to the Amplify Console
- **CustomDomainUrl**: Custom domain URL (if configured)

View outputs:
```bash
aws cloudformation describe-stacks \
  --stack-name PortfolioInfrastructureStack \
  --query 'Stacks[0].Outputs'
```

## Features

- **Automatic Deployments**: Pushes to the main branch trigger automatic builds
- **PR Previews**: Pull requests automatically create preview environments
- **Custom Domain**: Optional custom domain configuration with automatic SSL
- **SPA Support**: Single-page application routing with proper rewrites
- **Build Caching**: Node modules cached for faster builds
- **Node 20**: Configured to use Node.js 20.x for builds

## Build Configuration

The Amplify build is configured for Vite:

- **Build command**: `npm run build`
- **Build output**: `build/` directory
- **Node version**: 20.x
- **Cache**: `node_modules/`

## Troubleshooting

### GitHub Token Issues

If deployment fails with authentication errors:

1. Verify the secret exists:
   ```bash
   aws secretsmanager describe-secret --secret-id portfolio-github-token
   ```

2. Verify the token has correct permissions:
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Token must have `repo` scope

3. Update the token if needed:
   ```bash
   aws secretsmanager update-secret \
     --secret-id portfolio-github-token \
     --secret-string "NEW_TOKEN_HERE"
   ```

### Build Failures

Check the Amplify Console for detailed build logs:
1. Open the AmplifyConsoleUrl from stack outputs
2. Navigate to the main branch
3. View build details and logs

Common issues:
- **Missing dependencies**: Ensure `package.json` is up to date
- **Build errors**: Test locally with `npm run build`
- **Wrong output directory**: Verify Vite outputs to `build/`

### Stack Updates

If you need to modify the infrastructure:

1. Make changes to the CDK code
2. Run `npm run diff` to preview changes
3. Run `npm run deploy` to apply changes

### Deleting the Stack

To remove all infrastructure:

```bash
npm run destroy
```

**Warning**: This will delete the Amplify app and all associated resources. Deployments will stop working.

## Development

### Building TypeScript

Compile the CDK code:
```bash
npm run build
```

Watch for changes:
```bash
npm run watch
```

### Running CDK Commands Directly

```bash
npm run cdk <command>
```

Examples:
```bash
npm run cdk list                    # List all stacks
npm run cdk synth                   # Synthesize CloudFormation
npm run cdk diff                    # Show differences
npm run cdk deploy --require-approval never  # Deploy without prompts
```

## Directory Structure

```
infrastructure/
├── bin/
│   └── portfolio-infrastructure.ts   # CDK app entry point
├── lib/
│   └── portfolio-stack.ts            # Main stack definition
├── cdk.json                          # CDK configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Dependencies and scripts
└── README.md                         # This file
```

## Additional Resources

- [AWS CDK Documentation](https://docs.aws.amazon.com/cdk/)
- [AWS Amplify Hosting Documentation](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html)
- [CDK Amplify Alpha Constructs](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-amplify-alpha-readme.html)
