export interface GeneLocation {
    creationDate: Date;
    withdrawnDate: Date | null;
    location: {
        name: string;
        refseqAccession: string;
        genbankAccession: string;
        coordSystem: string;
        type: string;
    };
}
