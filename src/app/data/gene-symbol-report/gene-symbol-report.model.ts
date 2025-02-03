import { GeneSymbol } from './gene-symbol.model';
import { GeneName } from './gene-name.model';
import { GeneLocation } from './gene-location.model';
import { Xref } from './xref-resources/xref-resources.model';

export interface GeneSymbolReport {
    data: {
        id: number;
        creationDate: Date;
        modDate: Date | null;
        withdrawnDate: Date | null;
        status: string;
        species: {
            commonName: string;
            scientificName: string;
        };
        geneNames: [GeneName];
        geneSymbols: [GeneSymbol];
        geneLocusTypes:
            | [
                  {
                      creationDate: Date;
                      modDate: Date | null;
                      withdrawnDate: Date | null;
                      locusType: {
                          name: string;
                          locusGroup: {
                              name: string;
                          };
                      };
                  },
              ]
            | null;
        geneNotes:
            | [
                  {
                      creationDate: Date;
                      modDate: Date | null;
                      withdrawnDate: Date | null;
                      note: {
                          note: string;
                      };
                  },
              ]
            | null;
        geneReplacements:
            | [
                  {
                      replacementId: number;
                      date: Date;
                  },
              ]
            | null;
        genesReplaced:
            | [
                  {
                      previousId: number;
                      date: Date;
                  },
              ]
            | null;
        geneXrefs: Xref[] | undefined;
        geneLocations: [GeneLocation] | null;
    } | null;
    apiVersion: string;
}
