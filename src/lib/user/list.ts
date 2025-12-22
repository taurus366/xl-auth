import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListService } from './list.service';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Toolbar } from 'primeng/toolbar';
import { IUser } from './interfaces';
import { DetailService } from './detail.service';
import { UserDetailComponent } from './detail';

@Component({
    selector: 'user-list',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, TagModule, Toolbar, UserDetailComponent],
    template: `
        <!--        <div class="card">-->
        <p-toolbar class="mb-6">
            <ng-template #start>
                <p-button label="Нов" icon="pi pi-plus" severity="primary" class="mr-2" (onClick)="detailService.openCreateDialog()"></p-button>
                <p-button severity="warn" label="Изтриване" icon="pi pi-trash" outlined [disabled]="!selectedUsers" />
            </ng-template>
        </p-toolbar>

        <p-table
            [value]="listService.items()"
            [lazy]="true"
            (onLazyLoad)="onLazyLoad($event)"
            [paginator]="true"
            [rows]="10"
            [totalRecords]="listService.totalRecords()"
            [loading]="listService.loading()"
            [rowsPerPageOptions]="[10, 20, 50]"
            [tableStyle]="{ 'min-width': '50rem' }"
            [(selection)]="selectedUsers"
            [rowHover]="true"
            dataKey="id"
        >
            <ng-template pTemplate="header">
                <tr>
                    <th>
                        <p-tableHeaderCheckbox />
                    </th>
                    <th>ИД</th>
                    <th>Потребител</th>
                    <th>Имейл</th>
                    <th>Статус</th>
                    <th style="width: 8rem"></th>
                </tr>
            </ng-template>

            <ng-template pTemplate="body" let-user>
                <tr>
                    <td>
                        <p-tableCheckbox [value]="user"></p-tableCheckbox>
                    </td>

                    <td>{{user.id}}</td>
                    <td>{{ user.firstName }} {{user.middleName}} {{ user.lastName }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                        <p-tag [severity]="user.active ? 'success' : 'danger'" [value]="user.active ? 'Активен' : 'Блокиран'"> </p-tag>
                    </td>
                    <td>
                        <div class="flex gap-2">
                            <p-button icon="pi pi-pencil" [rounded]="true" [text]="true" severity="secondary" (onClick)="detailService.openEditDialog(user)"></p-button>
                            <p-button icon="pi pi-trash" [rounded]="true" [text]="true" severity="danger" (onClick)="onDelete(user.id)"></p-button>
                        </div>
                    </td>
                </tr>
            </ng-template>
        </p-table>
        <!--        </div>-->



        <user-detail></user-detail>
    `
})
export class UserListComponent {
    public listService = inject(ListService);
    public detailService = inject(DetailService);

    selectedUsers!: IUser[] | null;

    /**
     * Този метод се вика автоматично при:
     * 1. Първоначално зареждане
     * 2. Смяна на страница
     * 3. Сортиране
     */
    onLazyLoad(event: any) {
        this.listService.loadList(event.first, event.rows, event.filters);
    }

    onDelete(id: any) {
        // Използваме метода от абстрактния клас
        if (confirm('Сигурни ли сте?')) {
            this.listService.deleteItem(id);
        }
    }
}
