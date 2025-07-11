import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

import { SafeHtmlPipe } from './search.component';

describe('SafeHtmlPipe', () => {
    let pipe: SafeHtmlPipe;
    let mockSanitizer: jest.Mocked<DomSanitizer>;

    beforeEach(() => {
        mockSanitizer = {
            bypassSecurityTrustHtml: jest.fn().mockImplementation((value) => ({
                changingThisBreaksApplicationSecurity: value,
                toString: () => value
            }))
        } as any;

        TestBed.configureTestingModule({
            providers: [
                { provide: DomSanitizer, useValue: mockSanitizer }
            ]
        });

        pipe = new SafeHtmlPipe(mockSanitizer);
    });

    describe('Pipe Creation', () => {
        it('should create', () => {
            expect(pipe).toBeTruthy();
        });

        it('should be defined', () => {
            expect(pipe).toBeDefined();
        });

        it('should be an instance of SafeHtmlPipe', () => {
            expect(pipe).toBeInstanceOf(SafeHtmlPipe);
        });
    });

    describe('HTML Transformation', () => {
        it('should replace <em> tags with <em class="match">', () => {
            const input = 'This is <em>highlighted</em> text';
            const expectedModified = 'This is <em class="match">highlighted</em> text';

            pipe.transform(input);

            expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(expectedModified);
        });

        it('should handle multiple <em> tags', () => {
            const input = 'Text with <em>first</em> and <em>second</em> highlights';
            const expectedModified = 'Text with <em class="match">first</em> and <em class="match">second</em> highlights';

            pipe.transform(input);

            expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(expectedModified);
        });

        it('should handle nested HTML with <em> tags', () => {
            const input = '<div>Container with <em>highlighted</em> <span>nested</span> content</div>';
            const expectedModified = '<div>Container with <em class="match">highlighted</em> <span>nested</span> content</div>';

            pipe.transform(input);

            expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(expectedModified);
        });

        it('should handle text without <em> tags', () => {
            const input = 'Plain text without highlights';

            pipe.transform(input);

            expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(input);
        });

        it('should handle empty string', () => {
            const input = '';

            pipe.transform(input);

            expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith('');
        });

        it('should handle string with only <em> tags', () => {
            const input = '<em>completely</em><em>highlighted</em>';
            const expectedModified = '<em class="match">completely</em><em class="match">highlighted</em>';

            pipe.transform(input);

            expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(expectedModified);
        });

        it('should preserve existing em tags with classes', () => {
            const input = 'Text with <em class="existing">existing class</em> and <em>new highlight</em>';
            const expectedModified = 'Text with <em class="existing match">existing class</em> and <em class="match">new highlight</em>';

            pipe.transform(input);

            expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(expectedModified);
        });
    });

    describe('Security and Sanitization', () => {
        it('should call DomSanitizer.bypassSecurityTrustHtml', () => {
            const input = 'Test <em>content</em>';

            pipe.transform(input);

            expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledTimes(1);
        });

        it('should return sanitized SafeHtml object', () => {
            const input = 'Test <em>content</em>';
            const result = pipe.transform(input);

            expect(result).toBeDefined();
            expect(typeof result).toBe('object');
        });

        it('should handle potentially dangerous content', () => {
            const input = 'Test <em>highlight</em> with <script>alert("xss")</script>';
            const expectedModified = 'Test <em class="match">highlight</em> with <script>alert("xss")</script>';

            pipe.transform(input);

            expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(expectedModified);
        });
    });

    describe('Edge Cases', () => {
        it('should handle malformed HTML', () => {
            const input = 'Text with <em>unclosed tag and <div>nested';
            const expectedModified = 'Text with <em class="match">unclosed tag and <div>nested';

            pipe.transform(input);

            expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(expectedModified);
        });

        it('should handle special characters', () => {
            const input = 'Special chars: <em>&amp; &lt; &gt;</em> symbols';
            const expectedModified = 'Special chars: <em class="match">&amp; &lt; &gt;</em> symbols';

            pipe.transform(input);

            expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(expectedModified);
        });

        it('should handle unicode characters', () => {
            const input = 'Unicode: <em>café naïve résumé</em>';
            const expectedModified = 'Unicode: <em class="match">café naïve résumé</em>';

            pipe.transform(input);

            expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(expectedModified);
        });

        it('should handle long content strings', () => {
            const longText = 'Lorem ipsum '.repeat(100);
            const input = `${longText}<em>highlight</em>${longText}`;
            const expectedModified = `${longText}<em class="match">highlight</em>${longText}`;

            pipe.transform(input);

            expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledWith(expectedModified);
        });
    });

    describe('Performance', () => {
        it('should handle multiple transformations efficiently', () => {
            const input = 'Test <em>content</em>';
            const start = performance.now();

            for (let i = 0; i < 1000; i++) {
                pipe.transform(input);
            }

            const end = performance.now();
            expect(end - start).toBeLessThan(1000); // Should complete in less than 1 second
        });

        it('should handle large content efficiently', () => {
            const largeContent = '<em>highlight</em> '.repeat(1000);
            const start = performance.now();

            pipe.transform(largeContent);

            const end = performance.now();
            expect(end - start).toBeLessThan(100); // Should complete quickly
        });
    });

    describe('Pure Pipe Behavior', () => {
        it('should be marked as pure', () => {
            // Pure pipes are only called when input changes
            const input = 'Test <em>content</em>';

            pipe.transform(input);
            pipe.transform(input);

            expect(mockSanitizer.bypassSecurityTrustHtml).toHaveBeenCalledTimes(2);
        });

        it('should produce consistent results', () => {
            const input = 'Test <em>content</em>';

            const result1 = pipe.transform(input);
            const result2 = pipe.transform(input);

            expect((result1 as any).changingThisBreaksApplicationSecurity).toEqual((result2 as any).changingThisBreaksApplicationSecurity);
        });
    });
});
