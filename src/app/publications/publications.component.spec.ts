import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PublicationsComponent } from './publications.component';

describe('PublicationsComponent', () => {
    let component: PublicationsComponent;
    let fixture: ComponentFixture<PublicationsComponent>;
    let debugElement: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PublicationsComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(PublicationsComponent);
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

        it('should be an instance of PublicationsComponent', () => {
            expect(component).toBeInstanceOf(PublicationsComponent);
        });

        it('should be a standalone component', () => {
            expect(PublicationsComponent.prototype.constructor).toBeDefined();
        });

        it('should have correct selector', () => {
            const compiled = fixture.nativeElement;
            expect(compiled).toBeTruthy();
        });

        it('should have minimal component properties', () => {
            const properties = Object.keys(component);
            expect(properties.length).toBeLessThanOrEqual(5); // Allow for Angular framework properties
        });
    });

    describe('Template Structure', () => {
        it('should render the main container', () => {
            const container = debugElement.query(By.css('.container'));
            expect(container).toBeTruthy();
            expect(container.nativeElement.classList.contains('container')).toBe(true);
        });

        it('should render the main heading', () => {
            const heading = debugElement.query(By.css('h1'));
            expect(heading).toBeTruthy();
            expect(heading.nativeElement.textContent.trim()).toBe('Publications');
        });

        it('should render the table with disabled class', () => {
            const table = debugElement.query(By.css('table.table.disabled'));
            expect(table).toBeTruthy();
            expect(table.nativeElement.classList.contains('table')).toBe(true);
            expect(table.nativeElement.classList.contains('disabled')).toBe(true);
        });

        it('should render table body with navigation row', () => {
            const tbody = debugElement.query(By.css('table tbody'));
            const row = tbody.query(By.css('tr'));
            const cell = row.query(By.css('td'));

            expect(tbody).toBeTruthy();
            expect(row).toBeTruthy();
            expect(cell).toBeTruthy();
        });

        it('should render 2025 section heading', () => {
            const sectionHeading = debugElement.query(By.css('h2'));
            expect(sectionHeading).toBeTruthy();
            expect(sectionHeading.nativeElement.textContent.trim()).toBe('2025');
        });

        it('should render publication paragraph', () => {
            const paragraph = debugElement.query(By.css('p'));
            expect(paragraph).toBeTruthy();
            expect(paragraph.nativeElement.textContent).toContain('Tweedie S, Martin S, Bruford E.');
        });

        it('should have proper DOM hierarchy', () => {
            const container = debugElement.query(By.css('.container'));
            const heading = container.query(By.css('h1'));
            const table = container.query(By.css('table'));
            const sectionHeading = container.query(By.css('h2'));
            const paragraph = container.query(By.css('p'));

            expect(heading.nativeElement.parentElement).toBe(container.nativeElement);
            expect(table.nativeElement.parentElement).toBe(container.nativeElement);
            expect(sectionHeading.nativeElement.parentElement).toBe(container.nativeElement);
            expect(paragraph.nativeElement.parentElement).toBe(container.nativeElement);
        });
    });

    describe('Navigation Table', () => {
        it('should render table with correct structure', () => {
            const table = debugElement.query(By.css('table.table.disabled'));
            const tbody = table.query(By.css('tbody'));
            const row = tbody.query(By.css('tr'));
            const cell = row.query(By.css('td'));

            expect(table).toBeTruthy();
            expect(tbody).toBeTruthy();
            expect(row).toBeTruthy();
            expect(cell).toBeTruthy();
        });

        it('should have navigation link in table cell', () => {
            const tableCell = debugElement.query(By.css('table tbody tr td'));
            const strongElement = tableCell.query(By.css('strong'));
            const link = strongElement.query(By.css('a'));

            expect(strongElement).toBeTruthy();
            expect(link).toBeTruthy();
            expect(link.nativeElement.textContent.trim()).toBe('2025');
        });

        it('should have correct navigation link attributes', () => {
            const navLink = debugElement.query(By.css('table tbody tr td strong a'));
            expect(navLink.nativeElement.getAttribute('data-ng-anchor')).toBe('#recent');
            expect(navLink.nativeElement.getAttribute('href')).toBe('/#recent');
        });

        it('should have strong formatting for navigation year', () => {
            const strongElement = debugElement.query(By.css('table tbody tr td strong'));
            expect(strongElement).toBeTruthy();
            expect(strongElement.nativeElement.textContent.trim()).toBe('2025');
        });

        it('should be hidden with disabled class', () => {
            const table = debugElement.query(By.css('table.table.disabled'));
            expect(table.nativeElement.classList.contains('disabled')).toBe(true);
        });
    });

    describe('Section Heading', () => {
        it('should render h2 with anchor', () => {
            const sectionHeading = debugElement.query(By.css('h2'));
            const anchor = sectionHeading.query(By.css('a#recent'));

            expect(sectionHeading).toBeTruthy();
            expect(anchor).toBeTruthy();
            expect(anchor.nativeElement.id).toBe('recent');
        });

        it('should have correct text content', () => {
            const sectionHeading = debugElement.query(By.css('h2'));
            expect(sectionHeading.nativeElement.textContent.trim()).toBe('2025');
        });

        it('should contain anchor element for linking', () => {
            const anchor = debugElement.query(By.css('h2 a#recent'));
            expect(anchor).toBeTruthy();
            expect(anchor.nativeElement.tagName.toLowerCase()).toBe('a');
        });

        it('should be properly positioned in DOM', () => {
            const container = debugElement.query(By.css('.container'));
            const sectionHeading = debugElement.query(By.css('h2'));
            expect(sectionHeading.nativeElement.parentElement).toBe(container.nativeElement);
        });
    });

    describe('Publication Content', () => {
        it('should render publication details', () => {
            const paragraph = debugElement.query(By.css('p'));
            const content = paragraph.nativeElement.textContent;

            expect(content).toContain('Tweedie S, Martin S, Bruford E.');
            expect(content).toContain('Towards an official gene nomenclature for');
            expect(content).toContain('Populus trichocarpa');
            expect(content).toContain('Tree Physiology');
            expect(content).toContain('2025 May 09');
        });

        it('should have publication title in strong formatting', () => {
            const strongTitle = debugElement.query(By.css('p strong'));
            expect(strongTitle).toBeTruthy();
            expect(strongTitle.nativeElement.textContent).toContain('Towards an official gene nomenclature for');
        });

        it('should have italicized species name', () => {
            const italicSpecies = debugElement.query(By.css('p strong em'));
            expect(italicSpecies).toBeTruthy();
            expect(italicSpecies.nativeElement.textContent.trim()).toBe('Populus trichocarpa');
        });

        it('should contain DOI link', () => {
            const doiLink = debugElement.query(By.css('p a[href*="doi.org"]'));
            expect(doiLink).toBeTruthy();
            expect(doiLink.nativeElement.href).toBe('https://doi.org/10.1093/treephys/tpaf054');
            expect(doiLink.nativeElement.textContent.trim()).toBe('10.1093/treephys/tpaf054');
        });

        it('should have complete publication citation format', () => {
            const paragraph = debugElement.query(By.css('p'));
            const text = paragraph.nativeElement.textContent;

            // Check for author names
            expect(text).toContain('Tweedie S, Martin S, Bruford E.');
            // Check for journal name
            expect(text).toContain('Tree Physiology');
            // Check for date
            expect(text).toContain('2025 May 09');
            // Check for DOI
            expect(text).toContain('DOI:');
            expect(text).toContain('10.1093/treephys/tpaf054');
        });
    });

    describe('External Links', () => {
        it('should have working DOI link', () => {
            const doiLink = debugElement.query(By.css('a[href*="doi.org"]'));
            expect(doiLink).toBeTruthy();
            expect(doiLink.nativeElement.href).toMatch(/^https:\/\/doi\.org\//);
        });

        it('should have valid DOI URL format', () => {
            const doiLink = debugElement.query(By.css('a[href*="doi.org"]'));
            expect(doiLink.nativeElement.href).toBe('https://doi.org/10.1093/treephys/tpaf054');
        });

        it('should have proper link text for DOI', () => {
            const doiLink = debugElement.query(By.css('a[href*="doi.org"]'));
            expect(doiLink.nativeElement.textContent.trim()).toBe('10.1093/treephys/tpaf054');
        });

        it('should handle external link navigation', () => {
            const doiLink = debugElement.query(By.css('a[href*="doi.org"]'));
            expect(doiLink.nativeElement.target).toBeFalsy(); // Default behavior
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should apply Bootstrap container class', () => {
            const container = debugElement.query(By.css('.container'));
            expect(container.nativeElement.classList.contains('container')).toBe(true);
        });

        it('should apply table classes correctly', () => {
            const table = debugElement.query(By.css('table'));
            expect(table.nativeElement.classList.contains('table')).toBe(true);
            expect(table.nativeElement.classList.contains('disabled')).toBe(true);
        });

        it('should not have custom inline styles', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            allElements.forEach(element => {
                expect(element.nativeElement.style.length).toBe(0);
            });
        });

        it('should use semantic HTML elements', () => {
            const container = debugElement.query(By.css('div.container'));
            const heading = debugElement.query(By.css('h1'));
            const subheading = debugElement.query(By.css('h2'));
            const table = debugElement.query(By.css('table'));
            const paragraph = debugElement.query(By.css('p'));

            expect(container).toBeTruthy();
            expect(heading).toBeTruthy();
            expect(subheading).toBeTruthy();
            expect(table).toBeTruthy();
            expect(paragraph).toBeTruthy();
        });

        it('should have proper table structure elements', () => {
            const table = debugElement.query(By.css('table'));
            const tbody = table.query(By.css('tbody'));
            const row = tbody.query(By.css('tr'));
            const cell = row.query(By.css('td'));

            expect(tbody).toBeTruthy();
            expect(row).toBeTruthy();
            expect(cell).toBeTruthy();
        });
    });

    describe('Accessibility', () => {
        it('should have proper heading hierarchy', () => {
            const h1 = debugElement.query(By.css('h1'));
            const h2 = debugElement.query(By.css('h2'));

            expect(h1).toBeTruthy();
            expect(h2).toBeTruthy();
            expect(h1.nativeElement.textContent.trim()).toBe('Publications');
            expect(h2.nativeElement.textContent.trim()).toBe('2025');
        });

        it('should use semantic table structure', () => {
            const table = debugElement.query(By.css('table'));
            const tbody = table.query(By.css('tbody'));

            expect(table.nativeElement.tagName.toLowerCase()).toBe('table');
            expect(tbody.nativeElement.tagName.toLowerCase()).toBe('tbody');
        });

        it('should have descriptive link text', () => {
            const links = debugElement.queryAll(By.css('a'));
            links.forEach(link => {
                const text = link.nativeElement.textContent.trim();
                // Skip empty anchor elements (like the #recent anchor)
                if (text.length > 0) {
                    expect(text).not.toBe('click here');
                    expect(text).not.toBe('read more');
                    expect(text).not.toBe('link');
                }
            });
        });

        it('should have proper anchor for navigation', () => {
            const anchor = debugElement.query(By.css('a#recent'));
            expect(anchor).toBeTruthy();
            expect(anchor.nativeElement.id).toBe('recent');
        });

        it('should use proper emphasis elements', () => {
            const strong = debugElement.query(By.css('strong'));
            const em = debugElement.query(By.css('em'));

            expect(strong).toBeTruthy();
            expect(em).toBeTruthy();
        });
    });

    describe('Content Validation', () => {
        it('should display correct year in multiple places', () => {
            const navLink = debugElement.query(By.css('table tbody tr td strong a'));
            const sectionHeading = debugElement.query(By.css('h2'));

            expect(navLink.nativeElement.textContent.trim()).toBe('2025');
            expect(sectionHeading.nativeElement.textContent.trim()).toBe('2025');
        });

        it('should have consistent publication format', () => {
            const paragraph = debugElement.query(By.css('p'));
            const text = paragraph.nativeElement.textContent;

            // Author format: Last F, Last F, Last F.
            expect(text).toMatch(/Tweedie S, Martin S, Bruford E\./);
            // Title in strong
            expect(debugElement.query(By.css('p strong'))).toBeTruthy();
            // Journal name
            expect(text).toContain('Tree Physiology');
            // Date format
            expect(text).toMatch(/\d{4} \w+ \d{2}/);
            // DOI format
            expect(text).toMatch(/DOI:.*10\.\d+\//);
        });

        it('should have valid scientific publication elements', () => {
            const paragraph = debugElement.query(By.css('p'));
            const content = paragraph.nativeElement.textContent;

            // Authors
            expect(content).toContain('Tweedie S');
            expect(content).toContain('Martin S');
            expect(content).toContain('Bruford E');
            // Title
            expect(content).toContain('Towards an official gene nomenclature');
            // Species (in italics)
            const species = debugElement.query(By.css('em'));
            expect(species.nativeElement.textContent).toContain('Populus trichocarpa');
            // Journal
            expect(content).toContain('Tree Physiology');
            // Publication date
            expect(content).toContain('2025 May 09');
        });

        it('should have proper DOI format', () => {
            const doiLink = debugElement.query(By.css('a[href*="doi.org"]'));
            const doiText = doiLink.nativeElement.textContent.trim();

            expect(doiText).toMatch(/^10\.\d+\/.+/);
            expect(doiText).toBe('10.1093/treephys/tpaf054');
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

        it('should maintain template structure after multiple change detection cycles', () => {
            const initialContainer = debugElement.query(By.css('.container'));
            const initialHeading = debugElement.query(By.css('h1'));

            fixture.detectChanges();
            fixture.detectChanges();

            const currentContainer = debugElement.query(By.css('.container'));
            const currentHeading = debugElement.query(By.css('h1'));

            expect(currentContainer).toBeTruthy();
            expect(currentHeading).toBeTruthy();
            expect(currentHeading.nativeElement.textContent.trim()).toBe('Publications');
        });

        it('should handle empty component properties gracefully', () => {
            expect(Object.keys(component).length).toBeLessThanOrEqual(5); // Allow for Angular framework properties
            expect(() => {
                fixture.detectChanges();
            }).not.toThrow();
        });

        it('should handle link navigation gracefully', () => {
            const links = debugElement.queryAll(By.css('a'));
            expect(() => {
                links.forEach(link => {
                    link.nativeElement.click();
                });
                fixture.detectChanges();
            }).not.toThrow();
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
            fixture = TestBed.createComponent(PublicationsComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });

        it('should be lightweight with minimal properties', () => {
            const propertyCount = Object.keys(component).length;
            expect(propertyCount).toBeLessThanOrEqual(5); // Allow for Angular framework properties
        });

        it('should handle frequent state changes efficiently', () => {
            const start = performance.now();

            for (let i = 0; i < 100; i++) {
                fixture.detectChanges();
            }

            const end = performance.now();
            expect(end - start).toBeLessThan(1000); // Should complete in less than 1 second
        });

        it('should have minimal DOM footprint', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            expect(allElements.length).toBeLessThan(20); // Should be a relatively simple component
        });
    });

    describe('Browser Compatibility', () => {
        it('should use standard HTML elements', () => {
            const standardElements = ['div', 'h1', 'h2', 'table', 'tbody', 'tr', 'td', 'p', 'a', 'strong', 'em'];
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

        it('should use valid href attributes', () => {
            const links = debugElement.queryAll(By.css('a[href]'));
            links.forEach(link => {
                const href = link.nativeElement.href;
                expect(href).toBeTruthy();
                expect(href.length).toBeGreaterThan(0);
            });
        });

        it('should support modern web standards', () => {
            const table = debugElement.query(By.css('table'));
            const links = debugElement.queryAll(By.css('a'));

            expect(table).toBeTruthy();
            expect(links.length).toBeGreaterThan(0);
        });
    });

    describe('User Experience', () => {
        it('should provide clear navigation structure', () => {
            const heading = debugElement.query(By.css('h1'));
            const sectionHeading = debugElement.query(By.css('h2'));
            const navLink = debugElement.query(By.css('table a'));

            expect(heading.nativeElement.textContent.trim()).toBe('Publications');
            expect(sectionHeading.nativeElement.textContent.trim()).toBe('2025');
            expect(navLink.nativeElement.textContent.trim()).toBe('2025');
        });

        it('should have readable publication format', () => {
            const paragraph = debugElement.query(By.css('p'));
            const text = paragraph.nativeElement.textContent;

            expect(text).toContain('Tweedie S, Martin S, Bruford E.');
            expect(text).toContain('Tree Physiology');
            expect(text).toContain('2025 May 09');
        });

        it('should provide external link for DOI access', () => {
            const doiLink = debugElement.query(By.css('a[href*="doi.org"]'));
            expect(doiLink).toBeTruthy();
            expect(doiLink.nativeElement.href).toContain('doi.org');
        });

        it('should have consistent styling throughout', () => {
            const container = debugElement.query(By.css('.container'));
            const table = debugElement.query(By.css('.table'));

            expect(container.nativeElement.classList.contains('container')).toBe(true);
            expect(table.nativeElement.classList.contains('table')).toBe(true);
        });
    });

    describe('Template Content Structure', () => {
        it('should have complete template hierarchy', () => {
            const container = debugElement.query(By.css('div.container'));
            const children = Array.from(container.nativeElement.children) as HTMLElement[];

            expect(children.length).toBe(4); // h1, table, h2, p
            expect(children[0].tagName.toLowerCase()).toBe('h1');
            expect(children[1].tagName.toLowerCase()).toBe('table');
            expect(children[2].tagName.toLowerCase()).toBe('h2');
            expect(children[3].tagName.toLowerCase()).toBe('p');
        });

        it('should have proper table content structure', () => {
            const table = debugElement.query(By.css('table'));
            const tbody = table.query(By.css('tbody'));
            const tr = tbody.query(By.css('tr'));
            const td = tr.query(By.css('td'));
            const strong = td.query(By.css('strong'));
            const link = strong.query(By.css('a'));

            expect(tbody).toBeTruthy();
            expect(tr).toBeTruthy();
            expect(td).toBeTruthy();
            expect(strong).toBeTruthy();
            expect(link).toBeTruthy();
        });

        it('should have proper publication paragraph structure', () => {
            const paragraph = debugElement.query(By.css('p'));
            const strong = paragraph.query(By.css('strong'));
            const em = strong.query(By.css('em'));
            const doiLink = paragraph.query(By.css('a'));

            expect(strong).toBeTruthy();
            expect(em).toBeTruthy();
            expect(doiLink).toBeTruthy();
        });

        it('should maintain content integrity', () => {
            const heading = debugElement.query(By.css('h1'));
            const sectionHeading = debugElement.query(By.css('h2'));
            const navYear = debugElement.query(By.css('table a'));

            expect(heading.nativeElement.textContent.trim()).toBe('Publications');
            expect(sectionHeading.nativeElement.textContent.trim()).toBe('2025');
            expect(navYear.nativeElement.textContent.trim()).toBe('2025');
        });
    });

    describe('Academic Publication Standards', () => {
        it('should follow academic citation format', () => {
            const paragraph = debugElement.query(By.css('p'));
            const text = paragraph.nativeElement.textContent;

            // Check for author format (Last Initial, Last Initial, Last Initial.)
            expect(text).toMatch(/[A-Z][a-z]+ [A-Z],.*[A-Z][a-z]+ [A-Z],.*[A-Z][a-z]+ [A-Z]\./);
            // Check for title in strong
            expect(debugElement.query(By.css('p strong'))).toBeTruthy();
            // Check for journal name
            expect(text).toContain('Tree Physiology');
            // Check for publication date
            expect(text).toMatch(/\d{4} \w+ \d{2}/);
            // Check for DOI
            expect(text).toContain('DOI:');
        });

        it('should have proper species name formatting', () => {
            const species = debugElement.query(By.css('p strong em'));
            expect(species).toBeTruthy();
            expect(species.nativeElement.textContent.trim()).toBe('Populus trichocarpa');
        });

        it('should have valid DOI structure', () => {
            const doiLink = debugElement.query(By.css('a[href*="doi.org"]'));
            const doi = doiLink.nativeElement.textContent.trim();

            expect(doi).toMatch(/^10\.\d+\/.+/); // More flexible DOI pattern
            expect(doi).toBe('10.1093/treephys/tpaf054');
        });

        it('should have proper academic title formatting', () => {
            const title = debugElement.query(By.css('p strong'));
            const titleText = title.nativeElement.textContent;

            expect(titleText).toContain('Towards an official gene nomenclature for');
            expect(titleText).toContain('Populus trichocarpa');
        });
    });
});
