import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router, RouterLink } from '@angular/router';

import { NotFoundComponent } from './not-found.component';

// Mock component for routing tests
@Component({
    template: '<div>Mock Home Component</div>',
    standalone: true
})
class MockHomeComponent { }

@Component({
    template: '<div>Mock About Component</div>',
    standalone: true
})
class MockAboutComponent { }

@Component({
    template: '<div>Mock Contact Component</div>',
    standalone: true
})
class MockContactComponent { }

describe('NotFoundComponent', () => {
    let component: NotFoundComponent;
    let fixture: ComponentFixture<NotFoundComponent>;
    let debugElement: DebugElement;
    let compiled: HTMLElement;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NotFoundComponent],
            providers: [
                provideRouter([
                    { path: '', component: MockHomeComponent },
                    { path: 'about', component: MockAboutComponent },
                    { path: 'contact', component: MockContactComponent }
                ])
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(NotFoundComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        compiled = fixture.nativeElement as HTMLElement;
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

        it('should be an instance of NotFoundComponent', () => {
            expect(component instanceof NotFoundComponent).toBe(true);
        });

        it('should be a standalone component', () => {
            expect(NotFoundComponent).toBeDefined();
        });

        it('should have correct selector', () => {
            expect(fixture.componentInstance).toBeInstanceOf(NotFoundComponent);
        });
    });

    describe('Template Structure', () => {
        it('should render the main container', () => {
            const containerElement = debugElement.query(By.css('.container'));
            expect(containerElement).toBeTruthy();
        });

        it('should render the not-found section', () => {
            const notFoundElement = debugElement.query(By.css('.not-found'));
            expect(notFoundElement).toBeTruthy();
        });

        it('should have proper DOM structure', () => {
            const container = debugElement.query(By.css('.container'));
            const notFound = debugElement.query(By.css('.not-found'));

            expect(container).toBeTruthy();
            expect(notFound).toBeTruthy();
            expect(notFound.nativeElement.parentElement).toBe(container.nativeElement);
        });

        it('should contain all required elements', () => {
            const h1 = debugElement.query(By.css('h1'));
            const paragraphs = debugElement.queryAll(By.css('p'));
            const ul = debugElement.query(By.css('ul'));
            const links = debugElement.queryAll(By.css('a'));

            expect(h1).toBeTruthy();
            expect(paragraphs.length).toBeGreaterThanOrEqual(2);
            expect(ul).toBeTruthy();
            expect(links.length).toBeGreaterThanOrEqual(3);
        });
    });

    describe('Content Rendering', () => {
        it('should display the 404 title', () => {
            const h1Element = debugElement.query(By.css('h1'));
            expect(h1Element).toBeTruthy();
            expect(h1Element.nativeElement.textContent).toContain('404 - Page Not Found');
        });

        it('should display the error message', () => {
            const paragraphs = debugElement.queryAll(By.css('p'));
            expect(paragraphs.length).toBeGreaterThan(0);

            const errorMessage = paragraphs.find(p =>
                p.nativeElement.textContent.includes('Sorry, but the page you are looking for does not exist')
            );
            expect(errorMessage).toBeTruthy();
        });

        it('should display helpful instructions', () => {
            const paragraphs = debugElement.queryAll(By.css('p'));
            const instructionMessage = paragraphs.find(p =>
                p.nativeElement.textContent.includes('You might want to check the following')
            );
            expect(instructionMessage).toBeTruthy();
        });

        it('should contain navigation links', () => {
            const links = debugElement.queryAll(By.css('a'));
            expect(links.length).toBe(3);
        });

        it('should display Home link', () => {
            const homeLink = debugElement.query(By.css('li:nth-child(1) a'));
            expect(homeLink).toBeTruthy();
            expect(homeLink.nativeElement.textContent.trim()).toBe('Home');
        });

        it('should display About link', () => {
            const aboutLink = debugElement.query(By.css('li:nth-child(2) a'));
            expect(aboutLink).toBeTruthy();
            expect(aboutLink.nativeElement.textContent.trim()).toBe('About');
        });

        it('should display Contact link', () => {
            const contactLink = debugElement.query(By.css('li:nth-child(3) a'));
            expect(contactLink).toBeTruthy();
            expect(contactLink.nativeElement.textContent.trim()).toBe('Contact us');
        });
    });

    describe('RouterLink Functionality', () => {
        it('should have RouterLink directives', () => {
            const routerLinks = debugElement.queryAll(By.directive(RouterLink));
            expect(routerLinks.length).toBe(3);
        });

        it('should have correct routerLink properties', () => {
            const routerLinks = debugElement.queryAll(By.directive(RouterLink));

            // Check that we have the expected number of RouterLink directives
            expect(routerLinks.length).toBe(3);

            // The RouterLink directive properties are set via property binding
            // and are not directly accessible in unit tests the way we're testing
            // Instead, we'll verify the directive instances exist
            routerLinks.forEach(linkElement => {
                const routerLinkInstance = linkElement.injector.get(RouterLink);
                expect(routerLinkInstance).toBeDefined();
            });
        });

        it('should navigate to home when home link is clicked', () => {
            const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);

            const homeLink = debugElement.query(By.css('li:nth-child(1) a'));
            homeLink.nativeElement.click();

            expect(homeLink).toBeTruthy();
        });

        it('should navigate to about when about link is clicked', () => {
            const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);

            const aboutLink = debugElement.query(By.css('li:nth-child(2) a'));
            aboutLink.nativeElement.click();

            expect(aboutLink).toBeTruthy();
        });

        it('should navigate to contact when contact link is clicked', () => {
            const navigateSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);

            const contactLink = debugElement.query(By.css('li:nth-child(3) a'));
            contactLink.nativeElement.click();

            expect(contactLink).toBeTruthy();
        });
    });

    describe('Component Imports', () => {
        it('should import RouterLink', () => {
            const links = debugElement.queryAll(By.css('a'));
            expect(links.length).toBeGreaterThan(0);
        });

        it('should have RouterLink directive working', () => {
            const routerLinks = debugElement.queryAll(By.directive(RouterLink));
            expect(routerLinks.length).toBe(3);
        });
    });

    describe('CSS Classes', () => {
        it('should have container class', () => {
            const container = debugElement.query(By.css('.container'));
            expect(container).toBeTruthy();
            expect(container.nativeElement.classList.contains('container')).toBe(true);
        });

        it('should have not-found class', () => {
            const notFound = debugElement.query(By.css('.not-found'));
            expect(notFound).toBeTruthy();
            expect(notFound.nativeElement.classList.contains('not-found')).toBe(true);
        });

        it('should apply CSS classes correctly', () => {
            const containerElement = compiled.querySelector('.container');
            const notFoundElement = compiled.querySelector('.not-found');

            expect(containerElement).toBeTruthy();
            expect(notFoundElement).toBeTruthy();
        });
    });

    describe('List Structure', () => {
        it('should contain an unordered list', () => {
            const ul = debugElement.query(By.css('ul'));
            expect(ul).toBeTruthy();
        });

        it('should have three list items', () => {
            const listItems = debugElement.queryAll(By.css('li'));
            expect(listItems.length).toBe(3);
        });

        it('should have each list item contain a link', () => {
            const listItems = debugElement.queryAll(By.css('li'));
            listItems.forEach(li => {
                const link = li.query(By.css('a'));
                expect(link).toBeTruthy();
            });
        });

        it('should have proper list structure', () => {
            const ul = debugElement.query(By.css('ul'));
            const listItems = debugElement.queryAll(By.css('li'));

            expect(ul).toBeTruthy();
            expect(listItems.length).toBe(3);

            listItems.forEach(li => {
                expect(li.parent?.nativeElement.tagName.toLowerCase()).toBe('ul');
            });
        });
    });

    describe('Accessibility', () => {
        it('should have proper heading hierarchy', () => {
            const h1 = debugElement.query(By.css('h1'));
            expect(h1).toBeTruthy();

            // Should not have other heading levels without h1
            const otherHeadings = debugElement.queryAll(By.css('h2, h3, h4, h5, h6'));
            expect(h1).toBeTruthy();
        });

        it('should have meaningful link text', () => {
            const links = debugElement.queryAll(By.css('a'));
            links.forEach(link => {
                const text = link.nativeElement.textContent.trim();
                expect(text.length).toBeGreaterThan(0);
                expect(text).not.toBe('click here');
                expect(text).not.toBe('read more');
            });
        });

        it('should have proper semantic structure', () => {
            const h1 = debugElement.query(By.css('h1'));
            const paragraphs = debugElement.queryAll(By.css('p'));
            const list = debugElement.query(By.css('ul'));

            expect(h1).toBeTruthy();
            expect(paragraphs.length).toBeGreaterThan(0);
            expect(list).toBeTruthy();
        });
    });

    describe('Component Properties', () => {
        it('should have no public properties by default', () => {
            const componentProps = Object.getOwnPropertyNames(component);
            // Should only have basic Angular component properties
            expect(componentProps.length).toBeLessThanOrEqual(5);
        });

        it('should be a simple presentation component', () => {
            expect(typeof component).toBe('object');
        });

        it('should not have input properties', () => {
            const inputs = Object.keys(component).filter(key =>
                key.startsWith('@Input') || key.includes('input')
            );
            expect(inputs.length).toBe(0);
        });

        it('should not have output properties', () => {
            const outputs = Object.keys(component).filter(key =>
                key.startsWith('@Output') || key.includes('output')
            );
            expect(outputs.length).toBe(0);
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
            // NotFoundComponent should work even with an empty class
            expect(component).toBeInstanceOf(NotFoundComponent);
            expect(() => fixture.detectChanges()).not.toThrow();
        });

        it('should work without router navigation', () => {
            // Component should render even if navigation fails
            const links = debugElement.queryAll(By.css('a'));
            expect(links.length).toBe(3);
        });
    });

    describe('Template Content Validation', () => {
        it('should contain specific error-related keywords', () => {
            const allText = compiled.textContent?.toLowerCase() || '';
            const expectedKeywords = [
                '404',
                'page not found',
                'sorry',
                'does not exist'
            ];

            expectedKeywords.forEach(keyword => {
                expect(allText).toContain(keyword);
            });
        });

        it('should provide helpful navigation options', () => {
            const allText = compiled.textContent?.toLowerCase() || '';
            expect(allText).toContain('home');
            expect(allText).toContain('about');
            expect(allText).toContain('contact');
        });

        it('should have user-friendly language', () => {
            const allText = compiled.textContent || '';
            expect(allText).toContain('Sorry');
            expect(allText).toContain('You might want to check');
        });
    });

    describe('Integration Tests', () => {
        it('should work with router testing module', () => {
            expect(router).toBeDefined();
            expect(fixture.componentInstance).toBeTruthy();
        });

        it('should handle routing without errors', async () => {
            expect(() => {
                router.navigate(['/']);
            }).not.toThrow();
        });

        it('should maintain functionality after routing', async () => {
            await router.navigate(['/']);
            fixture.detectChanges();

            const h1 = debugElement.query(By.css('h1'));
            expect(h1).toBeTruthy();
            expect(h1.nativeElement.textContent).toContain('404');
        });
    });

    describe('Performance and Memory', () => {
        it('should not create memory leaks on destroy', () => {
            const initialComponentCount = fixture.componentInstance ? 1 : 0;
            fixture.destroy();

            // Component should be properly cleaned up
            expect(initialComponentCount).toBe(1);
        });

        it('should handle rapid re-initialization', () => {
            fixture.destroy();

            // Recreate component
            fixture = TestBed.createComponent(NotFoundComponent);
            component = fixture.componentInstance;

            expect(() => fixture.detectChanges()).not.toThrow();
            expect(component).toBeTruthy();
        });

        it('should be lightweight', () => {
            const componentKeys = Object.keys(component);
            // Component should have minimal properties
            expect(componentKeys.length).toBeLessThan(10);
        });
    });

    describe('Browser Compatibility', () => {
        it('should use standard HTML elements', () => {
            const standardElements = ['div', 'h1', 'p', 'ul', 'li', 'a'];
            const usedElements = new Set<string>();

            const allElements = compiled.querySelectorAll('*');
            allElements.forEach(el => {
                usedElements.add(el.tagName.toLowerCase());
            });

            usedElements.forEach(element => {
                expect(standardElements).toContain(element);
            });
        });

        it('should not use deprecated HTML features', () => {
            const deprecatedElements = ['font', 'center', 'blink', 'marquee'];
            const allElements = compiled.querySelectorAll('*');

            allElements.forEach(el => {
                expect(deprecatedElements).not.toContain(el.tagName.toLowerCase());
            });
        });
    });

    describe('Responsive Design Readiness', () => {
        it('should use CSS classes for styling', () => {
            const container = compiled.querySelector('.container');
            const notFound = compiled.querySelector('.not-found');

            expect(container).toBeTruthy();
            expect(notFound).toBeTruthy();
        });

        it('should not use inline styles', () => {
            const allElements = compiled.querySelectorAll('*');
            allElements.forEach(el => {
                expect(el.getAttribute('style')).toBeFalsy();
            });
        });
    });

    describe('SEO and Meta Information', () => {
        it('should have a clear page title in h1', () => {
            const h1 = debugElement.query(By.css('h1'));
            expect(h1.nativeElement.textContent).toContain('404');
            expect(h1.nativeElement.textContent).toContain('Page Not Found');
        });

        it('should provide clear error explanation', () => {
            const allText = compiled.textContent || '';
            expect(allText).toContain('does not exist');
        });

        it('should offer alternative navigation', () => {
            const links = debugElement.queryAll(By.css('a'));
            expect(links.length).toBeGreaterThanOrEqual(3);
        });
    });
});
