import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import * as fromModels from '../../models';
import * as fromServices from '../../services/sec-master-bbg-data-map.service';
import * as fromActions from '../actions/sec-master-bbg-data-map.action';

@Injectable()
export class SecMasterBbgDataMapEffects {

    @Effect()
    loadBbgDataMap$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterBbgDataMapActionTypes.LOAD_BBG_DATA_MAP),
            switchMap(() => {
                return this.service$
                    .loadBbgDataMapService()
                    .pipe(
                        map((res: fromModels.IBbgDataMap[]) => new fromActions.LoadBbgDataMapComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadBbgDataMapFailed(err)))
                    );
            })
        );

    constructor(
        private actions$: Actions,
        private service$: fromServices.SecMasterBbgDataMapService
    ) { }
}

