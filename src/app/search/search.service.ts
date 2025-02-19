import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    private httpClient = inject(HttpClient);
    private result: string | undefined;

    public searchSolr(query: string): Observable<any> {
        let result$: Observable<any> = this.httpClient
            .get<any>(`/ses/browse?q=${query}&start=0&rows=10`)
            .pipe(
                map(resp => {
                    this.result = resp;
                    console.log('result', this.result);
                    return this.result;
                }),
                catchError(error => {
                    return throwError(() => new Error(error.message));
                })
            );
        return result$;
    }
}
