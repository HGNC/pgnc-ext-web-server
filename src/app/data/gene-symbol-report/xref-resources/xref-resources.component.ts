import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import { GeneSymbolReport } from '../gene-symbol-report.model';
import { GeneSymbol } from '../gene-symbol.model';
import { ExternalResourceName } from './external-resource-name.type';
import { Xref } from './xref-resources.model';

@Component({
    selector: 'app-xref-resources',
    imports: [FontAwesomeModule, RouterLink],
    templateUrl: './xref-resources.component.html',
    styleUrl: './xref-resources.component.css',
})
export class XrefComponent implements OnInit {
    @Input({ required: true }) result!: GeneSymbolReport;
    @Input({ required: true }) symbol!: string;

    faQuestionCircle = faQuestionCircle;

    appSymbol: GeneSymbol | undefined;

    // To add new Phytozome versions, simply add entries here following the pattern:
    // 'Phytozome v{major}_{minor}': []
    // The version detection logic will automatically handle them
    classifiedXrefs: Record<ExternalResourceName, Xref[] | string> = {
        'NCBI Gene': [],
        'Ensembl Gene': [],
        'UniProt': [],
        'PubMed': [],
        'Phytozome v4_1': [],
        'Phytozome v3_1': [],
        'CBI sequence viewer': '',
    };

    // To add new Phytozome versions, add the corresponding URL here:
    xrefURLS: Record<ExternalResourceName, string> = {
        'NCBI Gene': 'https://www.ncbi.nlm.nih.gov/gene/',
        'Ensembl Gene': 'https://plants.ensembl.org/Populus_trichocarpa/Gene/Summary?db=core;g=',
        'UniProt': 'https://www.uniprot.org/uniprotkb/',
        'PubMed': 'https://pubmed.ncbi.nlm.nih.gov/',
        'Phytozome v4_1': 'https://phytozome-next.jgi.doe.gov/report/gene/Ptrichocarpa_v4_1/',
        'Phytozome v3_1': 'https://phytozome-next.jgi.doe.gov/report/gene/Ptrichocarpa_v3_1/',
        'CBI sequence viewer': 'https://fair.ornl.gov/ThirdParty/jbrowse2/?PGNCID=',
    };

    xrefFrags: Record<ExternalResourceName, string> = {
        'NCBI Gene': 'ncbi_g',
        'Ensembl Gene': 'ens_g',
        'UniProt': 'unip',
        'PubMed': 'pubmed',
        'Phytozome v4_1': 'phytoz',
        'Phytozome v3_1': 'phytoz',
        'CBI sequence viewer': 'cbi_v',
    };

    ngOnInit() {
        const geneXrefs = this.result?.data?.geneXrefs ?? [];
        Object.keys(this.xrefURLS).forEach(key => {
            if (this.isValidResourceName(key)) {
                this.classifiedXrefs[key] = geneXrefs.filter(
                    xref => xref?.xref?.externalResource?.name === key
                );
            }
        });
        this.appSymbol = this.result?.data?.geneSymbols?.find(geneSymbol => {
            return geneSymbol.type === 'approved';
        });
    }

    /**
     * Determines which Phytozome version to display based on data availability.
     * Automatically detects all available Phytozome versions and prefers the highest version with data.
     * Returns null if no Phytozome data is available.
     */
    getPreferredPhytozomeVersion(): ExternalResourceName | null {
        // Get all Phytozome versions from the available resources
        const phytozomeVersions = Object.keys(this.classifiedXrefs)
            .filter(key => key.startsWith('Phytozome v'))
            .filter(key => this.isValidResourceName(key)) as ExternalResourceName[];

        if (phytozomeVersions.length === 0) {
            return null;
        }

        // Sort versions by version number (highest first)
        const sortedVersions = phytozomeVersions.sort((a, b) => {
            const versionA = this.extractVersionNumber(a);
            const versionB = this.extractVersionNumber(b);
            return versionB - versionA; // Descending order (highest first)
        });

        // Find the highest version that has data
        for (const version of sortedVersions) {
            const data = this.classifiedXrefs[version];
            if (Array.isArray(data) && data.length > 0) {
                return version;
            }
        }

        // No Phytozome data available
        return null;
    }

    /**
     * Extracts the version number from a Phytozome version string.
     * E.g., "Phytozome v4_1" -> 4.1, "Phytozome v3_1" -> 3.1
     */
    private extractVersionNumber(versionString: string): number {
        const match = versionString.match(/Phytozome v(\d+)_(\d+)/);
        if (match) {
            const major = parseInt(match[1], 10);
            const minor = parseInt(match[2], 10);
            return major + (minor / 10); // Convert to decimal (e.g., 4.1, 3.1)
        }
        return 0; // Fallback for invalid format
    }
    // Type guard to ensure name is ExternalResourceName
    isValidResourceName(name: string): name is ExternalResourceName {
        return name in this.xrefURLS;
    }

    xrefsByResourceName(name: ExternalResourceName, xrefs: Xref[]): Xref[] | undefined {
        return xrefs.filter(xref => xref.xref.externalResource.name === name) || undefined;
    }

    isXrefObject(obj: string | Xref): obj is Xref {
        return typeof obj === 'object' && obj !== null && 'xref' in obj;
    }
}
