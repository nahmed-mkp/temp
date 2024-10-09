import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, map, switchMap } from 'rxjs/operators';

import * as fromModels from '../../models/tradename.models';
import * as fromServices from '../../services/tradename.service';
import * as fromActions from '../actions/tradename.actions';

@Injectable()
export class TradeNameEffects {

    loadPmPodDetails$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadPmPodDetails),
        switchMap( () => {
            return this.tradeNameService$.loadPMPodDetails()
            .pipe(
                map( (res) => fromActions.loadPmPodDetailsComplete(res)),
                catchError( (err: string) => of(fromActions.loadPmPodDetailsFailed(err)))
            ) 
        })
    ))

    loadClientServicesTradeTheme$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadClientServicesTradeThemes),
        switchMap( () => {
            return this.tradeNameService$.loadClientServicesThemes()
            .pipe(
                map( (res) => fromActions.loadClientServicesTradeThemesComplete(res)),
                catchError( (err: string) => of(fromActions.loadClientServicesTradeThemesFailed(err)))
            )
        })
    ))

    createTradeName$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.createTradeName), 
        switchMap( ({payload}) => {
            return this.tradeNameService$.createTradeName(payload)
            .pipe(
                map( (res: fromModels.ITradeNameCreateResult) => fromActions.createTradeNameComplete(res)),
                catchError( (err: string) => of(fromActions.createTradeNameFailed(err)))
            )
        })
    ))

    createTradeNameComplete$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.createTradeNameComplete),
        delay(500),
        switchMap( () => {
            return of(fromActions.clearTradeNameCreateMessage())
        })
    ))

    createTradeNameFail$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.createTradeNameFailed),
        delay(500),
        switchMap( () => {
            return of(fromActions.clearTradeNameCreateMessage())
        })
    ))

    loadMultipleAllocationTradeNames$ = createEffect( () =>  this.actions$.pipe(
        ofType(fromActions.loadMultipleAllocTradeNames),
        switchMap( () => {
            return this.tradeNameService$   
                .loadMultiAllocTradeNames()
                .pipe(
                    map( (res) => fromActions.loadMultipleAllocTradeNamesComplete(res)),
                    catchError( (err: string) => of(fromActions.loadMultipleAllocTradeNamesFailed(err)))
                )
        })
    ))

    loadMultipleAllocationTradeNameSplit = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadMultipleAllocTradeNameSplit),
        switchMap( ({payload}) => {
            return this.tradeNameService$
                .loadMultiAllocTradeNameSplit(payload)
                .pipe(
                    map( (res) => fromActions.loadMultipleAllocTradeNameSplitComplete(res)),
                    catchError( (err: string) => of(fromActions.loadMultipleAllocTradeNameSplitFailed(err)))
                )
        })
    ))

    createMultipleAllocationTradeNameSplit$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.createMultipleAllocTradeNameSplit),
        switchMap( ({payload}) => {
            return this.tradeNameService$
                .createMultiAllocTradeNameSplit(payload)
                .pipe(
                    map( (res: any) => {
                        if (res && res.errors && res.errors.length == 0) { 
                            return fromActions.createMultipleAllocTradeNameSplitComplete(res['result']);
                        } else {
                            return fromActions.createMultipleAllocTradeNameSplitComplete(res['errors'].join('<br />'));
                        }
                    }),
                    catchError( (err: string) => of(fromActions.createMultipleAllocTradeNameSplitFailed(err)))
                )
        })
    ))

    updateMultipleAllocationTradeNameSplit$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.updateMultipleAllocTradeNameSplit),
        switchMap( ({payload}) => {
            return this.tradeNameService$
                .updateMultiAllocTradeNameSplit(payload)
                .pipe(
                    map( (res: fromModels.INewOrUpdateMultiAllocTradeName) => fromActions.updateMultipleAllocTradeNameSplitComplete(res)),
                    catchError( (err: string) => of(fromActions.updateMultipleAllocTradeNameSplitFailed(err)))
                )
        })
    ))

    // @Effect()
    // loadMultipleAllocationTradeNames$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.TradeNameActionTypes.LOAD_MULTIPLE_ALLOC_TRADENAMES),
    //         switchMap((payload: any) => {
    //             return this.tradeNameService$
    //                 .loadMultiAllocTradeNames()
    //                 .pipe(
    //                     map((res: fromModels.IMultiAllocTradeName[]) => new fromActions.LoadMultipleAllocTradeNamesComplete(res)),
    //                     catchError((err: string) => of(new fromActions.LoadMultipleAllocTradeNamesFailed(err))
    //                     ));
    //         })
    //     );


    // @Effect()
    // createTradeNameComplete$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.TradeNameActionTypes.CREATE_TRADE_NAME_COMPLETE),
    //         map((action: fromActions.CreateTradeName) => action.payload),
    //         delay(5000),
    //         switchMap((payload: any) => {
    //             return of(new fromActions.ClearTradeNameCreateMessage());
    //         })
    //     );

 

    // @Effect()
    // createTradeNameFail$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.TradeNameActionTypes.CREATE_TRADE_NAME_FAILED),
    //         map((action: fromActions.CreateTradeName) => action.payload),
    //         delay(5000),
    //         switchMap((payload: any) => {
    //             return of(new fromActions.ClearTradeNameCreateMessage());
    //         })
    //     );

    // @Effect()
    // loadMultipleAllocationTradeNames$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.TradeNameActionTypes.LOAD_MULTIPLE_ALLOC_TRADENAMES),
    //         switchMap((payload: any) => {
    //             return this.tradeNameService$
    //                 .loadMultiAllocTradeNames()
    //                 .pipe(
    //                     map((res: fromModels.IMultiAllocTradeName[]) => new fromActions.LoadMultipleAllocTradeNamesComplete(res)),
    //                     catchError((err: string) => of(new fromActions.LoadMultipleAllocTradeNamesFailed(err))
    //                     ));
    //         })
    //     );

    // @Effect()
    // loadMultipleAllocationTradeNameSplit$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.TradeNameActionTypes.LOAD_MULTIPLE_ALLOC_TRADENAME_SPLIT),
    //         map((action: fromActions.LoadMultipleAllocTradeNameAllocationSplit) => action.payload),
    //         switchMap((payload: fromModels.IMultiAllocTradeName) => {
    //             return this.tradeNameService$
    //                 .loadMultiAllocTradeNameSplit(payload)
    //                 .pipe(
    //                     map((res: fromModels.IMultiAllocationSplit[]) => new fromActions.LoadMultipleAllocTradeNameAllocationSplitComplete(res)),
    //                     catchError((err: string) => of(new fromActions.LoadMultipleAllocTradeNameAllocationSplitFailed(err))
    //                     ));
    //         })
    //     );

    // @Effect()
    // CreateMultipleAllocationTradeNameSplit$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.TradeNameActionTypes.CREATE_MULTIPLE_ALLOC_TRADENAME_SPLIT),
    //         map((action: fromActions.CreateMultipleAllocTradeNameAllocationSplit) => action.payload),
    //         switchMap((payload: fromModels.INewOrUpdateMultiAllocTradeName) => {
    //             return this.tradeNameService$
    //                 .createMultiAllocTradeNameSplit(payload)
    //                 .pipe(
    //                     map((res: any) => {
    //                         if (res && res.errors && res.errors.length == 0) { 
    //                             return new fromActions.CreateMultipleAllocTradeNameAllocationSplitComplete(res['result']);
    //                         } else {
    //                             return new fromActions.CreateMultipleAllocTradeNameAllocationSplitFailed(res['errors'].join('<br />'));
    //                         }
    //                     }),
    //                     catchError((err: string) => of(new fromActions.CreateMultipleAllocTradeNameAllocationSplitFailed(err))
    //                 ));
    //         })
    //     );

    // @Effect()
    // UpdateMultipleAllocationTradeNameSplit$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.TradeNameActionTypes.UPDATE_MULTIPLE_ALLOC_TRADENAME_SPLIT),
    //         map((action: fromActions.UpdateMultipleAllocTradeNameAllocationSplit) => action.payload),
    //         switchMap((payload: fromModels.INewOrUpdateMultiAllocTradeName) => {                
    //             return this.tradeNameService$
    //                 .updateMultiAllocTradeNameSplit(payload)
    //                 .pipe(
    //                     map((res: any) => {
    //                         if (res && res.errors && res.errors.length == 0) {
    //                             return new fromActions.UpdateMultipleAllocTradeNameAllocationSplitComplete(res['result']);
    //                         } else {
    //                             return new fromActions.UpdateMultipleAllocTradeNameAllocationSplitFailed(res['errors'].join('<br />'));
    //                         }
    //                     }),
    //                     catchError((err: string) => of(new fromActions.UpdateMultipleAllocTradeNameAllocationSplitFailed(err))
    //                 ));
    //         })
    //     );

    constructor(
        private actions$: Actions,
        private tradeNameService$: fromServices.RcpmTradeNameService
    ) { }
}
