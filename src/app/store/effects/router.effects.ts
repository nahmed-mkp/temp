import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from './../actions/router.actions';
import * as fromModels from './../../models/router.models';

@Injectable()
export class RouterEffects {

    @Effect({dispatch: false})
    go$ = this.actions$
        .pipe(
            ofType(fromActions.RouterActionTypes.GO),
            map((action: fromActions.Go) => action.payload),
            tap((payload: fromModels.NavigationPayload) => {
                this.router.navigate(payload.path, { ...payload.queryParams, ...payload.extras });
            })
        );

    @Effect({dispatch: false})
    back$ = this.actions$
        .pipe(
            ofType(fromActions.RouterActionTypes.BACK),
            tap(() => this.location.back())
        );

    @Effect({dispatch: false})
    forward$ = this.actions$
        .pipe(
            ofType(fromActions.RouterActionTypes.FORWARD),
            tap(() => this.location.forward())
        );

    constructor(
        private actions$: Actions,
        private router: Router,
        private location: Location
    ) {}
}
