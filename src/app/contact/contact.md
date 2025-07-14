# Contact Directory Documentation

## Overview

The `contact` directory contains the Angular component responsible for displaying contact information for the Plant Gene Nomenclature Committee (PGNC). This standalone component provides users with physical address, email contact, and an embedded Google Maps location for the organization.

## Directory Structure

```
contact/
├── contact.component.ts       # Component logic and configuration
├── contact.component.html     # Template markup with contact information
├── contact.component.css      # Component-specific styles
└── contact.component.spec.ts  # Unit tests
```

## Component Details

### contact.component.ts

**Purpose**: Defines the ContactComponent class and its configuration

**Key Features**:
- **Standalone Component**: Uses Angular's standalone component architecture
- **Minimal Logic**: Simple presentation component with no complex functionality
- **TypeScript**: Strongly typed component definition

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'app-contact',
    standalone: true,
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css',
})
export class ContactComponent { }
```

**Component Properties**:
- `selector`: 'app-contact' - Used to embed the component in templates
- `standalone`: true - Indicates this is a standalone component (Angular 14+)
- `templateUrl`: Points to the HTML template file
- `styleUrl`: Points to the CSS style file

### contact.component.html

**Purpose**: Contains the template markup for the contact page with comprehensive contact information

**Content Structure**:
- **Main Container**: Bootstrap-style container div for layout
- **Page Title**: H1 heading "Contact details"
- **Physical Address**: Complete postal address for PGNC
- **Email Contact**: Direct email link for inquiries
- **Interactive Map**: Embedded Google Maps showing location
- **Additional Information**: Hidden sections for future functionality

**Key Elements**:

#### Contact Information
```html
<div class="container">
    <h1>Contact details</h1>
    <p>
        <strong>Plant Gene Nomenclature Committee (PGNC)</strong><br />
        Department of Haematology<br />
        Long Road,<br />
        Cambridge<br />
        CB2 0PT<br />
        United Kingdom
    </p>
    <p>email: <a href="mailto:hgnc@genenames.org">hgnc&#64;genenames.org</a></p>
</div>
```

#### Interactive Map
```html
<div class="embed-responsive embed-responsive-4by3">
    <iframe
        style="border: 0"
        class="col-md-8"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3..."
        width="100%"
        height="100%">
    </iframe>
</div>
```

**Contact Details**:
- **Organization**: Plant Gene Nomenclature Committee (PGNC)
- **Department**: Department of Haematology
- **Address**: Long Road, Cambridge CB2 0PT, United Kingdom
- **Email**: hgnc@genenames.org (with HTML entity encoding for security)

**Map Integration**:
- **Google Maps Embed**: Interactive map showing PGNC location
- **Responsive Design**: Map adapts to different screen sizes
- **Security**: Uses HTTPS for secure map loading
- **Accessibility**: Properly structured for screen readers

**Hidden Features** (for future implementation):
- **Feedback Form Link**: Reference to future feedback functionality
- **Gene Symbol Request**: Link to gene symbol request form
- **Currently Hidden**: Using `style="display: none"` for future activation

### contact.component.css

**Purpose**: Component-specific styling for contact page layout

**Styles**:
```css
.embed-responsive {
    height: 500px;
}
```

**Styling Features**:
- **Map Container**: Fixed height for consistent map display
- **Responsive Design**: Map adapts to container width
- **Bootstrap Integration**: Works with Bootstrap responsive utilities

**Layout Considerations**:
- **Fixed Height**: 500px height ensures consistent map display
- **Responsive Width**: Map uses 100% width within container
- **Bootstrap Classes**: Leverages Bootstrap's responsive grid system

### contact.component.spec.ts

**Purpose**: Comprehensive unit tests for the ContactComponent

**Test Categories**:

#### 1. Component Creation Tests
- **Component Creation**: Verifies component instantiates successfully
- **Standalone Component**: Confirms component is properly configured as standalone
- **Selector Validation**: Ensures correct component selector functionality

#### 2. Template Structure Tests
- **Container Rendering**: Verifies main container element exists with correct class
- **Heading Display**: Checks H1 element displays "Contact details"
- **Content Validation**: Ensures all contact information is properly rendered

#### 3. Contact Information Tests
- **Address Display**: Validates complete postal address rendering
- **Email Link**: Verifies email link functionality and proper encoding
- **Organization Name**: Checks PGNC name display with proper formatting

#### 4. Map Integration Tests
- **Map Container**: Verifies map container exists with correct classes
- **Iframe Element**: Checks Google Maps iframe is properly embedded
- **Responsive Design**: Tests responsive map container functionality

**Test Structure**:
```typescript
describe('ContactComponent', () => {
    let component: ContactComponent;
    let fixture: ComponentFixture<ContactComponent>;
    let compiled: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ContactComponent]
        }).compileComponents();
        // Setup component and fixture
    });

    describe('Component Creation', () => {
        // Component instantiation tests
    });

    describe('Template Structure', () => {
        // Template and DOM structure tests
    });

    describe('Contact Information', () => {
        // Contact details validation tests
    });

    describe('Map Integration', () => {
        // Google Maps embedding tests
    });
});
```

## Functionality

### User Experience
The Contact component provides users with:
- **Complete Contact Information**: Physical address and email contact
- **Visual Location**: Interactive Google Maps showing exact location
- **Professional Presentation**: Clean, organized display of contact details
- **Accessibility**: Screen reader friendly contact information

### Contact Methods
- **Email**: Direct mailto link for immediate contact
- **Physical Mail**: Complete postal address for formal correspondence
- **Location**: Visual map for visitors and meeting arrangements

### Future Functionality
The component includes hidden elements for future features:
- **Feedback Form**: Dedicated feedback submission system
- **Gene Symbol Requests**: Specialized form for nomenclature requests
- **Enhanced Contact Options**: Additional communication channels

## Technical Specifications

### Dependencies
- **Angular Core**: Required for component functionality
- **Angular Testing**: Required for unit tests
- **Google Maps**: External service for map embedding
- **Bootstrap**: CSS framework for responsive layout

### External Integrations
- **Google Maps Embed API**: For interactive location display
- **Email Client Integration**: Mailto links for direct email contact
- **Browser Compatibility**: Works across all modern browsers

### Security Considerations
- **Email Encoding**: HTML entity encoding for email addresses
- **HTTPS**: Secure map loading from Google Maps
- **Cross-Origin**: Proper iframe security attributes
- **Content Security**: Safe external content embedding

## Development Guidelines

### Code Style
- **TypeScript Strict Mode**: Uses strict TypeScript compilation
- **Angular Style Guide**: Follows official Angular style guidelines
- **Semantic HTML**: Uses proper HTML5 semantic elements
- **Accessibility**: WCAG compliant markup structure

### Content Management
- **Static Content**: Contact information is statically defined
- **Version Control**: Content changes tracked through Git
- **Update Process**: Contact information updates require code deployment

### Responsive Design
- **Bootstrap Framework**: Uses Bootstrap responsive utilities
- **Mobile-First**: Designed for mobile and desktop compatibility
- **Map Responsiveness**: Google Maps adapts to screen size
- **Touch-Friendly**: Appropriate for touch interface interaction

## Maintenance and Updates

### Content Updates
- **Address Changes**: Update postal address when organization moves
- **Email Updates**: Modify email addresses as contact methods change
- **Map Updates**: Refresh Google Maps embed code if location changes
- **Additional Contacts**: Add new contact methods as needed

### Technical Maintenance
- **Angular Updates**: Keep component compatible with Angular framework updates
- **Map API**: Monitor Google Maps embed API for changes
- **Accessibility**: Regular accessibility audits and improvements
- **Performance**: Optimize map loading and component performance

### Future Enhancements
- **Contact Forms**: Implement interactive contact forms
- **Multiple Locations**: Support for multiple office locations
- **Social Media**: Add social media contact links
- **Phone Contact**: Include phone numbers if available
- **Office Hours**: Display operating hours and availability

## Integration Points

### Application Integration
- **Routing**: Integrated with Angular Router for navigation
- **Layout**: Uses application-wide layout and styling
- **Navigation**: Appears in main site navigation menu
- **Footer Links**: May be linked from footer contact information

### External Service Integration
- **Google Maps**: Embedded Google Maps for location display
- **Email Clients**: Integration with user's default email client
- **Address Services**: Potential integration with mapping services

## Performance Considerations

### Loading Performance
- **Lightweight Component**: Minimal JavaScript footprint
- **Map Loading**: Google Maps loaded asynchronously
- **Image Optimization**: No large images to optimize
- **CSS Efficiency**: Minimal custom CSS for fast rendering

### User Experience Performance
- **Fast Rendering**: Static content renders immediately
- **Progressive Enhancement**: Core content available without JavaScript
- **Responsive Layout**: Quick adaptation to different screen sizes
- **Smooth Scrolling**: Compatible with page navigation systems

## Accessibility Features

### Screen Reader Support
- **Semantic Markup**: Proper heading hierarchy and content structure
- **Alt Text**: Descriptive text for map iframe
- **Link Descriptions**: Clear link purposes for email contacts
- **Landmark Regions**: Proper use of HTML landmarks

### Keyboard Navigation
- **Tab Order**: Logical tab sequence through content
- **Link Access**: Email links accessible via keyboard
- **Map Navigation**: Google Maps supports keyboard navigation
- **Focus Management**: Proper focus indicators for interactive elements

## Troubleshooting

### Common Issues

#### Map Display Issues
- **Loading Problems**: Check Google Maps API availability
- **Responsive Issues**: Verify CSS media queries and Bootstrap classes
- **Content Security**: Ensure iframe security policies allow Google Maps
- **Performance**: Monitor map loading impact on page performance

#### Contact Information Issues
- **Email Links**: Verify mailto links work across different email clients
- **Address Accuracy**: Ensure postal address is current and accurate
- **Encoding Issues**: Check HTML entity encoding displays correctly
- **Browser Compatibility**: Test across different browsers and devices

#### Layout Issues
- **Container Sizing**: Verify Bootstrap container classes work correctly
- **Mobile Display**: Test responsive layout on various device sizes
- **Content Overflow**: Ensure content fits properly in containers
- **Cross-Browser**: Check styling consistency across browsers

### Debugging Tips
- **Console Inspection**: Use browser developer tools for DOM inspection
- **Network Monitoring**: Check Google Maps API requests in network tab
- **CSS Debugging**: Use developer tools to debug responsive layout issues
- **Accessibility Testing**: Use screen reader testing tools for accessibility validation

This documentation provides a complete overview of the contact directory, its component functionality, and guidelines for maintenance and enhancement within the PGNC application.
