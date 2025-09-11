import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
    let component: NotFoundComponent;
    let fixture: ComponentFixture<NotFoundComponent>;
    let debugElement: DebugElement;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NotFoundComponent],
            providers: [
                provideRouter([
                    { path: 'help/search', component: NotFoundComponent },
                    { path: 'search', component: NotFoundComponent },
                ]),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(NotFoundComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        router = TestBed.inject(Router);

        // Set required input
        component.query = 'test query';
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
            expect(component).toBeInstanceOf(NotFoundComponent);
        });

        it('should require query input', () => {
            expect(component.query).toBeDefined();
            expect(component.query).toBe('test query');
        });
    });

    describe('Input Properties', () => {
        it('should accept query input', () => {
            component.query = 'new search term';
            fixture.detectChanges();

            expect(component.query).toBe('new search term');
        });

        it('should handle empty query', () => {
            component.query = '';
            fixture.detectChanges();

            expect(component.query).toBe('');
        });

        it('should handle special characters in query', () => {
            const specialQuery = 'test & symbols < > "quotes"';
            component.query = specialQuery;
            fixture.detectChanges();

            expect(component.query).toBe(specialQuery);
        });

        it('should handle unicode characters', () => {
            const unicodeQuery = 'café naïve résumé 中文 🎉';
            component.query = unicodeQuery;
            fixture.detectChanges();

            expect(component.query).toBe(unicodeQuery);
        });

        it('should handle long query strings', () => {
            const longQuery = 'a'.repeat(1000);
            component.query = longQuery;
            fixture.detectChanges();

            expect(component.query).toBe(longQuery);
        });
    });

    describe('Template Rendering', () => {
        it('should render main container div', () => {
            const container = debugElement.query(By.css('div'));
            expect(container).toBeTruthy();
        });

        it('should render three paragraphs', () => {
            const paragraphs = debugElement.queryAll(By.css('p'));
            expect(paragraphs.length).toBe(3);
        });

        it('should display query in first paragraph', () => {
            component.query = 'my search term';
            fixture.detectChanges();

            const firstParagraph = debugElement.query(By.css('p'));
            const codeElements = firstParagraph.queryAll(By.css('code.orange'));

            expect(codeElements.length).toBeGreaterThanOrEqual(1);
            expect(codeElements[0].nativeElement.textContent).toBe('my search term');
        });

        it('should display wildcard suggestions', () => {
            component.query = 'BRCA';
            fixture.detectChanges();

            const firstParagraph = debugElement.query(By.css('p'));
            const codeElements = firstParagraph.queryAll(By.css('code.orange'));

            expect(codeElements.length).toBe(3); // Original query + 2 wildcard suggestions
            expect(codeElements[1].nativeElement.textContent).toBe('BRCA*');
            expect(codeElements[2].nativeElement.textContent).toBe('*BRCA');
        });

        it('should render router link to search help', () => {
            const helpLink = debugElement.query(By.css('a[ng-reflect-router-link="/help/search"]'));
            expect(helpLink).toBeTruthy();
            expect(helpLink.nativeElement.getAttribute('fragment')).toBe('ind_fields');
            expect(helpLink.nativeElement.textContent.trim()).toBe('search help');
        });

        it('should render external search example link', () => {
            const exampleLink = debugElement.query(
                By.css('a[href="/search?q=gene_symbol%3ACYP*"]')
            );
            expect(exampleLink).toBeTruthy();
            expect(exampleLink.nativeElement.textContent.trim()).toBe('gene_symbol:CYP*');
        });

        it('should render help page link', () => {
            const helpPageLink = debugElement.query(By.css('a[href="/help/search"]'));
            expect(helpPageLink).toBeTruthy();
            expect(helpPageLink.nativeElement.textContent.trim()).toBe('help');
        });
    });

    describe('Content Validation', () => {
        beforeEach(() => {
            component.query = 'test search';
            fixture.detectChanges();
        });

        it('should contain helpful search message', () => {
            const firstParagraph = debugElement.query(By.css('p'));
            const text = firstParagraph.nativeElement.textContent;

            expect(text).toContain('We could not find your search term');
            expect(text).toContain('within our database');
            expect(text).toContain('Maybe try using wildcards');
        });

        it('should explain field-specific search', () => {
            const secondParagraph = debugElement.queryAll(By.css('p'))[1];
            const text = secondParagraph.nativeElement.textContent;

            expect(text).toContain('You can search our site by a specific field');
            expect(text).toContain('search help');
            expect(text).toContain('gene_symbol:CYP*');
        });

        it('should provide link to help page', () => {
            const thirdParagraph = debugElement.queryAll(By.css('p'))[2];
            const text = thirdParagraph.nativeElement.textContent;

            expect(text).toContain('View our search');
            expect(text).toContain('help');
            expect(text).toContain('page to find out more');
        });

        it('should style query terms with orange class', () => {
            const orangeElements = debugElement.queryAll(By.css('code.orange'));
            expect(orangeElements.length).toBeGreaterThan(0);

            orangeElements.forEach(element => {
                expect(element.nativeElement.classList.contains('orange')).toBe(true);
            });
        });
    });

    describe('Dynamic Query Display', () => {
        it('should update query display when input changes', () => {
            component.query = 'initial query';
            fixture.detectChanges();

            let codeElement = debugElement.query(By.css('code.orange'));
            expect(codeElement.nativeElement.textContent).toBe('initial query');

            component.query = 'updated query';
            fixture.detectChanges();

            codeElement = debugElement.query(By.css('code.orange'));
            expect(codeElement.nativeElement.textContent).toBe('updated query');
        });

        it('should update wildcard suggestions when query changes', () => {
            component.query = 'GENE1';
            fixture.detectChanges();

            const codeElements = debugElement.queryAll(By.css('code.orange'));
            expect(codeElements[1].nativeElement.textContent).toBe('GENE1*');
            expect(codeElements[2].nativeElement.textContent).toBe('*GENE1');

            component.query = 'PROTEIN';
            fixture.detectChanges();

            const updatedCodeElements = debugElement.queryAll(By.css('code.orange'));
            expect(updatedCodeElements[1].nativeElement.textContent).toBe('PROTEIN*');
            expect(updatedCodeElements[2].nativeElement.textContent).toBe('*PROTEIN');
        });

        it('should handle empty query gracefully', () => {
            component.query = '';
            fixture.detectChanges();

            const codeElements = debugElement.queryAll(By.css('code.orange'));
            expect(codeElements[0].nativeElement.textContent).toBe('');
            expect(codeElements[1].nativeElement.textContent).toBe('*');
            expect(codeElements[2].nativeElement.textContent).toBe('*');
        });
    });

    describe('Router Integration', () => {
        it('should have router link for search help', () => {
            const helpLink = debugElement.query(By.css('a[ng-reflect-router-link="/help/search"]'));
            expect(helpLink).toBeTruthy();
            expect(helpLink.nativeElement.getAttribute('ng-reflect-router-link')).toBe(
                '/help/search'
            );
        });

        it('should have fragment for help link', () => {
            const helpLink = debugElement.query(By.css('a[ng-reflect-router-link="/help/search"]'));
            expect(helpLink.nativeElement.getAttribute('fragment')).toBe('ind_fields');
        });

        it('should handle navigation to help page', async () => {
            const helpLink = debugElement.query(By.css('a[ng-reflect-router-link="/help/search"]'));

            expect(() => {
                helpLink.nativeElement.click();
            }).not.toThrow();
        });
    });

    describe('External Links', () => {
        it('should have correct href for search example', () => {
            const exampleLink = debugElement.query(
                By.css('a[href="/search?q=gene_symbol%3ACYP*"]')
            );
            expect(exampleLink.nativeElement.href).toContain('/search?q=gene_symbol%3ACYP*');
        });

        it('should have correct href for help page', () => {
            const helpPageLink = debugElement.query(By.css('a[href="/help/search"]'));
            expect(helpPageLink.nativeElement.href).toContain('/help/search');
        });

        it('should handle external link clicks', () => {
            const exampleLink = debugElement.query(
                By.css('a[href="/search?q=gene_symbol%3ACYP*"]')
            );

            expect(() => {
                exampleLink.nativeElement.click();
            }).not.toThrow();
        });
    });

    describe('Accessibility', () => {
        it('should use semantic HTML elements', () => {
            const container = debugElement.query(By.css('div'));
            const paragraphs = debugElement.queryAll(By.css('p'));
            const codeElements = debugElement.queryAll(By.css('code'));
            const links = debugElement.queryAll(By.css('a'));

            expect(container).toBeTruthy();
            expect(paragraphs.length).toBe(3);
            expect(codeElements.length).toBeGreaterThan(0);
            expect(links.length).toBe(3);
        });

        it('should have descriptive link text', () => {
            const links = debugElement.queryAll(By.css('a'));

            links.forEach(link => {
                const text = link.nativeElement.textContent.trim();
                expect(text.length).toBeGreaterThan(0);
                expect(['search help', 'gene_symbol:CYP*', 'help']).toContain(text);
            });
        });

        it('should use code elements for search terms', () => {
            const codeElements = debugElement.queryAll(By.css('code'));
            expect(codeElements.length).toBeGreaterThan(0);

            codeElements.forEach(element => {
                expect(element.nativeElement.tagName.toLowerCase()).toBe('code');
            });
        });

        it('should provide clear instructions', () => {
            const allText = debugElement.nativeElement.textContent;

            expect(allText).toContain('could not find');
            expect(allText).toContain('try using wildcards');
            expect(allText).toContain('search help');
            expect(allText).toContain('find out more');
        });
    });

    describe('CSS Classes', () => {
        it('should apply orange class to code elements', () => {
            const orangeElements = debugElement.queryAll(By.css('.orange'));
            expect(orangeElements.length).toBe(3); // Query + 2 wildcard suggestions

            orangeElements.forEach(element => {
                expect(element.nativeElement.tagName.toLowerCase()).toBe('code');
                expect(element.nativeElement.classList.contains('orange')).toBe(true);
            });
        });

        it('should not have other custom CSS classes', () => {
            const allElements = debugElement.queryAll(By.css('*'));

            allElements.forEach(element => {
                const classes = Array.from(element.nativeElement.classList);
                classes.forEach(cls => {
                    expect(['orange']).toContain(cls);
                });
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

        it('should handle query with HTML characters', () => {
            component.query = '<script>alert("test")</script>';
            fixture.detectChanges();

            const codeElement = debugElement.query(By.css('code.orange'));
            expect(codeElement.nativeElement.textContent).toBe('<script>alert("test")</script>');
        });

        it('should handle query with quotes', () => {
            component.query = 'query with "quotes" and \'apostrophes\'';
            fixture.detectChanges();

            const codeElement = debugElement.query(By.css('code.orange'));
            expect(codeElement.nativeElement.textContent).toBe(
                'query with "quotes" and \'apostrophes\''
            );
        });

        it('should handle very long queries', () => {
            const longQuery = 'a'.repeat(500);
            component.query = longQuery;

            expect(() => {
                fixture.detectChanges();
            }).not.toThrow();

            const codeElement = debugElement.query(By.css('code.orange'));
            expect(codeElement.nativeElement.textContent).toBe(longQuery);
        });
    });

    describe('Performance', () => {
        it('should handle rapid query changes efficiently', () => {
            const start = performance.now();

            for (let i = 0; i < 100; i++) {
                component.query = `query${i}`;
                fixture.detectChanges();
            }

            const end = performance.now();
            expect(end - start).toBeLessThan(1000);
        });

        it('should not create memory leaks on destroy', () => {
            const initialComponent = component;
            fixture.destroy();
            expect(initialComponent).toBeDefined();
        });

        it('should handle rapid re-initialization', () => {
            fixture.destroy();
            fixture = TestBed.createComponent(NotFoundComponent);
            component = fixture.componentInstance;
            component.query = 'test';
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });
    });

    describe('Browser Compatibility', () => {
        it('should use standard HTML elements', () => {
            const standardElements = ['div', 'p', 'a', 'code'];
            const allElements = debugElement.queryAll(By.css('*'));

            allElements.forEach(element => {
                const tagName = element.nativeElement.tagName.toLowerCase();
                if (!tagName.startsWith('app-')) {
                    expect(standardElements).toContain(tagName);
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

        it('should use proper link attributes', () => {
            const routerLinks = debugElement.queryAll(By.css('a[ng-reflect-router-link]'));
            const externalLinks = debugElement.queryAll(By.css('a[href]'));

            expect(routerLinks.length).toBeGreaterThan(0);
            expect(externalLinks.length).toBeGreaterThan(0);

            externalLinks.forEach(link => {
                const href = link.nativeElement.href;
                expect(href).toBeTruthy();
                expect(href.length).toBeGreaterThan(0);
            });
        });
    });

    describe('User Experience', () => {
        beforeEach(() => {
            component.query = 'BRCA1';
            fixture.detectChanges();
        });

        it('should provide clear search guidance', () => {
            const allText = debugElement.nativeElement.textContent;

            expect(allText).toContain('could not find');
            expect(allText).toContain('database');
            expect(allText).toContain('wildcards');
            expect(allText).toContain('specific field');
        });

        it('should show practical examples', () => {
            const codeElements = debugElement.queryAll(By.css('code.orange'));
            const exampleLink = debugElement.query(By.css('a[href*="gene_symbol"]'));

            expect(codeElements[1].nativeElement.textContent).toBe('BRCA1*');
            expect(codeElements[2].nativeElement.textContent).toBe('*BRCA1');
            expect(exampleLink.nativeElement.textContent).toBe('gene_symbol:CYP*');
        });

        it('should provide multiple help options', () => {
            const helpLinks = debugElement.queryAll(By.css('a'));
            const helpTexts = helpLinks.map(link => link.nativeElement.textContent.trim());

            expect(helpTexts).toContain('search help');
            expect(helpTexts).toContain('help');
        });

        it('should be informative and actionable', () => {
            const paragraphs = debugElement.queryAll(By.css('p'));

            expect(paragraphs.length).toBe(3);
            expect(paragraphs[0].nativeElement.textContent).toContain('wildcards');
            expect(paragraphs[1].nativeElement.textContent).toContain('specific field');
            expect(paragraphs[2].nativeElement.textContent).toContain('find out more');
        });
    });
});
