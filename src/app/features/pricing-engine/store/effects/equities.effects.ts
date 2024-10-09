import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

import * as fromServices from '../../services';
import * as fromActions from '../actions';

@Injectable()
export class EquitiesEffects {

    @Effect()
    loadEquities$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EquitiesActionTypes.LOAD_EQUITIES),
            map((action: fromActions.LoadEquities) => action.payload),
            switchMap(payload => {
                return this.service$
                    .loadEquities(payload)
                    .pipe(
                        map((res: any) => {
                            if (res !== null) {
                                const parseResult = this.dataService.csvToObjectArrayWithColumnHeaders(res.data, '');
                                return new fromActions.LoadEquitiesComplete({
                                    data: parseResult,
                                    timeStamp: res.timestamps
                                });
                            }
                        }),
                        catchError((err: string) => of(new fromActions.LoadEquitiesFailed(err)))
                    );
            })
        );


    constructor(
        private actions$: Actions,
        private service$: fromServices.PricingEngineService,
        private dataService: HighchartsDataService,
    ) { }
}

