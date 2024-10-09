import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators"
import * as fromActions from '../actions';
import * as fromServices from '../../services';
import * as fromSelectors from '../selectors';
import * as fromStore from '../../store';
import * as fromModels from '../../models';
import { Store } from "@ngrx/store";
import { empty, of } from "rxjs";
import moment from "moment";

@Injectable()
export class SSNCFeedEffects {
    
    assetClassMapping = {
        'Futures': 'futures',
        'Bonds': 'bonds',
        'Swaps': 'swaps',
        'Equities': 'equities',
        'Mortgage': 'mortgage',
        'Options': 'options',
        'Forward': 'forward',
        'Spot': 'spot',
        'Repo': 'repo',
        'Swaptions': 'swaptions',
        'FRA': 'fra',
        'CDX': 'cdx',
        'CAP Floor': 'cap_floor',
        'Bond TRS': 'bond_trs',
        'Equity TRS': 'equity_trs',
        'Equity OTC Options': 'equity_otc_options',
        'Bond OTC Options': 'bond_otc_options',
        'FX OTC Options': 'fx_otc_options'    
    }

    changeSelectedDates$ = createEffect( () => this.actions$.pipe(
        ofType(
            fromActions.changeSelectedDate
        ),
        withLatestFrom(
            this.store.select(fromSelectors.getSelectedTab),
        ),
        switchMap( ([action, tab]) => {
            if(tab === 'Summary'){
                return [fromActions.loadSummary()]
            } 
            // if(tab === 'Failed Trades'){
            //     return [fromActions.loadFailedTrades()]
            // }
            const req: fromModels.ISSNCFeedReq = {
                assetClass: this.assetClassMapping[tab],
               tradeDate: action.date
            }
            return [fromActions.loadSSNCFeedData(req)]
        })
    ))

    changeParamDates$ = createEffect( () => this.actions$.pipe(
        ofType(
            fromActions.changeFromDate,
            fromActions.changeToDate,
        ),
        withLatestFrom(
            this.store.select(fromSelectors.getSelectedTab),
            this.store.select(fromSelectors.getSelectedDate),
        ),
        switchMap( ([action, tab, selectedDate]) => {
            if(tab === 'Summary'){
                return [fromActions.loadSummary()]
            } 
            // if(tab === 'Failed Trades'){
            //     return [fromActions.loadFailedTrades()]
            // }
            const req: fromModels.ISSNCFeedReq = {
                assetClass: this.assetClassMapping[tab],
               tradeDate: selectedDate
            }
            return [fromActions.loadSSNCFeedData(req), fromActions.loadSummary()]
        })
    ))

    changeTab$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.changeTab),
        withLatestFrom(
            this.store.select(fromSelectors.getSelectedDate)
        ),
        switchMap( ([{tab}, selectedDate]) => {
            if(tab === 'Summary'){
                return [fromActions.loadSummary()]
            } 
            // if(tab === 'Failed Trades'){
            //     return [fromActions.loadFailedTrades()]
            // }
           const req: fromModels.ISSNCFeedReq = {
            assetClass: this.assetClassMapping[tab],
            tradeDate: selectedDate
           }
           return [fromActions.loadSSNCFeedData(req)]
        })
    ))

    loadSummary = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadSummary),
        withLatestFrom(
            this.store.select(fromSelectors.getFromDate),
            this.store.select(fromSelectors.getToDate)
        ),
        switchMap( ([action, fromDate, toDate]) => {
            return this.ssncFeedService$
            .loadSummary(fromDate, toDate)
            .pipe(
                map((res) => fromActions.loadSummaryComplete(res)),
                catchError((err: string) => of(fromActions.loadSummaryFailed(err)))    
            )
        })
    ))

    loadSSNCFeedData$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadSSNCFeedData),
        switchMap( ({payload}) => {
            return this.ssncFeedService$
            .loadFeed(payload)
            .pipe(
                map((res) => fromActions.loadSSNCFeedDataComplete(res)),
                catchError((err: string) => of(fromActions.loadSSNCFeedDataFailed(err)))    
            )
        })
    ))

    loadAdditionalSSNCFeedData$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadAdditionalSSNCFeedData),
        switchMap( ({client_ref}) => {
            return this.ssncFeedService$
            .loadAdditionalFeedData(client_ref)
            .pipe(
                map((res) => fromActions.loadAdditionalSSNCFeedDataComplete(res)),
                catchError((err: string) => of(fromActions.loadAdditionalSSNCFeedDataFailed(err)))    
            )
        })
    ))

    // downloadTradeFile$ = createEffect( () => this.actions$.pipe(
    //     ofType(fromActions.downloadTradeFile),
    //     withLatestFrom(this.store.select(fromStore.getSelectedDate)),
    //     switchMap( ([{orderId}, tradeDate]) => {
    //         return this.ssncFeedService$
    //         .downloadTradeFile({
    //             clientReference: orderId.toString(),
    //             tradeDate: moment.utc(tradeDate).format('MM-DD-YYYY')
    //         })
    //         .pipe(
    //             map((res) => fromActions.downloadTradeFileComplete(res)),
    //             catchError((err: string) => of(fromActions.downloadTradeFileFailed(err)))    
    //         )
    //     })
    // ))

    
    // downloadAckFile$ = createEffect( () => this.actions$.pipe(
    //     ofType(fromActions.downloadAckFile),
    //     withLatestFrom(this.store.select(fromStore.getSelectedDate)),
    //     switchMap( ([{orderId}, tradeDate]) => {
    //         return this.ssncFeedService$
    //         .downloadAckFile({
    //             clientReference: orderId.toString(),
    //             tradeDate: moment.utc(tradeDate).format('MM-DD-YYYY')
    //         })
    //         .pipe(
    //             map((res) => fromActions.downloadAckFileComplete(res)),
    //             catchError((err: string) => of(fromActions.downloadAckFileFailed(err)))    
    //         )
    //     })
    // ))
    
    downloadTradeFile$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.downloadTradeFile),
        withLatestFrom(this.store.select(fromSelectors.getFromDate)),
        switchMap(([{orderId}, fromDate]) => {
            this.ssncFeedService$.downloadTradeFile({
                clientReference: orderId.toString(),
                tradeDate: fromDate
            });
            return empty();
        })
    ))

     
    downloadAckFile$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.downloadAckFile),
        withLatestFrom(this.store.select(fromSelectors.getFromDate)),
        switchMap(([{orderId}, fromDate]) => {
            this.ssncFeedService$.downloadAckFile({
                clientReference: orderId.toString(),
                tradeDate: fromDate
            });
            return empty();
        })
    ))


    constructor(
        private store: Store<fromStore.SSNCFeedState>,
        private actions$: Actions,
        private ssncFeedService$: fromServices.SSNCFeedService,
    ) { }    
}