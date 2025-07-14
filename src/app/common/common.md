# Common Directory Documentation

## Overview

The `common` directory contains shared Angular components, services, and models that are used across multiple parts of the PGNC application. This directory follows Angular best practices by centralizing reusable functionality to promote code reuse and maintainability.

## Directory Structure

```
common/
├── models/                          # Shared data models and interfaces
│   ├── login-credentials.model.ts   # Authentication credentials interface
│   └── login-credentials.model.spec.ts # Model tests
└── services/                        # Shared application services
    ├── auth.service.ts              # Authentication service
    ├── auth.service.spec.ts         # Authentication service tests
    ├── fragment-jump.service.ts     # URL fragment navigation service
    └── fragment-jump.service.spec.ts # Fragment service tests
```

## Models

### LoginCredentials Model (`models/login-credentials.model.ts`)

**Purpose**: Defines the TypeScript interface for authentication credentials returned by the API.

**Interface Definition**:
```typescript
export interface LoginCredentials {
    data: {
        accessToken: string;
        refreshToken: string;
    };
    apiVersion: string;
}
```

**Properties**:
- **data**: Container object for authentication tokens
  - **accessToken**: JWT token for authenticated API requests
  - **refreshToken**: Token for refreshing expired access tokens
- **apiVersion**: API version string for compatibility tracking

**Usage**:
- Used by AuthService for type-safe credential handling
- Ensures consistent authentication response structure
- Provides compile-time type checking for authentication flows

**Test Coverage** (`login-credentials.model.spec.ts`):
- **Interface Structure**: Validates correct TypeScript interface definition
- **Token Validation**: Tests acceptance of various token formats including JWT tokens
- **Empty Values**: Ensures interface handles empty string values
- **Data Property Structure**: Validates nested data object structure
- **API Version Handling**: Tests various API version string formats

## Services

### AuthService (`services/auth.service.ts`)

**Purpose**: Handles user authentication, token management, and API authentication for the PGNC application.

**Key Features**:
- **JWT Token Management**: Handles access and refresh tokens
- **Automatic Sign-in**: Uses environment credentials for authentication
- **Token Refresh**: Automatic token renewal when needed
- **Error Handling**: Comprehensive error management with user feedback
- **Observable Patterns**: Reactive programming with RxJS

**Service Configuration**:
```typescript
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private userName: string = environment.apiUser || '';
    private password: string = environment.apiPassword || '';
    private jwtResult: LoginCredentials | undefined;
    
    error = signal<string>('');
}
```

**Core Methods**:

#### `getJwt(): Observable<LoginCredentials>`
- **Purpose**: Retrieves JWT token, signing in if necessary
- **Behavior**: 
  - Returns cached token if available
  - Performs sign-in if no token exists
  - Caches result for subsequent calls
- **Error Handling**: Catches and transforms authentication errors
- **Return**: Observable stream of LoginCredentials

#### `renewToken(): Observable<LoginCredentials>`
- **Purpose**: Refreshes expired access token using refresh token
- **API Endpoint**: `POST /api/auth/refresh-tokens`
- **Payload**: Current refresh token
- **Error Handling**: Clears cached credentials on failure
- **Return**: Observable stream of new LoginCredentials

#### `private signIn(): Observable<LoginCredentials>`
- **Purpose**: Performs initial authentication with username/password
- **API Endpoint**: `POST /api/auth/sign-in`
- **Credentials**: Uses environment variables for authentication
- **Security**: Credentials managed through environment configuration

**Dependencies**:
- **HttpClient**: For API communication
- **RxJS**: For reactive programming patterns
- **Angular Signals**: For reactive error state management
- **Environment**: For configuration management

**Error Management**:
- **Signal-based Error State**: Uses Angular signals for reactive error handling
- **Detailed Error Messages**: Provides specific error context
- **Graceful Degradation**: Handles authentication failures gracefully
- **Observable Error Streams**: Uses RxJS error handling patterns

### FragmentJumpService (`services/fragment-jump.service.ts`)

**Purpose**: Provides smooth scrolling navigation to page sections using URL fragments (anchor links).

**Key Features**:
- **Smooth Scrolling**: Provides smooth scroll animation to target elements
- **URL Fragment Monitoring**: Subscribes to route fragment changes
- **DOM Integration**: Direct DOM manipulation for scroll behavior
- **Route Integration**: Works with Angular Router for navigation

**Service Configuration**:
```typescript
@Injectable({
    providedIn: 'root',
})
export class FragmentJumpService {
    constructor(private activatedRoute: ActivatedRoute) {}
}
```

**Core Methods**:

#### `jumpToSection(section: string | null): void`
- **Purpose**: Scrolls to a specific page section identified by element ID
- **Parameters**: 
  - `section`: Element ID to scroll to (null-safe)
- **Behavior**: 
  - Finds element by ID using `document.getElementById()`
  - Applies smooth scroll behavior
  - Gracefully handles missing elements
- **Usage**: Called when user clicks anchor links or navigates with fragments

#### `subscribeToFragmentChanges(): Observable<string | null>`
- **Purpose**: Provides observable stream of URL fragment changes
- **Return**: Observable of fragment strings from ActivatedRoute
- **Usage**: Components can subscribe to react to fragment navigation
- **Integration**: Works with Angular Router fragment handling

**Dependencies**:
- **ActivatedRoute**: For monitoring route fragment changes
- **DOM API**: For element selection and scroll behavior

**Use Cases**:
- **Page Navigation**: Jump to specific sections within long pages
- **Table of Contents**: Navigate to different sections from TOC links
- **Deep Linking**: Support URL fragments for direct section access
- **Smooth UX**: Provide smooth scrolling instead of instant jumps

## Testing Strategy

### Model Testing
The LoginCredentials model includes comprehensive tests covering:
- **Interface Structure Validation**: Ensures TypeScript interface compliance
- **Token Format Testing**: Validates various token formats including real JWT tokens
- **Edge Case Handling**: Tests empty values and edge cases
- **Type Safety**: Confirms compile-time type checking works correctly

### Service Testing
Both services include detailed test suites covering:

#### AuthService Tests
- **Token Management**: JWT token retrieval and caching
- **Authentication Flow**: Sign-in and token refresh processes
- **Error Handling**: Various authentication failure scenarios
- **Observable Behavior**: RxJS stream behavior and shareReplay functionality
- **Environment Integration**: Configuration-based authentication

#### FragmentJumpService Tests
- **Scroll Behavior**: Smooth scrolling functionality
- **DOM Interaction**: Element selection and scroll execution
- **Route Integration**: Fragment change subscription and handling
- **Null Safety**: Handling of null/undefined fragment values

## Integration Points

### Application Integration
- **Global Services**: Both services are provided at root level for application-wide access
- **Dependency Injection**: Services use Angular's dependency injection system
- **Environment Configuration**: AuthService integrates with environment settings
- **Router Integration**: FragmentJumpService works with Angular Router

### Cross-Component Usage
- **Authentication**: AuthService used by components requiring API access
- **Navigation**: FragmentJumpService used by components with internal page navigation
- **Shared Models**: LoginCredentials used across authentication-related components

## Development Guidelines

### Code Organization
- **Models Directory**: Contains all shared TypeScript interfaces and types
- **Services Directory**: Contains all shared business logic services
- **Test Co-location**: Tests placed alongside implementation files

### Best Practices
- **Injectable Services**: All services use Angular's dependency injection
- **TypeScript Interfaces**: Strong typing for all data models
- **Observable Patterns**: Reactive programming with RxJS
- **Error Handling**: Comprehensive error management
- **Test Coverage**: Full test coverage for all functionality

### Naming Conventions
- **Models**: Use `.model.ts` suffix for interface files
- **Services**: Use `.service.ts` suffix for service files
- **Tests**: Use `.spec.ts` suffix for test files
- **Interfaces**: Use PascalCase for interface names

## Security Considerations

### Authentication Security
- **Environment Variables**: Credentials stored in environment configuration
- **Token Security**: JWT tokens handled securely with proper storage
- **Error Masking**: Authentication errors don't expose sensitive information
- **Token Refresh**: Automatic token renewal reduces security exposure

### Service Security
- **Input Validation**: All service methods validate input parameters
- **DOM Safety**: Fragment service safely handles DOM manipulation
- **Observable Security**: Proper error handling in reactive streams

## Performance Considerations

### Authentication Performance
- **Token Caching**: JWT tokens cached to avoid unnecessary API calls
- **ShareReplay**: RxJS shareReplay prevents duplicate authentication requests
- **Lazy Evaluation**: Authentication only occurs when needed

### Navigation Performance
- **Smooth Scrolling**: Uses native browser smooth scroll for optimal performance
- **DOM Efficiency**: Minimal DOM queries with getElementById
- **Observable Cleanup**: Proper subscription management prevents memory leaks

## Future Enhancements

### Authentication Enhancements
- **Automatic Token Refresh**: Implement automatic background token renewal
- **Multiple Authentication Methods**: Support for different authentication strategies
- **Session Management**: Enhanced session state management
- **Security Headers**: Additional security header management

### Navigation Enhancements
- **Scroll Position Memory**: Remember scroll positions for better UX
- **Intersection Observer**: Use modern APIs for scroll position tracking
- **Animation Customization**: Configurable scroll animation options
- **Accessibility**: Enhanced accessibility for screen readers

## Troubleshooting

### Common Issues

#### Authentication Issues
- **Environment Configuration**: Verify API credentials in environment files
- **Network Connectivity**: Check API endpoint accessibility
- **Token Expiration**: Ensure refresh token handling works correctly
- **CORS Issues**: Verify cross-origin request configuration

#### Navigation Issues
- **Missing Elements**: Ensure target elements exist in DOM
- **Timing Issues**: Check if elements are available when navigation occurs
- **CSS Conflicts**: Verify smooth scroll CSS doesn't conflict with other styles
- **Fragment Format**: Ensure URL fragments match element IDs

### Debugging Tips
- **Service Logging**: Add console logging to trace service behavior
- **Observable Debugging**: Use RxJS tap operator for stream debugging
- **DOM Inspection**: Use browser developer tools to verify element existence
- **Network Monitoring**: Check network tab for authentication requests

This documentation provides a comprehensive overview of the common directory, its shared services and models, and guidelines for their usage and maintenance within the PGNC application.
