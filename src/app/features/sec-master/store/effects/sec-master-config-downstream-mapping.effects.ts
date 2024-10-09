import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';

import * as fromModels from '../../models';
import * as fromServices from '../../services/sec-master-config-downstream-mapping.service';
import * as fromActions from '../actions/sec-master-config-downstream-mapping.action';

@Injectable()
export class SecMasterConfigDownstreamMappingEffects {

    @Effect()
    loadDownStreamMapping$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SecMasterConfigDownstreamMappingActionTypes.LOAD_DOWNSTREAM_MAPPING),
            switchMap(() => {
                return this.service$
                    .LoadDownstreamMapping()
                    .pipe(
                        map((res: any[]) => new fromActions.LoadDownstreamMappingComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadDownstreamMappingFailed(err)))
                    );
            })
        );

    constructor(
        private actions$: Actions,
        private service$: fromServices.ConfigDownstreamMappingService
    ) { }
}

