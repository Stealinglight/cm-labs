import { App, Stack } from 'aws-cdk-lib';
import { Annotations, Match } from 'aws-cdk-lib/assertions';
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

    const annotations = Annotations.fromStack(stack);
    const warnings = annotations.findWarning('*', Match.stringLikeRegexp('Stack is missing required tags'));
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

    const annotations = Annotations.fromStack(stack);
    annotations.hasWarning('*', Match.stringLikeRegexp('Stack is missing required tags.*Environment.*ManagedBy'));
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

    const annotations = Annotations.fromStack(stack);
    annotations.hasWarning('*', Match.stringLikeRegexp("Tag 'Project' has an empty value"));
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

    const annotations = Annotations.fromStack(stack);
    const warnings = annotations.findWarning('*', Match.stringLikeRegexp('Stack is missing required tags'));
    expect(warnings.length).toBe(0);
  });
});
