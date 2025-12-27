import { IAspect, Annotations, Stack } from 'aws-cdk-lib';
import { IConstruct } from 'constructs';

/**
 * CDK Aspect that validates resource tagging compliance.
 * Ensures all stacks have required tags for governance and cost tracking.
 */
export class TagComplianceAspect implements IAspect {
  private readonly requiredTags: string[];

  constructor(requiredTags: string[] = ['Project', 'Environment', 'ManagedBy']) {
    this.requiredTags = requiredTags;
  }

  visit(node: IConstruct): void {
    if (node instanceof Stack) {
      const stack = node as Stack;
      const stackTags = stack.tags.tagValues();

      // Check for missing required tags
      const missingTags = this.requiredTags.filter(
        (tag) => !stackTags[tag]
      );

      if (missingTags.length > 0) {
        Annotations.of(node).addWarning(
          `Stack is missing required tags: ${missingTags.join(', ')}. ` +
          'Required tags: ' + this.requiredTags.join(', ')
        );
      }

      // Validate tag values are not empty
      Object.entries(stackTags).forEach(([key, value]) => {
        if (!value || value.trim() === '') {
          Annotations.of(node).addWarning(
            `Tag '${key}' has an empty value. Please provide a meaningful value.`
          );
        }
      });
    }
  }
}
