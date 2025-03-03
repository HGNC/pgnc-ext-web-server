import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, shareReplay, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { LoginCredentials } from '../models/login-credentials.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private userName: string = environment.apiUser || '';
    private password: string = environment.apiPassword || '';
    private jwtResult: LoginCredentials | undefined;

    private httpClient = inject(HttpClient);
    error = signal<string>('');

    getJwt() {
        if (!this.jwtResult) {
            return this.signIn().pipe(
                map(resp => {
                    this.jwtResult = resp;
                    return this.jwtResult;
                }),
                catchError(error => {
                    this.jwtResult = undefined;
                    return throwError(() => new Error(`Problem found when signing in. ${error}`));
                }),
                shareReplay(1)
            );
        } else {
            return new Observable<LoginCredentials>(observer => {
                observer.next(this.jwtResult);
                observer.complete();
            });
        }
    }

    renewToken(): Observable<LoginCredentials> {
        return this.httpClient
            .post<LoginCredentials>('/api/auth/refresh-tokens', {
                refreshToken: this.jwtResult?.data.refreshToken,
            })
            .pipe(
                map(resp => {
                    this.jwtResult = resp;
                    return this.jwtResult;
                }),
                catchError(error => {
                    this.jwtResult = undefined;
                    return throwError(
                        () =>
                            new Error(
                                `Problem found when refreshing token. Please sign in again. ${error}`
                            )
                    );
                }),
                shareReplay(1)
            );
    }

    private signIn(): Observable<LoginCredentials> {
        return this.httpClient.post<LoginCredentials>('/api/auth/sign-in', {
            email: this.userName,
            password: this.password,
        });
    }
}
