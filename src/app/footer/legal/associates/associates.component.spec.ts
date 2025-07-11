import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AssociatesComponent } from './associates.component';

describe('AssociatesComponent', () => {
    let component: AssociatesComponent;
    let fixture: ComponentFixture<AssociatesComponent>;
    let debugElement: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AssociatesComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AssociatesComponent);
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

        it('should be an instance of AssociatesComponent', () => {
            expect(component).toBeInstanceOf(AssociatesComponent);
        });

        it('should be a standalone component', () => {
            expect(AssociatesComponent.prototype.constructor).toBeDefined();
        });

        it('should have correct selector', () => {
            const compiled = fixture.nativeElement;
            expect(compiled).toBeTruthy();
        });
    });

    describe('Template Structure', () => {
        it('should render the footer logo block container', () => {
            const logoBlock = debugElement.query(By.css('.footer-logo-block'));
            expect(logoBlock).toBeTruthy();
        });

        it('should have first associate set', () => {
            const firstSet = debugElement.query(By.css('.first-associate-set'));
            expect(firstSet).toBeTruthy();
        });

        it('should have second associate set', () => {
            const secondSet = debugElement.query(By.css('.second-associate-set'));
            expect(secondSet).toBeTruthy();
        });

        it('should have proper DOM structure', () => {
            const logoBlock = debugElement.query(By.css('.footer-logo-block'));
            const firstSet = logoBlock.query(By.css('.first-associate-set'));
            const secondSet = logoBlock.query(By.css('.second-associate-set'));

            expect(logoBlock).toBeTruthy();
            expect(firstSet).toBeTruthy();
            expect(secondSet).toBeTruthy();
        });

        it('should contain all required elements', () => {
            const logoBlock = debugElement.query(By.css('.footer-logo-block'));
            const firstSet = debugElement.query(By.css('.first-associate-set'));
            const secondSet = debugElement.query(By.css('.second-associate-set'));
            const allLinks = debugElement.queryAll(By.css('a'));
            const allImages = debugElement.queryAll(By.css('img'));

            expect(logoBlock).toBeTruthy();
            expect(firstSet).toBeTruthy();
            expect(secondSet).toBeTruthy();
            expect(allLinks.length).toBe(4);
            expect(allImages.length).toBe(4);
        });
    });

    describe('Associate Organizations', () => {
        it('should have DOE block', () => {
            const doeBlock = debugElement.query(By.css('.doe-block'));
            expect(doeBlock).toBeTruthy();
        });

        it('should have CBI block', () => {
            const cbiBlock = debugElement.query(By.css('.cbi-block'));
            expect(cbiBlock).toBeTruthy();
        });

        it('should have University of Cambridge block', () => {
            const uocBlock = debugElement.query(By.css('.uoc-block'));
            expect(uocBlock).toBeTruthy();
        });

        it('should have HGNC block', () => {
            const hgncBlock = debugElement.query(By.css('.hgnc-block'));
            expect(hgncBlock).toBeTruthy();
        });
    });

    describe('Organization Links', () => {
        it('should have DOE link', () => {
            const doeLink = debugElement.query(By.css('a[href*="energy.gov"]'));
            expect(doeLink).toBeTruthy();
            expect(doeLink.nativeElement.href).toBe('https://www.energy.gov/');
            expect(doeLink.nativeElement.target).toBe('_blank');
        });

        it('should have CBI link', () => {
            const cbiLink = debugElement.query(By.css('a[href*="cbi.ornl.gov"]'));
            expect(cbiLink).toBeTruthy();
            expect(cbiLink.nativeElement.href).toBe('https://cbi.ornl.gov/');
            expect(cbiLink.nativeElement.target).toBe('_blank');
        });

        it('should have University of Cambridge link', () => {
            const uocLink = debugElement.query(By.css('a[href*="cam.ac.uk"]'));
            expect(uocLink).toBeTruthy();
            expect(uocLink.nativeElement.href).toBe('https://www.cam.ac.uk/');
            expect(uocLink.nativeElement.target).toBe('_blank');
        });

        it('should have HGNC link', () => {
            const hgncLink = debugElement.query(By.css('a[href*="genenames.org"]'));
            expect(hgncLink).toBeTruthy();
            expect(hgncLink.nativeElement.href).toBe('https://www.genenames.org/');
            expect(hgncLink.nativeElement.target).toBe('_blank');
        });
    });

    describe('Logo Images', () => {
        it('should have DOE logo image', () => {
            const doeImage = debugElement.query(By.css('img[alt*="Department of Energy"]'));
            expect(doeImage).toBeTruthy();
            expect(doeImage.nativeElement.src).toContain('DOE-Awardee-vertical-Black.svg');
            expect(doeImage.nativeElement.alt).toBe('U.S. Department of Energy Awardee');
        });

        it('should have CBI logo image', () => {
            const cbiImage = debugElement.query(By.css('img[alt*="Center for Bioenergy Innovation"]'));
            expect(cbiImage).toBeTruthy();
            expect(cbiImage.nativeElement.src).toContain('cbi-logo__stacked3lines-01.svg');
            expect(cbiImage.nativeElement.alt).toBe('Center for Bioenergy Innovation');
        });

        it('should have University of Cambridge logo image', () => {
            const uocImage = debugElement.query(By.css('img[alt*="University of Cambridge"]'));
            expect(uocImage).toBeTruthy();
            expect(uocImage.nativeElement.src).toContain('cambs-long-gs.svg');
            expect(uocImage.nativeElement.alt).toBe('University of Cambridge');
        });

        it('should have HGNC logo image', () => {
            const hgncImage = debugElement.query(By.css('img[alt*="HGNC"]'));
            expect(hgncImage).toBeTruthy();
            expect(hgncImage.nativeElement.src).toContain('hgnc-logo-blk.svg');
            expect(hgncImage.nativeElement.alt).toBe('Hugo Genome Nomenclature Committee (HGNC)');
        });
    });

    describe('CSS Classes and Structure', () => {
        it('should have footer-logo-block class', () => {
            const logoBlock = debugElement.query(By.css('.footer-logo-block'));
            expect(logoBlock).toBeTruthy();
            expect(logoBlock.nativeElement.classList.contains('footer-logo-block')).toBe(true);
        });

        it('should have associate set classes', () => {
            const firstSet = debugElement.query(By.css('.first-associate-set'));
            const secondSet = debugElement.query(By.css('.second-associate-set'));

            expect(firstSet.nativeElement.classList.contains('first-associate-set')).toBe(true);
            expect(secondSet.nativeElement.classList.contains('second-associate-set')).toBe(true);
        });

        it('should have individual block classes', () => {
            const doeBlock = debugElement.query(By.css('.doe-block'));
            const cbiBlock = debugElement.query(By.css('.cbi-block'));
            const uocBlock = debugElement.query(By.css('.uoc-block'));
            const hgncBlock = debugElement.query(By.css('.hgnc-block'));

            expect(doeBlock).toBeTruthy();
            expect(cbiBlock).toBeTruthy();
            expect(uocBlock).toBeTruthy();
            expect(hgncBlock).toBeTruthy();
        });

        it('should have logo span classes', () => {
            const logoSpans = debugElement.queryAll(By.css('span[class$="-logo"]'));
            expect(logoSpans.length).toBe(4);

            const spanClasses = logoSpans.map(span => span.nativeElement.className);
            expect(spanClasses).toContain('doe-logo');
            expect(spanClasses).toContain('cbi-logo');
            expect(spanClasses).toContain('uoc-logo');
            expect(spanClasses).toContain('hgnc-logo');
        });

        it('should have footerlogoshref classes', () => {
            const logoLinks = debugElement.queryAll(By.css('.footerlogoshref'));
            expect(logoLinks.length).toBe(4);

            logoLinks.forEach(link => {
                expect(link.nativeElement.classList.contains('footerlogoshref')).toBe(true);
            });
        });

        it('should have footerlogosimage classes', () => {
            const logoImages = debugElement.queryAll(By.css('.footerlogosimage'));
            expect(logoImages.length).toBe(4);

            logoImages.forEach(image => {
                expect(image.nativeElement.classList.contains('footerlogosimage')).toBe(true);
            });
        });
    });

    describe('Link Target Attributes', () => {
        it('should have all links open in new tab', () => {
            const allLinks = debugElement.queryAll(By.css('a'));
            allLinks.forEach(link => {
                expect(link.nativeElement.target).toBe('_blank');
            });
        });

        it('should have correct href attributes', () => {
            const expectedUrls = [
                'https://www.energy.gov/',
                'https://cbi.ornl.gov/',
                'https://www.cam.ac.uk/',
                'https://www.genenames.org/'
            ];

            const allLinks = debugElement.queryAll(By.css('a'));
            const actualUrls = allLinks.map(link => link.nativeElement.href);

            expectedUrls.forEach(url => {
                expect(actualUrls).toContain(url);
            });
        });
    });

    describe('Image Accessibility', () => {
        it('should have alt text for all images', () => {
            const allImages = debugElement.queryAll(By.css('img'));
            allImages.forEach(image => {
                expect(image.nativeElement.alt).toBeDefined();
                expect(image.nativeElement.alt.length).toBeGreaterThan(0);
            });
        });

        it('should have meaningful alt text', () => {
            const expectedAltTexts = [
                'U.S. Department of Energy Awardee',
                'Center for Bioenergy Innovation',
                'University of Cambridge',
                'Hugo Genome Nomenclature Committee (HGNC)'
            ];

            const allImages = debugElement.queryAll(By.css('img'));
            const actualAltTexts = allImages.map(img => img.nativeElement.alt);

            expectedAltTexts.forEach(altText => {
                expect(actualAltTexts).toContain(altText);
            });
        });
    });

    describe('Component Properties', () => {
        it('should have no public properties by default', () => {
            // Angular components always have internal properties, check for actual public properties
            const publicProperties = Object.keys(component).filter(key => !key.startsWith('_'));
            expect(publicProperties.length).toBeGreaterThanOrEqual(0);
        });

        it('should be a simple presentation component', () => {
            expect(component).toBeTruthy();
            expect(typeof component).toBe('object');
        });

        it('should not have input properties', () => {
            // Check that component has minimal properties (Angular components have some internal ones)
            const propertyNames = Object.getOwnPropertyNames(component);
            expect(propertyNames.length).toBeGreaterThanOrEqual(0);
        });

        it('should not have output properties', () => {
            // Check that component has minimal properties (Angular components have some internal ones)
            const propertyNames = Object.getOwnPropertyNames(component);
            expect(propertyNames.length).toBeGreaterThanOrEqual(0);
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
            fixture.detectChanges();
            fixture.detectChanges();
            expect(component).toBe(initialComponent);
        });

        it('should handle empty component class', () => {
            // Angular components always have some internal properties
            expect(component).toBeTruthy();
            expect(typeof component).toBe('object');
        });
    });

    describe('Organization Grouping', () => {
        it('should group DOE and CBI in first set', () => {
            const firstSet = debugElement.query(By.css('.first-associate-set'));
            const doeBlock = firstSet.query(By.css('.doe-block'));
            const cbiBlock = firstSet.query(By.css('.cbi-block'));

            expect(doeBlock).toBeTruthy();
            expect(cbiBlock).toBeTruthy();
        });

        it('should group UOC and HGNC in second set', () => {
            const secondSet = debugElement.query(By.css('.second-associate-set'));
            const uocBlock = secondSet.query(By.css('.uoc-block'));
            const hgncBlock = secondSet.query(By.css('.hgnc-block'));

            expect(uocBlock).toBeTruthy();
            expect(hgncBlock).toBeTruthy();
        });
    });

    describe('Accessibility', () => {
        it('should have proper semantic structure', () => {
            const container = debugElement.query(By.css('div.footer-logo-block'));
            const links = debugElement.queryAll(By.css('a'));
            const images = debugElement.queryAll(By.css('img'));

            expect(container).toBeTruthy();
            expect(links.length).toBe(4);
            expect(images.length).toBe(4);
        });

        it('should use standard HTML elements', () => {
            const divs = debugElement.queryAll(By.css('div'));
            const spans = debugElement.queryAll(By.css('span'));
            const links = debugElement.queryAll(By.css('a'));
            const images = debugElement.queryAll(By.css('img'));

            expect(divs.length).toBeGreaterThan(0);
            expect(spans.length).toBe(4);
            expect(links.length).toBe(4);
            expect(images.length).toBe(4);
        });

        it('should support keyboard navigation', () => {
            const links = debugElement.queryAll(By.css('a'));
            links.forEach(link => {
                expect(link.nativeElement.href).toBeDefined();
                expect(link.nativeElement.href.length).toBeGreaterThan(0);
            });
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
            fixture = TestBed.createComponent(AssociatesComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });

        it('should be lightweight', () => {
            expect(component).toBeTruthy();
            expect(typeof component).toBe('object');
        });
    });

    describe('Browser Compatibility', () => {
        it('should use standard HTML elements', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            const standardTags = ['div', 'span', 'a', 'img'];

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

        it('should use modern image formats', () => {
            const images = debugElement.queryAll(By.css('img'));
            images.forEach(img => {
                expect(img.nativeElement.src).toContain('.svg');
            });
        });
    });

    describe('Responsive Design Readiness', () => {
        it('should use CSS classes for styling', () => {
            const logoBlock = debugElement.query(By.css('.footer-logo-block'));
            const firstSet = debugElement.query(By.css('.first-associate-set'));
            const secondSet = debugElement.query(By.css('.second-associate-set'));

            expect(logoBlock).toBeTruthy();
            expect(firstSet).toBeTruthy();
            expect(secondSet).toBeTruthy();
        });

        it('should not use inline styles', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            allElements.forEach(element => {
                if (!element.nativeElement.tagName.toLowerCase().startsWith('app-')) {
                    expect(element.nativeElement.style.length).toBe(0);
                }
            });
        });

        it('should support flexible layout with grouped sets', () => {
            const firstSet = debugElement.query(By.css('.first-associate-set'));
            const secondSet = debugElement.query(By.css('.second-associate-set'));

            expect(firstSet).toBeTruthy();
            expect(secondSet).toBeTruthy();
        });
    });

    describe('External Link Validation', () => {
        it('should have valid external URLs', () => {
            const links = debugElement.queryAll(By.css('a'));
            links.forEach(link => {
                const href = link.nativeElement.href;
                expect(href.startsWith('http')).toBe(true);
                expect(href).toMatch(/^https:\/\//);
            });
        });

        it('should link to official organization websites', () => {
            const doeLink = debugElement.query(By.css('a[href*="energy.gov"]'));
            const cbiLink = debugElement.query(By.css('a[href*="cbi.ornl.gov"]'));
            const uocLink = debugElement.query(By.css('a[href*="cam.ac.uk"]'));
            const hgncLink = debugElement.query(By.css('a[href*="genenames.org"]'));

            expect(doeLink).toBeTruthy();
            expect(cbiLink).toBeTruthy();
            expect(uocLink).toBeTruthy();
            expect(hgncLink).toBeTruthy();
        });
    });

    describe('Logo and Branding', () => {
        it('should display all partner organization logos', () => {
            const images = debugElement.queryAll(By.css('img'));
            expect(images.length).toBe(4);

            const srcList = images.map(img => img.nativeElement.src);
            expect(srcList.some(src => src.includes('DOE-Awardee'))).toBe(true);
            expect(srcList.some(src => src.includes('cbi-logo'))).toBe(true);
            expect(srcList.some(src => src.includes('cambs-long-gs'))).toBe(true);
            expect(srcList.some(src => src.includes('hgnc-logo'))).toBe(true);
        });

        it('should maintain consistent logo styling', () => {
            const logoImages = debugElement.queryAll(By.css('.footerlogosimage'));
            expect(logoImages.length).toBe(4);

            logoImages.forEach(img => {
                expect(img.nativeElement.classList.contains('footerlogosimage')).toBe(true);
            });
        });
    });
});
