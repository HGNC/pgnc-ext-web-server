# Footer Component Documentation

## Overview

The Footer component serves as the main footer container for the PGNC application, providing a structured three-section layout that encompasses grant acknowledgments, navigation menu, and legal information. This component orchestrates multiple child components to deliver a comprehensive footer experience that includes institutional partnerships, site navigation, and compliance information.

## Component Architecture

### Core Component
- **FooterComponent** (`footer.component.ts`): Main container component that imports and organizes three primary child components in a structured layout.

### Child Components Structure
```
footer/
├── footer.component.* (Main container)
├── grant-notice/
│   └── grant-notice.component.* (U.S. Department of Energy funding acknowledgment)
├── legal/
│   ├── legal.component.* (Legal information container)
│   ├── associates/ (Institutional partner logos and links)
│   └── licence/ (License information)
└── menu/
    ├── menu.component.* (Navigation menu with site links)
    ├── cpright/ (Copyright notice)
    └── social-media/ (Social media links)
```

## Functionality

### Layout Structure
The footer follows a three-tier vertical layout:

1. **Footer Top** (`.footer-top`):
   - Contains grant acknowledgment information
   - Displays U.S. Department of Energy funding notice
   - Distinguished by a 6px solid border top

2. **Footer Middle** (`.footer-middle`):
   - Houses the main navigation menu
   - Includes PGNC logo and home link
   - Organized into four column sections:
     - Gene data (search functionality)
     - More (about, license, publications, help)
     - Downloads (GitHub repository links)
     - Contact us (contact details and feedback)
   - Features social media links
   - Contains copyright notice

3. **Footer Bottom** (`.footer-bottom`):
   - Displays legal information
   - Shows institutional associate logos and links
   - Includes license information

### Key Features

#### Navigation Integration
- **Router Integration**: Extensive use of Angular Router for internal navigation
- **External Links**: Direct links to partner institutions and social media
- **Home Navigation**: Dedicated home link with PGNC logo and FontAwesome icon

#### Institutional Partnerships
- **U.S. Department of Energy**: Funding acknowledgment with Award Number DE-AC05-00OR22725
- **Partner Organizations**:
  - Center for Bioenergy Innovation (CBI)
  - University of Cambridge
  - Hugo Genome Nomenclature Committee (HGNC)

#### Social Media Presence
- **Platforms**: Bluesky, X (Twitter), GitHub, YouTube, Blog, Feedback
- **Icon Implementation**: FontAwesome icons for consistent visual presentation

#### Copyright and Legal
- **Copyright Notice**: Current year copyright with FontAwesome copyright symbol
- **License Information**: Dedicated license component
- **Legal Compliance**: Structured legal information presentation

## Technical Implementation

### Dependencies
```typescript
// Core Angular
import { Component } from '@angular/core';

// Child Components
import { GrantNoticeComponent } from './grant-notice/grant-notice.component';
import { LegalComponent } from './legal/legal.component';
import { MenuComponent } from './menu/menu.component';
```

### Template Structure
```html
<footer id="footer">
    <div class="footer-top">
        <app-grant-notice />
    </div>
    <div class="footer-middle">
        <app-footer-menu />
    </div>
    <div class="footer-bottom">
        <app-legal />
    </div>
</footer>
```

### Styling Approach
- **Color Scheme**: Light gray background (`#dee0e2`) with dark gray text (`#454a4c`)
- **Visual Hierarchy**: Border and margin spacing to distinguish sections
- **Responsive Design**: Bootstrap grid system implementation in child components

## Child Component Integration

### Grant Notice Component
- **Purpose**: U.S. Department of Energy funding acknowledgment
- **Implementation**: Simple display component with funding information
- **Layout**: Full-width container with centered text

### Menu Component
- **Purpose**: Primary navigation and social media integration
- **Features**:
  - PGNC logo with home navigation
  - Four-column navigation structure
  - Gene data search access
  - External downloads link
  - Social media integration
  - Copyright notice
- **Dependencies**: RouterLink, FontAwesome, child components (CpRightComponent, SocialMediaComponent)

### Legal Component
- **Purpose**: Legal information and institutional partnerships
- **Structure**: Container for associates and licence components
- **Features**:
  - Partner organization logos with external links
  - License information display
  - Institutional relationship representation

## Testing Strategy

### Component Testing
- **Creation Tests**: Component instantiation and definition validation
- **Template Tests**: Footer structure and section presence verification
- **Child Component Tests**: Integration testing for all child components
- **Router Integration**: Navigation functionality testing

### Test Configuration
```typescript
beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [FooterComponent],
        providers: [provideRouter([])]
    }).compileComponents();
});
```

## Integration Points

### Application Integration
- **Global Footer**: Included in main application layout
- **Router Dependency**: Requires Angular Router for navigation functionality
- **External Services**: Links to external partner websites and social media

### Cross-Component Communication
- **Self-Contained**: No external data dependencies
- **Static Content**: All footer content is template-based
- **Navigation Service**: Utilizes Angular Router for internal navigation

## Development Guidelines

### Adding New Links
1. Update appropriate child component template
2. Add router configuration if internal link
3. Test navigation functionality
4. Update tests to cover new functionality

### Styling Modifications
1. Follow existing color scheme and spacing patterns
2. Maintain responsive design principles
3. Test across different screen sizes
4. Update child component styles as needed

### Content Updates
1. Modify child component templates for content changes
2. Update partner logos in associates component
3. Maintain consistent formatting and accessibility
4. Test external link functionality

## Accessibility Considerations

- **Alt Text**: Comprehensive alt text for all logos and images
- **Semantic HTML**: Proper use of footer element and navigation structure
- **Link Descriptions**: Clear and descriptive link text
- **Icon Labels**: FontAwesome icons with appropriate aria labels
- **Keyboard Navigation**: Full keyboard accessibility for all interactive elements

This footer system provides a comprehensive and well-structured conclusion to the PGNC application, effectively communicating institutional relationships, providing navigation assistance, and ensuring legal compliance while maintaining a professional and accessible user experience.
