// search.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Subscription } from 'rxjs';

import { NotFoundComponent } from './not-found/not-found.component';
import { Gene, SearchService } from './search.service';

export interface DisplayItem {
    label: string;
    value: string | Record<string, string>;
}

@Pipe({
    name: 'safeHtml',
    pure: true,
})
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}

    transform(value: string): SafeHtml {
        // First, handle <em> tags with existing classes by adding "match" class
        value = value.replace(/<em\s+class="([^"]*)">/g, '<em class="$1 match">');
        // Then, replace plain <em> tags (without classes) with <em class="match">
        value = value.replace(/<em>/g, '<em class="match">');
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
}

@Pipe({
    name: 'safeValue',
    standalone: true,
})
export class SafeValuePipe implements PipeTransform {
    transform(value: string | Record<string, string>): string {
        if (typeof value === 'string') {
            return value;
        }
        return Object.values(value).join(', ');
    }
}

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    imports: [
        FontAwesomeModule,
        FormsModule,
        CommonModule,
        RouterModule,
        SafeValuePipe,
        SafeHtmlPipe,
        NotFoundComponent,
    ],
})
export class SearchComponent implements OnInit, OnDestroy {
    searchQuery = '';
    results: Gene[] = [];
    currentPage = 1;
    pageSize = 10;
    totalResults?: number;
    error?: string;
    private routeSubscription?: Subscription;

    loading$ = this.searchService.loading$;

    // Calculated properties
    get totalPages(): number {
        return this.totalResults ? Math.ceil(this.totalResults / this.pageSize) : 0;
    }

    get startIndex(): number {
        return (this.currentPage - 1) * this.pageSize + 1;
    }

    get endIndex(): number {
        return Math.min(this.currentPage * this.pageSize, this.totalResults || 0);
    }

    constructor(
        public searchService: SearchService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        // Subscribe to route query params changes
        this.routeSubscription = this.route.queryParams.subscribe(params => {
            const query = params['q'] || '';
            if (query !== this.searchQuery) {
                this.searchQuery = query;
                if (query) {
                    this.onSearch();
                }
            }
        });
    }

    ngOnDestroy() {
        if (this.routeSubscription) {
            this.routeSubscription.unsubscribe();
        }
    }

    isRecordValue(value: string | Record<string, string>): value is Record<string, string> {
        return typeof value === 'object' && value !== null;
    }

    getDisplayValue(value: string | Record<string, string>, key?: string): string {
        if (!this.isRecordValue(value)) {
            return value;
        }
        return key && key in value ? value[key] : '';
    }

    onSearch(): void {
        // Update URL with search query
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { q: this.searchQuery },
            queryParamsHandling: 'merge',
        });

        this.currentPage = 1;
        this.loadResults();
    }

    nextPage(): void {
        this.currentPage++;
        this.loadResults();
    }

    previousPage(): void {
        this.currentPage = Math.max(1, this.currentPage - 1);
        this.loadResults();
    }

    onPageSizeChange(): void {
        this.currentPage = 1;
        this.loadResults();
    }

    private loadResults(): void {
        this.error = undefined;
        const q = encodeURIComponent(this.searchQuery);

        this.searchService.browse(q, this.currentPage, this.pageSize).subscribe({
            next: response => {
                // Adjust these based on your actual API response structure
                this.results = response.genes || [];
                this.totalResults = response.total;
            },
            error: err => {
                this.error = err.message || 'Failed to load results';
                this.results = [];
            },
        });
    }

    protected readonly objectKeys = Object.keys;
}
