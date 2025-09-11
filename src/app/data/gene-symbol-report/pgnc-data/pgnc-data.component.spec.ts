import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { GeneSymbolReport } from '../gene-symbol-report.model';
import { PgncDataComponent } from './pgnc-data.component';

describe('PgncDataComponent', () => {
    let component: PgncDataComponent;
    let fixture: ComponentFixture<PgncDataComponent>;

    const mockGeneSymbolReport: GeneSymbolReport = {
        data: {
            id: 123,
            creationDate: new Date('2023-01-01'),
            modDate: new Date('2023-06-01'),
            withdrawnDate: null,
            status: 'Approved',
            species: {
                commonName: 'Human',
                scientificName: 'Homo sapiens',
            },
            geneNames: [
                {
                    name: { name: 'Approved Gene Name' },
                    creationDate: new Date('2023-01-01'),
                    modDate: null,
                    withdrawnDate: null,
                    type: 'approved',
                },
                {
                    name: { name: 'Previous Gene Name' },
                    creationDate: new Date('2023-01-01'),
                    modDate: null,
                    withdrawnDate: null,
                    type: 'previous',
                },
                {
                    name: { name: 'Alias Gene Name' },
                    creationDate: new Date('2023-01-01'),
                    modDate: null,
                    withdrawnDate: null,
                    type: 'alias',
                },
            ] as any,
            geneSymbols: [
                {
                    symbol: { symbol: 'APPSYM' },
                    creationDate: new Date('2023-01-01'),
                    modDate: null,
                    withdrawnDate: null,
                    type: 'approved',
                },
                {
                    symbol: { symbol: 'PREVSYM' },
                    creationDate: new Date('2023-01-01'),
                    modDate: null,
                    withdrawnDate: null,
                    type: 'previous',
                },
                {
                    symbol: { symbol: 'ALIASSYM' },
                    creationDate: new Date('2023-01-01'),
                    modDate: null,
                    withdrawnDate: null,
                    type: 'alias',
                },
            ] as any,
            geneLocusTypes: [
                {
                    creationDate: new Date('2023-01-01'),
                    modDate: null,
                    withdrawnDate: null,
                    locusType: {
                        name: 'gene with protein product',
                        locusGroup: {
                            name: 'protein-coding gene',
                        },
                    },
                },
            ],
            geneNotes: null,
            geneReplacements: null,
            genesReplaced: null,
            geneXrefs: [],
            geneLocations: [
                {
                    creationDate: new Date('2023-01-01'),
                    withdrawnDate: null,
                    location: {
                        name: '1p36.33',
                        refseqAccession: 'NC_000001.11',
                        genbankAccession: 'CM000663.2',
                        coordSystem: 'chromosome',
                        type: 'primary assembly',
                    },
                },
            ],
            primaryId: 'PGNC:123',
            primaryIdSource: 'PGNC',
        },
        apiVersion: '1.0',
    };

    // Mock report with multiple symbols and names for testing filtering
    const mockCompleteGeneReport: GeneSymbolReport = {
        data: {
            id: 123,
            creationDate: new Date('2023-01-01'),
            modDate: new Date('2023-06-01'),
            withdrawnDate: null,
            status: 'Approved',
            species: {
                commonName: 'Human',
                scientificName: 'Homo sapiens',
            },
            geneNames: [
                {
                    name: { name: 'Approved Gene Name' },
                    creationDate: new Date('2023-01-01'),
                    modDate: null,
                    withdrawnDate: null,
                    type: 'approved',
                },
            ],
            geneSymbols: [
                {
                    symbol: { symbol: 'APPSYM' },
                    creationDate: new Date('2023-01-01'),
                    modDate: null,
                    withdrawnDate: null,
                    type: 'approved',
                },
            ],
            geneLocusTypes: [
                {
                    creationDate: new Date('2023-01-01'),
                    modDate: null,
                    withdrawnDate: null,
                    locusType: {
                        name: 'gene with protein product',
                        locusGroup: {
                            name: 'protein-coding gene',
                        },
                    },
                },
            ],
            geneNotes: null,
            geneReplacements: null,
            genesReplaced: null,
            geneXrefs: [],
            geneLocations: [
                {
                    creationDate: new Date('2023-01-01'),
                    withdrawnDate: null,
                    location: {
                        name: '1p36.33',
                        refseqAccession: 'NC_000001.11',
                        genbankAccession: 'CM000663.2',
                        coordSystem: 'chromosome',
                        type: 'primary assembly',
                    },
                },
            ],
            primaryId: 'PGNC:123',
            primaryIdSource: 'PGNC',
        },
        apiVersion: '1.0',
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [PgncDataComponent, RouterTestingModule, FontAwesomeModule],
        }).compileComponents();

        fixture = TestBed.createComponent(PgncDataComponent);
        component = fixture.componentInstance;
        component.result = mockGeneSymbolReport;
        component.symbol = 'APPSYM';
    });

    describe('Component Creation', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should have required inputs', () => {
            expect(component.result).toBeDefined();
            expect(component.symbol).toBeDefined();
        });

        it('should initialize FontAwesome icon', () => {
            expect(component.faQuestionCircle).toBeDefined();
        });
    });

    describe('ngOnInit', () => {
        it('should call parseReport on initialization', () => {
            const parseReportSpy = jest.spyOn(component, 'parseReport');
            component.ngOnInit();
            expect(parseReportSpy).toHaveBeenCalled();
        });

        it('should parse report data correctly', () => {
            component.ngOnInit();

            expect(component.appSymbol?.symbol?.symbol).toBe('APPSYM');
            expect(component.appName?.name?.name).toBe('Approved Gene Name');
            expect(component.prevSymbols?.length).toBe(1);
            expect(component.prevNames?.length).toBe(1);
            expect(component.aliasSymbols?.length).toBe(1);
            expect(component.aliasNames?.length).toBe(1);
            expect(component.location?.location?.name).toBe('1p36.33');
        });
    });

    describe('parseReport', () => {
        beforeEach(() => {
            component.parseReport();
        });

        it('should find approved symbol', () => {
            expect(component.appSymbol).toBeDefined();
            expect(component.appSymbol?.type).toBe('approved');
            expect(component.appSymbol?.symbol?.symbol).toBe('APPSYM');
        });

        it('should find approved name', () => {
            expect(component.appName).toBeDefined();
            expect(component.appName?.type).toBe('approved');
            expect(component.appName?.name?.name).toBe('Approved Gene Name');
        });

        it('should filter previous symbols', () => {
            expect(component.prevSymbols).toBeDefined();
            expect(component.prevSymbols?.length).toBe(1);
            expect(component.prevSymbols?.[0].type).toBe('previous');
            expect(component.prevSymbols?.[0].symbol?.symbol).toBe('PREVSYM');
        });

        it('should filter previous names', () => {
            expect(component.prevNames).toBeDefined();
            expect(component.prevNames?.length).toBe(1);
            expect(component.prevNames?.[0].type).toBe('previous');
            expect(component.prevNames?.[0].name?.name).toBe('Previous Gene Name');
        });

        it('should filter alias symbols', () => {
            expect(component.aliasSymbols).toBeDefined();
            expect(component.aliasSymbols?.length).toBe(1);
            expect(component.aliasSymbols?.[0].type).toBe('alias');
            expect(component.aliasSymbols?.[0].symbol?.symbol).toBe('ALIASSYM');
        });

        it('should filter alias names', () => {
            expect(component.aliasNames).toBeDefined();
            expect(component.aliasNames?.length).toBe(1);
            expect(component.aliasNames?.[0].type).toBe('alias');
            expect(component.aliasNames?.[0].name?.name).toBe('Alias Gene Name');
        });

        it('should find primary assembly chromosome location', () => {
            expect(component.location).toBeDefined();
            expect(component.location?.location?.type).toBe('primary assembly');
            expect(component.location?.location?.coordSystem).toBe('chromosome');
            expect(component.location?.location?.name).toBe('1p36.33');
        });
    });

    describe('parseReport Edge Cases', () => {
        it('should handle when component receives mockCompleteGeneReport', () => {
            component.result = mockCompleteGeneReport;
            component.parseReport();

            expect(component.appSymbol?.symbol?.symbol).toBe('APPSYM');
            expect(component.appName?.name?.name).toBe('Approved Gene Name');
        });

        it('should handle report with null data', () => {
            const reportWithNullData = { data: null, apiVersion: '1.0' };
            component.result = reportWithNullData;

            expect(() => component.parseReport()).not.toThrow();
            expect(component.appSymbol).toBeUndefined();
            expect(component.appName).toBeUndefined();
            expect(component.location).toBeUndefined();
        });

        it('should handle geneLocations with different types', () => {
            const reportWithDifferentLocation: GeneSymbolReport = {
                data: {
                    ...mockGeneSymbolReport.data!,
                    geneLocations: [
                        {
                            creationDate: new Date('2023-01-01'),
                            withdrawnDate: null,
                            location: {
                                name: 'wrong location',
                                refseqAccession: 'NC_000001.11',
                                genbankAccession: 'CM000663.2',
                                coordSystem: 'other',
                                type: 'secondary',
                            },
                        },
                    ],
                },
                apiVersion: '1.0',
            };
            component.result = reportWithDifferentLocation;

            component.parseReport();

            expect(component.location).toBeUndefined();
        });

        it('should handle geneLocations with correct type and coordSystem', () => {
            const reportWithCorrectLocation: GeneSymbolReport = {
                data: {
                    ...mockGeneSymbolReport.data!,
                    geneLocations: [
                        {
                            creationDate: new Date('2023-01-01'),
                            withdrawnDate: null,
                            location: {
                                name: 'correct location',
                                refseqAccession: 'NC_000001.11',
                                genbankAccession: 'CM000663.2',
                                coordSystem: 'chromosome',
                                type: 'primary assembly',
                            },
                        },
                    ],
                },
                apiVersion: '1.0',
            };
            component.result = reportWithCorrectLocation;

            component.parseReport();

            expect(component.location?.location?.name).toBe('correct location');
        });
    });

    describe('getPhytozomeVersion', () => {
        it('should return default version when no primaryIdSource', () => {
            const reportWithoutSource: GeneSymbolReport = {
                data: {
                    ...mockGeneSymbolReport.data!,
                    primaryIdSource: null,
                },
                apiVersion: '1.0',
            };
            component.result = reportWithoutSource;

            const version = component.getPhytozomeVersion();
            expect(version).toBe('v4_1');
        });

        it('should return default version when primaryIdSource has no version', () => {
            const reportWithSimpleSource: GeneSymbolReport = {
                data: {
                    ...mockGeneSymbolReport.data!,
                    primaryIdSource: 'phytozome',
                },
                apiVersion: '1.0',
            };
            component.result = reportWithSimpleSource;

            const version = component.getPhytozomeVersion();
            expect(version).toBe('v4_1');
        });

        it('should extract version from primaryIdSource', () => {
            const reportWithVersion: GeneSymbolReport = {
                data: {
                    ...mockGeneSymbolReport.data!,
                    primaryIdSource: 'phytozome v5_0',
                },
                apiVersion: '1.0',
            };
            component.result = reportWithVersion;

            const version = component.getPhytozomeVersion();
            expect(version).toBe('v5_0');
        });

        it('should handle complex primaryIdSource with multiple spaces', () => {
            const reportWithComplexSource: GeneSymbolReport = {
                data: {
                    ...mockGeneSymbolReport.data!,
                    primaryIdSource: 'phytozome database v5_0 test',
                },
                apiVersion: '1.0',
            };
            component.result = reportWithComplexSource;

            const version = component.getPhytozomeVersion();
            expect(version).toBe('database');
        });
    });

    describe('Template Rendering', () => {
        beforeEach(() => {
            component.ngOnInit();
            fixture.detectChanges();
        });

        it('should display approved symbol in header', () => {
            const header = fixture.debugElement.query(By.css('.card-header'));
            expect(header.nativeElement.textContent).toContain('APPSYM');
        });

        it('should display species information', () => {
            const speciesVal = fixture.debugElement.query(By.css('.key-val-pairs .val'));
            expect(speciesVal.nativeElement.textContent).toContain('Homo sapiens (Human)');
        });

        it('should display approved symbol', () => {
            const symbolElements = fixture.debugElement.queryAll(By.css('.key-val-pairs .val'));
            const symbolElement = symbolElements.find(
                el => el.nativeElement.textContent.trim() === 'APPSYM'
            );
            expect(symbolElement).toBeTruthy();
        });

        it('should display approved name', () => {
            const nameElements = fixture.debugElement.queryAll(By.css('.key-val-pairs .val'));
            const nameElement = nameElements.find(
                el => el.nativeElement.textContent.trim() === 'Approved Gene Name'
            );
            expect(nameElement).toBeTruthy();
        });

        it('should display PGNC ID', () => {
            const pgncElements = fixture.debugElement.queryAll(By.css('.key-val-pairs .val'));
            const pgncElement = pgncElements.find(
                el => el.nativeElement.textContent.trim() === 'PGNC:123'
            );
            expect(pgncElement).toBeTruthy();
        });

        it('should display status', () => {
            const statusElements = fixture.debugElement.queryAll(By.css('.key-val-pairs .val'));
            const statusElement = statusElements.find(
                el => el.nativeElement.textContent.trim() === 'Approved'
            );
            expect(statusElement).toBeTruthy();
        });

        it('should display chromosomal location', () => {
            const locationElements = fixture.debugElement.queryAll(By.css('.key-val-pairs .val'));
            const locationElement = locationElements.find(
                el => el.nativeElement.textContent.trim() === '1p36.33'
            );
            expect(locationElement).toBeTruthy();
        });

        it('should display help icons', () => {
            const helpIcons = fixture.debugElement.queryAll(By.css('fa-icon'));
            expect(helpIcons.length).toBeGreaterThan(0);
        });

        it('should have router links for help', () => {
            // Ensure component data is present for conditional rendering
            expect(component.result).toBeDefined();
            expect(component.result.data).toBeDefined();

            // In Angular testing, routerLink directives are compiled to href attributes
            const helpLinks = fixture.debugElement.queryAll(By.css('a[href*="/help"]'));
            expect(helpLinks.length).toBeGreaterThan(0);
        });
    });

    describe('Template Rendering - Conditional Elements', () => {
        it('should display basic gene information correctly', () => {
            component.ngOnInit();
            fixture.detectChanges();

            const content = fixture.debugElement.nativeElement.textContent;
            expect(content).toContain('APPSYM');
            expect(content).toContain('Approved Gene Name');
        });

        it('should display "Not available" when location is missing', () => {
            const reportWithoutLocation: GeneSymbolReport = {
                data: {
                    ...mockGeneSymbolReport.data!,
                    geneLocations: null,
                },
                apiVersion: '1.0',
            };
            component.result = reportWithoutLocation;
            component.ngOnInit();
            fixture.detectChanges();

            const content = fixture.debugElement.nativeElement.textContent;
            expect(content).toContain('Not available');
        });
    });

    describe('External Links', () => {
        it('should create phytozome link for phytozome primaryIdSource', () => {
            const reportWithPhytozome: GeneSymbolReport = {
                data: {
                    ...mockGeneSymbolReport.data!,
                    primaryIdSource: 'phytozome v5_0',
                    primaryId: 'GENE123',
                },
                apiVersion: '1.0',
            };
            component.result = reportWithPhytozome;
            component.ngOnInit();
            fixture.detectChanges();

            const externalLinks = fixture.debugElement.queryAll(By.css('a[href*="phytozome"]'));
            expect(externalLinks.length).toBe(1);
            expect(externalLinks[0].attributes['href']).toContain('phytozome-next.jgi.doe.gov');
            expect(externalLinks[0].attributes['href']).toContain('GENE123');
            expect(externalLinks[0].attributes['href']).toContain('v5_0');
        });

        it('should create NCBI link for ncbi gene primaryIdSource', () => {
            const reportWithNCBI: GeneSymbolReport = {
                data: {
                    ...mockGeneSymbolReport.data!,
                    primaryIdSource: 'ncbi gene',
                    primaryId: '12345',
                },
                apiVersion: '1.0',
            };
            component.result = reportWithNCBI;
            component.ngOnInit();
            fixture.detectChanges();

            const externalLinks = fixture.debugElement.queryAll(By.css('a[href*="ncbi"]'));
            expect(externalLinks.length).toBe(1);
            expect(externalLinks[0].attributes['href']).toContain('ncbi.nlm.nih.gov/gene/12345');
        });

        it('should display "Not assigned" for unknown primaryIdSource', () => {
            const reportWithUnknown: GeneSymbolReport = {
                data: {
                    ...mockGeneSymbolReport.data!,
                    primaryIdSource: 'unknown source',
                },
                apiVersion: '1.0',
            };
            component.result = reportWithUnknown;
            component.ngOnInit();
            fixture.detectChanges();

            const content = fixture.debugElement.nativeElement.textContent;
            expect(content).toContain('Not assigned');
        });
    });

    describe('Error Handling', () => {
        it('should handle null result gracefully', () => {
            component.result = null as any;
            expect(() => component.parseReport()).not.toThrow();
        });

        it('should handle undefined data gracefully', () => {
            component.result = { data: undefined, apiVersion: '1.0' } as any;
            expect(() => component.parseReport()).not.toThrow();
        });

        it('should handle missing nested properties', () => {
            const incompleteReport = {
                data: {
                    id: 123,
                    geneSymbols: [{ type: 'approved' }],
                    geneNames: [{ type: 'approved' }],
                },
                apiVersion: '1.0',
            } as any;
            component.result = incompleteReport;

            expect(() => component.parseReport()).not.toThrow();
        });
    });
});
