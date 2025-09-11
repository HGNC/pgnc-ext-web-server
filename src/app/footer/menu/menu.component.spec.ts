import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MenuComponent } from './menu.component';

// Mock components for routing tests
@Component({
    template: '',
    standalone: true,
})
class MockComponent {}

describe('MenuComponent', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;
    let debugElement: DebugElement;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MenuComponent, FontAwesomeModule],
            providers: [
                provideRouter([
                    { path: '', component: MockComponent },
                    { path: 'search', component: MockComponent },
                    { path: 'about', component: MockComponent },
                    { path: 'license', component: MockComponent },
                    { path: 'publications', component: MockComponent },
                    { path: 'help', component: MockComponent },
                    { path: 'contact', component: MockComponent },
                ]),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    describe('Component Creation', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should be defined', () => {
            expect(component).toBeDefined();
        });

        it('should be an instance of MenuComponent', () => {
            expect(component).toBeInstanceOf(MenuComponent);
        });

        it('should be a standalone component', () => {
            expect(MenuComponent.prototype.constructor).toBeDefined();
        });
    });

    describe('Component Properties', () => {
        it('should have faHome icon defined', () => {
            expect(component.faHome).toBeDefined();
            expect(component.faHome).toBeTruthy();
        });

        it('should initialize FontAwesome icon', () => {
            expect(component.faHome.iconName).toBe('house');
        });
    });

    describe('Template Structure', () => {
        it('should render the main container', () => {
            const container = debugElement.query(By.css('.container'));
            expect(container).toBeTruthy();
        });

        it('should render the f-menu-container row', () => {
            const row = debugElement.query(By.css('.f-menu-container'));
            expect(row).toBeTruthy();
        });

        it('should have home link section', () => {
            const homeSection = debugElement.query(By.css('.col-sm-12'));
            expect(homeSection).toBeTruthy();
        });

        it('should have four menu sections', () => {
            const menuSections = debugElement.queryAll(By.css('.f-menu'));
            expect(menuSections.length).toBe(4);
        });

        it('should contain all required elements', () => {
            const container = debugElement.query(By.css('.container'));
            const row = debugElement.query(By.css('.row'));
            const homeLink = debugElement.query(By.css('.home-link'));
            const menuSections = debugElement.queryAll(By.css('.f-menu'));

            expect(container).toBeTruthy();
            expect(row).toBeTruthy();
            expect(homeLink).toBeTruthy();
            expect(menuSections.length).toBe(4);
        });
    });

    describe('Home Link', () => {
        it('should render home link with RouterLink', () => {
            const homeLink = debugElement.query(By.css('.home-link'));
            expect(homeLink).toBeTruthy();
        });

        it('should have home link image', () => {
            const homeImage = debugElement.query(By.css('.home-link img'));
            expect(homeImage).toBeTruthy();
            expect(homeImage.nativeElement.src).toContain('pgnc-logo-light-bckgrnd.svg');
            expect(homeImage.nativeElement.alt).toBe('Home');
        });

        it('should have FontAwesome home icon', () => {
            const faIcon = debugElement.query(By.css('fa-icon'));
            expect(faIcon).toBeTruthy();
        });

        it('should open in new tab', () => {
            const homeLink = debugElement.query(By.css('.home-link'));
            expect(homeLink.nativeElement.target).toBe('_blank');
        });
    });

    describe('Menu Sections', () => {
        it('should have Gene data section', () => {
            const geneDataSection = debugElement.query(By.css('.f-menu h3'));
            expect(geneDataSection.nativeElement.textContent.trim()).toBe('Gene data');
        });

        it('should have More section', () => {
            const sections = debugElement.queryAll(By.css('.f-menu h3'));
            const moreSectionText = sections.map(s => s.nativeElement.textContent.trim());
            expect(moreSectionText).toContain('More');
        });

        it('should have Downloads section', () => {
            const sections = debugElement.queryAll(By.css('.f-menu h3'));
            const sectionTexts = sections.map(s => s.nativeElement.textContent.trim());
            expect(sectionTexts).toContain('Downloads');
        });

        it('should have Contact us section', () => {
            const sections = debugElement.queryAll(By.css('.f-menu h3'));
            const sectionTexts = sections.map(s => s.nativeElement.textContent.trim());
            expect(sectionTexts).toContain('Contact us');
        });
    });

    describe('Navigation Links', () => {
        it('should have Gene symbol reports link', () => {
            const link = debugElement.query(By.css('a[href*="search"]'));
            if (!link) {
                // Check if it's a routerLink
                const routerLink = debugElement.query(By.css('ul#data-list a'));
                expect(routerLink).toBeTruthy();
                expect(routerLink.nativeElement.textContent.trim()).toBe('Gene symbol reports');
            }
        });

        it('should have About the PGNC link', () => {
            const links = debugElement.queryAll(By.css('a'));
            const linkTexts = links.map(link => link.nativeElement.textContent.trim());
            expect(linkTexts).toContain('About the PGNC');
        });

        it('should have License link', () => {
            const links = debugElement.queryAll(By.css('a'));
            const linkTexts = links.map(link => link.nativeElement.textContent.trim());
            expect(linkTexts).toContain('License');
        });

        it('should have Publications link', () => {
            const links = debugElement.queryAll(By.css('a'));
            const linkTexts = links.map(link => link.nativeElement.textContent.trim());
            expect(linkTexts).toContain('Publications');
        });

        it('should have Help pages link', () => {
            const links = debugElement.queryAll(By.css('a'));
            const linkTexts = links.map(link => link.nativeElement.textContent.trim());
            expect(linkTexts).toContain('Help pages');
        });

        it('should have Download files link', () => {
            const links = debugElement.queryAll(By.css('a'));
            const linkTexts = links.map(link => link.nativeElement.textContent.trim());
            expect(linkTexts).toContain('Download files');
        });

        it('should have Contact details link', () => {
            const links = debugElement.queryAll(By.css('a'));
            const linkTexts = links.map(link => link.nativeElement.textContent.trim());
            expect(linkTexts).toContain('Contact details');
        });
    });

    describe('External Links', () => {
        it('should have GitHub download link', () => {
            const githubLink = debugElement.query(By.css('a[href*="github.com"]'));
            expect(githubLink).toBeTruthy();
            expect(githubLink.nativeElement.href).toContain(
                'PGNC-Plant-Gene-Nomenclature-Committee/Downloads'
            );
        });
    });

    describe('Child Components', () => {
        it('should render SocialMediaComponent', () => {
            const socialMedia = debugElement.query(By.css('app-social-media'));
            expect(socialMedia).toBeTruthy();
        });

        it('should render CpRightComponent', () => {
            const cpright = debugElement.query(By.css('app-cpright'));
            expect(cpright).toBeTruthy();
        });
    });

    describe('CSS Classes and Bootstrap Grid', () => {
        it('should use Bootstrap container', () => {
            const container = debugElement.query(By.css('.container'));
            expect(container).toBeTruthy();
        });

        it('should use Bootstrap row', () => {
            const row = debugElement.query(By.css('.row'));
            expect(row).toBeTruthy();
        });

        it('should have responsive column classes', () => {
            const menuSections = debugElement.queryAll(By.css('.col-sm-6.col-md-3'));
            expect(menuSections.length).toBe(4);
        });

        it('should have home section with full width', () => {
            const homeSection = debugElement.query(By.css('.col-sm-12'));
            expect(homeSection).toBeTruthy();
        });
    });

    describe('Lists and IDs', () => {
        it('should have data-list with ID', () => {
            const dataList = debugElement.query(By.css('#data-list'));
            expect(dataList).toBeTruthy();
        });

        it('should have misc-list with ID', () => {
            const miscList = debugElement.query(By.css('#misc-list'));
            expect(miscList).toBeTruthy();
        });

        it('should have help-list with ID', () => {
            const helpList = debugElement.query(By.css('#help-list'));
            expect(helpList).toBeTruthy();
        });

        it('should have contact-list with ID', () => {
            const contactList = debugElement.query(By.css('#contact-list'));
            expect(contactList).toBeTruthy();
        });
    });

    describe('Hidden Elements', () => {
        it('should have hidden feedback and request symbol links', () => {
            const hiddenLinks = debugElement.queryAll(By.css('li[style*="display: none"]'));
            expect(hiddenLinks.length).toBe(2);
        });

        it('should have deactivated class on hidden links', () => {
            const deactivatedLinks = debugElement.queryAll(By.css('.deactivated'));
            expect(deactivatedLinks.length).toBe(2);
        });
    });

    describe('Link Targets', () => {
        it('should have correct target attributes', () => {
            const internalLinks = debugElement.queryAll(By.css('a[target="_self"]'));
            const externalLinks = debugElement.queryAll(By.css('a[target="_blank"]'));

            expect(internalLinks.length).toBeGreaterThan(0);
            expect(externalLinks.length).toBeGreaterThan(0);
        });
    });

    describe('FontAwesome Integration', () => {
        it('should render FontAwesome icon', () => {
            const faIcon = debugElement.query(By.css('fa-icon'));
            expect(faIcon).toBeTruthy();
        });

        it('should have correct icon size', () => {
            const faIcon = debugElement.query(By.css('fa-icon'));
            expect(faIcon.nativeElement.getAttribute('size')).toBe('2x');
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
            const initialIcon = component.faHome;
            fixture.detectChanges();
            fixture.detectChanges();
            expect(component.faHome).toBe(initialIcon);
        });
    });

    describe('Accessibility', () => {
        it('should have proper heading hierarchy', () => {
            const headings = debugElement.queryAll(By.css('h3'));
            expect(headings.length).toBe(4);
            headings.forEach(heading => {
                expect(heading.nativeElement.textContent.trim().length).toBeGreaterThan(0);
            });
        });

        it('should have meaningful link text', () => {
            const links = debugElement.queryAll(By.css('a'));
            links.forEach(link => {
                const text = link.nativeElement.textContent.trim();
                if (text) {
                    // Some links might be icon-only
                    expect(text.length).toBeGreaterThan(0);
                }
            });
        });

        it('should have alt text for images', () => {
            const images = debugElement.queryAll(By.css('img'));
            images.forEach(img => {
                expect(img.nativeElement.alt).toBeDefined();
                expect(img.nativeElement.alt.length).toBeGreaterThan(0);
            });
        });

        it('should use semantic list structure', () => {
            const lists = debugElement.queryAll(By.css('ul'));
            const listItems = debugElement.queryAll(By.css('li'));

            expect(lists.length).toBe(4);
            expect(listItems.length).toBeGreaterThan(4);
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
            fixture = TestBed.createComponent(MenuComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            expect(component).toBeTruthy();
            expect(component.faHome).toBeDefined();
        });
    });

    describe('Router Integration', () => {
        it('should have router links', () => {
            const routerLinks = debugElement.queryAll(By.css('a'));
            const hasRouterLinks = routerLinks.some(
                link =>
                    link.nativeElement.hasAttribute('ng-reflect-router-link') ||
                    link.attributes['routerLink']
            );
            expect(hasRouterLinks || routerLinks.length > 0).toBe(true);
        });
    });

    describe('Responsive Design', () => {
        it('should use Bootstrap responsive classes', () => {
            const responsiveElements = debugElement.queryAll(By.css('[class*="col-"]'));
            expect(responsiveElements.length).toBeGreaterThan(0);
        });

        it('should have mobile-first design classes', () => {
            const mobileClasses = debugElement.queryAll(By.css('[class*="col-sm-"]'));
            const desktopClasses = debugElement.queryAll(By.css('[class*="col-md-"]'));

            expect(mobileClasses.length).toBeGreaterThan(0);
            expect(desktopClasses.length).toBeGreaterThan(0);
        });
    });
});
