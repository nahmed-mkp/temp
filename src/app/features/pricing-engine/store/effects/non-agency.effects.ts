import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

import * as fromServices from '../../services';
import * as fromActions from '../actions';

@Injectable()
export class NonAgencyEffects {

    @Effect()
    loadNonAgency$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.NonAgencyActionTypes.LOAD_NON_AGENCY),
            switchMap(() => {
                return this.service$
                    .loadData()
                    .pipe(
                        map((res: any) => new fromActions.LoadNonAgencyComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadNonAgencyFailed(err)))
                    );
            })
        );


    constructor(
        private actions$: Actions,
        private service$: fromServices.PricingEngineService
    ) { }
}
