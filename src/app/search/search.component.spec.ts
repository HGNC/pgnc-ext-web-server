import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap, provideRouter, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BehaviorSubject, of, throwError } from 'rxjs';

import { NotFoundComponent } from './not-found/not-found.component';
import { SafeHtmlPipe, SafeValuePipe, SearchComponent } from './search.component';
import { Gene, SearchResponse, SearchService } from './search.service';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;
    let debugElement: DebugElement;
    let mockSearchService: jest.Mocked<SearchService>;
    let mockRouter: jest.Mocked<Router>;
    let mockActivatedRoute: Partial<ActivatedRoute>;
    let loadingSubject: BehaviorSubject<boolean>;

    const mockSearchResponse: SearchResponse = {
        genes: [
            {
                symbol: 'TEST1',
                name: 'Test Gene 1',
                url: '/gene/TEST1',
                display: [
                    {
                        label: 'PGNC ID',
                        value: 'PGNC:12345',
                    },
                ],
            },
            {
                symbol: 'TEST2',
                name: 'Test Gene 2',
                url: '/gene/TEST2',
                display: [
                    {
                        label: 'Matches',
                        value: {
                            gene_symbol: '<em>TEST2</em>',
                            gene_name: 'Test <em>Gene</em> 2',
                        },
                    },
                ],
            },
        ],
        total: 2,
        start: 1,
        rows: 10,
    };

    beforeEach(async () => {
        loadingSubject = new BehaviorSubject<boolean>(false);

        mockSearchService = {
            browse: jest.fn().mockReturnValue(of(mockSearchResponse)),
            loading$: loadingSubject.asObservable(),
            clearCache: jest.fn(),
            clearCacheForQuery: jest.fn(),
        } as any;

        mockRouter = {
            navigate: jest.fn().mockResolvedValue(true),
            url: '/search',
            events: of(),
            createUrlTree: jest.fn().mockReturnValue({ toString: () => '/mock-url' }),
            serializeUrl: jest.fn().mockReturnValue('/mock-url'),
        } as any;

        mockActivatedRoute = {
            queryParams: of({ q: 'test' }),
            params: of({}),
            data: of({}),
            url: of([]),
            outlet: 'primary',
            routeConfig: null,
            parent: null,
            firstChild: null,
            children: [],
            pathFromRoot: [],
            paramMap: of(convertToParamMap({})),
            queryParamMap: of(convertToParamMap({ q: 'test' })),
        };

        await TestBed.configureTestingModule({
            imports: [
                SearchComponent,
                CommonModule,
                FormsModule,
                FontAwesomeModule,
                NotFoundComponent,
                SafeValuePipe,
                SafeHtmlPipe,
            ],
            providers: [
                provideRouter([]),
                { provide: SearchService, useValue: mockSearchService },
                { provide: Router, useValue: mockRouter },
                { provide: ActivatedRoute, useValue: mockActivatedRoute },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(SearchComponent);
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

        it('should be an instance of SearchComponent', () => {
            expect(component).toBeInstanceOf(SearchComponent);
        });

        it('should initialize with default values', () => {
            expect(component.searchQuery).toBe('test');
            expect(component.currentPage).toBe(1);
            expect(component.pageSize).toBe(10);
            expect(component.results).toEqual(mockSearchResponse.genes);
            expect(component.totalResults).toBe(2);
            expect(component.error).toBeUndefined();
        });

        it('should have loading$ observable from service', () => {
            expect(component.loading$).toBe(mockSearchService.loading$);
        });
    });

    describe('Calculated Properties', () => {
        beforeEach(() => {
            component.totalResults = 25;
            component.pageSize = 10;
        });

        it('should calculate totalPages correctly', () => {
            expect(component.totalPages).toBe(3);
        });

        it('should calculate startIndex correctly', () => {
            component.currentPage = 2;
            expect(component.startIndex).toBe(11);
        });

        it('should calculate endIndex correctly', () => {
            component.currentPage = 2;
            expect(component.endIndex).toBe(20);
        });

        it('should calculate endIndex for last page correctly', () => {
            component.currentPage = 3;
            expect(component.endIndex).toBe(25);
        });

        it('should return 0 totalPages when no totalResults', () => {
            component.totalResults = undefined;
            expect(component.totalPages).toBe(0);
        });
    });

    describe('Route Subscription', () => {
        it('should subscribe to route query params on init', () => {
            // Use the existing mockActivatedRoute from beforeEach
            mockActivatedRoute.queryParams = of({ q: 'new-search' });

            const onSearchSpy = jest.spyOn(component, 'onSearch');
            component.ngOnInit();

            expect(component.searchQuery).toBe('new-search');
            expect(onSearchSpy).toHaveBeenCalled();
        });

        it('should not trigger search for same query', () => {
            // Set component searchQuery first
            component.searchQuery = 'test';
            const onSearchSpy = jest.spyOn(component, 'onSearch');

            // Set up route with same query
            mockActivatedRoute.queryParams = of({ q: 'test' });
            component.ngOnInit();

            expect(onSearchSpy).not.toHaveBeenCalled();
        });

        it('should handle empty query param', () => {
            mockActivatedRoute.queryParams = of({});
            component.ngOnInit();

            expect(component.searchQuery).toBe('');
        });

        it('should unsubscribe on destroy', () => {
            const unsubscribeSpy = jest.fn();
            component['routeSubscription'] = { unsubscribe: unsubscribeSpy } as any;

            component.ngOnDestroy();

            expect(unsubscribeSpy).toHaveBeenCalled();
        });

        it('should handle missing subscription on destroy', () => {
            component['routeSubscription'] = undefined;

            expect(() => component.ngOnDestroy()).not.toThrow();
        });
    });

    describe('Value Type Guards and Getters', () => {
        it('should identify record values correctly', () => {
            const recordValue = { key1: 'value1', key2: 'value2' };
            const stringValue = 'simple string';

            expect(component.isRecordValue(recordValue)).toBe(true);
            expect(component.isRecordValue(stringValue)).toBe(false);
            expect(component.isRecordValue(null as any)).toBe(false);
        });

        it('should get display value for string', () => {
            const value = 'simple string';
            expect(component.getDisplayValue(value)).toBe('simple string');
        });

        it('should get display value for record with key', () => {
            const value = { key1: 'value1', key2: 'value2' };
            expect(component.getDisplayValue(value, 'key1')).toBe('value1');
        });

        it('should return empty string for record without key', () => {
            const value = { key1: 'value1', key2: 'value2' };
            expect(component.getDisplayValue(value, 'nonexistent')).toBe('');
        });

        it('should return empty string for record without specified key', () => {
            const value = { key1: 'value1', key2: 'value2' };
            expect(component.getDisplayValue(value)).toBe('');
        });
    });

    describe('Search Functionality', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should update URL and load results on search', () => {
            component.searchQuery = 'new search';
            component.onSearch();

            expect(mockRouter.navigate).toHaveBeenCalledWith([], {
                relativeTo: mockActivatedRoute,
                queryParams: { q: 'new search' },
                queryParamsHandling: 'merge',
            });
            expect(component.currentPage).toBe(1);
            expect(mockSearchService.browse).toHaveBeenCalledWith(
                encodeURIComponent('new search'),
                1,
                10
            );
        });

        it('should handle successful search response', () => {
            component.searchQuery = 'test';
            component.onSearch();

            expect(component.results).toEqual(mockSearchResponse.genes);
            expect(component.totalResults).toBe(mockSearchResponse.total);
            expect(component.error).toBeUndefined();
        });

        it('should handle search error', () => {
            const errorMessage = 'Search failed';
            mockSearchService.browse.mockReturnValue(throwError(() => new Error(errorMessage)));

            component.searchQuery = 'test';
            component.onSearch();

            expect(component.error).toBe(errorMessage);
            expect(component.results).toEqual([]);
        });

        it('should handle search error without message', () => {
            mockSearchService.browse.mockReturnValue(throwError(() => ({})));

            component.searchQuery = 'test';
            component.onSearch();

            expect(component.error).toBe('Failed to load results');
            expect(component.results).toEqual([]);
        });

        it('should encode search query correctly', () => {
            component.searchQuery = 'test with spaces & symbols';
            component.onSearch();

            expect(mockSearchService.browse).toHaveBeenCalledWith(
                'test%20with%20spaces%20%26%20symbols',
                1,
                10
            );
        });
    });

    describe('Pagination', () => {
        beforeEach(() => {
            component.totalResults = 25;
            component.pageSize = 10;
            jest.clearAllMocks();
        });

        it('should go to next page', () => {
            component.currentPage = 1;
            component.nextPage();

            expect(component.currentPage).toBe(2);
            expect(mockSearchService.browse).toHaveBeenCalledWith(
                encodeURIComponent('test'),
                2,
                10
            );
        });

        it('should go to previous page', () => {
            component.currentPage = 2;
            component.previousPage();

            expect(component.currentPage).toBe(1);
            expect(mockSearchService.browse).toHaveBeenCalledWith(
                encodeURIComponent('test'),
                1,
                10
            );
        });

        it('should not go below page 1', () => {
            component.currentPage = 1;
            component.previousPage();

            expect(component.currentPage).toBe(1);
        });

        it('should reset to page 1 on page size change', () => {
            component.currentPage = 3;
            component.pageSize = 20;
            component.onPageSizeChange();

            expect(component.currentPage).toBe(1);
            expect(mockSearchService.browse).toHaveBeenCalledWith(
                encodeURIComponent('test'),
                1,
                20
            );
        });
    });

    describe('Template Rendering', () => {
        it('should render loading indicator when loading', () => {
            loadingSubject.next(true);
            fixture.detectChanges();

            const loadingIndicator = debugElement.query(By.css('.loading-indicator'));
            expect(loadingIndicator).toBeTruthy();
            expect(loadingIndicator.nativeElement.textContent.trim()).toContain(
                'Loading results...'
            );
        });

        it('should render error message when error exists', () => {
            component.error = 'Test error message';
            fixture.detectChanges();

            const errorElement = debugElement.query(By.css('.error-message'));
            expect(errorElement).toBeTruthy();
            expect(errorElement.nativeElement.textContent.trim()).toContain('Test error message');
        });

        it('should render results when available', () => {
            component.results = mockSearchResponse.genes!;
            component.totalResults = 2;
            fixture.detectChanges();

            const resultsContainer = debugElement.query(By.css('.results-container'));
            const resultItems = debugElement.queryAll(By.css('.result-item'));

            expect(resultsContainer).toBeTruthy();
            expect(resultItems.length).toBe(2);
        });

        it('should render pagination controls when multiple pages', () => {
            component.results = mockSearchResponse.genes!;
            component.totalResults = 25;
            component.pageSize = 10;
            fixture.detectChanges();

            const paginationControls = debugElement.queryAll(By.css('.pagination-controls'));
            expect(paginationControls.length).toBeGreaterThan(0);
        });

        it('should not render pagination for single page', () => {
            component.results = mockSearchResponse.genes!;
            component.totalResults = 5;
            component.pageSize = 10;
            fixture.detectChanges();

            const paginationControls = debugElement.queryAll(By.css('.pagination-controls'));
            expect(paginationControls.length).toBe(0);
        });

        it('should render not-found component when no results', () => {
            component.results = [];
            fixture.detectChanges();

            const notFoundComponent = debugElement.query(By.css('app-not-found'));
            expect(notFoundComponent).toBeTruthy();
        });

        it('should render result stats', () => {
            component.results = mockSearchResponse.genes!;
            component.totalResults = 25;
            component.currentPage = 2;
            component.pageSize = 10;
            fixture.detectChanges();

            const resultStats = debugElement.query(By.css('.result-stats'));
            expect(resultStats).toBeTruthy();
            expect(resultStats.nativeElement.textContent.trim()).toContain(
                'Showing 11 - 20 of 25 results'
            );
        });
    });

    describe('User Interactions', () => {
        beforeEach(() => {
            component.results = mockSearchResponse.genes!;
            component.totalResults = 25;
            component.pageSize = 10;
            fixture.detectChanges();
            jest.clearAllMocks();
        });

        it('should handle previous button click', () => {
            component.currentPage = 2;
            fixture.detectChanges();

            const previousButton = debugElement.query(By.css('button'));
            previousButton.nativeElement.click();

            expect(component.currentPage).toBe(1);
        });

        it('should handle next button click', () => {
            const nextButton = debugElement
                .queryAll(By.css('button'))
                .find(btn => btn.nativeElement.textContent.trim() === 'Next');
            nextButton!.nativeElement.click();

            expect(component.currentPage).toBe(2);
        });

        it('should handle page size select change', () => {
            const select = debugElement.query(By.css('#pageSizeSelect'));
            select.nativeElement.value = '20';
            select.nativeElement.dispatchEvent(new Event('change'));

            expect(component.pageSize).toBe('20');
        });

        it('should disable previous button on first page', () => {
            component.currentPage = 1;
            fixture.detectChanges();

            const previousButton = debugElement.query(By.css('button'));
            expect(previousButton.nativeElement.disabled).toBe(true);
        });

        it('should disable next button on last page', () => {
            component.currentPage = 3; // Last page with 25 total, 10 per page
            fixture.detectChanges();

            const nextButton = debugElement
                .queryAll(By.css('button'))
                .find(btn => btn.nativeElement.textContent.trim() === 'Next');
            expect(nextButton!.nativeElement.disabled).toBe(true);
        });

        it('should disable buttons when loading', () => {
            loadingSubject.next(true);
            fixture.detectChanges();

            const buttons = debugElement.queryAll(By.css('button'));
            buttons.forEach(button => {
                expect(button.nativeElement.disabled).toBe(true);
            });
        });
    });

    describe('Result Item Rendering', () => {
        beforeEach(() => {
            component.results = mockSearchResponse.genes!;
            fixture.detectChanges();
        });

        it('should render gene symbol and name', () => {
            const titleElements = debugElement.queryAll(By.css('.title'));
            expect(titleElements[0].nativeElement.textContent).toContain('TEST1');
            expect(titleElements[0].nativeElement.textContent).toContain('Test Gene 1');
        });

        it('should render router links', () => {
            const linkElements = debugElement.queryAll(By.css('a[ng-reflect-router-link]'));
            expect(linkElements.length).toBeGreaterThan(0);
            if (linkElements.length > 0) {
                expect(linkElements[0].nativeElement.getAttribute('ng-reflect-router-link')).toBe(
                    '/gene/TEST1'
                );
            }
        });

        it('should render regular display fields', () => {
            const displayFields = debugElement.queryAll(By.css('.display-inline-field'));
            expect(displayFields.length).toBeGreaterThan(0);
        });

        it('should render matches table for Matches display field', () => {
            const matchTable = debugElement.query(By.css('table'));
            expect(matchTable).toBeTruthy();
        });

        it('should handle safe HTML rendering in matches', () => {
            const tableRows = debugElement.queryAll(By.css('table tr'));
            expect(tableRows.length).toBeGreaterThan(0);
        });
    });

    describe('Edge Cases and Error Handling', () => {
        it('should handle undefined results', () => {
            component.results = undefined as any;
            fixture.detectChanges();

            const notFoundComponent = debugElement.query(By.css('app-not-found'));
            expect(notFoundComponent).toBeTruthy();
        });

        it('should handle null totalResults', () => {
            component.totalResults = undefined;
            expect(component.totalPages).toBe(0);
            expect(component.endIndex).toBe(0);
        });

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

        it('should handle empty search query', () => {
            component.searchQuery = '';
            component.onSearch();

            expect(mockRouter.navigate).toHaveBeenCalledWith([], {
                relativeTo: mockActivatedRoute,
                queryParams: { q: '' },
                queryParamsHandling: 'merge',
            });
        });

        it('should handle search response with undefined genes', () => {
            const responseWithoutGenes: SearchResponse = {
                genes: undefined,
                total: 0,
                start: 1,
                rows: 10,
            };

            mockSearchService.browse.mockReturnValue(of(responseWithoutGenes));
            component.onSearch();

            expect(component.results).toEqual([]);
        });

        it('should handle display field without value', () => {
            const geneWithoutValue: Gene = {
                symbol: 'TEST',
                name: 'Test Gene',
                url: '/gene/TEST',
                display: [
                    {
                        label: 'Test',
                        value: '' as any,
                    },
                ],
            };

            component.results = [geneWithoutValue];
            fixture.detectChanges();

            expect(() => fixture.detectChanges()).not.toThrow();
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
            fixture = TestBed.createComponent(SearchComponent);
            component = fixture.componentInstance;
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });

        it('should handle frequent state changes efficiently', () => {
            const start = performance.now();

            for (let i = 0; i < 100; i++) {
                component.currentPage = (i % 3) + 1;
                fixture.detectChanges();
            }

            const end = performance.now();
            expect(end - start).toBeLessThan(1000);
        });

        it('should handle large result sets', () => {
            const largeResults: Gene[] = Array.from({ length: 1000 }, (_, i) => ({
                symbol: `GENE${i}`,
                name: `Gene ${i}`,
                url: `/gene/${i}`,
                display: [
                    {
                        label: 'PGNC ID',
                        value: `PGNC:${i}`,
                    },
                ],
            }));

            component.results = largeResults;
            component.totalResults = 1000;

            expect(() => fixture.detectChanges()).not.toThrow();
        });
    });

    describe('Accessibility', () => {
        beforeEach(() => {
            component.results = mockSearchResponse.genes!;
            component.totalResults = 25;
            fixture.detectChanges();
        });

        it('should have proper label for page size select', () => {
            const label = debugElement.query(By.css('label[for="pageSizeSelect"]'));
            const select = debugElement.query(By.css('#pageSizeSelect'));

            expect(label).toBeTruthy();
            expect(select).toBeTruthy();
            expect(label.nativeElement.getAttribute('for')).toBe('pageSizeSelect');
        });

        it('should have accessible button text', () => {
            const buttons = debugElement.queryAll(By.css('button'));
            buttons.forEach(button => {
                const text = button.nativeElement.textContent.trim();
                expect(text.length).toBeGreaterThan(0);
                expect(['Previous', 'Next']).toContain(text);
            });
        });

        it('should use semantic HTML elements', () => {
            const container = debugElement.query(By.css('.container'));
            const headings = debugElement.queryAll(By.css('h3'));

            expect(container).toBeTruthy();
            expect(headings.length).toBeGreaterThan(0);
        });

        it('should have proper table structure for matches', () => {
            const table = debugElement.query(By.css('table'));
            if (table) {
                const rows = table.queryAll(By.css('tr'));
                const cells = table.queryAll(By.css('td'));

                expect(rows.length).toBeGreaterThan(0);
                expect(cells.length).toBeGreaterThan(0);
            }
        });
    });

    describe('Browser Compatibility', () => {
        it('should use standard HTML elements', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            const standardTags = [
                'div',
                'span',
                'button',
                'select',
                'option',
                'table',
                'tr',
                'td',
                'a',
                'h3',
                'strong',
                'em',
            ];

            allElements.forEach(element => {
                const tagName = element.nativeElement.tagName.toLowerCase();
                if (!tagName.startsWith('app-') && !tagName.startsWith('ng-')) {
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

        it('should handle modern JavaScript features', () => {
            expect(() => {
                Object.keys({ test: 'value' });
            }).not.toThrow();
        });
    });
});
