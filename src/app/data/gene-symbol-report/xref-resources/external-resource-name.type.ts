// To add new Phytozome versions, add them to this type following the pattern:
// | 'Phytozome v{major}_{minor}'
// The component will automatically detect and handle version sorting
export type ExternalResourceName =
    | 'NCBI Gene'
    | 'Ensembl Gene'
    | 'UniProt'
    | 'PubMed'
    | 'Phytozome v4_1'
    | 'Phytozome v3_1'
    | 'CBI sequence viewer';
