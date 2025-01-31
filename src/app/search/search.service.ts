import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    private httpClient = inject(HttpClient);
    private result: string | undefined;

    public searchSolr(query: string): Observable<any> {
        let result$: Observable<any> = this.httpClient
            .get<any>(`http://solr-client:3000/browse?q=${query}`)
            .pipe(
                map((resp) => {
                    this.result = resp;
                    return this.result;
                }),
                catchError((error) => {
                    return throwError(() => new Error(error.message));
                })
            );
        return result$;
    }
}
