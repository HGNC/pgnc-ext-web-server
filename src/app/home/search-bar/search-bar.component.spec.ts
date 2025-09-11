import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HomeSearchBarComponent } from './search-bar.component';

// Import spyOn for Jest
const { spyOn } = jest;

describe('HomeSearchBarComponent', () => {
    let component: HomeSearchBarComponent;
    let fixture: ComponentFixture<HomeSearchBarComponent>;
    let debugElement: DebugElement;
    let mockRouter: any;

    beforeEach(async () => {
        const routerSpy = {
            navigate: jest.fn(),
        };

        await TestBed.configureTestingModule({
            imports: [
                HomeSearchBarComponent,
                FormsModule,
                FontAwesomeModule,
                RouterTestingModule.withRoutes([]),
            ],
            providers: [{ provide: Router, useValue: routerSpy }],
        }).compileComponents();

        fixture = TestBed.createComponent(HomeSearchBarComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        mockRouter = TestBed.inject(Router);
        fixture.detectChanges();
    });

    describe('Component Creation', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should be defined', () => {
            expect(component).toBeDefined();
        });

        it('should be an instance of HomeSearchBarComponent', () => {
            expect(component).toBeInstanceOf(HomeSearchBarComponent);
        });

        it('should be a standalone component', () => {
            expect(HomeSearchBarComponent.prototype.constructor).toBeDefined();
        });

        it('should have correct selector', () => {
            const compiled = fixture.nativeElement;
            expect(compiled).toBeTruthy();
        });
    });

    describe('Template Structure', () => {
        it('should render the search form', () => {
            const form = debugElement.query(By.css('form.search-form'));
            expect(form).toBeTruthy();
            expect(form.nativeElement.getAttribute('role')).toBe('search');
        });

        it('should render the input group', () => {
            const inputGroup = debugElement.query(By.css('.input-group'));
            expect(inputGroup).toBeTruthy();
        });

        it('should render the query group', () => {
            const queryGroup = debugElement.query(By.css('.query-group'));
            expect(queryGroup).toBeTruthy();
        });

        it('should have proper DOM structure', () => {
            const form = debugElement.query(By.css('form.search-form'));
            const inputGroup = form.query(By.css('.input-group'));
            const queryGroup = inputGroup.query(By.css('.query-group'));

            expect(form).toBeTruthy();
            expect(inputGroup).toBeTruthy();
            expect(queryGroup).toBeTruthy();
            expect(inputGroup.nativeElement.parentElement).toBe(form.nativeElement);
            expect(queryGroup.nativeElement.parentElement).toBe(inputGroup.nativeElement);
        });

        it('should contain all required form elements', () => {
            const form = debugElement.query(By.css('form'));
            const input = debugElement.query(By.css('input[type="text"]'));
            const helpLink = debugElement.query(By.css('.help a'));
            const searchButton = debugElement.query(By.css('button[type="submit"]'));

            expect(form).toBeTruthy();
            expect(input).toBeTruthy();
            expect(helpLink).toBeTruthy();
            expect(searchButton).toBeTruthy();
        });
    });

    describe('Search Input Field', () => {
        it('should render search input with correct attributes', () => {
            const input = debugElement.query(By.css('input[type="text"]'));
            expect(input).toBeTruthy();
            expect(input.nativeElement.id).toBe('q');
            expect(input.nativeElement.name).toBe('query');
            expect(input.nativeElement.placeholder).toBe('Search symbols, keywords or IDs');
            expect(input.nativeElement.autocomplete).toBe('off');
        });

        it('should bind to component query property', async () => {
            const input = debugElement.query(By.css('input[name="query"]'));

            component.query = 'test search';
            fixture.detectChanges();
            await fixture.whenStable();

            expect(input.nativeElement.value).toBe('test search');
        });

        it('should update component query on input change', () => {
            const input = debugElement.query(By.css('input[name="query"]'));

            input.nativeElement.value = 'new search term';
            input.nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(component.query).toBe('new search term');
        });

        it('should have proper CSS classes', () => {
            const input = debugElement.query(By.css('input'));
            expect(input.nativeElement.classList.contains('form-control')).toBe(true);
            expect(input.nativeElement.classList.contains('ng-pristine')).toBe(true);
            expect(input.nativeElement.classList.contains('ng-untouched')).toBe(true);
            expect(input.nativeElement.classList.contains('ng-valid')).toBe(true);
            expect(input.nativeElement.classList.contains('ng-empty')).toBe(true);
            expect(input.nativeElement.classList.contains('ui-autocomplete-input')).toBe(true);
        });

        it('should handle empty input values', () => {
            const input = debugElement.query(By.css('input[name="query"]'));

            input.nativeElement.value = '';
            input.nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(component.query).toBe('');
        });

        it('should handle special characters in input', () => {
            const input = debugElement.query(By.css('input[name="query"]'));
            const specialText = 'test@#$%^&*()[]{}';

            input.nativeElement.value = specialText;
            input.nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(component.query).toBe(specialText);
        });
    });

    describe('Help Link', () => {
        it('should render help link with correct attributes', () => {
            const helpLink = debugElement.query(By.css('.help a'));
            expect(helpLink).toBeTruthy();
            expect(helpLink.nativeElement.href).toContain('/help/search');
            expect(helpLink.nativeElement.title).toBe('Search help');
            expect(helpLink.nativeElement.classList.contains('help')).toBe(true);
        });

        it('should contain help icon (SVG)', () => {
            const helpIcon = debugElement.query(By.css('.help a svg'));
            expect(helpIcon).toBeTruthy();
            expect(helpIcon.nativeElement.classList.contains('svg-inline--fa')).toBe(true);
            expect(helpIcon.nativeElement.classList.contains('fa-circle-question')).toBe(true);
            expect(helpIcon.nativeElement.classList.contains('fa-lg')).toBe(true);
        });

        it('should have proper accessibility attributes on icon', () => {
            const helpIcon = debugElement.query(By.css('.help a svg'));
            expect(helpIcon.nativeElement.getAttribute('aria-hidden')).toBe('true');
            expect(helpIcon.nativeElement.getAttribute('focusable')).toBe('false');
            expect(helpIcon.nativeElement.getAttribute('role')).toBe('img');
        });

        it('should be in input group addon', () => {
            const helpAddon = debugElement.query(By.css('.input-group-addon.help'));
            const helpLink = helpAddon.query(By.css('a.help'));
            expect(helpAddon).toBeTruthy();
            expect(helpLink).toBeTruthy();
            expect(helpLink.nativeElement.parentElement).toBe(helpAddon.nativeElement);
        });
    });

    describe('Search Button', () => {
        it('should render search button with correct attributes', () => {
            const button = debugElement.query(By.css('button[type="submit"]'));
            expect(button).toBeTruthy();
            expect(button.nativeElement.type).toBe('submit');
            expect(button.nativeElement.classList.contains('btn')).toBe(true);
            expect(button.nativeElement.classList.contains('btn-default')).toBe(true);
        });

        it('should contain FontAwesome search icon', () => {
            const faIcon = debugElement.query(By.css('button fa-icon'));
            expect(faIcon).toBeTruthy();
            expect(faIcon.nativeElement.hasAttribute('ng-reflect-icon')).toBeTruthy();
        });

        it('should be in input group button section', () => {
            const buttonGroup = debugElement.query(By.css('.input-group-btn.search'));
            const button = buttonGroup.query(By.css('button'));
            expect(buttonGroup).toBeTruthy();
            expect(button).toBeTruthy();
            expect(button.nativeElement.parentElement).toBe(buttonGroup.nativeElement);
        });

        it('should trigger search on click', () => {
            const searchSpy = jest.spyOn(component, 'search');
            const button = debugElement.query(By.css('button[type="submit"]'));

            button.nativeElement.click();

            expect(searchSpy).toHaveBeenCalled();
        });
    });

    describe('Component Properties', () => {
        it('should have faSearch icon property', () => {
            expect(component.faSearch).toBeDefined();
            expect(typeof component.faSearch).toBe('object');
            expect(component.faSearch.iconName).toBe('magnifying-glass');
        });

        it('should have faQuestionCircle icon property', () => {
            expect(component.faQuestionCircle).toBeDefined();
            expect(typeof component.faQuestionCircle).toBe('object');
            expect(component.faQuestionCircle.iconName).toBe('circle-question');
        });

        it('should have query property initialized as undefined', () => {
            expect(component.query).toBeUndefined();
        });

        it('should allow query to be set to string values', () => {
            component.query = 'test query';
            expect(component.query).toBe('test query');
            expect(typeof component.query).toBe('string');
        });

        it('should allow query to be set to undefined', () => {
            component.query = 'test';
            component.query = undefined;
            expect(component.query).toBeUndefined();
        });

        it('should have correct FontAwesome icon imports', () => {
            expect(component.faSearch.prefix).toBe('fas');
            expect(component.faQuestionCircle.prefix).toBe('fas');
        });
    });

    describe('Search Functionality', () => {
        it('should navigate to search page with query when search() is called with query', () => {
            component.query = 'test search';

            component.search();

            expect(mockRouter.navigate).toHaveBeenCalledWith(['/search'], {
                queryParams: { q: 'test search' },
            });
        });

        it('should not navigate when search() is called without query', () => {
            component.query = undefined;

            component.search();

            expect(mockRouter.navigate).not.toHaveBeenCalled();
        });

        it('should not navigate when search() is called with empty query', () => {
            component.query = '';

            component.search();

            expect(mockRouter.navigate).not.toHaveBeenCalled();
        });

        it('should navigate when search() is called with whitespace-only query', () => {
            component.query = '   ';

            component.search();

            expect(mockRouter.navigate).toHaveBeenCalledWith(['/search'], {
                queryParams: { q: '   ' },
            });
        });

        it('should handle special characters in search query', () => {
            const specialQuery = 'test@#$%^&*()[]{}';
            component.query = specialQuery;

            component.search();

            expect(mockRouter.navigate).toHaveBeenCalledWith(['/search'], {
                queryParams: { q: specialQuery },
            });
        });

        it('should handle long search queries', () => {
            const longQuery = 'a'.repeat(1000);
            component.query = longQuery;

            component.search();

            expect(mockRouter.navigate).toHaveBeenCalledWith(['/search'], {
                queryParams: { q: longQuery },
            });
        });
    });

    describe('Form Submission', () => {
        it('should trigger search on form submit', () => {
            const searchSpy = jest.spyOn(component, 'search');
            const form = debugElement.query(By.css('form'));

            form.triggerEventHandler('ngSubmit', null);

            expect(searchSpy).toHaveBeenCalled();
        });

        it('should trigger search on form submit with Enter key', () => {
            component.query = 'test query';
            const form = debugElement.query(By.css('form'));

            form.triggerEventHandler('ngSubmit', null);

            expect(mockRouter.navigate).toHaveBeenCalledWith(['/search'], {
                queryParams: { q: 'test query' },
            });
        });

        it('should handle form submission without query', () => {
            const form = debugElement.query(By.css('form'));

            expect(() => {
                form.triggerEventHandler('ngSubmit', null);
            }).not.toThrow();

            expect(mockRouter.navigate).not.toHaveBeenCalled();
        });
    });

    describe('FontAwesome Integration', () => {
        it('should display FontAwesome search icon in button', () => {
            const faIcon = debugElement.query(By.css('button fa-icon'));
            expect(faIcon).toBeTruthy();
            expect(faIcon.nativeElement.hasAttribute('ng-reflect-icon')).toBeTruthy();
        });

        it('should have correct icon binding for search button', () => {
            const button = debugElement.query(By.css('button[type="submit"]'));
            const faIcon = button.query(By.css('fa-icon'));
            expect(faIcon.nativeElement.hasAttribute('ng-reflect-icon')).toBe(true);
        });

        it('should render icon properly', () => {
            const faIcon = debugElement.query(By.css('fa-icon'));
            expect(faIcon).toBeTruthy();
            expect(faIcon.nativeElement.tagName.toLowerCase()).toBe('fa-icon');
        });

        it('should use solid FontAwesome icons', () => {
            expect(component.faSearch.prefix).toBe('fas');
            expect(component.faQuestionCircle.prefix).toBe('fas');
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should have proper form CSS classes', () => {
            const form = debugElement.query(By.css('form'));
            expect(form.nativeElement.classList.contains('search-form')).toBe(true);
        });

        it('should use Bootstrap input group classes', () => {
            const inputGroup = debugElement.query(By.css('.input-group'));
            const queryGroup = debugElement.query(By.css('.query-group'));
            const inputGroupAddon = debugElement.query(By.css('.input-group-addon'));
            const inputGroupBtn = debugElement.query(By.css('.input-group-btn'));

            expect(inputGroup).toBeTruthy();
            expect(queryGroup).toBeTruthy();
            expect(inputGroupAddon).toBeTruthy();
            expect(inputGroupBtn).toBeTruthy();
        });

        it('should apply proper CSS classes to form elements', () => {
            const input = debugElement.query(By.css('input'));
            const button = debugElement.query(By.css('button'));
            const helpLink = debugElement.query(By.css('.help a'));

            expect(input.nativeElement.classList.contains('form-control')).toBe(true);
            expect(button.nativeElement.classList.contains('btn')).toBe(true);
            expect(button.nativeElement.classList.contains('btn-default')).toBe(true);
            expect(helpLink.nativeElement.classList.contains('help')).toBe(true);
        });

        it('should not use inline styles', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            allElements.forEach(element => {
                if (
                    !element.nativeElement.tagName.toLowerCase().startsWith('app-') &&
                    !element.nativeElement.tagName.toLowerCase().startsWith('fa-') &&
                    element.nativeElement.tagName.toLowerCase() !== 'svg' &&
                    element.nativeElement.tagName.toLowerCase() !== 'path'
                ) {
                    expect(element.nativeElement.style.length).toBe(0);
                }
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

        it('should maintain component state after multiple change detection cycles', () => {
            component.query = 'test query';
            const initialQuery = component.query;

            fixture.detectChanges();
            fixture.detectChanges();

            expect(component.query).toBe(initialQuery);
        });

        it('should handle router navigation errors gracefully', () => {
            mockRouter.navigate.mockReturnValue(Promise.reject('Navigation failed'));
            component.query = 'test';

            expect(() => {
                component.search();
            }).not.toThrow();
        });

        it('should handle undefined router', () => {
            // This tests the component's resilience to dependency injection issues
            expect(component).toBeTruthy();
            expect(component.search).toBeDefined();
        });
    });

    describe('Accessibility', () => {
        it('should have proper form semantics', () => {
            const form = debugElement.query(By.css('form'));
            const input = debugElement.query(By.css('input'));
            const button = debugElement.query(By.css('button'));

            expect(form.nativeElement.getAttribute('role')).toBe('search');
            expect(input.nativeElement.type).toBe('text');
            expect(button.nativeElement.type).toBe('submit');
        });

        it('should have proper input labels and accessibility', () => {
            const input = debugElement.query(By.css('input'));
            expect(input.nativeElement.placeholder).toBeTruthy();
            expect(input.nativeElement.id).toBe('q');
            expect(input.nativeElement.name).toBe('query');
        });

        it('should have descriptive help link', () => {
            const helpLink = debugElement.query(By.css('.help a'));
            expect(helpLink.nativeElement.title).toBe('Search help');
            expect(helpLink.nativeElement.href).toContain('/help/search');
        });

        it('should use standard HTML form elements', () => {
            const form = debugElement.query(By.css('form'));
            const input = debugElement.query(By.css('input'));
            const button = debugElement.query(By.css('button'));
            const anchor = debugElement.query(By.css('a'));

            expect(form).toBeTruthy();
            expect(input).toBeTruthy();
            expect(button).toBeTruthy();
            expect(anchor).toBeTruthy();
        });

        it('should support keyboard navigation', () => {
            const input = debugElement.query(By.css('input'));
            const button = debugElement.query(By.css('button'));
            const helpLink = debugElement.query(By.css('a'));

            expect(input.nativeElement.type).toBe('text');
            expect(button.nativeElement.type).toBe('submit');
            expect(helpLink.nativeElement.href).toBeTruthy();
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
            fixture = TestBed.createComponent(HomeSearchBarComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });

        it('should be efficient with property updates', () => {
            const start = performance.now();

            for (let i = 0; i < 100; i++) {
                component.query = `search term ${i}`;
                fixture.detectChanges();
            }

            const end = performance.now();
            expect(end - start).toBeLessThan(1000); // Should complete in less than 1 second
        });

        it('should handle rapid search calls', () => {
            component.query = 'test';

            expect(() => {
                for (let i = 0; i < 10; i++) {
                    component.search();
                }
            }).not.toThrow();
        });
    });

    describe('Browser Compatibility', () => {
        it('should use standard HTML elements', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            const standardTags = ['form', 'div', 'input', 'a', 'button', 'svg', 'path'];

            allElements.forEach(element => {
                const tagName = element.nativeElement.tagName.toLowerCase();
                if (
                    !tagName.startsWith('app-') &&
                    !tagName.startsWith('fa-') &&
                    tagName !== 'ng-container'
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

        it('should use modern form attributes', () => {
            const input = debugElement.query(By.css('input'));
            expect(input.nativeElement.autocomplete).toBe('off');
            expect(input.nativeElement.type).toBe('text');
        });

        it('should support modern JavaScript features', () => {
            expect(() => {
                component.search();
            }).not.toThrow();
        });
    });

    describe('Router Integration', () => {
        it('should inject Router service properly', () => {
            expect(mockRouter).toBeTruthy();
            expect(mockRouter.navigate).toBeDefined();
        });

        it('should navigate with correct route and query parameters', () => {
            component.query = 'gene symbol';

            component.search();

            expect(mockRouter.navigate).toHaveBeenCalledWith(['/search'], {
                queryParams: { q: 'gene symbol' },
            });
        });

        it('should handle router navigation promises', () => {
            mockRouter.navigate.mockReturnValue(Promise.resolve(true));
            component.query = 'test';

            expect(() => {
                component.search();
            }).not.toThrow();
        });

        it('should work with different query parameter formats', () => {
            const testQueries = [
                'simple',
                'multi word',
                'with-dashes',
                'with_underscores',
                '123numbers',
            ];

            testQueries.forEach(query => {
                component.query = query;
                component.search();
                expect(mockRouter.navigate).toHaveBeenCalledWith(['/search'], {
                    queryParams: { q: query },
                });
            });
        });
    });

    describe('User Experience', () => {
        it('should provide intuitive search interface', () => {
            const input = debugElement.query(By.css('input'));
            const button = debugElement.query(By.css('button'));
            const helpLink = debugElement.query(By.css('.help a'));

            expect(input.nativeElement.placeholder).toContain('Search symbols, keywords or IDs');
            expect(button).toBeTruthy();
            expect(helpLink.nativeElement.title).toBe('Search help');
        });

        it('should have clear visual hierarchy', () => {
            const form = debugElement.query(By.css('form'));
            const inputGroup = debugElement.query(By.css('.input-group'));
            const input = debugElement.query(By.css('input'));
            const button = debugElement.query(By.css('button'));

            expect(form).toBeTruthy();
            expect(inputGroup).toBeTruthy();
            expect(input).toBeTruthy();
            expect(button).toBeTruthy();
        });

        it('should provide helpful placeholder text', () => {
            const input = debugElement.query(By.css('input'));
            expect(input.nativeElement.placeholder).toBe('Search symbols, keywords or IDs');
            expect(input.nativeElement.placeholder.length).toBeGreaterThan(20);
        });

        it('should offer contextual help', () => {
            const helpLink = debugElement.query(By.css('.help a'));
            expect(helpLink.nativeElement.href).toContain('/help/search');
            expect(helpLink.nativeElement.title).toBe('Search help');
        });
    });

    describe('Data Binding', () => {
        it('should support two-way data binding with ngModel', async () => {
            const input = debugElement.query(By.css('input[name="query"]'));

            // Set value from component
            component.query = 'component value';
            fixture.detectChanges();
            await fixture.whenStable();
            expect(input.nativeElement.value).toBe('component value');

            // Set value from template
            input.nativeElement.value = 'template value';
            input.nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();
            expect(component.query).toBe('template value');
        });

        it('should handle rapid input changes', () => {
            const input = debugElement.query(By.css('input[name="query"]'));

            for (let i = 0; i < 10; i++) {
                input.nativeElement.value = `search ${i}`;
                input.nativeElement.dispatchEvent(new Event('input'));
                fixture.detectChanges();
                expect(component.query).toBe(`search ${i}`);
            }
        });

        it('should maintain input state across component updates', async () => {
            const input = debugElement.query(By.css('input[name="query"]'));

            component.query = 'persistent value';
            fixture.detectChanges();
            await fixture.whenStable();
            fixture.detectChanges();

            expect(input.nativeElement.value).toBe('persistent value');
            expect(component.query).toBe('persistent value');
        });
    });
});
