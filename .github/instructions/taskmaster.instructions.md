````instructions
---
description: Taskmaster integration guidelines for Angular frontend
applyTo: "**/*"
---

# Taskmaster Integration for Angular

Use Taskmaster to plan and track UI features, refactors, and releases.

## Common Task Areas

- New feature modules and routes
- Shared UI components and design system
- Performance and accessibility work
- API integration and error handling

## Example Task Structure

```json
{
  "id": 42,
  "title": "Build Gene Search UI",
  "description": "Implement search form, results table, and pagination",
  "status": "pending",
  "priority": "high",
  "subtasks": [
    { "id": 1, "title": "Define route and module" },
    { "id": 2, "title": "Create form and DTOs" },
    { "id": 3, "title": "Integrate API with HttpClient" },
    { "id": 4, "title": "Add unit/e2e tests" }
  ]
}
```

## Best Practices

- Keep components presentational where possible; move logic to services
- Avoid tight coupling to specific APIs; use interfaces
- Maintain consistent error and loading UX
- Ensure keyboard navigability and ARIA labels
````
