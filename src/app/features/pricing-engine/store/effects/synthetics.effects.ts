import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

import * as fromServices from '../../services';
import * as fromActions from '../actions';

@Injectable()
export class SyntheticsEffects {

    @Effect()
    loadSynthetics$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SyntheticsActionTypes.LOAD_SYNTHETICS),
            switchMap(() => {
                return this.service$
                    .loadData()
                    .pipe(
                        map((res: any) => new fromActions.LoadSyntheticsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadSyntheticsFailed(err)))
                    );
            })
        );


    constructor(
        private actions$: Actions,
        private service$: fromServices.PricingEngineService
    ) { }
}

