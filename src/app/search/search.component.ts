import { Component, DestroyRef, inject, Input, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SearchService } from './search.service';

@Component({
    selector: 'app-search',
    imports: [FontAwesomeModule, HeaderComponent],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
    @Input({ required: true }) query!: string;

    searchResult = signal<any | undefined>(undefined);
    isFetching = signal<boolean>(false);
    error = signal<string | undefined>(undefined);
    private searchService = inject(SearchService);
    private destroyRef = inject(DestroyRef);

    ngOnInit() {
        this.isFetching.set(true);
        const subscription = this.searchService.searchSolr(this.query).subscribe({
            next: (result) => {
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
