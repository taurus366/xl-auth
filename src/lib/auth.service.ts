import { effect, Inject, inject, Injectable, signal } from '@angular/core';
import { XL_AUTH_CONFIG, XlAuthConfig } from './xl-auth.config';
import { HttpClient } from '@angular/common/http';
import { AuthRequest, AuthResponse, UserInfo } from './models';
import { BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(
        private http: HttpClient,
        @Inject(XL_AUTH_CONFIG) private api: XlAuthConfig
    ) {
        effect(() => {
            // const token = this.tokenSignal();
            // console.log(token);
            // if(token === null) {
            //     this.router.navigate(['login']);
            // }
        });
    }

    // private router = inject(Router);
    tokenSignal = signal(localStorage.getItem('token'));


    private sub_api = '/erp/auth';
    private userSubject = new BehaviorSubject<UserInfo | null>(null);
    user$ = this.userSubject.asObservable();

    login(data: AuthRequest) {
        return this.http
            .post<AuthResponse>(`${this.api.apiUrl}${this.sub_api}/login`, data)
            .pipe(tap(res => {
                localStorage.setItem('token', res.token);
                this.tokenSignal.set(res.token);
            }));
    }

    loadUser() {
        return this.http
            .post<UserInfo>(`${this.api.apiUrl}${this.sub_api}/me`, {})
            .pipe(tap(user => this.userSubject.next(user)));
    }

    logout() {
        localStorage.removeItem('token');
        this.userSubject.next(null);
        this.tokenSignal.set(null);
    }

    isLoggedIn(): boolean {
        console.log('isLoggedIn');
        return !!localStorage.getItem('token');
    }

    get token() {
        return localStorage.getItem('token');
    }
}
