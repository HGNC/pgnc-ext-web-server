import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { env } from 'process';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private jwt!: string;

    getJwt() {
        if (!this.jwt) {
            this.jwt = environment.jwt
        }
        return this.jwt;
    }

}
