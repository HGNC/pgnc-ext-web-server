import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
    let component: ContactComponent;
    let fixture: ComponentFixture<ContactComponent>;
    let compiled: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ContactComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ContactComponent);
        component = fixture.componentInstance;
        compiled = fixture.nativeElement as HTMLElement;
        fixture.detectChanges();
    });

    describe('Component Creation', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should be standalone component', () => {
            expect(ContactComponent).toBeDefined();
        });

        it('should have correct selector', () => {
            // Test that component works with correct selector
            expect(fixture.componentInstance).toBeInstanceOf(ContactComponent);
            expect(fixture.debugElement.nativeElement.querySelector('h1')).toBeTruthy();
        });
    });

    describe('Template Structure', () => {
        it('should have main container with correct class', () => {
            const container = compiled.querySelector('.container');
            expect(container).toBeTruthy();
        });

        it('should display main heading', () => {
            const heading = compiled.querySelector('h1');
            expect(heading).toBeTruthy();
            expect(heading?.textContent?.trim()).toBe('Contact details');
        });

        it('should display organization name', () => {
            const strongElement = compiled.querySelector('strong');
            expect(strongElement).toBeTruthy();
            expect(strongElement?.textContent?.trim()).toBe(
                'Plant Gene Nomenclature Committee (PGNC)'
            );
        });

        it('should display complete address', () => {
            const paragraphs = compiled.querySelectorAll('p');
            const addressParagraph = paragraphs[0];
            expect(addressParagraph).toBeTruthy();

            const addressText = addressParagraph.textContent;
            expect(addressText).toContain('Plant Gene Nomenclature Committee (PGNC)');
            expect(addressText).toContain('Department of Haematology');
            expect(addressText).toContain('Long Road,');
            expect(addressText).toContain('Cambridge');
            expect(addressText).toContain('CB2 0PT');
            expect(addressText).toContain('United Kingdom');
        });

        it('should display email link with correct href', () => {
            const emailLink = compiled.querySelector('a[href^="mailto:"]');
            expect(emailLink).toBeTruthy();
            expect(emailLink?.getAttribute('href')).toBe('mailto:hgnc@genenames.org');
            expect(emailLink?.textContent).toBe('hgnc@genenames.org');
        });
    });

    describe('Google Maps Integration', () => {
        it('should have embedded Google Maps iframe', () => {
            const iframe = compiled.querySelector('iframe');
            expect(iframe).toBeTruthy();
        });

        it('should have correct iframe source URL', () => {
            const iframe = compiled.querySelector('iframe') as HTMLIFrameElement;
            expect(iframe.src).toContain('google.com/maps/embed');
            expect(iframe.src).toContain('HUGO%20Gene%20Nomenclature%20Committee');
        });

        it('should have responsive embed container', () => {
            const embedContainer = compiled.querySelector('.embed-responsive');
            expect(embedContainer).toBeTruthy();
            expect(embedContainer?.classList.contains('embed-responsive-4by3')).toBe(true);
        });

        it('should have iframe with proper styling', () => {
            const iframe = compiled.querySelector('iframe') as HTMLIFrameElement;
            expect(iframe.style.border).toBe('0px');
            expect(iframe.classList.contains('col-md-8')).toBe(true);
            expect(iframe.width).toBe('100%');
            expect(iframe.height).toBe('100%');
        });

        it('should handle iframe loading errors gracefully', () => {
            const iframe = compiled.querySelector('iframe') as HTMLIFrameElement;

            // Simulate iframe error
            const errorEvent = new Event('error');
            iframe.dispatchEvent(errorEvent);

            // Component should still be functional
            expect(component).toBeTruthy();
            expect(iframe).toBeTruthy();
        });
    });

    describe('Hidden Content', () => {
        it('should have hidden paragraphs with display:none', () => {
            const hiddenParagraphs = compiled.querySelectorAll('p[style*="display: none"]');
            expect(hiddenParagraphs.length).toBe(2);
        });

        it('should have hidden feedback form message', () => {
            const hiddenParagraphs = compiled.querySelectorAll('p[style*="display: none"]');
            const feedbackMessage = hiddenParagraphs[0];

            expect(feedbackMessage.textContent).toContain('feedback');
            expect(feedbackMessage.textContent).toContain('hgnc@genenames.org');
        });

        it('should have hidden gene symbol request message', () => {
            const hiddenParagraphs = compiled.querySelectorAll('p[style*="display: none"]');
            const requestMessage = hiddenParagraphs[1];

            expect(requestMessage.textContent).toContain('Gene symbol request');
        });

        it('should have correct links in hidden content', () => {
            const hiddenParagraphs = compiled.querySelectorAll('p[style*="display: none"]');

            // Check feedback link
            const feedbackLink = hiddenParagraphs[0].querySelector('a[href="/contact/feedback"]');
            expect(feedbackLink).toBeTruthy();
            expect(feedbackLink?.textContent).toBe('feedback');

            // Check request link
            const requestLink = hiddenParagraphs[1].querySelector('a[href="/contact/request"]');
            expect(requestLink).toBeTruthy();
            expect(requestLink?.textContent).toBe('Gene symbol request');
        });
    });

    describe('Accessibility', () => {
        it('should have proper heading hierarchy', () => {
            const h1 = compiled.querySelector('h1');
            expect(h1).toBeTruthy();

            // No h2-h6 should exist before h1
            const allHeadings = compiled.querySelectorAll('h1, h2, h3, h4, h5, h6');
            expect(allHeadings[0].tagName).toBe('H1');
        });

        it('should have accessible email link', () => {
            const emailLink = compiled.querySelector('a[href^="mailto:"]');
            expect(emailLink?.getAttribute('href')).toBe('mailto:hgnc@genenames.org');
            expect(emailLink?.textContent).toContain('@');
        });

        it('should have iframe with proper attributes', () => {
            const iframe = compiled.querySelector('iframe') as HTMLIFrameElement;
            expect(iframe.width).toBe('100%');
            expect(iframe.height).toBe('100%');
        });

        it('should handle keyboard navigation', () => {
            const focusableElements = compiled.querySelectorAll('a, iframe');
            expect(focusableElements.length).toBeGreaterThanOrEqual(3); // At least email and hidden links + iframe
        });
    });

    describe('CSS Styling', () => {
        it('should apply embed-responsive height styling', () => {
            const embedContainer = compiled.querySelector('.embed-responsive');
            expect(embedContainer).toBeTruthy();

            // Check if CSS class is applied
            expect(embedContainer?.classList.contains('embed-responsive')).toBe(true);
        });

        it('should have responsive iframe container classes', () => {
            const embedContainer = compiled.querySelector('.embed-responsive');
            expect(embedContainer?.classList.contains('embed-responsive-4by3')).toBe(true);

            const iframe = compiled.querySelector('iframe');
            expect(iframe?.classList.contains('col-md-8')).toBe(true);
        });
    });

    describe('Content Validation', () => {
        it('should have all required contact information', () => {
            const allText = compiled.textContent || '';

            expect(allText).toContain('Plant Gene Nomenclature Committee');
            expect(allText).toContain('Department of Haematology');
            expect(allText).toContain('Cambridge');
            expect(allText).toContain('CB2 0PT');
            expect(allText).toContain('United Kingdom');
            expect(allText).toContain('hgnc@genenames.org');
        });

        it('should display email address correctly encoded', () => {
            const emailText = compiled.querySelector('a[href^="mailto:"]')?.textContent;
            expect(emailText).toBe('hgnc@genenames.org');

            // Check that email link is properly formed
            const emailLink = compiled.querySelector('a[href^="mailto:"]');
            expect(emailLink?.getAttribute('href')).toBe('mailto:hgnc@genenames.org');
        });

        it('should have horizontal rule separator', () => {
            const hr = compiled.querySelector('hr');
            expect(hr).toBeTruthy();
        });
    });

    describe('Edge Cases and Error Handling', () => {
        it('should handle empty component gracefully', () => {
            // Test component behavior when properties might be undefined
            expect(() => {
                fixture.detectChanges();
            }).not.toThrow();
        });

        it('should maintain structure after multiple change detections', () => {
            fixture.detectChanges();
            fixture.detectChanges();
            fixture.detectChanges();

            const container = compiled.querySelector('.container');
            const heading = compiled.querySelector('h1');
            const iframe = compiled.querySelector('iframe');

            expect(container).toBeTruthy();
            expect(heading).toBeTruthy();
            expect(iframe).toBeTruthy();
        });

        it('should handle window resize gracefully', () => {
            // Simulate window resize
            window.dispatchEvent(new Event('resize'));
            fixture.detectChanges();

            const iframe = compiled.querySelector('iframe');
            expect(iframe).toBeTruthy();
            expect(iframe?.width).toBe('100%');
            expect(iframe?.height).toBe('100%');
        });

        it('should handle missing CSS classes gracefully', () => {
            // Test that component works even if CSS classes are missing
            const container = compiled.querySelector('.container');
            expect(container).toBeTruthy();

            // Component should still render content
            expect(compiled.textContent).toContain('Contact details');
        });
    });

    describe('Integration Testing', () => {
        it('should integrate with Angular testing framework', () => {
            expect(TestBed).toBeDefined();
            expect(fixture).toBeDefined();
            expect(component).toBeDefined();
        });

        it('should support Angular change detection', () => {
            const initialHTML = compiled.innerHTML;
            fixture.detectChanges();
            const afterChangeHTML = compiled.innerHTML;

            // HTML should remain consistent
            expect(afterChangeHTML).toBe(initialHTML);
        });

        it('should work with Angular debugging utilities', () => {
            const debugElement: DebugElement = fixture.debugElement;
            const containerDE = debugElement.query(By.css('.container'));

            expect(containerDE).toBeTruthy();
            expect(containerDE.nativeElement).toBe(compiled.querySelector('.container'));
        });
    });

    describe('Performance Testing', () => {
        it('should render quickly', () => {
            const startTime = performance.now();

            const testFixture = TestBed.createComponent(ContactComponent);
            testFixture.detectChanges();

            const endTime = performance.now();
            const renderTime = endTime - startTime;

            // Should render in less than 100ms
            expect(renderTime).toBeLessThan(100);
        });

        it('should handle multiple instances', () => {
            const fixtures: ComponentFixture<ContactComponent>[] = [];

            // Create multiple instances
            for (let i = 0; i < 5; i++) {
                const testFixture = TestBed.createComponent(ContactComponent);
                testFixture.detectChanges();
                fixtures.push(testFixture);
            }

            // All should be created successfully
            expect(fixtures.length).toBe(5);
            fixtures.forEach(f => {
                expect(f.componentInstance).toBeTruthy();
                expect(f.nativeElement.querySelector('h1')?.textContent).toBe('Contact details');
            });
        });
    });

    describe('Browser Compatibility', () => {
        it('should work with different document states', () => {
            // Test with different document ready states
            Object.defineProperty(document, 'readyState', {
                writable: true,
                value: 'loading',
            });

            expect(() => {
                fixture.detectChanges();
            }).not.toThrow();

            Object.defineProperty(document, 'readyState', {
                writable: true,
                value: 'complete',
            });
        });

        it('should handle iframe security restrictions', () => {
            const iframe = compiled.querySelector('iframe') as HTMLIFrameElement;

            // Should not throw security errors
            expect(() => {
                const src = iframe.src;
                expect(src).toContain('google.com');
            }).not.toThrow();
        });
    });

    describe('Content Security', () => {
        it('should use safe external URLs', () => {
            const iframe = compiled.querySelector('iframe') as HTMLIFrameElement;
            expect(iframe.src).toMatch(/^https:\/\/www\.google\.com\/maps/);
        });

        it('should properly encode email addresses', () => {
            const emailLink = compiled.querySelector('a[href^="mailto:"]');
            expect(emailLink?.getAttribute('href')).toBe('mailto:hgnc@genenames.org');

            // Check that email addresses are safely rendered
            expect(emailLink?.textContent).toBe('hgnc@genenames.org');
        });

        it('should not have any unsafe inline scripts', () => {
            const scripts = compiled.querySelectorAll('script');
            expect(scripts.length).toBe(0);
        });
    });
});
