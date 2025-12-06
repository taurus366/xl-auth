import * as i0 from '@angular/core';
import { InjectionToken, Inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import * as i1 from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import * as i2 from '@angular/router';

const XL_AUTH_CONFIG = new InjectionToken('XL_AUTH_CONFIG');

class AuthService {
    http;
    api;
    constructor(http, api) {
        this.http = http;
        this.api = api;
    }
    sub_api = '/erp/auth';
    userSubject = new BehaviorSubject(null);
    user$ = this.userSubject.asObservable();
    login(data) {
        return this.http
            .post(`${this.api.apiUrl}${this.sub_api}/login`, data)
            .pipe(tap(res => localStorage.setItem('token', res.token)));
    }
    loadUser() {
        return this.http
            .post(`${this.api.apiUrl}${this.sub_api}/me`, {})
            .pipe(tap(user => this.userSubject.next(user)));
    }
    logout() {
        localStorage.removeItem('token');
        this.userSubject.next(null);
    }
    isLoggedIn() {
        return !!localStorage.getItem('token');
    }
    get token() {
        return localStorage.getItem('token');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: AuthService, deps: [{ token: i1.HttpClient }, { token: XL_AUTH_CONFIG }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: AuthService, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: AuthService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1.HttpClient }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [XL_AUTH_CONFIG]
                }] }] });

class AuthGuard {
    authService;
    router;
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    canActivate(route, state) {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: AuthGuard, deps: [{ token: AuthService }, { token: i2.Router }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: AuthGuard, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: AuthGuard, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: AuthService }, { type: i2.Router }] });

class AuthInterceptor {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    intercept(req, next) {
        const token = this.authService.token;
        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(req);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: AuthInterceptor, deps: [{ token: AuthService }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: AuthInterceptor });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.1.3", ngImport: i0, type: AuthInterceptor, decorators: [{
            type: Injectable
        }], ctorParameters: () => [{ type: AuthService }] });

function provideAuth(config) {
    return [
        { provide: XL_AUTH_CONFIG, useValue: config },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ];
}

/*
 * Public API Surface of xl-auth
 */
// export * from './lib/xl-auth';

/**
 * Generated bundle index. Do not edit.
 */

export { AuthGuard, AuthInterceptor, AuthService, XL_AUTH_CONFIG, provideAuth };
//# sourceMappingURL=xl-auth.mjs.map
