import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { FragmentJumpService } from './fragment-jump.service';

describe('FragmentJumpService', () => {
    let service: FragmentJumpService;
    let mockActivatedRoute: any;
    let fragmentSubject: BehaviorSubject<string | null>;
    let mockGetElementById: jest.SpyInstance;

    beforeEach(() => {
        fragmentSubject = new BehaviorSubject<string | null>(null);

        mockActivatedRoute = {
            fragment: fragmentSubject.asObservable()
        };

        TestBed.configureTestingModule({
            providers: [
                FragmentJumpService,
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
            ]
        });

        service = TestBed.inject(FragmentJumpService);

        // Mock document.getElementById
        mockGetElementById = jest.spyOn(document, 'getElementById');
    });

    afterEach(() => {
        mockGetElementById.mockRestore();
        document.body.innerHTML = '';
    });

    describe('Service Creation', () => {
        it('should be created', () => {
            expect(service).toBeTruthy();
        });

        it('should be provided in root', () => {
            expect(service).toBeInstanceOf(FragmentJumpService);
        });

        it('should inject ActivatedRoute', () => {
            expect(mockActivatedRoute).toBeTruthy();
        });
    });

    describe('jumpToSection Method', () => {
        it('should scroll to element when section exists', () => {
            const mockElement = document.createElement('div');
            const scrollSpy = jest.fn();
            mockElement.scrollIntoView = scrollSpy;

            mockGetElementById.mockReturnValue(mockElement);

            service.jumpToSection('test-section');

            expect(mockGetElementById).toHaveBeenCalledWith('test-section');
            expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth' });
        });

        it('should not throw error when section does not exist', () => {
            mockGetElementById.mockReturnValue(null);

            expect(() => {
                service.jumpToSection('non-existent-section');
            }).not.toThrow();

            expect(mockGetElementById).toHaveBeenCalledWith('non-existent-section');
        });

        it('should handle null section parameter', () => {
            expect(() => {
                service.jumpToSection(null);
            }).not.toThrow();

            expect(mockGetElementById).not.toHaveBeenCalled();
        });

        it('should handle empty string section parameter', () => {
            expect(() => {
                service.jumpToSection('');
            }).not.toThrow();

            expect(mockGetElementById).not.toHaveBeenCalled();
        });

        it('should handle undefined section parameter', () => {
            expect(() => {
                service.jumpToSection(undefined as any);
            }).not.toThrow();

            expect(mockGetElementById).not.toHaveBeenCalled();
        });

        it('should handle whitespace-only section parameter', () => {
            mockGetElementById.mockReturnValue(null);

            expect(() => {
                service.jumpToSection('   ');
            }).not.toThrow();

            expect(mockGetElementById).toHaveBeenCalledWith('   ');
        });

        it('should handle section with special characters', () => {
            const mockElement = document.createElement('div');
            const scrollSpy = jest.fn();
            mockElement.scrollIntoView = scrollSpy;

            mockGetElementById.mockReturnValue(mockElement);

            service.jumpToSection('section-with-@#$%^&*()');

            expect(mockGetElementById).toHaveBeenCalledWith('section-with-@#$%^&*()');
            expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth' });
        });

        it('should handle section with unicode characters', () => {
            const mockElement = document.createElement('div');
            const scrollSpy = jest.fn();
            mockElement.scrollIntoView = scrollSpy;

            mockGetElementById.mockReturnValue(mockElement);

            service.jumpToSection('section-with-ñéñē');

            expect(mockGetElementById).toHaveBeenCalledWith('section-with-ñéñē');
            expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth' });
        });

        it('should handle case-sensitive section names', () => {
            const mockElement = document.createElement('div');
            const scrollSpy = jest.fn();
            mockElement.scrollIntoView = scrollSpy;

            mockGetElementById.mockReturnValue(mockElement);

            service.jumpToSection('CaseSensitiveSection');

            expect(mockGetElementById).toHaveBeenCalledWith('CaseSensitiveSection');
            expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth' });
        });
    });

    describe('scrollIntoView Behavior', () => {
        it('should call scrollIntoView with smooth behavior', () => {
            const mockElement = document.createElement('div');
            const scrollSpy = jest.fn();
            mockElement.scrollIntoView = scrollSpy;

            mockGetElementById.mockReturnValue(mockElement);

            service.jumpToSection('test-section');

            expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth' });
        });

        it('should only call scrollIntoView once per invocation', () => {
            const mockElement = document.createElement('div');
            const scrollSpy = jest.fn();
            mockElement.scrollIntoView = scrollSpy;

            mockGetElementById.mockReturnValue(mockElement);

            service.jumpToSection('test-section');

            expect(scrollSpy).toHaveBeenCalledTimes(1);
        });

        it('should call scrollIntoView multiple times for multiple invocations', () => {
            const mockElement = document.createElement('div');
            const scrollSpy = jest.fn();
            mockElement.scrollIntoView = scrollSpy;

            mockGetElementById.mockReturnValue(mockElement);

            service.jumpToSection('test-section');
            service.jumpToSection('test-section');
            service.jumpToSection('test-section');

            expect(scrollSpy).toHaveBeenCalledTimes(3);
        });
    });

    describe('subscribeToFragmentChanges Method', () => {
        it('should return the fragment observable from ActivatedRoute', () => {
            const result = service.subscribeToFragmentChanges();
            expect(result).toBe(mockActivatedRoute.fragment);
        });

        it('should emit fragment changes', (done) => {
            const result = service.subscribeToFragmentChanges();

            result.subscribe(fragment => {
                if (fragment === 'test-fragment') {
                    expect(fragment).toBe('test-fragment');
                    done();
                }
            });

            fragmentSubject.next('test-fragment');
        });

        it('should emit null when no fragment', (done) => {
            const result = service.subscribeToFragmentChanges();
            let callCount = 0;

            result.subscribe(fragment => {
                callCount++;
                if (callCount === 2) { // Skip the initial emission, wait for our manual emission
                    expect(fragment).toBeNull();
                    done();
                }
            });

            fragmentSubject.next(null);
        });

        it('should emit multiple fragment changes', () => {
            const result = service.subscribeToFragmentChanges();
            const fragments: (string | null)[] = [];

            result.subscribe(fragment => fragments.push(fragment));

            fragmentSubject.next('fragment1');
            fragmentSubject.next('fragment2');
            fragmentSubject.next(null);
            fragmentSubject.next('fragment3');

            expect(fragments).toEqual([null, 'fragment1', 'fragment2', null, 'fragment3']);
        });

        it('should handle empty string fragments', () => {
            const result = service.subscribeToFragmentChanges();
            const fragments: (string | null)[] = [];

            result.subscribe(fragment => fragments.push(fragment));

            fragmentSubject.next('');

            expect(fragments).toEqual([null, '']);
        });
    });

    describe('Integration Between Methods', () => {
        it('should jump to section when fragment changes', () => {
            const mockElement = document.createElement('div');
            const scrollSpy = jest.fn();
            mockElement.scrollIntoView = scrollSpy;

            mockGetElementById.mockReturnValue(mockElement);

            // Subscribe to fragment changes and jump to sections
            service.subscribeToFragmentChanges().subscribe(fragment => {
                if (fragment) {
                    service.jumpToSection(fragment);
                }
            });

            fragmentSubject.next('test-section');

            expect(mockGetElementById).toHaveBeenCalledWith('test-section');
            expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth' });
        });

        it('should handle fragment changes to non-existent sections', () => {
            mockGetElementById.mockReturnValue(null);

            service.subscribeToFragmentChanges().subscribe(fragment => {
                if (fragment) {
                    expect(() => {
                        service.jumpToSection(fragment);
                    }).not.toThrow();
                }
            });

            fragmentSubject.next('non-existent-section');

            expect(mockGetElementById).toHaveBeenCalledWith('non-existent-section');
        });

        it('should handle multiple subscribers to fragment changes', () => {
            const mockElement = document.createElement('div');
            const scrollSpy = jest.fn();
            mockElement.scrollIntoView = scrollSpy;

            mockGetElementById.mockReturnValue(mockElement);

            const fragments1: (string | null)[] = [];
            const fragments2: (string | null)[] = [];

            service.subscribeToFragmentChanges().subscribe(fragment => fragments1.push(fragment));
            service.subscribeToFragmentChanges().subscribe(fragment => fragments2.push(fragment));

            fragmentSubject.next('test-fragment');

            expect(fragments1).toEqual([null, 'test-fragment']);
            expect(fragments2).toEqual([null, 'test-fragment']);
        });
    });

    describe('Edge Cases and Error Handling', () => {
        it('should handle DOM manipulation during scroll', () => {
            const mockElement = document.createElement('div');
            const scrollSpy = jest.fn();
            mockElement.scrollIntoView = scrollSpy;

            mockGetElementById.mockReturnValue(mockElement);

            // Simulate DOM changes during scroll
            scrollSpy.mockImplementation(() => {
                // DOM manipulation that might happen during scroll
                const newElement = document.createElement('div');
                document.body.appendChild(newElement);
            });

            expect(() => {
                service.jumpToSection('test-section');
            }).not.toThrow();

            expect(scrollSpy).toHaveBeenCalled();
        });

        it('should handle getElementById returning null', () => {
            mockGetElementById.mockReturnValue(null);

            expect(() => {
                service.jumpToSection('any-section');
            }).not.toThrow();

            expect(mockGetElementById).toHaveBeenCalledWith('any-section');
        });

        it('should handle scrollIntoView throwing an error gracefully', () => {
            const mockElement = document.createElement('div');
            mockElement.scrollIntoView = jest.fn(() => {
                throw new Error('Scroll error');
            });

            mockGetElementById.mockReturnValue(mockElement);

            expect(() => {
                service.jumpToSection('error-element');
            }).toThrow('Scroll error');
        });

        it('should handle very long section names', () => {
            const longId = 'a'.repeat(100);
            const mockElement = document.createElement('div');
            const scrollSpy = jest.fn();
            mockElement.scrollIntoView = scrollSpy;

            mockGetElementById.mockReturnValue(mockElement);

            service.jumpToSection(longId);

            expect(mockGetElementById).toHaveBeenCalledWith(longId);
            expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth' });
        });
    });

    describe('Performance and Memory', () => {
        it('should not create memory leaks with multiple subscriptions', () => {
            const subscriptions = [];

            for (let i = 0; i < 10; i++) {
                const subscription = service.subscribeToFragmentChanges().subscribe();
                subscriptions.push(subscription);
            }

            // Clean up subscriptions
            subscriptions.forEach(sub => sub.unsubscribe());

            expect(subscriptions.length).toBe(10);
            expect(subscriptions.every(sub => sub.closed)).toBe(true);
        });

        it('should handle rapid fragment changes', () => {
            const fragments: (string | null)[] = [];

            service.subscribeToFragmentChanges().subscribe(fragment => fragments.push(fragment));

            for (let i = 0; i < 100; i++) {
                fragmentSubject.next(`fragment-${i}`);
            }

            expect(fragments.length).toBe(101); // Including initial null
            expect(fragments[1]).toBe('fragment-0');
            expect(fragments[100]).toBe('fragment-99');
        });

        it('should handle rapid jumpToSection calls', () => {
            const mockElement = document.createElement('div');
            const scrollSpy = jest.fn();
            mockElement.scrollIntoView = scrollSpy;

            mockGetElementById.mockReturnValue(mockElement);

            for (let i = 0; i < 100; i++) {
                service.jumpToSection('rapid-test');
            }

            expect(scrollSpy).toHaveBeenCalledTimes(100);
        });
    });

    describe('Browser Compatibility', () => {
        it('should handle missing scrollIntoView method gracefully', () => {
            const mockElement = document.createElement('div');
            delete (mockElement as any).scrollIntoView;

            mockGetElementById.mockReturnValue(mockElement);

            expect(() => {
                service.jumpToSection('no-scroll-method');
            }).toThrow();
        });

        it('should work with elements that have scrollIntoView', () => {
            const mockElement = document.createElement('div');
            const scrollSpy = jest.fn();
            mockElement.scrollIntoView = scrollSpy;

            mockGetElementById.mockReturnValue(mockElement);

            service.jumpToSection('has-scroll-method');

            expect(scrollSpy).toHaveBeenCalledWith({ behavior: 'smooth' });
        });
    });
});
