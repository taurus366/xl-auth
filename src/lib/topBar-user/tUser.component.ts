// tUser.component.ts
import { AfterViewInit, Component, inject, input, TemplateRef, ViewChild } from '@angular/core';
import { TopbarRegistryService } from 'xl-util';
import { StyleClass } from 'primeng/styleclass';
import { AuthService } from '../auth.service';
import { Tooltip } from 'primeng/tooltip';
import { NgForOf, NgTemplateOutlet } from '@angular/common';
// import { Input } from 'postcss';

@Component({
    selector: 'layout-topbar-menu',
    standalone: true,
    imports: [StyleClass, Tooltip, NgTemplateOutlet, NgForOf],
    template: `
        <ng-template #topbarBtn>
            <button class="layout-topbar-action" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true" pTooltip="Profile">
                <i class="pi pi-user"></i>
                <span>User</span>
            </button>
            <div class="hidden absolute right-0 top-full mt-2 w-40 p-2 bg-surface-0 shadow-md rounded-md z-50">
                <button class="p-link flex items-center gap-2 w-full p-2 hover:bg-surface-100 rounded-md" (click)="openProfile()"><i class="pi pi-id-card"></i> Profile</button>

                <ng-container *ngFor="let tpl of registry.submenus()[menuId()]">
                    <ng-container *ngTemplateOutlet="tpl"></ng-container>
                </ng-container>

                <button class="p-link flex items-center gap-2 w-full p-2 hover:bg-surface-100 rounded-md text-red-500" (click)="logout()"><i class="pi pi-sign-out"></i> Logout</button>
            </div>
        </ng-template>
    `
})
export class TopBarUserComponent implements AfterViewInit {

    // Дефинираме името ТУК, вътре в компонента
    static menuName = 'user';

    // Остава си като input, за да го ползваме в шаблона
    public menuId = input<string>(TopBarUserComponent.menuName);

    @ViewChild('topbarBtn') topbarBtn!: TemplateRef<any>;
    registry = inject(TopbarRegistryService);
    public authService = inject(AuthService);

    ngAfterViewInit() {
        // Когато компонентът се зареди, той се записва в регистъра
        this.registry.registerTemplate(this.topbarBtn as any);
        // this.registry.registerSubmenuAction("user", this.topbarBtn);
    }

    ngOnDestroy() {
        // Премахваме го точно този шаблон при унищожаване на компонента
        this.registry.removeTemplate(this.topbarBtn as any);
    }

    openProfile() {
        console.log('Go to profile');
    }

    logout() {
        // console.log("Logout clicked");
        // Тук по-късно ще викаш AuthService.logout()
        this.authService.logout();
    }
}
