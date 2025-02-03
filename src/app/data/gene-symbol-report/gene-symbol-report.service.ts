import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneSymbolReport } from './gene-symbol-report.model';
import { catchError, Observable, throwError, map } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { AuthService } from '../../common/services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class GeneReportService {
    private httpClient = inject(HttpClient);
    private authService = inject(AuthService);
    error = signal<string | undefined>(undefined);

    public getReportById(pgncId: string): Observable<GeneSymbolReport> {
        if (pgncId.startsWith('PGNC:')) {
            pgncId = pgncId.substring(5);
        }

        let creds$ = this.authService.getJwt();
        let renewedCreds$ = this.authService.renewToken();

        let report$: Observable<any> = creds$
            .pipe(
                switchMap((jwt) => {
                    return this.httpClient.get<GeneSymbolReport>(`/api/gene/${pgncId}`, {
                        headers: new HttpHeaders({
                            Accept: 'application/json',
                            Authorization: 'Bearer ' + jwt.data.accessToken,
                        }),
                    });
                }),
                catchError((error) => {
                    if (error.error.message === 'jwt expired') {
                        return renewedCreds$
                            .pipe(
                                switchMap(() => creds$),
                                switchMap((jwt) => {
                                    return this.httpClient.get<GeneSymbolReport>(
                                        `/api/gene/${pgncId}`,
                                        {
                                            headers: new HttpHeaders({
                                                Accept: 'application/json',
                                                Authorization: 'Bearer ' + jwt.data.accessToken,
                                            }),
                                        },
                                    );
                                }),
                            )
                            .pipe(
                                catchError((error) => {
                                    return throwError(
                                        () =>
                                            new Error(
                                                'Problem refreshing internal token. Please reload the page',
                                            ),
                                    );
                                }),
                            );
                    } else {
                        return throwError(
                            () =>
                                new Error(
                                    'Problem found when fetching data. Please try again later',
                                ),
                        );
                    }
                }),
            )
            .pipe(
                catchError((error) => {
                    return throwError(() => new Error(error));
                }),
            );
        return report$;
    }
}
