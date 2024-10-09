import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

import * as fromServices from '../../services';
import * as fromActions from '../actions';

@Injectable()
export class AssetSwapsEffects {

    @Effect()
    loadAssetSwaps$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AssetSwapsActionTypes.LOAD_ASSET_SWAPS),
            switchMap(() => {
                return this.service$
                    .loadData()
                    .pipe(
                        map((res: any) => new fromActions.LoadAssetSwapsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadAssetSwapsFailed(err)))
                    );
            })
        );


    constructor(
        private actions$: Actions,
        private service$: fromServices.PricingEngineService
    ) { }
}

