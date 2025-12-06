import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { XL_AUTH_CONFIG, XlAuthConfig } from './xl-auth.config';
import { config } from 'rxjs';

export function provideAuth(config: XlAuthConfig): Provider[] {
    return [
        { provide: XL_AUTH_CONFIG, useValue: config},
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    ];
}
