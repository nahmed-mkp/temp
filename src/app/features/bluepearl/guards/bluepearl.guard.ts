import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import * as fromStore from '../store';
import * as fromActions from '../store/actions';

@Injectable()
export class BluePearlGuard implements CanActivate {

    constructor(private store: Store<fromStore.BluePearlState>) { 
        this.store.dispatch(fromActions.loadFunds())
    }

    canActivate(): Observable<boolean> {
       return of(true);
    }
}
