import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../services';

import * as fromStore from './../store';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  private isFreshLogin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router,
              private authService: AuthService,
              private store: Store<fromStore.RootState>) {
    this.store.select(fromStore.isFreshLogin)
        .subscribe((val) => this.isFreshLogin$.next(val));
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(state.url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(childRoute, state);
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(`/${route.path}`);
  }

  checkLogin(url: string): boolean {

    const result = this.authService.isAuthenticated();

      if (result) {
        if (!this.isFreshLogin$.getValue()) {
          this.store.dispatch(new fromStore.LoadUserFromLocalStorage());
        }
      } else {

        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;

        // Navigate to the login page with extras
        this.router.navigate(['/public/login'], {queryParams: { returnUrl: url }});
      }

      return result;
    }

}
