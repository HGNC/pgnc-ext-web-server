# Gene Symbol Report Directory Documentation

## Overview

The `gene-symbol-report` directory contains the complete Angular module responsible for displaying comprehensive gene symbol reports in the Plant Gene Nomenclature Committee (PGNC) application. This system serves as the central hub for presenting detailed gene information, including core PGNC data, external database cross-references, and related molecular information. The module follows a hierarchical component architecture with a main container component orchestrating specialized child components for different data domains.

## Directory Structure

```
gene-symbol-report/
├── gene-symbol-report.component.ts         # Main container component
├── gene-symbol-report.component.html       # Primary template orchestrating child components
├── gene-symbol-report.component.css        # Component-specific styles (currently empty)
├── gene-symbol-report.component.spec.ts    # Comprehensive component tests
├── gene-symbol-report.service.ts           # Data fetching service with JWT authentication
├── gene-symbol-report.service.spec.ts      # Service testing suite
├── gene-symbol-report.model.ts             # Primary data interface for gene reports
├── gene-symbol-report.model.spec.ts        # Model validation tests
├── gene-symbol.model.ts                    # Gene symbol data interface
├── gene-symbol.model.spec.ts               # Gene symbol model tests
├── gene-name.model.ts                      # Gene name data interface
├── gene-name.model.spec.ts                 # Gene name model tests
├── gene-location.model.ts                  # Gene location data interface
├── gene-location.model.spec.ts             # Gene location model tests
├── pgnc-data/                              # PGNC-specific data presentation component
│   ├── pgnc-data.component.ts
│   ├── pgnc-data.component.html
│   ├── pgnc-data.component.css
│   ├── pgnc-data.component.spec.ts
│   └── pgnc-data.md                        # 📄 Detailed PGNC data component documentation
└── xref-resources/                         # External database cross-references component
    ├── xref-resources.component.ts
    ├── xref-resources.component.html
    ├── xref-resources.component.css
    ├── xref-resources.component.spec.ts
    ├── xref-resources.model.ts
    ├── xref-resources.model.spec.ts
    ├── xref-data.model.ts
    ├── xref-data.model.spec.ts
    ├── external-resource.model.ts
    ├── external-resource.model.spec.ts
    ├── external-resource-name.type.ts
    ├── external-resource-name.type.spec.ts
    └── xref-resources.md                   # 📄 Detailed external resources documentation
```

## Related Documentation

For detailed information about the specialized components within this module, please refer to:

- **[PGNC Data Component Documentation](./pgnc-data/pgnc-data.md)** - Comprehensive documentation covering the core PGNC data presentation component, including gene symbols, names, locations, classifications, and external database linking
- **[Xref Resources Component Documentation](./xref-resources/xref-resources.md)** - Complete documentation for the external database cross-references system, covering integration with NCBI Gene, Ensembl, UniProt, PubMed, Phytozome, and CBI sequence viewer

## Component Architecture

### Main Container Component (gene-symbol-report.component.ts)

**Purpose**: Orchestrates the gene symbol report display by managing data fetching, state management, and coordinating child components

**Key Features**:
- **Standalone Component**: Uses Angular's modern standalone architecture
- **Signal-Based State Management**: Reactive state management with Angular signals
- **Error Handling**: Comprehensive error handling with user feedback
- **Child Component Coordination**: Manages data flow to specialized child components
- **JWT-Authenticated Data Fetching**: Secure API communication with token management

```typescript
@Component({
    selector: 'app-gene-symbol-report',
    imports: [PgncDataComponent, RouterLink, XrefComponent, FontAwesomeModule],
    templateUrl: './gene-symbol-report.component.html',
    styleUrl: './gene-symbol-report.component.css',
})
export class GeneSymbolReportComponent implements OnInit
```

**Input Properties**:
- `@Input({ required: true }) type!: string` - Report type identifier (typically 'gene')
- `@Input({ required: true }) id!: string` - PGNC identifier for the gene symbol

**State Management Properties**:
- `report = signal<GeneSymbolReport | undefined>(undefined)` - Main report data signal
- `isFetching = signal(false)` - Loading state indicator
- `error = signal<string | undefined>(undefined)` - Error state management
- `appSymbol!: string` - Approved gene symbol for display coordination

**Core Functionality**:

#### ngOnInit()
**Purpose**: Initializes component by fetching gene symbol report data and managing subscription lifecycle

**Data Flow**:
1. **Service Invocation**: Calls GeneReportService with provided gene ID
2. **State Updates**: Updates loading, error, and data signals based on response
3. **Symbol Extraction**: Identifies approved gene symbol for child component coordination
4. **Subscription Management**: Handles cleanup through DestroyRef for memory efficiency

```typescript
ngOnInit() {
    this.isFetching.set(true);
    
    const subscription = this.geneSymbolReportService.getReportById(this.id).subscribe({
        next: result => {
            this.report.set(result);
            this.result = result;
            if (this.result.data?.geneSymbols) {
                this.appSymbol = this.result.data.geneSymbols.find(geneSymbol => {
                    return geneSymbol.type === 'approved';
                })?.symbol.symbol || '';
            }
        },
        error: (err: Error) => {
            this.error.set(err.message);
        },
        complete: () => {
            this.isFetching.set(false);
        },
    });
    
    this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
    });
}
```

### Template Structure (gene-symbol-report.component.html)

**Purpose**: Provides reactive template for displaying gene symbol reports with loading states and error handling

**Template Architecture**:

#### Loading State
```html
@if (isFetching() && !error()) {
    <h1>
        Gene symbol report
        <a [routerLink]="['/help/gene-symbol-report']" class="clickable help" title="Symbol report help">
            <fa-icon [icon]="faQuestionCircle"></fa-icon>
        </a>
    </h1>
    <p class="fallback">Fetching report...</p>
}
```

#### Error State
```html
@if (error()) {
    <p>{{ error() }}</p>
}
```

#### Success State with Child Components
```html
@if (report()) {
    <h1>
        Gene symbol report for {{ appSymbol }}
        <a class="clickable help" title="Symbol report help" [routerLink]="['/help/gene-symbol-report']">
            <fa-icon [icon]="faQuestionCircle"></fa-icon>
        </a>
    </h1>
    <app-pgnc-data [result]="result" [symbol]="appSymbol"></app-pgnc-data>
    <app-xref-resources [result]="result" [symbol]="appSymbol"></app-xref-resources>
}
```

**Child Component Integration**:
- **PgncDataComponent**: Displays core PGNC gene information (symbols, names, locations, classifications)
- **XrefComponent**: Presents external database cross-references and links
- **Shared Data**: Both components receive the same report data and approved symbol

### Data Service (gene-symbol-report.service.ts)

**Purpose**: Manages secure data fetching from the PGNC API with JWT authentication and token renewal

**Key Features**:
- **JWT Authentication**: Secure API communication with bearer tokens
- **Automatic Token Renewal**: Handles expired tokens transparently
- **Error Handling**: Comprehensive error management with user-friendly messages
- **ID Processing**: Handles both raw and prefixed PGNC identifiers

```typescript
@Injectable({
    providedIn: 'root',
})
export class GeneReportService
```

**Dependencies**:
- `HttpClient` - HTTP communication with PGNC API
- `AuthService` - JWT token management and renewal

**Core Method**:

#### getReportById()
**Purpose**: Fetches gene symbol report data with authentication and error handling

**Authentication Flow**:
1. **ID Processing**: Removes 'PGNC:' prefix if present
2. **Token Acquisition**: Retrieves current JWT from AuthService
3. **API Request**: Makes authenticated request to `/api/gene/{id}`
4. **Token Renewal**: Automatically handles expired tokens
5. **Error Handling**: Provides user-friendly error messages

```typescript
public getReportById(pgncId: string): Observable<GeneSymbolReport> {
    if (pgncId.startsWith('PGNC:')) {
        pgncId = pgncId.substring(5);
    }
    
    const creds$ = this.authService.getJwt();
    const renewedCreds$ = this.authService.renewToken();
    
    // Complex authentication and error handling logic
}
```

**Error Handling Scenarios**:
- **Expired Tokens**: Automatic token renewal and request retry
- **Authentication Failures**: Clear messaging for token refresh issues
- **Network Errors**: Generic error messaging for connectivity issues
- **API Errors**: Graceful handling of server-side errors

## Data Models

### GeneSymbolReport Interface

**Purpose**: Primary data structure containing comprehensive gene information

```typescript
export interface GeneSymbolReport {
    data: {
        id: number;
        creationDate: Date;
        modDate: Date | null;
        withdrawnDate: Date | null;
        status: string;
        species: {
            commonName: string;
            scientificName: string;
        };
        geneNames: [GeneName];
        geneSymbols: [GeneSymbol];
        geneLocusTypes: [...] | null;
        geneNotes: [...] | null;
        geneReplacements: [...] | null;
        genesReplaced: [...] | null;
        geneXrefs: Xref[] | undefined;
        geneLocations: [GeneLocation] | null;
        primaryId: string | null;
        primaryIdSource: string | null;
    } | null;
    apiVersion: string;
}
```

### GeneSymbol Interface

**Purpose**: Represents individual gene symbol entries with type classification

```typescript
export interface GeneSymbol {
    symbol: {
        symbol: string;
    };
    creationDate: Date;
    modDate: Date | null;
    withdrawnDate: Date | null;
    type: string; // 'approved', 'previous', 'alias'
}
```

### GeneName Interface

**Purpose**: Represents individual gene name entries with type classification

```typescript
export interface GeneName {
    name: {
        name: string;
    };
    creationDate: Date;
    modDate: Date | null;
    withdrawnDate: Date | null;
    type: string; // 'approved', 'previous', 'alias'
}
```

### GeneLocation Interface

**Purpose**: Represents chromosomal location information

```typescript
export interface GeneLocation {
    creationDate: Date;
    withdrawnDate: Date | null;
    location: {
        name: string;
        refseqAccession: string;
        genbankAccession: string;
        coordSystem: string;
        type: string;
    };
}
```

## Component Hierarchy and Data Flow

### Architectural Overview

```
GeneSymbolReportComponent (Container)
├── Data Fetching (GeneReportService)
├── State Management (Angular Signals)
├── Error Handling (User Feedback)
└── Child Component Coordination
    ├── PgncDataComponent
    │   ├── Core Gene Information Display
    │   ├── Species and Classification Data
    │   ├── Historical Symbol/Name Tracking
    │   └── External Database Linking
    └── XrefComponent
        ├── External Database Cross-References
        ├── Multi-Database Integration
        ├── Dynamic Link Generation
        └── Help System Integration
```

### Data Flow Patterns

#### Input Processing
1. **Route Parameters**: Component receives `type` and `id` from routing system
2. **Service Invocation**: Service called with gene ID for data fetching
3. **Authentication**: JWT tokens managed transparently by service layer
4. **State Updates**: Signals updated based on API response state

#### Child Component Coordination
1. **Data Distribution**: Same `GeneSymbolReport` passed to both child components
2. **Symbol Sharing**: Approved gene symbol extracted and shared
3. **Independent Rendering**: Child components handle their respective data domains
4. **Help Integration**: Centralized help system available to all components

#### Error Handling Flow
1. **Service Errors**: Caught and converted to user-friendly messages
2. **Authentication Errors**: Token renewal attempted automatically
3. **Network Errors**: Generic error messages prevent technical exposure
4. **Component Errors**: Local error handling within child components

## Testing Strategy

### Component Testing

**Test Coverage Areas**:
- **Component Creation**: Basic instantiation and property initialization
- **Data Fetching**: Service integration and response handling
- **State Management**: Signal updates and reactive behavior
- **Error Handling**: Various error scenarios and user feedback
- **Child Component Integration**: Data passing and rendering coordination

**Mock Strategy**:
```typescript
const mockGeneSymbolReport: GeneSymbolReport = {
    data: {
        id: 123,
        status: 'Approved',
        species: { commonName: 'Human', scientificName: 'Homo sapiens' },
        geneNames: [/* complete mock data */],
        geneSymbols: [/* complete mock data */],
        // Additional mock properties
    },
    apiVersion: '1.0'
};
```

### Service Testing

**Authentication Testing**:
- **Valid Tokens**: Successful API requests with valid JWT
- **Expired Tokens**: Automatic renewal and request retry
- **Authentication Failures**: Error handling for renewal failures
- **Network Issues**: Timeout and connectivity error handling

**Data Processing Testing**:
- **ID Formats**: Handling of both prefixed and raw PGNC identifiers
- **Response Parsing**: Proper conversion to GeneSymbolReport interface
- **Error Responses**: API error handling and user messaging
- **Observable Streams**: RxJS operator testing and stream management

### Integration Testing

**End-to-End Scenarios**:
- **Complete Report Loading**: Full data fetch and display cycle
- **Child Component Communication**: Data passing and rendering verification
- **Help System Integration**: Navigation and context verification
- **Responsive Behavior**: Cross-device and screen size testing

## Performance Considerations

### Loading Optimization

**Lazy Loading**: Component and child components loaded on-demand
**Data Caching**: AuthService handles JWT token caching
**Subscription Management**: Proper cleanup with DestroyRef
**Signal Efficiency**: Reactive updates only when necessary

### Rendering Performance

**Child Component Isolation**: Independent rendering domains prevent cross-interference
**Template Optimization**: Angular control flow for efficient DOM updates
**State Minimization**: Minimal component state for optimal change detection
**Memory Management**: Proper subscription cleanup and signal disposal

### Network Efficiency

**Authentication Optimization**: Token reuse and renewal only when necessary
**Error Handling**: Early termination of failed requests
**Request Deduplication**: Service-level request management
**Bandwidth Optimization**: Efficient data structures and minimal payloads

## Security Considerations

### Authentication Security

**JWT Management**: Secure token storage and transmission
**Token Renewal**: Automatic handling without user intervention
**Authorization Headers**: Proper bearer token formatting
**Error Information**: No sensitive data exposure in error messages

### Data Security

**Input Validation**: Gene ID format validation and sanitization
**XSS Protection**: Angular's built-in sanitization for data display
**CSRF Protection**: API communication through authenticated channels
**Error Handling**: Generic error messages prevent information disclosure

### API Security

**HTTPS Communication**: All API requests use secure protocols
**Token Expiration**: Proper handling of expired authentication
**Rate Limiting**: Service-level request management
**Data Validation**: Type-safe interfaces prevent data injection

## Development Guidelines

### Code Organization

**Single Responsibility**: Each component handles specific data domain
**Interface-Driven**: Strong typing through TypeScript interfaces
**Service Separation**: Clear separation between data and presentation layers
**Test Coverage**: Comprehensive testing for all functionality

### Best Practices

**Signal Usage**: Reactive state management with Angular signals
**Subscription Management**: Proper cleanup with DestroyRef
**Error Handling**: User-friendly error messages and graceful degradation
**Accessibility**: Screen reader support and keyboard navigation

### Component Design

**Standalone Architecture**: Modern Angular component design
**Input Validation**: Required inputs with type safety
**Child Coordination**: Clear data passing and minimal coupling
**Template Clarity**: Readable templates with proper control flow

## Integration Points

### Application Integration

**Routing System**: Integrated with Angular Router for navigation
**Authentication**: Seamless integration with application auth system
**Help System**: Contextual help linking throughout interface
**Layout Consistency**: Matches application-wide design patterns

### Child Component Integration

**Data Sharing**: Consistent data structures passed to child components
**Event Coordination**: Minimal inter-component communication requirements
**Style Inheritance**: Child components inherit application styling
**Help Integration**: Unified help system across all components

### External Integrations

**PGNC API**: Direct integration with backend gene data services
**External Databases**: Links to scientific databases through child components
**Authentication Services**: JWT-based secure API communication
**Documentation System**: Integration with application help and documentation

## Maintenance and Updates

### Component Maintenance

**Angular Updates**: Regular framework updates and compatibility testing
**Dependency Management**: External library updates and security patches
**API Changes**: Backend API evolution and interface updates
**Performance Monitoring**: Regular performance analysis and optimization

### Data Model Evolution

**Interface Updates**: Adding new data fields and properties
**Backward Compatibility**: Graceful handling of API version changes
**Type Safety**: Maintaining TypeScript compliance during updates
**Migration Strategies**: Handling breaking changes in data structures

### Testing Maintenance

**Test Updates**: Keeping tests current with code changes
**Mock Data**: Updating mock data to reflect real-world scenarios
**Coverage Analysis**: Regular test coverage analysis and improvement
**Integration Testing**: End-to-end testing with real API integration

## Future Enhancements

### Planned Features

**Real-time Updates**: WebSocket integration for live data updates
**Enhanced Caching**: Client-side caching for improved performance
**Offline Support**: Service worker integration for offline access
**Data Export**: Gene report export functionality

### Architectural Improvements

**State Management**: Potential integration with NgRx for complex state
**Micro-frontend**: Modular architecture for independent deployments
**Progressive Enhancement**: Advanced features for modern browsers
**Performance Optimization**: Further optimization of loading and rendering

### User Experience Enhancements

**Customizable Views**: User preferences for data display
**Enhanced Search**: Advanced search within gene reports
**Comparison Mode**: Side-by-side gene comparison functionality
**Interactive Visualizations**: Enhanced data visualization components

## Troubleshooting

### Common Issues

**Loading Problems**: Check API connectivity and authentication status
**Data Display Issues**: Verify GeneSymbolReport data structure completeness
**Authentication Errors**: Monitor JWT token expiration and renewal
**Child Component Errors**: Check data passing and interface compliance

### Debugging Strategies

**Angular DevTools**: Component state inspection and signal debugging
**Network Monitoring**: API request analysis and response validation
**Console Logging**: Strategic logging for data flow debugging
**Error Tracking**: Comprehensive error logging and user feedback

### Performance Issues

**Loading Delays**: Monitor API response times and network conditions
**Memory Leaks**: Check subscription cleanup and signal disposal
**Rendering Issues**: Analyze change detection cycles and template complexity
**Network Efficiency**: Monitor request frequency and data transfer

## Error Handling Patterns

### User-Friendly Messaging

**Generic Errors**: "Problem fetching data. Please try again later"
**Authentication Errors**: "Please reload the page to refresh authentication"
**Network Errors**: "Connection issue. Please check your network"
**Data Errors**: "Gene report not found for the specified ID"

### Graceful Degradation

**Partial Data**: Display available information when some data is missing
**Service Errors**: Continue with cached data when possible
**Component Errors**: Isolate errors to prevent complete failure
**Network Issues**: Provide offline functionality where applicable

This documentation provides a comprehensive overview of the gene-symbol-report directory, its architecture, and integration with specialized child components. For detailed information about specific functionality, please refer to the linked documentation for the [PGNC Data Component](./pgnc-data/pgnc-data.md) and [Xref Resources Component](./xref-resources/xref-resources.md).
