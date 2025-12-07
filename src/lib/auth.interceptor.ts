import { inject, Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const auth = inject(AuthService);
    const token = auth.token;
     if(token) {
         req = req.clone({
             setHeaders: {
                 Authorization: `Bearer ${token}`
             }
         });
     }
     return next(req);
}
