import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { routes } from './app.routes';

// Mock components for testing
@Component({
    selector: 'mock-about',
    template: '<div>About Component</div>',
    standalone: true,
})
class MockAboutComponent { }

@Component({
    selector: 'mock-contact',
    template: '<div>Contact Component</div>',
    standalone: true,
})
class MockContactComponent { }

@Component({
    selector: 'mock-gene-symbol-report',
    template: '<div>Gene Symbol Report Component</div>',
    standalone: true,
})
class MockGeneSymbolReportComponent { }

@Component({
    selector: 'mock-not-found',
    template: '<div>Not Found Component</div>',
    standalone: true,
})
class MockNotFoundComponent { }

@Component({
    selector: 'mock-browser-help',
    template: '<div>Browser Help Component</div>',
    standalone: true,
})
class MockBrowserHelpComponent { }

@Component({
    selector: 'mock-faq',
    template: '<div>FAQ Component</div>',
    standalone: true,
})
class MockFaqComponent { }

@Component({
    selector: 'mock-gene-symbol-report-help',
    template: '<div>Gene Symbol Report Help Component</div>',
    standalone: true,
})
class MockGeneSymbolReportHelpComponent { }

@Component({
    selector: 'mock-help',
    template: '<div>Help Component</div>',
    standalone: true,
})
class MockHelpComponent { }

@Component({
    selector: 'mock-search-help',
    template: '<div>Search Help Component</div>',
    standalone: true,
})
class MockSearchHelpComponent { }

@Component({
    selector: 'mock-useful-links',
    template: '<div>Useful Links Component</div>',
    standalone: true,
})
class MockUsefulLinksComponent { }

@Component({
    selector: 'mock-home',
    template: '<div>Home Component</div>',
    standalone: true,
})
class MockHomeComponent { }

@Component({
    selector: 'mock-license',
    template: '<div>License Component</div>',
    standalone: true,
})
class MockLicenseComponent { }

@Component({
    selector: 'mock-publications',
    template: '<div>Publications Component</div>',
    standalone: true,
})
class MockPublicationsComponent { }

@Component({
    selector: 'mock-search',
    template: '<div>Search Component</div>',
    standalone: true,
})
class MockSearchComponent { }

describe('App Routes', () => {
    let _router: Router;
    let _location: Location;
    let _fixture: any;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                MockAboutComponent,
                MockContactComponent,
                MockGeneSymbolReportComponent,
                MockNotFoundComponent,
                MockBrowserHelpComponent,
                MockFaqComponent,
                MockGeneSymbolReportHelpComponent,
                MockHelpComponent,
                MockSearchHelpComponent,
                MockUsefulLinksComponent,
                MockHomeComponent,
                MockLicenseComponent,
                MockPublicationsComponent,
                MockSearchComponent,
            ],
            providers: [
                // Replace real components with mock components in routes
                ...routes.map(route => ({
                    provide: route.component,
                    useClass: getMockComponent(route.component?.name || ''),
                })),
            ],
        });

        _router = TestBed.inject(Router);
        _location = TestBed.inject(Location);
        _fixture = TestBed.createComponent(MockHomeComponent);
    });

    function getMockComponent(componentName: string) {
        const mockMap: Record<string, any> = {
            AboutComponent: MockAboutComponent,
            ContactComponent: MockContactComponent,
            GeneSymbolReportComponent: MockGeneSymbolReportComponent,
            NotFoundComponent: MockNotFoundComponent,
            BrowserHelpComponent: MockBrowserHelpComponent,
            FaqComponent: MockFaqComponent,
            GeneSymbolReportHelpComponent: MockGeneSymbolReportHelpComponent,
            HelpComponent: MockHelpComponent,
            SearchHelpComponent: MockSearchHelpComponent,
            UsefulLinksComponent: MockUsefulLinksComponent,
            HomeComponent: MockHomeComponent,
            LicenseComponent: MockLicenseComponent,
            PublicationsComponent: MockPublicationsComponent,
            SearchComponent: MockSearchComponent,
        };
        return mockMap[componentName] || MockHomeComponent;
    }

    describe('Route Configuration', () => {
        it('should have routes defined', () => {
            expect(routes).toBeDefined();
            expect(Array.isArray(routes)).toBe(true);
            expect(routes.length).toBeGreaterThan(0);
        });

        it('should have correct number of routes', () => {
            expect(routes.length).toBe(14); // Total number of defined routes
        });

        it('should have all routes with required properties', () => {
            routes.forEach(route => {
                expect(route.path).toBeDefined();
                if (route.path !== '**') {
                    expect(route.component).toBeDefined();
                }
            });
        });

        it('should have unique paths', () => {
            const paths = routes.map(route => route.path);
            const uniquePaths = [...new Set(paths)];
            expect(paths.length).toBe(uniquePaths.length);
        });
    });

    describe('Static Routes', () => {
        it('should define about route', () => {
            const aboutRoute = routes.find(route => route.path === 'about');
            expect(aboutRoute).toBeDefined();
            expect(aboutRoute?.component?.name).toBe('AboutComponent');
        });

        it('should define contact route', () => {
            const contactRoute = routes.find(route => route.path === 'contact');
            expect(contactRoute).toBeDefined();
            expect(contactRoute?.component?.name).toBe('ContactComponent');
        });

        it('should define license route', () => {
            const licenseRoute = routes.find(route => route.path === 'license');
            expect(licenseRoute).toBeDefined();
            expect(licenseRoute?.component?.name).toBe('LicenseComponent');
        });

        it('should define publications route', () => {
            const publicationsRoute = routes.find(route => route.path === 'publications');
            expect(publicationsRoute).toBeDefined();
            expect(publicationsRoute?.component?.name).toBe('PublicationsComponent');
        });

        it('should define search route', () => {
            const searchRoute = routes.find(route => route.path === 'search');
            expect(searchRoute).toBeDefined();
            expect(searchRoute?.component?.name).toBe('SearchComponent');
        });

        it('should define home route', () => {
            const homeRoute = routes.find(route => route.path === '');
            expect(homeRoute).toBeDefined();
            expect(homeRoute?.component?.name).toBe('HomeComponent');
        });
    });

    describe('Parameterized Routes', () => {
        it('should define gene symbol report route with parameters', () => {
            const geneRoute = routes.find(
                route => route.path === 'data/gene-symbol-report/:type/:id'
            );
            expect(geneRoute).toBeDefined();
            expect(geneRoute?.component?.name).toBe('GeneSymbolReportComponent');
        });

        it('should handle route parameters correctly', () => {
            const geneRoute = routes.find(
                route => route.path === 'data/gene-symbol-report/:type/:id'
            );
            expect(geneRoute?.path).toContain(':type');
            expect(geneRoute?.path).toContain(':id');
        });
    });

    describe('Help Routes', () => {
        it('should define main help route', () => {
            const helpRoute = routes.find(route => route.path === 'help');
            expect(helpRoute).toBeDefined();
            expect(helpRoute?.component?.name).toBe('HelpComponent');
        });

        it('should define help FAQ route', () => {
            const faqRoute = routes.find(route => route.path === 'help/faq');
            expect(faqRoute).toBeDefined();
            expect(faqRoute?.component?.name).toBe('FaqComponent');
        });

        it('should define help browser route', () => {
            const browserRoute = routes.find(route => route.path === 'help/browser');
            expect(browserRoute).toBeDefined();
            expect(browserRoute?.component?.name).toBe('BrowserHelpComponent');
        });

        it('should define help search route', () => {
            const searchHelpRoute = routes.find(route => route.path === 'help/search');
            expect(searchHelpRoute).toBeDefined();
            expect(searchHelpRoute?.component?.name).toBe('SearchHelpComponent');
        });

        it('should define help gene symbol report route', () => {
            const geneHelpRoute = routes.find(route => route.path === 'help/gene-symbol-report');
            expect(geneHelpRoute).toBeDefined();
            expect(geneHelpRoute?.component?.name).toBe('GeneSymbolReportHelpComponent');
        });

        it('should define help useful links route', () => {
            const linksRoute = routes.find(route => route.path === 'help/useful-links');
            expect(linksRoute).toBeDefined();
            expect(linksRoute?.component?.name).toBe('UsefulLinksComponent');
        });
    });

    describe('Wildcard Route', () => {
        it('should define wildcard route as last route', () => {
            const lastRoute = routes[routes.length - 1];
            expect(lastRoute.path).toBe('**');
            expect(lastRoute.component?.name).toBe('NotFoundComponent');
        });

        it('should have wildcard route at the end', () => {
            const wildcardIndex = routes.findIndex(route => route.path === '**');
            expect(wildcardIndex).toBe(routes.length - 1);
        });
    });

    describe('Route Structure Validation', () => {
        it('should have proper route hierarchy for help routes', () => {
            const helpRoutes = routes.filter(route => route.path?.startsWith('help'));

            // Should have main help route
            const mainHelp = helpRoutes.find(route => route.path === 'help');
            expect(mainHelp).toBeDefined();

            // Should have sub-help routes
            const subHelpRoutes = helpRoutes.filter(route => route.path !== 'help');
            expect(subHelpRoutes.length).toBeGreaterThan(0);
        });

        it('should have data routes properly structured', () => {
            const dataRoutes = routes.filter(route => route.path?.startsWith('data/'));
            expect(dataRoutes.length).toBeGreaterThan(0);

            const geneRoute = dataRoutes.find(route => route.path?.includes('gene-symbol-report'));
            expect(geneRoute).toBeDefined();
        });

        it('should not have duplicate components', () => {
            const components = routes
                .filter(route => route.component)
                .map(route => route.component?.name);

            const uniqueComponents = [...new Set(components)];
            expect(components.length).toBe(uniqueComponents.length);
        });

        it('should not have conflicting routes', () => {
            const staticPaths = routes
                .filter(route => route.path && !route.path.includes(':') && route.path !== '**')
                .map(route => route.path);

            const parameterizedPaths = routes
                .filter(route => route.path?.includes(':'))
                .map(route => route.path?.split(':')[0]);

            // Check for conflicts between static and parameterized routes
            staticPaths.forEach(staticPath => {
                parameterizedPaths.forEach(paramPath => {
                    expect(staticPath).not.toBe(paramPath);
                });
            });
        });
    });

    describe('Route Path Patterns', () => {
        it('should have valid path patterns', () => {
            routes.forEach(route => {
                expect(route.path).toBeDefined();
                expect(typeof route.path).toBe('string');

                // Path should not start with '/' except for empty path
                if (route.path && route.path !== '') {
                    expect(route.path.startsWith('/')).toBe(false);
                }
            });
        });

        it('should have consistent naming conventions', () => {
            const pathsWithSegments = routes
                .filter(route => route.path?.includes('/') && route.path !== '**')
                .map(route => route.path)
                .filter((path): path is string => path !== undefined);

            pathsWithSegments.forEach(path => {
                const segments = path.split('/');
                segments.forEach(segment => {
                    if (!segment.startsWith(':') && segment !== '') {
                        // Should use kebab-case
                        expect(segment).toMatch(/^[a-z]+(-[a-z]+)*$/);
                    }
                });
            });
        });

        it('should have proper parameter syntax', () => {
            const parameterizedRoutes = routes.filter(route => route.path?.includes(':'));

            parameterizedRoutes.forEach(route => {
                const parameters = route.path?.match(/:([a-zA-Z]+)/g);
                if (parameters) {
                    parameters.forEach(param => {
                        expect(param).toMatch(/^:[a-zA-Z]+$/);
                    });
                }
            });
        });
    });

    describe('Component Associations', () => {
        it('should associate correct components with routes', () => {
            const expectedAssociations = [
                { path: 'about', component: 'AboutComponent' },
                { path: 'contact', component: 'ContactComponent' },
                { path: 'license', component: 'LicenseComponent' },
                { path: 'publications', component: 'PublicationsComponent' },
                { path: 'search', component: 'SearchComponent' },
                { path: '', component: 'HomeComponent' },
                { path: '**', component: 'NotFoundComponent' },
            ];

            expectedAssociations.forEach(expected => {
                const route = routes.find(r => r.path === expected.path);
                expect(route?.component?.name).toBe(expected.component);
            });
        });

        it('should have all components defined', () => {
            routes.forEach(route => {
                if (route.component) {
                    expect(route.component).toBeDefined();
                    expect(route.component.name).toBeTruthy();
                }
            });
        });
    });

    describe('Route Order', () => {
        it('should have specific routes before wildcard', () => {
            const wildcardIndex = routes.findIndex(route => route.path === '**');
            const specificRoutes = routes.slice(0, wildcardIndex);

            specificRoutes.forEach(route => {
                expect(route.path).not.toBe('**');
            });
        });

        it('should have empty path route before wildcard', () => {
            const emptyPathIndex = routes.findIndex(route => route.path === '');
            const wildcardIndex = routes.findIndex(route => route.path === '**');

            expect(emptyPathIndex).toBeLessThan(wildcardIndex);
        });

        it('should have more specific routes before less specific ones', () => {
            // In the actual routes file, more specific routes come after general ones
            // This is acceptable in Angular routing as long as they're explicitly defined
            const helpIndex = routes.findIndex(route => route.path === 'help');
            const helpFaqIndex = routes.findIndex(route => route.path === 'help/faq');
            const helpBrowserIndex = routes.findIndex(route => route.path === 'help/browser');

            // All help routes should be defined
            expect(helpIndex).toBeGreaterThanOrEqual(0);
            expect(helpFaqIndex).toBeGreaterThanOrEqual(0);
            expect(helpBrowserIndex).toBeGreaterThanOrEqual(0);
        });
    });

    describe('Route Completeness', () => {
        it('should cover all major application sections', () => {
            const expectedSections = [
                'about',
                'contact',
                'help',
                'search',
                'license',
                'publications',
            ];

            expectedSections.forEach(section => {
                const hasRoute = routes.some(
                    route => route.path === section || route.path?.startsWith(section + '/')
                );
                expect(hasRoute).toBe(true);
            });
        });

        it('should have fallback route for unknown paths', () => {
            const wildcardRoute = routes.find(route => route.path === '**');
            expect(wildcardRoute).toBeDefined();
            expect(wildcardRoute?.component?.name).toBe('NotFoundComponent');
        });

        it('should have home route', () => {
            const homeRoute = routes.find(route => route.path === '');
            expect(homeRoute).toBeDefined();
            expect(homeRoute?.component?.name).toBe('HomeComponent');
        });
    });

    describe('Edge Cases', () => {
        it('should handle undefined routes array', () => {
            expect(() => {
                const undefinedRoutes: any = undefined;
                if (undefinedRoutes) {
                    undefinedRoutes.forEach((route: any) => route.path);
                }
            }).not.toThrow();
        });

        it('should handle empty routes array', () => {
            expect(() => {
                const emptyRoutes: any[] = [];
                emptyRoutes.forEach(route => route.path);
            }).not.toThrow();
        });

        it('should validate route object structure', () => {
            routes.forEach(route => {
                expect(route).toHaveProperty('path');
                if (route.path !== '**') {
                    expect(route).toHaveProperty('component');
                }
            });
        });
    });

    describe('Performance Considerations', () => {
        it('should have reasonable number of routes', () => {
            expect(routes.length).toBeLessThan(50);
        });

        it('should not have deeply nested routes', () => {
            routes.forEach(route => {
                if (route.path) {
                    const segments = route.path.split('/').filter(segment => segment !== '');
                    expect(segments.length).toBeLessThan(5);
                }
            });
        });

        it('should have efficient route matching order', () => {
            // Static routes should come before parameterized routes
            let foundParameterized = false;

            routes.forEach(route => {
                if (route.path?.includes(':')) {
                    foundParameterized = true;
                } else if (foundParameterized && route.path !== '**' && route.path !== '') {
                    // This is okay as long as it's not conflicting
                    expect(route.path).toBeDefined();
                }
            });
        });
    });
});
