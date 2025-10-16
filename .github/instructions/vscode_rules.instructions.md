````instructions
---
description: VS Code rules guidance for Angular repository
applyTo: ".github/instructions/*.instructions.md"
---

# VS Code Rules for Angular

## Rule Structure

```markdown
---
description: Rule description
globs: angular/src/**/*.{ts,scss,html}, angular/**/*.md, angular/Dockerfile
alwaysApply: boolean
---

- **Main Points in Bold**
  - Sub-points with details
  - Examples and explanations
```

## Angular Examples

```ts
// ✅ DO: Use typed forms
const fb = new FormBuilder<{ name: FormControl<string> }>();

// ❌ DON'T: Use any
let value: any;
```

## Best Practices

- Enforce Angular ESLint and Prettier
- Keep modules small and leverage standalone components if applicable
- Prefer observable-based data flows; avoid manual subscriptions unless needed
- Use environment files for config; never commit secrets
````
