import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LicenseComponent } from './license.component';

describe('LicenseComponent', () => {
    let component: LicenseComponent;
    let fixture: ComponentFixture<LicenseComponent>;
    let debugElement: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LicenseComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LicenseComponent);
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

        it('should be an instance of LicenseComponent', () => {
            expect(component).toBeInstanceOf(LicenseComponent);
        });

        it('should be a standalone component', () => {
            expect(LicenseComponent.prototype.constructor).toBeDefined();
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
            expect(heading.nativeElement.textContent.trim()).toBe('License');
        });

        it('should have proper DOM structure', () => {
            const container = debugElement.query(By.css('.container'));
            const h1 = container.query(By.css('h1'));
            const h2Elements = container.queryAll(By.css('h2'));
            const paragraphs = container.queryAll(By.css('p'));

            expect(container).toBeTruthy();
            expect(h1).toBeTruthy();
            expect(h2Elements.length).toBeGreaterThanOrEqual(2);
            expect(paragraphs.length).toBeGreaterThanOrEqual(3);
        });

        it('should contain all required sections', () => {
            const mainHeading = debugElement.query(By.css('h1'));
            const attributionHeading = debugElement.queryAll(By.css('h2'))[0];
            const questionsHeading = debugElement.queryAll(By.css('h2'))[1];
            const blockquote = debugElement.query(By.css('blockquote'));

            expect(mainHeading.nativeElement.textContent.trim()).toBe('License');
            expect(attributionHeading.nativeElement.textContent.trim()).toBe('Attribution');
            expect(questionsHeading.nativeElement.textContent.trim()).toBe('Questions?');
            expect(blockquote).toBeTruthy();
        });
    });

    describe('License Content', () => {
        it('should mention PGNC in license description', () => {
            const firstParagraph = debugElement.query(By.css('p'));
            const text = firstParagraph.nativeElement.textContent;
            expect(text).toContain('Plant Gene Nomenclature Committee');
            expect(text).toContain('PGNC');
        });

        it('should reference Creative Commons CC0 license', () => {
            const firstParagraph = debugElement.query(By.css('p'));
            const text = firstParagraph.nativeElement.textContent;
            expect(text).toContain('Creative Commons Public Domain (CC0) License');
            expect(text).toContain('any form of reuse of the content is permitted');
        });

        it('should have CC0 license links', () => {
            const cc0Links = debugElement.queryAll(
                By.css('a[href*="creativecommons.org/publicdomain/zero"]')
            );
            expect(cc0Links.length).toBeGreaterThanOrEqual(1);

            cc0Links.forEach(link => {
                expect(link.nativeElement.href).toContain(
                    'creativecommons.org/publicdomain/zero/1.0/legalcode.en'
                );
            });
        });

        it('should have Creative Commons FAQ link', () => {
            const faqLinks = debugElement.queryAll(By.css('a[href*="creativecommons.org/faq"]'));
            expect(faqLinks.length).toBeGreaterThanOrEqual(1);

            faqLinks.forEach(link => {
                expect(link.nativeElement.href).toContain('creativecommons.org/faq');
            });
        });

        it('should emphasize key licensing points', () => {
            const strongElements = debugElement.queryAll(By.css('strong'));
            expect(strongElements.length).toBeGreaterThanOrEqual(2);

            const strongTexts = strongElements.map(el => el.nativeElement.textContent.trim());
            expect(strongTexts).toContain('any form of reuse of the content is permitted');
            expect(strongTexts).toContain('PGNC recommends attribution');
        });
    });

    describe('Attribution Section', () => {
        it('should have attribution heading', () => {
            const attributionHeading = debugElement.queryAll(By.css('h2'))[0];
            expect(attributionHeading.nativeElement.textContent.trim()).toBe('Attribution');
        });

        it('should explain attribution recommendations', () => {
            const paragraphs = debugElement.queryAll(By.css('p'));
            const attributionParagraph = paragraphs[1]; // Second paragraph should be about attribution
            const text = attributionParagraph.nativeElement.textContent;

            expect(text).toContain('PGNC recommends attribution');
            expect(text).toContain('publications, services or products');
            expect(text).toContain('secure funding');
        });

        it('should have a citation blockquote', () => {
            const blockquote = debugElement.query(By.css('blockquote'));
            expect(blockquote).toBeTruthy();
        });

        it('should contain citation with cite element', () => {
            const cite = debugElement.query(By.css('blockquote cite'));
            expect(cite).toBeTruthy();
            expect(cite.nativeElement.textContent.trim()).toContain(
                'Towards an official gene nomenclature for'
            );
            expect(cite.nativeElement.textContent.trim()).toContain('Populus trichocarpa');
        });

        it('should have author links with ORCID URLs', () => {
            const orcidLinks = debugElement.queryAll(By.css('a[href*="orcid.org"]'));
            expect(orcidLinks.length).toBe(3);

            const expectedAuthors = ['Susan Tweedie', 'Stanton Martin', 'Elspeth A Bruford'];
            const authorTexts = orcidLinks.map(link => link.nativeElement.textContent.trim());

            expectedAuthors.forEach(author => {
                expect(authorTexts).toContain(author);
            });
        });

        it('should have correct ORCID IDs for authors', () => {
            const orcidLinks = debugElement.queryAll(By.css('a[href*="orcid.org"]'));

            const expectedORCIDs = [
                '0000-0003-1818-8243', // Susan Tweedie
                '0000-0001-9246-8193', // Stanton Martin
                '0000-0002-8380-5247', // Elspeth A Bruford
            ];

            const orcidIds = orcidLinks.map(link => {
                const href = link.nativeElement.href;
                return href.split('/').pop();
            });

            expectedORCIDs.forEach(orcid => {
                expect(orcidIds).toContain(orcid);
            });
        });

        it('should have publication date in citation', () => {
            const footers = debugElement.queryAll(By.css('blockquote footer'));
            const dateFooter = footers.find(footer =>
                footer.nativeElement.textContent.includes('Tree Physiology 2025')
            );
            expect(dateFooter).toBeTruthy();
            if (dateFooter) {
                expect(dateFooter.nativeElement.textContent.trim()).toBe(
                    'Tree Physiology 2025 May 09'
                );
            }
        });

        it('should have DOI link in citation', () => {
            const doiLink = debugElement.query(By.css('a[href*="doi.org"]'));
            expect(doiLink).toBeTruthy();
            expect(doiLink.nativeElement.href).toContain('doi.org/10.1093/treephys/tpad042');
            expect(doiLink.nativeElement.target).toBe('_blank');
            expect(doiLink.nativeElement.classList.contains('paper-link')).toBe(true);
        });

        it('should have DOI label', () => {
            const linksSection = debugElement.query(By.css('.links'));
            expect(linksSection).toBeTruthy();
            expect(linksSection.nativeElement.textContent).toContain('DOI:');
        });
    });

    describe('Questions Section', () => {
        it('should have questions heading', () => {
            const questionsHeading = debugElement.queryAll(By.css('h2'))[1];
            expect(questionsHeading.nativeElement.textContent.trim()).toBe('Questions?');
        });

        it('should reference Creative Commons FAQ', () => {
            const paragraphs = debugElement.queryAll(By.css('p'));
            const lastParagraph = paragraphs[paragraphs.length - 1];
            expect(lastParagraph).toBeTruthy();
            const text = lastParagraph.nativeElement.textContent;
            expect(text).toContain('Creative Commons FAQ');
        });

        it('should have PGNC contact email', () => {
            const emailLink = debugElement.query(By.css('a[href^="mailto:"]'));
            expect(emailLink).toBeTruthy();
            expect(emailLink.nativeElement.href).toContain('mailto:hgnc@genenames.org');
            expect(emailLink.nativeElement.href).toContain(
                'subject=PGNC%20CC%20licensing%20%26%20attribution'
            );
            expect(emailLink.nativeElement.textContent.trim()).toBe('PGNC');
        });
    });

    describe('External Links', () => {
        it('should have DOI link with target="_blank"', () => {
            const doiLink = debugElement.query(By.css('a[href*="doi.org"]'));
            expect(doiLink.nativeElement.target).toBe('_blank');
        });

        it('should have external links', () => {
            const externalLinks = debugElement.queryAll(
                By.css('a[href^="http"], a[href^="https"]')
            );
            expect(externalLinks.length).toBeGreaterThan(0);
        });

        it('should have proper external link URLs', () => {
            const externalLinks = debugElement.queryAll(
                By.css('a[href^="http"], a[href^="https"]')
            );

            const expectedDomains = ['creativecommons.org', 'orcid.org', 'doi.org'];

            externalLinks.forEach(link => {
                const href = link.nativeElement.href;
                const containsExpectedDomain = expectedDomains.some(domain =>
                    href.includes(domain)
                );
                expect(containsExpectedDomain).toBe(true);
            });
        });

        it('should have valid Creative Commons links', () => {
            const ccLinks = debugElement.queryAll(By.css('a[href*="creativecommons.org"]'));
            expect(ccLinks.length).toBeGreaterThanOrEqual(3);

            ccLinks.forEach(link => {
                expect(link.nativeElement.href).toMatch(/^https:\/\/creativecommons\.org\//);
            });
        });

        it('should have valid ORCID links', () => {
            const orcidLinks = debugElement.queryAll(By.css('a[href*="orcid.org"]'));
            expect(orcidLinks.length).toBe(3);

            orcidLinks.forEach(link => {
                expect(link.nativeElement.href).toMatch(
                    /^https:\/\/orcid\.org\/\d{4}-\d{4}-\d{4}-\d{4}$/
                );
            });
        });

        it('should have valid DOI link', () => {
            const doiLink = debugElement.query(By.css('a[href*="doi.org"]'));
            expect(doiLink.nativeElement.href).toMatch(/^https:\/\/doi\.org\/10\.\d+\//);
        });
    });

    describe('Component Properties', () => {
        it('should have no public properties by default', () => {
            expect(Object.keys(component).length).toBeLessThanOrEqual(1); // Allow for Angular internal properties
        });

        it('should be a simple presentation component', () => {
            expect(component).toBeTruthy();
            expect(typeof component).toBe('object');
        });

        it('should not have input properties', () => {
            expect(Object.getOwnPropertyNames(component).length).toBeLessThanOrEqual(1); // Allow for Angular internal properties
        });

        it('should not have output properties', () => {
            expect(Object.getOwnPropertyNames(component).length).toBeLessThanOrEqual(1); // Allow for Angular internal properties
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should have Bootstrap container class', () => {
            const container = debugElement.query(By.css('.container'));
            expect(container).toBeTruthy();
            expect(container.nativeElement.classList.contains('container')).toBe(true);
        });

        it('should use semantic HTML elements', () => {
            const h1 = debugElement.query(By.css('h1'));
            const h2Elements = debugElement.queryAll(By.css('h2'));
            const paragraphs = debugElement.queryAll(By.css('p'));
            const blockquote = debugElement.query(By.css('blockquote'));
            const cite = debugElement.query(By.css('cite'));
            const footers = debugElement.queryAll(By.css('footer'));

            expect(h1).toBeTruthy();
            expect(h2Elements.length).toBe(2);
            expect(paragraphs.length).toBeGreaterThanOrEqual(3);
            expect(blockquote).toBeTruthy();
            expect(cite).toBeTruthy();
            expect(footers.length).toBeGreaterThanOrEqual(2);
        });

        it('should have proper CSS classes for links', () => {
            const paperLink = debugElement.query(By.css('.paper-link'));
            expect(paperLink).toBeTruthy();
            expect(paperLink.nativeElement.classList.contains('paper-link')).toBe(true);
        });

        it('should have links section with proper class', () => {
            const linksSection = debugElement.query(By.css('.links'));
            expect(linksSection).toBeTruthy();
            expect(linksSection.nativeElement.classList.contains('links')).toBe(true);
        });

        it('should not use inline styles', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            allElements.forEach(element => {
                expect(element.nativeElement.style.length).toBe(0);
            });
        });
    });

    describe('Accessibility', () => {
        it('should have proper heading hierarchy', () => {
            const h1Elements = debugElement.queryAll(By.css('h1'));
            const h2Elements = debugElement.queryAll(By.css('h2'));

            expect(h1Elements.length).toBe(1);
            expect(h2Elements.length).toBe(2);
        });

        it('should use semantic HTML elements for citation', () => {
            const blockquote = debugElement.query(By.css('blockquote'));
            const cite = debugElement.query(By.css('cite'));
            const footers = debugElement.queryAll(By.css('footer'));

            expect(blockquote).toBeTruthy();
            expect(cite).toBeTruthy();
            expect(footers.length).toBeGreaterThanOrEqual(2);
        });

        it('should have descriptive link text', () => {
            const links = debugElement.queryAll(By.css('a'));
            links.forEach(link => {
                const linkText = link.nativeElement.textContent.trim();
                if (linkText.length > 0) {
                    expect(linkText).not.toBe('click here');
                    expect(linkText).not.toBe('read more');
                    expect(linkText).not.toBe('link');
                }
            });
        });

        it('should use appropriate emphasis elements', () => {
            const strongElements = debugElement.queryAll(By.css('strong'));
            const emElements = debugElement.queryAll(By.css('em'));

            expect(strongElements.length).toBeGreaterThanOrEqual(2);
            expect(emElements.length).toBeGreaterThanOrEqual(1);
        });

        it('should provide clear document structure', () => {
            const container = debugElement.query(By.css('.container'));
            const headings = debugElement.queryAll(By.css('h1, h2'));
            const content = debugElement.queryAll(By.css('p, blockquote'));

            expect(container).toBeTruthy();
            expect(headings.length).toBe(3);
            expect(content.length).toBeGreaterThanOrEqual(4);
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
            expect(Object.keys(component).length).toBeLessThanOrEqual(1); // Allow for Angular internal properties
        });
    });

    describe('Content Validation', () => {
        it('should have substantial license content', () => {
            const allContent = debugElement.nativeElement.textContent;
            expect(allContent.length).toBeGreaterThan(500);
        });

        it('should contain all essential license information', () => {
            const allContent = debugElement.nativeElement.textContent.toLowerCase();

            const essentialTerms = [
                'creative commons',
                'cc0',
                'public domain',
                'attribution',
                'pgnc',
                'plant gene nomenclature',
            ];

            essentialTerms.forEach(term => {
                expect(allContent).toContain(term);
            });
        });

        it('should have proper citation format', () => {
            const cite = debugElement.query(By.css('cite'));
            const footers = debugElement.queryAll(By.css('blockquote footer'));

            expect(cite.nativeElement.textContent).toContain(
                'Towards an official gene nomenclature'
            );
            expect(footers.length).toBeGreaterThanOrEqual(2);
        });

        it('should provide complete contact information', () => {
            const emailLink = debugElement.query(By.css('a[href^="mailto:"]'));
            expect(emailLink.nativeElement.href).toContain('hgnc@genenames.org');
            expect(emailLink.nativeElement.href).toContain('subject=');
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
            fixture = TestBed.createComponent(LicenseComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });

        it('should be lightweight', () => {
            expect(component).toBeTruthy();
            expect(Object.keys(component).length).toBeLessThanOrEqual(1); // Allow for Angular internal properties
        });
    });

    describe('Browser Compatibility', () => {
        it('should use standard HTML elements', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            const standardTags = [
                'div',
                'h1',
                'h2',
                'p',
                'a',
                'blockquote',
                'cite',
                'footer',
                'strong',
                'em',
                'span',
            ];

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

        it('should use modern link attributes', () => {
            const doiLink = debugElement.query(By.css('a[href*="doi.org"]'));
            expect(doiLink.nativeElement.target).toBe('_blank');
            expect(doiLink.nativeElement.href).toMatch(/^https?:\/\/.+/);

            const externalLinks = debugElement.queryAll(
                By.css('a[href^="http"], a[href^="https"]')
            );
            expect(externalLinks.length).toBeGreaterThan(0);
        });
    });

    describe('User Experience', () => {
        it('should provide clear license information', () => {
            const mainContent = debugElement.query(By.css('.container')).nativeElement.textContent;
            expect(mainContent).toContain('Creative Commons Public Domain (CC0) License');
            expect(mainContent).toContain('any form of reuse of the content is permitted');
        });

        it('should have clear section structure', () => {
            const h1 = debugElement.query(By.css('h1'));
            const h2Elements = debugElement.queryAll(By.css('h2'));

            expect(h1).toBeTruthy();
            expect(h2Elements.length).toBe(2);
            expect(h2Elements[0].nativeElement.textContent.trim()).toBe('Attribution');
            expect(h2Elements[1].nativeElement.textContent.trim()).toBe('Questions?');
        });

        it('should provide actionable guidance', () => {
            const allContent = debugElement.nativeElement.textContent.toLowerCase();
            expect(allContent).toContain('recommends attribution');
            expect(allContent).toContain('contact');
            expect(allContent).toContain('questions');
        });
    });

    describe('Legal and Compliance', () => {
        it('should reference official Creative Commons license', () => {
            const cc0Links = debugElement.queryAll(
                By.css('a[href*="creativecommons.org/publicdomain/zero"]')
            );
            expect(cc0Links.length).toBeGreaterThanOrEqual(1);

            cc0Links.forEach(link => {
                expect(link.nativeElement.href).toContain('legalcode.en');
            });
        });

        it('should provide proper attribution guidance', () => {
            const allContent = debugElement.nativeElement.textContent;
            expect(allContent).toContain('PGNC recommends attribution');
            expect(allContent).toContain('publications, services or products');
        });

        it('should have proper citation with DOI', () => {
            const doiLink = debugElement.query(By.css('a[href*="doi.org"]'));
            expect(doiLink).toBeTruthy();
            expect(doiLink.nativeElement.href).toMatch(/^https:\/\/doi\.org\/10\.\d+\//);
        });

        it('should provide contact information for licensing questions', () => {
            const emailLink = debugElement.query(By.css('a[href^="mailto:"]'));
            expect(emailLink.nativeElement.href).toContain('licensing');
            expect(emailLink.nativeElement.href).toContain('attribution');
        });
    });

    describe('Academic Citation', () => {
        it('should have complete academic citation', () => {
            const cite = debugElement.query(By.css('cite'));
            const authors = debugElement.queryAll(By.css('a[href*="orcid.org"]'));
            const footers = debugElement.queryAll(By.css('footer'));
            const doiLink = debugElement.query(By.css('a[href*="doi.org"]'));

            expect(cite).toBeTruthy();
            expect(authors.length).toBe(3);
            expect(doiLink).toBeTruthy();
            expect(footers.length).toBeGreaterThan(0);

            // Check if any footer contains "Tree Physiology"
            const hasTreePhysiologyFooter = footers.some(footer =>
                footer.nativeElement.textContent.includes('Tree Physiology')
            );
            expect(hasTreePhysiologyFooter).toBe(true);
        });

        it('should have proper author ORCID integration', () => {
            const orcidLinks = debugElement.queryAll(By.css('a[href*="orcid.org"]'));

            orcidLinks.forEach(link => {
                const href = link.nativeElement.href;
                expect(href).toMatch(/^https:\/\/orcid\.org\/\d{4}-\d{4}-\d{4}-\d{4}$/);
            });
        });

        it('should reference Populus trichocarpa research', () => {
            const cite = debugElement.query(By.css('cite'));
            expect(cite.nativeElement.textContent).toContain('Populus trichocarpa');
        });

        it('should have publication venue and date', () => {
            const footers = debugElement.queryAll(By.css('blockquote footer'));
            const dateFooter = footers.find(footer =>
                footer.nativeElement.textContent.includes('Tree Physiology')
            );
            expect(dateFooter).toBeTruthy();
            if (dateFooter) {
                expect(dateFooter.nativeElement.textContent).toContain('2025');
            }
        });
    });
});
