import * as rxjs from 'rxjs';
import * as i0 from '@angular/core';
import { InjectionToken, Provider } from '@angular/core';
import * as _angular_common_http from '@angular/common/http';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, MaybeAsync, GuardResult } from '@angular/router';

interface XlAuthConfig {
    apiUrl: string;
}
declare const XL_AUTH_CONFIG: InjectionToken<XlAuthConfig>;

interface AuthRequest {
    username: string;
    password: string;
}
interface AuthResponse {
    token: string;
}
interface UserInfo {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    phone: string;
    img: string;
}

declare class AuthService {
    private http;
    private api;
    constructor(http: HttpClient, api: XlAuthConfig);
    private sub_api;
    private userSubject;
    user$: rxjs.Observable<UserInfo | null>;
    login(data: AuthRequest): rxjs.Observable<AuthResponse>;
    loadUser(): rxjs.Observable<UserInfo>;
    logout(): void;
    isLoggedIn(): boolean;
    get token(): string | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthService>;
}

declare class AuthGuard implements CanActivate {
    private authService;
    private router;
    constructor(authService: AuthService, router: Router);
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthGuard>;
}

declare class AuthInterceptor implements HttpInterceptor {
    private authService;
    constructor(authService: AuthService);
    intercept(req: HttpRequest<any>, next: HttpHandler): rxjs.Observable<_angular_common_http.HttpEvent<any>>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AuthInterceptor, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AuthInterceptor>;
}

declare function provideAuth(config: XlAuthConfig): Provider[];

export { AuthGuard, AuthInterceptor, AuthService, XL_AUTH_CONFIG, provideAuth };
export type { AuthRequest, AuthResponse, UserInfo, XlAuthConfig };
