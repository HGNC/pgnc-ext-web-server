import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { Xref } from './xref-resources.model';
import { ExternalResourceName } from './external-resource-name.type';
import { GeneSymbolReport } from '../gene-symbol-report.model';

@Component({
    selector: 'app-xref-resources',
    imports: [FontAwesomeModule],
    templateUrl: './xref-resources.component.html',
    styleUrl: './xref-resources.component.css',
})
export class XrefComponent implements OnInit {
    @Input({ required: true }) result!: GeneSymbolReport;
    @Input({ required: true }) symbol!: string;

    faQuestionCircle = faQuestionCircle;

    classifiedXrefs: Record<ExternalResourceName, Xref[]> = {
        'NCBI Gene': [],
        'Ensembl Gene': [],
        UniProt: [],
        PubMed: [],
        Phytozome: [],
    };

    xrefURLS: Record<ExternalResourceName, string> = {
        'NCBI Gene': 'https://www.ncbi.nlm.nih.gov/gene/',
        'Ensembl Gene': 'https://plants.ensembl.org/Populus_trichocarpa/Gene/Summary?db=core;g=',
        UniProt: 'https://www.uniprot.org/uniprotkb/',
        PubMed: 'https://pubmed.ncbi.nlm.nih.gov/',
        Phytozome: 'https://phytozome-next.jgi.doe.gov/report/gene/Ptrichocarpa_v4_1/',
    };

    ngOnInit() {
        const geneXrefs = this.result.data?.geneXrefs ?? [];
        Object.keys(this.xrefURLS).forEach((key) => {
            if (this.isValidResourceName(key)) {
                this.classifiedXrefs[key] = geneXrefs.filter(
                    (xref) => xref.xref.externalResource.name === key,
                );
            }
        });
    }
    // Type guard to ensure name is ExternalResourceName
    isValidResourceName(name: string): name is ExternalResourceName {
        return name in this.xrefURLS;
    }

    xrefsByResourceName(name: ExternalResourceName, xrefs: Xref[]): Xref[] | undefined {
        return xrefs.filter((xref) => xref.xref.externalResource.name === name) || undefined;
    }
}
