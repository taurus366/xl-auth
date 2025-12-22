import { Injectable } from '@angular/core';
import { BaseDetailCrud } from 'xl-util';
import { IUser } from './interfaces';
import {ROUTES} from '../api.routes';

@Injectable({ providedIn: 'root' })
export class DetailService extends BaseDetailCrud<IUser> {
    saveRoute = ROUTES.user.save;
    getRoute = ROUTES.user.get;
    deleteRoute = ROUTES.user.delete;
}
