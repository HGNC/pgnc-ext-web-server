import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginCredentials } from '../models/login-credentials.model';
import { catchError, map, Observable, share, shareReplay, throwError } from 'rxjs';

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
                    return throwError(() => new Error('Problem found when signing in.'));
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
                            new Error('Problem found when refreshing token. Please sign in again.')
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
