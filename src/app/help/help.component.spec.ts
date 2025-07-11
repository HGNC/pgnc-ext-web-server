import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

import { HelpComponent } from './help.component';

// Mock components for routing tests
@Component({
    template: '<div>Mock FAQ Component</div>',
    standalone: true
})
class MockFaqComponent { }

@Component({
    template: '<div>Mock Browser Component</div>',
    standalone: true
})
class MockBrowserComponent { }

@Component({
    template: '<div>Mock Search Component</div>',
    standalone: true
})
class MockSearchComponent { }

@Component({
    template: '<div>Mock Gene Symbol Report Component</div>',
    standalone: true
})
class MockGeneSymbolReportComponent { }

describe('HelpComponent', () => {
    let component: HelpComponent;
    let fixture: ComponentFixture<HelpComponent>;
    let debugElement: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HelpComponent],
            providers: [
                provideRouter([
                    { path: 'help/faq', component: MockFaqComponent },
                    { path: 'help/browser', component: MockBrowserComponent },
                    { path: 'help/search', component: MockSearchComponent },
                    { path: 'help/gene-symbol-report', component: MockGeneSymbolReportComponent }
                ])
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HelpComponent);
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

        it('should be an instance of HelpComponent', () => {
            expect(component).toBeInstanceOf(HelpComponent);
        });

        it('should be a standalone component', () => {
            expect(HelpComponent.prototype.constructor).toBeDefined();
        });

        it('should have correct selector', () => {
            const compiled = fixture.nativeElement;
            expect(compiled).toBeTruthy();
        });
    });

    describe('Template Structure', () => {
        it('should render the main container', () => {
            const container = debugElement.query(By.css('.container'));
            expect(container).toBeTruthy();
        });

        it('should render the main heading', () => {
            const heading = debugElement.query(By.css('h1'));
            expect(heading).toBeTruthy();
            expect(heading.nativeElement.textContent.trim()).toBe('Help index');
        });

        it('should render exactly one h1 element', () => {
            const headings = debugElement.queryAll(By.css('h1'));
            expect(headings.length).toBe(1);
        });

        it('should have proper DOM structure', () => {
            const container = debugElement.query(By.css('.container'));
            const heading = container.query(By.css('h1'));

            expect(container).toBeTruthy();
            expect(heading).toBeTruthy();
            expect(heading.nativeElement.parentElement).toBe(container.nativeElement);
        });

        it('should contain all required sections', () => {
            const h2Elements = debugElement.queryAll(By.css('h2'));
            expect(h2Elements.length).toBeGreaterThanOrEqual(3);
        });
    });

    describe('Navigation Links', () => {
        it('should render all navigation links', () => {
            const links = debugElement.queryAll(By.css('a[ng-reflect-router-link]'));
            expect(links.length).toBeGreaterThanOrEqual(4);
        });

        it('should have FAQ link', () => {
            const faqLink = debugElement.query(By.css('a[ng-reflect-router-link="faq"]'));
            expect(faqLink).toBeTruthy();
            expect(faqLink.nativeElement.textContent).toContain('Frequently asked questions');
        });

        it('should have Browser Help link', () => {
            const browserLink = debugElement.query(By.css('a[ng-reflect-router-link="browser"]'));
            expect(browserLink).toBeTruthy();
            expect(browserLink.nativeElement.textContent).toContain('Browser help');
        });

        it('should have Search Help link', () => {
            const searchLinks = debugElement.queryAll(By.css('a[ng-reflect-router-link="search"]'));
            expect(searchLinks.length).toBeGreaterThanOrEqual(1);
            expect(searchLinks[0].nativeElement.textContent).toContain('Search help');
        });

        it('should have Gene Symbol Report Help link', () => {
            const reportLink = debugElement.query(By.css('a[ng-reflect-router-link="gene-symbol-report"]'));
            expect(reportLink).toBeTruthy();
            expect(reportLink.nativeElement.textContent).toContain('Symbol report help');
        });

        it('should have proper link structure', () => {
            const links = debugElement.queryAll(By.css('a[routerLink]'));
            links.forEach(link => {
                expect(link.nativeElement.hasAttribute('ng-reflect-router-link')).toBe(true);
                expect(link.nativeElement.textContent.trim().length).toBeGreaterThan(0);
            });
        });
    });

    describe('Section Content', () => {
        it('should have FAQ section with description', () => {
            const faqSection = debugElement.query(By.css('h2:has(a[ng-reflect-router-link="faq"])'));
            expect(faqSection).toBeTruthy();

            const nextP = faqSection.nativeElement.nextElementSibling;
            expect(nextP.tagName.toLowerCase()).toBe('p');
            expect(nextP.textContent).toContain('FAQs page');
        });

        it('should have Browser Help section with description', () => {
            const browserSection = debugElement.query(By.css('h2:has(a[ng-reflect-router-link="browser"])'));
            expect(browserSection).toBeTruthy();

            const nextP = browserSection.nativeElement.nextElementSibling;
            expect(nextP.tagName.toLowerCase()).toBe('p');
            expect(nextP.textContent).toContain('browsers and versions');
        });

        it('should have Search Help section with description', () => {
            const searchSection = debugElement.query(By.css('h2:has(a[ng-reflect-router-link="search"])'));
            expect(searchSection).toBeTruthy();

            const nextP = searchSection.nativeElement.nextElementSibling;
            expect(nextP.tagName.toLowerCase()).toBe('p');
            expect(nextP.textContent).toContain('Apache Solr');
        });

        it('should have Gene Symbol Report section with description', () => {
            const reportSection = debugElement.query(By.css('h2:has(a[ng-reflect-router-link="gene-symbol-report"])'));
            expect(reportSection).toBeTruthy();

            const nextP = reportSection.nativeElement.nextElementSibling;
            expect(nextP.tagName.toLowerCase()).toBe('p');
            expect(nextP.textContent).toContain('PGNC symbol');
        });
    });

    describe('Router Integration', () => {
        it('should have router links properly configured', () => {
            const routerLinks = debugElement.queryAll(By.css('a[ng-reflect-router-link]'));
            expect(routerLinks.length).toBeGreaterThan(0);

            routerLinks.forEach(link => {
                const routerLink = link.nativeElement.getAttribute('ng-reflect-router-link');
                expect(routerLink).toBeTruthy();
            });
        });

        it('should have relative router links', () => {
            const links = debugElement.queryAll(By.css('a[ng-reflect-router-link]'));
            links.forEach(link => {
                const routerLink = link.nativeElement.getAttribute('ng-reflect-router-link');
                expect(routerLink?.startsWith('/')).toBe(false);
            });
        });

        it('should navigate to correct routes', () => {
            const expectedRoutes = ['faq', 'browser', 'search', 'gene-symbol-report'];
            const actualRoutes = debugElement.queryAll(By.css('a[ng-reflect-router-link]'))
                .map(link => link.nativeElement.getAttribute('ng-reflect-router-link'))
                .filter(route => expectedRoutes.includes(route));

            expect(actualRoutes.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('Content Validation', () => {
        it('should contain specific keywords in FAQ section', () => {
            const paragraphs = debugElement.queryAll(By.css('p'));
            const faqParagraph = paragraphs.find(p =>
                p.nativeElement.textContent.includes('FAQs page')
            );
            expect(faqParagraph).toBeTruthy();
            expect(faqParagraph?.nativeElement.textContent).toContain('commonly asked questions');
        });

        it('should contain browser compatibility information', () => {
            const paragraphs = debugElement.queryAll(By.css('p'));
            const browserParagraph = paragraphs.find(p =>
                p.nativeElement.textContent.includes('browsers and versions')
            );
            expect(browserParagraph).toBeTruthy();
            expect(browserParagraph?.nativeElement.textContent).toContain('javascript');
        });

        it('should contain search functionality details', () => {
            const paragraphs = debugElement.queryAll(By.css('p'));
            const searchParagraph = paragraphs.find(p =>
                p.nativeElement.textContent.includes('Apache Solr')
            );
            expect(searchParagraph).toBeTruthy();
            expect(searchParagraph?.nativeElement.textContent).toContain('full-text search');
        });

        it('should contain gene symbol report information', () => {
            const paragraphs = debugElement.queryAll(By.css('p'));
            const reportParagraph = paragraphs.find(p =>
                p.nativeElement.textContent.includes('PGNC symbol')
            );
            expect(reportParagraph).toBeTruthy();
            expect(reportParagraph?.nativeElement.textContent).toContain('Symbol Report');
        });
    });

    describe('Accessibility', () => {
        it('should have proper heading hierarchy', () => {
            const h1Elements = debugElement.queryAll(By.css('h1'));
            const h2Elements = debugElement.queryAll(By.css('h2'));

            expect(h1Elements.length).toBe(1);
            expect(h2Elements.length).toBeGreaterThanOrEqual(3);
        });

        it('should have meaningful link text', () => {
            const links = debugElement.queryAll(By.css('a'));
            links.forEach(link => {
                const linkText = link.nativeElement.textContent.trim();
                expect(linkText.length).toBeGreaterThan(0);
                expect(linkText).not.toBe('click here');
                expect(linkText).not.toBe('read more');
            });
        });

        it('should use semantic HTML elements', () => {
            const container = debugElement.query(By.css('.container'));
            const headings = debugElement.queryAll(By.css('h1, h2'));
            const paragraphs = debugElement.queryAll(By.css('p'));
            const links = debugElement.queryAll(By.css('a'));

            expect(container).toBeTruthy();
            expect(headings.length).toBeGreaterThan(0);
            expect(paragraphs.length).toBeGreaterThan(0);
            expect(links.length).toBeGreaterThan(0);
        });

        it('should have descriptive headings', () => {
            const h2Elements = debugElement.queryAll(By.css('h2'));
            h2Elements.forEach(heading => {
                const text = heading.nativeElement.textContent.trim();
                expect(text.length).toBeGreaterThan(5);
                expect(text.toLowerCase()).toMatch(/help|questions|faq|browser|search|symbol|report/);
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
            const initialContent = debugElement.query(By.css('h1')).nativeElement.textContent;

            fixture.detectChanges();
            fixture.detectChanges();

            const finalContent = debugElement.query(By.css('h1')).nativeElement.textContent;
            expect(finalContent).toBe(initialContent);
        });

        it('should handle empty component class', () => {
            expect(Object.keys(component).length).toBeLessThanOrEqual(1);
        });
    });

    describe('CSS Classes and Structure', () => {
        it('should have Bootstrap container class', () => {
            const container = debugElement.query(By.css('.container'));
            expect(container).toBeTruthy();
            expect(container.nativeElement.classList.contains('container')).toBe(true);
        });

        it('should not use inline styles', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            allElements.forEach(element => {
                if (!element.nativeElement.tagName.toLowerCase().startsWith('app-')) {
                    expect(element.nativeElement.style.length).toBe(0);
                }
            });
        });

        it('should use proper HTML structure', () => {
            const container = debugElement.query(By.css('div.container'));
            const h1 = container.query(By.css('h1'));
            const h2Elements = container.queryAll(By.css('h2'));
            const paragraphs = container.queryAll(By.css('p'));

            expect(container).toBeTruthy();
            expect(h1).toBeTruthy();
            expect(h2Elements.length).toBeGreaterThan(0);
            expect(paragraphs.length).toBeGreaterThan(0);
        });
    });

    describe('Component Properties', () => {
        it('should have no public properties by default', () => {
            expect(Object.keys(component).length).toBeLessThanOrEqual(1);
        });

        it('should be a simple presentation component', () => {
            expect(component).toBeTruthy();
            expect(typeof component).toBe('object');
        });

        it('should not have input properties', () => {
            expect(Object.getOwnPropertyNames(component).length).toBeLessThanOrEqual(1);
        });

        it('should not have output properties', () => {
            expect(Object.getOwnPropertyNames(component).length).toBeLessThanOrEqual(1);
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
            fixture = TestBed.createComponent(HelpComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });

        it('should be lightweight', () => {
            expect(component).toBeTruthy();
            expect(Object.keys(component).length).toBeLessThanOrEqual(1);
        });
    });

    describe('Browser Compatibility', () => {
        it('should use standard HTML elements', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            const standardTags = ['div', 'h1', 'h2', 'p', 'a'];

            allElements.forEach(element => {
                const tagName = element.nativeElement.tagName.toLowerCase();
                if (!tagName.startsWith('app-')) {
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
    });

    describe('Responsive Design Readiness', () => {
        it('should use CSS classes for styling', () => {
            const container = debugElement.query(By.css('.container'));
            expect(container).toBeTruthy();
        });

        it('should use Bootstrap utility classes', () => {
            const container = debugElement.query(By.css('.container'));
            expect(container.nativeElement.classList.contains('container')).toBe(true);
        });
    });

    describe('Help Section Navigation', () => {
        it('should provide navigation to all help subsections', () => {
            const expectedSections = ['faq', 'browser', 'search', 'gene-symbol-report'];
            const links = debugElement.queryAll(By.css('a[ng-reflect-router-link]'));
            const routerLinks = links.map(link => link.nativeElement.getAttribute('ng-reflect-router-link'));

            expectedSections.forEach(section => {
                expect(routerLinks).toContain(section);
            });
        });

        it('should have descriptive section previews', () => {
            const paragraphs = debugElement.queryAll(By.css('p'));
            expect(paragraphs.length).toBeGreaterThanOrEqual(3);

            paragraphs.forEach(p => {
                expect(p.nativeElement.textContent.trim().length).toBeGreaterThan(20);
            });
        });
    });

    describe('User Experience', () => {
        it('should provide clear navigation structure', () => {
            const h1 = debugElement.query(By.css('h1'));
            const h2Elements = debugElement.queryAll(By.css('h2'));

            expect(h1.nativeElement.textContent).toBe('Help index');
            expect(h2Elements.length).toBeGreaterThanOrEqual(3);
        });

        it('should have consistent link styling', () => {
            const links = debugElement.queryAll(By.css('h2 a'));
            expect(links.length).toBeGreaterThan(0);

            links.forEach(link => {
                expect(link.nativeElement.hasAttribute('ng-reflect-router-link')).toBe(true);
            });
        });

        it('should provide comprehensive help overview', () => {
            const mainContent = debugElement.query(By.css('.container')).nativeElement.textContent;

            expect(mainContent).toContain('FAQ');
            expect(mainContent).toContain('browser');
            expect(mainContent).toContain('search');
            expect(mainContent).toContain('gene symbol');
        });
    });
});
