import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

import * as fromServices from '../../services';
import * as fromActions from '../actions';

@Injectable()
export class AgencyEffects {

    @Effect()
    loadAgency$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgencyActionTypes.LOAD_AGENCY),
            switchMap(() => {
                return this.service$
                    .loadData()
                    .pipe(
                        map((res: any) => new fromActions.LoadAgencyComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadAgencyFailed(err)))
                    );
            })
        );


    constructor(
        private actions$: Actions,
        private service$: fromServices.PricingEngineService
    ) { }
}

