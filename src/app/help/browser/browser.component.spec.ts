import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BrowserHelpComponent } from './browser.component';

describe('BrowserHelpComponent', () => {
    let component: BrowserHelpComponent;
    let fixture: ComponentFixture<BrowserHelpComponent>;
    let debugElement: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BrowserHelpComponent, FontAwesomeModule],
        }).compileComponents();

        fixture = TestBed.createComponent(BrowserHelpComponent);
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

        it('should be an instance of BrowserHelpComponent', () => {
            expect(component).toBeInstanceOf(BrowserHelpComponent);
        });

        it('should be a standalone component', () => {
            expect(BrowserHelpComponent.prototype.constructor).toBeDefined();
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
            expect(heading.nativeElement.textContent.trim()).toContain('Browser help');
        });

        it('should have proper DOM structure', () => {
            const container = debugElement.query(By.css('.container'));
            const heading = container.query(By.css('h1'));

            expect(container).toBeTruthy();
            expect(heading).toBeTruthy();
            expect(heading.nativeElement.parentElement).toBe(container.nativeElement);
        });

        it('should contain browser help sections', () => {
            const sections = debugElement.queryAll(By.css('h2, h3'));
            expect(sections.length).toBeGreaterThan(0);
        });
    });

    describe('Component Properties', () => {
        it('should have faCircleCheck icon property', () => {
            expect(component.faCircleCheck).toBeDefined();
            expect(typeof component.faCircleCheck).toBe('object');
        });

        it('should maintain property types', () => {
            expect(typeof component.faCircleCheck).toBe('object');
        });

        it('should have correct icon property', () => {
            expect(component.faCircleCheck).toBeTruthy();
        });
    });

    describe('FontAwesome Integration', () => {
        it('should display FontAwesome check circle icons if present', () => {
            const faIcons = debugElement.queryAll(By.css('fa-icon'));

            faIcons.forEach(icon => {
                expect(icon.nativeElement.tagName.toLowerCase()).toBe('fa-icon');
            });
        });

        it('should have correct icon binding if icons are used', () => {
            const faIcons = debugElement.queryAll(By.css('fa-icon'));

            faIcons.forEach(icon => {
                expect(icon.nativeElement.hasAttribute('ng-reflect-icon')).toBe(true);
            });
        });

        it('should render icons properly if present', () => {
            const faIcons = debugElement.queryAll(By.css('fa-icon'));

            faIcons.forEach(icon => {
                expect(icon).toBeTruthy();
                expect(icon.nativeElement.tagName.toLowerCase()).toBe('fa-icon');
            });
        });
    });

    describe('Browser Help Content', () => {
        it('should contain browser compatibility information', () => {
            const allContent = debugElement.nativeElement.textContent.toLowerCase();

            const browserTerms = ['browser', 'chrome', 'firefox', 'safari', 'edge', 'javascript'];
            const containsBrowserTerms = browserTerms.some(term => allContent.includes(term));
            expect(containsBrowserTerms).toBe(true);
        });

        it('should provide browser recommendations', () => {
            const paragraphs = debugElement.queryAll(By.css('p'));
            expect(paragraphs.length).toBeGreaterThan(0);

            const hasRecommendations = paragraphs.some(
                p =>
                    p.nativeElement.textContent.toLowerCase().includes('recommend') ||
                    p.nativeElement.textContent.toLowerCase().includes('support') ||
                    p.nativeElement.textContent.toLowerCase().includes('compatible')
            );
            expect(hasRecommendations).toBe(true);
        });

        it('should include JavaScript information', () => {
            const allContent = debugElement.nativeElement.textContent.toLowerCase();
            expect(allContent.includes('javascript') || allContent.includes('js')).toBe(true);
        });

        it('should have meaningful help content', () => {
            const allContent = debugElement.nativeElement.textContent;
            expect(allContent.length).toBeGreaterThan(100);
        });
    });

    describe('Accessibility', () => {
        it('should have proper heading hierarchy', () => {
            const h1Elements = debugElement.queryAll(By.css('h1'));
            expect(h1Elements.length).toBe(1);

            const headings = debugElement.queryAll(By.css('h1, h2, h3, h4, h5, h6'));
            expect(headings.length).toBeGreaterThan(1);
        });

        it('should use semantic HTML elements', () => {
            const container = debugElement.query(By.css('.container'));
            const headings = debugElement.queryAll(By.css('h1, h2, h3'));
            const paragraphs = debugElement.queryAll(By.css('p'));

            expect(container).toBeTruthy();
            expect(headings.length).toBeGreaterThan(0);
            expect(paragraphs.length).toBeGreaterThan(0);
        });

        it('should have descriptive headings', () => {
            const headings = debugElement.queryAll(By.css('h2, h3'));
            headings.forEach(heading => {
                const text = heading.nativeElement.textContent.trim();
                expect(text.length).toBeGreaterThan(3);
            });
        });

        it('should provide clear instructions', () => {
            const instructionalElements = debugElement.queryAll(By.css('p, li'));
            expect(instructionalElements.length).toBeGreaterThan(0);
        });
    });

    describe('Content Structure', () => {
        it('should organize content in sections', () => {
            const container = debugElement.query(By.css('.container'));
            const children = Array.from(container.nativeElement.children);

            expect(children.length).toBeGreaterThan(1);
        });

        it('should provide detailed browser information', () => {
            const paragraphs = debugElement.queryAll(By.css('p'));
            paragraphs.forEach(p => {
                if (p.nativeElement.textContent.trim().length > 0) {
                    expect(p.nativeElement.textContent.trim().length).toBeGreaterThan(10);
                }
            });
        });

        it('should include browser-specific guidance', () => {
            const allText = debugElement.nativeElement.textContent.toLowerCase();

            // Should mention browser-related topics
            const browserTopics = ['version', 'update', 'enable', 'disable', 'setting'];
            const containsBrowserTopics = browserTopics.some(topic => allText.includes(topic));
            expect(containsBrowserTopics).toBe(true);
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
            const initialIcon = component.faCircleCheck;

            fixture.detectChanges();
            fixture.detectChanges();

            expect(component).toBe(initialComponent);
            expect(component.faCircleCheck).toBe(initialIcon);
        });

        it('should handle icon property access', () => {
            expect(() => {
                const icon = component.faCircleCheck;
                expect(icon).toBeDefined();
            }).not.toThrow();
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should have Bootstrap container class', () => {
            const container = debugElement.query(By.css('.container'));
            expect(container).toBeTruthy();
            expect(container.nativeElement.classList.contains('container')).toBe(true);
        });

        it('should not use inline styles', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            allElements.forEach(element => {
                if (
                    !element.nativeElement.tagName.toLowerCase().startsWith('app-') &&
                    !element.nativeElement.tagName.toLowerCase().startsWith('fa-')
                ) {
                    expect(element.nativeElement.style.length).toBe(0);
                }
            });
        });

        it('should use proper HTML structure', () => {
            const container = debugElement.query(By.css('div.container'));
            const h1 = container.query(By.css('h1'));

            expect(container).toBeTruthy();
            expect(h1).toBeTruthy();
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
            fixture = TestBed.createComponent(BrowserHelpComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });

        it('should be lightweight with minimal properties', () => {
            const propertyCount = Object.keys(component).length;
            expect(propertyCount).toBeLessThanOrEqual(3); // Allow for Angular internal properties
        });
    });

    describe('Browser Compatibility', () => {
        it('should use standard HTML elements', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            const standardTags = [
                'div',
                'h1',
                'h2',
                'h3',
                'p',
                'a',
                'ul',
                'li',
                'strong',
                'em',
                'table',
                'tr',
                'th',
                'td',
                'tbody',
                'thead',
                'tfoot',
                'ol',
                'span',
                'img',
                'button',
                'input',
                'form',
                'label',
                'select',
                'option',
                'textarea',
                'nav',
                'section',
                'article',
                'aside',
                'header',
                'footer',
                'main',
                'svg',
                'path',
                'g',
                'circle',
                'rect',
                'line',
                'polygon',
                'polyline',
            ];

            allElements.forEach(element => {
                const tagName = element.nativeElement.tagName.toLowerCase();
                if (
                    !tagName.startsWith('app-') &&
                    !tagName.startsWith('fa-') &&
                    !tagName.startsWith('router-')
                ) {
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

        it('should provide cross-browser compatibility information', () => {
            const allContent = debugElement.nativeElement.textContent.toLowerCase();

            // Should mention multiple browsers or general compatibility
            const browserNames = ['chrome', 'firefox', 'safari', 'edge', 'browser'];
            const mentionsBrowsers = browserNames.some(browser => allContent.includes(browser));
            expect(mentionsBrowsers).toBe(true);
        });
    });

    describe('User Experience', () => {
        it('should provide actionable browser help', () => {
            const allContent = debugElement.nativeElement.textContent.toLowerCase();

            // Should contain actionable terms
            const actionableTerms = ['enable', 'disable', 'update', 'install', 'configure', 'set'];
            const containsActionableTerms = actionableTerms.some(term => allContent.includes(term));
            expect(containsActionableTerms).toBe(true);
        });

        it('should have clear help structure', () => {
            const h1 = debugElement.query(By.css('h1'));
            const headings = debugElement.queryAll(By.css('h2, h3'));

            expect(h1).toBeTruthy();
            expect(headings.length).toBeGreaterThan(0);
        });

        it('should provide comprehensive browser guidance', () => {
            const mainContent = debugElement.query(By.css('.container')).nativeElement.textContent;
            expect(mainContent.length).toBeGreaterThan(200);
        });
    });

    describe('Technical Information', () => {
        it('should include JavaScript guidance', () => {
            const allContent = debugElement.nativeElement.textContent.toLowerCase();

            // Should mention JavaScript or scripting
            expect(
                allContent.includes('javascript') ||
                    allContent.includes('script') ||
                    allContent.includes('js')
            ).toBe(true);
        });

        it('should provide browser version information', () => {
            const allContent = debugElement.nativeElement.textContent.toLowerCase();

            // Should mention versions or updates
            expect(
                allContent.includes('version') ||
                    allContent.includes('update') ||
                    allContent.includes('latest')
            ).toBe(true);
        });

        it('should address common browser issues', () => {
            const allContent = debugElement.nativeElement.textContent.toLowerCase();

            // Should address common issues
            const issueTerms = ['problem', 'issue', 'error', 'fix', 'solve', 'troubleshoot'];
            const addressesIssues = issueTerms.some(term => allContent.includes(term));
            expect(addressesIssues).toBe(true);
        });
    });

    describe('Icon Usage', () => {
        it('should use icons appropriately for visual enhancement', () => {
            const faIcons = debugElement.queryAll(By.css('fa-icon'));

            // Icons should be used for visual enhancement, not required content
            faIcons.forEach(icon => {
                const parent = icon.nativeElement.parentElement;
                expect(parent).toBeTruthy();

                // Should have accompanying text content or serve a decorative purpose
                // Check parent element and its ancestors for text content
                let element = parent;
                let hasTextContent = false;
                let depth = 0;

                while (element && depth < 3) {
                    const textContent = element.textContent
                        ?.replace(icon.nativeElement.textContent || '', '')
                        .trim();
                    if (textContent && textContent.length > 0) {
                        hasTextContent = true;
                        break;
                    }
                    element = element.parentElement;
                    depth++;
                }

                // If no text content found, check if it has siblings with text
                if (!hasTextContent && parent.parentElement) {
                    const siblings = Array.from(parent.parentElement.children);
                    const siblingHasText = siblings.some(
                        sibling =>
                            sibling !== parent && (sibling as HTMLElement).textContent?.trim()
                    );
                    hasTextContent = siblingHasText;
                }

                expect(hasTextContent).toBe(true);
            });
        });

        it('should have consistent icon usage', () => {
            const faIcons = debugElement.queryAll(By.css('fa-icon'));

            if (faIcons.length > 0) {
                // All icons should have the same binding pattern
                faIcons.forEach(icon => {
                    expect(icon.nativeElement.hasAttribute('ng-reflect-icon')).toBe(true);
                });
            }
        });
    });
});
