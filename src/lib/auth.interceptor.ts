import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { XL_AUTH_CONFIG } from './xl-auth.config';

// export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
//     const auth = inject(AuthService);
//     const config = inject<any>(XL_AUTH_CONFIG as any);
//     const token = auth.token;
//
//     let targetUrl = req.url;
//         alert(targetUrl);
//     // 1. АВТОМАТИЧЕН URL ПРЕФИКС
//     // Ако заявката не е към външен адрес (http) и не е към локални активи (assets)
//     if (!targetUrl.startsWith('http') && !targetUrl.startsWith('./assets')) {
//         // Добавяме Base URL + /erp префикса автоматично
//         const baseUrl = config.apiUrl;
//         const prefix = '/erp';
//
//         // Махаме излишните наклонени черти, за да нямаме "//"
//         const cleanPath = targetUrl.startsWith('/') ? targetUrl : `/${targetUrl}`;
//         targetUrl = `${baseUrl}${prefix}${cleanPath}`;
//     }
//
//     // 2. ДОБАВЯНЕ НА ТОКЕН (Ако съществува)
//     const headers: any = {};
//     if (token) {
//         headers['Authorization'] = `Bearer ${token}`;
//     }
//
//     // Клонираме заявката с новия URL и заглавия
//     const apiReq = req.clone({
//         url: targetUrl,
//         setHeaders: headers
//     });
//
//     return next(apiReq);
// };

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
    const auth = inject(AuthService);
    const config = inject<any>(XL_AUTH_CONFIG as any);
    const token = auth.token;

    let targetUrl = req.url;

    // 1. ПРОВЕРКА ЗА СТАТИЧНИ АКТИВИ И ВЪНШНИ URL-и
    // Проверяваме дали заявката е за assets (с или без точка отпред)
    const isAsset = targetUrl.startsWith('assets/') || targetUrl.startsWith('./assets/');
    const isExternal = targetUrl.startsWith('http');

    if (!isExternal && !isAsset) {
        // Само ако НЕ Е външна и НЕ Е асет, добавяме префикса на бекенда
        const baseUrl = config.apiUrl;
        const prefix = '/erp';

        const cleanPath = targetUrl.startsWith('/') ? targetUrl : `/${targetUrl}`;
        targetUrl = `${baseUrl}${prefix}${cleanPath}`;
    }

    // 2. ДОБАВЯНЕ НА ТОКЕН (Само за API заявки)
    // Обикновено не искаш да пращаш Bearer токен към JSON файловете с преводи
    const authReq = (!isAsset && token) ? req.clone({
        url: targetUrl,
        setHeaders: { 'Authorization': `Bearer ${token}` }
    }) : req.clone({ url: targetUrl });

    return next(authReq);
};
