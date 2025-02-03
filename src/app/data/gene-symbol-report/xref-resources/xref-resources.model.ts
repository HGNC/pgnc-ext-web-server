import { XrefData } from './xref-data.model';

export interface Xref {
    geneId: number;
    xrefId: number;
    creationDate: Date;
    withdrawnDate: Date | null;
    status: string;
    source: string;
    xref: XrefData;
}
