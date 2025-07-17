import { ExternalResourceName } from './external-resource-name.type';

describe('ExternalResourceName Type', () => {
    describe('Valid Resource Names', () => {
        it('should accept NCBI Gene', () => {
            const resourceName: ExternalResourceName = 'NCBI Gene';
            expect(resourceName).toBe('NCBI Gene');
        });

        it('should accept Ensembl Gene', () => {
            const resourceName: ExternalResourceName = 'Ensembl Gene';
            expect(resourceName).toBe('Ensembl Gene');
        });

        it('should accept UniProt', () => {
            const resourceName: ExternalResourceName = 'UniProt';
            expect(resourceName).toBe('UniProt');
        });

        it('should accept PubMed', () => {
            const resourceName: ExternalResourceName = 'PubMed';
            expect(resourceName).toBe('PubMed');
        });

        it('should accept Phytozome v4_1', () => {
            const resourceName: ExternalResourceName = 'Phytozome v4_1';
            expect(resourceName).toBe('Phytozome v4_1');
        });

        it('should accept Phytozome v3_1', () => {
            const resourceName: ExternalResourceName = 'Phytozome v3_1';
            expect(resourceName).toBe('Phytozome v3_1');
        });

        it('should accept CBI sequence viewer', () => {
            const resourceName: ExternalResourceName = 'CBI sequence viewer';
            expect(resourceName).toBe('CBI sequence viewer');
        });
    });

    describe('Type Safety', () => {
        it('should create array of valid resource names', () => {
            const resourceNames: ExternalResourceName[] = [
                'NCBI Gene',
                'Ensembl Gene',
                'UniProt',
                'PubMed',
                'Phytozome v4_1',
                'Phytozome v3_1',
                'CBI sequence viewer'
            ];

            expect(resourceNames).toHaveLength(7);
            expect(resourceNames[0]).toBe('NCBI Gene');
            expect(resourceNames[1]).toBe('Ensembl Gene');
            expect(resourceNames[2]).toBe('UniProt');
            expect(resourceNames[3]).toBe('PubMed');
            expect(resourceNames[4]).toBe('Phytozome v4_1');
            expect(resourceNames[5]).toBe('Phytozome v3_1');
            expect(resourceNames[6]).toBe('CBI sequence viewer');
        });

        it('should work in type guards', () => {
            function isValidResourceName(name: string): name is ExternalResourceName {
                return ['NCBI Gene', 'Ensembl Gene', 'UniProt', 'PubMed', 'Phytozome v4_1', 'Phytozome v3_1', 'CBI sequence viewer'].includes(name as ExternalResourceName);
            }

            expect(isValidResourceName('NCBI Gene')).toBe(true);
            expect(isValidResourceName('Ensembl Gene')).toBe(true);
            expect(isValidResourceName('UniProt')).toBe(true);
            expect(isValidResourceName('PubMed')).toBe(true);
            expect(isValidResourceName('Phytozome v4_1')).toBe(true);
            expect(isValidResourceName('Phytozome v3_1')).toBe(true);
            expect(isValidResourceName('CBI sequence viewer')).toBe(true);
            expect(isValidResourceName('Invalid Resource')).toBe(false);
            expect(isValidResourceName('')).toBe(false);
        });

        it('should work in function parameters', () => {
            function processResource(name: ExternalResourceName): string {
                return `Processing ${name}`;
            }

            expect(processResource('NCBI Gene')).toBe('Processing NCBI Gene');
            expect(processResource('Ensembl Gene')).toBe('Processing Ensembl Gene');
            expect(processResource('UniProt')).toBe('Processing UniProt');
            expect(processResource('PubMed')).toBe('Processing PubMed');
            expect(processResource('Phytozome v4_1')).toBe('Processing Phytozome v4_1');
            expect(processResource('Phytozome v3_1')).toBe('Processing Phytozome v3_1');
            expect(processResource('CBI sequence viewer')).toBe('Processing CBI sequence viewer');
        });

        it('should work in object keys', () => {
            const resourceConfig: Record<ExternalResourceName, string> = {
                'NCBI Gene': 'https://www.ncbi.nlm.nih.gov/gene/',
                'Ensembl Gene': 'https://plants.ensembl.org/',
                'UniProt': 'https://www.uniprot.org/',
                'PubMed': 'https://pubmed.ncbi.nlm.nih.gov/',
                'Phytozome v4_1': 'https://phytozome-next.jgi.doe.gov/v4_1/',
                'Phytozome v3_1': 'https://phytozome-next.jgi.doe.gov/v3_1/',
                'CBI sequence viewer': 'https://fair.ornl.gov/'
            };

            expect(Object.keys(resourceConfig)).toHaveLength(7);
            expect(resourceConfig['NCBI Gene']).toBe('https://www.ncbi.nlm.nih.gov/gene/');
            expect(resourceConfig['Ensembl Gene']).toBe('https://plants.ensembl.org/');
            expect(resourceConfig['UniProt']).toBe('https://www.uniprot.org/');
            expect(resourceConfig['PubMed']).toBe('https://pubmed.ncbi.nlm.nih.gov/');
            expect(resourceConfig['Phytozome v4_1']).toBe('https://phytozome-next.jgi.doe.gov/v4_1/');
            expect(resourceConfig['Phytozome v3_1']).toBe('https://phytozome-next.jgi.doe.gov/v3_1/');
            expect(resourceConfig['CBI sequence viewer']).toBe('https://fair.ornl.gov/');
        });
    });

    describe('String Comparison', () => {
        it('should be case sensitive', () => {
            const correctName: ExternalResourceName = 'NCBI Gene';
            const incorrectName = 'ncbi gene';

            expect(correctName).toBe('NCBI Gene');
            expect(correctName).not.toBe(incorrectName);
        });

        it('should preserve exact spacing', () => {
            const correctName: ExternalResourceName = 'CBI sequence viewer';
            const incorrectSpacing = 'CBI  sequence  viewer';

            expect(correctName).toBe('CBI sequence viewer');
            expect(correctName).not.toBe(incorrectSpacing);
        });

        it('should handle string equality checks', () => {
            const name1: ExternalResourceName = 'UniProt';
            const name2: ExternalResourceName = 'UniProt';
            const name3: ExternalResourceName = 'PubMed';

            expect(name1 === name2).toBe(true);
            expect(name1).not.toBe(name3);
        });
    });

    describe('Array Operations', () => {
        it('should work with includes method', () => {
            const resourceNames: ExternalResourceName[] = ['NCBI Gene', 'UniProt', 'PubMed'];

            expect(resourceNames.includes('NCBI Gene')).toBe(true);
            expect(resourceNames.includes('UniProt')).toBe(true);
            expect(resourceNames.includes('PubMed')).toBe(true);
            expect(resourceNames.includes('Ensembl Gene')).toBe(false);
        });

        it('should work with find method', () => {
            const resourceNames: ExternalResourceName[] = ['NCBI Gene', 'UniProt', 'PubMed'];

            const found = resourceNames.find(name => name === 'UniProt');
            expect(found).toBe('UniProt');

            const notFound = resourceNames.find(name => name === 'Ensembl Gene');
            expect(notFound).toBeUndefined();
        });

        it('should work with filter method', () => {
            const resourceNames: ExternalResourceName[] = ['NCBI Gene', 'Ensembl Gene', 'UniProt'];

            const geneResources = resourceNames.filter(name => name.includes('Gene'));
            expect(geneResources).toEqual(['NCBI Gene', 'Ensembl Gene']);

            const proteinResources = resourceNames.filter(name => name.includes('Prot'));
            expect(proteinResources).toEqual(['UniProt']);
        });
    });

    describe('JSON Serialization', () => {
        it('should serialize and deserialize correctly', () => {
            const resourceName: ExternalResourceName = 'NCBI Gene';
            const jsonString = JSON.stringify(resourceName);
            const parsed = JSON.parse(jsonString);

            expect(parsed).toBe('NCBI Gene');
            expect(typeof parsed).toBe('string');
        });

        it('should work in objects', () => {
            const resourceData = {
                name: 'NCBI Gene' as ExternalResourceName,
                url: 'https://www.ncbi.nlm.nih.gov/gene/',
                active: true
            };

            const jsonString = JSON.stringify(resourceData);
            const parsed = JSON.parse(jsonString);

            expect(parsed.name).toBe('NCBI Gene');
            expect(parsed.url).toBe('https://www.ncbi.nlm.nih.gov/gene/');
            expect(parsed.active).toBe(true);
        });

        it('should work in arrays', () => {
            const resourceNames: ExternalResourceName[] = ['NCBI Gene', 'UniProt'];
            const jsonString = JSON.stringify(resourceNames);
            const parsed = JSON.parse(jsonString);

            expect(parsed).toEqual(['NCBI Gene', 'UniProt']);
            expect(Array.isArray(parsed)).toBe(true);
        });
    });

    describe('Edge Cases', () => {
        it('should handle empty string comparisons', () => {
            const resourceName: ExternalResourceName = 'NCBI Gene';

            expect(resourceName).not.toBe('');
            expect(resourceName.length).toBeGreaterThan(0);
        });

        it('should handle string length variations', () => {
            const shortName: ExternalResourceName = 'UniProt';
            const longName: ExternalResourceName = 'CBI sequence viewer';

            expect(shortName.length).toBeLessThan(longName.length);
            expect(shortName.length).toBe(7);
            expect(longName.length).toBe(19);
        });

        it('should handle substring operations', () => {
            const resourceName: ExternalResourceName = 'NCBI Gene';

            expect(resourceName.startsWith('NCBI')).toBe(true);
            expect(resourceName.endsWith('Gene')).toBe(true);
            expect(resourceName.includes('Gene')).toBe(true);
            expect(resourceName.includes('NCBI')).toBe(true);
        });
    });
});
