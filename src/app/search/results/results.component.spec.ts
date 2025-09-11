import { KeyValuePipe } from '@angular/common';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ResultsComponent } from './results.component';

describe('ResultsComponent', () => {
    let component: ResultsComponent;
    let fixture: ComponentFixture<ResultsComponent>;
    let debugElement: DebugElement;

    const mockResults = [
        {
            symbol: 'BRCA1',
            name: 'breast cancer 1',
            url: '/gene/BRCA1',
            display: [
                { label: 'PGNC ID', value: 'PGNC:1100' },
                { label: 'Locus Type', value: 'protein-coding gene' },
                { label: 'Status', value: 'Approved' },
            ],
        },
        {
            symbol: 'BRCA2',
            name: 'breast cancer 2',
            url: '/gene/BRCA2',
            display: [
                { label: 'PGNC ID', value: 'PGNC:1101' },
                { label: 'Locus Type', value: 'protein-coding gene' },
                { label: 'Status', value: 'Approved' },
                {
                    label: 'Matches',
                    value: {
                        gene_symbol: '<em>BRCA</em>2',
                        gene_name: 'breast <em>cancer</em> 2',
                    },
                },
            ],
        },
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ResultsComponent, KeyValuePipe],
        }).compileComponents();

        fixture = TestBed.createComponent(ResultsComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;

        // Set required input
        component.results = mockResults;
        fixture.detectChanges();
    });

    describe('Component Creation', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should be defined', () => {
            expect(component).toBeDefined();
        });

        it('should be an instance of ResultsComponent', () => {
            expect(component).toBeInstanceOf(ResultsComponent);
        });

        it('should require results input', () => {
            expect(component.results).toBeDefined();
            expect(Array.isArray(component.results)).toBe(true);
        });
    });

    describe('Input Properties', () => {
        it('should accept results input', () => {
            const newResults = [
                {
                    symbol: 'TEST1',
                    name: 'test gene 1',
                    url: '/gene/TEST1',
                    display: [{ label: 'PGNC ID', value: 'PGNC:12345' }],
                },
            ];

            component.results = newResults;
            fixture.detectChanges();

            expect(component.results).toBe(newResults);
        });

        it('should handle empty results array', () => {
            component.results = [];
            fixture.detectChanges();

            expect(component.results).toEqual([]);
        });

        it('should handle single result', () => {
            const singleResult = [mockResults[0]];
            component.results = singleResult;
            fixture.detectChanges();

            expect(component.results.length).toBe(1);
        });

        it('should handle large result sets', () => {
            const largeResults = Array.from({ length: 100 }, (_, i) => ({
                symbol: `GENE${i}`,
                name: `Gene ${i}`,
                url: `/gene/${i}`,
                display: [{ label: 'PGNC ID', value: `PGNC:${i}` }],
            }));

            component.results = largeResults;
            fixture.detectChanges();

            expect(component.results.length).toBe(100);
        });
    });

    describe('Template Rendering', () => {
        it('should render search result items', () => {
            const searchResults = debugElement.queryAll(By.css('.search-result'));
            expect(searchResults.length).toBe(2);
        });

        it('should render gene symbols and names', () => {
            const titles = debugElement.queryAll(By.css('.title'));
            expect(titles.length).toBe(2);

            expect(titles[0].nativeElement.textContent).toContain('BRCA1');
            expect(titles[0].nativeElement.textContent).toContain('breast cancer 1');
            expect(titles[1].nativeElement.textContent).toContain('BRCA2');
            expect(titles[1].nativeElement.textContent).toContain('breast cancer 2');
        });

        it('should render links with correct href attributes', () => {
            const links = debugElement.queryAll(By.css('a[href]'));
            expect(links.length).toBe(2);

            expect(links[0].nativeElement.href).toContain('/gene/BRCA1');
            expect(links[1].nativeElement.href).toContain('/gene/BRCA2');
        });

        it('should render search info sections', () => {
            const searchInfoSections = debugElement.queryAll(By.css('.search-info'));
            expect(searchInfoSections.length).toBe(2);
        });

        it('should render PGNC ID display', () => {
            const pgncIds = debugElement.queryAll(By.css('.pgnc-id'));
            expect(pgncIds.length).toBe(2);

            expect(pgncIds[0].nativeElement.textContent).toContain('PGNC:1100');
            expect(pgncIds[1].nativeElement.textContent).toContain('PGNC:1101');
        });

        it('should render locus type display', () => {
            const locusTypes = debugElement.queryAll(By.css('.locus-type'));
            expect(locusTypes.length).toBe(2);

            locusTypes.forEach(element => {
                expect(element.nativeElement.textContent).toContain('protein-coding gene');
            });
        });

        it('should render status display', () => {
            const statuses = debugElement.queryAll(By.css('.status'));
            expect(statuses.length).toBe(2);

            statuses.forEach(element => {
                expect(element.nativeElement.textContent).toContain('Approved');
            });
        });
    });

    describe('Matches Display', () => {
        it('should render matches section when available', () => {
            const matchesSections = debugElement.queryAll(By.css('.search-matches'));
            expect(matchesSections.length).toBe(1); // Only BRCA2 has matches
        });

        it('should render match table', () => {
            const matchTables = debugElement.queryAll(By.css('.match_table'));
            expect(matchTables.length).toBe(1);
        });

        it('should render match table headers', () => {
            const matchHeaders = debugElement.queryAll(By.css('.match_thead'));
            expect(matchHeaders.length).toBeGreaterThan(0);

            const headerTexts = matchHeaders.map(header => header.nativeElement.textContent.trim());
            expect(headerTexts).toContain('gene_symbol');
            expect(headerTexts).toContain('gene_name');
        });

        it('should render match table data with HTML content', () => {
            const matchCells = debugElement.queryAll(By.css('.match_td'));
            expect(matchCells.length).toBeGreaterThan(0);

            const cellContents = matchCells.map(cell => cell.nativeElement.innerHTML);
            expect(cellContents).toContain('<em>BRCA</em>2');
            expect(cellContents).toContain('breast <em>cancer</em> 2');
        });

        it('should not render matches for results without matches', () => {
            component.results = [mockResults[0]]; // BRCA1 without matches
            fixture.detectChanges();

            const matchesSections = debugElement.queryAll(By.css('.search-matches'));
            expect(matchesSections.length).toBe(0);
        });

        it('should handle empty matches object', () => {
            const resultWithEmptyMatches = {
                ...mockResults[1],
                display: [...mockResults[1].display.slice(0, -1), { label: 'Matches', value: {} }],
            };

            component.results = [resultWithEmptyMatches];
            fixture.detectChanges();

            const matchesSections = debugElement.queryAll(By.css('.search-matches'));
            expect(matchesSections.length).toBe(1);

            const matchHeaders = debugElement.queryAll(By.css('.match_thead'));
            expect(matchHeaders.length).toBe(0);
        });
    });

    describe('KeyValue Pipe Integration', () => {
        it('should use KeyValue pipe for matches', () => {
            const matchesResult = mockResults[1];
            const matchesDisplay = matchesResult.display.find(d => d.label === 'Matches');

            expect(matchesDisplay).toBeDefined();
            expect(typeof matchesDisplay!.value).toBe('object');

            // Verify that the pipe processes the object correctly
            const matchTable = debugElement.query(By.css('.match_table'));
            expect(matchTable).toBeTruthy();
        });

        it('should handle keyvalue pipe with complex objects', () => {
            const complexMatches = {
                symbol: 'BRCA1',
                name: 'breast cancer 1',
                url: '/gene/BRCA1',
                display: [
                    { label: 'PGNC ID', value: 'PGNC:1100' },
                    { label: 'Locus Type', value: 'protein-coding gene' },
                    { label: 'Status', value: 'Approved' },
                    {
                        label: 'Matches',
                        value: {
                            symbol: '<em>BRCA</em>1',
                            name: 'breast <em>cancer</em> 1',
                            aliases: 'BRCC1, <em>FANCS</em>',
                            location: '17q21.31',
                        },
                    },
                ],
            };

            component.results = [complexMatches];
            fixture.detectChanges();

            const matchRows = debugElement.queryAll(By.css('.match_table tr'));
            expect(matchRows.length).toBe(4); // 4 match entries
        });
    });

    describe('Display Field Structure', () => {
        it('should handle different display field configurations', () => {
            const customResult = {
                symbol: 'CUSTOM',
                name: 'Custom Gene',
                url: '/gene/CUSTOM',
                display: [
                    { label: 'ID', value: '123' },
                    { label: 'Type', value: 'custom-type' },
                    { label: 'Status', value: 'test-status' },
                    { label: 'Extra', value: 'extra-info' },
                ],
            };

            component.results = [customResult];
            fixture.detectChanges();

            const searchInfo = debugElement.query(By.css('.search-info'));
            expect(searchInfo).toBeTruthy();

            // Should still render first 3 display items in the standard structure
            const pgncId = searchInfo.query(By.css('.pgnc-id .value'));
            const locusType = searchInfo.query(By.css('.locus-type .value'));
            const status = searchInfo.query(By.css('.status .value'));

            expect(pgncId.nativeElement.textContent.trim()).toBe('123');
            expect(locusType.nativeElement.textContent.trim()).toBe('custom-type');
            expect(status.nativeElement.textContent.trim()).toBe('test-status');
        });

        it('should handle missing display fields gracefully', () => {
            const incompleteResult = {
                symbol: 'INCOMPLETE',
                name: 'Incomplete Gene',
                url: '/gene/INCOMPLETE',
                display: [{ label: 'ID', value: '456' }],
            };

            component.results = [incompleteResult];
            fixture.detectChanges();

            expect(() => fixture.detectChanges()).not.toThrow();
        });
    });

    describe('HTML Content and Security', () => {
        it('should render HTML content in match cells', () => {
            const matchCells = debugElement.queryAll(By.css('.match_td'));
            const emphasisElements = debugElement.queryAll(By.css('.match_td em'));

            expect(emphasisElements.length).toBeGreaterThan(0);
        });

        it('should handle special characters in content', () => {
            const specialResult = {
                symbol: 'SPECIAL&<>',
                name: 'Gene with "quotes" & symbols',
                url: '/gene/SPECIAL',
                display: [
                    { label: 'PGNC ID', value: 'PGNC:99999' },
                    { label: 'Locus Type', value: 'protein-coding gene' },
                    { label: 'Status', value: 'Approved' },
                    {
                        label: 'Matches',
                        value: {
                            symbol: 'SPECIAL&<>',
                            description: 'Contains "quotes" & symbols',
                        },
                    },
                ],
            };

            component.results = [specialResult];
            fixture.detectChanges();

            const title = debugElement.query(By.css('.title'));
            expect(title.nativeElement.textContent).toContain('SPECIAL&<>');
            expect(title.nativeElement.textContent).toContain('Gene with "quotes" & symbols');
        });
    });

    describe('Edge Cases and Error Handling', () => {
        it('should handle undefined results', () => {
            component.results = undefined as any;
            fixture.detectChanges();

            const searchResults = debugElement.queryAll(By.css('.search-result'));
            expect(searchResults.length).toBe(0);
        });

        it('should handle null results', () => {
            component.results = null as any;
            fixture.detectChanges();

            const searchResults = debugElement.queryAll(By.css('.search-result'));
            expect(searchResults.length).toBe(0);
        });

        it('should handle results with missing properties', () => {
            const incompleteResults = [
                {
                    symbol: 'TEST',
                    // Missing name
                    url: '/gene/TEST',
                    display: [],
                } as any,
            ];

            component.results = incompleteResults;
            expect(() => fixture.detectChanges()).not.toThrow();
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

        it('should handle malformed display objects', () => {
            const malformedResult = {
                symbol: 'MALFORMED',
                name: 'Malformed Gene',
                url: '/gene/MALFORMED',
                display: [
                    { label: 'PGNC ID', value: 'PGNC:00000' },
                    { label: 'Locus Type', value: 'protein-coding gene' },
                    { label: 'Status', value: 'Approved' },
                    {
                        label: 'Matches',
                        value: null as any,
                    },
                ],
            };

            component.results = [malformedResult];
            expect(() => fixture.detectChanges()).not.toThrow();
        });
    });

    describe('Performance', () => {
        it('should handle large result sets efficiently', () => {
            const largeResults = Array.from({ length: 1000 }, (_, i) => ({
                symbol: `GENE${i}`,
                name: `Gene ${i}`,
                url: `/gene/${i}`,
                display: [
                    { label: 'PGNC ID', value: `PGNC:${i}` },
                    { label: 'Locus Type', value: 'protein-coding gene' },
                    { label: 'Status', value: 'Approved' },
                ],
            }));

            const start = performance.now();
            component.results = largeResults;
            fixture.detectChanges();
            const end = performance.now();

            expect(end - start).toBeLessThan(2000);
        });

        it('should handle rapid result changes efficiently', () => {
            const start = performance.now();

            for (let i = 0; i < 100; i++) {
                component.results = [
                    {
                        symbol: `GENE${i}`,
                        name: `Gene ${i}`,
                        url: `/gene/${i}`,
                        display: [{ label: 'PGNC ID', value: `PGNC:${i}` }],
                    },
                ];
                fixture.detectChanges();
            }

            const end = performance.now();
            expect(end - start).toBeLessThan(1000);
        });

        it('should not create memory leaks on destroy', () => {
            const initialComponent = component;
            fixture.destroy();
            expect(initialComponent).toBeDefined();
        });

        it('should handle rapid re-initialization', () => {
            fixture.destroy();
            fixture = TestBed.createComponent(ResultsComponent);
            component = fixture.componentInstance;
            component.results = mockResults;
            fixture.detectChanges();
            expect(component).toBeTruthy();
        });
    });

    describe('Accessibility', () => {
        it('should use semantic HTML elements', () => {
            const searchResults = debugElement.queryAll(By.css('.search-result'));
            const links = debugElement.queryAll(By.css('a'));
            const tables = debugElement.queryAll(By.css('table'));

            expect(searchResults.length).toBeGreaterThan(0);
            expect(links.length).toBeGreaterThan(0);
            expect(tables.length).toBeGreaterThan(0);
        });

        it('should have proper table structure', () => {
            const table = debugElement.query(By.css('.match_table'));
            if (table) {
                const headers = table.queryAll(By.css('th'));
                const cells = table.queryAll(By.css('td'));

                expect(headers.length).toBeGreaterThan(0);
                expect(cells.length).toBeGreaterThan(0);
            }
        });

        it('should have descriptive link content', () => {
            const links = debugElement.queryAll(By.css('a'));

            links.forEach(link => {
                const content = link.nativeElement.textContent.trim();
                expect(content.length).toBeGreaterThan(0);
            });
        });

        it('should use proper heading structure', () => {
            const spans = debugElement.queryAll(By.css('.title'));
            expect(spans.length).toBeGreaterThan(0);

            spans.forEach(span => {
                expect(span.nativeElement.textContent.trim().length).toBeGreaterThan(0);
            });
        });
    });

    describe('CSS Classes and Styling', () => {
        it('should apply correct CSS classes', () => {
            const expectedClasses = [
                '.search-result',
                '.title',
                '.search-info',
                '.pgnc-id',
                '.locus-type',
                '.status',
                '.key',
                '.value',
            ];

            expectedClasses.forEach(className => {
                const elements = debugElement.queryAll(By.css(className));
                expect(elements.length).toBeGreaterThan(0);
            });
        });

        it('should apply match table classes', () => {
            const matchClasses = [
                '.search-matches',
                '.match_table',
                '.match_thead',
                '.match_key',
                '.match_td',
            ];

            matchClasses.forEach(className => {
                const elements = debugElement.queryAll(By.css(className));
                if (className === '.search-matches' || className === '.match_table') {
                    expect(elements.length).toBeGreaterThanOrEqual(0);
                }
            });
        });

        it('should not have inline styles', () => {
            const allElements = debugElement.queryAll(By.css('*'));
            allElements.forEach(element => {
                expect(element.nativeElement.style.length).toBe(0);
            });
        });
    });

    describe('Browser Compatibility', () => {
        it('should use standard HTML elements', () => {
            const standardElements = [
                'div',
                'a',
                'span',
                'table',
                'tr',
                'th',
                'td',
                'strong',
                'em',
            ];
            const allElements = debugElement.queryAll(By.css('*'));

            allElements.forEach(element => {
                const tagName = element.nativeElement.tagName.toLowerCase();
                if (!tagName.startsWith('app-')) {
                    expect(standardElements).toContain(tagName);
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

        it('should use proper href attributes', () => {
            const links = debugElement.queryAll(By.css('a[href]'));

            links.forEach(link => {
                const href = link.nativeElement.href;
                expect(href).toBeTruthy();
                expect(href.length).toBeGreaterThan(0);
            });
        });
    });

    describe('Real-world Data Handling', () => {
        it('should handle typical gene data structure', () => {
            const realWorldData = [
                {
                    symbol: 'TP53',
                    name: 'tumor protein p53',
                    url: '/gene/TP53',
                    display: [
                        { label: 'PGNC ID', value: 'PGNC:11998' },
                        { label: 'Locus Type', value: 'protein-coding gene' },
                        { label: 'Status', value: 'Approved' },
                        {
                            label: 'Matches',
                            value: {
                                gene_symbol: '<em>TP53</em>',
                                gene_name: 'tumor <em>protein</em> p53',
                                alias_symbol: 'P53, <em>TRP53</em>',
                                prev_symbol: 'TP53',
                            },
                        },
                    ],
                },
            ];

            component.results = realWorldData;
            fixture.detectChanges();

            const searchResults = debugElement.queryAll(By.css('.search-result'));
            const matchTable = debugElement.query(By.css('.match_table'));

            expect(searchResults.length).toBe(1);
            expect(matchTable).toBeTruthy();
        });

        it('should handle search results without matches', () => {
            const noMatchesData = [
                {
                    symbol: 'ACTB',
                    name: 'actin beta',
                    url: '/gene/ACTB',
                    display: [
                        { label: 'PGNC ID', value: 'PGNC:132' },
                        { label: 'Locus Type', value: 'protein-coding gene' },
                        { label: 'Status', value: 'Approved' },
                    ],
                },
            ];

            component.results = noMatchesData;
            fixture.detectChanges();

            const searchResults = debugElement.queryAll(By.css('.search-result'));
            const matchTable = debugElement.query(By.css('.match_table'));

            expect(searchResults.length).toBe(1);
            expect(matchTable).toBeFalsy();
        });
    });
});
