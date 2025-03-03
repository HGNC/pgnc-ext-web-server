import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import { GeneSymbol } from '../gene-symbol.model';
import { GeneSymbolReport } from '../gene-symbol-report.model';
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

    classifiedXrefs: Record<ExternalResourceName, Xref[] | string> = {
        'NCBI Gene': [],
        'Ensembl Gene': [],
        UniProt: [],
        PubMed: [],
        Phytozome: [],
        'CBI sequence viewer': '',
    };

    xrefURLS: Record<ExternalResourceName, string> = {
        'NCBI Gene': 'https://www.ncbi.nlm.nih.gov/gene/',
        'Ensembl Gene': 'https://plants.ensembl.org/Populus_trichocarpa/Gene/Summary?db=core;g=',
        UniProt: 'https://www.uniprot.org/uniprotkb/',
        PubMed: 'https://pubmed.ncbi.nlm.nih.gov/',
        Phytozome: 'https://phytozome-next.jgi.doe.gov/report/gene/Ptrichocarpa_v4_1/',
        'CBI sequence viewer': 'https://fair.ornl.gov/ThridParty/jbrowse2/?PGNCID=',
    };

    xrefFrags: Record<ExternalResourceName, string> = {
        'NCBI Gene': 'ncbi_g',
        'Ensembl Gene': 'ens_g',
        UniProt: 'unip',
        PubMed: 'pubmed',
        Phytozome: 'phytoz',
        'CBI sequence viewer': 'cbi_v',
    };

    ngOnInit() {
        const geneXrefs = this.result.data?.geneXrefs ?? [];
        Object.keys(this.xrefURLS).forEach(key => {
            if (this.isValidResourceName(key)) {
                this.classifiedXrefs[key] = geneXrefs.filter(
                    xref => xref.xref.externalResource.name === key
                );
            }
        });
        this.appSymbol = this.result.data?.geneSymbols?.find(geneSymbol => {
            return geneSymbol.type === 'approved';
        });
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
