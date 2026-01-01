import { effect, inject, Injectable } from '@angular/core';
import { BaseDetailCrud, SelectionService } from 'xl-util';
import { IUser } from './interfaces';
import {ROUTES} from '../api.routes';
import { data } from 'autoprefixer';

@Injectable({ providedIn: 'root' })
export class DetailService extends BaseDetailCrud<IUser> {
    saveRoute = ROUTES.user.save;
    getRoute = ROUTES.user.get;
    deleteRoute = ROUTES.user.delete;

    constructor() {
        super();

        // Използваме ефект, за да следим промените
        effect(() => {
            // ИЗВИКВАМЕ сигнала със скоби (), за да вземем стойността му
            const data = this.selectionService.selectedItem();

            if (data && this.isVisible()) {
                this.patchSelectedUser(data);
            }
        });
    }

    private patchSelectedUser(data: any) {
        const current = this.selectedItem(); // Вземаме текущия сигнал
        if (current) {
            this.selectedItem.set({
                ...current,
                middleName: data.firstName // Примерно попълване
            });
        }
    }


    protected override handleLookupSelection(item: any) {
       const current = this.selectedItem();
       if (!current) return;

       this.selectedItem.set({
           ...current,
           middleName: item.firstName
       })
    }
}
