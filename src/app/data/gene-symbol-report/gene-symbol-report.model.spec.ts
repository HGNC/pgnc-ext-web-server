import { GeneLocation } from './gene-location.model';
import { GeneName } from './gene-name.model';
import { GeneSymbol } from './gene-symbol.model';
import { GeneSymbolReport } from './gene-symbol-report.model';
import { Xref } from './xref-resources/xref-resources.model';

describe('GeneSymbolReport Model', () => {
    describe('Interface Structure', () => {
        it('should define GeneSymbolReport interface correctly', () => {
            const report: GeneSymbolReport = {
                data: {
                    id: 12345,
                    creationDate: new Date('2023-01-15'),
                    modDate: new Date('2023-06-01'),
                    withdrawnDate: null,
                    status: 'active',
                    species: {
                        commonName: 'Human',
                        scientificName: 'Homo sapiens',
                    },
                    geneNames: [
                        {
                            creationDate: new Date('2023-01-15'),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            name: {
                                name: 'tumor protein p53',
                            },
                        },
                    ],
                    geneSymbols: [
                        {
                            creationDate: new Date('2023-01-15'),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            symbol: {
                                symbol: 'TP53',
                            },
                        },
                    ],
                    geneLocusTypes: null,
                    geneNotes: null,
                    geneReplacements: null,
                    genesReplaced: null,
                    geneXrefs: undefined,
                    geneLocations: null,
                    primaryId: null,
                    primaryIdSource: null,
                },
                apiVersion: '1.0.0',
            };

            expect(report).toBeDefined();
            expect(report.data).toBeDefined();
            expect(report.data?.id).toBe(12345);
            expect(report.apiVersion).toBe('1.0.0');
        });

        it('should handle null data', () => {
            const report: GeneSymbolReport = {
                data: null,
                apiVersion: '1.0.0',
            };

            expect(report.data).toBeNull();
            expect(report.apiVersion).toBe('1.0.0');
        });
    });

    describe('Gene Data Core Fields', () => {
        it('should handle basic gene information', () => {
            const report: GeneSymbolReport = {
                data: {
                    id: 7157, // TP53 gene ID
                    creationDate: new Date('1986-01-01'),
                    modDate: new Date('2023-01-01'),
                    withdrawnDate: null,
                    status: 'approved',
                    species: {
                        commonName: 'Human',
                        scientificName: 'Homo sapiens',
                    },
                    geneNames: [
                        {
                            creationDate: new Date('1986-01-01'),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            name: { name: 'tumor protein p53' },
                        },
                    ],
                    geneSymbols: [
                        {
                            creationDate: new Date('1986-01-01'),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            symbol: { symbol: 'TP53' },
                        },
                    ],
                    geneLocusTypes: null,
                    geneNotes: null,
                    geneReplacements: null,
                    genesReplaced: null,
                    geneXrefs: undefined,
                    geneLocations: null,
                    primaryId: null,
                    primaryIdSource: null,
                },
                apiVersion: '1.0.0',
            };

            expect(report.data?.id).toBe(7157);
            expect(report.data?.status).toBe('approved');
            expect(report.data?.species.commonName).toBe('Human');
            expect(report.data?.species.scientificName).toBe('Homo sapiens');
        });

        it('should handle withdrawn genes', () => {
            const report: GeneSymbolReport = {
                data: {
                    id: 99999,
                    creationDate: new Date('2020-01-01'),
                    modDate: new Date('2022-01-01'),
                    withdrawnDate: new Date('2023-01-01'),
                    status: 'withdrawn',
                    species: {
                        commonName: 'Human',
                        scientificName: 'Homo sapiens',
                    },
                    geneNames: [
                        {
                            creationDate: new Date('2020-01-01'),
                            modDate: null,
                            withdrawnDate: new Date('2023-01-01'),
                            type: 'withdrawn',
                            name: { name: 'obsolete gene name' },
                        },
                    ],
                    geneSymbols: [
                        {
                            creationDate: new Date('2020-01-01'),
                            modDate: null,
                            withdrawnDate: new Date('2023-01-01'),
                            type: 'withdrawn',
                            symbol: { symbol: 'OBSLT' },
                        },
                    ],
                    geneLocusTypes: null,
                    geneNotes: null,
                    geneReplacements: null,
                    genesReplaced: null,
                    geneXrefs: undefined,
                    geneLocations: null,
                    primaryId: null,
                    primaryIdSource: null,
                },
                apiVersion: '1.0.0',
            };

            expect(report.data?.status).toBe('withdrawn');
            expect(report.data?.withdrawnDate).toEqual(new Date('2023-01-01'));
            expect(report.data?.geneNames[0].type).toBe('withdrawn');
            expect(report.data?.geneSymbols[0].type).toBe('withdrawn');
        });
    });

    describe('Species Information', () => {
        it('should handle human species', () => {
            const report: GeneSymbolReport = {
                data: {
                    id: 1,
                    creationDate: new Date(),
                    modDate: null,
                    withdrawnDate: null,
                    status: 'active',
                    species: {
                        commonName: 'Human',
                        scientificName: 'Homo sapiens',
                    },
                    geneNames: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            name: { name: 'test' },
                        },
                    ],
                    geneSymbols: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            symbol: { symbol: 'TEST' },
                        },
                    ],
                    geneLocusTypes: null,
                    geneNotes: null,
                    geneReplacements: null,
                    genesReplaced: null,
                    geneXrefs: undefined,
                    geneLocations: null,
                    primaryId: null,
                    primaryIdSource: null,
                },
                apiVersion: '1.0.0',
            };

            expect(report.data?.species.commonName).toBe('Human');
            expect(report.data?.species.scientificName).toBe('Homo sapiens');
        });

        it('should handle mouse species', () => {
            const report: GeneSymbolReport = {
                data: {
                    id: 1,
                    creationDate: new Date(),
                    modDate: null,
                    withdrawnDate: null,
                    status: 'active',
                    species: {
                        commonName: 'Mouse',
                        scientificName: 'Mus musculus',
                    },
                    geneNames: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            name: { name: 'test' },
                        },
                    ],
                    geneSymbols: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            symbol: { symbol: 'Test' },
                        },
                    ],
                    geneLocusTypes: null,
                    geneNotes: null,
                    geneReplacements: null,
                    genesReplaced: null,
                    geneXrefs: undefined,
                    geneLocations: null,
                    primaryId: null,
                    primaryIdSource: null,
                },
                apiVersion: '1.0.0',
            };

            expect(report.data?.species.commonName).toBe('Mouse');
            expect(report.data?.species.scientificName).toBe('Mus musculus');
        });
    });

    describe('Gene Names Integration', () => {
        it('should handle multiple gene names', () => {
            const geneNames: [GeneName] = [
                {
                    creationDate: new Date('2023-01-01'),
                    modDate: null,
                    withdrawnDate: null,
                    type: 'approved',
                    name: { name: 'tumor protein p53' },
                },
            ];

            const report: GeneSymbolReport = {
                data: {
                    id: 7157,
                    creationDate: new Date(),
                    modDate: null,
                    withdrawnDate: null,
                    status: 'active',
                    species: { commonName: 'Human', scientificName: 'Homo sapiens' },
                    geneNames,
                    geneSymbols: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            symbol: { symbol: 'TP53' },
                        },
                    ],
                    geneLocusTypes: null,
                    geneNotes: null,
                    geneReplacements: null,
                    genesReplaced: null,
                    geneXrefs: undefined,
                    geneLocations: null,
                    primaryId: null,
                    primaryIdSource: null,
                },
                apiVersion: '1.0.0',
            };

            expect(report.data?.geneNames).toBe(geneNames);
            expect(report.data?.geneNames[0].name.name).toBe('tumor protein p53');
            expect(report.data?.geneNames[0].type).toBe('approved');
        });
    });

    describe('Gene Symbols Integration', () => {
        it('should handle gene symbols', () => {
            const geneSymbols: [GeneSymbol] = [
                {
                    creationDate: new Date('2023-01-01'),
                    modDate: null,
                    withdrawnDate: null,
                    type: 'approved',
                    symbol: { symbol: 'TP53' },
                },
            ];

            const report: GeneSymbolReport = {
                data: {
                    id: 7157,
                    creationDate: new Date(),
                    modDate: null,
                    withdrawnDate: null,
                    status: 'active',
                    species: { commonName: 'Human', scientificName: 'Homo sapiens' },
                    geneNames: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            name: { name: 'tumor protein p53' },
                        },
                    ],
                    geneSymbols,
                    geneLocusTypes: null,
                    geneNotes: null,
                    geneReplacements: null,
                    genesReplaced: null,
                    geneXrefs: undefined,
                    geneLocations: null,
                    primaryId: null,
                    primaryIdSource: null,
                },
                apiVersion: '1.0.0',
            };

            expect(report.data?.geneSymbols).toBe(geneSymbols);
            expect(report.data?.geneSymbols[0].symbol.symbol).toBe('TP53');
            expect(report.data?.geneSymbols[0].type).toBe('approved');
        });
    });

    describe('Gene Locus Types', () => {
        it('should handle null gene locus types', () => {
            const report: GeneSymbolReport = {
                data: {
                    id: 1,
                    creationDate: new Date(),
                    modDate: null,
                    withdrawnDate: null,
                    status: 'active',
                    species: { commonName: 'Human', scientificName: 'Homo sapiens' },
                    geneNames: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            name: { name: 'test' },
                        },
                    ],
                    geneSymbols: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            symbol: { symbol: 'TEST' },
                        },
                    ],
                    geneLocusTypes: null,
                    geneNotes: null,
                    geneReplacements: null,
                    genesReplaced: null,
                    geneXrefs: undefined,
                    geneLocations: null,
                    primaryId: null,
                    primaryIdSource: null,
                },
                apiVersion: '1.0.0',
            };

            expect(report.data?.geneLocusTypes).toBeNull();
        });

        it('should handle gene locus types array', () => {
            const geneLocusTypes: [
                {
                    creationDate: Date;
                    modDate: Date | null;
                    withdrawnDate: Date | null;
                    locusType: { name: string; locusGroup: { name: string } };
                },
            ] = [
                {
                    creationDate: new Date('2023-01-01'),
                    modDate: null,
                    withdrawnDate: null,
                    locusType: {
                        name: 'protein coding gene',
                        locusGroup: {
                            name: 'protein coding',
                        },
                    },
                },
            ];

            const report: GeneSymbolReport = {
                data: {
                    id: 7157,
                    creationDate: new Date(),
                    modDate: null,
                    withdrawnDate: null,
                    status: 'active',
                    species: { commonName: 'Human', scientificName: 'Homo sapiens' },
                    geneNames: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            name: { name: 'tumor protein p53' },
                        },
                    ],
                    geneSymbols: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            symbol: { symbol: 'TP53' },
                        },
                    ],
                    geneLocusTypes,
                    geneNotes: null,
                    geneReplacements: null,
                    genesReplaced: null,
                    geneXrefs: undefined,
                    geneLocations: null,
                    primaryId: null,
                    primaryIdSource: null,
                },
                apiVersion: '1.0.0',
            };

            expect(report.data?.geneLocusTypes).toBe(geneLocusTypes);
            expect(report.data?.geneLocusTypes?.[0].locusType.name).toBe('protein coding gene');
            expect(report.data?.geneLocusTypes?.[0].locusType.locusGroup.name).toBe(
                'protein coding'
            );
        });
    });

    describe('Gene Notes', () => {
        it('should handle null gene notes', () => {
            const report: GeneSymbolReport = {
                data: {
                    id: 1,
                    creationDate: new Date(),
                    modDate: null,
                    withdrawnDate: null,
                    status: 'active',
                    species: { commonName: 'Human', scientificName: 'Homo sapiens' },
                    geneNames: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            name: { name: 'test' },
                        },
                    ],
                    geneSymbols: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            symbol: { symbol: 'TEST' },
                        },
                    ],
                    geneLocusTypes: null,
                    geneNotes: null,
                    geneReplacements: null,
                    genesReplaced: null,
                    geneXrefs: undefined,
                    geneLocations: null,
                    primaryId: null,
                    primaryIdSource: null,
                },
                apiVersion: '1.0.0',
            };

            expect(report.data?.geneNotes).toBeNull();
        });

        it('should handle gene notes array', () => {
            const geneNotes: [
                {
                    creationDate: Date;
                    modDate: Date | null;
                    withdrawnDate: Date | null;
                    note: { note: string };
                },
            ] = [
                {
                    creationDate: new Date('2023-01-01'),
                    modDate: new Date('2023-06-01'),
                    withdrawnDate: null,
                    note: {
                        note: 'This gene encodes a tumor suppressor protein',
                    },
                },
            ];

            const report: GeneSymbolReport = {
                data: {
                    id: 7157,
                    creationDate: new Date(),
                    modDate: null,
                    withdrawnDate: null,
                    status: 'active',
                    species: { commonName: 'Human', scientificName: 'Homo sapiens' },
                    geneNames: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            name: { name: 'tumor protein p53' },
                        },
                    ],
                    geneSymbols: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            symbol: { symbol: 'TP53' },
                        },
                    ],
                    geneLocusTypes: null,
                    geneNotes,
                    geneReplacements: null,
                    genesReplaced: null,
                    geneXrefs: undefined,
                    geneLocations: null,
                    primaryId: null,
                    primaryIdSource: null,
                },
                apiVersion: '1.0.0',
            };

            expect(report.data?.geneNotes).toBe(geneNotes);
            expect(report.data?.geneNotes?.[0].note.note).toBe(
                'This gene encodes a tumor suppressor protein'
            );
        });
    });

    describe('Gene Replacements', () => {
        it('should handle null gene replacements', () => {
            const report: GeneSymbolReport = {
                data: {
                    id: 1,
                    creationDate: new Date(),
                    modDate: null,
                    withdrawnDate: null,
                    status: 'active',
                    species: { commonName: 'Human', scientificName: 'Homo sapiens' },
                    geneNames: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            name: { name: 'test' },
                        },
                    ],
                    geneSymbols: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            symbol: { symbol: 'TEST' },
                        },
                    ],
                    geneLocusTypes: null,
                    geneNotes: null,
                    geneReplacements: null,
                    genesReplaced: null,
                    geneXrefs: undefined,
                    geneLocations: null,
                    primaryId: null,
                    primaryIdSource: null,
                },
                apiVersion: '1.0.0',
            };

            expect(report.data?.geneReplacements).toBeNull();
            expect(report.data?.genesReplaced).toBeNull();
        });

        it('should handle gene replacements arrays', () => {
            const geneReplacements: [{ replacementId: number; date: Date }] = [
                {
                    replacementId: 54321,
                    date: new Date('2023-01-01'),
                },
            ];

            const genesReplaced: [{ previousId: number; date: Date }] = [
                {
                    previousId: 98765,
                    date: new Date('2022-12-31'),
                },
            ];

            const report: GeneSymbolReport = {
                data: {
                    id: 12345,
                    creationDate: new Date(),
                    modDate: null,
                    withdrawnDate: null,
                    status: 'active',
                    species: { commonName: 'Human', scientificName: 'Homo sapiens' },
                    geneNames: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            name: { name: 'test gene' },
                        },
                    ],
                    geneSymbols: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            symbol: { symbol: 'TESTG' },
                        },
                    ],
                    geneLocusTypes: null,
                    geneNotes: null,
                    geneReplacements,
                    genesReplaced,
                    geneXrefs: undefined,
                    geneLocations: null,
                    primaryId: null,
                    primaryIdSource: null,
                },
                apiVersion: '1.0.0',
            };

            expect(report.data?.geneReplacements).toBe(geneReplacements);
            expect(report.data?.genesReplaced).toBe(genesReplaced);
            expect(report.data?.geneReplacements?.[0].replacementId).toBe(54321);
            expect(report.data?.genesReplaced?.[0].previousId).toBe(98765);
        });
    });

    describe('Gene Xrefs Integration', () => {
        it('should handle undefined gene xrefs', () => {
            const report: GeneSymbolReport = {
                data: {
                    id: 1,
                    creationDate: new Date(),
                    modDate: null,
                    withdrawnDate: null,
                    status: 'active',
                    species: { commonName: 'Human', scientificName: 'Homo sapiens' },
                    geneNames: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            name: { name: 'test' },
                        },
                    ],
                    geneSymbols: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            symbol: { symbol: 'TEST' },
                        },
                    ],
                    geneLocusTypes: null,
                    geneNotes: null,
                    geneReplacements: null,
                    genesReplaced: null,
                    geneXrefs: undefined,
                    geneLocations: null,
                    primaryId: null,
                    primaryIdSource: null,
                },
                apiVersion: '1.0.0',
            };

            expect(report.data?.geneXrefs).toBeUndefined();
        });

        it('should handle gene xrefs array', () => {
            const geneXrefs: Xref[] = [
                {
                    geneId: 7157,
                    xrefId: 1,
                    creationDate: new Date('2023-01-01'),
                    withdrawnDate: null,
                    status: 'active',
                    source: 'automatic',
                    xref: {
                        displayId: 'NCBI:7157',
                        externalResource: { name: 'NCBI Gene' },
                    },
                },
                {
                    geneId: 7157,
                    xrefId: 2,
                    creationDate: new Date('2023-01-01'),
                    withdrawnDate: null,
                    status: 'active',
                    source: 'automatic',
                    xref: {
                        displayId: 'P04637',
                        externalResource: { name: 'UniProt' },
                    },
                },
            ];

            const report: GeneSymbolReport = {
                data: {
                    id: 7157,
                    creationDate: new Date(),
                    modDate: null,
                    withdrawnDate: null,
                    status: 'active',
                    species: { commonName: 'Human', scientificName: 'Homo sapiens' },
                    geneNames: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            name: { name: 'tumor protein p53' },
                        },
                    ],
                    geneSymbols: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            symbol: { symbol: 'TP53' },
                        },
                    ],
                    geneLocusTypes: null,
                    geneNotes: null,
                    geneReplacements: null,
                    genesReplaced: null,
                    geneXrefs,
                    geneLocations: null,
                    primaryId: null,
                    primaryIdSource: null,
                },
                apiVersion: '1.0.0',
            };

            expect(report.data?.geneXrefs).toBe(geneXrefs);
            expect(report.data?.geneXrefs).toHaveLength(2);
            expect(report.data?.geneXrefs?.[0].xref.externalResource.name).toBe('NCBI Gene');
            expect(report.data?.geneXrefs?.[1].xref.externalResource.name).toBe('UniProt');
        });
    });

    describe('Gene Locations Integration', () => {
        it('should handle null gene locations', () => {
            const report: GeneSymbolReport = {
                data: {
                    id: 1,
                    creationDate: new Date(),
                    modDate: null,
                    withdrawnDate: null,
                    status: 'active',
                    species: { commonName: 'Human', scientificName: 'Homo sapiens' },
                    geneNames: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            name: { name: 'test' },
                        },
                    ],
                    geneSymbols: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            symbol: { symbol: 'TEST' },
                        },
                    ],
                    geneLocusTypes: null,
                    geneNotes: null,
                    geneReplacements: null,
                    genesReplaced: null,
                    geneXrefs: undefined,
                    geneLocations: null,
                    primaryId: null,
                    primaryIdSource: null,
                },
                apiVersion: '1.0.0',
            };

            expect(report.data?.geneLocations).toBeNull();
        });

        it('should handle gene locations array', () => {
            const geneLocations: [GeneLocation] = [
                {
                    creationDate: new Date('2023-01-01'),
                    withdrawnDate: null,
                    location: {
                        name: '17p13.1',
                        refseqAccession: 'NC_000017.11',
                        genbankAccession: 'CM000679.2',
                        coordSystem: 'GRCh38',
                        type: 'genomic',
                    },
                },
            ];

            const report: GeneSymbolReport = {
                data: {
                    id: 7157,
                    creationDate: new Date(),
                    modDate: null,
                    withdrawnDate: null,
                    status: 'active',
                    species: { commonName: 'Human', scientificName: 'Homo sapiens' },
                    geneNames: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            name: { name: 'tumor protein p53' },
                        },
                    ],
                    geneSymbols: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            symbol: { symbol: 'TP53' },
                        },
                    ],
                    geneLocusTypes: null,
                    geneNotes: null,
                    geneReplacements: null,
                    genesReplaced: null,
                    geneXrefs: undefined,
                    geneLocations,
                    primaryId: null,
                    primaryIdSource: null,
                },
                apiVersion: '1.0.0',
            };

            expect(report.data?.geneLocations).toBe(geneLocations);
            expect(report.data?.geneLocations?.[0].location.name).toBe('17p13.1');
            expect(report.data?.geneLocations?.[0].location.coordSystem).toBe('GRCh38');
        });
    });

    describe('Primary ID Fields', () => {
        it('should handle null primary ID fields', () => {
            const report: GeneSymbolReport = {
                data: {
                    id: 1,
                    creationDate: new Date(),
                    modDate: null,
                    withdrawnDate: null,
                    status: 'active',
                    species: { commonName: 'Human', scientificName: 'Homo sapiens' },
                    geneNames: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            name: { name: 'test' },
                        },
                    ],
                    geneSymbols: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            symbol: { symbol: 'TEST' },
                        },
                    ],
                    geneLocusTypes: null,
                    geneNotes: null,
                    geneReplacements: null,
                    genesReplaced: null,
                    geneXrefs: undefined,
                    geneLocations: null,
                    primaryId: null,
                    primaryIdSource: null,
                },
                apiVersion: '1.0.0',
            };

            expect(report.data?.primaryId).toBeNull();
            expect(report.data?.primaryIdSource).toBeNull();
        });

        it('should handle primary ID with source', () => {
            const report: GeneSymbolReport = {
                data: {
                    id: 7157,
                    creationDate: new Date(),
                    modDate: null,
                    withdrawnDate: null,
                    status: 'active',
                    species: { commonName: 'Human', scientificName: 'Homo sapiens' },
                    geneNames: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            name: { name: 'tumor protein p53' },
                        },
                    ],
                    geneSymbols: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            symbol: { symbol: 'TP53' },
                        },
                    ],
                    geneLocusTypes: null,
                    geneNotes: null,
                    geneReplacements: null,
                    genesReplaced: null,
                    geneXrefs: undefined,
                    geneLocations: null,
                    primaryId: 'HGNC:11998',
                    primaryIdSource: 'HGNC',
                },
                apiVersion: '1.0.0',
            };

            expect(report.data?.primaryId).toBe('HGNC:11998');
            expect(report.data?.primaryIdSource).toBe('HGNC');
        });
    });

    describe('API Version', () => {
        it('should handle different API versions', () => {
            const versions = ['1.0.0', '1.1.0', '2.0.0', 'v1', 'beta'];

            versions.forEach(version => {
                const report: GeneSymbolReport = {
                    data: null,
                    apiVersion: version,
                };

                expect(report.apiVersion).toBe(version);
            });
        });
    });

    describe('Date Handling', () => {
        it('should handle date chronology properly', () => {
            const creationDate = new Date('2020-01-01');
            const modDate = new Date('2022-01-01');
            const withdrawnDate = new Date('2023-01-01');

            const report: GeneSymbolReport = {
                data: {
                    id: 1,
                    creationDate,
                    modDate,
                    withdrawnDate,
                    status: 'withdrawn',
                    species: { commonName: 'Human', scientificName: 'Homo sapiens' },
                    geneNames: [
                        {
                            creationDate,
                            modDate,
                            withdrawnDate,
                            type: 'withdrawn',
                            name: { name: 'test' },
                        },
                    ],
                    geneSymbols: [
                        {
                            creationDate,
                            modDate,
                            withdrawnDate,
                            type: 'withdrawn',
                            symbol: { symbol: 'TEST' },
                        },
                    ],
                    geneLocusTypes: null,
                    geneNotes: null,
                    geneReplacements: null,
                    genesReplaced: null,
                    geneXrefs: undefined,
                    geneLocations: null,
                    primaryId: null,
                    primaryIdSource: null,
                },
                apiVersion: '1.0.0',
            };

            expect(report.data!.creationDate.getTime()).toBeLessThan(
                report.data!.modDate!.getTime()
            );
            expect(report.data!.modDate!.getTime()).toBeLessThan(
                report.data!.withdrawnDate!.getTime()
            );
        });
    });

    describe('Complex Integration', () => {
        it('should handle complete gene report with all fields', () => {
            const report: GeneSymbolReport = {
                data: {
                    id: 7157,
                    creationDate: new Date('1986-01-01'),
                    modDate: new Date('2023-01-01'),
                    withdrawnDate: null,
                    status: 'approved',
                    species: {
                        commonName: 'Human',
                        scientificName: 'Homo sapiens',
                    },
                    geneNames: [
                        {
                            creationDate: new Date('1986-01-01'),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            name: { name: 'tumor protein p53' },
                        },
                    ],
                    geneSymbols: [
                        {
                            creationDate: new Date('1986-01-01'),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            symbol: { symbol: 'TP53' },
                        },
                    ],
                    geneLocusTypes: [
                        {
                            creationDate: new Date('1986-01-01'),
                            modDate: null,
                            withdrawnDate: null,
                            locusType: {
                                name: 'protein coding gene',
                                locusGroup: { name: 'protein coding' },
                            },
                        },
                    ],
                    geneNotes: [
                        {
                            creationDate: new Date('2000-01-01'),
                            modDate: null,
                            withdrawnDate: null,
                            note: { note: 'Guardian of the genome' },
                        },
                    ],
                    geneReplacements: null,
                    genesReplaced: null,
                    geneXrefs: [
                        {
                            geneId: 7157,
                            xrefId: 1,
                            creationDate: new Date('2000-01-01'),
                            withdrawnDate: null,
                            status: 'active',
                            source: 'automatic',
                            xref: {
                                displayId: 'NCBI:7157',
                                externalResource: { name: 'NCBI Gene' },
                            },
                        },
                    ],
                    geneLocations: [
                        {
                            creationDate: new Date('1986-01-01'),
                            withdrawnDate: null,
                            location: {
                                name: '17p13.1',
                                refseqAccession: 'NC_000017.11',
                                genbankAccession: 'CM000679.2',
                                coordSystem: 'GRCh38',
                                type: 'genomic',
                            },
                        },
                    ],
                    primaryId: 'HGNC:11998',
                    primaryIdSource: 'HGNC',
                },
                apiVersion: '1.0.0',
            };

            expect(report.data?.id).toBe(7157);
            expect(report.data?.geneSymbols[0].symbol.symbol).toBe('TP53');
            expect(report.data?.geneNames[0].name.name).toBe('tumor protein p53');
            expect(report.data?.geneLocations?.[0].location.name).toBe('17p13.1');
            expect(report.data?.geneXrefs?.[0].xref.displayId).toBe('NCBI:7157');
            expect(report.data?.primaryId).toBe('HGNC:11998');
        });
    });

    describe('Type Safety', () => {
        it('should enforce type constraints', () => {
            const report: GeneSymbolReport = {
                data: {
                    id: 12345,
                    creationDate: new Date(),
                    modDate: null,
                    withdrawnDate: null,
                    status: 'active',
                    species: {
                        commonName: 'Human',
                        scientificName: 'Homo sapiens',
                    },
                    geneNames: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            name: { name: 'test gene' },
                        },
                    ],
                    geneSymbols: [
                        {
                            creationDate: new Date(),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            symbol: { symbol: 'TESTG' },
                        },
                    ],
                    geneLocusTypes: null,
                    geneNotes: null,
                    geneReplacements: null,
                    genesReplaced: null,
                    geneXrefs: undefined,
                    geneLocations: null,
                    primaryId: null,
                    primaryIdSource: null,
                },
                apiVersion: '1.0.0',
            };

            // Verify types
            expect(typeof report.data?.id).toBe('number');
            expect(report.data?.creationDate instanceof Date).toBe(true);
            expect(typeof report.data?.status).toBe('string');
            expect(typeof report.data?.species.commonName).toBe('string');
            expect(Array.isArray(report.data?.geneNames)).toBe(true);
            expect(Array.isArray(report.data?.geneSymbols)).toBe(true);
            expect(typeof report.apiVersion).toBe('string');
        });
    });

    describe('JSON Serialization', () => {
        it('should serialize and deserialize correctly', () => {
            const originalReport: GeneSymbolReport = {
                data: {
                    id: 7157,
                    creationDate: new Date('2023-01-01T10:00:00Z'),
                    modDate: null,
                    withdrawnDate: null,
                    status: 'active',
                    species: { commonName: 'Human', scientificName: 'Homo sapiens' },
                    geneNames: [
                        {
                            creationDate: new Date('2023-01-01'),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            name: { name: 'tumor protein p53' },
                        },
                    ],
                    geneSymbols: [
                        {
                            creationDate: new Date('2023-01-01'),
                            modDate: null,
                            withdrawnDate: null,
                            type: 'approved',
                            symbol: { symbol: 'TP53' },
                        },
                    ],
                    geneLocusTypes: null,
                    geneNotes: null,
                    geneReplacements: null,
                    genesReplaced: null,
                    geneXrefs: undefined,
                    geneLocations: null,
                    primaryId: 'HGNC:11998',
                    primaryIdSource: 'HGNC',
                },
                apiVersion: '1.0.0',
            };

            const jsonString = JSON.stringify(originalReport);
            const parsed = JSON.parse(jsonString);

            expect(parsed.data.id).toBe(7157);
            expect(parsed.data.status).toBe('active');
            expect(parsed.data.species.commonName).toBe('Human');
            expect(parsed.data.primaryId).toBe('HGNC:11998');
            expect(parsed.apiVersion).toBe('1.0.0');
            // Note: Dates become strings in JSON
            expect(parsed.data.creationDate).toBe('2023-01-01T10:00:00.000Z');
        });
    });
});
