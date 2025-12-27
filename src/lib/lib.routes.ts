import { registerMenu, registerRoute , registerTopbarAction} from 'xl-util';
import {TopBarUserComponent} from './topBar-user/tUser.component';
import {UserListComponent} from './user/list';

export const UserModuleActivator = true; // Просто флаг
registerRoute([
    {
        path: 'user/list',
        loadComponent: () => import('./user/list').then(c => c.UserListComponent)
    }
]);
registerMenu([
    // {
    //     label: 'Администрация',
    //     items: [{ label: 'Потребители', icon: 'pi pi-users', routerLink: ['/user/list'] }]
    // }
]);
registerTopbarAction(TopBarUserComponent);
// registerTopbarAction(UserListComponent);





