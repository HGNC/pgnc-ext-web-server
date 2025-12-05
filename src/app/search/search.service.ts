/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, shareReplay, tap } from 'rxjs/operators';

export interface Gene {
    symbol: string;
    name: string;
    url: string;
    display: [
        {
            label: string;
            value: string | Record<string, string>;
        },
    ];
}
export interface SearchResponse {
    genes: Gene[] | undefined;
    total: number;
    start: number;
    rows: number;
}

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    private cache = new Map<string, any>();
    private ongoingRequests = new Map<string, Observable<any>>();
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private loadingCounter = 0;

    public loading$ = this.loadingSubject.asObservable();

    constructor(private http: HttpClient) {}

    private generateCacheKey(q: string, page: number, rows: number): string {
        return `${q}|${page}|${rows}`;
    }

    private updateLoading(increment: boolean): void {
        this.loadingCounter += increment ? 1 : -1;
        this.loadingSubject.next(this.loadingCounter > 0);
    }

    browse(q: string, page: number, rows: number): Observable<SearchResponse> {
        const normalizedPage = page < 1 ? 1 : page;
        const cacheKey = this.generateCacheKey(q, normalizedPage, rows);

        // Return cached data if available
        if (this.cache.has(cacheKey)) {
            return of(this.cache.get(cacheKey));
        }

        // Return ongoing request if available
        if (this.ongoingRequests.has(cacheKey)) {
            return this.ongoingRequests.get(cacheKey)!;
        }

        this.updateLoading(true);
        const start: number = rows * normalizedPage - rows + 1;
        const request = this.http
            .get<SearchResponse>(`/ses/browse`, {
                params: {
                    q: decodeURIComponent(q),
                    start: start.toString(),
                    rows: rows.toString(),
                },
            })
            .pipe(
                tap(data => {
                    this.cache.set(cacheKey, data);
                    this.ongoingRequests.delete(cacheKey);
                    this.updateLoading(false);
                }),
                catchError(error => {
                    this.ongoingRequests.delete(cacheKey);
                    this.updateLoading(false);
                    return throwError(() => error);
                }),
                shareReplay(1)
            );

        this.ongoingRequests.set(cacheKey, request);
        return request;
    }

    clearCache(): void {
        this.cache.clear();
    }

    clearCacheForQuery(q: string): void {
        Array.from(this.cache.keys())
            .filter(key => key.startsWith(`${q}|`))
            .forEach(key => this.cache.delete(key));
    }
}
