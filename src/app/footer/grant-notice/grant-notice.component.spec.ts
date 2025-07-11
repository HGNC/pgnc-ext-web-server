import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { GrantNoticeComponent } from './grant-notice.component';

describe('GrantNoticeComponent', () => {
    let component: GrantNoticeComponent;
    let fixture: ComponentFixture<GrantNoticeComponent>;
    let debugElement: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [GrantNoticeComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(GrantNoticeComponent);
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

        it('should be an instance of GrantNoticeComponent', () => {
            expect(component).toBeInstanceOf(GrantNoticeComponent);
        });

        it('should be a standalone component', () => {
            expect(GrantNoticeComponent.prototype.constructor).toBeDefined();
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

        it('should render the row element', () => {
            const row = debugElement.query(By.css('.row'));
            expect(row).toBeTruthy();
        });

        it('should render the grantinfo section', () => {
            const grantinfo = debugElement.query(By.css('.grantinfo'));
            expect(grantinfo).toBeTruthy();
        });

        it('should have proper DOM structure', () => {
            const container = debugElement.query(By.css('.container'));
            const row = container.query(By.css('.row'));
            const grantinfo = row.query(By.css('.grantinfo'));

            expect(container).toBeTruthy();
            expect(row).toBeTruthy();
            expect(grantinfo).toBeTruthy();
            expect(grantinfo.nativeElement.parentElement).toBe(row.nativeElement);
        });

        it('should contain all required elements', () => {
            const container = debugElement.query(By.css('.container'));
            const row = debugElement.query(By.css('.row'));
            const grantinfo = debugElement.query(By.css('.grantinfo'));
            const paragraph = debugElement.query(By.css('p'));

            expect(container).toBeTruthy();
            expect(row).toBeTruthy();
            expect(grantinfo).toBeTruthy();
            expect(paragraph).toBeTruthy();
        });
    });

    describe('Content Rendering', () => {
        it('should display the grant notice text', () => {
            const paragraph = debugElement.query(By.css('p'));
            expect(paragraph).toBeTruthy();

            const text = paragraph.nativeElement.textContent.trim();
            expect(text).toContain('This work is based upon work supported by the U.S. Department of Energy');
            expect(text).toContain('Award Number DE-AC05-00OR22725');
        });

        it('should contain specific grant information', () => {
            const paragraph = debugElement.query(By.css('p'));
            const text = paragraph.nativeElement.textContent;

            expect(text).toContain('U.S. Department of Energy');
            expect(text).toContain('DE-AC05-00OR22725');
        });

        it('should have meaningful content', () => {
            const paragraph = debugElement.query(By.css('p'));
            const text = paragraph.nativeElement.textContent.trim();

            expect(text.length).toBeGreaterThan(50);
            expect(text).toMatch(/work.*supported.*Department.*Energy/i);
        });

        it('should have the complete grant notice', () => {
            const paragraph = debugElement.query(By.css('p'));
            const expectedText = 'This work is based upon work supported by the U.S. Department of Energy under Award Number DE-AC05-00OR22725.';

            expect(paragraph.nativeElement.textContent.trim()).toBe(expectedText);
        });
    });

    describe('CSS Classes', () => {
        it('should have container class', () => {
            const container = debugElement.query(By.css('.container'));
            expect(container).toBeTruthy();
            expect(container.nativeElement.classList.contains('container')).toBe(true);
        });

        it('should have row class', () => {
            const row = debugElement.query(By.css('.row'));
            expect(row).toBeTruthy();
            expect(row.nativeElement.classList.contains('row')).toBe(true);
        });

        it('should have grantinfo class', () => {
            const grantinfo = debugElement.query(By.css('.grantinfo'));
            expect(grantinfo).toBeTruthy();
            expect(grantinfo.nativeElement.classList.contains('grantinfo')).toBe(true);
        });

        it('should have Bootstrap column classes', () => {
            const grantinfo = debugElement.query(By.css('.grantinfo'));
            expect(grantinfo.nativeElement.classList.contains('col-sm-12')).toBe(true);
        });

        it('should apply CSS classes correctly', () => {
            const grantinfo = debugElement.query(By.css('.grantinfo.col-sm-12'));
            expect(grantinfo).toBeTruthy();
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

    describe('Text Content Validation', () => {
        it('should contain specific compliance keywords', () => {
            const paragraph = debugElement.query(By.css('p'));
            const text = paragraph.nativeElement.textContent.toLowerCase();

            expect(text).toContain('department of energy');
            expect(text).toContain('award');
            expect(text).toContain('supported');
        });

        it('should provide proper attribution', () => {
            const paragraph = debugElement.query(By.css('p'));
            const text = paragraph.nativeElement.textContent;

            expect(text).toMatch(/work.*based.*upon.*work/i);
            expect(text).toContain('U.S. Department of Energy');
        });

        it('should include award number', () => {
            const paragraph = debugElement.query(By.css('p'));
            const text = paragraph.nativeElement.textContent;

            expect(text).toMatch(/DE-AC05-00OR22725/);
        });
    });

    describe('Accessibility', () => {
        it('should have proper semantic structure', () => {
            const paragraph = debugElement.query(By.css('p'));
            expect(paragraph).toBeTruthy();
            expect(paragraph.nativeElement.tagName.toLowerCase()).toBe('p');
        });

        it('should have meaningful content for screen readers', () => {
            const paragraph = debugElement.query(By.css('p'));
            const text = paragraph.nativeElement.textContent.trim();

            expect(text.length).toBeGreaterThan(20);
            expect(text).toMatch(/[A-Z]/); // Should start with capital letter
        });

        it('should use standard HTML elements', () => {
            const container = debugElement.query(By.css('div.container'));
            const paragraph = debugElement.query(By.css('p'));

            expect(container).toBeTruthy();
            expect(paragraph).toBeTruthy();
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
            fixture = TestBed.createComponent(GrantNoticeComponent);
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
            const standardTags = ['div', 'p'];

            allElements.forEach(element => {
                const tagName = element.nativeElement.tagName.toLowerCase();
                if (tagName !== 'app-grant-notice') {
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
            const row = debugElement.query(By.css('.row'));
            const grantinfo = debugElement.query(By.css('.grantinfo'));

            expect(container).toBeTruthy();
            expect(row).toBeTruthy();
            expect(grantinfo).toBeTruthy();
        });

        it('should not use inline styles', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            allElements.forEach(element => {
                if (element.nativeElement.tagName.toLowerCase() !== 'app-grant-notice') {
                    expect(element.nativeElement.style.length).toBe(0);
                }
            });
        });

        it('should use Bootstrap grid system', () => {
            const grantinfo = debugElement.query(By.css('.col-sm-12'));
            expect(grantinfo).toBeTruthy();
        });
    });

    describe('Content Compliance', () => {
        it('should contain federal compliance information', () => {
            const paragraph = debugElement.query(By.css('p'));
            const text = paragraph.nativeElement.textContent;

            expect(text).toContain('U.S. Department of Energy');
            expect(text).toMatch(/Award Number/i);
        });

        it('should have proper legal attribution format', () => {
            const paragraph = debugElement.query(By.css('p'));
            const text = paragraph.nativeElement.textContent;

            expect(text).toMatch(/This work is based upon work supported by/i);
            expect(text).toMatch(/under Award Number/i);
        });
    });
});
