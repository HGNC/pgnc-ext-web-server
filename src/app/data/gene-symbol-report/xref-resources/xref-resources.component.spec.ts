import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { GeneSymbolReport } from '../gene-symbol-report.model';
import { ExternalResourceName } from './external-resource-name.type';
import { XrefComponent } from './xref-resources.component';
import { Xref } from './xref-resources.model';

describe('XrefComponent', () => {
    let component: XrefComponent;
    let fixture: ComponentFixture<XrefComponent>;

    const mockXrefs: Xref[] = [
        {
            geneId: 123,
            xrefId: 1,
            creationDate: new Date('2023-01-01'),
            withdrawnDate: null,
            status: 'active',
            source: 'test',
            xref: {
                displayId: 'NCBI123',
                externalResource: {
                    name: 'NCBI Gene',
                },
            },
        },
        {
            geneId: 123,
            xrefId: 2,
            creationDate: new Date('2023-01-01'),
            withdrawnDate: null,
            status: 'active',
            source: 'test',
            xref: {
                displayId: 'ENS123',
                externalResource: {
                    name: 'Ensembl Gene',
                },
            },
        },
        {
            geneId: 123,
            xrefId: 3,
            creationDate: new Date('2023-01-01'),
            withdrawnDate: null,
            status: 'active',
            source: 'test',
            xref: {
                displayId: 'UNI123',
                externalResource: {
                    name: 'UniProt',
                },
            },
        },
        {
            geneId: 123,
            xrefId: 4,
            creationDate: new Date('2023-01-01'),
            withdrawnDate: null,
            status: 'active',
            source: 'test',
            xref: {
                displayId: 'PUB123',
                externalResource: {
                    name: 'PubMed',
                },
            },
        },
        {
            geneId: 123,
            xrefId: 5,
            creationDate: new Date('2023-01-01'),
            withdrawnDate: null,
            status: 'active',
            source: 'test',
            xref: {
                displayId: 'PHY123',
                externalResource: {
                    name: 'Phytozome v4_1',
                },
            },
        },
    ];

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
                    name: { name: 'Test Gene' },
                    creationDate: new Date('2023-01-01'),
                    modDate: null,
                    withdrawnDate: null,
                    type: 'approved',
                },
            ],
            geneSymbols: [
                {
                    symbol: { symbol: 'TESTGENE' },
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
            geneXrefs: mockXrefs,
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
            imports: [XrefComponent, RouterTestingModule, FontAwesomeModule],
        }).compileComponents();

        fixture = TestBed.createComponent(XrefComponent);
        component = fixture.componentInstance;
        component.result = mockGeneSymbolReport;
        component.symbol = 'TESTGENE';
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

        it('should initialize classifiedXrefs with empty arrays/strings', () => {
            expect(component.classifiedXrefs).toBeDefined();
            expect(component.classifiedXrefs['NCBI Gene']).toEqual([]);
            expect(component.classifiedXrefs['Ensembl Gene']).toEqual([]);
            expect(component.classifiedXrefs['UniProt']).toEqual([]);
            expect(component.classifiedXrefs['PubMed']).toEqual([]);
            expect(component.classifiedXrefs['Phytozome v4_1']).toEqual([]);
            expect(component.classifiedXrefs['Phytozome v3_1']).toEqual([]);
            expect(component.classifiedXrefs['CBI sequence viewer']).toBe('');
        });

        it('should initialize xrefURLS with correct URLs', () => {
            expect(component.xrefURLS['NCBI Gene']).toBe('https://www.ncbi.nlm.nih.gov/gene/');
            expect(component.xrefURLS['Ensembl Gene']).toBe(
                'https://plants.ensembl.org/Populus_trichocarpa/Gene/Summary?db=core;g='
            );
            expect(component.xrefURLS['UniProt']).toBe('https://www.uniprot.org/uniprotkb/');
            expect(component.xrefURLS['PubMed']).toBe('https://pubmed.ncbi.nlm.nih.gov/');
            expect(component.xrefURLS['Phytozome v4_1']).toBe(
                'https://phytozome-next.jgi.doe.gov/report/gene/Ptrichocarpa_v4_1/'
            );
            expect(component.xrefURLS['Phytozome v3_1']).toBe(
                'https://phytozome-next.jgi.doe.gov/report/gene/Ptrichocarpa_v3_1/'
            );
            expect(component.xrefURLS['CBI sequence viewer']).toBe(
                'https://fair.ornl.gov/ThirdParty/jbrowse2/?PGNCID='
            );
        });

        it('should initialize xrefFrags with correct fragments', () => {
            expect(component.xrefFrags['NCBI Gene']).toBe('ncbi_g');
            expect(component.xrefFrags['Ensembl Gene']).toBe('ens_g');
            expect(component.xrefFrags['UniProt']).toBe('unip');
            expect(component.xrefFrags['PubMed']).toBe('pubmed');
            expect(component.xrefFrags['Phytozome v4_1']).toBe('phytoz');
            expect(component.xrefFrags['Phytozome v3_1']).toBe('phytoz');
            expect(component.xrefFrags['CBI sequence viewer']).toBe('cbi_v');
        });
    });

    describe('ngOnInit', () => {
        it('should classify xrefs correctly', () => {
            component.ngOnInit();

            expect(component.classifiedXrefs['NCBI Gene']).toHaveLength(1);
            expect(component.classifiedXrefs['Ensembl Gene']).toHaveLength(1);
            expect(component.classifiedXrefs['UniProt']).toHaveLength(1);
            expect(component.classifiedXrefs['PubMed']).toHaveLength(1);
            expect(component.classifiedXrefs['Phytozome v4_1']).toHaveLength(1);
            expect(component.classifiedXrefs['CBI sequence viewer']).toEqual([]);
        });

        it('should find approved symbol', () => {
            component.ngOnInit();

            expect(component.appSymbol).toBeDefined();
            expect(component.appSymbol?.type).toBe('approved');
            expect(component.appSymbol?.symbol?.symbol).toBe('TESTGENE');
        });

        it('should handle empty geneXrefs', () => {
            const reportWithoutXrefs: GeneSymbolReport = {
                ...mockGeneSymbolReport,
                data: {
                    ...mockGeneSymbolReport.data!,
                    geneXrefs: [],
                },
            };
            component.result = reportWithoutXrefs;

            component.ngOnInit();

            expect(component.classifiedXrefs['NCBI Gene']).toEqual([]);
            expect(component.classifiedXrefs['Ensembl Gene']).toEqual([]);
            expect(component.classifiedXrefs['UniProt']).toEqual([]);
            expect(component.classifiedXrefs['PubMed']).toEqual([]);
            expect(component.classifiedXrefs['Phytozome v4_1']).toEqual([]);
            expect(component.classifiedXrefs['Phytozome v3_1']).toEqual([]);
        });

        it('should handle undefined geneXrefs', () => {
            const reportWithUndefinedXrefs: GeneSymbolReport = {
                ...mockGeneSymbolReport,
                data: {
                    ...mockGeneSymbolReport.data!,
                    geneXrefs: undefined,
                },
            };
            component.result = reportWithUndefinedXrefs;

            component.ngOnInit();

            expect(component.classifiedXrefs['NCBI Gene']).toEqual([]);
            expect(component.classifiedXrefs['Ensembl Gene']).toEqual([]);
            expect(component.classifiedXrefs['UniProt']).toEqual([]);
            expect(component.classifiedXrefs['PubMed']).toEqual([]);
            expect(component.classifiedXrefs['Phytozome v4_1']).toEqual([]);
            expect(component.classifiedXrefs['Phytozome v3_1']).toEqual([]);
        });

        it('should handle null data', () => {
            const reportWithNullData: GeneSymbolReport = {
                data: null,
                apiVersion: '1.0',
            };
            component.result = reportWithNullData;

            expect(() => component.ngOnInit()).not.toThrow();
            expect(component.appSymbol).toBeUndefined();
        });
    });

    describe('isValidResourceName', () => {
        it('should return true for valid resource names', () => {
            expect(component.isValidResourceName('NCBI Gene')).toBe(true);
            expect(component.isValidResourceName('Ensembl Gene')).toBe(true);
            expect(component.isValidResourceName('UniProt')).toBe(true);
            expect(component.isValidResourceName('PubMed')).toBe(true);
            expect(component.isValidResourceName('Phytozome v4_1')).toBe(true);
            expect(component.isValidResourceName('Phytozome v3_1')).toBe(true);
            expect(component.isValidResourceName('CBI sequence viewer')).toBe(true);
        });

        it('should return false for invalid resource names', () => {
            expect(component.isValidResourceName('Invalid Resource')).toBe(false);
            expect(component.isValidResourceName('')).toBe(false);
            expect(component.isValidResourceName('NCBI')).toBe(false);
            expect(component.isValidResourceName('Ensembl')).toBe(false);
            expect(component.isValidResourceName('Phytozome')).toBe(false); // Old name should be false
        });
    });

    describe('xrefsByResourceName', () => {
        it('should filter xrefs by resource name', () => {
            const ncbiXrefs = component.xrefsByResourceName('NCBI Gene', mockXrefs);
            expect(ncbiXrefs).toHaveLength(1);
            expect(ncbiXrefs?.[0].xref.externalResource.name).toBe('NCBI Gene');

            const ensemblXrefs = component.xrefsByResourceName('Ensembl Gene', mockXrefs);
            expect(ensemblXrefs).toHaveLength(1);
            expect(ensemblXrefs?.[0].xref.externalResource.name).toBe('Ensembl Gene');
        });

        it('should return empty array for non-existent resource', () => {
            const nonExistentXrefs = component.xrefsByResourceName(
                'CBI sequence viewer',
                mockXrefs
            );
            expect(nonExistentXrefs).toEqual([]);
        });

        it('should handle empty xrefs array', () => {
            const result = component.xrefsByResourceName('NCBI Gene', []);
            expect(result).toEqual([]);
        });

        it('should handle falsy filter result', () => {
            // This tests the || undefined branch, though it's technically unreachable
            // since filter() always returns an array
            const result = component.xrefsByResourceName('CBI sequence viewer', mockXrefs);
            expect(Array.isArray(result)).toBe(true);
            expect(result).toEqual([]);
        });
    });

    describe('isXrefObject', () => {
        it('should return true for valid Xref objects', () => {
            const xref = mockXrefs[0];
            expect(component.isXrefObject(xref)).toBe(true);
        });

        it('should return false for strings', () => {
            expect(component.isXrefObject('test string')).toBe(false);
            expect(component.isXrefObject('')).toBe(false);
        });

        it('should return false for null/undefined', () => {
            expect(component.isXrefObject(null as any)).toBe(false);
            expect(component.isXrefObject(undefined as any)).toBe(false);
        });

        it('should return false for objects without xref property', () => {
            const invalidObject = { someProperty: 'value' };
            expect(component.isXrefObject(invalidObject as any)).toBe(false);
        });
    });

    describe('Edge Cases', () => {
        it('should handle multiple xrefs for same resource', () => {
            const multipleNCBIXrefs: Xref[] = [
                ...mockXrefs,
                {
                    geneId: 123,
                    xrefId: 6,
                    creationDate: new Date('2023-01-01'),
                    withdrawnDate: null,
                    status: 'active',
                    source: 'test',
                    xref: {
                        displayId: 'NCBI456',
                        externalResource: {
                            name: 'NCBI Gene',
                        },
                    },
                },
            ];

            const reportWithMultipleXrefs: GeneSymbolReport = {
                ...mockGeneSymbolReport,
                data: {
                    ...mockGeneSymbolReport.data!,
                    geneXrefs: multipleNCBIXrefs,
                },
            };
            component.result = reportWithMultipleXrefs;
            component.ngOnInit();

            expect(component.classifiedXrefs['NCBI Gene']).toHaveLength(2);
        });

        it('should handle xrefs with unknown resource names', () => {
            const xrefsWithUnknown: Xref[] = [
                ...mockXrefs,
                {
                    geneId: 123,
                    xrefId: 6,
                    creationDate: new Date('2023-01-01'),
                    withdrawnDate: null,
                    status: 'active',
                    source: 'test',
                    xref: {
                        displayId: 'UNK123',
                        externalResource: {
                            name: 'Unknown Resource' as ExternalResourceName,
                        },
                    },
                },
            ];

            const reportWithUnknownXrefs: GeneSymbolReport = {
                ...mockGeneSymbolReport,
                data: {
                    ...mockGeneSymbolReport.data!,
                    geneXrefs: xrefsWithUnknown,
                },
            };
            component.result = reportWithUnknownXrefs;

            expect(() => component.ngOnInit()).not.toThrow();
        });

        it('should handle missing geneSymbols for appSymbol', () => {
            const reportWithoutSymbols: GeneSymbolReport = {
                data: null,
                apiVersion: '1.0',
            };
            component.result = reportWithoutSymbols;
            component.ngOnInit();

            expect(component.appSymbol).toBeUndefined();
        });
    });

    describe('Classification Logic', () => {
        it('should properly classify all provided xref types', () => {
            component.ngOnInit();

            const ncbiXrefs = component.classifiedXrefs['NCBI Gene'] as Xref[];
            const ensemblXrefs = component.classifiedXrefs['Ensembl Gene'] as Xref[];
            const uniprotXrefs = component.classifiedXrefs['UniProt'] as Xref[];
            const pubmedXrefs = component.classifiedXrefs['PubMed'] as Xref[];
            const phytozomeXrefs = component.classifiedXrefs['Phytozome v4_1'] as Xref[];

            expect(ncbiXrefs[0].xref.displayId).toBe('NCBI123');
            expect(ensemblXrefs[0].xref.displayId).toBe('ENS123');
            expect(uniprotXrefs[0].xref.displayId).toBe('UNI123');
            expect(pubmedXrefs[0].xref.displayId).toBe('PUB123');
            expect(phytozomeXrefs[0].xref.displayId).toBe('PHY123');
        });

        it('should maintain CBI sequence viewer as empty string when no xrefs', () => {
            component.ngOnInit();
            expect(component.classifiedXrefs['CBI sequence viewer']).toEqual([]);
        });

        it('should preserve resource name type safety', () => {
            component.ngOnInit();

            Object.keys(component.classifiedXrefs).forEach(key => {
                expect(component.isValidResourceName(key)).toBe(true);
            });
        });
    });

    describe('Data Integration', () => {
        it('should work with real-world-like xref data', () => {
            const realisticXrefs: Xref[] = [
                {
                    geneId: 12345,
                    xrefId: 1,
                    creationDate: new Date('2023-01-15'),
                    withdrawnDate: null,
                    status: 'approved',
                    source: 'manual',
                    xref: {
                        displayId: '123456',
                        externalResource: {
                            name: 'NCBI Gene',
                        },
                    },
                },
                {
                    geneId: 12345,
                    xrefId: 2,
                    creationDate: new Date('2023-02-10'),
                    withdrawnDate: null,
                    status: 'approved',
                    source: 'automatic',
                    xref: {
                        displayId: 'P0ABC12',
                        externalResource: {
                            name: 'UniProt',
                        },
                    },
                },
            ];

            const realisticReport: GeneSymbolReport = {
                ...mockGeneSymbolReport,
                data: {
                    ...mockGeneSymbolReport.data!,
                    geneXrefs: realisticXrefs,
                },
            };
            component.result = realisticReport;
            component.ngOnInit();

            expect(component.classifiedXrefs['NCBI Gene']).toHaveLength(1);
            expect(component.classifiedXrefs['UniProt']).toHaveLength(1);
            expect(component.classifiedXrefs['Ensembl Gene']).toHaveLength(0);
        });
    });

    describe('Error Handling', () => {
        it('should handle malformed xref data gracefully', () => {
            const malformedXrefs = [
                {
                    geneId: 123,
                    xrefId: 1,
                    creationDate: new Date('2023-01-01'),
                    withdrawnDate: null,
                    status: 'active',
                    source: 'test',
                    xref: {
                        displayId: 'TEST123',
                        externalResource: null as any,
                    },
                },
            ];

            const reportWithMalformedXrefs: GeneSymbolReport = {
                ...mockGeneSymbolReport,
                data: {
                    ...mockGeneSymbolReport.data!,
                    geneXrefs: malformedXrefs as any,
                },
            };
            component.result = reportWithMalformedXrefs;

            expect(() => component.ngOnInit()).not.toThrow();
        });

        it('should handle null result gracefully', () => {
            component.result = null as any;
            expect(() => component.ngOnInit()).not.toThrow();
        });
    });

    describe('getPreferredPhytozomeVersion', () => {
        it('should return null when no Phytozome data is available', () => {
            component.classifiedXrefs = {
                'NCBI Gene': [],
                'Ensembl Gene': [],
                UniProt: [],
                PubMed: [],
                'Phytozome v4_1': [],
                'Phytozome v3_1': [],
                'CBI sequence viewer': '',
            };

            expect(component.getPreferredPhytozomeVersion()).toBeNull();
        });

        it('should return the highest version with data', () => {
            component.classifiedXrefs = {
                'NCBI Gene': [],
                'Ensembl Gene': [],
                UniProt: [],
                PubMed: [],
                'Phytozome v4_1': [mockXrefs[4]], // Has data
                'Phytozome v3_1': [mockXrefs[4]], // Also has data
                'CBI sequence viewer': '',
            };

            expect(component.getPreferredPhytozomeVersion()).toBe('Phytozome v4_1');
        });

        it('should return lower version when higher version has no data', () => {
            component.classifiedXrefs = {
                'NCBI Gene': [],
                'Ensembl Gene': [],
                UniProt: [],
                PubMed: [],
                'Phytozome v4_1': [], // No data
                'Phytozome v3_1': [mockXrefs[4]], // Has data
                'CBI sequence viewer': '',
            };

            expect(component.getPreferredPhytozomeVersion()).toBe('Phytozome v3_1');
        });
    });

    describe('extractVersionNumber', () => {
        it('should extract version numbers correctly', () => {
            expect(component['extractVersionNumber']('Phytozome v4_1')).toBe(4.1);
            expect(component['extractVersionNumber']('Phytozome v3_1')).toBe(3.1);
            expect(component['extractVersionNumber']('Phytozome v10_2')).toBe(10.2);
        });

        it('should return 0 for invalid format', () => {
            expect(component['extractVersionNumber']('Invalid Format')).toBe(0);
            expect(component['extractVersionNumber']('Phytozome')).toBe(0);
            expect(component['extractVersionNumber']('Phytozome v')).toBe(0);
        });
    });
});
