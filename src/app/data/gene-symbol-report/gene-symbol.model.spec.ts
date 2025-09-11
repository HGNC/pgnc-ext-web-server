import { GeneSymbol } from './gene-symbol.model';

describe('GeneSymbol Model', () => {
    describe('Interface Structure', () => {
        it('should define GeneSymbol interface correctly', () => {
            const geneSymbol: GeneSymbol = {
                symbol: {
                    symbol: 'TEST1',
                },
                creationDate: new Date('2023-01-01'),
                modDate: new Date('2023-06-01'),
                withdrawnDate: null,
                type: 'approved',
            };

            expect(geneSymbol).toBeDefined();
            expect(geneSymbol.symbol.symbol).toBe('TEST1');
            expect(geneSymbol.creationDate).toBeInstanceOf(Date);
            expect(geneSymbol.modDate).toBeInstanceOf(Date);
            expect(geneSymbol.withdrawnDate).toBeNull();
            expect(geneSymbol.type).toBe('approved');
        });

        it('should allow null modDate', () => {
            const geneSymbol: GeneSymbol = {
                symbol: { symbol: 'TEST1' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved',
            };

            expect(geneSymbol.modDate).toBeNull();
        });

        it('should allow null withdrawnDate', () => {
            const geneSymbol: GeneSymbol = {
                symbol: { symbol: 'TEST1' },
                creationDate: new Date(),
                modDate: new Date(),
                withdrawnDate: null,
                type: 'approved',
            };

            expect(geneSymbol.withdrawnDate).toBeNull();
        });

        it('should allow Date withdrawnDate', () => {
            const withdrawnDate = new Date('2023-12-31');
            const geneSymbol: GeneSymbol = {
                symbol: { symbol: 'TEST1' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: withdrawnDate,
                type: 'withdrawn',
            };

            expect(geneSymbol.withdrawnDate).toBe(withdrawnDate);
            expect(geneSymbol.withdrawnDate).toBeInstanceOf(Date);
        });
    });

    describe('Gene Symbol Types', () => {
        it('should handle approved type', () => {
            const geneSymbol: GeneSymbol = {
                symbol: { symbol: 'APPROVED1' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved',
            };

            expect(geneSymbol.type).toBe('approved');
        });

        it('should handle previous type', () => {
            const geneSymbol: GeneSymbol = {
                symbol: { symbol: 'PREVIOUS1' },
                creationDate: new Date(),
                modDate: new Date(),
                withdrawnDate: null,
                type: 'previous',
            };

            expect(geneSymbol.type).toBe('previous');
        });

        it('should handle alias type', () => {
            const geneSymbol: GeneSymbol = {
                symbol: { symbol: 'ALIAS1' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'alias',
            };

            expect(geneSymbol.type).toBe('alias');
        });

        it('should handle withdrawn type', () => {
            const geneSymbol: GeneSymbol = {
                symbol: { symbol: 'WITHDRAWN1' },
                creationDate: new Date(),
                modDate: new Date(),
                withdrawnDate: new Date(),
                type: 'withdrawn',
            };

            expect(geneSymbol.type).toBe('withdrawn');
        });

        it('should handle custom type', () => {
            const geneSymbol: GeneSymbol = {
                symbol: { symbol: 'CUSTOM1' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'custom-type',
            };

            expect(geneSymbol.type).toBe('custom-type');
        });
    });

    describe('Symbol Formats', () => {
        it('should handle uppercase symbols', () => {
            const geneSymbol: GeneSymbol = {
                symbol: { symbol: 'GENE1' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved',
            };

            expect(geneSymbol.symbol.symbol).toBe('GENE1');
        });

        it('should handle lowercase symbols', () => {
            const geneSymbol: GeneSymbol = {
                symbol: { symbol: 'gene1' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved',
            };

            expect(geneSymbol.symbol.symbol).toBe('gene1');
        });

        it('should handle mixed case symbols', () => {
            const geneSymbol: GeneSymbol = {
                symbol: { symbol: 'GeNe1' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved',
            };

            expect(geneSymbol.symbol.symbol).toBe('GeNe1');
        });

        it('should handle symbols with numbers', () => {
            const geneSymbol: GeneSymbol = {
                symbol: { symbol: 'GENE123' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved',
            };

            expect(geneSymbol.symbol.symbol).toBe('GENE123');
        });

        it('should handle symbols with underscores', () => {
            const geneSymbol: GeneSymbol = {
                symbol: { symbol: 'GENE_1' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved',
            };

            expect(geneSymbol.symbol.symbol).toBe('GENE_1');
        });

        it('should handle symbols with hyphens', () => {
            const geneSymbol: GeneSymbol = {
                symbol: { symbol: 'GENE-1' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved',
            };

            expect(geneSymbol.symbol.symbol).toBe('GENE-1');
        });

        it('should handle symbols with dots', () => {
            const geneSymbol: GeneSymbol = {
                symbol: { symbol: 'GENE.1' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved',
            };

            expect(geneSymbol.symbol.symbol).toBe('GENE.1');
        });
    });

    describe('Edge Cases', () => {
        it('should handle empty symbol', () => {
            const geneSymbol: GeneSymbol = {
                symbol: { symbol: '' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved',
            };

            expect(geneSymbol.symbol.symbol).toBe('');
        });

        it('should handle special characters in symbol', () => {
            const geneSymbol: GeneSymbol = {
                symbol: { symbol: 'GENE@#$%^&*()' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved',
            };

            expect(geneSymbol.symbol.symbol).toBe('GENE@#$%^&*()');
        });

        it('should handle unicode characters in symbol', () => {
            const geneSymbol: GeneSymbol = {
                symbol: { symbol: 'GENE-ñéñē' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved',
            };

            expect(geneSymbol.symbol.symbol).toBe('GENE-ñéñē');
        });

        it('should handle very long symbol', () => {
            const longSymbol = 'GENE_' + 'A'.repeat(1000);
            const geneSymbol: GeneSymbol = {
                symbol: { symbol: longSymbol },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved',
            };

            expect(geneSymbol.symbol.symbol).toHaveLength(1005);
            expect(geneSymbol.symbol.symbol.startsWith('GENE_')).toBe(true);
        });

        it('should handle whitespace in symbol', () => {
            const geneSymbol: GeneSymbol = {
                symbol: { symbol: '   GENE WITH SPACES   ' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved',
            };

            expect(geneSymbol.symbol.symbol).toBe('   GENE WITH SPACES   ');
        });

        it('should handle numeric symbols', () => {
            const geneSymbol: GeneSymbol = {
                symbol: { symbol: '12345' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved',
            };

            expect(geneSymbol.symbol.symbol).toBe('12345');
        });

        it('should handle empty type', () => {
            const geneSymbol: GeneSymbol = {
                symbol: { symbol: 'GENE1' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: '',
            };

            expect(geneSymbol.type).toBe('');
        });
    });

    describe('Date Handling', () => {
        it('should handle date edge cases', () => {
            const futureDate = new Date('2099-12-31');
            const pastDate = new Date('1900-01-01');

            const geneSymbol: GeneSymbol = {
                symbol: { symbol: 'GENE1' },
                creationDate: futureDate,
                modDate: pastDate,
                withdrawnDate: null,
                type: 'approved',
            };

            expect(geneSymbol.creationDate).toBe(futureDate);
            expect(geneSymbol.modDate).toBe(pastDate);
        });

        it('should handle same date for creation and modification', () => {
            const sameDate = new Date('2023-01-01');

            const geneSymbol: GeneSymbol = {
                symbol: { symbol: 'GENE1' },
                creationDate: sameDate,
                modDate: sameDate,
                withdrawnDate: null,
                type: 'approved',
            };

            expect(geneSymbol.creationDate).toBe(sameDate);
            expect(geneSymbol.modDate).toBe(sameDate);
        });

        it('should handle chronological order validation', () => {
            const creation = new Date('2023-01-01');
            const modification = new Date('2023-06-01');
            const withdrawn = new Date('2023-12-31');

            const geneSymbol: GeneSymbol = {
                symbol: { symbol: 'GENE1' },
                creationDate: creation,
                modDate: modification,
                withdrawnDate: withdrawn,
                type: 'withdrawn',
            };

            expect(geneSymbol.creationDate.getTime()).toBeLessThan(geneSymbol.modDate!.getTime());
            expect(geneSymbol.modDate!.getTime()).toBeLessThan(geneSymbol.withdrawnDate!.getTime());
        });
    });

    describe('JSON Serialization', () => {
        it('should serialize and deserialize correctly', () => {
            const originalSymbol: GeneSymbol = {
                symbol: { symbol: 'TEST_SYMBOL' },
                creationDate: new Date('2023-01-01'),
                modDate: new Date('2023-06-01'),
                withdrawnDate: null,
                type: 'approved',
            };

            const jsonString = JSON.stringify(originalSymbol);
            const parsed = JSON.parse(jsonString);

            expect(parsed.symbol.symbol).toBe(originalSymbol.symbol.symbol);
            expect(parsed.type).toBe(originalSymbol.type);
        });

        it('should handle null values in JSON', () => {
            const symbolWithNulls: GeneSymbol = {
                symbol: { symbol: 'GENE1' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved',
            };

            const jsonString = JSON.stringify(symbolWithNulls);
            const parsed = JSON.parse(jsonString);

            expect(parsed.modDate).toBeNull();
            expect(parsed.withdrawnDate).toBeNull();
        });
    });

    describe('Type Safety', () => {
        it('should enforce type constraints', () => {
            const geneSymbol: GeneSymbol = {
                symbol: { symbol: 'GENE1' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved',
            };

            // Verify all required fields are present
            expect(geneSymbol.symbol).toBeDefined();
            expect(geneSymbol.symbol.symbol).toBeDefined();
            expect(geneSymbol.creationDate).toBeDefined();
            expect(geneSymbol.type).toBeDefined();
        });

        it('should validate nested symbol structure', () => {
            const geneSymbol: GeneSymbol = {
                symbol: { symbol: 'NESTED_SYMBOL' },
                creationDate: new Date(),
                modDate: null,
                withdrawnDate: null,
                type: 'approved',
            };

            expect(typeof geneSymbol.symbol).toBe('object');
            expect(typeof geneSymbol.symbol.symbol).toBe('string');
        });
    });
});
