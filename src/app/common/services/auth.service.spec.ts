import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LoginCredentials } from '../models/login-credentials.model';
import { AuthService } from './auth.service';

// Mock environment module
jest.mock('../../../environments/environment', () => ({
    environment: {
        apiUser: 'test@example.com',
        apiPassword: 'testPassword123',
    },
}));

describe('AuthService', () => {
    let service: AuthService;
    let httpMock: HttpTestingController;

    const mockLoginCredentials: LoginCredentials = {
        data: {
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
        },
        apiVersion: '1.0.0',
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService],
        });

        service = TestBed.inject(AuthService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('Service Creation', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });

        it('should initialize with empty error signal', () => {
            expect(service.error()).toBe('');
        });
    });

    describe('getJwt Method', () => {
        it('should call signIn when no JWT result exists', () => {
            service.getJwt().subscribe(result => {
                expect(result).toEqual(mockLoginCredentials);
            });

            const req = httpMock.expectOne('/api/auth/sign-in');
            expect(req.request.method).toBe('POST');
            req.flush(mockLoginCredentials);
        });

        it('should return cached JWT result when it exists', () => {
            // First call to set the JWT result
            service.getJwt().subscribe();
            const req1 = httpMock.expectOne('/api/auth/sign-in');
            req1.flush(mockLoginCredentials);

            // Second call should return cached result without making HTTP request
            service.getJwt().subscribe(result => {
                expect(result).toEqual(mockLoginCredentials);
            });

            httpMock.expectNone('/api/auth/sign-in'); // No second HTTP request should be made
        });

        it('should handle sign in error', () => {
            service.getJwt().subscribe({
                next: () => fail('Should have thrown an error'),
                error: error => {
                    expect(error.message).toContain('Problem found when signing in');
                },
            });

            const req = httpMock.expectOne('/api/auth/sign-in');
            req.flush({}, { status: 401, statusText: 'Unauthorized' });
        });
    });

    describe('renewToken Method', () => {
        beforeEach(() => {
            // Set up a JWT result for renewal
            service.getJwt().subscribe();
            const req = httpMock.expectOne('/api/auth/sign-in');
            req.flush(mockLoginCredentials);
        });

        it('should successfully renew token', () => {
            const renewedCredentials: LoginCredentials = {
                data: {
                    accessToken: 'renewed-access-token',
                    refreshToken: 'renewed-refresh-token',
                },
                apiVersion: '1.0.0',
            };

            service.renewToken().subscribe(result => {
                expect(result).toEqual(renewedCredentials);
            });

            const req = httpMock.expectOne('/api/auth/refresh-tokens');
            expect(req.request.method).toBe('POST');
            expect(req.request.body).toEqual({
                refreshToken: mockLoginCredentials.data.refreshToken,
            });
            req.flush(renewedCredentials);
        });

        it('should handle token renewal error and clear JWT result', () => {
            service.renewToken().subscribe({
                next: () => fail('Should have thrown an error'),
                error: error => {
                    expect(error.message).toContain(
                        'Problem found when refreshing token. Please sign in again.'
                    );
                },
            });

            const req = httpMock.expectOne('/api/auth/refresh-tokens');
            req.flush({}, { status: 401, statusText: 'Unauthorized' });

            // Verify JWT result was cleared - next getJwt call should make new sign-in request
            service.getJwt().subscribe();
            httpMock.expectOne('/api/auth/sign-in');
        });
    });

    describe('Error Signal', () => {
        it('should allow updating error signal', () => {
            service.error.set('Test error message');
            expect(service.error()).toBe('Test error message');
        });

        it('should allow clearing error signal', () => {
            service.error.set('Error message');
            service.error.set('');
            expect(service.error()).toBe('');
        });
    });
});
