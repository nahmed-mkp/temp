import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { switchMap, map, catchError, mergeMap} from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromActions from '../actions';
import * as fromServices from '../../services';
import { State } from './../reducers';


@Injectable()
export class ExposureLadderEffects {

    @Effect()
    loadExposureAsOfDates$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ExposureLadderActionTypes.LOAD_EXPOSURE_AS_OF_DATES),
            switchMap(() => {
                return this.exposureLadderService
                    .loadExposureAsOfDates()
                    .pipe(
                        map(res => new fromActions.LoadExposureAsOfDatesComplete(res)),
                        catchError(err => of(new fromActions.LoadExposureAsOfDatesFailed(err)))
                    );
            })
        );

    @Effect()
    loadExposureLadder$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ExposureLadderActionTypes.LOAD_EXPOSURE_LADDER),
            mergeMap((payload: string) => {
                return this.exposureLadderService
                    .loadExposureLadder()
                    .pipe(
                        map(res => new fromActions.LoadExposureLadderComplete({asOfDate: payload, data: res})),
                        catchError(err => of(new fromActions.LoadExposureLadderFailed(err)))
                    );
            })
        );

    constructor(
        private actions$: Actions,
        private exposureLadderService: fromServices.ExposureLadderService,
        private store: Store<State>
    ) {}
}
