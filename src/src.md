# Src Directory Documentation

## Overview

The Src directory serves as the root source code directory for the PGNC (Plant Gene Nomenclature Committee) Angular application. This directory contains all application source code, configuration files, assets, and entry points necessary for building and running the comprehensive plant gene nomenclature web platform. The architecture follows modern Angular best practices with standalone components, server-side rendering support, and optimized build configurations.

> See the canonical Angular docs hub at [../angular.md](../angular.md). This file focuses on `src/` specifics and links to the hub to avoid duplication.

## Directory Architecture

### Core Application Structure

- **Application Module** (`app/`): Complete Angular application with all feature modules
- **Assets** (`assets/`): Static resources including images and media files
- **Environments** (`environments/`): Environment-specific configuration files
- **Entry Points**: Client and server bootstrap files for application initialization
- **Configuration**: Global styling, testing setup, and build configurations

### Directory Structure

```
src/
├── app/                                    # Complete Angular application module
│   ├── app.component.ts                    # Root application component
│   ├── app.config.ts                       # Application configuration and providers
│   ├── app.routes.ts                       # Complete routing configuration
│   ├── about/                              # About PGNC information pages
│   ├── common/                             # Shared utilities and services
│   ├── contact/                            # Contact information and forms
│   ├── data/                               # Gene data presentation modules
│   ├── error/                              # Error handling and 404 pages
│   ├── footer/                             # Application footer components
│   ├── header/                             # Application header with search
│   ├── help/                               # Comprehensive help system
│   ├── home/                               # Landing page with jumbotron
│   ├── license/                            # Legal and licensing information
│   ├── nav/                                # Navigation with dropdown menus
│   ├── publications/                       # Academic publications display
│   └── search/                             # Advanced search functionality
├── assets/                                 # Static application assets
│   └── img/                                # Image resources and media files
├── environments/                           # Environment configuration
│   └── environment.ts                      # Production environment settings
├── favicon.ico                             # Application favicon
├── index.html                              # Main HTML template
├── main.ts                                 # Client-side application bootstrap
├── main.server.ts                          # Server-side rendering bootstrap
├── server.ts                               # Express server configuration
├── pgnc-styles.css                         # Global application styles
└── setup.jest.ts                           # Jest testing framework setup
```

## Application Module Documentation

### [Complete Application Module](./app/app.md)

The app directory contains the comprehensive Angular application with all feature modules, routing, and component architecture.

#### **Core Application Features**

- **[About Module](./app/about/about.md)**: PGNC committee information and organizational structure
- **[Common Module](./app/common/common.md)**: Shared utilities, models, and services across modules
- **[Contact Module](./app/contact/contact.md)**: Contact forms and communication channels

#### **Data Presentation and Search**

- **[Data Module](./app/data/gene-symbol-report/gene-symbol-report.md)**: Gene data visualization and presentation
  - **[Gene Symbol Report](./app/data/gene-symbol-report/gene-symbol-report.md)**: Main gene information container
  - **[PGNC Data](./app/data/gene-symbol-report/pgnc-data/pgnc-data.md)**: Core nomenclature data display
  - **[Cross-Reference Resources](./app/data/gene-symbol-report/xref-resources/xref-resources.md)**: External database integration
- **[Search Module](./app/search/search.md)**: Advanced search with pagination, filtering, and highlighting

#### **Navigation and Layout**

- **[Header Module](./app/header/header.md)**: Application header with search functionality and branding
- **[Footer Module](./app/footer/footer.md)**: Complex footer with multiple components and information
- **[Navigation Module](./app/nav/nav.md)**: Primary navigation with dropdown menus and external links

#### **Information and Documentation**

- **[Help Module](./app/help/help.md)**: Comprehensive help system with multiple specialized guides
- **[Home Module](./app/home/home.md)**: Landing page with jumbotron design and featured content
- **[License Module](./app/license/license.md)**: CC0 licensing information and legal documentation
- **[Publications Module](./app/publications/publications.md)**: Academic publications with proper citations

#### **Error Handling**

- **[Error Module](./app/error/error.md)**: 404 error handling with user guidance and recovery

## Bootstrap and Entry Points

### Client-Side Bootstrap

#### Main Application Entry Point

```typescript
/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
```

**Bootstrap Features**:

- **Standalone Bootstrap**: Modern Angular standalone application bootstrapping
- **Localization Support**: Angular i18n localization framework integration
- **Error Handling**: Comprehensive error catching and logging for bootstrap failures
- **Configuration Integration**: Centralized application configuration loading

### Server-Side Rendering Bootstrap

#### SSR Entry Point

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);
export default bootstrap;
```

**SSR Features**:

- **Server Bootstrap**: Dedicated server-side rendering bootstrap configuration
- **SSR Configuration**: Server-specific application configuration and providers
- **Export Pattern**: ES module export pattern for server integration
- **Performance Optimization**: Server-side rendering for improved initial load times

### HTML Template

#### Index HTML Structure

```html
<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        <base href="/" />
        <title>Plant Gene Nomenclature Committee</title>
    </head>
    <body>
        <app-root></app-root>
    </body>
</html>
```

**Template Features**:

- **Semantic HTML5**: Modern HTML5 document structure
- **Responsive Meta**: Viewport configuration for mobile optimization
- **Favicon Integration**: Application icon and branding
- **Base HREF**: Router base configuration for navigation
- **Clean Structure**: Minimal HTML for optimal performance

## Server Configuration

### Express Server Setup

#### Production Server

```typescript
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine, isMainModule } from '@angular/ssr/node';
import express from 'express';
import bootstrap from './main.server';
```

**Server Features**:

- **Express Framework**: Node.js Express server for production deployment
- **Static File Serving**: Optimized static asset serving with caching headers
- **SSR Integration**: Angular Universal server-side rendering support
- **Performance Optimization**: Asset caching and compression strategies

#### Static Asset Serving

```typescript
app.get('**/*.js', express.static(browserDistFolder, { maxAge: '1y' }));
app.get('**/*.css', express.static(browserDistFolder, { maxAge: '1y' }));
app.get('**/*.png', express.static(browserDistFolder, { maxAge: '1y' }));
```

**Asset Features**:

- **Long-Term Caching**: One-year cache headers for static assets
- **File Type Optimization**: Specific handling for different asset types
- **Performance**: Optimized asset delivery for production environments
- **CDN Ready**: Configuration suitable for CDN integration

## Environment Configuration

### Production Environment

```typescript
export const environment = {
    production: true,
    apiUser: '${API_USER}',
    apiPassword: '${API_PASSWORD}',
};
```

**Environment Features**:

- **Production Settings**: Optimized configuration for production deployment
- **API Configuration**: Environment-specific API credentials and endpoints
- **Security**: Secure handling of sensitive configuration data
- **Build Integration**: Compile-time environment variable substitution

### Configuration Management

- **Environment Variables**: External configuration through environment variables
- **Security**: Secure credential management and deployment practices
- **Flexibility**: Easy configuration updates without code changes
- **Deployment**: Docker and container-friendly configuration patterns

## Global Styling

### PGNC Styles

#### Global Layout System

```css
body, html {
    height: 100%;
    padding: 0;
    margin: 0;
    background-color: #fff;
    box-sizing: border-box;
}

.page {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.default-header, .default-footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.default-main {
    flex: 1;
}
```

**Styling Features**:

- **Flexbox Layout**: Modern CSS Flexbox for responsive layout structure
- **Full Height**: 100% height layout for proper page structure
- **Component Layout**: Header, main content, and footer layout system
- **Responsive Design**: Mobile-first responsive design principles

#### Typography System

```css
main {
    h1, h2, h3, h4 {
        color: #800;
    }
    h1 { font-size: 30px; }
    h2 { font-size: 22px; }
    h3 { font-size: 18px; }
    h4 { font-size: 14px; }
}
```

**Typography Features**:

- **Brand Colors**: Consistent PGNC maroon color scheme (#800)
- **Heading Hierarchy**: Clear typographic hierarchy for content organization
- **Readability**: Optimized font sizes for web readability
- **Consistency**: Uniform styling across all application components

## Assets and Resources

### Static Assets

#### Image Assets

```
assets/
└── img/
    ├── logos/                              # Brand logos and institutional marks
    ├── icons/                              # Application icons and symbols
    └── backgrounds/                        # Background images and patterns
```

**Asset Features**:

- **Optimized Images**: Web-optimized image formats and compression
- **Responsive Images**: Multiple resolutions for different screen densities
- **Brand Assets**: Official PGNC and institutional logos
- **Performance**: Lazy loading and progressive image enhancement

#### Asset Management

- **Build Integration**: Webpack asset processing and optimization
- **Cache Busting**: Automatic cache invalidation for updated assets
- **Compression**: Automatic image compression and format optimization
- **CDN Ready**: Asset structure suitable for CDN deployment

## Testing Configuration

### Jest Setup

#### Test Framework Configuration

```typescript
import 'jest-preset-angular/setup-jest';
```

**Testing Features**:

- **Jest Integration**: Modern JavaScript testing framework with Angular support
- **Angular Testing**: Angular-specific testing utilities and mocking
- **TypeScript Support**: Full TypeScript testing with type checking
- **Coverage Reporting**: Comprehensive test coverage analysis and reporting

#### Testing Strategy

- **Unit Testing**: Component and service unit testing with mocking
- **Integration Testing**: Cross-component integration and data flow testing
- **E2E Testing**: End-to-end user workflow and acceptance testing
- **Performance Testing**: Application performance and optimization testing

## Build and Deployment

### Build Configuration

#### Production Build Optimization

- **AOT Compilation**: Ahead-of-time compilation for performance and security
- **Tree Shaking**: Dead code elimination for smaller bundle sizes
- **Minification**: Code minification and compression for production
- **Bundle Splitting**: Optimal code splitting for lazy loading and caching

#### Development Configuration

- **Hot Reload**: Development server with hot module replacement
- **Source Maps**: Debug-friendly source mapping for development
- **Error Reporting**: Comprehensive error reporting and debugging tools
- **Live Reload**: Automatic browser refresh for development efficiency

### Deployment Strategies

#### Container Deployment

- **Docker Ready**: Container-friendly build and deployment configuration
- **Multi-Stage Builds**: Optimized Docker builds with build and runtime stages
- **Environment Variables**: External configuration through environment variables
- **Health Checks**: Application health monitoring and container orchestration

#### Static Hosting

- **CDN Integration**: Content delivery network optimization and configuration
- **Asset Optimization**: Compressed and optimized asset delivery
- **Cache Strategies**: Browser and CDN caching configuration
- **Progressive Enhancement**: Core functionality with enhanced features

## Performance Optimization

### Application Performance

#### Loading Optimization

- **Code Splitting**: Route-based and component-based code splitting
- **Lazy Loading**: Deferred loading of non-critical application modules
- **Preloading**: Strategic preloading of likely-needed resources
- **Bundle Analysis**: Bundle size monitoring and optimization

#### Runtime Performance

- **Change Detection**: Optimized Angular change detection strategies
- **Memory Management**: Efficient memory usage and garbage collection
- **Event Handling**: Optimized event handling and DOM manipulation
- **Service Workers**: Progressive web app features and offline capabilities

### Server-Side Rendering

#### SSR Benefits

- **SEO Optimization**: Search engine optimization through server-side rendering
- **Initial Load**: Faster initial page load times and perceived performance
- **Social Sharing**: Proper meta tags and social media sharing optimization
- **Accessibility**: Enhanced accessibility with server-rendered content

#### SSR Configuration

- **Hydration**: Client-side hydration with event replay for enhanced UX
- **Caching**: Server-side caching strategies for improved performance
- **Error Handling**: Graceful SSR error handling and fallback strategies
- **Progressive Enhancement**: Core functionality with JavaScript enhancement

## Security Considerations

### Application Security

#### Client-Side Security

- **XSS Prevention**: Cross-site scripting prevention through Angular's built-in sanitization
- **CSRF Protection**: Cross-site request forgery protection mechanisms
- **Content Security Policy**: CSP implementation for enhanced security
- **Input Validation**: Comprehensive user input validation and sanitization

#### Build Security

- **Dependency Scanning**: Regular security vulnerability scanning of dependencies
- **Secure Headers**: Security header configuration for production deployment
- **HTTPS Enforcement**: Secure communication and transport layer security
- **Environment Isolation**: Secure separation of development and production environments

### Data Protection

#### Privacy Compliance

- **Data Minimization**: Collection and processing of only necessary user data
- **Consent Management**: User consent and privacy preference management
- **Data Retention**: Appropriate data retention and deletion policies
- **Audit Logging**: Comprehensive security event logging and monitoring

## Maintenance and Updates

### Version Management

#### Framework Updates

- **Angular Updates**: Regular Angular framework updates and migration strategies
- **Dependency Management**: Third-party library updates and compatibility testing
- **Security Patches**: Timely security update deployment and validation
- **Breaking Changes**: Careful handling of breaking changes and migration planning

#### Code Quality

- **Linting**: Code style and quality enforcement through ESLint and Prettier
- **Type Safety**: Strict TypeScript configuration and type checking
- **Code Reviews**: Peer review processes and automated quality gates
- **Documentation**: Comprehensive code documentation and architectural decision records

### Monitoring and Analytics

#### Performance Monitoring

- **Real User Monitoring**: Application performance monitoring in production
- **Error Tracking**: Comprehensive error tracking and alerting systems
- **Usage Analytics**: User behavior analysis and application usage metrics
- **Performance Budgets**: Performance budget enforcement and monitoring

#### Health Monitoring

- **Application Health**: Continuous health monitoring and alerting
- **Dependency Health**: Third-party service and dependency monitoring
- **Security Monitoring**: Security event monitoring and incident response
- **Compliance Monitoring**: Ongoing compliance validation and reporting

## Future Enhancements

### Planned Improvements

#### Performance Enhancements

- **Service Workers**: Advanced caching and offline functionality implementation
- **Web Assembly**: Performance-critical operations with WebAssembly
- **Module Federation**: Micro-frontend architecture for scalable development
- **Edge Computing**: Edge deployment for global performance optimization

#### Feature Enhancements

- **Progressive Web App**: Full PWA implementation with offline capabilities
- **Real-Time Features**: WebSocket integration for real-time data updates
- **Advanced Analytics**: Enhanced user analytics and behavior tracking
- **Internationalization**: Multi-language support and localization

### Technical Evolution

#### Architecture Improvements

- **Micro-Frontend**: Migration to micro-frontend architecture for team scalability
- **State Management**: Advanced state management library integration
- **Testing Automation**: Enhanced automated testing and quality assurance
- **DevOps Integration**: Advanced CI/CD pipeline and deployment automation

#### User Experience Enhancements

- **Accessibility**: Enhanced accessibility features and compliance
- **Performance**: Advanced performance optimization and monitoring
- **Mobile Experience**: Native mobile app development and hybrid approaches
- **Personalization**: User preference and customization capabilities

## Troubleshooting

### Common Issues

#### Build Problems

- **Compilation Errors**: TypeScript compilation and Angular build issues
- **Dependency Conflicts**: Package version conflicts and resolution strategies
- **Asset Problems**: Static asset loading and optimization issues
- **Environment Issues**: Environment configuration and deployment problems

#### Runtime Issues

- **Performance Problems**: Application performance and optimization challenges
- **Memory Leaks**: Memory usage monitoring and leak detection
- **Error Handling**: Runtime error debugging and resolution
- **Browser Compatibility**: Cross-browser compatibility issues and solutions

### Debugging Strategies

#### Development Tools

- **Angular DevTools**: Component inspection and performance profiling
- **Browser DevTools**: Network, performance, and console debugging
- **Source Maps**: Source code debugging in development and production
- **Performance Profiling**: Application performance analysis and optimization

#### Production Debugging

- **Error Monitoring**: Production error tracking and analysis
- **Performance Monitoring**: Real-time performance monitoring and alerting
- **Log Analysis**: Server and application log analysis and monitoring
- **User Feedback**: User feedback collection and issue reporting

This comprehensive source directory serves as the foundation for the PGNC plant gene nomenclature platform, providing a robust, scalable, and maintainable codebase that supports researchers, educators, and scientists in their gene nomenclature research and documentation activities while maintaining the highest standards of performance, security, and user experience.
