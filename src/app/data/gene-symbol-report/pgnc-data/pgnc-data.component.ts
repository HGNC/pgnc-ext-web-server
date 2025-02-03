import { Component, Input, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { GeneSymbolReport } from '../gene-symbol-report.model';
import { GeneSymbol } from '../gene-symbol.model';
import { GeneName } from '../gene-name.model';
import { GeneLocation } from '../gene-location.model';
import { Xref } from '../xref-resources/xref-resources.model';

@Component({
    selector: 'app-pgnc-data',
    imports: [FontAwesomeModule],
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
        this.appSymbol = this.result.data?.geneSymbols?.find((geneSymbol) => {
            return geneSymbol.type === 'approved';
        });
        this.appName = this.result.data?.geneNames?.find((geneName) => {
            return geneName.type === 'approved';
        });
        this.prevSymbols = this.result.data?.geneSymbols?.filter((geneSymbol) => {
            return geneSymbol.type === 'previous';
        });
        this.prevNames = this.result.data?.geneNames?.filter((geneName) => {
            return geneName.type === 'previous';
        });
        this.aliasSymbols = this.result.data?.geneSymbols?.filter((geneSymbol) => {
            return geneSymbol.type === 'alias';
        });
        this.aliasNames = this.result.data?.geneNames?.filter((geneName) => {
            return geneName.type === 'alias';
        });
        this.location = this.result.data?.geneLocations?.find((geneLocation) => {
            return (
                geneLocation.location.type === 'primary assembly' &&
                geneLocation.location.coordSystem === 'chromosome'
            );
        });
    }
}
