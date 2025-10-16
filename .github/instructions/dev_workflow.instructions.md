````instructions
---
description: Development workflow guidelines for the Angular frontend service
applyTo: "**/*"
---

# Angular Frontend Development Workflow

This document outlines development workflow guidelines for the Angular app, containerized for deployment.

## Stack Overview

- Framework: Angular
- Package manager: npm
- Production served via Docker (see `angular/Dockerfile`)

## Local Development

- Use Angular CLI for local development
- For end-to-end stack, use the top-level docker-compose (if applicable)

### Install and Run

```bash
# From repo root
cd angular
npm ci
npm start
```

### Build Production Artifacts

```bash
# From repo root
cd angular
npm run build
```

### Local Docker Build

```bash
# From repo root
DOCKER_BUILDKIT=1 docker build -t pgnc-angular:local angular/
```

## Release Process

The Angular app uses automated semantic versioning and releases:

- Commits to `release` branch trigger releases
- Manual releases via GitHub Actions workflow dispatch
- Each release creates:
  - GitHub Release with notes
  - Docker images pushed to `ghcr.io/hgnc/pgnc-angular` with tags:
    - Semantic version (e.g., `v1.0.0`)
    - `latest`
    - `release`

## Best Practices

- Keep module boundaries clear; lazy-load feature modules when possible
- Use strict TypeScript settings and ESLint rules
- Optimize bundle sizes (budgets, code-splitting)
- Use environment-specific configurations (file replacements)
- Prefer OnPush change detection where appropriate
- Add basic e2e smoke tests for critical routes
````
