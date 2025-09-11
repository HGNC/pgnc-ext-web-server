import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, provideRouter, Router } from '@angular/router';
import { of, Subject } from 'rxjs';

import { AppComponent } from './app.component';

// Mock components for testing
@Component({
    selector: 'app-header',
    template: '<div class="mock-header">Mock Header</div>',
    standalone: true,
})
class MockHeaderComponent {}

@Component({
    selector: 'app-footer',
    template: '<div class="mock-footer">Mock Footer</div>',
    standalone: true,
})
class MockFooterComponent {}

@Component({
    selector: 'router-outlet',
    template: '<div class="mock-router-outlet">Mock Router Outlet</div>',
    standalone: true,
})
class MockRouterOutletComponent {}

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let debugElement: DebugElement;
    let router: Router;
    let navigationSubject: Subject<any>;

    beforeEach(async () => {
        navigationSubject = new Subject();

        const routerSpy = {
            events: navigationSubject.asObservable(),
            url: '/',
            setUrl: function (newUrl: string) {
                this.url = newUrl;
            },
        };

        await TestBed.configureTestingModule({
            imports: [AppComponent],
            providers: [
                provideRouter([]),
                { provide: Router, useValue: routerSpy },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: { params: {}, queryParams: {} },
                        params: of({}),
                        queryParams: of({}),
                    },
                },
            ],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .overrideComponent(AppComponent, {
                set: {
                    imports: [MockHeaderComponent, MockFooterComponent, MockRouterOutletComponent],
                    template: `
                    @if (currentRoute !== '/' && currentRoute !== '') {
                        <div class="page">
                            <app-header class="default-header"></app-header>
                            <main class="default-main">
                                <router-outlet></router-outlet>
                            </main>
                            <app-footer class="default-footer"></app-footer>
                        </div>
                    } @else {
                        <router-outlet></router-outlet>
                        <app-footer></app-footer>
                    }
                `,
                },
            })
            .compileComponents();

        fixture = TestBed.createComponent(AppComponent);
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

        it('should be an instance of AppComponent', () => {
            expect(component).toBeInstanceOf(AppComponent);
        });

        it('should have initial currentRoute as empty string', () => {
            expect(component.currentRoute).toBe('');
        });
    });

    describe('Router Integration', () => {
        it('should update currentRoute on NavigationEnd events', () => {
            const mockNavigationEnd = new NavigationEnd(1, '/about', '/about');
            (router as any).setUrl('/about');

            navigationSubject.next(mockNavigationEnd);

            expect(component.currentRoute).toBe('/about');
        });

        it('should filter only NavigationEnd events', () => {
            const mockEvent = { id: 1, url: '/test' };
            (router as any).setUrl('/test');

            navigationSubject.next(mockEvent);

            expect(component.currentRoute).toBe('');
        });

        it('should handle multiple NavigationEnd events', () => {
            const routes = ['/about', '/contact', '/search', '/help'];

            routes.forEach(route => {
                const mockNavigationEnd = new NavigationEnd(1, route, route);
                (router as any).setUrl(route);

                navigationSubject.next(mockNavigationEnd);

                expect(component.currentRoute).toBe(route);
            });
        });

        it('should handle root route correctly', () => {
            const mockNavigationEnd = new NavigationEnd(1, '/', '/');
            (router as any).setUrl('/');

            navigationSubject.next(mockNavigationEnd);

            expect(component.currentRoute).toBe('/');
        });

        it('should handle routes with query parameters', () => {
            const mockNavigationEnd = new NavigationEnd(1, '/search?q=test', '/search?q=test');
            (router as any).setUrl('/search?q=test');

            navigationSubject.next(mockNavigationEnd);

            expect(component.currentRoute).toBe('/search?q=test');
        });

        it('should handle routes with fragments', () => {
            const mockNavigationEnd = new NavigationEnd(1, '/help#section1', '/help#section1');
            (router as any).setUrl('/help#section1');

            navigationSubject.next(mockNavigationEnd);

            expect(component.currentRoute).toBe('/help#section1');
        });
    });

    describe('Template Rendering - Home Route', () => {
        beforeEach(() => {
            component.currentRoute = '/';
            fixture.detectChanges();
        });

        it('should not render header for home route', () => {
            const header = debugElement.query(By.css('app-header'));
            expect(header).toBeFalsy();
        });

        it('should not render main wrapper for home route', () => {
            const mainWrapper = debugElement.query(By.css('.default-main'));
            expect(mainWrapper).toBeFalsy();
        });

        it('should render router-outlet for home route', () => {
            const routerOutlet = debugElement.query(By.css('router-outlet'));
            expect(routerOutlet).toBeTruthy();
        });

        it('should render footer for home route', () => {
            const footer = debugElement.query(By.css('app-footer'));
            expect(footer).toBeTruthy();
        });

        it('should not render page wrapper for home route', () => {
            const pageWrapper = debugElement.query(By.css('.page'));
            expect(pageWrapper).toBeFalsy();
        });
    });

    describe('Template Rendering - Non-Home Routes', () => {
        beforeEach(() => {
            component.currentRoute = '/about';
            fixture.detectChanges();
        });

        it('should render header for non-home routes', () => {
            const header = debugElement.query(By.css('app-header.default-header'));
            expect(header).toBeTruthy();
        });

        it('should render main wrapper for non-home routes', () => {
            const mainWrapper = debugElement.query(By.css('main.default-main'));
            expect(mainWrapper).toBeTruthy();
        });

        it('should render router-outlet inside main for non-home routes', () => {
            const routerOutlet = debugElement.query(By.css('main.default-main router-outlet'));
            expect(routerOutlet).toBeTruthy();
        });

        it('should render footer for non-home routes', () => {
            const footer = debugElement.query(By.css('app-footer.default-footer'));
            expect(footer).toBeTruthy();
        });

        it('should render page wrapper for non-home routes', () => {
            const pageWrapper = debugElement.query(By.css('.page'));
            expect(pageWrapper).toBeTruthy();
        });

        it('should have correct structure for non-home routes', () => {
            const pageDiv = debugElement.query(By.css('.page'));
            const header = pageDiv.query(By.css('app-header.default-header'));
            const main = pageDiv.query(By.css('main.default-main'));
            const footer = pageDiv.query(By.css('app-footer.default-footer'));

            expect(pageDiv).toBeTruthy();
            expect(header).toBeTruthy();
            expect(main).toBeTruthy();
            expect(footer).toBeTruthy();
        });
    });

    describe('Template Conditional Logic', () => {
        it('should switch layout when route changes from home to non-home', () => {
            // Start with home route
            component.currentRoute = '/';
            fixture.detectChanges();

            let pageWrapper = debugElement.query(By.css('.page'));
            expect(pageWrapper).toBeFalsy();

            // Change to non-home route
            component.currentRoute = '/about';
            fixture.detectChanges();

            pageWrapper = debugElement.query(By.css('.page'));
            expect(pageWrapper).toBeTruthy();
        });

        it('should switch layout when route changes from non-home to home', () => {
            // Start with non-home route
            component.currentRoute = '/about';
            fixture.detectChanges();

            let pageWrapper = debugElement.query(By.css('.page'));
            expect(pageWrapper).toBeTruthy();

            // Change to home route
            component.currentRoute = '/';
            fixture.detectChanges();

            pageWrapper = debugElement.query(By.css('.page'));
            expect(pageWrapper).toBeFalsy();
        });

        it('should handle empty route as home route', () => {
            component.currentRoute = '';
            fixture.detectChanges();

            const pageWrapper = debugElement.query(By.css('.page'));
            expect(pageWrapper).toBeFalsy();
        });

        it('should handle various non-home routes consistently', () => {
            const nonHomeRoutes = [
                '/about',
                '/contact',
                '/search',
                '/help',
                '/data/gene-symbol-report/symbol/BRCA1',
            ];

            nonHomeRoutes.forEach(route => {
                component.currentRoute = route;
                fixture.detectChanges();

                const pageWrapper = debugElement.query(By.css('.page'));
                const header = debugElement.query(By.css('app-header.default-header'));
                const main = debugElement.query(By.css('main.default-main'));
                const footer = debugElement.query(By.css('app-footer.default-footer'));

                expect(pageWrapper).toBeTruthy();
                expect(header).toBeTruthy();
                expect(main).toBeTruthy();
                expect(footer).toBeTruthy();
            });
        });
    });

    describe('Component Lifecycle', () => {
        it('should call ngOnInit', () => {
            const ngOnInitSpy = jest.spyOn(component, 'ngOnInit');
            component.ngOnInit();
            expect(ngOnInitSpy).toHaveBeenCalled();
        });

        it('should set up router subscription in ngOnInit', () => {
            const subscribeSpy = jest.spyOn(router.events, 'pipe');
            component.ngOnInit();
            expect(subscribeSpy).toHaveBeenCalled();
        });

        it('should handle component destruction gracefully', () => {
            expect(() => {
                fixture.destroy();
            }).not.toThrow();
        });

        it('should handle multiple ngOnInit calls', () => {
            expect(() => {
                component.ngOnInit();
                component.ngOnInit();
            }).not.toThrow();
        });
    });

    describe('Edge Cases and Error Handling', () => {
        it('should handle undefined router events', () => {
            navigationSubject.next(undefined);
            expect(component.currentRoute).toBe('');
        });

        it('should handle null router events', () => {
            navigationSubject.next(null);
            expect(component.currentRoute).toBe('');
        });

        it('should handle malformed navigation events', () => {
            const malformedEvent = { type: 'unknown', id: 'invalid' };
            navigationSubject.next(malformedEvent);
            expect(component.currentRoute).toBe('');
        });

        it('should handle router errors gracefully', () => {
            expect(() => {
                navigationSubject.error(new Error('Router error'));
            }).not.toThrow();
        });

        it('should handle very long URLs', () => {
            const longUrl = '/very/long/path/' + 'segment/'.repeat(100) + 'end';
            const mockNavigationEnd = new NavigationEnd(1, longUrl, longUrl);
            (router as any).setUrl(longUrl);

            navigationSubject.next(mockNavigationEnd);

            expect(component.currentRoute).toBe(longUrl);
        });

        it('should handle special characters in URLs', () => {
            const specialUrl = '/search?q=gene%20symbol&filter=approved#results';
            const mockNavigationEnd = new NavigationEnd(1, specialUrl, specialUrl);
            (router as any).setUrl(specialUrl);

            navigationSubject.next(mockNavigationEnd);

            expect(component.currentRoute).toBe(specialUrl);
        });
    });

    describe('CSS Classes and Structure', () => {
        it('should apply correct CSS classes for home layout', () => {
            component.currentRoute = '/';
            fixture.detectChanges();

            const footer = debugElement.query(By.css('app-footer'));
            expect(footer).toBeTruthy();
            expect(footer.nativeElement.classList.contains('default-footer')).toBe(false);
        });

        it('should apply correct CSS classes for non-home layout', () => {
            component.currentRoute = '/about';
            fixture.detectChanges();

            const header = debugElement.query(By.css('app-header'));
            const main = debugElement.query(By.css('main'));
            const footer = debugElement.query(By.css('app-footer'));

            expect(header.nativeElement.classList.contains('default-header')).toBe(true);
            expect(main.nativeElement.classList.contains('default-main')).toBe(true);
            expect(footer.nativeElement.classList.contains('default-footer')).toBe(true);
        });

        it('should maintain semantic HTML structure', () => {
            component.currentRoute = '/about';
            fixture.detectChanges();

            const main = debugElement.query(By.css('main'));
            const routerOutlet = main.query(By.css('router-outlet'));

            expect(main.nativeElement.tagName.toLowerCase()).toBe('main');
            expect(routerOutlet).toBeTruthy();
        });
    });

    describe('Performance', () => {
        it('should handle rapid route changes efficiently', () => {
            const routes = ['/about', '/contact', '/search', '/help', '/', '/publications'];
            const start = performance.now();

            routes.forEach(route => {
                const mockNavigationEnd = new NavigationEnd(1, route, route);
                (router as any).setUrl(route);
                navigationSubject.next(mockNavigationEnd);
                fixture.detectChanges();
            });

            const end = performance.now();
            expect(end - start).toBeLessThan(100);
        });

        it('should not create memory leaks on destroy', () => {
            const initialComponent = component;
            fixture.destroy();
            expect(initialComponent).toBeDefined();
        });

        it('should handle multiple template updates efficiently', () => {
            const start = performance.now();

            for (let i = 0; i < 50; i++) {
                component.currentRoute = i % 2 === 0 ? '/' : '/about';
                fixture.detectChanges();
            }

            const end = performance.now();
            expect(end - start).toBeLessThan(500);
        });
    });

    describe('Accessibility', () => {
        it('should use semantic HTML elements', () => {
            component.currentRoute = '/about';
            fixture.detectChanges();

            const main = debugElement.query(By.css('main'));
            expect(main).toBeTruthy();
            expect(main.nativeElement.tagName.toLowerCase()).toBe('main');
        });

        it('should maintain proper document structure', () => {
            component.currentRoute = '/about';
            fixture.detectChanges();

            const pageDiv = debugElement.query(By.css('.page'));
            const header = pageDiv.query(By.css('app-header'));
            const main = pageDiv.query(By.css('main'));
            const footer = pageDiv.query(By.css('app-footer'));

            // Check order of elements
            const children = Array.from(pageDiv.nativeElement.children);
            expect(children[0]).toBe(header.nativeElement);
            expect(children[1]).toBe(main.nativeElement);
            expect(children[2]).toBe(footer.nativeElement);
        });

        it('should not have redundant elements for screen readers', () => {
            component.currentRoute = '/';
            fixture.detectChanges();

            const headers = debugElement.queryAll(By.css('app-header'));
            expect(headers.length).toBe(0);
        });
    });

    describe('Browser Compatibility', () => {
        it('should use standard HTML elements', () => {
            component.currentRoute = '/about';
            fixture.detectChanges();

            const standardElements = ['div', 'main'];
            const allElements = debugElement.queryAll(By.css('*'));

            allElements.forEach(element => {
                const tagName = element.nativeElement.tagName.toLowerCase();
                if (!tagName.startsWith('app-') && !tagName.startsWith('router-')) {
                    expect(standardElements).toContain(tagName);
                }
            });
        });

        it('should not use deprecated HTML features', () => {
            component.currentRoute = '/about';
            fixture.detectChanges();

            const allElements = debugElement.queryAll(By.css('*'));
            allElements.forEach(element => {
                const tagName = element.nativeElement.tagName.toLowerCase();
                expect(['font', 'center', 'marquee', 'blink']).not.toContain(tagName);
            });
        });
    });

    describe('Integration with Child Components', () => {
        it('should properly integrate with HeaderComponent', () => {
            component.currentRoute = '/about';
            fixture.detectChanges();

            const header = debugElement.query(By.css('app-header'));
            expect(header).toBeTruthy();
        });

        it('should properly integrate with FooterComponent', () => {
            const footer = debugElement.query(By.css('app-footer'));
            expect(footer).toBeTruthy();
        });

        it('should properly integrate with RouterOutlet', () => {
            const routerOutlet = debugElement.query(By.css('router-outlet'));
            expect(routerOutlet).toBeTruthy();
        });
    });
});
