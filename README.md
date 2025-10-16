# PGNC External Stack - Angular

This repository contains the Angular frontend application for the PGNC External Stack project.

## 📚 Complete Documentation

For comprehensive technical documentation, architecture details, configuration guides, and development workflows, see the **[Complete Angular Documentation](./angular.md)**.

The comprehensive documentation includes:

- **Project Architecture**: Angular 19+ with SSR, standalone components, and modern tooling
- **Source Code Documentation**: Complete cross-referenced documentation for all modules and components
- **Configuration Details**: TypeScript, Angular CLI, Jest testing, ESLint, and build optimization
- **Development Workflows**: Scripts, testing, debugging, and deployment strategies
- **Performance Optimization**: Bundle analysis, SSR benefits, and production deployment
- **Security Considerations**: Client-side security, dependency scanning, and best practices

## Prerequisites

- Node.js 20 LTS (matching the Docker runtime)
- npm 10+ (bundled with Node 20)
- Angular CLI 19.1.3 (`npm install -g @angular/cli@19.1.3`)

## Installation

```bash
npm install
```

## Development server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The CLI watches the production configuration by default; update `proxy.conf.json` if you need to point `/api/**` at a different backend.

## Build

```bash
npm run build
```

Artifacts land in `dist/pgnc` with SSR-ready server output. Start the rendered bundle locally with:

```bash
npm run serve:ssr:pgnc
```

The server listens on `http://localhost:4000/`.

## Testing & Linting

```bash
npm test            # Run the Jest suite once
npm run test:watch  # Watch tests during development
npm run test:coverage
npm run lint        # ESLint + Prettier checks
```

## Contributing

Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details
