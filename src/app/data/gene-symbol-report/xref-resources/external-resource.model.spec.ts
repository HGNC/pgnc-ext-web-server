import { ExternalResourceName } from './external-resource-name.type';
import { ExternalResource } from './external-resource.model';

describe('ExternalResource Model', () => {
    describe('Interface Structure', () => {
        it('should define ExternalResource interface correctly', () => {
            const externalResource: ExternalResource = {
                name: 'NCBI Gene'
            };

            expect(externalResource).toBeDefined();
            expect(externalResource.name).toBe('NCBI Gene');
        });

        it('should accept all valid resource names', () => {
            const validNames: ExternalResourceName[] = [
                'NCBI Gene',
                'Ensembl Gene',
                'UniProt',
                'PubMed',
                'Phytozome v4_1',
                'Phytozome v3_1',
                'CBI sequence viewer'
            ];

            validNames.forEach(name => {
                const resource: ExternalResource = { name };
                expect(resource.name).toBe(name);
            });
        });
    });

    describe('NCBI Gene Resource', () => {
        it('should create NCBI Gene resource', () => {
            const resource: ExternalResource = {
                name: 'NCBI Gene'
            };

            expect(resource.name).toBe('NCBI Gene');
        });

        it('should be type-safe for NCBI Gene', () => {
            const resource: ExternalResource = {
                name: 'NCBI Gene'
            };

            expect(typeof resource.name).toBe('string');
            expect(resource.name.includes('NCBI')).toBe(true);
            expect(resource.name.includes('Gene')).toBe(true);
        });
    });

    describe('Ensembl Gene Resource', () => {
        it('should create Ensembl Gene resource', () => {
            const resource: ExternalResource = {
                name: 'Ensembl Gene'
            };

            expect(resource.name).toBe('Ensembl Gene');
        });

        it('should be type-safe for Ensembl Gene', () => {
            const resource: ExternalResource = {
                name: 'Ensembl Gene'
            };

            expect(typeof resource.name).toBe('string');
            expect(resource.name.includes('Ensembl')).toBe(true);
            expect(resource.name.includes('Gene')).toBe(true);
        });
    });

    describe('UniProt Resource', () => {
        it('should create UniProt resource', () => {
            const resource: ExternalResource = {
                name: 'UniProt'
            };

            expect(resource.name).toBe('UniProt');
        });

        it('should be type-safe for UniProt', () => {
            const resource: ExternalResource = {
                name: 'UniProt'
            };

            expect(typeof resource.name).toBe('string');
            expect(resource.name.length).toBe(7);
        });
    });

    describe('PubMed Resource', () => {
        it('should create PubMed resource', () => {
            const resource: ExternalResource = {
                name: 'PubMed'
            };

            expect(resource.name).toBe('PubMed');
        });

        it('should be type-safe for PubMed', () => {
            const resource: ExternalResource = {
                name: 'PubMed'
            };

            expect(typeof resource.name).toBe('string');
            expect(resource.name.includes('Med')).toBe(true);
        });
    });

    describe('Phytozome Resources', () => {
        it('should create Phytozome v4_1 resource', () => {
            const resource: ExternalResource = {
                name: 'Phytozome v4_1'
            };

            expect(resource.name).toBe('Phytozome v4_1');
        });

        it('should create Phytozome v3_1 resource', () => {
            const resource: ExternalResource = {
                name: 'Phytozome v3_1'
            };

            expect(resource.name).toBe('Phytozome v3_1');
        });

        it('should be type-safe for Phytozome versions', () => {
            const resource: ExternalResource = {
                name: 'Phytozome v4_1'
            };

            expect(typeof resource.name).toBe('string');
            expect(resource.name.includes('Phyto')).toBe(true);
        });
    });

    describe('CBI Sequence Viewer Resource', () => {
        it('should create CBI sequence viewer resource', () => {
            const resource: ExternalResource = {
                name: 'CBI sequence viewer'
            };

            expect(resource.name).toBe('CBI sequence viewer');
        });

        it('should be type-safe for CBI sequence viewer', () => {
            const resource: ExternalResource = {
                name: 'CBI sequence viewer'
            };

            expect(typeof resource.name).toBe('string');
            expect(resource.name.includes('CBI')).toBe(true);
            expect(resource.name.includes('sequence')).toBe(true);
            expect(resource.name.includes('viewer')).toBe(true);
        });
    });

    describe('Array Operations', () => {
        it('should work in arrays', () => {
            const resources: ExternalResource[] = [
                { name: 'NCBI Gene' },
                { name: 'UniProt' },
                { name: 'PubMed' }
            ];

            expect(resources).toHaveLength(3);
            expect(resources[0].name).toBe('NCBI Gene');
            expect(resources[1].name).toBe('UniProt');
            expect(resources[2].name).toBe('PubMed');
        });

        it('should filter by resource type', () => {
            const resources: ExternalResource[] = [
                { name: 'NCBI Gene' },
                { name: 'Ensembl Gene' },
                { name: 'UniProt' },
                { name: 'PubMed' }
            ];

            const geneResources = resources.filter(r => r.name.includes('Gene'));
            expect(geneResources).toHaveLength(2);
            expect(geneResources[0].name).toBe('NCBI Gene');
            expect(geneResources[1].name).toBe('Ensembl Gene');
        });

        it('should find specific resource', () => {
            const resources: ExternalResource[] = [
                { name: 'NCBI Gene' },
                { name: 'UniProt' },
                { name: 'PubMed' }
            ];

            const found = resources.find(r => r.name === 'UniProt');
            expect(found).toBeDefined();
            expect(found?.name).toBe('UniProt');

            const notFound = resources.find(r => r.name === 'Phytozome v4_1');
            expect(notFound).toBeUndefined();
        });
    });

    describe('Object Operations', () => {
        it('should work as object values', () => {
            const resourceMap: Record<string, ExternalResource> = {
                ncbi: { name: 'NCBI Gene' },
                ensembl: { name: 'Ensembl Gene' },
                uniprot: { name: 'UniProt' }
            };

            expect(resourceMap['ncbi'].name).toBe('NCBI Gene');
            expect(resourceMap['ensembl'].name).toBe('Ensembl Gene');
            expect(resourceMap['uniprot'].name).toBe('UniProt');
        });

        it('should support object destructuring', () => {
            const resource: ExternalResource = { name: 'NCBI Gene' };
            const { name } = resource;

            expect(name).toBe('NCBI Gene');
        });

        it('should support property access', () => {
            const resource: ExternalResource = { name: 'UniProt' };

            expect(resource['name']).toBe('UniProt');
            expect(Object.keys(resource)).toEqual(['name']);
            expect(Object.values(resource)).toEqual(['UniProt']);
        });
    });

    describe('Type Guards', () => {
        it('should work with type guards', () => {
            function isGeneResource(resource: ExternalResource): boolean {
                return resource.name.includes('Gene');
            }

            const ncbiResource: ExternalResource = { name: 'NCBI Gene' };
            const ensemblResource: ExternalResource = { name: 'Ensembl Gene' };
            const uniprotResource: ExternalResource = { name: 'UniProt' };

            expect(isGeneResource(ncbiResource)).toBe(true);
            expect(isGeneResource(ensemblResource)).toBe(true);
            expect(isGeneResource(uniprotResource)).toBe(false);
        });

        it('should validate resource existence', () => {
            function isValidResource(resource: ExternalResource): boolean {
                const validNames: ExternalResourceName[] = [
                    'NCBI Gene', 'Ensembl Gene', 'UniProt', 'PubMed', 'Phytozome v4_1', 'Phytozome v3_1', 'CBI sequence viewer'
                ];
                return validNames.includes(resource.name);
            }

            const validResource: ExternalResource = { name: 'NCBI Gene' };
            expect(isValidResource(validResource)).toBe(true);
        });
    });

    describe('JSON Serialization', () => {
        it('should serialize and deserialize correctly', () => {
            const originalResource: ExternalResource = {
                name: 'NCBI Gene'
            };

            const jsonString = JSON.stringify(originalResource);
            const parsed = JSON.parse(jsonString);

            expect(parsed.name).toBe('NCBI Gene');
            expect(typeof parsed.name).toBe('string');
        });

        it('should work in complex objects', () => {
            const complexObject = {
                id: 1,
                resource: { name: 'UniProt' as ExternalResourceName },
                metadata: {
                    created: new Date().toISOString(),
                    active: true
                }
            };

            const jsonString = JSON.stringify(complexObject);
            const parsed = JSON.parse(jsonString);

            expect(parsed.resource.name).toBe('UniProt');
            expect(parsed.id).toBe(1);
            expect(parsed.metadata.active).toBe(true);
        });

        it('should handle arrays in JSON', () => {
            const resourceArray: ExternalResource[] = [
                { name: 'NCBI Gene' },
                { name: 'UniProt' },
                { name: 'PubMed' }
            ];

            const jsonString = JSON.stringify(resourceArray);
            const parsed = JSON.parse(jsonString);

            expect(Array.isArray(parsed)).toBe(true);
            expect(parsed).toHaveLength(3);
            expect(parsed[0].name).toBe('NCBI Gene');
            expect(parsed[1].name).toBe('UniProt');
            expect(parsed[2].name).toBe('PubMed');
        });
    });

    describe('Comparison Operations', () => {
        it('should compare resources correctly', () => {
            const resource1: ExternalResource = { name: 'NCBI Gene' };
            const resource2: ExternalResource = { name: 'NCBI Gene' };
            const resource3: ExternalResource = { name: 'UniProt' };

            expect(resource1.name === resource2.name).toBe(true);
            expect(resource1.name !== resource3.name).toBe(true);
        });

        it('should sort resources alphabetically', () => {
            const resources: ExternalResource[] = [
                { name: 'UniProt' },
                { name: 'NCBI Gene' },
                { name: 'PubMed' },
                { name: 'Ensembl Gene' }
            ];

            const sorted = resources.sort((a, b) => a.name.localeCompare(b.name));

            expect(sorted[0].name).toBe('Ensembl Gene');
            expect(sorted[1].name).toBe('NCBI Gene');
            expect(sorted[2].name).toBe('PubMed');
            expect(sorted[3].name).toBe('UniProt');
        });
    });

    describe('Type Safety', () => {
        it('should enforce type constraints', () => {
            const resource: ExternalResource = {
                name: 'NCBI Gene'
            };

            // Verify required fields are present
            expect(resource.name).toBeDefined();
            expect(typeof resource.name).toBe('string');
        });

        it('should work with function parameters', () => {
            function processExternalResource(resource: ExternalResource): string {
                return `Processing resource: ${resource.name}`;
            }

            const ncbiResource: ExternalResource = { name: 'NCBI Gene' };
            const result = processExternalResource(ncbiResource);

            expect(result).toBe('Processing resource: NCBI Gene');
        });

        it('should work with return types', () => {
            function createResource(name: ExternalResourceName): ExternalResource {
                return { name };
            }

            const resource = createResource('UniProt');
            expect(resource.name).toBe('UniProt');
        });
    });
});
