import {
    Component,
    DestroyRef,
    inject,
    Input,
    OnChanges,
    OnInit,
    signal,
    SimpleChanges,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HeaderComponent } from '../header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResultsComponent } from './results/results.component';
import { SearchService } from './search.service';

@Component({
    selector: 'app-search',
    imports: [FontAwesomeModule, HeaderComponent, NotFoundComponent, ResultsComponent],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit, OnChanges {
    @Input({ required: true }) query!: string;

    searchResult = signal<any | undefined>(undefined);
    isFetching = signal<boolean>(false);
    error = signal<string | undefined>(undefined);
    private searchService = inject(SearchService);
    private destroyRef = inject(DestroyRef);

    ngOnInit() {
        this.performSearch();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['query']) {
            this.performSearch();
        }
    }

    private performSearch() {
        this.isFetching.set(true);
        const subscription = this.searchService.searchSolr(this.query).subscribe({
            next: result => {
                this.searchResult.set(result);
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
