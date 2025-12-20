import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
       if(!this.authService.isLoggedIn()) {
           this.router.navigate(['/login']);
           return false;
       }

       return this.authService.loadUser().pipe(
           map(user => {
               console.log(user);
               return true;
           }),
           catchError(error => {
               this.router.navigate(['/login']);
               return of(false);
           })
       )

       // this.router.navigate(['/login']);
       // return false;
    }
}
