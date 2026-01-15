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
import { TranslatePipe } from '@ngx-translate/core';
import { SelectionService } from 'xl-util';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'user-list',
    standalone: true,
    imports: [CommonModule, TableModule, ButtonModule, TagModule, Toolbar, UserDetailComponent, TranslatePipe],
    template: `
        <!--        <div class="card">-->
        <p-toolbar class="mb-6" *ngIf="config?.data?.mode !== 'lookup'">
            <ng-template #start>
                <p-button [label]="'New' | translate" icon="pi pi-plus" severity="primary" class="mr-2" (onClick)="detailService.openCreateDialog()"></p-button>
                <p-button severity="warn" [label]="'Delete' | translate" icon="pi pi-trash" outlined [disabled]="!selectedUsers" />
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
                    <th>{{ 'Id' | translate }}</th>
                    <th>{{'User' | translate}}</th>
                    <th>{{'Email' | translate}}</th>
                    <th>{{'Status' | translate}}</th>
                    <th style="width: 8rem"></th>
                </tr>
            </ng-template>

            <ng-template pTemplate="body" let-user>
                <tr (click)="onRowClick(user)" [ngClass]="{'cursor-pointer hover:bg-blue-50': this.config?.data?.mode === 'lookup'}">
                    <td (click)="$event.stopPropagation()">
                        <p-tableCheckbox [value]="user"></p-tableCheckbox>
                    </td>

                    <td>{{ user.id }}</td>
                    <td>{{ user.firstName }} {{ user.middleName }} {{ user.lastName }}</td>
                    <td>{{ user.email }}</td>
                    <td>
                        <p-tag [severity]="user.active ? 'success' : 'danger'" [value]=" user.active ? 'Active' : 'Blocked' | translate"> </p-tag>
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

        <user-detail *ngIf="config?.data?.mode !== 'lookup'"></user-detail>
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

    public selectionService = inject(SelectionService);
    private ref = inject(DynamicDialogRef, { optional: true });
    // Инжектираме конфигурацията на диалога
    protected config = inject(DynamicDialogConfig, { optional: true });
    // Този метод трябва да се извика при клик в таблицата
    onRowClick(user: IUser) {
        // ПРОВЕРКА: Изпълнявай избора САМО ако сме в режим lookup
        if (this.config?.data?.mode === 'lookup') {
            this.selectionService.select(user);

            if (this.ref) {
                this.ref.close(user);
            }
        } else {
            // Ако сме в обикновения списък, тук може да не правим нищо
            // или например да отваряме детайла за преглед:
            // this.detailService.openEditDialog(user);
            console.log('Кликнат ред в обикновен списък - не правим lookup.');
        }
    }
}
