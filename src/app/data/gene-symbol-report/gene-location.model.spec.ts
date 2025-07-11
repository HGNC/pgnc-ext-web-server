import { GeneLocation } from './gene-location.model';

describe('GeneLocation Model', () => {
    describe('Interface Structure', () => {
        it('should define GeneLocation interface correctly', () => {
            const geneLocation: GeneLocation = {
                creationDate: new Date('2023-01-01'),
                withdrawnDate: null,
                location: {
                    name: 'Test Location',
                    refseqAccession: 'NC_000001.11',
                    genbankAccession: 'CM000663.2',
                    coordSystem: 'chromosome',
                    type: 'primary assembly'
                }
            };

            expect(geneLocation).toBeDefined();
            expect(geneLocation.creationDate).toBeInstanceOf(Date);
            expect(geneLocation.withdrawnDate).toBeNull();
            expect(geneLocation.location.name).toBe('Test Location');
            expect(geneLocation.location.refseqAccession).toBe('NC_000001.11');
            expect(geneLocation.location.genbankAccession).toBe('CM000663.2');
            expect(geneLocation.location.coordSystem).toBe('chromosome');
            expect(geneLocation.location.type).toBe('primary assembly');
        });

        it('should allow null withdrawnDate', () => {
            const geneLocation: GeneLocation = {
                creationDate: new Date(),
                withdrawnDate: null,
                location: {
                    name: 'Location',
                    refseqAccession: 'test',
                    genbankAccession: 'test',
                    coordSystem: 'test',
                    type: 'test'
                }
            };

            expect(geneLocation.withdrawnDate).toBeNull();
        });

        it('should allow Date withdrawnDate', () => {
            const withdrawnDate = new Date('2023-12-31');
            const geneLocation: GeneLocation = {
                creationDate: new Date(),
                withdrawnDate: withdrawnDate,
                location: {
                    name: 'Location',
                    refseqAccession: 'test',
                    genbankAccession: 'test',
                    coordSystem: 'test',
                    type: 'test'
                }
            };

            expect(geneLocation.withdrawnDate).toBe(withdrawnDate);
            expect(geneLocation.withdrawnDate).toBeInstanceOf(Date);
        });
    });

    describe('Edge Cases', () => {
        it('should handle empty string values', () => {
            const geneLocation: GeneLocation = {
                creationDate: new Date(),
                withdrawnDate: null,
                location: {
                    name: '',
                    refseqAccession: '',
                    genbankAccession: '',
                    coordSystem: '',
                    type: ''
                }
            };

            expect(geneLocation.location.name).toBe('');
            expect(geneLocation.location.refseqAccession).toBe('');
            expect(geneLocation.location.genbankAccession).toBe('');
            expect(geneLocation.location.coordSystem).toBe('');
            expect(geneLocation.location.type).toBe('');
        });

        it('should handle special characters in strings', () => {
            const geneLocation: GeneLocation = {
                creationDate: new Date(),
                withdrawnDate: null,
                location: {
                    name: 'Location-@#$%^&*()',
                    refseqAccession: 'NC_000001.11-test',
                    genbankAccession: 'CM000663.2@test',
                    coordSystem: 'chromosome-special',
                    type: 'primary assembly (test)'
                }
            };

            expect(geneLocation.location.name).toBe('Location-@#$%^&*()');
            expect(geneLocation.location.refseqAccession).toBe('NC_000001.11-test');
            expect(geneLocation.location.genbankAccession).toBe('CM000663.2@test');
            expect(geneLocation.location.coordSystem).toBe('chromosome-special');
            expect(geneLocation.location.type).toBe('primary assembly (test)');
        });

        it('should handle unicode characters', () => {
            const geneLocation: GeneLocation = {
                creationDate: new Date(),
                withdrawnDate: null,
                location: {
                    name: 'Locación-ñéñē',
                    refseqAccession: 'NC_000001.11-ñ',
                    genbankAccession: 'CM000663.2-é',
                    coordSystem: 'chromosome-ñ',
                    type: 'primary-é'
                }
            };

            expect(geneLocation.location.name).toBe('Locación-ñéñē');
            expect(geneLocation.location.refseqAccession).toBe('NC_000001.11-ñ');
            expect(geneLocation.location.genbankAccession).toBe('CM000663.2-é');
            expect(geneLocation.location.coordSystem).toBe('chromosome-ñ');
            expect(geneLocation.location.type).toBe('primary-é');
        });

        it('should handle very long strings', () => {
            const longString = 'a'.repeat(1000);
            const geneLocation: GeneLocation = {
                creationDate: new Date(),
                withdrawnDate: null,
                location: {
                    name: longString,
                    refseqAccession: longString,
                    genbankAccession: longString,
                    coordSystem: longString,
                    type: longString
                }
            };

            expect(geneLocation.location.name).toHaveLength(1000);
            expect(geneLocation.location.refseqAccession).toHaveLength(1000);
            expect(geneLocation.location.genbankAccession).toHaveLength(1000);
            expect(geneLocation.location.coordSystem).toHaveLength(1000);
            expect(geneLocation.location.type).toHaveLength(1000);
        });

        it('should handle date edge cases', () => {
            const futureDate = new Date('2099-12-31');
            const pastDate = new Date('1900-01-01');

            const geneLocation: GeneLocation = {
                creationDate: futureDate,
                withdrawnDate: pastDate,
                location: {
                    name: 'test',
                    refseqAccession: 'test',
                    genbankAccession: 'test',
                    coordSystem: 'test',
                    type: 'test'
                }
            };

            expect(geneLocation.creationDate).toBe(futureDate);
            expect(geneLocation.withdrawnDate).toBe(pastDate);
        });
    });

    describe('JSON Serialization', () => {
        it('should serialize and deserialize correctly', () => {
            const originalLocation: GeneLocation = {
                creationDate: new Date('2023-01-01'),
                withdrawnDate: new Date('2023-12-31'),
                location: {
                    name: 'Test Location',
                    refseqAccession: 'NC_000001.11',
                    genbankAccession: 'CM000663.2',
                    coordSystem: 'chromosome',
                    type: 'primary assembly'
                }
            };

            const jsonString = JSON.stringify(originalLocation);
            const parsed = JSON.parse(jsonString);

            expect(parsed.location.name).toBe(originalLocation.location.name);
            expect(parsed.location.refseqAccession).toBe(originalLocation.location.refseqAccession);
            expect(parsed.location.genbankAccession).toBe(originalLocation.location.genbankAccession);
            expect(parsed.location.coordSystem).toBe(originalLocation.location.coordSystem);
            expect(parsed.location.type).toBe(originalLocation.location.type);
        });

        it('should handle null values in JSON', () => {
            const locationWithNull: GeneLocation = {
                creationDate: new Date(),
                withdrawnDate: null,
                location: {
                    name: 'test',
                    refseqAccession: 'test',
                    genbankAccession: 'test',
                    coordSystem: 'test',
                    type: 'test'
                }
            };

            const jsonString = JSON.stringify(locationWithNull);
            const parsed = JSON.parse(jsonString);

            expect(parsed.withdrawnDate).toBeNull();
        });
    });

    describe('Type Safety', () => {
        it('should enforce type constraints', () => {
            // This test ensures TypeScript compilation catches type errors
            const geneLocation: GeneLocation = {
                creationDate: new Date(),
                withdrawnDate: null,
                location: {
                    name: 'test',
                    refseqAccession: 'test',
                    genbankAccession: 'test',
                    coordSystem: 'test',
                    type: 'test'
                }
            };

            // Verify all required fields are present
            expect(geneLocation.creationDate).toBeDefined();
            expect(geneLocation.location).toBeDefined();
            expect(geneLocation.location.name).toBeDefined();
            expect(geneLocation.location.refseqAccession).toBeDefined();
            expect(geneLocation.location.genbankAccession).toBeDefined();
            expect(geneLocation.location.coordSystem).toBeDefined();
            expect(geneLocation.location.type).toBeDefined();
        });
    });
});
