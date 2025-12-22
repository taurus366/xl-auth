import { inject, Injectable } from '@angular/core';
import { BaseListCrud} from 'xl-util';
import {IUser} from './interfaces';
import {ROUTES} from '../api.routes';
import {DetailService} from './detail.service';

@Injectable({
    providedIn: 'root'
})
export class ListService extends BaseListCrud<IUser> {
    listRoute = ROUTES.user.list;


    constructor() {
        super(inject(DetailService));
    }

}
