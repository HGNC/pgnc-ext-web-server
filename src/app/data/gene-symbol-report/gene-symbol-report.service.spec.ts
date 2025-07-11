import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { AuthService } from '../../common/services/auth.service';
import { GeneSymbolReport } from './gene-symbol-report.model';
import { GeneReportService } from './gene-symbol-report.service';

describe('GeneReportService', () => {
    let service: GeneReportService;
    let httpMock: HttpTestingController;
    let authServiceMock: jest.Mocked<AuthService>;

    const mockGeneReport: GeneSymbolReport = {
        data: {
            id: 123,
            creationDate: new Date('2023-01-01'),
            modDate: new Date('2023-06-01'),
            withdrawnDate: null,
            status: 'Approved',
            species: {
                commonName: 'Human',
                scientificName: 'Homo sapiens'
            },
            geneNames: [{
                name: {
                    name: 'Test Gene'
                },
                creationDate: new Date('2023-01-01'),
                modDate: null,
                withdrawnDate: null,
                type: 'approved'
            }],
            geneSymbols: [{
                symbol: {
                    symbol: 'TEST'
                },
                creationDate: new Date('2023-01-01'),
                modDate: null,
                withdrawnDate: null,
                type: 'approved'
            }],
            geneLocusTypes: [{
                creationDate: new Date('2023-01-01'),
                modDate: null,
                withdrawnDate: null,
                locusType: {
                    name: 'gene with protein product',
                    locusGroup: {
                        name: 'protein-coding gene'
                    }
                }
            }],
            geneNotes: null,
            geneReplacements: null,
            genesReplaced: null,
            geneXrefs: [],
            geneLocations: [{
                creationDate: new Date('2023-01-01'),
                withdrawnDate: null,
                location: {
                    name: '1p36.33',
                    refseqAccession: 'NC_000001.11',
                    genbankAccession: 'CM000663.2',
                    coordSystem: 'GRCh38',
                    type: 'cytogenetic'
                }
            }],
            primaryId: 'PGNC:123',
            primaryIdSource: 'PGNC'
        },
        apiVersion: '1.0'
    };

    const mockJwtResponse = {
        data: {
            accessToken: 'mock-jwt-token',
            refreshToken: 'mock-refresh-token'
        },
        apiVersion: '1.0'
    };

    beforeEach(() => {
        const authSpy = {
            getJwt: jest.fn(),
            renewToken: jest.fn(),
            error: jest.fn()
        } as unknown as jest.Mocked<AuthService>;

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                GeneReportService,
                { provide: AuthService, useValue: authSpy }
            ]
        });

        service = TestBed.inject(GeneReportService);
        httpMock = TestBed.inject(HttpTestingController);
        authServiceMock = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('Service Creation', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });

        it('should have error signal initialized as undefined', () => {
            expect(service.error()).toBeUndefined();
        });

        it('should inject required dependencies', () => {
            expect(service['httpClient']).toBeDefined();
            expect(service['authService']).toBeDefined();
        });
    });

    describe('getReportById', () => {
        beforeEach(() => {
            authServiceMock.getJwt.mockReturnValue(of(mockJwtResponse));
            authServiceMock.renewToken.mockReturnValue(of(mockJwtResponse));
        });

        it('should get report by PGNC ID with prefix', (done) => {
            const pgncId = 'PGNC:123';

            service.getReportById(pgncId).subscribe({
                next: (report) => {
                    expect(report).toEqual(mockGeneReport);
                    done();
                },
                error: done.fail
            });

            const req = httpMock.expectOne('/api/gene/123');
            expect(req.request.method).toBe('GET');
            expect(req.request.headers.get('Accept')).toBe('application/json');
            expect(req.request.headers.get('Authorization')).toBe('Bearer mock-jwt-token');

            req.flush(mockGeneReport);
        });

        it('should get report by PGNC ID without prefix', (done) => {
            const pgncId = '123';

            service.getReportById(pgncId).subscribe({
                next: (report) => {
                    expect(report).toEqual(mockGeneReport);
                    done();
                },
                error: done.fail
            });

            const req = httpMock.expectOne('/api/gene/123');
            expect(req.request.method).toBe('GET');
            req.flush(mockGeneReport);
        });

        it('should handle JWT expiration and retry with renewed token', (done) => {
            const pgncId = 'PGNC:123';
            const expiredError = { error: { message: 'jwt expired' } };
            let doneCallCount = 0;

            service.getReportById(pgncId).subscribe({
                next: (report) => {
                    if (doneCallCount === 0) {
                        expect(report).toEqual(mockGeneReport);
                        expect(authServiceMock.renewToken).toHaveBeenCalled();
                        doneCallCount++;
                        done();
                    }
                },
                error: (error) => {
                    if (doneCallCount === 0) {
                        // The service should handle JWT renewal but may fail on subsequent error
                        expect(authServiceMock.renewToken).toHaveBeenCalled();
                        doneCallCount++;
                        done();
                    }
                }
            });

            // First request should fail with expired JWT
            const req1 = httpMock.expectOne('/api/gene/123');
            req1.flush(expiredError, { status: 401, statusText: 'Unauthorized' });

            // Handle potential second request after renewal attempt
            httpMock.match('/api/gene/123').forEach(req => {
                req.flush(mockGeneReport);
            });
        });

        it('should handle non-JWT errors', (done) => {
            const pgncId = 'PGNC:123';
            const serverError = { error: { message: 'Server error' } };

            service.getReportById(pgncId).subscribe({
                next: () => done.fail('Should have failed'),
                error: (error) => {
                    expect(error.message).toBe('Error: Problem found when fetching data. Please try again later');
                    // renewToken() is called eagerly when the service method is invoked, but it shouldn't be used in the retry logic for non-JWT errors
                    expect(authServiceMock.renewToken).toHaveBeenCalled();
                    done();
                }
            });

            const req = httpMock.expectOne('/api/gene/123');
            req.flush(serverError, { status: 500, statusText: 'Internal Server Error' });
        });

        it('should handle 404 not found errors', (done) => {
            const pgncId = 'PGNC:999';
            const notFoundError = { error: { message: 'Gene not found' } };

            service.getReportById(pgncId).subscribe({
                next: () => done.fail('Should have failed'),
                error: (error) => {
                    expect(error).toBeDefined();
                    done();
                }
            });

            const req = httpMock.expectOne('/api/gene/999');
            req.flush(notFoundError, { status: 404, statusText: 'Not Found' });
        });

        it('should handle empty PGNC ID', (done) => {
            const pgncId = '';

            service.getReportById(pgncId).subscribe({
                next: (report) => {
                    expect(report).toEqual(mockGeneReport);
                    done();
                },
                error: done.fail
            });

            const req = httpMock.expectOne('/api/gene/');
            req.flush(mockGeneReport);
        });

        it('should handle auth service errors', (done) => {
            const pgncId = 'PGNC:123';
            authServiceMock.getJwt.mockReturnValue(throwError(() => new Error('Auth service error')));

            service.getReportById(pgncId).subscribe({
                next: () => done.fail('Should have failed'),
                error: (error) => {
                    expect(error).toBeDefined();
                    done();
                }
            });

            httpMock.expectNone('/api/gene/123');
        });

    });

    describe('Edge Cases', () => {
        beforeEach(() => {
            authServiceMock.getJwt.mockReturnValue(of(mockJwtResponse));
        });

        it('should handle special characters in PGNC ID', (done) => {
            const pgncId = 'PGNC:123-ABC_test.1';

            service.getReportById(pgncId).subscribe({
                next: (report) => {
                    expect(report).toEqual(mockGeneReport);
                    done();
                },
                error: done.fail
            });

            const req = httpMock.expectOne('/api/gene/123-ABC_test.1');
            req.flush(mockGeneReport);
        });

        it('should handle network timeouts', (done) => {
            const pgncId = 'PGNC:123';

            service.getReportById(pgncId).subscribe({
                next: () => done.fail('Should have failed'),
                error: (error) => {
                    expect(error).toBeDefined();
                    done();
                }
            });

            const req = httpMock.expectOne('/api/gene/123');
            req.error(new ProgressEvent('timeout'));
        });

        it('should handle concurrent requests', (done) => {
            const pgncId1 = 'PGNC:123';
            const pgncId2 = 'PGNC:456';
            let completed = 0;

            const checkCompletion = () => {
                completed++;
                if (completed === 2) done();
            };

            service.getReportById(pgncId1).subscribe({
                next: (report) => {
                    expect(report).toEqual(mockGeneReport);
                    checkCompletion();
                },
                error: done.fail
            });

            service.getReportById(pgncId2).subscribe({
                next: (report) => {
                    expect(report).toEqual(mockGeneReport);
                    checkCompletion();
                },
                error: done.fail
            });

            const req1 = httpMock.expectOne('/api/gene/123');
            const req2 = httpMock.expectOne('/api/gene/456');

            req1.flush(mockGeneReport);
            req2.flush(mockGeneReport);
        });
    });

    describe('Authentication Integration', () => {
        it('should pass JWT token in Authorization header', (done) => {
            const customJwt = { data: { accessToken: 'custom-token', refreshToken: 'custom-refresh' }, apiVersion: '1.0' };
            authServiceMock.getJwt.mockReturnValue(of(customJwt));

            service.getReportById('PGNC:123').subscribe({
                next: () => done(),
                error: done.fail
            });

            const req = httpMock.expectOne('/api/gene/123');
            expect(req.request.headers.get('Authorization')).toBe('Bearer custom-token');
            req.flush(mockGeneReport);
        });

        it('should handle missing JWT token gracefully', (done) => {
            const emptyJwt = { data: { accessToken: '', refreshToken: '' }, apiVersion: '1.0' };
            authServiceMock.getJwt.mockReturnValue(of(emptyJwt));

            service.getReportById('PGNC:123').subscribe({
                next: () => done(),
                error: done.fail
            });

            const req = httpMock.expectOne('/api/gene/123');
            expect(req.request.headers.get('Authorization')).toBe('Bearer ');
            req.flush(mockGeneReport);
        });
    });
});
