import { InjectionToken } from '@angular/core';

export interface XlAuthConfig {
    apiUrl: string;
}
export const XL_AUTH_CONFIG = new InjectionToken<XlAuthConfig>('XL_AUTH_CONFIG');
