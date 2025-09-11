import { ExternalResourceName } from './external-resource-name.type';
import { XrefData } from './xref-data.model';

describe('XrefData Model', () => {
    describe('Interface Structure', () => {
        it('should define XrefData interface correctly', () => {
            const xrefData: XrefData = {
                displayId: 'XR-123456',
                externalResource: {
                    name: 'NCBI Gene',
                },
            };

            expect(xrefData).toBeDefined();
            expect(xrefData.displayId).toBe('XR-123456');
            expect(xrefData.externalResource.name).toBe('NCBI Gene');
        });

        it('should accept all required fields', () => {
            const xrefData: XrefData = {
                displayId: 'TEST-001',
                externalResource: {
                    name: 'UniProt',
                },
            };

            expect(xrefData.displayId).toBe('TEST-001');
            expect(xrefData.externalResource.name).toBe('UniProt');
        });
    });

    describe('NCBI Gene References', () => {
        it('should create NCBI Gene xref', () => {
            const xrefData: XrefData = {
                displayId: 'NCBI-12345',
                externalResource: {
                    name: 'NCBI Gene',
                },
            };

            expect(xrefData.displayId).toBe('NCBI-12345');
            expect(xrefData.externalResource.name).toBe('NCBI Gene');
        });

        it('should handle different NCBI formats', () => {
            const numericXref: XrefData = {
                displayId: '123456',
                externalResource: { name: 'NCBI Gene' },
            };

            const prefixedXref: XrefData = {
                displayId: 'GeneID:123456',
                externalResource: { name: 'NCBI Gene' },
            };

            expect(numericXref.displayId).toBe('123456');
            expect(prefixedXref.displayId).toBe('GeneID:123456');
            expect(numericXref.externalResource.name).toBe('NCBI Gene');
            expect(prefixedXref.externalResource.name).toBe('NCBI Gene');
        });
    });

    describe('Ensembl Gene References', () => {
        it('should create Ensembl Gene xref', () => {
            const xrefData: XrefData = {
                displayId: 'ENSG00000139618',
                externalResource: {
                    name: 'Ensembl Gene',
                },
            };

            expect(xrefData.displayId).toBe('ENSG00000139618');
            expect(xrefData.externalResource.name).toBe('Ensembl Gene');
        });

        it('should handle Ensembl ID formats', () => {
            const humanGene: XrefData = {
                displayId: 'ENSG00000139618',
                externalResource: { name: 'Ensembl Gene' },
            };

            const mouseGene: XrefData = {
                displayId: 'ENSMUSG00000020122',
                externalResource: { name: 'Ensembl Gene' },
            };

            expect(humanGene.displayId.startsWith('ENSG')).toBe(true);
            expect(mouseGene.displayId.startsWith('ENSMUSG')).toBe(true);
            expect(humanGene.externalResource.name).toBe('Ensembl Gene');
            expect(mouseGene.externalResource.name).toBe('Ensembl Gene');
        });
    });

    describe('UniProt References', () => {
        it('should create UniProt xref', () => {
            const xrefData: XrefData = {
                displayId: 'P04637',
                externalResource: {
                    name: 'UniProt',
                },
            };

            expect(xrefData.displayId).toBe('P04637');
            expect(xrefData.externalResource.name).toBe('UniProt');
        });

        it('should handle different UniProt formats', () => {
            const swissProtId: XrefData = {
                displayId: 'P04637',
                externalResource: { name: 'UniProt' },
            };

            const tremblId: XrefData = {
                displayId: 'Q9Y6K9',
                externalResource: { name: 'UniProt' },
            };

            expect(swissProtId.displayId).toMatch(/^[A-Z]\d{5}$/);
            expect(tremblId.displayId).toMatch(/^[A-Z]\d[A-Z]\d[A-Z]\d$/);
        });
    });

    describe('Type Safety', () => {
        it('should enforce type constraints', () => {
            const xrefData: XrefData = {
                displayId: 'NCBI:123456',
                externalResource: { name: 'NCBI Gene' },
            };

            // Verify all required fields are present
            expect(xrefData.displayId).toBeDefined();
            expect(xrefData.externalResource).toBeDefined();
            expect(xrefData.externalResource.name).toBeDefined();

            // Verify correct types
            expect(typeof xrefData.displayId).toBe('string');
            expect(typeof xrefData.externalResource.name).toBe('string');
        });

        it('should work with function parameters', () => {
            function processXrefData(xref: XrefData): string {
                return `${xref.displayId} (${xref.externalResource.name})`;
            }

            const xrefData: XrefData = {
                displayId: 'NCBI:123',
                externalResource: { name: 'NCBI Gene' },
            };

            const result = processXrefData(xrefData);
            expect(result).toBe('NCBI:123 (NCBI Gene)');
        });

        it('should work with return types', () => {
            function createXrefData(display: string, resourceName: ExternalResourceName): XrefData {
                return {
                    displayId: display,
                    externalResource: { name: resourceName },
                };
            }

            const xref = createXrefData('NCBI:123', 'NCBI Gene');
            expect(xref.displayId).toBe('NCBI:123');
            expect(xref.externalResource.name).toBe('NCBI Gene');
        });
    });
});
