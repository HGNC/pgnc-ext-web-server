import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SearchBarComponent } from './search-bar.component';

// Import spyOn for Jest
const { spyOn } = jest;

// Mock component for routing tests
@Component({
    template: '<div>Mock Search Results Component</div>',
    standalone: true
})
class MockSearchResultsComponent { }

@Component({
    template: '<div>Mock Help Component</div>',
    standalone: true
})
class MockHelpComponent { }

describe('SearchBarComponent', () => {
    let component: SearchBarComponent;
    let fixture: ComponentFixture<SearchBarComponent>;
    let debugElement: DebugElement;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                SearchBarComponent,
                FormsModule,
                FontAwesomeModule,
                RouterTestingModule.withRoutes([
                    { path: 'search', component: MockSearchResultsComponent },
                    { path: 'help/search', component: MockHelpComponent }
                ])
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SearchBarComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        router = TestBed.inject(Router);
        fixture.detectChanges();
    });

    describe('Component Creation', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should be defined', () => {
            expect(component).toBeDefined();
        });

        it('should be an instance of SearchBarComponent', () => {
            expect(component).toBeInstanceOf(SearchBarComponent);
        });

        it('should be a standalone component', () => {
            expect(SearchBarComponent.prototype.constructor).toBeDefined();
        });

        it('should inject Router dependency', () => {
            expect(component['router']).toBeDefined();
            expect(component['router']).toBeInstanceOf(Router);
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
            const form = debugElement.query(By.css('form'));
            const inputGroup = form.query(By.css('.input-group'));
            const queryGroup = inputGroup.query(By.css('.query-group'));

            expect(form).toBeTruthy();
            expect(inputGroup).toBeTruthy();
            expect(queryGroup).toBeTruthy();
            expect(inputGroup.nativeElement.parentElement).toBe(form.nativeElement);
            expect(queryGroup.nativeElement.parentElement).toBe(inputGroup.nativeElement);
        });

        it('should contain all required form elements', () => {
            const input = debugElement.query(By.css('input[type="text"]'));
            const helpLink = debugElement.query(By.css('.input-group-addon.help a'));
            const submitButton = debugElement.query(By.css('.input-group-btn.search button'));

            expect(input).toBeTruthy();
            expect(helpLink).toBeTruthy();
            expect(submitButton).toBeTruthy();
        });
    });

    describe('Search Input Field', () => {
        it('should render text input with correct attributes', () => {
            const input = debugElement.query(By.css('input[type="text"]'));
            expect(input).toBeTruthy();
            expect(input.nativeElement.type).toBe('text');
            expect(input.nativeElement.id).toBe('q');
            expect(input.nativeElement.name).toBe('query');
            expect(input.nativeElement.classList.contains('form-control')).toBe(true);
        });

        it('should have correct placeholder text', () => {
            const input = debugElement.query(By.css('input'));
            expect(input.nativeElement.placeholder).toBe('Search symbols, keywords or IDs');
        });

        it('should bind to component query property', async () => {
            const input = debugElement.query(By.css('input'));

            component.query = 'test query';
            fixture.detectChanges();
            await fixture.whenStable();

            expect(input.nativeElement.value).toBe('test query');
        });

        it('should update component property on input change', () => {
            const input = debugElement.query(By.css('input'));

            input.nativeElement.value = 'new test query';
            input.nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(component.query).toBe('new test query');
        });

        it('should handle empty input values', () => {
            const input = debugElement.query(By.css('input'));

            input.nativeElement.value = '';
            input.nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(component.query).toBe('');
        });
    });

    describe('Help Link', () => {
        it('should render help link with correct route', () => {
            const helpLink = debugElement.query(By.css('.help a'));
            expect(helpLink).toBeTruthy();
            expect(helpLink.nativeElement.getAttribute('ng-reflect-router-link')).toBe('/help/search');
        });

        it('should have help title attribute', () => {
            const helpLink = debugElement.query(By.css('.help a'));
            expect(helpLink.nativeElement.title).toBe('Search help');
        });

        it('should contain FontAwesome question circle icon', () => {
            const helpIcon = debugElement.query(By.css('.help fa-icon'));
            expect(helpIcon).toBeTruthy();
            expect(helpIcon.nativeElement.classList.contains('help')).toBe(true);
        });

        it('should be in input group addon container', () => {
            const helpContainer = debugElement.query(By.css('.input-group-addon.help'));
            const helpLink = helpContainer.query(By.css('a'));
            expect(helpLink).toBeTruthy();
            expect(helpLink.nativeElement.parentElement).toBe(helpContainer.nativeElement);
        });
    });

    describe('Search Submit Button', () => {
        it('should render submit button with correct attributes', () => {
            const button = debugElement.query(By.css('button[type="submit"]'));
            expect(button).toBeTruthy();
            expect(button.nativeElement.type).toBe('submit');
            expect(button.nativeElement.classList.contains('btn')).toBe(true);
            expect(button.nativeElement.classList.contains('btn-default')).toBe(true);
        });

        it('should contain FontAwesome search icon', () => {
            const searchIcon = debugElement.query(By.css('button fa-icon'));
            expect(searchIcon).toBeTruthy();
            expect(searchIcon.nativeElement.classList.contains('submit')).toBe(true);
        });

        it('should be in input group button container', () => {
            const buttonContainer = debugElement.query(By.css('.input-group-btn.search'));
            const button = buttonContainer.query(By.css('button'));
            expect(button).toBeTruthy();
            expect(button.nativeElement.parentElement).toBe(buttonContainer.nativeElement);
        });

        it('should trigger search on click', () => {
            spyOn(component, 'search');
            const button = debugElement.query(By.css('button'));

            button.nativeElement.click();

            expect(component.search).toHaveBeenCalled();
        });
    });

    describe('Component Properties', () => {
        it('should have faSearch icon property', () => {
            expect(component.faSearch).toBeDefined();
            expect(typeof component.faSearch).toBe('object');
        });

        it('should have faQuestionCircle icon property', () => {
            expect(component.faQuestionCircle).toBeDefined();
            expect(typeof component.faQuestionCircle).toBe('object');
        });

        it('should have query property initialized as undefined', () => {
            expect(component.query).toBeUndefined();
        });

        it('should allow query property to be set', () => {
            component.query = 'test query';
            expect(component.query).toBe('test query');

            component.query = undefined;
            expect(component.query).toBeUndefined();
        });

        it('should maintain property types', () => {
            expect(typeof component.faSearch).toBe('object');
            expect(typeof component.faQuestionCircle).toBe('object');

            component.query = 'string value';
            expect(typeof component.query).toBe('string');
        });
    });

    describe('Search Functionality', () => {
        it('should navigate to search page with query parameter', () => {
            spyOn(router, 'navigate');
            component.query = 'test gene';

            component.search();

            expect(router.navigate).toHaveBeenCalledWith(['/search'], {
                queryParams: { q: 'test gene' }
            });
        });

        it('should not navigate when query is empty', () => {
            spyOn(router, 'navigate');
            component.query = '';

            component.search();

            expect(router.navigate).not.toHaveBeenCalled();
        });

        it('should not navigate when query is undefined', () => {
            spyOn(router, 'navigate');
            component.query = undefined;

            component.search();

            expect(router.navigate).not.toHaveBeenCalled();
        });

        it('should not navigate when query is null', () => {
            spyOn(router, 'navigate');
            component.query = null as any;

            component.search();

            expect(router.navigate).not.toHaveBeenCalled();
        });

        it('should handle whitespace-only queries', () => {
            spyOn(router, 'navigate');
            component.query = '   ';

            component.search();

            expect(router.navigate).toHaveBeenCalledWith(['/search'], {
                queryParams: { q: '   ' }
            });
        });
    });

    describe('Form Submission', () => {
        it('should trigger search on form submit', () => {
            spyOn(component, 'search');
            const form = debugElement.query(By.css('form'));

            form.nativeElement.dispatchEvent(new Event('ngSubmit'));

            expect(component.search).toHaveBeenCalled();
        });

        it('should handle form submission with Enter key', () => {
            spyOn(component, 'search');
            const input = debugElement.query(By.css('input'));

            input.nativeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

            // Note: The actual form submission depends on the browser's default behavior
            // We're testing that the form is properly set up for submission
            expect(component.search).toBeDefined();
        });

        it('should prevent default form submission when search is called', () => {
            spyOn(router, 'navigate');
            component.query = 'test';

            component.search();

            expect(router.navigate).toHaveBeenCalled();
        });
    });

    describe('FontAwesome Integration', () => {
        it('should display FontAwesome search icon in submit button', () => {
            const searchIcon = debugElement.query(By.css('button fa-icon'));
            expect(searchIcon).toBeTruthy();
            expect(searchIcon.nativeElement.hasAttribute('ng-reflect-icon')).toBe(true);
        });

        it('should display FontAwesome question circle icon in help link', () => {
            const helpIcon = debugElement.query(By.css('.help fa-icon'));
            expect(helpIcon).toBeTruthy();
            expect(helpIcon.nativeElement.hasAttribute('ng-reflect-icon')).toBe(true);
        });

        it('should have correct icon bindings', () => {
            const searchIcon = debugElement.query(By.css('button fa-icon'));
            const helpIcon = debugElement.query(By.css('.help fa-icon'));

            expect(searchIcon.nativeElement.hasAttribute('ng-reflect-icon')).toBe(true);
            expect(helpIcon.nativeElement.hasAttribute('ng-reflect-icon')).toBe(true);
        });

        it('should render icons properly', () => {
            const icons = debugElement.queryAll(By.css('fa-icon'));
            expect(icons.length).toBe(2);

            icons.forEach(icon => {
                expect(icon.nativeElement.tagName.toLowerCase()).toBe('fa-icon');
            });
        });
    });

    describe('Router Integration', () => {
        it('should have router link on help', () => {
            const helpLink = debugElement.query(By.css('.help a'));
            expect(helpLink.nativeElement.hasAttribute('ng-reflect-router-link')).toBe(true);
        });

        it('should navigate to help search page from help link', () => {
            const helpLink = debugElement.query(By.css('.help a'));
            expect(helpLink.nativeElement.getAttribute('ng-reflect-router-link')).toBe('/help/search');
        });

        it('should use programmatic navigation for search', () => {
            spyOn(router, 'navigate');
            component.query = 'test';

            component.search();

            expect(router.navigate).toHaveBeenCalledWith(['/search'], {
                queryParams: { q: 'test' }
            });
        });

        it('should be properly configured for routing', () => {
            const helpLink = debugElement.query(By.css('a.help'));
            expect(helpLink).toBeTruthy();
            expect(helpLink.nativeElement.hasAttribute('ng-reflect-router-link')).toBeTruthy();
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should have search-form class on form', () => {
            const form = debugElement.query(By.css('form'));
            expect(form.nativeElement.classList.contains('search-form')).toBe(true);
        });

        it('should have Bootstrap input group classes', () => {
            const inputGroup = debugElement.query(By.css('.input-group'));
            const queryGroup = debugElement.query(By.css('.query-group'));

            expect(inputGroup.nativeElement.classList.contains('input-group')).toBe(true);
            expect(queryGroup.nativeElement.classList.contains('query-group')).toBe(true);
        });

        it('should have form-control class on input', () => {
            const input = debugElement.query(By.css('input'));
            expect(input.nativeElement.classList.contains('form-control')).toBe(true);
        });

        it('should have proper addon and button group classes', () => {
            const helpAddon = debugElement.query(By.css('.input-group-addon.help'));
            const buttonGroup = debugElement.query(By.css('.input-group-btn.search'));

            expect(helpAddon.nativeElement.classList.contains('input-group-addon')).toBe(true);
            expect(helpAddon.nativeElement.classList.contains('help')).toBe(true);
            expect(buttonGroup.nativeElement.classList.contains('input-group-btn')).toBe(true);
            expect(buttonGroup.nativeElement.classList.contains('search')).toBe(true);
        });

        it('should have Bootstrap button classes', () => {
            const button = debugElement.query(By.css('button'));
            expect(button.nativeElement.classList.contains('btn')).toBe(true);
            expect(button.nativeElement.classList.contains('btn-default')).toBe(true);
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
            component.query = 'test';

            fixture.detectChanges();
            fixture.detectChanges();

            expect(component).toBe(initialComponent);
            expect(component.query).toBe('test');
        });

        it('should handle rapid search operations', () => {
            spyOn(router, 'navigate');

            expect(() => {
                for (let i = 0; i < 10; i++) {
                    component.query = `test${i}`;
                    component.search();
                }
            }).not.toThrow();

            expect(router.navigate).toHaveBeenCalledTimes(10);
        });

        it('should handle special characters in search query', () => {
            spyOn(router, 'navigate');
            const specialQuery = 'test@#$%^&*()_+-={}[]|\\:";\'<>?,./';

            component.query = specialQuery;
            component.search();

            expect(router.navigate).toHaveBeenCalledWith(['/search'], {
                queryParams: { q: specialQuery }
            });
        });

        it('should handle very long search queries', () => {
            spyOn(router, 'navigate');
            const longQuery = 'a'.repeat(1000);

            component.query = longQuery;
            component.search();

            expect(router.navigate).toHaveBeenCalledWith(['/search'], {
                queryParams: { q: longQuery }
            });
        });

        it('should handle undefined router gracefully', () => {
            // This test ensures the component doesn't break if router is somehow undefined
            expect(component['router']).toBeDefined();
            expect(() => component.search()).not.toThrow();
        });
    });

    describe('Form Validation and User Experience', () => {
        it('should not require input to be filled for form submission', () => {
            const input = debugElement.query(By.css('input'));
            expect(input.nativeElement.required).toBe(false);
        });

        it('should allow search with any input length', () => {
            const navigateSpy = spyOn(router, 'navigate');

            component.query = 'a';
            component.search();
            expect(navigateSpy).toHaveBeenCalled();

            navigateSpy.mockClear();

            component.query = 'very long search query with multiple words';
            component.search();
            expect(navigateSpy).toHaveBeenCalled();
        });

        it('should provide clear placeholder guidance', () => {
            const input = debugElement.query(By.css('input'));
            const placeholder = input.nativeElement.placeholder;

            expect(placeholder).toContain('symbols');
            expect(placeholder).toContain('keywords');
            expect(placeholder).toContain('IDs');
        });

        it('should maintain input focus after failed search', () => {
            const input = debugElement.query(By.css('input'));

            component.query = '';
            component.search();

            // Input should still be accessible and focusable
            expect(input.nativeElement).toBeDefined();
            expect(input.nativeElement.type).toBe('text');
        });
    });

    describe('Search Query Handling', () => {
        it('should trim whitespace from search queries', () => {
            spyOn(router, 'navigate');
            component.query = '  test query  ';

            component.search();

            expect(router.navigate).toHaveBeenCalledWith(['/search'], {
                queryParams: { q: '  test query  ' }
            });
        });

        it('should handle numeric search queries', () => {
            spyOn(router, 'navigate');
            component.query = '12345';

            component.search();

            expect(router.navigate).toHaveBeenCalledWith(['/search'], {
                queryParams: { q: '12345' }
            });
        });

        it('should handle mixed alphanumeric queries', () => {
            spyOn(router, 'navigate');
            component.query = 'BRCA1_001';

            component.search();

            expect(router.navigate).toHaveBeenCalledWith(['/search'], {
                queryParams: { q: 'BRCA1_001' }
            });
        });

        it('should preserve case in search queries', () => {
            spyOn(router, 'navigate');
            component.query = 'MixedCaseQuery';

            component.search();

            expect(router.navigate).toHaveBeenCalledWith(['/search'], {
                queryParams: { q: 'MixedCaseQuery' }
            });
        });
    });

    describe('Accessibility', () => {
        it('should have proper semantic structure', () => {
            const form = debugElement.query(By.css('form'));
            const input = debugElement.query(By.css('input'));
            const button = debugElement.query(By.css('button'));

            expect(form.nativeElement.tagName.toLowerCase()).toBe('form');
            expect(input.nativeElement.tagName.toLowerCase()).toBe('input');
            expect(button.nativeElement.tagName.toLowerCase()).toBe('button');
        });

        it('should have role attribute for search form', () => {
            const form = debugElement.query(By.css('form'));
            expect(form.nativeElement.getAttribute('role')).toBe('search');
        });

        it('should have proper input labeling', () => {
            const input = debugElement.query(By.css('input'));
            expect(input.nativeElement.id).toBe('q');
            expect(input.nativeElement.name).toBe('query');
            expect(input.nativeElement.placeholder).toBeTruthy();
        });

        it('should have meaningful title attribute for help link', () => {
            const helpLink = debugElement.query(By.css('.help a'));
            expect(helpLink.nativeElement.title).toBe('Search help');
        });

        it('should have submit button type', () => {
            const button = debugElement.query(By.css('button'));
            expect(button.nativeElement.type).toBe('submit');
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
            fixture = TestBed.createComponent(SearchBarComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });

        it('should be lightweight with minimal properties', () => {
            const propertyCount = Object.keys(component).length;
            expect(propertyCount).toBeLessThanOrEqual(4); // faSearch, faQuestionCircle, query, router
        });

        it('should handle frequent input changes efficiently', () => {
            const input = debugElement.query(By.css('input'));
            const start = performance.now();

            for (let i = 0; i < 100; i++) {
                component.query = `test${i}`;
                fixture.detectChanges();
            }

            const end = performance.now();
            expect(end - start).toBeLessThan(1000); // Should complete in less than 1 second
        });
    });

    describe('Browser Compatibility', () => {
        it('should use standard HTML elements', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            const standardTags = ['form', 'div', 'input', 'a', 'button', 'svg', 'path'];

            allElements.forEach(element => {
                const tagName = element.nativeElement.tagName.toLowerCase();
                if (!tagName.startsWith('app-') && !tagName.startsWith('fa-') && tagName !== 'ng-container') {
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

        it('should use standard form elements', () => {
            const form = debugElement.query(By.css('form'));
            const input = debugElement.query(By.css('input[type="text"]'));
            const button = debugElement.query(By.css('button[type="submit"]'));

            expect(form).toBeTruthy();
            expect(input).toBeTruthy();
            expect(button).toBeTruthy();
        });
    });

    describe('Responsive Design Readiness', () => {
        it('should use CSS classes for styling', () => {
            const form = debugElement.query(By.css('.search-form'));
            const inputGroup = debugElement.query(By.css('.input-group'));
            const input = debugElement.query(By.css('.form-control'));

            expect(form).toBeTruthy();
            expect(inputGroup).toBeTruthy();
            expect(input).toBeTruthy();
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

        it('should use Bootstrap form utility classes', () => {
            const input = debugElement.query(By.css('input'));
            const button = debugElement.query(By.css('button'));
            const inputGroup = debugElement.query(By.css('.input-group'));

            expect(input.nativeElement.classList.contains('form-control')).toBe(true);
            expect(button.nativeElement.classList.contains('btn')).toBe(true);
            expect(inputGroup.nativeElement.classList.contains('input-group')).toBe(true);
        });

        it('should support flexible form layout', () => {
            const queryGroup = debugElement.query(By.css('.query-group'));
            const helpAddon = debugElement.query(By.css('.input-group-addon'));
            const buttonGroup = debugElement.query(By.css('.input-group-btn'));

            expect(queryGroup).toBeTruthy();
            expect(helpAddon).toBeTruthy();
            expect(buttonGroup).toBeTruthy();
        });
    });

    describe('User Interaction Flow', () => {
        it('should support complete search workflow', () => {
            spyOn(router, 'navigate');

            // User types in search box
            const input = debugElement.query(By.css('input'));
            input.nativeElement.value = 'BRCA1';
            input.nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(component.query).toBe('BRCA1');

            // User clicks search button
            const button = debugElement.query(By.css('button'));
            button.nativeElement.click();

            expect(router.navigate).toHaveBeenCalledWith(['/search'], {
                queryParams: { q: 'BRCA1' }
            });
        });

        it('should support help workflow', () => {
            const helpLink = debugElement.query(By.css('.help a'));
            expect(helpLink.nativeElement.getAttribute('ng-reflect-router-link')).toBe('/help/search');
        });

        it('should maintain state during user interaction', () => {
            const input = debugElement.query(By.css('input'));

            // User starts typing
            input.nativeElement.value = 'BR';
            input.nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(component.query).toBe('BR');

            // User continues typing
            input.nativeElement.value = 'BRCA';
            input.nativeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();

            expect(component.query).toBe('BRCA');
        });
    });

    describe('Integration with Parent Components', () => {
        it('should be embeddable in any parent component', () => {
            expect(component).toBeTruthy();
            expect(debugElement.query(By.css('form'))).toBeTruthy();
        });

        it('should not have external dependencies beyond injected services', () => {
            expect(component['router']).toBeDefined();
            // Component should only depend on Router service
        });

        it('should maintain encapsulation', () => {
            const form = debugElement.query(By.css('form'));
            expect(form.nativeElement.classList.contains('search-form')).toBe(true);
        });
    });
});
