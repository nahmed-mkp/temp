import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';

import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromStore from './../store';
import * as fromModels from './../models';

@Injectable()
export class PrivateGuard implements CanActivate, CanActivateChild, CanLoad {

    private authenticatedUser$: BehaviorSubject<fromModels.IAuthenticatedUser> = new BehaviorSubject<fromModels.IAuthenticatedUser>(null);

    constructor(private router: Router,
                private store: Store<fromStore.RootState>) {

        this.store.select(fromStore.getAuthenticatedUser)
            .subscribe((user) => {
                this.authenticatedUser$.next(user);
            });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.dispatchAction(state.url);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.canActivate(childRoute, state);
    }

    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
        return this.dispatchAction(`/${route.path}`);
    }

    dispatchAction(url: string): boolean {
        if (url.endsWith('dashboard')) {
        }
        return true;
    }
}
