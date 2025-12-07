import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { XL_AUTH_CONFIG, XlAuthConfig } from './xl-auth.config';

export function provideAuth(config: XlAuthConfig): EnvironmentProviders {
    return makeEnvironmentProviders([
        { provide: XL_AUTH_CONFIG, useValue: config },
    ]);
}
