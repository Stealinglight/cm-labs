import { App, Stack } from 'aws-cdk-lib';
import { Annotations as AnnotationsCapture } from 'aws-cdk-lib/assertions';
import { TagComplianceAspect } from '../lib/aspects/tag-compliance-aspect';

describe('TagComplianceAspect', () => {
  it('should not warn when all required tags are present', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack', {
      tags: {
        Project: 'TestProject',
        Environment: 'Test',
        ManagedBy: 'CDK',
      },
    });

    const aspect = new TagComplianceAspect(['Project', 'Environment', 'ManagedBy']);
    aspect.visit(stack);

    const warnings = AnnotationsCapture.fromStack(stack).findWarning(
      '*',
      'Stack is missing required tags*'
    );
    expect(warnings.length).toBe(0);
  });

  it('should warn when required tags are missing', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack', {
      tags: {
        Project: 'TestProject',
      },
    });

    const aspect = new TagComplianceAspect(['Project', 'Environment', 'ManagedBy']);
    aspect.visit(stack);

    const warnings = AnnotationsCapture.fromStack(stack).findWarning(
      '*',
      'Stack is missing required tags: Environment, ManagedBy*'
    );
    expect(warnings.length).toBeGreaterThan(0);
  });

  it('should warn when tag values are empty', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack', {
      tags: {
        Project: '',
        Environment: 'Test',
      },
    });

    const aspect = new TagComplianceAspect(['Project', 'Environment']);
    aspect.visit(stack);

    const warnings = AnnotationsCapture.fromStack(stack).findWarning(
      '*',
      "Tag 'Project' has an empty value*"
    );
    expect(warnings.length).toBeGreaterThan(0);
  });

  it('should allow custom required tags', () => {
    const app = new App();
    const stack = new Stack(app, 'TestStack', {
      tags: {
        CustomTag1: 'Value1',
        CustomTag2: 'Value2',
      },
    });

    const aspect = new TagComplianceAspect(['CustomTag1', 'CustomTag2']);
    aspect.visit(stack);

    const warnings = AnnotationsCapture.fromStack(stack).findWarning(
      '*',
      'Stack is missing required tags*'
    );
    expect(warnings.length).toBe(0);
  });
});
