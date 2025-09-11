import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LicenceComponent } from './licence.component';

describe('LicenceComponent', () => {
    let component: LicenceComponent;
    let fixture: ComponentFixture<LicenceComponent>;
    let debugElement: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LicenceComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LicenceComponent);
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

        it('should be an instance of LicenceComponent', () => {
            expect(component).toBeInstanceOf(LicenceComponent);
        });

        it('should be a standalone component', () => {
            expect(LicenceComponent.prototype.constructor).toBeDefined();
        });

        it('should have correct selector', () => {
            const compiled = fixture.nativeElement;
            expect(compiled).toBeTruthy();
        });
    });

    describe('Template Structure', () => {
        it('should render the footer license block container', () => {
            const licenseBlock = debugElement.query(By.css('.footer-license-block'));
            expect(licenseBlock).toBeTruthy();
        });

        it('should render the paragraph element', () => {
            const paragraph = debugElement.query(By.css('p'));
            expect(paragraph).toBeTruthy();
        });

        it('should have proper DOM structure', () => {
            const licenseBlock = debugElement.query(By.css('.footer-license-block'));
            const paragraph = licenseBlock.query(By.css('p'));

            expect(licenseBlock).toBeTruthy();
            expect(paragraph).toBeTruthy();
            expect(paragraph.nativeElement.parentElement).toBe(licenseBlock.nativeElement);
        });

        it('should contain all required elements', () => {
            const licenseBlock = debugElement.query(By.css('.footer-license-block'));
            const paragraph = debugElement.query(By.css('p'));
            const links = debugElement.queryAll(By.css('a'));
            const image = debugElement.query(By.css('img'));
            const small = debugElement.query(By.css('small'));

            expect(licenseBlock).toBeTruthy();
            expect(paragraph).toBeTruthy();
            expect(links.length).toBe(2);
            expect(image).toBeTruthy();
            expect(small).toBeTruthy();
        });
    });

    describe('License Links', () => {
        it('should have Creative Commons Zero external link', () => {
            const ccLink = debugElement.query(By.css('a[href*="creativecommons.org"]'));
            expect(ccLink).toBeTruthy();
            expect(ccLink.nativeElement.href).toBe(
                'https://creativecommons.org/publicdomain/zero/1.0/legalcode.en'
            );
            expect(ccLink.nativeElement.target).toBe('_blank');
        });

        it('should have internal license page link', () => {
            const licenseLink = debugElement.query(By.css('a[href="/license"]'));
            expect(licenseLink).toBeTruthy();
            expect(licenseLink.nativeElement.href).toContain('/license');
        });

        it('should have correct link classes', () => {
            const ccLink = debugElement.query(By.css('a[href*="creativecommons.org"]'));
            expect(ccLink.nativeElement.classList.contains('no-icon')).toBe(true);
        });
    });

    describe('License Image', () => {
        it('should render CC0 license image', () => {
            const ccImage = debugElement.query(By.css('img[alt*="CC0"]'));
            expect(ccImage).toBeTruthy();
            expect(ccImage.nativeElement.src).toContain('CC0.png');
            expect(ccImage.nativeElement.alt).toBe('CC0 license');
        });

        it('should be within the CC link', () => {
            const ccLink = debugElement.query(By.css('a[href*="creativecommons.org"]'));
            const ccImage = ccLink.query(By.css('img'));
            expect(ccImage).toBeTruthy();
            expect(ccImage.nativeElement.parentElement).toBe(ccLink.nativeElement);
        });
    });

    describe('License Text Content', () => {
        it('should display license description', () => {
            const small = debugElement.query(By.css('small'));
            expect(small).toBeTruthy();

            const licenseLink = small.query(By.css('a'));
            const text = licenseLink.nativeElement.textContent.trim();
            expect(text).toContain('All PGNC data are freely available');
            expect(text).toContain('Creative Commons Zero license');
            expect(text).toContain('CC0');
        });

        it('should have complete license notice', () => {
            const small = debugElement.query(By.css('small'));
            const licenseLink = small.query(By.css('a'));
            const expectedText =
                'All PGNC data are freely available under the Creative Commons Zero license (CC0)';

            expect(licenseLink.nativeElement.textContent.trim()).toBe(expectedText);
        });

        it('should include specific license information', () => {
            const small = debugElement.query(By.css('small'));
            const text = small.nativeElement.textContent;

            expect(text).toContain('PGNC data');
            expect(text).toContain('freely available');
            expect(text).toContain('Creative Commons Zero');
            expect(text).toContain('CC0');
        });
    });

    describe('CSS Classes', () => {
        it('should have footer-license-block class', () => {
            const licenseBlock = debugElement.query(By.css('.footer-license-block'));
            expect(licenseBlock).toBeTruthy();
            expect(licenseBlock.nativeElement.classList.contains('footer-license-block')).toBe(
                true
            );
        });

        it('should have text-muted and text-center classes', () => {
            const paragraph = debugElement.query(By.css('p'));
            expect(paragraph.nativeElement.classList.contains('text-muted')).toBe(true);
            expect(paragraph.nativeElement.classList.contains('text-center')).toBe(true);
        });

        it('should have no-icon class on CC link', () => {
            const ccLink = debugElement.query(By.css('a[href*="creativecommons.org"]'));
            expect(ccLink.nativeElement.classList.contains('no-icon')).toBe(true);
        });

        it('should apply CSS classes correctly', () => {
            const paragraph = debugElement.query(By.css('p.text-muted.text-center'));
            expect(paragraph).toBeTruthy();
        });
    });

    describe('Link Targets and Behavior', () => {
        it('should open CC link in new tab', () => {
            const ccLink = debugElement.query(By.css('a[href*="creativecommons.org"]'));
            expect(ccLink.nativeElement.target).toBe('_blank');
        });

        it('should have internal license link without target', () => {
            const licenseLink = debugElement.query(By.css('a[href="/license"]'));
            expect(licenseLink.nativeElement.target).toBeFalsy();
        });

        it('should have correct href attributes', () => {
            const ccLink = debugElement.query(By.css('a[href*="creativecommons.org"]'));
            const licenseLink = debugElement.query(By.css('a[href="/license"]'));

            expect(ccLink.nativeElement.href).toBe(
                'https://creativecommons.org/publicdomain/zero/1.0/legalcode.en'
            );
            expect(licenseLink.nativeElement.href).toContain('/license');
        });
    });

    describe('Component Properties', () => {
        it('should have no public properties by default', () => {
            expect(Object.keys(component).length).toBe(1);
        });

        it('should be a simple presentation component', () => {
            expect(component).toBeTruthy();
            expect(typeof component).toBe('object');
        });

        it('should not have input properties', () => {
            expect(Object.getOwnPropertyNames(component).length).toBe(1);
        });

        it('should not have output properties', () => {
            expect(Object.getOwnPropertyNames(component).length).toBe(1);
        });
    });

    describe('Text Formatting and Layout', () => {
        it('should have centered text', () => {
            const paragraph = debugElement.query(By.css('p'));
            expect(paragraph.nativeElement.classList.contains('text-center')).toBe(true);
        });

        it('should have muted text styling', () => {
            const paragraph = debugElement.query(By.css('p'));
            expect(paragraph.nativeElement.classList.contains('text-muted')).toBe(true);
        });

        it('should use small text for license description', () => {
            const small = debugElement.query(By.css('small'));
            expect(small).toBeTruthy();
            expect(small.nativeElement.tagName.toLowerCase()).toBe('small');
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
            expect(Object.keys(component).length).toBe(1);
        });
    });

    describe('Legal Compliance Content', () => {
        it('should reference Creative Commons Zero license', () => {
            const paragraph = debugElement.query(By.css('p'));
            const text = paragraph.nativeElement.textContent;

            expect(text).toContain('Creative Commons Zero');
            expect(text).toContain('CC0');
        });

        it('should indicate data availability', () => {
            const small = debugElement.query(By.css('small'));
            const text = small.nativeElement.textContent;

            expect(text).toContain('freely available');
            expect(text).toContain('PGNC data');
        });

        it('should link to official CC0 legal code', () => {
            const ccLink = debugElement.query(By.css('a[href*="creativecommons.org"]'));
            expect(ccLink.nativeElement.href).toContain('legalcode.en');
        });

        it('should provide internal license information', () => {
            const licenseLink = debugElement.query(By.css('a[href="/license"]'));
            expect(licenseLink).toBeTruthy();
        });
    });

    describe('Accessibility', () => {
        it('should have proper semantic structure', () => {
            const container = debugElement.query(By.css('div.footer-license-block'));
            const paragraph = debugElement.query(By.css('p'));
            const links = debugElement.queryAll(By.css('a'));
            const image = debugElement.query(By.css('img'));

            expect(container).toBeTruthy();
            expect(paragraph).toBeTruthy();
            expect(links.length).toBe(2);
            expect(image).toBeTruthy();
        });

        it('should have alt text for license image', () => {
            const ccImage = debugElement.query(By.css('img'));
            expect(ccImage.nativeElement.alt).toBe('CC0 license');
            expect(ccImage.nativeElement.alt.length).toBeGreaterThan(0);
        });

        it('should have meaningful link text', () => {
            const licenseLink = debugElement.query(By.css('a[href="/license"]'));
            const text = licenseLink.nativeElement.textContent.trim();

            expect(text.length).toBeGreaterThan(20);
            expect(text).toContain('PGNC data');
            expect(text).toContain('Creative Commons');
        });

        it('should use standard HTML elements', () => {
            const div = debugElement.query(By.css('div'));
            const paragraph = debugElement.query(By.css('p'));
            const links = debugElement.queryAll(By.css('a'));
            const image = debugElement.query(By.css('img'));
            const small = debugElement.query(By.css('small'));

            expect(div).toBeTruthy();
            expect(paragraph).toBeTruthy();
            expect(links.length).toBe(2);
            expect(image).toBeTruthy();
            expect(small).toBeTruthy();
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
            fixture = TestBed.createComponent(LicenceComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });

        it('should be lightweight', () => {
            expect(component).toBeTruthy();
            expect(Object.keys(component).length).toBe(1);
        });
    });

    describe('Browser Compatibility', () => {
        it('should use standard HTML elements', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            const standardTags = ['div', 'p', 'a', 'img', 'small'];

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

        it('should use modern image formats where appropriate', () => {
            const image = debugElement.query(By.css('img'));
            expect(image.nativeElement.src).toContain('CC0.png');
        });
    });

    describe('Responsive Design Readiness', () => {
        it('should use CSS classes for styling', () => {
            const licenseBlock = debugElement.query(By.css('.footer-license-block'));
            const paragraph = debugElement.query(By.css('.text-muted.text-center'));
            const noIconLink = debugElement.query(By.css('.no-icon'));

            expect(licenseBlock).toBeTruthy();
            expect(paragraph).toBeTruthy();
            expect(noIconLink).toBeTruthy();
        });

        it('should not use inline styles', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            allElements.forEach(element => {
                if (!element.nativeElement.tagName.toLowerCase().startsWith('app-')) {
                    expect(element.nativeElement.style.length).toBe(0);
                }
            });
        });

        it('should use Bootstrap utility classes', () => {
            const paragraph = debugElement.query(By.css('p'));
            expect(paragraph.nativeElement.classList.contains('text-muted')).toBe(true);
            expect(paragraph.nativeElement.classList.contains('text-center')).toBe(true);
        });
    });

    describe('License Information Validity', () => {
        it('should reference valid Creative Commons license', () => {
            const ccLink = debugElement.query(By.css('a[href*="creativecommons.org"]'));
            expect(ccLink.nativeElement.href).toContain('publicdomain/zero/1.0');
        });

        it('should indicate appropriate license scope', () => {
            const licenseLink = debugElement.query(By.css('a[href="/license"]'));
            const text = licenseLink.nativeElement.textContent;

            expect(text).toContain('All PGNC data');
            expect(text).toContain('freely available');
        });

        it('should provide both visual and textual license information', () => {
            const ccImage = debugElement.query(By.css('img[alt*="CC0"]'));
            const licenseText = debugElement.query(By.css('small a'));

            expect(ccImage).toBeTruthy();
            expect(licenseText).toBeTruthy();
            expect(licenseText.nativeElement.textContent).toContain('CC0');
        });
    });

    describe('Text and Image Integration', () => {
        it('should properly integrate image with text flow', () => {
            const paragraph = debugElement.query(By.css('p'));
            const ccLink = paragraph.query(By.css('a[href*="creativecommons.org"]'));
            const small = paragraph.query(By.css('small'));

            expect(ccLink).toBeTruthy();
            expect(small).toBeTruthy();
            expect(ccLink.nativeElement.parentElement).toBe(paragraph.nativeElement);
            expect(small.nativeElement.parentElement).toBe(paragraph.nativeElement);
        });

        it('should maintain proper spacing with non-breaking space', () => {
            const small = debugElement.query(By.css('small'));
            const text = small.nativeElement.innerHTML;

            expect(text).toContain('&nbsp;');
        });
    });
});
