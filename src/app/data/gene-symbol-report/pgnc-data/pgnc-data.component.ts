import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

import { GeneLocation } from '../gene-location.model';
import { GeneName } from '../gene-name.model';
import { GeneSymbolReport } from '../gene-symbol-report.model';
import { GeneSymbol } from '../gene-symbol.model';
import { Xref } from '../xref-resources/xref-resources.model';

@Component({
    selector: 'app-pgnc-data',
    imports: [FontAwesomeModule, RouterLink],
    templateUrl: './pgnc-data.component.html',
    styleUrl: './pgnc-data.component.css',
})
export class PgncDataComponent implements OnInit {
    @Input({ required: true }) result!: GeneSymbolReport;
    @Input({ required: true }) symbol!: string;

    faQuestionCircle = faQuestionCircle;

    appSymbol: GeneSymbol | undefined;
    appName: GeneName | undefined;
    prevSymbols: GeneSymbol[] | undefined;
    prevNames: GeneName[] | undefined;
    aliasSymbols: GeneSymbol[] | undefined;
    aliasNames: GeneName[] | undefined;
    location: GeneLocation | undefined;
    xrefs: Xref[] | undefined;

    ngOnInit() {
        this.parseReport();
    }

    parseReport() {
        this.appSymbol = this.result?.data?.geneSymbols?.find(geneSymbol => {
            return geneSymbol.type === 'approved';
        });
        this.appName = this.result?.data?.geneNames?.find(geneName => {
            return geneName.type === 'approved';
        });
        this.prevSymbols = this.result?.data?.geneSymbols?.filter(geneSymbol => {
            return geneSymbol.type === 'previous';
        });
        this.prevNames = this.result?.data?.geneNames?.filter(geneName => {
            return geneName.type === 'previous';
        });
        this.aliasSymbols = this.result?.data?.geneSymbols?.filter(geneSymbol => {
            return geneSymbol.type === 'alias';
        });
        this.aliasNames = this.result?.data?.geneNames?.filter(geneName => {
            return geneName.type === 'alias';
        });
        this.location = this.result?.data?.geneLocations?.find(geneLocation => {
            return (
                geneLocation.location.type === 'primary assembly' &&
                geneLocation.location.coordSystem === 'chromosome'
            );
        });
    }

    getPhytozomeVersion(): string {
        if (!this.result?.data?.primaryIdSource) {
            return 'v4_1';
        }
        const parts = this.result.data.primaryIdSource.split(' ');
        if (parts.length > 1) {
            parts[1] = parts[1].charAt(0).toLowerCase() + parts[1].slice(1);
        }
        return parts.length > 1 ? parts[1] : 'v4_1';
    }
}
