import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as fromActions from '../actions';
import * as fromServices from '../../services';
import * as fromModels from '../../models';

@Injectable()
export class TBAReportsParserEffects {

    @Effect()
    loadMissingDates: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.LOAD_MISSING_DATES),
            switchMap(() => {
                return this.tbaParserService
                    .getMissingDates()
                    .pipe(
                        map((res: fromModels.MissingDate[]) => new fromActions.LoadMissingDatesComplete(res)),
                        catchError(err => of(new fromActions.LoadMissingDatesFailed(err)))
                    )
            })
        )

    @Effect()
    saveCacheKey: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SAVE_CACHE_KEY),
            map((action: fromActions.SaveCacheKey) => action.payload),
            switchMap((payload: string) => {
                return this.tbaParserService
                    .getResultsFromCache(payload)
                    .pipe(
                        map((res: fromModels.ParserResult) => new fromActions.ParseDealerFileComplete(res)),
                        catchError(err => of(new fromActions.ParseDealerFileFailed(err)))
                    )
            })
        )

    @Effect()
    saveResults: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SAVE_RESULTS),
            map((action: fromActions.SaveResults) => action.payload),
            switchMap((payload: string) => {
                return this.tbaParserService
                    .saveResultsFromCache(payload)
                    .pipe(
                        map((res: fromModels.ParserResult) => new fromActions.SaveResultsComplete(res)),
                        catchError(err => of(new fromActions.SaveResultsFailed(err)))
                    )
            })
        )

    constructor(private actions$: Actions,
                private tbaParserService: fromServices.ParserService) {}
}
