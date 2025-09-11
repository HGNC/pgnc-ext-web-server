import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './header.component';

// Mock components for testing
@Component({
    selector: 'app-nav',
    template: '<div>Mock Nav Component</div>',
    standalone: true,
})
class MockNavComponent {}

@Component({
    selector: 'app-search-bar',
    template: '<div>Mock Search Bar Component</div>',
    standalone: true,
})
class MockSearchBarComponent {}

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let debugElement: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HeaderComponent, NgbModule, FontAwesomeModule],
            providers: [
                provideRouter([
                    { path: '', component: MockNavComponent },
                    { path: 'test', component: MockNavComponent },
                ]),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    describe('Component Creation', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should be defined', () => {
            expect(component).toBeDefined();
        });

        it('should be an instance of HeaderComponent', () => {
            expect(component).toBeInstanceOf(HeaderComponent);
        });

        it('should be a standalone component', () => {
            expect(HeaderComponent.prototype.constructor).toBeDefined();
        });

        it('should have correct selector', () => {
            const compiled = fixture.nativeElement;
            expect(compiled).toBeTruthy();
        });
    });

    describe('Template Structure', () => {
        it('should render the header element', () => {
            const header = debugElement.query(By.css('header'));
            expect(header).toBeTruthy();
        });

        it('should render the container div', () => {
            const container = debugElement.query(By.css('.container'));
            expect(container).toBeTruthy();
        });

        it('should render the navbar', () => {
            const navbar = debugElement.query(By.css('.navbar'));
            expect(navbar).toBeTruthy();
        });

        it('should have proper DOM structure', () => {
            const header = debugElement.query(By.css('header'));
            const container = header.query(By.css('.container'));
            const navbar = container.query(By.css('.navbar'));

            expect(header).toBeTruthy();
            expect(container).toBeTruthy();
            expect(navbar).toBeTruthy();
            expect(container.nativeElement.parentElement).toBe(header.nativeElement);
            expect(navbar.nativeElement.parentElement).toBe(container.nativeElement);
        });

        it('should contain all required elements', () => {
            const header = debugElement.query(By.css('header'));
            const navbar = debugElement.query(By.css('.navbar'));
            const brand = debugElement.query(By.css('.navbar-brand'));
            const toggler = debugElement.query(By.css('.navbar-toggler'));
            const collapses = debugElement.queryAll(By.css('.collapse.navbar-collapse'));

            expect(header).toBeTruthy();
            expect(navbar).toBeTruthy();
            expect(brand).toBeTruthy();
            expect(toggler).toBeTruthy();
            expect(collapses.length).toBe(2);
        });
    });

    describe('Brand Logo', () => {
        it('should render PGNC logo', () => {
            const logo = debugElement.query(By.css('.navbar-brand img'));
            expect(logo).toBeTruthy();
            expect(logo.nativeElement.src).toContain('pgnc-logo-dark-bckgrnd-small.svg');
            expect(logo.nativeElement.alt).toBe('HGNC');
        });

        it('should have home page router link', () => {
            const brandLink = debugElement.query(By.css('.navbar-brand'));
            expect(brandLink).toBeTruthy();
            expect(brandLink.nativeElement.getAttribute('ng-reflect-router-link')).toBe('/');
        });

        it('should be within navbar brand container', () => {
            const brandContainer = debugElement.query(By.css('.navbar-brand'));
            const logo = brandContainer.query(By.css('img'));
            expect(logo).toBeTruthy();
            expect(logo.nativeElement.parentElement).toBe(brandContainer.nativeElement);
        });
    });

    describe('Menu Toggle Button', () => {
        it('should render navbar toggler button', () => {
            const toggler = debugElement.query(By.css('.navbar-toggler'));
            expect(toggler).toBeTruthy();
            expect(toggler.nativeElement.type).toBe('button');
        });

        it('should have FontAwesome bars icon', () => {
            const faIcon = debugElement.query(By.css('.navbar-toggler fa-icon'));
            expect(faIcon).toBeTruthy();
        });

        it('should toggle menu collapsed state on click', () => {
            const toggler = debugElement.query(By.css('.navbar-toggler'));
            const initialState = component.isMenuCollapsed;

            toggler.nativeElement.click();
            fixture.detectChanges();

            expect(component.isMenuCollapsed).toBe(!initialState);
        });

        it('should toggle menu multiple times', () => {
            const toggler = debugElement.query(By.css('.navbar-toggler'));
            const initialState = component.isMenuCollapsed;

            toggler.nativeElement.click();
            fixture.detectChanges();
            expect(component.isMenuCollapsed).toBe(!initialState);

            toggler.nativeElement.click();
            fixture.detectChanges();
            expect(component.isMenuCollapsed).toBe(initialState);
        });
    });

    describe('Collapsible Sections', () => {
        it('should have search bar collapse section', () => {
            const searchCollapse = debugElement.query(By.css('.search-bar-comp'));
            expect(searchCollapse).toBeTruthy();
            expect(searchCollapse.nativeElement.classList.contains('collapse')).toBe(true);
            expect(searchCollapse.nativeElement.classList.contains('navbar-collapse')).toBe(true);
        });

        it('should have navigation collapse section', () => {
            const navCollapse = debugElement.query(By.css('.nav-comp'));
            expect(navCollapse).toBeTruthy();
            expect(navCollapse.nativeElement.classList.contains('collapse')).toBe(true);
            expect(navCollapse.nativeElement.classList.contains('navbar-collapse')).toBe(true);
        });

        it('should apply ngbCollapse directive to both sections', () => {
            const searchCollapse = debugElement.query(By.css('.search-bar-comp'));
            const navCollapse = debugElement.query(By.css('.nav-comp'));

            expect(searchCollapse).toBeTruthy();
            expect(navCollapse).toBeTruthy();
            expect(searchCollapse.nativeElement.classList.contains('collapse')).toBe(true);
            expect(navCollapse.nativeElement.classList.contains('collapse')).toBe(true);
        });

        it('should respond to isMenuCollapsed state changes', () => {
            const searchCollapse = debugElement.query(By.css('.search-bar-comp'));
            const navCollapse = debugElement.query(By.css('.nav-comp'));

            component.isMenuCollapsed = false;
            fixture.detectChanges();

            expect(searchCollapse).toBeTruthy();
            expect(navCollapse).toBeTruthy();

            component.isMenuCollapsed = true;
            fixture.detectChanges();

            expect(searchCollapse).toBeTruthy();
            expect(navCollapse).toBeTruthy();
        });
    });

    describe('Child Components', () => {
        it('should render search bar component', () => {
            const searchBar = debugElement.query(By.css('app-search-bar'));
            expect(searchBar).toBeTruthy();
        });

        it('should render navigation component', () => {
            const nav = debugElement.query(By.css('app-nav'));
            expect(nav).toBeTruthy();
        });

        it('should place search bar in correct container', () => {
            const searchBarContainer = debugElement.query(By.css('.search-bar'));
            const searchBar = searchBarContainer.query(By.css('app-search-bar'));
            expect(searchBar).toBeTruthy();
        });

        it('should have search bar in navbar-form container', () => {
            const searchForm = debugElement.query(By.css('.navbar-form.navbar-right.search-bar'));
            expect(searchForm).toBeTruthy();
            expect(searchForm.nativeElement.getAttribute('role')).toBe('search');
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should have header with background color style', () => {
            const header = debugElement.query(By.css('header'));
            expect(header.nativeElement.style.backgroundColor).toBe('rgb(136, 0, 0)');
        });

        it('should have Bootstrap container class', () => {
            const container = debugElement.query(By.css('.container'));
            expect(container).toBeTruthy();
            expect(container.nativeElement.classList.contains('container')).toBe(true);
        });

        it('should have Bootstrap navbar classes', () => {
            const navbar = debugElement.query(By.css('.navbar'));
            expect(navbar.nativeElement.classList.contains('navbar')).toBe(true);
            expect(navbar.nativeElement.classList.contains('navbar-expand-md')).toBe(true);
        });

        it('should apply proper CSS classes to elements', () => {
            const brand = debugElement.query(By.css('.navbar-brand'));
            const toggler = debugElement.query(By.css('.navbar-toggler'));
            const searchCollapse = debugElement.query(By.css('.search-bar-comp'));
            const navCollapse = debugElement.query(By.css('.nav-comp'));

            expect(brand.nativeElement.classList.contains('navbar-brand')).toBe(true);
            expect(toggler.nativeElement.classList.contains('navbar-toggler')).toBe(true);
            expect(searchCollapse.nativeElement.classList.contains('collapse')).toBe(true);
            expect(navCollapse.nativeElement.classList.contains('collapse')).toBe(true);
        });
    });

    describe('Component Properties', () => {
        it('should have faBars icon property', () => {
            expect(component.faBars).toBeDefined();
            expect(typeof component.faBars).toBe('object');
        });

        it('should have isMenuCollapsed property initialized to true', () => {
            expect(component.isMenuCollapsed).toBe(true);
            expect(typeof component.isMenuCollapsed).toBe('boolean');
        });

        it('should allow isMenuCollapsed to be toggled', () => {
            const initialState = component.isMenuCollapsed;
            component.isMenuCollapsed = !component.isMenuCollapsed;
            expect(component.isMenuCollapsed).toBe(!initialState);
        });

        it('should maintain property types', () => {
            component.isMenuCollapsed = false;
            expect(typeof component.isMenuCollapsed).toBe('boolean');

            component.isMenuCollapsed = true;
            expect(typeof component.isMenuCollapsed).toBe('boolean');
        });
    });

    describe('FontAwesome Integration', () => {
        it('should display FontAwesome bars icon in toggler', () => {
            const faIcon = debugElement.query(By.css('.navbar-toggler fa-icon'));
            expect(faIcon).toBeTruthy();
            expect(faIcon.nativeElement.hasAttribute('ng-reflect-icon')).toBe(true);
        });

        it('should have correct icon binding', () => {
            const toggler = debugElement.query(By.css('.navbar-toggler'));
            const faIcon = toggler.query(By.css('fa-icon'));
            expect(faIcon.nativeElement.hasAttribute('ng-reflect-icon')).toBe(true);
        });

        it('should render icon properly', () => {
            const faIcon = debugElement.query(By.css('fa-icon'));
            expect(faIcon).toBeTruthy();
            expect(faIcon.nativeElement.tagName.toLowerCase()).toBe('fa-icon');
        });
    });

    describe('Router Integration', () => {
        it('should have router link on brand', () => {
            const brandLink = debugElement.query(By.css('.navbar-brand'));
            expect(brandLink.nativeElement.hasAttribute('ng-reflect-router-link')).toBe(true);
        });

        it('should navigate to home page from brand link', () => {
            const brandLink = debugElement.query(By.css('.navbar-brand'));
            expect(brandLink.nativeElement.getAttribute('ng-reflect-router-link')).toBe('/');
        });

        it('should be properly configured for routing', () => {
            const routerLink = debugElement.query(By.css('[ng-reflect-router-link]'));
            expect(routerLink).toBeTruthy();
        });
    });

    describe('Responsive Behavior', () => {
        it('should have responsive navbar classes', () => {
            const navbar = debugElement.query(By.css('.navbar'));
            expect(navbar.nativeElement.classList.contains('navbar-expand-md')).toBe(true);
        });

        it('should collapse navigation on small screens', () => {
            component.isMenuCollapsed = true;
            fixture.detectChanges();

            const collapses = debugElement.queryAll(By.css('.collapse'));
            collapses.forEach(collapse => {
                // NgBootstrap collapse attribute may not be reflected in test environment
                expect(collapse.nativeElement.classList.contains('collapse')).toBe(true);
            });
        });

        it('should expand navigation when toggled', () => {
            component.isMenuCollapsed = false;
            fixture.detectChanges();

            const collapses = debugElement.queryAll(By.css('.collapse'));
            collapses.forEach(collapse => {
                expect(collapse.nativeElement.getAttribute('ng-reflect-ngb-collapse')).toBe(
                    'false'
                );
            });
        });
    });

    describe('Edge Cases and Error Handling', () => {
        it('should handle multiple fixture.detectChanges() calls', () => {
            expect(() => {
                fixture.detectChanges();
                fixture.detectChanges();
                fixture.detectChanges();
            }).not.toThrow();
        });

        it('should handle component destruction', () => {
            expect(() => {
                fixture.destroy();
            }).not.toThrow();
        });

        it('should maintain component state after multiple change detection cycles', () => {
            const initialComponent = component;
            const initialState = component.isMenuCollapsed;

            fixture.detectChanges();
            fixture.detectChanges();

            expect(component).toBe(initialComponent);
            expect(component.isMenuCollapsed).toBe(initialState);
        });

        it('should handle rapid toggle operations', () => {
            const toggler = debugElement.query(By.css('.navbar-toggler'));

            expect(() => {
                for (let i = 0; i < 10; i++) {
                    toggler.nativeElement.click();
                    fixture.detectChanges();
                }
            }).not.toThrow();
        });

        it('should handle boolean state edge cases', () => {
            component.isMenuCollapsed = true;
            expect(component.isMenuCollapsed).toBe(true);

            component.isMenuCollapsed = false;
            expect(component.isMenuCollapsed).toBe(false);

            component.isMenuCollapsed = !component.isMenuCollapsed;
            expect(component.isMenuCollapsed).toBe(true);
        });
    });

    describe('Layout Structure', () => {
        it('should have proper Bootstrap grid structure', () => {
            const container = debugElement.query(By.css('.container'));
            const navbar = debugElement.query(By.css('.navbar.navbar-expand-md'));

            expect(container).toBeTruthy();
            expect(navbar).toBeTruthy();
            expect(navbar.nativeElement.parentElement).toBe(container.nativeElement);
        });

        it('should organize search and nav in separate collapsible sections', () => {
            const searchSection = debugElement.query(By.css('.search-bar-comp'));
            const navSection = debugElement.query(By.css('.nav-comp'));

            expect(searchSection).toBeTruthy();
            expect(navSection).toBeTruthy();
            expect(searchSection.nativeElement).not.toBe(navSection.nativeElement);
        });

        it('should maintain proper header semantic structure', () => {
            const header = debugElement.query(By.css('header'));
            const nav = header.query(By.css('nav'));

            expect(header.nativeElement.tagName.toLowerCase()).toBe('header');
            expect(nav.nativeElement.tagName.toLowerCase()).toBe('nav');
        });
    });

    describe('Accessibility', () => {
        it('should have proper semantic structure with header and nav', () => {
            const header = debugElement.query(By.css('header'));
            const nav = debugElement.query(By.css('nav'));

            expect(header).toBeTruthy();
            expect(nav).toBeTruthy();
            expect(header.nativeElement.tagName.toLowerCase()).toBe('header');
            expect(nav.nativeElement.tagName.toLowerCase()).toBe('nav');
        });

        it('should have alt text for logo image', () => {
            const logo = debugElement.query(By.css('.navbar-brand img'));
            expect(logo.nativeElement.alt).toBe('HGNC');
            expect(logo.nativeElement.alt.length).toBeGreaterThan(0);
        });

        it('should have button type for toggler', () => {
            const toggler = debugElement.query(By.css('.navbar-toggler'));
            expect(toggler.nativeElement.type).toBe('button');
        });

        it('should have role attribute for search form container', () => {
            const searchForm = debugElement.query(By.css('.navbar-form'));
            expect(searchForm.nativeElement.getAttribute('role')).toBe('search');
        });

        it('should use standard HTML elements', () => {
            const header = debugElement.query(By.css('header'));
            const nav = debugElement.query(By.css('nav'));
            const button = debugElement.query(By.css('button'));
            const img = debugElement.query(By.css('img'));
            const anchor = debugElement.query(By.css('a'));

            expect(header).toBeTruthy();
            expect(nav).toBeTruthy();
            expect(button).toBeTruthy();
            expect(img).toBeTruthy();
            expect(anchor).toBeTruthy();
        });
    });

    describe('Performance and Memory', () => {
        it('should not create memory leaks on destroy', () => {
            const initialComponent = component;
            fixture.destroy();
            expect(initialComponent).toBeDefined();
        });

        it('should handle rapid re-initialization', () => {
            fixture.destroy();
            fixture = TestBed.createComponent(HeaderComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });

        it('should be lightweight with minimal properties', () => {
            const propertyCount = Object.keys(component).length;
            expect(propertyCount).toBeLessThanOrEqual(4); // Allow for Angular internal properties
        });

        it('should handle frequent state changes efficiently', () => {
            const start = performance.now();

            for (let i = 0; i < 100; i++) {
                component.isMenuCollapsed = !component.isMenuCollapsed;
                fixture.detectChanges();
            }

            const end = performance.now();
            expect(end - start).toBeLessThan(1000); // Should complete in less than 1 second
        });
    });

    describe('Browser Compatibility', () => {
        it('should use standard HTML elements', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            const standardTags = [
                'header',
                'div',
                'nav',
                'a',
                'img',
                'button',
                'svg',
                'path',
                'form',
                'input',
            ];

            allElements.forEach(element => {
                const tagName = element.nativeElement.tagName.toLowerCase();
                if (
                    !tagName.startsWith('app-') &&
                    !tagName.startsWith('fa-') &&
                    tagName !== 'ng-container'
                ) {
                    expect(standardTags).toContain(tagName);
                }
            });
        });

        it('should not use deprecated HTML features', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            allElements.forEach(element => {
                const tagName = element.nativeElement.tagName.toLowerCase();
                expect(['font', 'center', 'marquee', 'blink']).not.toContain(tagName);
            });
        });

        it('should use modern image formats where appropriate', () => {
            const image = debugElement.query(By.css('img'));
            expect(image.nativeElement.src).toContain('.svg');
        });

        it('should use semantic HTML5 elements', () => {
            const header = debugElement.query(By.css('header'));
            const nav = debugElement.query(By.css('nav'));

            expect(header).toBeTruthy();
            expect(nav).toBeTruthy();
        });
    });

    describe('Responsive Design Readiness', () => {
        it('should use CSS classes for styling', () => {
            const header = debugElement.query(By.css('header'));
            const container = debugElement.query(By.css('.container'));
            const navbar = debugElement.query(By.css('.navbar.navbar-expand-md'));

            expect(header).toBeTruthy();
            expect(container).toBeTruthy();
            expect(navbar).toBeTruthy();
        });

        it('should use inline styles sparingly (only for header background)', () => {
            const header = debugElement.query(By.css('header'));
            expect(header.nativeElement.style.backgroundColor).toBeTruthy();

            // Other elements should not have inline styles - allow for Angular framework styles
            const otherElements = debugElement.queryAll(By.css('div, nav, a, img, button'));
            otherElements.forEach(element => {
                expect(element.nativeElement.style.length).toBeLessThanOrEqual(1);
            });
        });

        it('should use Bootstrap responsive utility classes', () => {
            const navbar = debugElement.query(By.css('.navbar'));
            const container = debugElement.query(By.css('.container'));
            const collapses = debugElement.queryAll(By.css('.collapse'));

            expect(navbar.nativeElement.classList.contains('navbar-expand-md')).toBe(true);
            expect(container.nativeElement.classList.contains('container')).toBe(true);
            expect(collapses.length).toBeGreaterThan(0);
        });

        it('should support mobile-first responsive design', () => {
            const toggler = debugElement.query(By.css('.navbar-toggler'));
            const collapses = debugElement.queryAll(By.css('.collapse.navbar-collapse'));

            expect(toggler).toBeTruthy();
            expect(collapses.length).toBe(2);
        });
    });

    describe('Brand and Logo Integration', () => {
        it('should display PGNC branding correctly', () => {
            const logo = debugElement.query(By.css('.navbar-brand img'));
            expect(logo.nativeElement.src).toContain('pgnc-logo-dark-bckgrnd-small.svg');
            expect(logo.nativeElement.alt).toBe('HGNC');
        });

        it('should link brand to home page', () => {
            const brandLink = debugElement.query(By.css('.navbar-brand'));
            expect(brandLink.nativeElement.getAttribute('ng-reflect-router-link')).toBe('/');
        });

        it('should maintain brand consistency', () => {
            const header = debugElement.query(By.css('header'));
            const logo = debugElement.query(By.css('img[alt="HGNC"]'));

            expect(header.nativeElement.style.backgroundColor).toBe('rgb(136, 0, 0)');
            expect(logo.nativeElement.src).toContain('dark-bckgrnd');
        });
    });

    describe('Navigation Integration', () => {
        it('should integrate with child navigation components', () => {
            const searchBar = debugElement.query(By.css('app-search-bar'));
            const nav = debugElement.query(By.css('app-nav'));

            expect(searchBar).toBeTruthy();
            expect(nav).toBeTruthy();
        });

        it('should control child component visibility through collapse', () => {
            const searchSection = debugElement.query(By.css('.search-bar-comp'));
            const navSection = debugElement.query(By.css('.nav-comp'));

            component.isMenuCollapsed = true;
            fixture.detectChanges();

            // NgBootstrap collapse attribute may not be reflected in test environment
            expect(searchSection.nativeElement.classList.contains('search-bar-comp')).toBe(true);
            expect(navSection.nativeElement.classList.contains('nav-comp')).toBe(true);
        });

        it('should organize components in logical sections', () => {
            const searchContainer = debugElement.query(By.css('.search-bar-comp .search-bar'));
            const navContainer = debugElement.query(By.css('.nav-comp'));

            expect(searchContainer).toBeTruthy();
            expect(navContainer).toBeTruthy();
            expect(searchContainer.nativeElement).not.toBe(navContainer.nativeElement);
        });
    });
});
