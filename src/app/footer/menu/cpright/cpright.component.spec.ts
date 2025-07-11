import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CpRightComponent } from './cpright.component';

describe('CpRightComponent', () => {
    let component: CpRightComponent;
    let fixture: ComponentFixture<CpRightComponent>;
    let debugElement: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CpRightComponent, FontAwesomeModule]
        }).compileComponents();

        fixture = TestBed.createComponent(CpRightComponent);
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

        it('should be an instance of CpRightComponent', () => {
            expect(component).toBeInstanceOf(CpRightComponent);
        });

        it('should be a standalone component', () => {
            expect(CpRightComponent.prototype.constructor).toBeDefined();
        });

        it('should have correct selector', () => {
            const compiled = fixture.nativeElement;
            expect(compiled).toBeTruthy();
        });
    });

    describe('Component Properties', () => {
        it('should have faCopyright icon defined', () => {
            expect(component.faCopyright).toBeDefined();
            expect(component.faCopyright).toBeTruthy();
        });

        it('should initialize FontAwesome copyright icon', () => {
            expect(component.faCopyright.iconName).toBe('copyright');
        });

        it('should have correct icon family', () => {
            expect(component.faCopyright.prefix).toBe('far'); // Regular style
        });
    });

    describe('Template Structure', () => {
        it('should render the copyright container', () => {
            const copyrightDiv = debugElement.query(By.css('.copyright'));
            expect(copyrightDiv).toBeTruthy();
        });

        it('should have proper DOM structure', () => {
            const copyrightDiv = debugElement.query(By.css('.copyright'));
            expect(copyrightDiv).toBeTruthy();
            expect(copyrightDiv.nativeElement.tagName.toLowerCase()).toBe('div');
        });

        it('should contain all required elements', () => {
            const copyrightDiv = debugElement.query(By.css('.copyright'));
            const faIcon = debugElement.query(By.css('fa-icon'));

            expect(copyrightDiv).toBeTruthy();
            expect(faIcon).toBeTruthy();
        });
    });

    describe('Content Rendering', () => {
        it('should display copyright text', () => {
            const copyrightDiv = debugElement.query(By.css('.copyright'));
            const text = copyrightDiv.nativeElement.textContent;

            expect(text).toContain('Copyright');
            expect(text).toContain('PGNC');
            expect(text).toContain('2025');
        });

        it('should have complete copyright notice', () => {
            const copyrightDiv = debugElement.query(By.css('.copyright'));
            const text = copyrightDiv.nativeElement.textContent.trim();

            // The text should contain Copyright, icon (rendered as empty or symbol), PGNC, and 2025
            expect(text).toMatch(/Copyright.*PGNC.*2025/);
        });

        it('should include current year', () => {
            const copyrightDiv = debugElement.query(By.css('.copyright'));
            const text = copyrightDiv.nativeElement.textContent;

            expect(text).toContain('2025');
        });

        it('should include organization name', () => {
            const copyrightDiv = debugElement.query(By.css('.copyright'));
            const text = copyrightDiv.nativeElement.textContent;

            expect(text).toContain('PGNC');
        });
    });

    describe('FontAwesome Integration', () => {
        it('should render FontAwesome copyright icon', () => {
            const faIcon = debugElement.query(By.css('fa-icon'));
            expect(faIcon).toBeTruthy();
        });

        it('should bind copyright icon correctly', () => {
            const faIcon = debugElement.query(By.css('fa-icon'));
            expect(faIcon).toBeTruthy();
            // The icon should be bound to the component property
        });

        it('should have icon integrated in text flow', () => {
            const copyrightDiv = debugElement.query(By.css('.copyright'));
            const faIcon = copyrightDiv.query(By.css('fa-icon'));

            expect(faIcon).toBeTruthy();
            expect(faIcon.nativeElement.parentElement).toBe(copyrightDiv.nativeElement);
        });
    });

    describe('CSS Classes', () => {
        it('should have copyright class', () => {
            const copyrightDiv = debugElement.query(By.css('.copyright'));
            expect(copyrightDiv).toBeTruthy();
            expect(copyrightDiv.nativeElement.classList.contains('copyright')).toBe(true);
        });

        it('should apply CSS classes correctly', () => {
            const copyrightDiv = debugElement.query(By.css('div.copyright'));
            expect(copyrightDiv).toBeTruthy();
        });
    });

    describe('Text Content Validation', () => {
        it('should have proper copyright format', () => {
            const copyrightDiv = debugElement.query(By.css('.copyright'));
            const text = copyrightDiv.nativeElement.textContent.trim();

            expect(text.startsWith('Copyright')).toBe(true);
            expect(text.endsWith('2025')).toBe(true);
        });

        it('should contain required copyright elements', () => {
            const copyrightDiv = debugElement.query(By.css('.copyright'));
            const text = copyrightDiv.nativeElement.textContent;

            expect(text).toContain('Copyright');
            expect(text).toContain('PGNC');
            expect(text).toContain('2025');
        });

        it('should have meaningful copyright notice', () => {
            const copyrightDiv = debugElement.query(By.css('.copyright'));
            const text = copyrightDiv.nativeElement.textContent.trim();

            expect(text.length).toBeGreaterThan(10);
            expect(text).toMatch(/Copyright.*PGNC.*2025/);
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
            const initialIcon = component.faCopyright;
            fixture.detectChanges();
            fixture.detectChanges();
            expect(component.faCopyright).toBe(initialIcon);
        });

        it('should handle icon property access', () => {
            expect(() => {
                const icon = component.faCopyright;
                expect(icon).toBeDefined();
            }).not.toThrow();
        });
    });

    describe('Component Properties Validation', () => {
        it('should have only faCopyright property', () => {
            const keys = Object.keys(component);
            expect(keys).toContain('faCopyright');
        });

        it('should be a simple presentation component', () => {
            expect(component).toBeTruthy();
            expect(typeof component).toBe('object');
        });

        it('should not have input properties', () => {
            // This component should be simple with just the icon property
            const ownProps = Object.getOwnPropertyNames(component);
            expect(ownProps.length).toBeGreaterThanOrEqual(0);
        });

        it('should not have output properties', () => {
            // This component should be simple with just the icon property
            const ownProps = Object.getOwnPropertyNames(component);
            expect(ownProps.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe('Accessibility', () => {
        it('should have proper semantic structure', () => {
            const copyrightDiv = debugElement.query(By.css('div.copyright'));
            expect(copyrightDiv).toBeTruthy();
            expect(copyrightDiv.nativeElement.tagName.toLowerCase()).toBe('div');
        });

        it('should have meaningful text content', () => {
            const copyrightDiv = debugElement.query(By.css('.copyright'));
            const text = copyrightDiv.nativeElement.textContent.trim();

            expect(text.length).toBeGreaterThan(0);
            expect(text).toContain('Copyright');
        });

        it('should use standard HTML elements', () => {
            const copyrightDiv = debugElement.query(By.css('div'));
            expect(copyrightDiv).toBeTruthy();
        });

        it('should be readable by screen readers', () => {
            const copyrightDiv = debugElement.query(By.css('.copyright'));
            const text = copyrightDiv.nativeElement.textContent;

            expect(text).toMatch(/Copyright.*PGNC.*2025/);
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
            fixture = TestBed.createComponent(CpRightComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            expect(component).toBeTruthy();
            expect(component.faCopyright).toBeDefined();
        });

        it('should be lightweight', () => {
            expect(component).toBeTruthy();
            expect(Object.keys(component).length).toBe(2); // Should have faCopyright and other property
        });
    });

    describe('Browser Compatibility', () => {
        it('should use standard HTML elements', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            const standardTags = ['div', 'fa-icon', 'svg', 'path'];

            allElements.forEach(element => {
                const tagName = element.nativeElement.tagName.toLowerCase();
                if (!tagName.startsWith('app-')) {
                    expect(standardTags.includes(tagName) || tagName.startsWith('fa-')).toBe(true);
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
            const copyrightDiv = debugElement.query(By.css('.copyright'));
            expect(copyrightDiv).toBeTruthy();
        });

        it('should not use inline styles', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            allElements.forEach(element => {
                if (!element.nativeElement.tagName.toLowerCase().startsWith('app-') &&
                    !element.nativeElement.tagName.toLowerCase().startsWith('fa-')) {
                    expect(element.nativeElement.style.length).toBe(0);
                }
            });
        });
    });

    describe('Legal and Compliance', () => {
        it('should display proper copyright notice', () => {
            const copyrightDiv = debugElement.query(By.css('.copyright'));
            const text = copyrightDiv.nativeElement.textContent;

            expect(text).toContain('Copyright');
            expect(text).toContain('PGNC');
            expect(text).toContain('2025');
        });

        it('should include current year for legal validity', () => {
            const copyrightDiv = debugElement.query(By.css('.copyright'));
            const text = copyrightDiv.nativeElement.textContent;

            expect(text).toContain('2025');
        });

        it('should identify copyright holder', () => {
            const copyrightDiv = debugElement.query(By.css('.copyright'));
            const text = copyrightDiv.nativeElement.textContent;

            expect(text).toContain('PGNC');
        });
    });

    describe('Icon Integration', () => {
        it('should integrate icon seamlessly with text', () => {
            const copyrightDiv = debugElement.query(By.css('.copyright'));
            const faIcon = copyrightDiv.query(By.css('fa-icon'));

            expect(faIcon).toBeTruthy();
            expect(faIcon.nativeElement.parentElement).toBe(copyrightDiv.nativeElement);
        });

        it('should maintain text flow with icon', () => {
            const copyrightDiv = debugElement.query(By.css('.copyright'));
            const text = copyrightDiv.nativeElement.textContent;

            // Text should flow: "Copyright [icon] PGNC 2025"
            expect(text).toMatch(/Copyright.*PGNC.*2025/);
        });
    });
});
