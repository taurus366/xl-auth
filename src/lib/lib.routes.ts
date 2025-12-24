import { Route } from '@angular/router';
import { UserListComponent } from './user/list';
import { registerMenu, registerRoute } from 'xl-util';

export const UserModuleActivator = true; // Просто флаг
registerRoute([
    {
        path: 'user/list',
        loadComponent: () => import('./user/list').then(c => c.UserListComponent)
    }
]);
registerMenu([
    {
        label: 'Администрация',
        items: [{ label: 'Потребители', icon: 'pi pi-users', routerLink: ['/user/list'] }]
    }
]);

