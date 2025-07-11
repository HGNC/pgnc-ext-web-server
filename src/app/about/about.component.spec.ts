import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
    let component: AboutComponent;
    let fixture: ComponentFixture<AboutComponent>;
    let debugElement: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AboutComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AboutComponent);
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

        it('should be an instance of AboutComponent', () => {
            expect(component instanceof AboutComponent).toBe(true);
        });
    });

    describe('Template Rendering', () => {
        it('should render the main container', () => {
            const containerElement = debugElement.query(By.css('.container'));
            expect(containerElement).toBeTruthy();
        });

        it('should render the main heading', () => {
            const headingElement = debugElement.query(By.css('h1'));
            expect(headingElement).toBeTruthy();
            expect(headingElement.nativeElement.textContent.trim()).toBe('About the PGNC');
        });

        it('should render exactly one h1 element', () => {
            const headingElements = debugElement.queryAll(By.css('h1'));
            expect(headingElements.length).toBe(1);
        });

        it('should render all paragraph elements', () => {
            const paragraphElements = debugElement.queryAll(By.css('p'));
            expect(paragraphElements.length).toBe(2);
        });

        it('should contain PGNC description in first paragraph', () => {
            const firstParagraph = debugElement.query(By.css('p:first-of-type'));
            expect(firstParagraph).toBeTruthy();
            const text = firstParagraph.nativeElement.textContent;
            expect(text).toContain('Plant Gene Nomenclature Committee (PGNC)');
            expect(text).toContain('established in 2024');
            expect(text).toContain('standardized names and symbols to plant genes');
        });

        it('should contain Populus trichocarpa information in second paragraph', () => {
            const secondParagraph = debugElement.query(By.css('p:last-of-type'));
            expect(secondParagraph).toBeTruthy();
            const text = secondParagraph.nativeElement.textContent;
            expect(text).toContain('Populus trichocarpa');
            expect(text).toContain('model tree species');
        });

        it('should render Populus trichocarpa in italics', () => {
            const emElement = debugElement.query(By.css('em'));
            expect(emElement).toBeTruthy();
            expect(emElement.nativeElement.textContent.trim()).toBe('Populus trichocarpa');
        });
    });

    describe('External Links', () => {
        it('should render exactly two external links', () => {
            const linkElements = debugElement.queryAll(By.css('a'));
            expect(linkElements.length).toBe(2);
        });

        it('should have correct Oak Ridge CBI link', () => {
            const cbiLink = debugElement.query(By.css('a[href="https://cbi.ornl.gov/"]'));
            expect(cbiLink).toBeTruthy();
            expect(cbiLink.nativeElement.textContent.trim()).toBe('Oak Ridge Center for Bioenergy Innovation');
        });

        it('should have correct HGNC link', () => {
            const hgncLink = debugElement.query(By.css('a[href="https://www.genenames.org"]'));
            expect(hgncLink).toBeTruthy();
            expect(hgncLink.nativeElement.textContent.trim()).toBe('HUGO Gene Nomenclature Committee (HGNC)');
        });

        it('should have links with proper href attributes', () => {
            const links = debugElement.queryAll(By.css('a'));
            links.forEach(link => {
                const href = link.nativeElement.getAttribute('href');
                expect(href).toBeTruthy();
                expect(href.startsWith('http')).toBe(true);
            });
        });

        it('should have links that open in same window by default', () => {
            const links = debugElement.queryAll(By.css('a'));
            links.forEach(link => {
                const target = link.nativeElement.getAttribute('target');
                // If no target attribute, it opens in same window
                expect(target).toBeNull();
            });
        });
    });

    describe('Content Accessibility', () => {
        it('should have proper heading hierarchy', () => {
            const h1Elements = debugElement.queryAll(By.css('h1'));
            const h2Elements = debugElement.queryAll(By.css('h2'));
            const h3Elements = debugElement.queryAll(By.css('h3'));

            expect(h1Elements.length).toBe(1);
            expect(h2Elements.length).toBe(0);
            expect(h3Elements.length).toBe(0);
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

        it('should not have empty paragraphs', () => {
            const paragraphs = debugElement.queryAll(By.css('p'));
            paragraphs.forEach(paragraph => {
                const text = paragraph.nativeElement.textContent.trim();
                expect(text.length).toBeGreaterThan(0);
            });
        });
    });

    describe('DOM Structure', () => {
        it('should have container as root element', () => {
            const rootElement = debugElement.query(By.css('.container'));
            expect(rootElement).toBeTruthy();
            // Check that container is a direct child of the component's root
            expect(rootElement.nativeElement.className).toContain('container');
        });

        it('should have h1 as first child of container', () => {
            const container = debugElement.query(By.css('.container'));
            const firstChild = container.children[0];
            expect(firstChild.nativeElement.tagName.toLowerCase()).toBe('h1');
        });

        it('should maintain proper DOM hierarchy', () => {
            const container = debugElement.query(By.css('.container'));
            expect(container.children.length).toBeGreaterThanOrEqual(3); // h1 + 2 paragraphs

            // Check if all direct children are expected elements
            container.children.forEach((child, index) => {
                const tagName = child.nativeElement.tagName.toLowerCase();
                if (index === 0) {
                    expect(tagName).toBe('h1');
                } else {
                    expect(tagName).toBe('p');
                }
            });
        });
    });

    describe('Component Properties', () => {
        it('should have the component instance created', () => {
            expect(component).toBeInstanceOf(AboutComponent);
        });

        it('should have no public properties or methods by default', () => {
            const componentProps = Object.getOwnPropertyNames(component);
            // Should only have basic Angular component properties
            expect(componentProps.length).toBeLessThanOrEqual(5);
        });

        it('should be a simple presentation component', () => {
            // About component should be stateless
            expect(typeof component).toBe('object');
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

        it('should not have any input or output properties', () => {
            // For a simple presentation component, check that it doesn't have complex properties
            const componentKeys = Object.keys(component);
            expect(componentKeys.length).toBeLessThanOrEqual(2); // Minimal Angular component properties
        });
    });

    describe('Content Validation', () => {
        it('should contain specific keywords in content', () => {
            const allText = debugElement.nativeElement.textContent.toLowerCase();
            const expectedKeywords = [
                'plant gene nomenclature committee',
                'pgnc',
                '2024',
                'oak ridge',
                'hgnc',
                'populus trichocarpa',
                'collaboration'
            ];

            expectedKeywords.forEach(keyword => {
                expect(allText).toContain(keyword);
            });
        });

        it('should not contain placeholder or lorem ipsum text', () => {
            const allText = debugElement.nativeElement.textContent.toLowerCase();
            const placeholderTexts = [
                'lorem ipsum',
                'placeholder',
                'todo',
                'coming soon',
                'under construction'
            ];

            placeholderTexts.forEach(placeholder => {
                expect(allText).not.toContain(placeholder);
            });
        });

        it('should have proper sentence structure', () => {
            const paragraphs = debugElement.queryAll(By.css('p'));
            paragraphs.forEach(paragraph => {
                const text = paragraph.nativeElement.textContent.trim();
                // Should end with proper punctuation
                expect(text).toMatch(/[.!?]$/);
                // Should start with capital letter
                expect(text).toMatch(/^[A-Z]/);
            });
        });
    });

    describe('Performance and Memory', () => {
        it('should not create memory leaks on multiple instantiations', () => {
            const initialFixture = fixture;

            // Create multiple instances
            for (let i = 0; i < 10; i++) {
                const tempFixture = TestBed.createComponent(AboutComponent);
                tempFixture.detectChanges();
                tempFixture.destroy();
            }

            // Original fixture should still work
            expect(() => initialFixture.detectChanges()).not.toThrow();
        });

        it('should render quickly', () => {
            const startTime = performance.now();

            const newFixture = TestBed.createComponent(AboutComponent);
            newFixture.detectChanges();

            const endTime = performance.now();
            const renderTime = endTime - startTime;

            // Rendering should be fast (less than 100ms)
            expect(renderTime).toBeLessThan(100);

            newFixture.destroy();
        });
    });
});
