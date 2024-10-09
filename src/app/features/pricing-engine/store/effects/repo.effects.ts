import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

import * as fromServices from '../../services';
import * as fromActions from '../actions';

@Injectable()
export class RepoEffects {

    @Effect()
    loadRepo$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RepoActionTypes.LOAD_REPO),
            switchMap(() => {
                return this.service$
                    .loadData()
                    .pipe(
                        map((res: any) => new fromActions.LoadRepoComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadRepoFailed(err)))
                    );
            })
        );


    constructor(
        private actions$: Actions,
        private service$: fromServices.PricingEngineService
    ) { }
}

