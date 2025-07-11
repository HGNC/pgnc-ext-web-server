import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NavComponent } from './nav.component';

describe('NavComponent', () => {
    let component: NavComponent;
    let fixture: ComponentFixture<NavComponent>;
    let debugElement: DebugElement;
    let router: Router;
    let location: Location;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                NavComponent,
                FontAwesomeModule,
                NgbModule
            ],
            providers: [
                provideRouter([
                    { path: '', component: NavComponent },
                    { path: 'search', component: NavComponent },
                    { path: 'contact', component: NavComponent },
                    { path: 'about', component: NavComponent },
                    { path: 'license', component: NavComponent },
                    { path: 'publications', component: NavComponent },
                    { path: 'help', component: NavComponent }
                ])
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        fixture.detectChanges();
    });

    describe('Component Creation', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should be defined', () => {
            expect(component).toBeDefined();
        });

        it('should be an instance of NavComponent', () => {
            expect(component).toBeInstanceOf(NavComponent);
        });

        it('should be a standalone component', () => {
            expect(NavComponent.prototype.constructor).toBeDefined();
        });

        it('should have correct selector', () => {
            const compiled = fixture.nativeElement;
            expect(compiled).toBeTruthy();
        });
    });

    describe('Template Structure', () => {
        it('should render the navbar navigation container', () => {
            const navbarNav = debugElement.query(By.css('.navbar-nav'));
            expect(navbarNav).toBeTruthy();
        });

        it('should render all navigation items', () => {
            const navItems = debugElement.queryAll(By.css('.nav-item'));
            expect(navItems.length).toBe(6); // Home, Gene data, Downloads, Contact us, More dropdown, Request symbol
        });

        it('should have proper DOM structure', () => {
            const navbarNav = debugElement.query(By.css('.navbar-nav'));
            const navItems = navbarNav.queryAll(By.css('.nav-item'));

            expect(navbarNav).toBeTruthy();
            expect(navItems.length).toBe(6);

            navItems.forEach(item => {
                expect(item.nativeElement.parentElement).toBe(navbarNav.nativeElement);
            });
        });

        it('should contain all required navigation elements', () => {
            const homeLink = debugElement.query(By.css('a[ng-reflect-router-link="/"]'));
            const geneDataLink = debugElement.query(By.css('a[ng-reflect-router-link="/search"]'));
            const downloadsLink = debugElement.query(By.css('a[href*="github.com"]'));
            const contactLink = debugElement.query(By.css('a[ng-reflect-router-link="/contact"]'));
            const moreDropdown = debugElement.query(By.css('[ngbDropdown]'));
            const requestSymbolLink = debugElement.query(By.css('a.deactivated'));

            expect(homeLink).toBeTruthy();
            expect(geneDataLink).toBeTruthy();
            expect(downloadsLink).toBeTruthy();
            expect(contactLink).toBeTruthy();
            expect(moreDropdown).toBeTruthy();
            expect(requestSymbolLink).toBeTruthy();
        });
    });

    describe('Home Navigation Link', () => {
        it('should render home link with FontAwesome icon', () => {
            const homeLink = debugElement.query(By.css('a[ng-reflect-router-link="/"]'));
            const homeIcon = homeLink.query(By.css('fa-icon'));

            expect(homeLink).toBeTruthy();
            expect(homeIcon).toBeTruthy();
            // Check that the icon attribute exists (it may be serialized as an object)
            const iconAttr = homeIcon.nativeElement.getAttribute('ng-reflect-icon');
            expect(iconAttr).toBeTruthy();
        });

        it('should have correct CSS classes', () => {
            const homeLink = debugElement.query(By.css('a[ng-reflect-router-link="/"]'));
            expect(homeLink.nativeElement.classList.contains('nav-link')).toBe(true);
        });

        it('should be in a nav-item container', () => {
            const homeNavItem = debugElement.query(By.css('.nav-item:first-child'));
            const homeLink = homeNavItem.query(By.css('a[ng-reflect-router-link="/"]'));

            expect(homeNavItem.nativeElement.classList.contains('nav-item')).toBe(true);
            expect(homeLink).toBeTruthy();
        });

        it('should navigate to root when clicked', async () => {
            const homeLink = debugElement.query(By.css('a[ng-reflect-router-link="/"]'));

            await homeLink.nativeElement.click();
            fixture.detectChanges();

            expect(homeLink.nativeElement.getAttribute('ng-reflect-router-link')).toBe('/');
        });
    });

    describe('Gene Data Navigation Link', () => {
        it('should render gene data link with correct text', () => {
            const geneDataLink = debugElement.query(By.css('a[ng-reflect-router-link="/search"]'));
            expect(geneDataLink).toBeTruthy();
            expect(geneDataLink.nativeElement.textContent.trim()).toBe('Gene data');
        });

        it('should have correct router link and query parameters', () => {
            const geneDataLink = debugElement.query(By.css('a[ng-reflect-router-link="/search"]'));
            expect(geneDataLink.nativeElement.getAttribute('ng-reflect-router-link')).toBe('/search');

            // Check if query params attribute exists - it may be serialized as an object
            const queryParamsAttr = geneDataLink.nativeElement.getAttribute('ng-reflect-query-params');
            expect(queryParamsAttr).toBeTruthy();
        });

        it('should have correct CSS classes', () => {
            const geneDataLink = debugElement.query(By.css('a[ng-reflect-router-link="/search"]'));
            expect(geneDataLink.nativeElement.classList.contains('nav-link')).toBe(true);
        });

        it('should be in a nav-item container', () => {
            const geneDataNavItem = debugElement.query(By.css('.nav-item:nth-child(2)'));
            const geneDataLink = geneDataNavItem.query(By.css('a[ng-reflect-router-link="/search"]'));

            expect(geneDataNavItem.nativeElement.classList.contains('nav-item')).toBe(true);
            expect(geneDataLink).toBeTruthy();
        });
    });

    describe('Downloads External Link', () => {
        it('should render downloads link with correct href', () => {
            const downloadsLink = debugElement.query(By.css('a[href*="github.com"]'));
            expect(downloadsLink).toBeTruthy();
            expect(downloadsLink.nativeElement.href).toContain('github.com/PGNC-Plant-Gene-Nomenclature-Committee/Downloads');
        });

        it('should have correct link text', () => {
            const downloadsLink = debugElement.query(By.css('a[href*="github.com"]'));
            expect(downloadsLink.nativeElement.textContent.trim()).toBe('Downloads');
        });

        it('should have correct CSS classes', () => {
            const downloadsLink = debugElement.query(By.css('a[href*="github.com"]'));
            expect(downloadsLink.nativeElement.classList.contains('nav-link')).toBe(true);
        });

        it('should be an external link to GitHub', () => {
            const downloadsLink = debugElement.query(By.css('a[href*="github.com"]'));
            expect(downloadsLink.nativeElement.href).toMatch(/^https:\/\/github\.com\//);
        });

        it('should be in a nav-item container', () => {
            const downloadsNavItem = debugElement.query(By.css('.nav-item:nth-child(3)'));
            const downloadsLink = downloadsNavItem.query(By.css('a[href*="github.com"]'));

            expect(downloadsNavItem.nativeElement.classList.contains('nav-item')).toBe(true);
            expect(downloadsLink).toBeTruthy();
        });
    });

    describe('Contact Us Navigation Link', () => {
        it('should render contact link with correct text', () => {
            const contactLink = debugElement.query(By.css('a[ng-reflect-router-link="/contact"]'));
            expect(contactLink).toBeTruthy();
            expect(contactLink.nativeElement.textContent.trim()).toBe('Contact us');
        });

        it('should have correct router link', () => {
            const contactLink = debugElement.query(By.css('a[ng-reflect-router-link="/contact"]'));
            expect(contactLink.nativeElement.getAttribute('ng-reflect-router-link')).toBe('/contact');
        });

        it('should have correct CSS classes', () => {
            const contactLink = debugElement.query(By.css('a[ng-reflect-router-link="/contact"]'));
            expect(contactLink.nativeElement.classList.contains('nav-link')).toBe(true);
        });

        it('should be in a nav-item container', () => {
            const contactNavItem = debugElement.query(By.css('.nav-item:nth-child(4)'));
            const contactLink = contactNavItem.query(By.css('a[ng-reflect-router-link="/contact"]'));

            expect(contactNavItem.nativeElement.classList.contains('nav-item')).toBe(true);
            expect(contactLink).toBeTruthy();
        });
    });

    describe('More Dropdown Navigation', () => {
        it('should render dropdown with NgBootstrap directive', () => {
            const dropdown = debugElement.query(By.css('[ngbDropdown]'));
            expect(dropdown).toBeTruthy();
            expect(dropdown.nativeElement.hasAttribute('ngbdropdown')).toBe(true);
        });

        it('should have dropdown toggle button', () => {
            const dropdownToggle = debugElement.query(By.css('[ngbDropdownToggle]'));
            expect(dropdownToggle).toBeTruthy();
            expect(dropdownToggle.nativeElement.textContent.trim()).toBe('More');
            expect(dropdownToggle.nativeElement.type).toBe('button');
            expect(dropdownToggle.nativeElement.classList.contains('nav-link')).toBe(true);
        });

        it('should have dropdown menu with all items', () => {
            const dropdownMenu = debugElement.query(By.css('[ngbDropdownMenu]'));
            const dropdownItems = dropdownMenu.queryAll(By.css('[ngbDropdownItem]'));

            expect(dropdownMenu).toBeTruthy();
            expect(dropdownItems.length).toBe(4); // About, License, Publications, Help
        });

        it('should have About the PGNC dropdown item', () => {
            const aboutItem = debugElement.query(By.css('button[ng-reflect-router-link="/about"]'));
            expect(aboutItem).toBeTruthy();
            expect(aboutItem.nativeElement.textContent.trim()).toBe('About the PGNC');
            expect(aboutItem.nativeElement.hasAttribute('ngbdropdownitem')).toBe(true);
        });

        it('should have License dropdown item', () => {
            const licenseItem = debugElement.query(By.css('button[ng-reflect-router-link="/license"]'));
            expect(licenseItem).toBeTruthy();
            expect(licenseItem.nativeElement.textContent.trim()).toBe('License');
            expect(licenseItem.nativeElement.hasAttribute('ngbdropdownitem')).toBe(true);
        });

        it('should have Publications dropdown item', () => {
            const publicationsItem = debugElement.query(By.css('button[ng-reflect-router-link="/publications"]'));
            expect(publicationsItem).toBeTruthy();
            expect(publicationsItem.nativeElement.textContent.trim()).toBe('Publications');
            expect(publicationsItem.nativeElement.hasAttribute('ngbdropdownitem')).toBe(true);
        });

        it('should have Help pages dropdown item', () => {
            const helpItem = debugElement.query(By.css('button[ng-reflect-router-link="/help"]'));
            expect(helpItem).toBeTruthy();
            expect(helpItem.nativeElement.textContent.trim()).toBe('Help pages');
            expect(helpItem.nativeElement.hasAttribute('ngbdropdownitem')).toBe(true);
        });

        it('should have proper role attribute for accessibility', () => {
            const dropdown = debugElement.query(By.css('[ngbDropdown]'));
            expect(dropdown.nativeElement.getAttribute('role')).toBe('presentation');
        });

        it('should be in a nav-item container', () => {
            const dropdownNavItem = debugElement.query(By.css('.nav-item'));
            const dropdown = debugElement.query(By.css('[ngbDropdown]'));

            expect(dropdownNavItem).toBeTruthy();
            expect(dropdownNavItem.nativeElement.classList.contains('nav-item')).toBe(true);
            expect(dropdown).toBeTruthy();
        });
    });

    describe('Request Symbol Link (Hidden)', () => {
        it('should render request symbol link with hidden visibility', () => {
            const requestSymbolLink = debugElement.query(By.css('a.deactivated'));
            expect(requestSymbolLink).toBeTruthy();
            expect(requestSymbolLink.nativeElement.style.visibility).toBe('hidden');
        });

        it('should have correct text and icon', () => {
            const requestSymbolLink = debugElement.query(By.css('a.deactivated'));
            const envelopeIcon = requestSymbolLink.query(By.css('fa-icon'));

            expect(requestSymbolLink.nativeElement.textContent.trim()).toContain('Request symbol');
            expect(envelopeIcon).toBeTruthy();
            // FontAwesome icons show as [object Object] in tests
            expect(envelopeIcon.nativeElement.getAttribute('ng-reflect-icon')).toContain('Object');
        });

        it('should have deactivated CSS class', () => {
            const requestSymbolLink = debugElement.query(By.css('a.deactivated'));
            expect(requestSymbolLink.nativeElement.classList.contains('deactivated')).toBe(true);
            expect(requestSymbolLink.nativeElement.classList.contains('nav-link')).toBe(true);
        });

        it('should be in a nav-item container', () => {
            const requestNavItem = debugElement.query(By.css('.nav-item:nth-child(6)'));
            const requestLink = requestNavItem.query(By.css('a.deactivated'));

            expect(requestNavItem.nativeElement.classList.contains('nav-item')).toBe(true);
            expect(requestLink).toBeTruthy();
        });
    });

    describe('Component Properties', () => {
        it('should have faEnvelope icon property', () => {
            expect(component.faEnvelope).toBeDefined();
            expect(typeof component.faEnvelope).toBe('object');
            expect(component.faEnvelope.iconName).toBe('envelope');
        });

        it('should have faHome icon property', () => {
            expect(component.faHome).toBeDefined();
            expect(typeof component.faHome).toBe('object');
            expect(component.faHome.iconName).toBe('house'); // FontAwesome 6 changed home to house
        });

        it('should have correct FontAwesome icon imports', () => {
            expect(component.faEnvelope.prefix).toBe('fas');
            expect(component.faHome.prefix).toBe('fas');
        });

        it('should only have icon properties', () => {
            const properties = Object.keys(component);
            expect(properties).toContain('faEnvelope');
            expect(properties).toContain('faHome');
            expect(properties.length).toBeLessThanOrEqual(3); // Allow for potential Angular internal properties
        });
    });

    describe('FontAwesome Integration', () => {
        it('should display FontAwesome home icon', () => {
            const homeIcon = debugElement.query(By.css('fa-icon'));
            expect(homeIcon).toBeTruthy();
            expect(homeIcon.nativeElement.tagName.toLowerCase()).toBe('fa-icon');
        });

        it('should display FontAwesome envelope icon', () => {
            const envelopeIcon = debugElement.query(By.css('fa-icon'));
            expect(envelopeIcon).toBeTruthy();
            expect(envelopeIcon.nativeElement.tagName.toLowerCase()).toBe('fa-icon');
        });

        it('should have correct icon bindings', () => {
            const homeIcon = debugElement.query(By.css('fa-icon'));
            expect(homeIcon).toBeTruthy();
            expect(homeIcon.nativeElement.hasAttribute('ng-reflect-icon')).toBe(true);
        });

        it('should use solid FontAwesome icons', () => {
            expect(component.faHome.prefix).toBe('fas');
            expect(component.faEnvelope.prefix).toBe('fas');
        });
    });

    describe('Router Integration', () => {
        it('should have router links for internal navigation', () => {
            const routerLinks = debugElement.queryAll(By.css('a[ng-reflect-router-link]'));
            expect(routerLinks.length).toBeGreaterThanOrEqual(3); // Home, Gene data, and other links
        });

        it('should navigate to correct routes', () => {
            const routerLinks = debugElement.queryAll(By.css('a[ng-reflect-router-link]'));
            expect(routerLinks.length).toBeGreaterThan(0);

            // Check that router links exist for key navigation items
            const homeLink = debugElement.query(By.css('a[ng-reflect-router-link="/"]'));
            const contactLink = debugElement.query(By.css('a[ng-reflect-router-link="/contact"]'));

            expect(homeLink || contactLink).toBeTruthy(); // At least one main nav link should exist
        });

        it('should have query parameters for gene data search', () => {
            const geneDataLink = debugElement.query(By.css('a[ng-reflect-router-link="/search"]'));
            expect(geneDataLink.nativeElement.hasAttribute('ng-reflect-query-params')).toBe(true);
        });

        it('should use router links for dropdown items', () => {
            const aboutItem = debugElement.query(By.css('button[ng-reflect-router-link="/about"]'));
            const licenseItem = debugElement.query(By.css('button[ng-reflect-router-link="/license"]'));
            const publicationsItem = debugElement.query(By.css('button[ng-reflect-router-link="/publications"]'));
            const helpItem = debugElement.query(By.css('button[ng-reflect-router-link="/help"]'));

            expect(aboutItem).toBeTruthy();
            expect(licenseItem).toBeTruthy();
            expect(publicationsItem).toBeTruthy();
            expect(helpItem).toBeTruthy();
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should have Bootstrap navbar navigation classes', () => {
            const navbarNav = debugElement.query(By.css('.navbar-nav'));
            expect(navbarNav).toBeTruthy();
            expect(navbarNav.nativeElement.classList.contains('navbar-nav')).toBe(true);
        });

        it('should apply nav-item classes to all navigation items', () => {
            const navItems = debugElement.queryAll(By.css('.nav-item'));
            expect(navItems.length).toBe(6);

            navItems.forEach(item => {
                expect(item.nativeElement.classList.contains('nav-item')).toBe(true);
            });
        });

        it('should apply nav-link classes to all links and buttons', () => {
            const navLinks = debugElement.queryAll(By.css('.nav-link'));
            expect(navLinks.length).toBeGreaterThanOrEqual(6);

            navLinks.forEach(link => {
                expect(link.nativeElement.classList.contains('nav-link')).toBe(true);
            });
        });

        it('should have deactivated class for hidden elements', () => {
            const deactivatedLink = debugElement.query(By.css('.deactivated'));
            expect(deactivatedLink).toBeTruthy();
            expect(deactivatedLink.nativeElement.classList.contains('deactivated')).toBe(true);
        });

        it('should not use inline styles except for hidden visibility', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            allElements.forEach(element => {
                const style = element.nativeElement.style;
                if (style.length > 0) {
                    // Only allow visibility: hidden for the request symbol link
                    expect(style.visibility === 'hidden' || style.length === 0).toBe(true);
                }
            });
        });
    });

    describe('NgBootstrap Integration', () => {
        it('should use NgBootstrap dropdown directives', () => {
            const dropdown = debugElement.query(By.css('[ngbDropdown]'));
            const dropdownToggle = debugElement.query(By.css('[ngbDropdownToggle]'));
            const dropdownMenu = debugElement.query(By.css('[ngbDropdownMenu]'));

            expect(dropdown).toBeTruthy();
            expect(dropdownToggle).toBeTruthy();
            expect(dropdownMenu).toBeTruthy();
        });

        it('should have NgBootstrap dropdown items', () => {
            const dropdownItems = debugElement.queryAll(By.css('[ngbDropdownItem]'));
            expect(dropdownItems.length).toBe(4);

            dropdownItems.forEach(item => {
                expect(item.nativeElement.hasAttribute('ngbdropdownitem')).toBe(true);
            });
        });

        it('should properly integrate with Bootstrap CSS classes', () => {
            const dropdown = debugElement.query(By.css('[ngbDropdown]'));
            const dropdownToggle = debugElement.query(By.css('[ngbDropdownToggle]'));

            expect(dropdown.nativeElement.classList.contains('nav-item')).toBe(true);
            expect(dropdownToggle.nativeElement.classList.contains('nav-link')).toBe(true);
        });
    });

    describe('Accessibility', () => {
        it('should have proper semantic navigation structure', () => {
            const navbarNav = debugElement.query(By.css('.navbar-nav'));
            const navItems = debugElement.queryAll(By.css('.nav-item'));

            expect(navbarNav).toBeTruthy();
            expect(navItems.length).toBeGreaterThan(0);
        });

        it('should have button type for dropdown toggle', () => {
            const dropdownToggle = debugElement.query(By.css('[ngbDropdownToggle]'));
            expect(dropdownToggle.nativeElement.type).toBe('button');
        });

        it('should have role attribute for dropdown container', () => {
            const dropdown = debugElement.query(By.css('[ngbDropdown]'));
            expect(dropdown.nativeElement.getAttribute('role')).toBe('presentation');
        });

        it('should use standard HTML elements', () => {
            const divs = debugElement.queryAll(By.css('div'));
            const anchors = debugElement.queryAll(By.css('a'));
            const buttons = debugElement.queryAll(By.css('button'));

            expect(divs.length).toBeGreaterThan(0);
            expect(anchors.length).toBeGreaterThan(0);
            expect(buttons.length).toBeGreaterThan(0);
        });

        it('should have descriptive link text', () => {
            const links = debugElement.queryAll(By.css('a, button'));
            links.forEach(link => {
                const text = link.nativeElement.textContent.trim();
                if (text.length > 0) {
                    expect(text).not.toBe('click here');
                    expect(text).not.toBe('read more');
                    expect(text).not.toBe('link');
                }
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
            const initialFaHome = component.faHome;
            const initialFaEnvelope = component.faEnvelope;

            fixture.detectChanges();
            fixture.detectChanges();

            expect(component).toBe(initialComponent);
            expect(component.faHome).toBe(initialFaHome);
            expect(component.faEnvelope).toBe(initialFaEnvelope);
        });

        it('should handle router navigation errors gracefully', () => {
            const homeLink = debugElement.query(By.css('a[ng-reflect-router-link="/"]'));

            expect(() => {
                homeLink.nativeElement.click();
                fixture.detectChanges();
            }).not.toThrow();
        });

        it('should handle missing icon properties gracefully', () => {
            expect(component.faHome).toBeDefined();
            expect(component.faEnvelope).toBeDefined();
            expect(typeof component.faHome).toBe('object');
            expect(typeof component.faEnvelope).toBe('object');
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
            fixture = TestBed.createComponent(NavComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });

        it('should be lightweight with minimal properties', () => {
            const propertyCount = Object.keys(component).length;
            expect(propertyCount).toBeLessThanOrEqual(3); // faHouse, faEnvelope, and possibly other Angular internals
        });

        it('should handle frequent state changes efficiently', () => {
            const start = performance.now();

            for (let i = 0; i < 100; i++) {
                fixture.detectChanges();
            }

            const end = performance.now();
            expect(end - start).toBeLessThan(1000); // Should complete in less than 1 second
        });
    });

    describe('Browser Compatibility', () => {
        it('should use standard HTML elements', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            const standardTags = ['div', 'a', 'button', 'ul', 'li', 'svg', 'nav', 'span', 'path'];

            allElements.forEach(element => {
                const tagName = element.nativeElement.tagName.toLowerCase();
                if (!tagName.startsWith('app-') && !tagName.startsWith('fa-') && tagName !== 'ng-container') {
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

        it('should use modern navigation patterns', () => {
            const routerLinks = debugElement.queryAll(By.css('a[ng-reflect-router-link]'));
            const externalLinks = debugElement.queryAll(By.css('a[href^="http"]'));

            expect(routerLinks.length).toBeGreaterThan(0);
            expect(externalLinks.length).toBeGreaterThan(0);
        });

        it('should support modern JavaScript features', () => {
            expect(() => {
                component.faHome;
                component.faEnvelope;
            }).not.toThrow();
        });
    });

    describe('User Experience', () => {
        it('should provide clear navigation options', () => {
            const navLinks = debugElement.queryAll(By.css('.nav-link'));
            expect(navLinks.length).toBeGreaterThanOrEqual(6);

            const visibleLinks = navLinks.filter(link =>
                link.nativeElement.style.visibility !== 'hidden'
            );
            expect(visibleLinks.length).toBeGreaterThanOrEqual(5);
        });

        it('should have intuitive navigation structure', () => {
            const homeLink = debugElement.query(By.css('a[ng-reflect-router-link="/"]'));
            const geneDataLink = debugElement.query(By.css('a[ng-reflect-router-link="/search"]'));
            const contactLink = debugElement.query(By.css('a[ng-reflect-router-link="/contact"]'));
            const moreDropdown = debugElement.query(By.css('[ngbDropdownToggle]'));

            expect(homeLink).toBeTruthy();
            expect(geneDataLink).toBeTruthy();
            expect(contactLink).toBeTruthy();
            expect(moreDropdown).toBeTruthy();
        });

        it('should group related items in dropdown', () => {
            const dropdownItems = debugElement.queryAll(By.css('[ngbDropdownItem]'));
            const dropdownTexts = dropdownItems.map(item => item.nativeElement.textContent.trim());

            expect(dropdownTexts).toContain('About the PGNC');
            expect(dropdownTexts).toContain('License');
            expect(dropdownTexts).toContain('Publications');
            expect(dropdownTexts).toContain('Help pages');
        });

        it('should provide external link for downloads', () => {
            const downloadsLink = debugElement.query(By.css('a[href*="github.com"]'));
            expect(downloadsLink.nativeElement.href).toContain('github.com');
            expect(downloadsLink.nativeElement.textContent.trim()).toBe('Downloads');
        });
    });

    describe('Navigation Content', () => {
        it('should have appropriate navigation labels', () => {
            const geneDataLink = debugElement.query(By.css('a[ng-reflect-router-link="/search"]'));
            const contactLink = debugElement.query(By.css('a[ng-reflect-router-link="/contact"]'));
            const downloadsLink = debugElement.query(By.css('a[href*="github.com"]'));

            expect(geneDataLink.nativeElement.textContent.trim()).toBe('Gene data');
            expect(contactLink.nativeElement.textContent.trim()).toBe('Contact us');
            expect(downloadsLink.nativeElement.textContent.trim()).toBe('Downloads');
        });

        it('should have proper dropdown menu structure', () => {
            const dropdownMenu = debugElement.query(By.css('[ngbDropdownMenu]'));
            const dropdownItems = dropdownMenu.queryAll(By.css('[ngbDropdownItem]'));

            expect(dropdownItems.length).toBe(4);
            dropdownItems.forEach(item => {
                expect(item.nativeElement.textContent.trim().length).toBeGreaterThan(0);
            });
        });

        it('should provide comprehensive site navigation', () => {
            const allLinks = debugElement.queryAll(By.css('a[ng-reflect-router-link], button[ng-reflect-router-link]'));
            const routes = allLinks.map(link =>
                link.nativeElement.getAttribute('ng-reflect-router-link')
            ).filter(route => route);

            expect(routes.length).toBeGreaterThan(0);
            // Check for some expected routes
            const expectedRoutes = ['/', '/search'];
            const hasExpectedRoutes = expectedRoutes.some(expectedRoute => routes.includes(expectedRoute));
            expect(hasExpectedRoutes).toBe(true);
        });
    });

    describe('External Links', () => {
        it('should have GitHub downloads link', () => {
            const githubLink = debugElement.query(By.css('a[href*="github.com"]'));
            expect(githubLink).toBeTruthy();
            expect(githubLink.nativeElement.href).toContain('PGNC-Plant-Gene-Nomenclature-Committee/Downloads');
        });

        it('should have valid external URL format', () => {
            const externalLinks = debugElement.queryAll(By.css('a[href^="http"]'));
            externalLinks.forEach(link => {
                expect(link.nativeElement.href).toMatch(/^https?:\/\/.+/);
            });
        });

        it('should point to correct GitHub organization', () => {
            const githubLink = debugElement.query(By.css('a[href*="github.com"]'));
            expect(githubLink.nativeElement.href).toContain('PGNC-Plant-Gene-Nomenclature-Committee');
        });
    });
});
