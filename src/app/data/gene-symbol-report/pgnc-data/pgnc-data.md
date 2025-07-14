# PGNC Data Directory Documentation

## Overview

The `pgnc-data` directory contains the Angular component responsible for displaying comprehensive Plant Gene Nomenclature Committee (PGNC) data for individual gene symbols. This component serves as the core data presentation component within the gene symbol report functionality, providing detailed gene information including symbols, names, locations, classifications, and external references.

## Directory Structure

```
pgnc-data/
├── pgnc-data.component.ts       # Component logic and data parsing
├── pgnc-data.component.html     # Template with structured gene data display
├── pgnc-data.component.css      # Responsive styling for data presentation
└── pgnc-data.component.spec.ts  # Comprehensive unit tests
```

## Component Details

### pgnc-data.component.ts

**Purpose**: Core component class that processes and presents PGNC gene symbol report data

**Key Features**:
- **Standalone Component**: Uses Angular's standalone architecture for modular design
- **Data Processing**: Parses complex gene symbol report data into displayable format
- **Type Safety**: Strongly typed with TypeScript interfaces for data integrity
- **External Links**: Generates dynamic links to external databases (Phytozome, NCBI)

```typescript
@Component({
    selector: 'app-pgnc-data',
    imports: [FontAwesomeModule, RouterLink],
    templateUrl: './pgnc-data.component.html',
    styleUrl: './pgnc-data.component.css',
})
export class PgncDataComponent implements OnInit
```

**Input Properties**:
- `@Input({ required: true }) result!: GeneSymbolReport` - Complete gene symbol report data
- `@Input({ required: true }) symbol!: string` - Current gene symbol being displayed

**Component Properties**:
- `faQuestionCircle` - FontAwesome icon for help links
- `appSymbol: GeneSymbol | undefined` - Approved gene symbol
- `appName: GeneName | undefined` - Approved gene name
- `prevSymbols: GeneSymbol[] | undefined` - Previous symbols array
- `prevNames: GeneName[] | undefined` - Previous names array
- `aliasSymbols: GeneSymbol[] | undefined` - Alias symbols array
- `aliasNames: GeneName[] | undefined` - Alias names array
- `location: GeneLocation | undefined` - Primary chromosomal location
- `xrefs: Xref[] | undefined` - External references (planned feature)

**Core Methods**:

#### ngOnInit()
Lifecycle method that triggers data parsing when component initializes.

#### parseReport()
**Purpose**: Processes the incoming gene symbol report data and categorizes information by type

**Data Processing Logic**:
- **Approved Data**: Finds approved symbol and name from collections
- **Historical Data**: Filters previous symbols and names for historical reference
- **Alternative Data**: Identifies alias symbols and names for comprehensive nomenclature
- **Location Data**: Extracts primary assembly chromosome location information

```typescript
parseReport() {
    this.appSymbol = this.result?.data?.geneSymbols?.find(geneSymbol => {
        return geneSymbol.type === 'approved';
    });
    this.appName = this.result?.data?.geneNames?.find(geneName => {
        return geneName.type === 'approved';
    });
    // Additional filtering for previous, alias types, and location
}
```

**Data Categorization**:
- **Approved Entries**: Current official symbol and name
- **Previous Entries**: Historical symbols and names for tracking evolution
- **Alias Entries**: Alternative symbols and names for comprehensive search
- **Location Filtering**: Specifically targets primary assembly chromosome coordinates

#### getPhytozomeVersion()
**Purpose**: Extracts version information from primaryIdSource for Phytozome database links

**Logic**:
- **Default Handling**: Returns 'v4_1' when no source or version information available
- **Version Extraction**: Parses version from space-separated primaryIdSource string
- **Fallback Protection**: Ensures consistent version formatting for external links

```typescript
getPhytozomeVersion(): string {
    if (!this.result?.data?.primaryIdSource) {
        return 'v4_1';
    }
    const parts = this.result.data.primaryIdSource.split(' ');
    return parts.length > 1 ? parts[1] : 'v4_1';
}
```

### pgnc-data.component.html

**Purpose**: Structured template for displaying comprehensive gene information in a card-based layout

**Template Structure**:

#### Card Header
```html
<h3 class="card-header">PGNC data for {{ appSymbol?.symbol?.symbol }}</h3>
```
Dynamic header showing the approved gene symbol

#### Key-Value Data Grid
The template uses a responsive grid system for data presentation:

```html
<div class="key-val-pairs">
    <span class="key">Label <help-icon></span>
    <span class="val">Value</span>
</div>
```

**Data Fields Displayed**:

#### Core Gene Information
- **Species**: Scientific and common names with help link
- **Approved Symbol**: Current official gene symbol
- **Approved Name**: Current official gene name
- **Locus Type**: Gene classification (protein-coding, etc.)
- **PGNC ID**: Unique PGNC identifier with 'PGNC:' prefix
- **Symbol Status**: Current status (Approved, Withdrawn, etc.)

#### Historical Information (Conditional)
- **Previous Symbols**: Historical symbols if available
- **Previous Names**: Historical names if available  
- **Alias Symbols**: Alternative symbols if available
- **Alias Names**: Alternative names if available

#### Location and External References
- **Chromosomal Location**: Primary assembly chromosome position
- **Primary ID**: External database identifier with dynamic linking
- **Primary ID Source**: Source database information

**Conditional Rendering**:
The template uses Angular's `@if` control flow for conditional content display:

```html
@if (prevSymbols && prevSymbols.length > 0) {
    <span class="key">Previous symbols</span>
    <span class="val">
        @for (prevSymbol of prevSymbols; track prevSymbol.symbol; let last = $last) {
            {{ prevSymbol.symbol.symbol }}
            @if (!last) { , }
        }
    </span>
}
```

**Help System Integration**:
Each data field includes contextual help with router links:

```html
<a class="clickable help" [routerLink]="['/help/gene-symbol-report']" 
   fragment="species" title="Species help">
    <fa-icon [icon]="faQuestionCircle" />
</a>
```

**External Database Linking**:

#### Phytozome Integration
```html
@if (result.data?.primaryIdSource?.startsWith('phytozome')) {
<span class="val">
    <a href="https://phytozome-next.jgi.doe.gov/report/gene/Ptrichocarpa_{{ getPhytozomeVersion() }}/{{ result.data?.primaryId }}">
        {{ result.data?.primaryId }}
    </a>
</span>
}
```

#### NCBI Gene Integration
```html
@if (result.data?.primaryIdSource?.startsWith('ncbi gene')) {
<span class="val">
    <a href="https://www.ncbi.nlm.nih.gov/gene/{{result.data?.primaryId}}">
        {{ result.data?.primaryId }}
    </a>
</span>
}
```

**Accessibility Features**:
- **Screen Reader Support**: Semantic HTML structure with proper labels
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Help Context**: Descriptive title attributes for help icons
- **Link Descriptions**: Clear link purposes for external references

### pgnc-data.component.css

**Purpose**: Responsive styling for optimal data presentation across devices

**Design Features**:

#### Card Styling
```css
.card,
.card-header {
    border-color: #fab800;
}

.card-header {
    background-color: #fab800;
}
```
- **Brand Colors**: PGNC brand color (#fab800) for visual consistency
- **Card Layout**: Bootstrap card structure with custom PGNC theming

#### Responsive Grid System
```css
.key-val-pairs {
    display: grid;
    grid-template-columns: auto;
    row-gap: 0;
}

@media (min-width: 576px) {
    .key-val-pairs {
        grid-template-columns: 24ch auto;
        column-gap: 2ch;
        row-gap: 1ch;
    }
}
```

**Layout Behavior**:
- **Mobile First**: Single column layout for small screens
- **Desktop Enhancement**: Two-column layout with fixed label width
- **Responsive Breakpoint**: Switches at 576px (Bootstrap small breakpoint)

#### Typography and Spacing
```css
.key {
    font-weight: bold;
    justify-self: end;  /* Desktop: right-aligned labels */
}

.val {
    justify-self: start;
    padding-left: 1ch;  /* Mobile: indented values */
    margin-bottom: 1ch; /* Mobile: vertical spacing */
}
```

**Visual Hierarchy**:
- **Bold Labels**: Clear distinction between keys and values
- **Consistent Spacing**: Character-based spacing units for scalability
- **Alignment**: Responsive alignment for optimal readability

#### Performance Considerations
- **Minimal CSS**: Focused styling for fast rendering
- **Grid Layout**: Efficient layout without complex positioning
- **Media Query**: Single breakpoint for simple responsive behavior

### pgnc-data.component.spec.ts

**Purpose**: Comprehensive test suite covering component functionality, data processing, and template rendering

**Test Structure**:

#### Component Creation Tests
```typescript
describe('Component Creation', () => {
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have required inputs', () => {
        expect(component.result).toBeDefined();
        expect(component.symbol).toBeDefined();
    });
});
```

**Validation Areas**:
- **Component Instantiation**: Verifies successful component creation
- **Required Inputs**: Ensures essential data inputs are present
- **Icon Initialization**: Confirms FontAwesome icon setup

#### Data Processing Tests
```typescript
describe('parseReport', () => {
    it('should find approved symbol', () => {
        expect(component.appSymbol?.type).toBe('approved');
        expect(component.appSymbol?.symbol?.symbol).toBe('APPSYM');
    });
});
```

**Data Processing Coverage**:
- **Approved Data Extraction**: Tests finding approved symbols and names
- **Type Filtering**: Validates filtering by symbol/name types (approved, previous, alias)
- **Location Processing**: Ensures correct primary assembly chromosome location extraction
- **Edge Case Handling**: Tests with null data, missing properties, incorrect types

#### Version Extraction Tests
```typescript
describe('getPhytozomeVersion', () => {
    it('should return default version when no primaryIdSource', () => {
        const version = component.getPhytozomeVersion();
        expect(version).toBe('v4_1');
    });
});
```

**Version Processing Coverage**:
- **Default Behavior**: Tests fallback to 'v4_1' when no source available
- **Version Parsing**: Validates extraction from complex source strings
- **Edge Cases**: Handles various primaryIdSource formats

#### Template Rendering Tests
```typescript
describe('Template Rendering', () => {
    it('should display approved symbol in header', () => {
        const header = fixture.debugElement.query(By.css('.card-header'));
        expect(header.nativeElement.textContent).toContain('APPSYM');
    });
});
```

**Template Testing Coverage**:
- **Header Display**: Validates symbol appears in card header
- **Data Fields**: Confirms all gene information displays correctly
- **Conditional Content**: Tests conditional rendering of optional fields
- **Help Integration**: Verifies help icons and router links
- **External Links**: Tests dynamic link generation for external databases

#### Mock Data Structures
```typescript
const mockGeneSymbolReport: GeneSymbolReport = {
    data: {
        id: 123,
        status: 'Approved',
        species: { commonName: 'Human', scientificName: 'Homo sapiens' },
        geneNames: [/* approved, previous, alias names */],
        geneSymbols: [/* approved, previous, alias symbols */],
        // Complete mock structure
    }
};
```

**Test Data Features**:
- **Complete Mock Objects**: Full GeneSymbolReport structures for realistic testing
- **Multiple Data Types**: Includes approved, previous, and alias entries
- **Edge Case Mocks**: Null data, missing properties, incorrect types
- **External Source Mocks**: Phytozome and NCBI primaryIdSource examples

#### Error Handling Tests
```typescript
describe('Error Handling', () => {
    it('should handle null result gracefully', () => {
        component.result = null as any;
        expect(() => component.parseReport()).not.toThrow();
    });
});
```

**Robustness Testing**:
- **Null Data Handling**: Ensures component doesn't crash with null inputs
- **Undefined Properties**: Tests graceful degradation with missing data
- **Type Safety**: Validates component behavior with incomplete data structures

## Data Model Integration

### GeneSymbolReport Interface
**Purpose**: Primary data structure containing comprehensive gene information

**Key Properties**:
- `data.id: number` - Unique PGNC identifier
- `data.status: string` - Current symbol status
- `data.species` - Species information (scientific and common names)
- `data.geneSymbols: [GeneSymbol]` - Collection of all symbols (approved, previous, alias)
- `data.geneNames: [GeneName]` - Collection of all names (approved, previous, alias)
- `data.geneLocusTypes` - Gene classification information
- `data.geneLocations` - Chromosomal location data
- `data.primaryId` - External database identifier
- `data.primaryIdSource` - Source database information

### Related Models
- **GeneSymbol**: Individual symbol entries with type classification
- **GeneName**: Individual name entries with type classification
- **GeneLocation**: Chromosomal position and coordinate information
- **Xref**: External reference linkage (future implementation)

## Functionality

### Primary Features

#### Gene Data Display
The component provides comprehensive gene information display:
- **Current Information**: Approved symbol, name, and status
- **Historical Tracking**: Previous symbols and names for nomenclature evolution
- **Alternative References**: Alias symbols and names for comprehensive search
- **Classification**: Locus type and gene group information
- **Location**: Chromosomal position data

#### External Database Integration
- **Phytozome**: Dynamic linking to Phytozome database with version detection
- **NCBI Gene**: Direct linking to NCBI Gene database entries
- **Extensible**: Framework for additional external database integrations

#### Help System Integration
- **Contextual Help**: Help icons for each data field
- **Router Integration**: Links to detailed help documentation
- **Fragment Navigation**: Direct navigation to specific help sections

### User Experience Features

#### Responsive Design
- **Mobile Optimized**: Single-column layout for small screens
- **Desktop Enhanced**: Two-column layout for efficient space usage
- **Accessibility**: Screen reader friendly with semantic markup
- **Performance**: Minimal CSS for fast rendering

#### Information Architecture
- **Logical Grouping**: Related information grouped together
- **Visual Hierarchy**: Clear distinction between labels and values
- **Progressive Disclosure**: Optional information only shown when available
- **Brand Consistency**: PGNC color scheme and styling standards

## Technical Specifications

### Dependencies

#### Angular Core
- **@angular/core**: Component framework and lifecycle management
- **@angular/router**: Router integration for help links
- **@angular/testing**: Testing utilities and TestBed configuration

#### External Libraries
- **@fortawesome/angular-fontawesome**: Icon system for help indicators
- **@fortawesome/free-solid-svg-icons**: Specific icon imports

#### Internal Dependencies
- **Gene Models**: GeneSymbolReport, GeneSymbol, GeneName, GeneLocation interfaces
- **Xref Model**: External reference model (future implementation)

### Performance Characteristics

#### Component Performance
- **Lightweight Logic**: Minimal processing overhead
- **Efficient Filtering**: Optimized array operations for data categorization
- **Lazy Loading**: Component loaded on-demand within gene symbol report
- **Memory Efficient**: Proper cleanup and minimal state retention

#### Rendering Performance
- **Static Templates**: Pre-compiled template optimization
- **Conditional Rendering**: Angular control flow for efficient DOM updates
- **CSS Grid**: Hardware-accelerated layout system
- **Minimal Reflows**: Efficient responsive design patterns

### Security Considerations

#### Data Safety
- **Type Safety**: Strong TypeScript typing prevents runtime errors
- **Input Validation**: Required input decorators ensure data presence
- **Null Safety**: Comprehensive null checking throughout component
- **XSS Protection**: Angular's built-in sanitization for data display

#### External Links
- **HTTPS**: All external database links use secure protocols
- **Target Security**: External links open in same window for security
- **URL Validation**: Proper URL construction for external services
- **Content Security**: Safe external content integration

## Development Guidelines

### Code Standards

#### TypeScript Best Practices
- **Strict Mode**: Uses strict TypeScript compilation
- **Interface Usage**: Proper interface implementation for type safety
- **Optional Chaining**: Safe property access patterns
- **Generic Typing**: Appropriate use of TypeScript generics

#### Angular Best Practices
- **Standalone Components**: Modern Angular architecture
- **OnPush Strategy**: Consider for performance optimization
- **Reactive Forms**: Ready for future form integration
- **Lifecycle Management**: Proper implementation of Angular lifecycle hooks

### Data Handling

#### Input Processing
- **Required Inputs**: Both result and symbol inputs are required
- **Type Validation**: Strong typing ensures data integrity
- **Error Handling**: Graceful degradation with missing or invalid data
- **Performance**: Efficient data parsing and categorization

#### Template Data Binding
- **Safe Navigation**: Proper use of optional chaining in templates
- **Conditional Display**: Angular control flow for optional content
- **Track Functions**: Efficient list rendering with track expressions
- **One-Way Binding**: Optimized data flow from component to template

### Testing Strategy

#### Unit Testing
- **Component Testing**: Complete component lifecycle testing
- **Data Processing**: Thorough testing of parsing logic
- **Template Rendering**: DOM testing with Angular testing utilities
- **Error Scenarios**: Comprehensive error handling validation

#### Integration Testing
- **Mock Data**: Realistic mock objects for testing
- **External Services**: Mocked external dependencies
- **Router Testing**: Help link navigation testing
- **Accessibility**: Screen reader and keyboard navigation testing

## Maintenance and Updates

### Content Management

#### Data Structure Updates
- **Model Evolution**: Interface updates for new data fields
- **Backward Compatibility**: Graceful handling of legacy data structures
- **API Integration**: Alignment with backend API changes
- **Type Safety**: Maintaining type safety during schema evolution

#### Display Updates
- **Field Addition**: Adding new data fields to display
- **Layout Changes**: Responsive design modifications
- **Help Integration**: New help content linking
- **External Services**: Adding support for new databases

### Technical Maintenance

#### Angular Framework Updates
- **Version Compatibility**: Keeping component compatible with Angular updates
- **Dependency Management**: Regular updates of external dependencies
- **Performance Optimization**: Monitoring and improving component performance
- **Security Updates**: Regular security dependency updates

#### Code Quality
- **Linting**: ESLint configuration compliance
- **Testing**: Maintaining high test coverage
- **Documentation**: Keeping documentation current with code changes
- **Accessibility**: Regular accessibility audits and improvements

## Future Enhancements

### Planned Features

#### Enhanced External Integration
- **Additional Databases**: Support for more external gene databases
- **Cross-References**: Implementation of Xref display functionality
- **Deep Linking**: Direct linking to specific gene sections
- **API Integration**: Real-time data updates from external sources

#### User Experience Improvements
- **Data Export**: Gene information export functionality
- **Comparison Mode**: Side-by-side gene comparison
- **History Tracking**: Detailed nomenclature change history
- **Search Integration**: Enhanced search within gene data

#### Technical Enhancements
- **Performance**: OnPush change detection for better performance
- **Caching**: Client-side caching for frequently accessed data
- **Offline Support**: Service worker integration for offline access
- **Progressive Enhancement**: Enhanced functionality for modern browsers

### Extensibility Points

#### Component Architecture
- **Child Components**: Breaking down into smaller, focused components
- **Service Integration**: Shared services for gene data management
- **State Management**: Integration with application state management
- **Event System**: Component communication through event emission

#### Data Integration
- **Real-time Updates**: WebSocket integration for live data updates
- **Batch Processing**: Handling multiple gene symbol reports
- **Data Validation**: Enhanced client-side data validation
- **Transformation**: Data transformation and normalization services

## Integration Points

### Application Integration

#### Gene Symbol Report Module
- **Parent Component**: Embedded within gene symbol report display
- **Data Flow**: Receives processed gene symbol report data
- **Navigation**: Integrated with application routing system
- **Help System**: Links to application-wide help documentation

#### PGNC Application Ecosystem
- **Search Integration**: Data format compatible with search results
- **Browse Interface**: Consistent styling with browse components
- **User Preferences**: Respects user display preferences
- **Analytics**: Integration with usage tracking systems

### External System Integration

#### Database Services
- **Phytozome**: Dynamic linking with version detection
- **NCBI Gene**: Direct gene record access
- **Future Databases**: Extensible architecture for new integrations
- **API Endpoints**: RESTful service integration patterns

#### Help and Documentation
- **Context-Sensitive Help**: Fragment-based navigation to help sections
- **Documentation System**: Integration with application help system
- **User Guides**: Links to user documentation and tutorials
- **Support System**: Integration with user support channels

## Troubleshooting

### Common Issues

#### Data Display Problems
- **Missing Data**: Check GeneSymbolReport data completeness
- **Incorrect Filtering**: Verify type property values in gene data
- **Layout Issues**: Test responsive design across different screen sizes
- **Performance**: Monitor for large datasets causing rendering delays

#### External Link Issues
- **Phytozome Links**: Verify version parsing and URL construction
- **NCBI Links**: Check primaryId format and database availability
- **Help Links**: Ensure router configuration includes help routes
- **Fragment Navigation**: Verify help section fragment identifiers

#### Template Rendering Issues
- **Conditional Content**: Check data availability for conditional sections
- **Icon Display**: Verify FontAwesome module imports
- **Styling Problems**: Check CSS grid support and media queries
- **Accessibility**: Test with screen readers and keyboard navigation

### Debugging Strategies

#### Development Tools
- **Angular DevTools**: Component inspection and data debugging
- **Browser Inspector**: DOM structure and CSS debugging
- **Network Tab**: External link validation and request monitoring
- **Console Logging**: Strategic logging for data flow debugging

#### Testing Approaches
- **Unit Tests**: Isolated component testing with mock data
- **Integration Tests**: Full component testing with real data structures
- **Manual Testing**: Cross-browser and device testing
- **Accessibility Testing**: Screen reader and keyboard navigation validation

#### Performance Monitoring
- **Change Detection**: Monitor change detection cycles
- **Memory Usage**: Component memory footprint monitoring
- **Rendering Performance**: Template rendering optimization
- **Bundle Analysis**: Component impact on application bundle size

### Error Handling Patterns

#### Graceful Degradation
- **Null Data Handling**: Safe navigation and fallback values
- **Missing Properties**: Default values and optional content
- **Network Issues**: Fallback behavior for external link failures
- **Browser Compatibility**: Progressive enhancement for modern features

#### User Feedback
- **Error Messages**: Clear messaging for data unavailability
- **Loading States**: Progress indication for data processing
- **Fallback Content**: Meaningful defaults when data is missing
- **Help Integration**: Easy access to help and support resources

This documentation provides a complete reference for developers working with the pgnc-data component, covering all aspects from basic functionality to advanced troubleshooting and future enhancement planning.
