import { Component, inject } from '@angular/core';
import { DetailService } from './detail.service';
import { Dialog } from 'primeng/dialog';
import { Button, ButtonDirective } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'user-detail',
    standalone: true,
    imports: [Dialog, Button, InputText, FormsModule, CommonModule, ButtonDirective],
    template: `
        <p-dialog [visible]="detailService.isVisible()" (visibleChange)="detailService.closeDetail()" [modal]="true" [style]="{ width: '500px' }">
            <!--                        [header]="detailService.selectedItem()?.id ? 'Редакция на потребител #' + detailService.selectedItem()?.id : 'Нов потребител'"
-->
            <ng-template #header>
                <div class="w-full text-center">
                    <span class="text-xl font-bold">
                        {{ detailService.selectedItem()?.id ? 'Редакция на потребител #' + detailService.selectedItem()?.id : 'Нов потребител' }}
                    </span>
                </div>
            </ng-template>

            <ng-template #content>
                <div class="grid grid-cols-12 gap-4 pt-2" *ngIf="detailService.selectedItem() as item">
                    <div class="col-span-12">
                        <label class="block font-bold mb-2">Потребителско име</label>
                        <input pInputText [(ngModel)]="item.username" class="w-full" />
                    </div>

                    <div class="col-span-4">
                        <label class="block font-bold mb-2">Име</label>
                        <input pInputText [(ngModel)]="item.firstName" class="w-full" />
                    </div>

                    <div class="col-span-4">
                        <label class="block font-bold mb-2">Презиме</label>
                        <input pInputText [(ngModel)]="item.middleName" class="w-full" />
                    </div>

                    <div class="col-span-4">
                        <label class="block font-bold mb-2">Фамилия</label>
                        <input pInputText [(ngModel)]="item.lastName" class="w-full" />
                    </div>

                    <div class="col-span-12">
                        <label class="block font-bold mb-2">Имейл</label>
                        <input pInputText [(ngModel)]="item.email" class="w-full" />
                    </div>

                    <div class="col-span-12">
                        <label class="block font-bold mb-2">Телефон</label>
                        <input pInputText [(ngModel)]="item.phone" class="w-full" />
                    </div>

                    <div class="col-span-12">
                        <label class="block font-bold mb2">Парола</label>
                        <input pInputText [(ngModel)]="item.password" class="w-full" />
                    </div>
                    <button type="button" pButton icon="pi pi-search" (click)="openLookup()"></button>
                </div>
            </ng-template>

            <ng-template #footer>
                <p-button label="Отказ" severity="secondary" [text]="true" (onClick)="detailService.closeDetail()" />
                <p-button label="Запис" icon="pi pi-check" [loading]="detailService.isSaving()" (onClick)="detailService.saveItem(detailService.selectedItem()!)" />
            </ng-template>

        </p-dialog>
    `
})
export class UserDetailComponent {
    activeTab: any = 0;
    public detailService = inject(DetailService);
    // Махнахме ръчното инициализиране на item, защото BaseDetailCrud го прави в openCreateDialog()

    protected g = inject(TranslateService);
    // private dialogService = inject(DialogService);
    // private ref: DynamicDialogRef<any> | null | undefined; // Референция към прозореца
    async openLookup() {
        // Отваряме списъка в диалог
        // this.ref = this.dialogService.open(UserListComponent, {
        //     header: 'Избери потребител',
        //     width: '70%',
        //     contentStyle: { overflow: 'auto' },
        //     baseZIndex: 99999,
        //     // Предаваме данни, за да знае списъкът, че е в режим "избор"
        //     data: { mode: 'lookup' }
        // });
        const g = this.g.instant('User');
        const rs = await this.detailService.openLookup('user/list', g);
        alert(rs);
    }
}
