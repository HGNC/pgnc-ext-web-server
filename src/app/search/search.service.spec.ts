import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { SearchResponse, SearchService } from './search.service';

describe('SearchService', () => {
    let service: SearchService;
    let mockHttpClient: jest.Mocked<HttpClient>;

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
                        label: 'Status',
                        value: 'Approved',
                    },
                ],
            },
        ],
        total: 25,
        start: 1,
        rows: 10,
    };

    beforeEach(() => {
        mockHttpClient = {
            get: jest.fn(),
        } as any;

        TestBed.configureTestingModule({
            providers: [SearchService, { provide: HttpClient, useValue: mockHttpClient }],
        });

        service = TestBed.inject(SearchService);
    });

    describe('Service Creation', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });

        it('should be defined', () => {
            expect(service).toBeDefined();
        });

        it('should be an instance of SearchService', () => {
            expect(service).toBeInstanceOf(SearchService);
        });

        it('should have loading$ observable', () => {
            expect(service.loading$).toBeDefined();
            expect(typeof service.loading$.subscribe).toBe('function');
        });

        it('should initialize with loading false', done => {
            service.loading$.subscribe(loading => {
                expect(loading).toBe(false);
                done();
            });
        });
    });

    describe('Cache Key Generation', () => {
        it('should generate cache key correctly', () => {
            const key1 = (service as any).generateCacheKey('test', 1, 10);
            const key2 = (service as any).generateCacheKey('test', 1, 10);
            const key3 = (service as any).generateCacheKey('test', 2, 10);

            expect(key1).toBe('test|1|10');
            expect(key1).toBe(key2);
            expect(key1).not.toBe(key3);
        });

        it('should generate unique keys for different parameters', () => {
            const key1 = (service as any).generateCacheKey('query1', 1, 10);
            const key2 = (service as any).generateCacheKey('query2', 1, 10);
            const key3 = (service as any).generateCacheKey('query1', 2, 10);
            const key4 = (service as any).generateCacheKey('query1', 1, 20);

            expect(key1).not.toBe(key2);
            expect(key1).not.toBe(key3);
            expect(key1).not.toBe(key4);
        });

        it('should handle special characters in query', () => {
            const key = (service as any).generateCacheKey('test with spaces & symbols', 1, 10);
            expect(key).toBe('test with spaces & symbols|1|10');
        });
    });

    describe('Loading State Management', () => {
        it('should update loading state correctly', () => {
            const loadingStates: boolean[] = [];
            service.loading$.subscribe(loading => loadingStates.push(loading));

            (service as any).updateLoading(true);
            (service as any).updateLoading(true);
            (service as any).updateLoading(false);
            (service as any).updateLoading(false);

            expect(loadingStates).toEqual([false, true, true, true, false]);
        });

        it('should handle multiple concurrent loading operations', () => {
            const loadingStates: boolean[] = [];
            service.loading$.subscribe(loading => loadingStates.push(loading));

            // Start 3 operations
            (service as any).updateLoading(true);
            (service as any).updateLoading(true);
            (service as any).updateLoading(true);

            // Complete 2 operations
            (service as any).updateLoading(false);
            (service as any).updateLoading(false);

            // Still loading (1 operation remaining)
            expect(loadingStates[loadingStates.length - 1]).toBe(true);

            // Complete last operation
            (service as any).updateLoading(false);
            expect(loadingStates[loadingStates.length - 1]).toBe(false);
        });

        it('should never go below zero loading counter', () => {
            const loadingStates: boolean[] = [];
            service.loading$.subscribe(loading => loadingStates.push(loading));

            (service as any).updateLoading(false);
            (service as any).updateLoading(false);

            expect(loadingStates[loadingStates.length - 1]).toBe(false);
        });
    });

    describe('HTTP Browse Method', () => {
        beforeEach(() => {
            mockHttpClient.get.mockReturnValue(of(mockSearchResponse));
        });

        it('should make HTTP request with correct parameters', () => {
            service.browse('test query', 1, 10).subscribe();

            expect(mockHttpClient.get).toHaveBeenCalledWith('/ses/browse', {
                params: {
                    q: 'test query',
                    start: '1',
                    rows: '10',
                },
            });
        });

        it('should decode URI component in query', () => {
            service.browse('test%20query', 1, 10).subscribe();

            expect(mockHttpClient.get).toHaveBeenCalledWith('/ses/browse', {
                params: {
                    q: 'test query',
                    start: '1',
                    rows: '10',
                },
            });
        });

        it('should return search response', done => {
            service.browse('test', 1, 10).subscribe(response => {
                expect(response).toEqual(mockSearchResponse);
                done();
            });
        });

        it('should handle numeric parameters correctly', () => {
            service.browse('test', 25, 50).subscribe();

            expect(mockHttpClient.get).toHaveBeenCalledWith('/ses/browse', {
                params: {
                    q: 'test',
                    start: '25',
                    rows: '50',
                },
            });
        });

        it('should handle special characters in query', () => {
            const specialQuery = 'test with spaces & symbols!';
            service.browse(specialQuery, 1, 10).subscribe();

            expect(mockHttpClient.get).toHaveBeenCalledWith('/ses/browse', {
                params: {
                    q: specialQuery,
                    start: '1',
                    rows: '10',
                },
            });
        });
    });

    describe('Caching Mechanism', () => {
        beforeEach(() => {
            mockHttpClient.get.mockReturnValue(of(mockSearchResponse));
        });

        it('should cache successful responses', done => {
            service.browse('test', 1, 10).subscribe(() => {
                // Second call should return cached data without HTTP request
                service.browse('test', 1, 10).subscribe(response => {
                    expect(response).toEqual(mockSearchResponse);
                    expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
                    done();
                });
            });
        });

        it('should return different cached responses for different parameters', done => {
            const response2 = { ...mockSearchResponse, total: 50 };

            mockHttpClient.get
                .mockReturnValueOnce(of(mockSearchResponse))
                .mockReturnValueOnce(of(response2));

            service.browse('test', 1, 10).subscribe(resp1 => {
                service.browse('test', 2, 10).subscribe(resp2 => {
                    expect(resp1).toEqual(mockSearchResponse);
                    expect(resp2).toEqual(response2);
                    expect(mockHttpClient.get).toHaveBeenCalledTimes(2);
                    done();
                });
            });
        });

        it('should not make HTTP request for cached data', done => {
            service.browse('test', 1, 10).subscribe(() => {
                mockHttpClient.get.mockClear();

                service.browse('test', 1, 10).subscribe(response => {
                    expect(response).toEqual(mockSearchResponse);
                    expect(mockHttpClient.get).not.toHaveBeenCalled();
                    done();
                });
            });
        });

        it('should clear all cache', done => {
            service.browse('test', 1, 10).subscribe(() => {
                service.clearCache();
                mockHttpClient.get.mockClear();

                service.browse('test', 1, 10).subscribe(() => {
                    expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
                    done();
                });
            });
        });

        it('should clear cache for specific query', done => {
            service.browse('test1', 1, 10).subscribe(() => {
                service.browse('test2', 1, 10).subscribe(() => {
                    service.clearCacheForQuery('test1');
                    mockHttpClient.get.mockClear();

                    // test1 should make new request
                    service.browse('test1', 1, 10).subscribe(() => {
                        expect(mockHttpClient.get).toHaveBeenCalledTimes(1);

                        // test2 should still use cache
                        service.browse('test2', 1, 10).subscribe(() => {
                            expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
                            done();
                        });
                    });
                });
            });
        });
    });

    describe('Ongoing Requests Management', () => {
        beforeEach(() => {
            mockHttpClient.get.mockReturnValue(of(mockSearchResponse));
        });

        it('should return same observable for concurrent identical requests', () => {
            const request1 = service.browse('test', 1, 10);
            const request2 = service.browse('test', 1, 10);

            expect(request1).toBe(request2);
            expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
        });

        it('should handle different concurrent requests separately', () => {
            const request1 = service.browse('test1', 1, 10);
            const request2 = service.browse('test2', 1, 10);

            expect(request1).not.toBe(request2);
            expect(mockHttpClient.get).toHaveBeenCalledTimes(2);
        });

        it('should clean up ongoing requests after completion', done => {
            service.browse('test', 1, 10).subscribe(() => {
                // After completion, new request should create new observable
                const request2 = service.browse('test', 1, 10);
                expect(request2).toBeDefined();
                done();
            });
        });
    });

    describe('Error Handling', () => {
        it('should handle HTTP errors', done => {
            const error = new Error('Network error');
            mockHttpClient.get.mockReturnValue(throwError(() => error));

            service.browse('test', 1, 10).subscribe({
                next: () => fail('Should not succeed'),
                error: err => {
                    expect(err).toBe(error);
                    done();
                },
            });
        });

        it('should clean up ongoing requests on error', done => {
            const error = new Error('Network error');
            mockHttpClient.get.mockReturnValue(throwError(() => error));

            service.browse('test', 1, 10).subscribe({
                error: () => {
                    // After error, new request should create new observable
                    mockHttpClient.get.mockReturnValue(of(mockSearchResponse));
                    service.browse('test', 1, 10).subscribe(() => {
                        expect(mockHttpClient.get).toHaveBeenCalledTimes(2);
                        done();
                    });
                },
            });
        });

        it('should update loading state on error', done => {
            const loadingStates: boolean[] = [];
            service.loading$.subscribe(loading => loadingStates.push(loading));

            const error = new Error('Network error');
            mockHttpClient.get.mockReturnValue(throwError(() => error));

            service.browse('test', 1, 10).subscribe({
                error: () => {
                    expect(loadingStates).toContain(true);
                    expect(loadingStates[loadingStates.length - 1]).toBe(false);
                    done();
                },
            });
        });

        it('should not cache failed requests', done => {
            const error = new Error('Network error');
            mockHttpClient.get
                .mockReturnValueOnce(throwError(() => error))
                .mockReturnValueOnce(of(mockSearchResponse));

            service.browse('test', 1, 10).subscribe({
                error: () => {
                    // Second request should try HTTP again
                    service.browse('test', 1, 10).subscribe(() => {
                        expect(mockHttpClient.get).toHaveBeenCalledTimes(2);
                        done();
                    });
                },
            });
        });
    });

    describe('ShareReplay Behavior', () => {
        beforeEach(() => {
            mockHttpClient.get.mockReturnValue(of(mockSearchResponse));
        });

        it('should share replay between multiple subscribers', done => {
            const request = service.browse('test', 1, 10);
            let completedCount = 0;

            request.subscribe(() => {
                completedCount++;
                if (completedCount === 2) {
                    expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
                    done();
                }
            });

            request.subscribe(() => {
                completedCount++;
                if (completedCount === 2) {
                    expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
                    done();
                }
            });
        });

        it('should provide same data to all subscribers', done => {
            const request = service.browse('test', 1, 10);
            const results: SearchResponse[] = [];

            request.subscribe(response => {
                results.push(response);
                if (results.length === 2) {
                    expect(results[0]).toEqual(results[1]);
                    expect(results[0]).toEqual(mockSearchResponse);
                    done();
                }
            });

            request.subscribe(response => {
                results.push(response);
                if (results.length === 2) {
                    expect(results[0]).toEqual(results[1]);
                    expect(results[0]).toEqual(mockSearchResponse);
                    done();
                }
            });
        });
    });

    describe('Performance and Memory', () => {
        beforeEach(() => {
            mockHttpClient.get.mockReturnValue(of(mockSearchResponse));
        });

        it('should handle large cache sizes efficiently', done => {
            let completedRequests = 0;
            const totalRequests = 100;

            for (let i = 0; i < totalRequests; i++) {
                service.browse(`query${i}`, 1, 10).subscribe(() => {
                    completedRequests++;
                    if (completedRequests === totalRequests) {
                        expect(mockHttpClient.get).toHaveBeenCalledTimes(totalRequests);
                        done();
                    }
                });
            }
        });

        it('should handle rapid concurrent requests', done => {
            const promises: Promise<any>[] = [];

            for (let i = 0; i < 50; i++) {
                promises.push(service.browse('test', 1, 10).toPromise());
            }

            Promise.all(promises).then(() => {
                expect(mockHttpClient.get).toHaveBeenCalledTimes(1);
                done();
            });
        });

        it('should clear cache efficiently', () => {
            // Fill cache with multiple entries
            for (let i = 0; i < 100; i++) {
                service.browse(`query${i}`, 1, 10).subscribe();
            }

            const start = performance.now();
            service.clearCache();
            const end = performance.now();

            expect(end - start).toBeLessThan(50);
        });

        it('should clear query-specific cache efficiently', () => {
            // Fill cache with multiple entries
            for (let i = 0; i < 100; i++) {
                service.browse(`test${i}`, 1, 10).subscribe();
            }

            const start = performance.now();
            service.clearCacheForQuery('test1');
            const end = performance.now();

            expect(end - start).toBeLessThan(50);
        });
    });

    describe('Edge Cases', () => {
        it('should handle empty query string', () => {
            mockHttpClient.get.mockReturnValue(of(mockSearchResponse));

            service.browse('', 1, 10).subscribe();

            expect(mockHttpClient.get).toHaveBeenCalledWith('/ses/browse', {
                params: {
                    q: '',
                    start: '1',
                    rows: '10',
                },
            });
        });

        it('should handle zero start parameter', () => {
            mockHttpClient.get.mockReturnValue(of(mockSearchResponse));

            service.browse('test', 0, 10).subscribe();

            expect(mockHttpClient.get).toHaveBeenCalledWith('/ses/browse', {
                params: {
                    q: 'test',
                    start: '0',
                    rows: '10',
                },
            });
        });

        it('should handle large page sizes', () => {
            mockHttpClient.get.mockReturnValue(of(mockSearchResponse));

            service.browse('test', 1, 10000).subscribe();

            expect(mockHttpClient.get).toHaveBeenCalledWith('/ses/browse', {
                params: {
                    q: 'test',
                    start: '1',
                    rows: '10000',
                },
            });
        });

        it('should handle unicode queries', () => {
            mockHttpClient.get.mockReturnValue(of(mockSearchResponse));
            const unicodeQuery = 'café naïve résumé 中文 🎉';

            service.browse(unicodeQuery, 1, 10).subscribe();

            expect(mockHttpClient.get).toHaveBeenCalledWith('/ses/browse', {
                params: {
                    q: unicodeQuery,
                    start: '1',
                    rows: '10',
                },
            });
        });
    });

    describe('Type Safety', () => {
        it('should handle SearchResponse interface correctly', done => {
            mockHttpClient.get.mockReturnValue(of(mockSearchResponse));

            service.browse('test', 1, 10).subscribe(response => {
                expect(response.genes).toBeDefined();
                expect(response.total).toBe(25);
                expect(response.start).toBe(1);
                expect(response.rows).toBe(10);
                expect(Array.isArray(response.genes)).toBe(true);
                done();
            });
        });

        it('should handle Gene interface correctly', done => {
            mockHttpClient.get.mockReturnValue(of(mockSearchResponse));

            service.browse('test', 1, 10).subscribe(response => {
                if (response.genes && response.genes.length > 0) {
                    const gene = response.genes[0];
                    expect(gene.symbol).toBeDefined();
                    expect(gene.name).toBeDefined();
                    expect(gene.url).toBeDefined();
                    expect(gene.display).toBeDefined();
                    expect(Array.isArray(gene.display)).toBe(true);
                }
                done();
            });
        });
    });
});
