import { GeneName } from './gene-name.model';

describe('GeneName Model', () => {
    describe('Interface Structure', () => {
        it('should define GeneName interface correctly', () => {
            const geneName: GeneName = {
                name: {
                    name: 'Test Gene Name'
                },
                creationDate: new Date('2023-01-01'),
                modDate: new Date('2023-06-01'),
                withdrawnDate: null,
                type: 'approved'
            };

            expect(geneName).toBeDefined();
            expect(geneName.name.name).toBe('Test Gene Name');
            expect(geneName.creationDate).toBeInstanceOf(Date);
            expect(geneName.modDate).toBeInstanceOf(Date);
            expect(geneName.withdrawnDate).toBeNull();
            expect(geneName.type).toBe('approved');
        });

        it('should allow null modDate', () => {
            const geneName: GeneName = {
                name: { name: 'Test Gene' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved'
            };

            expect(geneName.modDate).toBeNull();
        });

        it('should allow null withdrawnDate', () => {
            const geneName: GeneName = {
                name: { name: 'Test Gene' },
                creationDate: new Date(),
                modDate: new Date(),
                withdrawnDate: null,
                type: 'approved'
            };

            expect(geneName.withdrawnDate).toBeNull();
        });

        it('should allow Date withdrawnDate', () => {
            const withdrawnDate = new Date('2023-12-31');
            const geneName: GeneName = {
                name: { name: 'Test Gene' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: withdrawnDate,
                type: 'withdrawn'
            };

            expect(geneName.withdrawnDate).toBe(withdrawnDate);
            expect(geneName.withdrawnDate).toBeInstanceOf(Date);
        });
    });

    describe('Gene Name Types', () => {
        it('should handle approved type', () => {
            const geneName: GeneName = {
                name: { name: 'APPROVED1' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved'
            };

            expect(geneName.type).toBe('approved');
        });

        it('should handle previous type', () => {
            const geneName: GeneName = {
                name: { name: 'PREVIOUS1' },
                creationDate: new Date(),
                modDate: new Date(),
                withdrawnDate: null,
                type: 'previous'
            };

            expect(geneName.type).toBe('previous');
        });

        it('should handle alias type', () => {
            const geneName: GeneName = {
                name: { name: 'ALIAS1' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'alias'
            };

            expect(geneName.type).toBe('alias');
        });

        it('should handle withdrawn type', () => {
            const geneName: GeneName = {
                name: { name: 'WITHDRAWN1' },
                creationDate: new Date(),
                modDate: new Date(),
                withdrawnDate: new Date(),
                type: 'withdrawn'
            };

            expect(geneName.type).toBe('withdrawn');
        });

        it('should handle custom type', () => {
            const geneName: GeneName = {
                name: { name: 'CUSTOM1' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'custom-type'
            };

            expect(geneName.type).toBe('custom-type');
        });
    });

    describe('Edge Cases', () => {
        it('should handle empty gene name', () => {
            const geneName: GeneName = {
                name: { name: '' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved'
            };

            expect(geneName.name.name).toBe('');
        });

        it('should handle special characters in gene name', () => {
            const geneName: GeneName = {
                name: { name: 'GENE-@#$%^&*()' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved'
            };

            expect(geneName.name.name).toBe('GENE-@#$%^&*()');
        });

        it('should handle unicode characters in gene name', () => {
            const geneName: GeneName = {
                name: { name: 'GENE-ñéñē' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved'
            };

            expect(geneName.name.name).toBe('GENE-ñéñē');
        });

        it('should handle very long gene name', () => {
            const longName = 'GENE_' + 'A'.repeat(1000);
            const geneName: GeneName = {
                name: { name: longName },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved'
            };

            expect(geneName.name.name).toHaveLength(1005);
            expect(geneName.name.name.startsWith('GENE_')).toBe(true);
        });

        it('should handle whitespace in gene name', () => {
            const geneName: GeneName = {
                name: { name: '   GENE WITH SPACES   ' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved'
            };

            expect(geneName.name.name).toBe('   GENE WITH SPACES   ');
        });

        it('should handle numeric gene names', () => {
            const geneName: GeneName = {
                name: { name: '12345' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved'
            };

            expect(geneName.name.name).toBe('12345');
        });

        it('should handle empty type', () => {
            const geneName: GeneName = {
                name: { name: 'GENE1' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: ''
            };

            expect(geneName.type).toBe('');
        });
    });

    describe('Date Handling', () => {
        it('should handle date edge cases', () => {
            const futureDate = new Date('2099-12-31');
            const pastDate = new Date('1900-01-01');

            const geneName: GeneName = {
                name: { name: 'GENE1' },
                creationDate: futureDate,
                modDate: pastDate,
                withdrawnDate: null,
                type: 'approved'
            };

            expect(geneName.creationDate).toBe(futureDate);
            expect(geneName.modDate).toBe(pastDate);
        });

        it('should handle same date for creation and modification', () => {
            const sameDate = new Date('2023-01-01');

            const geneName: GeneName = {
                name: { name: 'GENE1' },
                creationDate: sameDate,
                modDate: sameDate,
                withdrawnDate: null,
                type: 'approved'
            };

            expect(geneName.creationDate).toBe(sameDate);
            expect(geneName.modDate).toBe(sameDate);
        });

        it('should handle chronological order validation', () => {
            const creation = new Date('2023-01-01');
            const modification = new Date('2023-06-01');
            const withdrawn = new Date('2023-12-31');

            const geneName: GeneName = {
                name: { name: 'GENE1' },
                creationDate: creation,
                modDate: modification,
                withdrawnDate: withdrawn,
                type: 'withdrawn'
            };

            expect(geneName.creationDate.getTime()).toBeLessThan(geneName.modDate!.getTime());
            expect(geneName.modDate!.getTime()).toBeLessThan(geneName.withdrawnDate!.getTime());
        });
    });

    describe('JSON Serialization', () => {
        it('should serialize and deserialize correctly', () => {
            const originalGeneName: GeneName = {
                name: { name: 'TEST_GENE' },
                creationDate: new Date('2023-01-01'),
                modDate: new Date('2023-06-01'),
                withdrawnDate: null,
                type: 'approved'
            };

            const jsonString = JSON.stringify(originalGeneName);
            const parsed = JSON.parse(jsonString);

            expect(parsed.name.name).toBe(originalGeneName.name.name);
            expect(parsed.type).toBe(originalGeneName.type);
        });

        it('should handle null values in JSON', () => {
            const geneNameWithNulls: GeneName = {
                name: { name: 'GENE1' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved'
            };

            const jsonString = JSON.stringify(geneNameWithNulls);
            const parsed = JSON.parse(jsonString);

            expect(parsed.modDate).toBeNull();
            expect(parsed.withdrawnDate).toBeNull();
        });
    });

    describe('Type Safety', () => {
        it('should enforce type constraints', () => {
            const geneName: GeneName = {
                name: { name: 'GENE1' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved'
            };

            // Verify all required fields are present
            expect(geneName.name).toBeDefined();
            expect(geneName.name.name).toBeDefined();
            expect(geneName.creationDate).toBeDefined();
            expect(geneName.type).toBeDefined();
        });

        it('should validate nested name structure', () => {
            const geneName: GeneName = {
                name: { name: 'NESTED_GENE' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved'
            };

            expect(typeof geneName.name).toBe('object');
            expect(typeof geneName.name.name).toBe('string');
        });
    });
});
