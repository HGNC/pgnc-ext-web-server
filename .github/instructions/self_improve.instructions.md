````instructions
---
description: Guidelines for continuously improving Angular repo rules and conventions
applyTo: "**/*"
---

# Self-Improvement Guidelines for Angular

## Rule Improvement Triggers

- Repeated anti-patterns in components/services
- Performance issues (bundle size, change detection)
- Accessibility or UX consistency issues
- Build pipeline/CI improvements

## Analysis Process

- Review module structure and lazy-loading strategy
- Validate strict typing and eslint rules
- Check for duplicated UI logic suitable for shared libraries
- Monitor performance budgets and bundle analysis

## Rules to Encourage

- Strict mode in TypeScript and Angular Compiler
- OnPush change detection and trackBy for lists
- Strongly typed APIs and state management
- Use HttpClient interceptors for auth/logging

## Example Pattern

```ts
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  /* ... */
})
export class ExampleComponent {}
```

## Continuous Improvement

- Regularly update Angular and dependencies
- Keep design system or shared component library consistent
- Automate code formatting and linting in CI
````
