import { Component, DestroyRef, inject, Input, OnInit, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { HeaderComponent } from '../../header/header.component';
import { GeneReportService } from './gene-symbol-report.service';
import { GeneSymbolReport } from './gene-symbol-report.model';
import { Xref } from './xref-resources/xref-resources.model';
import { XrefComponent } from './xref-resources/xref-resources.component';
import { PgncDataComponent } from './pgnc-data/pgnc-data.component';


@Component({
  selector: 'app-gene-symbol-report',
  imports: [HeaderComponent, PgncDataComponent, XrefComponent, FontAwesomeModule],
  templateUrl: './gene-symbol-report.component.html',
  styleUrl: './gene-symbol-report.component.css'
})
export class GeneSymbolReportComponent implements OnInit {
    @Input({required: true}) type!: string;
    @Input({required: true}) id!: string;

    faQuestionCircle = faQuestionCircle;

    report = signal<GeneSymbolReport | undefined>(undefined);
    isFetching = signal(false);
    error = signal<string | undefined>(undefined);
    private geneSymbolReportService = inject(GeneReportService);
    private destroyRef = inject(DestroyRef);

    xrefs: Xref[] | undefined;
    result!: GeneSymbolReport;
    appSymbol!: string;

    ngOnInit() {
        this.isFetching.set(true);

        const subscription = this.geneSymbolReportService
            .getReportById(this.id)
            .subscribe({
                next: (result) => {
                    this.report.set(result);
                    this.result = result;
                    if (this.result.data?.geneSymbols) {
                        this.appSymbol = this.result.data.geneSymbols.find(
                            (geneSymbol) => {
                                return geneSymbol.type === 'approved';
                            }
                        )?.symbol.symbol || '';
                    }
                },
                error: (err: Error) => {
                    this.error.set(err.message);
                },
                complete: () => {
                    this.isFetching.set(false);
                },
            });
        this.destroyRef.onDestroy(() => {
            subscription.unsubscribe();
        });
    }
}
