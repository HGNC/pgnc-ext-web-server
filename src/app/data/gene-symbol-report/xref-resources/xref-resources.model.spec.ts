import { XrefData } from './xref-data.model';
import { Xref } from './xref-resources.model';

describe('Xref Model', () => {
    describe('Interface Structure', () => {
        it('should define Xref interface correctly', () => {
            const xref: Xref = {
                geneId: 123,
                xrefId: 456,
                creationDate: new Date('2023-01-15'),
                withdrawnDate: null,
                status: 'active',
                source: 'automatic',
                xref: {
                    displayId: 'NCBI:123456',
                    externalResource: { name: 'NCBI Gene' },
                },
            };

            expect(xref).toBeDefined();
            expect(xref.geneId).toBe(123);
            expect(xref.xrefId).toBe(456);
            expect(xref.creationDate).toEqual(new Date('2023-01-15'));
            expect(xref.withdrawnDate).toBeNull();
            expect(xref.status).toBe('active');
            expect(xref.source).toBe('automatic');
            expect(xref.xref.displayId).toBe('NCBI:123456');
        });

        it('should accept all required fields', () => {
            const xref: Xref = {
                geneId: 999,
                xrefId: 888,
                creationDate: new Date(),
                withdrawnDate: new Date('2023-12-31'),
                status: 'withdrawn',
                source: 'manual',
                xref: {
                    displayId: 'P04637',
                    externalResource: { name: 'UniProt' },
                },
            };

            expect(xref.geneId).toBe(999);
            expect(xref.status).toBe('withdrawn');
            expect(xref.withdrawnDate).toEqual(new Date('2023-12-31'));
        });
    });

    describe('Active Xref Entries', () => {
        it('should create active xref with null withdrawn date', () => {
            const activeXref: Xref = {
                geneId: 100,
                xrefId: 200,
                creationDate: new Date('2023-06-01'),
                withdrawnDate: null,
                status: 'active',
                source: 'automatic',
                xref: {
                    displayId: 'ENSG00000139618',
                    externalResource: { name: 'Ensembl Gene' },
                },
            };

            expect(activeXref.status).toBe('active');
            expect(activeXref.withdrawnDate).toBeNull();
            expect(activeXref.xref.externalResource.name).toBe('Ensembl Gene');
        });

        it('should handle different active statuses', () => {
            const statusOptions = ['active', 'approved', 'current', 'valid'];

            statusOptions.forEach(status => {
                const xref: Xref = {
                    geneId: 1,
                    xrefId: 1,
                    creationDate: new Date(),
                    withdrawnDate: null,
                    status,
                    source: 'automatic',
                    xref: {
                        displayId: 'test',
                        externalResource: { name: 'NCBI Gene' },
                    },
                };

                expect(xref.status).toBe(status);
                expect(xref.withdrawnDate).toBeNull();
            });
        });
    });

    describe('Withdrawn Xref Entries', () => {
        it('should create withdrawn xref with withdrawal date', () => {
            const withdrawnXref: Xref = {
                geneId: 300,
                xrefId: 400,
                creationDate: new Date('2023-01-01'),
                withdrawnDate: new Date('2023-06-01'),
                status: 'withdrawn',
                source: 'manual',
                xref: {
                    displayId: 'OBSOLETE:123',
                    externalResource: { name: 'NCBI Gene' },
                },
            };

            expect(withdrawnXref.status).toBe('withdrawn');
            expect(withdrawnXref.withdrawnDate).toEqual(new Date('2023-06-01'));
            expect(withdrawnXref.creationDate.getTime()).toBeLessThan(
                withdrawnXref.withdrawnDate!.getTime()
            );
        });

        it('should handle different withdrawn statuses', () => {
            const statusOptions = ['withdrawn', 'obsolete', 'deprecated', 'inactive'];

            statusOptions.forEach(status => {
                const xref: Xref = {
                    geneId: 1,
                    xrefId: 1,
                    creationDate: new Date('2023-01-01'),
                    withdrawnDate: new Date('2023-06-01'),
                    status,
                    source: 'manual',
                    xref: {
                        displayId: 'test',
                        externalResource: { name: 'NCBI Gene' },
                    },
                };

                expect(xref.status).toBe(status);
                expect(xref.withdrawnDate).not.toBeNull();
            });
        });
    });

    describe('Source Types', () => {
        it('should handle automatic source', () => {
            const automaticXref: Xref = {
                geneId: 500,
                xrefId: 600,
                creationDate: new Date(),
                withdrawnDate: null,
                status: 'active',
                source: 'automatic',
                xref: {
                    displayId: 'AUTO:123',
                    externalResource: { name: 'NCBI Gene' },
                },
            };

            expect(automaticXref.source).toBe('automatic');
        });

        it('should handle manual source', () => {
            const manualXref: Xref = {
                geneId: 700,
                xrefId: 800,
                creationDate: new Date(),
                withdrawnDate: null,
                status: 'active',
                source: 'manual',
                xref: {
                    displayId: 'MANUAL:123',
                    externalResource: { name: 'UniProt' },
                },
            };

            expect(manualXref.source).toBe('manual');
        });

        it('should handle various source types', () => {
            const sources = ['automatic', 'manual', 'imported', 'curated', 'system'];

            sources.forEach(source => {
                const xref: Xref = {
                    geneId: 1,
                    xrefId: 1,
                    creationDate: new Date(),
                    withdrawnDate: null,
                    status: 'active',
                    source,
                    xref: {
                        displayId: 'test',
                        externalResource: { name: 'NCBI Gene' },
                    },
                };

                expect(xref.source).toBe(source);
            });
        });
    });

    describe('Date Handling', () => {
        it('should handle creation date properly', () => {
            const creationDate = new Date('2023-03-15T10:30:00Z');
            const xref: Xref = {
                geneId: 900,
                xrefId: 1000,
                creationDate,
                withdrawnDate: null,
                status: 'active',
                source: 'automatic',
                xref: {
                    displayId: 'DATE:123',
                    externalResource: { name: 'NCBI Gene' },
                },
            };

            expect(xref.creationDate).toEqual(creationDate);
            expect(xref.creationDate.getFullYear()).toBe(2023);
            expect(xref.creationDate.getMonth()).toBe(2); // March is month 2 (0-indexed)
            expect(xref.creationDate.getDate()).toBe(15);
        });

        it('should handle withdrawal date properly', () => {
            const creationDate = new Date('2023-01-01');
            const withdrawnDate = new Date('2023-12-31');

            const xref: Xref = {
                geneId: 1100,
                xrefId: 1200,
                creationDate,
                withdrawnDate,
                status: 'withdrawn',
                source: 'manual',
                xref: {
                    displayId: 'WITHDRAWN:123',
                    externalResource: { name: 'UniProt' },
                },
            };

            expect(xref.withdrawnDate).toEqual(withdrawnDate);
            expect(xref.withdrawnDate!.getFullYear()).toBe(2023);
            expect(xref.withdrawnDate!.getMonth()).toBe(11); // December is month 11
        });

        it('should validate date chronology', () => {
            const xref: Xref = {
                geneId: 1300,
                xrefId: 1400,
                creationDate: new Date('2023-01-01'),
                withdrawnDate: new Date('2023-06-01'),
                status: 'withdrawn',
                source: 'manual',
                xref: {
                    displayId: 'CHRONO:123',
                    externalResource: { name: 'NCBI Gene' },
                },
            };

            expect(xref.creationDate.getTime()).toBeLessThan(xref.withdrawnDate!.getTime());
        });
    });

    describe('XrefData Integration', () => {
        it('should properly embed XrefData', () => {
            const xrefData: XrefData = {
                displayId: 'EMBEDDED:123',
                externalResource: { name: 'Phytozome v4_1' },
            };

            const xref: Xref = {
                geneId: 1500,
                xrefId: 1600,
                creationDate: new Date(),
                withdrawnDate: null,
                status: 'active',
                source: 'automatic',
                xref: xrefData,
            };

            expect(xref.xref).toBe(xrefData);
            expect(xref.xref.displayId).toBe('EMBEDDED:123');
            expect(xref.xref.externalResource.name).toBe('Phytozome v4_1');
        });

        it('should work with all external resource types', () => {
            const resourceTypes = [
                'NCBI Gene',
                'Ensembl Gene',
                'UniProt',
                'PubMed',
                'Phytozome v4_1',
                'CBI sequence viewer',
            ] as const;

            resourceTypes.forEach((resourceName, index) => {
                const xref: Xref = {
                    geneId: index + 1,
                    xrefId: index + 100,
                    creationDate: new Date(),
                    withdrawnDate: null,
                    status: 'active',
                    source: 'automatic',
                    xref: {
                        displayId: `${resourceName}:${index}`,
                        externalResource: { name: resourceName },
                    },
                };

                expect(xref.xref.externalResource.name).toBe(resourceName);
            });
        });
    });

    describe('ID Management', () => {
        it('should handle positive gene IDs', () => {
            const xref: Xref = {
                geneId: 12345,
                xrefId: 67890,
                creationDate: new Date(),
                withdrawnDate: null,
                status: 'active',
                source: 'automatic',
                xref: {
                    displayId: 'POSITIVE:123',
                    externalResource: { name: 'NCBI Gene' },
                },
            };

            expect(xref.geneId).toBe(12345);
            expect(xref.xrefId).toBe(67890);
            expect(xref.geneId).toBeGreaterThan(0);
            expect(xref.xrefId).toBeGreaterThan(0);
        });

        it('should handle large ID numbers', () => {
            const largeGeneId = 999999999;
            const largeXrefId = 888888888;

            const xref: Xref = {
                geneId: largeGeneId,
                xrefId: largeXrefId,
                creationDate: new Date(),
                withdrawnDate: null,
                status: 'active',
                source: 'automatic',
                xref: {
                    displayId: 'LARGE:123',
                    externalResource: { name: 'NCBI Gene' },
                },
            };

            expect(xref.geneId).toBe(largeGeneId);
            expect(xref.xrefId).toBe(largeXrefId);
        });
    });

    describe('Array Operations', () => {
        it('should work in arrays', () => {
            const xrefArray: Xref[] = [
                {
                    geneId: 1,
                    xrefId: 10,
                    creationDate: new Date('2023-01-01'),
                    withdrawnDate: null,
                    status: 'active',
                    source: 'automatic',
                    xref: {
                        displayId: 'ARRAY1:123',
                        externalResource: { name: 'NCBI Gene' },
                    },
                },
                {
                    geneId: 2,
                    xrefId: 20,
                    creationDate: new Date('2023-02-01'),
                    withdrawnDate: new Date('2023-06-01'),
                    status: 'withdrawn',
                    source: 'manual',
                    xref: {
                        displayId: 'ARRAY2:456',
                        externalResource: { name: 'UniProt' },
                    },
                },
            ];

            expect(xrefArray).toHaveLength(2);
            expect(xrefArray[0].status).toBe('active');
            expect(xrefArray[1].status).toBe('withdrawn');
        });

        it('should filter by status', () => {
            const xrefArray: Xref[] = [
                {
                    geneId: 1,
                    xrefId: 1,
                    creationDate: new Date(),
                    withdrawnDate: null,
                    status: 'active',
                    source: 'automatic',
                    xref: { displayId: 'A1', externalResource: { name: 'NCBI Gene' } },
                },
                {
                    geneId: 2,
                    xrefId: 2,
                    creationDate: new Date(),
                    withdrawnDate: new Date(),
                    status: 'withdrawn',
                    source: 'manual',
                    xref: { displayId: 'A2', externalResource: { name: 'UniProt' } },
                },
                {
                    geneId: 3,
                    xrefId: 3,
                    creationDate: new Date(),
                    withdrawnDate: null,
                    status: 'active',
                    source: 'automatic',
                    xref: { displayId: 'A3', externalResource: { name: 'PubMed' } },
                },
            ];

            const activeXrefs = xrefArray.filter(x => x.status === 'active');
            const withdrawnXrefs = xrefArray.filter(x => x.status === 'withdrawn');

            expect(activeXrefs).toHaveLength(2);
            expect(withdrawnXrefs).toHaveLength(1);
        });

        it('should find by gene ID', () => {
            const xrefArray: Xref[] = [
                {
                    geneId: 100,
                    xrefId: 1,
                    creationDate: new Date(),
                    withdrawnDate: null,
                    status: 'active',
                    source: 'automatic',
                    xref: { displayId: 'FIND:100', externalResource: { name: 'NCBI Gene' } },
                },
                {
                    geneId: 200,
                    xrefId: 2,
                    creationDate: new Date(),
                    withdrawnDate: null,
                    status: 'active',
                    source: 'automatic',
                    xref: { displayId: 'FIND:200', externalResource: { name: 'UniProt' } },
                },
            ];

            const found = xrefArray.find(x => x.geneId === 200);
            expect(found).toBeDefined();
            expect(found?.xref.displayId).toBe('FIND:200');
            expect(found?.xref.externalResource.name).toBe('UniProt');
        });
    });

    describe('Object Operations', () => {
        it('should support object destructuring', () => {
            const xref: Xref = {
                geneId: 777,
                xrefId: 888,
                creationDate: new Date('2023-05-01'),
                withdrawnDate: null,
                status: 'active',
                source: 'automatic',
                xref: {
                    displayId: 'DESTRUCT:777',
                    externalResource: { name: 'Ensembl Gene' },
                },
            };

            const { geneId, xrefId, status, source, xref: xrefData } = xref;

            expect(geneId).toBe(777);
            expect(xrefId).toBe(888);
            expect(status).toBe('active');
            expect(source).toBe('automatic');
            expect(xrefData.displayId).toBe('DESTRUCT:777');
        });

        it('should support nested destructuring', () => {
            const xref: Xref = {
                geneId: 999,
                xrefId: 1111,
                creationDate: new Date(),
                withdrawnDate: null,
                status: 'active',
                source: 'automatic',
                xref: {
                    displayId: 'NESTED:999',
                    externalResource: { name: 'PubMed' },
                },
            };

            const {
                xref: {
                    displayId,
                    externalResource: { name },
                },
            } = xref;

            expect(displayId).toBe('NESTED:999');
            expect(name).toBe('PubMed');
        });

        it('should work as object values', () => {
            const xrefMap: Record<string, Xref> = {
                first: {
                    geneId: 1,
                    xrefId: 1,
                    creationDate: new Date(),
                    withdrawnDate: null,
                    status: 'active',
                    source: 'automatic',
                    xref: { displayId: 'MAP:1', externalResource: { name: 'NCBI Gene' } },
                },
                second: {
                    geneId: 2,
                    xrefId: 2,
                    creationDate: new Date(),
                    withdrawnDate: null,
                    status: 'active',
                    source: 'manual',
                    xref: { displayId: 'MAP:2', externalResource: { name: 'UniProt' } },
                },
            };

            expect(xrefMap['first'].geneId).toBe(1);
            expect(xrefMap['second'].source).toBe('manual');
            expect(xrefMap['first'].xref.externalResource.name).toBe('NCBI Gene');
        });
    });

    describe('Type Guards and Validation', () => {
        it('should validate xref structure', () => {
            function isValidXref(obj: any): obj is Xref {
                return (
                    obj &&
                    typeof obj.geneId === 'number' &&
                    typeof obj.xrefId === 'number' &&
                    obj.creationDate instanceof Date &&
                    (obj.withdrawnDate === null || obj.withdrawnDate instanceof Date) &&
                    typeof obj.status === 'string' &&
                    typeof obj.source === 'string' &&
                    obj.xref &&
                    typeof obj.xref.displayId === 'string'
                );
            }

            const validXref: Xref = {
                geneId: 123,
                xrefId: 456,
                creationDate: new Date(),
                withdrawnDate: null,
                status: 'active',
                source: 'automatic',
                xref: { displayId: 'VALID:123', externalResource: { name: 'NCBI Gene' } },
            };

            const invalidXref = {
                geneId: '123', // should be number
                xrefId: 456,
                creationDate: new Date(),
                withdrawnDate: null,
                status: 'active',
                source: 'automatic',
                xref: { displayId: 'INVALID:123', externalResource: { name: 'NCBI Gene' } },
            };

            expect(isValidXref(validXref)).toBe(true);
            expect(isValidXref(invalidXref)).toBe(false);
        });

        it('should check if xref is active', () => {
            function isActiveXref(xref: Xref): boolean {
                return xref.withdrawnDate === null && xref.status === 'active';
            }

            const activeXref: Xref = {
                geneId: 1,
                xrefId: 1,
                creationDate: new Date(),
                withdrawnDate: null,
                status: 'active',
                source: 'automatic',
                xref: { displayId: 'ACTIVE:1', externalResource: { name: 'NCBI Gene' } },
            };

            const withdrawnXref: Xref = {
                geneId: 2,
                xrefId: 2,
                creationDate: new Date(),
                withdrawnDate: new Date(),
                status: 'withdrawn',
                source: 'manual',
                xref: { displayId: 'WITHDRAWN:2', externalResource: { name: 'UniProt' } },
            };

            expect(isActiveXref(activeXref)).toBe(true);
            expect(isActiveXref(withdrawnXref)).toBe(false);
        });
    });

    describe('JSON Serialization', () => {
        it('should serialize and deserialize correctly', () => {
            const originalXref: Xref = {
                geneId: 12345,
                xrefId: 67890,
                creationDate: new Date('2023-01-15T10:30:00Z'),
                withdrawnDate: null,
                status: 'active',
                source: 'automatic',
                xref: {
                    displayId: 'JSON:12345',
                    externalResource: { name: 'NCBI Gene' },
                },
            };

            const jsonString = JSON.stringify(originalXref);
            const parsed = JSON.parse(jsonString);

            // Note: Dates become strings in JSON
            expect(parsed.geneId).toBe(12345);
            expect(parsed.xrefId).toBe(67890);
            expect(parsed.creationDate).toBe('2023-01-15T10:30:00.000Z');
            expect(parsed.withdrawnDate).toBeNull();
            expect(parsed.status).toBe('active');
            expect(parsed.xref.displayId).toBe('JSON:12345');
        });

        it('should handle arrays in JSON', () => {
            const xrefArray: Xref[] = [
                {
                    geneId: 1,
                    xrefId: 10,
                    creationDate: new Date('2023-01-01'),
                    withdrawnDate: null,
                    status: 'active',
                    source: 'automatic',
                    xref: { displayId: 'JSON-ARRAY:1', externalResource: { name: 'NCBI Gene' } },
                },
                {
                    geneId: 2,
                    xrefId: 20,
                    creationDate: new Date('2023-02-01'),
                    withdrawnDate: new Date('2023-06-01'),
                    status: 'withdrawn',
                    source: 'manual',
                    xref: { displayId: 'JSON-ARRAY:2', externalResource: { name: 'UniProt' } },
                },
            ];

            const jsonString = JSON.stringify(xrefArray);
            const parsed = JSON.parse(jsonString);

            expect(Array.isArray(parsed)).toBe(true);
            expect(parsed).toHaveLength(2);
            expect(parsed[0].geneId).toBe(1);
            expect(parsed[1].status).toBe('withdrawn');
        });
    });

    describe('Edge Cases', () => {
        it('should handle edge case IDs', () => {
            const edgeXref: Xref = {
                geneId: 1,
                xrefId: 1,
                creationDate: new Date(),
                withdrawnDate: null,
                status: 'active',
                source: 'automatic',
                xref: {
                    displayId: 'EDGE:1',
                    externalResource: { name: 'NCBI Gene' },
                },
            };

            expect(edgeXref.geneId).toBe(1);
            expect(edgeXref.xrefId).toBe(1);
        });

        it('should handle special status values', () => {
            const specialStatuses = ['ACTIVE', 'WITHDRAWN', 'pending', 'APPROVED'];

            specialStatuses.forEach(status => {
                const xref: Xref = {
                    geneId: 1,
                    xrefId: 1,
                    creationDate: new Date(),
                    withdrawnDate: null,
                    status,
                    source: 'automatic',
                    xref: { displayId: 'SPECIAL:1', externalResource: { name: 'NCBI Gene' } },
                };

                expect(xref.status).toBe(status);
            });
        });

        it('should handle empty source values', () => {
            const xref: Xref = {
                geneId: 1,
                xrefId: 1,
                creationDate: new Date(),
                withdrawnDate: null,
                status: 'active',
                source: '',
                xref: {
                    displayId: 'EMPTY-SOURCE:1',
                    externalResource: { name: 'NCBI Gene' },
                },
            };

            expect(xref.source).toBe('');
        });
    });

    describe('Type Safety', () => {
        it('should enforce type constraints', () => {
            const xref: Xref = {
                geneId: 12345,
                xrefId: 67890,
                creationDate: new Date(),
                withdrawnDate: null,
                status: 'active',
                source: 'automatic',
                xref: {
                    displayId: 'TYPE-SAFE:12345',
                    externalResource: { name: 'NCBI Gene' },
                },
            };

            // Verify all required fields are present and of correct type
            expect(typeof xref.geneId).toBe('number');
            expect(typeof xref.xrefId).toBe('number');
            expect(xref.creationDate instanceof Date).toBe(true);
            expect(xref.withdrawnDate === null || xref.withdrawnDate instanceof Date).toBe(true);
            expect(typeof xref.status).toBe('string');
            expect(typeof xref.source).toBe('string');
            expect(typeof xref.xref.displayId).toBe('string');
            expect(typeof xref.xref.externalResource.name).toBe('string');
        });

        it('should work with function parameters', () => {
            function processXref(xref: Xref): string {
                return `Gene ${xref.geneId}: ${xref.xref.displayId} (${xref.status})`;
            }

            const xref: Xref = {
                geneId: 999,
                xrefId: 777,
                creationDate: new Date(),
                withdrawnDate: null,
                status: 'active',
                source: 'automatic',
                xref: { displayId: 'FUNC:999', externalResource: { name: 'NCBI Gene' } },
            };

            const result = processXref(xref);
            expect(result).toBe('Gene 999: FUNC:999 (active)');
        });

        it('should work with return types', () => {
            function createXref(geneId: number, displayId: string): Xref {
                return {
                    geneId,
                    xrefId: geneId + 1000,
                    creationDate: new Date(),
                    withdrawnDate: null,
                    status: 'active',
                    source: 'automatic',
                    xref: {
                        displayId,
                        externalResource: { name: 'NCBI Gene' },
                    },
                };
            }

            const xref = createXref(555, 'CREATE:555');
            expect(xref.geneId).toBe(555);
            expect(xref.xrefId).toBe(1555);
            expect(xref.xref.displayId).toBe('CREATE:555');
        });
    });
});
