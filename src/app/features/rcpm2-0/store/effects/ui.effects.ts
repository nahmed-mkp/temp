import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';

import * as fromServices from '../../services/ui.service';
import * as fromActions from '../actions/ui.actions';
import * as fromModels from './../../models/directionality.models';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

@Injectable()
export class DataRetrievalMethodEffects {

    @Effect()
    LoadDataRetrievalMethod$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.UiActionTypes.LOAD_DATA_RETRIEVAL_MODE),
            switchMap(() => {
                return this.dataRetrievalMethodService$.loadDataRetrievalMethod()
                    .pipe(
                        map((res) => {
                            const data_method = res ? 'socket' : 'http';
                            return new fromActions.LoadDataRetrievalModeComplete(data_method);
                        }),
                        catchError((err: string) => of(new fromActions.LoadDataRetrievalModeFailed(err)))
                    );
            })
        );

    constructor(
        private actions$: Actions,
        private dataRetrievalMethodService$: fromServices.DataRetrievalMethodService,
        private dataService: HighchartsDataService,
    ) {}
}
