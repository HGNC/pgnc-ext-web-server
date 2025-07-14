# License Directory Documentation

## Overview

The License directory contains the LicenseComponent responsible for presenting PGNC's licensing information, attribution guidelines, and usage terms to users. This component serves as a critical legal and informational resource, explaining the Creative Commons Public Domain (CC0) license under which PGNC data is released, providing attribution recommendations, and offering contact information for licensing questions.

## Component Architecture

### Core Component
- **LicenseComponent** (`license.component.ts`): Simple presentation component for licensing information display

### Directory Structure
```
license/
├── license.component.ts                    # Main license information component
├── license.component.html                  # License content template with CC0 details
├── license.component.css                   # License page styling and typography
└── license.component.spec.ts               # Comprehensive license component tests
```

## Functionality

### License Component

#### Purpose
The LicenseComponent provides comprehensive information about PGNC's licensing terms, attribution guidelines, and usage permissions, ensuring users understand their rights and responsibilities when using PGNC data.

#### Key Features
- **Open License Communication**: Clear explanation of Creative Commons CC0 license
- **Attribution Guidelines**: Recommended citation format and attribution practices
- **Legal Clarity**: Straightforward language explaining usage rights
- **Contact Information**: Direct access to PGNC team for licensing questions
- **Academic Integration**: Proper citation format for research publications

#### Implementation
```typescript
@Component({
    selector: 'app-license',
    imports: [],
    templateUrl: './license.component.html',
    styleUrl: './license.component.css',
})
export class LicenseComponent {}
```

**Component Characteristics**:
- **Standalone Component**: Modern Angular standalone architecture
- **No Dependencies**: Simple presentation component without external dependencies
- **No State Management**: Static content component requiring no internal state
- **Minimal Logic**: Pure presentation component focused on content display

## Content Structure

### License Information Section

#### Creative Commons CC0 License
The component prominently features PGNC's commitment to open data access:

```html
<p>
    The Plant Gene Nomenclature Committee (PGNC) wants to ensure that our information is
    accessible to the public and free to use, for this reason all data is released under the
    <a href="https://creativecommons.org/publicdomain/zero/1.0/legalcode.en">Creative Commons Public Domain (CC0)
        License</a>. This means that <strong>any form of reuse of the content is permitted</strong>.
</p>
```

**Key Features**:
- **Clear Statement**: Unambiguous declaration of open access commitment
- **Direct Links**: Links to official Creative Commons CC0 legal documentation
- **Emphasis**: Bold text highlighting unlimited reuse permissions
- **Educational Resources**: Links to Creative Commons FAQ for additional information

#### Legal Framework
- **CC0 License**: Public domain dedication allowing unlimited reuse
- **No Restrictions**: Explicit statement that any form of reuse is permitted
- **Legal Documentation**: Direct links to official Creative Commons legal text
- **FAQ Resources**: Additional educational resources for license understanding

### Attribution Guidelines Section

#### Recommended Citation
The component provides a comprehensive citation format for academic and professional use:

```html
<blockquote>
    <cite>Towards an official gene nomenclature for <em>Populus trichocarpa</em></cite>
    <footer>
        <a href="https://orcid.org/0000-0003-1818-8243">Susan Tweedie</a>,
        <a href="https://orcid.org/0000-0001-9246-8193">Stanton Martin</a>,
        <a href="https://orcid.org/0000-0002-8380-5247">Elspeth A Bruford</a>
    </footer>
    <footer>Tree Physiology 2025 May 09</footer>
    <p class="links">
        <span>DOI: </span>
        <a href="https://doi.org/10.1093/treephys/tpaf054" target="_blank">
            https://doi.org/10.1093/treephys/tpaf054
        </a>
    </p>
</blockquote>
```

**Citation Features**:
- **Academic Format**: Proper academic citation structure with authors, title, and publication details
- **ORCID Integration**: Author ORCID IDs for academic identification and verification
- **DOI Links**: Direct links to published research with persistent identifiers
- **Publication Details**: Complete bibliographic information including journal and date
- **Visual Formatting**: Blockquote styling for clear visual distinction

#### Attribution Benefits
- **Usage Tracking**: Helps PGNC understand how resources are being used
- **Funding Support**: Attribution assists in securing continued funding for development
- **Research Recognition**: Proper academic credit for PGNC research and development
- **Community Building**: Builds connections within the research community

### Contact and Support Section

#### Questions and Support
```html
<h2>Questions?</h2>
<p>
    Please view the <a href="https://creativecommons.org/faq/">Creative Commons FAQ</a> page or
    contact the
    <a href="mailto:hgnc@genenames.org?subject=PGNC%20CC%20licensing%20%26%20attribution">PGNC</a>
    if you have any questions about the license or attribution.
</p>
```

**Support Resources**:
- **FAQ Access**: Direct link to Creative Commons frequently asked questions
- **Email Contact**: Direct email link with pre-filled subject line for licensing questions
- **Subject Pre-population**: Email subject automatically includes licensing context
- **Dual Support**: Both Creative Commons and PGNC contact options

## Technical Implementation

### Component Structure

#### Minimal Architecture
```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'app-license',
    imports: [],
    templateUrl: './license.component.html',
    styleUrl: './license.component.css',
})
export class LicenseComponent {}
```

**Technical Features**:
- **No Imports**: Self-contained component without external dependencies
- **Standalone Design**: Modern Angular standalone component architecture
- **Static Content**: No dynamic content or state management requirements
- **Simple Selector**: Clear, descriptive component selector

#### Template Organization
```html
<div class="container">
    <h1>License</h1>
    <!-- License explanation section -->
    <h2>Attribution</h2>
    <!-- Citation and attribution guidelines -->
    <h2>Questions?</h2>
    <!-- Contact and support information -->
</div>
```

**Content Structure**:
- **Container Layout**: Bootstrap-compatible container for consistent page layout
- **Hierarchical Headers**: Clear heading structure for content organization
- **Logical Flow**: License → Attribution → Questions progression
- **Semantic HTML**: Proper use of headings, paragraphs, and semantic elements

### Styling Implementation

#### Typography and Layout
```css
blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
}

cite {
    font-style: normal;
}
```

**Visual Design**:
- **Blockquote Styling**: Left border and padding for citation emphasis
- **Typography Hierarchy**: Larger font size for citation prominence
- **Clean Margins**: Consistent spacing for readable layout
- **Citation Formatting**: Normal font style for title emphasis

#### Content Formatting
```css
blockquote .small,
blockquote footer,
blockquote small {
    display: block;
    font-size: 80%;
    line-height: 1.42857143;
    color: #777;
}

blockquote .links {
    font-size: 80%;
    margin-top: 10px;
}
```

**Typography Features**:
- **Hierarchical Sizing**: Smaller font sizes for attribution details
- **Color Distinction**: Gray color for secondary information
- **Line Height**: Optimal line height for readability
- **Link Formatting**: Consistent styling for DOI and external links

## Testing Strategy

### Component Testing Approach

#### Basic Component Testing
```typescript
describe('Component Creation', () => {
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be an instance of LicenseComponent', () => {
        expect(component).toBeInstanceOf(LicenseComponent);
    });

    it('should be a standalone component', () => {
        expect(LicenseComponent.prototype.constructor).toBeDefined();
    });
});
```

#### Template Structure Testing
```typescript
describe('Template Structure', () => {
    it('should render the main container', () => {
        const container = debugElement.query(By.css('.container'));
        expect(container).toBeTruthy();
    });
});
```

**Testing Areas**:
- **Component Creation**: Basic instantiation and type validation
- **Template Rendering**: DOM structure and element presence verification
- **Content Validation**: License text and attribution information accuracy
- **Link Functionality**: External link validation and accessibility
- **Styling Application**: CSS class application and visual presentation

### Content Validation Testing

#### License Information Testing
- **CC0 License**: Verification of correct Creative Commons license information
- **Legal Links**: Validation of links to official Creative Commons documentation
- **Attribution Guidelines**: Testing of citation format and ORCID link functionality
- **Contact Information**: Email link validation and subject line pre-population

#### Accessibility Testing
- **Heading Structure**: Proper heading hierarchy for screen readers
- **Link Descriptions**: Meaningful link text and descriptions
- **Semantic Markup**: Proper use of semantic HTML elements
- **Color Contrast**: Sufficient color contrast for text readability

## Integration Points

### Application Integration

#### Navigation Integration
- **Footer Links**: Accessible from footer navigation throughout application
- **Legal Pages**: Part of legal and informational page collection
- **About Section**: Related to general application information
- **Help System**: Supports user understanding of data usage rights

#### Content Management
- **Static Content**: Self-contained licensing information
- **Legal Compliance**: Ensures application meets open data requirements
- **Attribution Standards**: Provides consistent citation guidelines
- **User Education**: Helps users understand their rights and responsibilities

### External Service Integration

#### Creative Commons Integration
- **CC0 License**: Official Creative Commons Public Domain license
- **Legal Documentation**: Links to authoritative Creative Commons legal text
- **FAQ Resources**: Integration with Creative Commons educational materials
- **Standards Compliance**: Adherence to Creative Commons best practices

#### Academic Integration
- **ORCID System**: Integration with ORCID author identification system
- **DOI System**: Links to persistent digital object identifiers
- **Citation Standards**: Academic citation format compliance
- **Research Community**: Connection to broader research ecosystem

## Legal and Compliance Considerations

### License Compliance

#### Creative Commons CC0
- **Public Domain**: Dedication of work to public domain
- **No Rights Reserved**: Waiver of copyright and related rights
- **Universal Application**: License applies globally and permanently
- **Legal Certainty**: Clear legal framework for data reuse

#### Data Usage Rights
- **Unlimited Reuse**: Any form of content reuse is explicitly permitted
- **No Attribution Required**: Attribution is recommended but not mandatory
- **Commercial Use**: Commercial applications are explicitly allowed
- **Derivative Works**: Modification and derivative works are permitted

### Attribution Guidelines

#### Recommended Practices
- **Citation Format**: Specific citation format for academic publications
- **Author Recognition**: Proper credit to PGNC researchers and contributors
- **ORCID Integration**: Use of ORCID IDs for author identification
- **DOI References**: Persistent identifier usage for reliable citation

#### Community Benefits
- **Usage Tracking**: Understanding of how PGNC resources are utilized
- **Funding Support**: Attribution helps justify continued funding
- **Research Network**: Building connections within research community
- **Quality Assurance**: Feedback loop for resource improvement

## User Experience Features

### Information Accessibility

#### Clear Communication
- **Plain Language**: Legal information presented in accessible language
- **Visual Hierarchy**: Clear content organization with appropriate headings
- **Prominent Links**: Easy access to detailed legal documentation
- **Contact Support**: Direct access to PGNC team for questions

#### Educational Resources
- **License Explanation**: Clear explanation of what CC0 license means
- **Usage Examples**: Implicit examples of permitted usage
- **Attribution Benefits**: Explanation of why attribution is beneficial
- **External Resources**: Links to additional educational materials

### Professional Presentation

#### Academic Standards
- **Proper Citation**: Complete academic citation with all required elements
- **Author Identification**: ORCID IDs for reliable author identification
- **Publication Details**: Complete bibliographic information
- **Persistent Links**: DOI links for reliable long-term access

#### Visual Design
- **Professional Layout**: Clean, academic appearance appropriate for research context
- **Typography**: Readable fonts and appropriate sizing
- **Emphasis**: Strategic use of bold text for key concepts
- **Citation Formatting**: Blockquote styling for citation prominence

## Maintenance and Updates

### Content Management

#### Legal Information Updates
- **License Changes**: Process for updating license information if needed
- **Link Maintenance**: Regular validation of external links
- **Citation Updates**: Updates to citation information and publication details
- **Contact Information**: Maintenance of current contact details

#### Compliance Monitoring
- **Legal Review**: Regular review of licensing information accuracy
- **Standards Compliance**: Ensuring continued compliance with Creative Commons standards
- **Academic Standards**: Maintaining proper academic citation formats
- **Link Validation**: Regular checking of external link functionality

### Technical Maintenance

#### Component Updates
- **Angular Compatibility**: Maintaining compatibility with Angular framework updates
- **Dependency Management**: Minimal dependencies reduce maintenance overhead
- **Testing Updates**: Maintaining test coverage and accuracy
- **Performance Optimization**: Ensuring optimal component performance

#### Content Delivery
- **Loading Performance**: Optimizing content delivery and rendering
- **Accessibility Compliance**: Maintaining accessibility standards
- **Mobile Experience**: Ensuring proper mobile device presentation
- **Cross-Browser Support**: Consistent presentation across different browsers

## Future Enhancements

### Planned Improvements

#### Enhanced Legal Information
- **Multi-Language Support**: Translation of licensing information
- **Interactive Elements**: Interactive license selection tools
- **Usage Examples**: Specific examples of permitted and recommended usage
- **Legal Updates**: Process for communicating license changes

#### User Experience Enhancements
- **Copy-Paste Citations**: Easy-to-copy citation formats
- **Download Options**: Downloadable citation formats (BibTeX, RIS, etc.)
- **Attribution Tracking**: Optional attribution tracking for users
- **Feedback System**: User feedback on licensing clarity and usefulness

#### Integration Improvements
- **Citation Management**: Integration with citation management tools
- **API Documentation**: Programmatic access to licensing information
- **Automated Attribution**: Tools for automatic attribution generation
- **Usage Analytics**: Analytics on licensing page usage and user needs

### Long-term Vision

#### Community Engagement
- **User Education**: Enhanced educational resources about open data
- **Best Practices**: Guidelines for open science and data sharing
- **Community Examples**: Showcase of how PGNC data is being used
- **Collaboration Tools**: Tools for community collaboration and sharing

#### Legal Evolution
- **License Monitoring**: Tracking of Creative Commons license evolution
- **Legal Consultation**: Regular legal review and consultation
- **International Compliance**: Ensuring global legal compliance
- **Policy Development**: Contribution to open data policy development

## Troubleshooting

### Common Issues

#### Content Display Problems
- **Link Functionality**: External links not working or redirecting incorrectly
- **Citation Formatting**: Citation display issues or formatting problems
- **Mobile Display**: Content not displaying properly on mobile devices
- **Accessibility Issues**: Screen reader or keyboard navigation problems

#### Legal Questions
- **License Interpretation**: User questions about license meaning and application
- **Attribution Requirements**: Confusion about attribution recommendations
- **Commercial Use**: Questions about commercial usage rights
- **International Law**: Questions about license application in different jurisdictions

### Support Resources

#### User Support
- **FAQ Integration**: Connection to Creative Commons FAQ resources
- **Direct Contact**: Email contact with PGNC team for specific questions
- **Documentation**: Clear documentation of licensing terms and attribution
- **Community Support**: Connection to broader open data community

#### Technical Support
- **Component Debugging**: Debugging tools and techniques for component issues
- **Link Validation**: Tools for checking external link functionality
- **Accessibility Testing**: Tools for testing accessibility compliance
- **Performance Monitoring**: Monitoring component performance and loading times

### Error Handling

#### Graceful Degradation
- **Link Failures**: Fallback behavior when external links are unavailable
- **Content Loading**: Ensure core content displays even with CSS failures
- **Contact Form**: Alternative contact methods if email links fail
- **Resource Access**: Alternative access to licensing documentation

#### User Guidance
- **Clear Messaging**: Clear error messages for any functionality issues
- **Alternative Resources**: Alternative sources for licensing information
- **Support Access**: Easy access to support and help resources
- **Recovery Options**: Clear paths for users to continue their workflow

This comprehensive license system provides users with clear, accessible information about their rights and responsibilities when using PGNC data, while maintaining compliance with open data standards and supporting the broader research community through proper attribution and citation practices.
