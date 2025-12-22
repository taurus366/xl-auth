import { Route } from '@angular/router';
import { UserListComponent } from './user/list';
// import { XlAuth } from './xl-auth/xl-auth';

// export const xlAuthRoutes: Route[] = [{ path: '', component: XlAuth }];

export const routes: Route[] = [
    {
        path: 'user/list',
        component: UserListComponent
    }
]

