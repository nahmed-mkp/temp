import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

import * as fromServices from '../../services';
import * as fromActions from '../actions';

@Injectable()
export class MultiAssetOptionEffects {

    loadMultiAssetOptions$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadMultiAssetOptions), 
        switchMap( ({payload}) => {
            return this.service$.loadMultiAssetOptions(payload)
            .pipe(
                map( (res: any) => {
                    if (res !== null) {
                        const parseResult = this.dataService.csvToObjectArrayWithColumnHeaders(res.data, '');
                        return fromActions.loadMultiAssetOptionsComplete({
                            data: parseResult,
                            timeStamp: res.timestamps
                        });
                    }
                }),
                catchError( (err: string) => of(fromActions.loadMultiAssetOptionsFailed(err)))
            )
        })
    ))


    loadMultiAssetOptionsDetail$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadMultiAssetOptionsDetail),
        switchMap( ({sid}) => {
            return this.service$
                .loadSecurityDetail(sid)
                .pipe(
                    map( (res: any) => {
                        if (res && res.tags && res.tags && res.tags.length > 0) {
                            return fromActions.loadMultiAssetOptionsDetailComplete(res.tags);
                        } else {
                            return fromActions.loadMultiAssetOptionsDetailComplete([]);
                        }
                    }),
                    catchError((err: string) => of(fromActions.loadMultiAssetOptionsDetailFailed(err)))
                )
        })
    ))


    loadMultiAssetOptionsOwnership$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadMultiAssetOptionsOwnership),
        switchMap( ({payload}) => {
            return this.service$
                .loadSecurityOwnership(payload)
                .pipe(
                    map( (res: any) => {
                        if (res && res.length && res.length > 0) {
                            return fromActions.loadMultiAssetOptionsOwnershipComplete(res);
                        } else {
                            return fromActions.loadMultiAssetOptionsOwnershipComplete([]);
                        }
                    }),
                    catchError((err: string) => of(fromActions.loadMultiAssetOptionsOwnershipFailed(err)))
                )
        }) 
    ))

    updateMultiAssetOption$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.updateMultiAssetOption), 
        switchMap( ({payload}) => {
            return this.service$.updateMultiAssetOption(payload)
            .pipe(
                map( (res: any) => fromActions.updateMultiAssetOptionComplete(res)),
                catchError( (err: string) => of(fromActions.updateMultiAssetOptionFailed(err)))
            )
        })
    ))


    constructor(
        private actions$: Actions,
        private service$: fromServices.PricingEngineService,
        private dataService: HighchartsDataService,
    ) { }
}

