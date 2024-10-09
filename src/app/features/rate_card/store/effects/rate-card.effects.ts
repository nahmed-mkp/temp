import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { from, of } from "rxjs";
import { catchError, map, switchMap, withLatestFrom } from "rxjs/operators";
import moment from "moment";

import * as fromStore from '../../store';
import * as fromModels from '../../models';
import * as fromServices from '../../services';
import * as fromActions from '../actions';
import * as fromSelectors from '../../store/selectors';
import { HighchartsDataService } from 'src/app/shared/custom/utilities/highcharts-data.service';

@Injectable()
export class RateCardEffects {

    signOff$ = createEffect( () => this.actions$.pipe(
        ofType(
            fromActions.signOff
        ),
        switchMap( () => {
            console.warn('hi')
            return this.rateCardService$
            .signOff()
        })
    ))
    
    loadGroupingData$ = createEffect( () => this.actions$.pipe(
        ofType(
            fromActions.loadGroupingData
        ),
        switchMap( ({date}) => {
            return this.rateCardService$
            .loadPositionGrouping(date)
            .pipe(
                map( (res:any) => {
                    if (res.data !== null) {
                        const parseResult = this.dataService.csvToObjectArrayWithColumnHeaders(res.data, '');
                        return fromActions.loadGroupingDataComplete(parseResult);
                    } else {
                        return fromActions.loadGroupingDataComplete([]);
                    }
                }),
                catchError((err: string) => of(fromActions.loadGroupingDataFailed(err)))
            )
        })   
    ))

    loadRateByFundAndSecurity$ = createEffect( () => this.actions$.pipe(
        ofType(
            fromActions.loadRateByFundAndSecurity,
        ),
        switchMap( ({date}) => {
            const formattedDate = moment(date).format('MM-DD-YYYY')
            return this.rateCardService$
            .loadRateByFundAndSecurity(formattedDate)
            .pipe(
                map((res: fromModels.IRateByFundAndSecurity[]) => fromActions.loadRateByFundAndSecurityComplete(res)),
                catchError((err: string) => of(fromActions.loadRateByFundAndSecurityFailed(err)))    
            )
        })
    ));

    loadRateByFundAndBucket$ = createEffect( () => this.actions$.pipe(
        ofType(
            fromActions.loadRateByFundAndBucket,
        ),
        switchMap( ({date}) => {
            const formattedDate = moment(date).format('MM-DD-YYYY')
            return this.rateCardService$
            .loadRateByFundAndBucket(formattedDate)
            .pipe(
                map((res: fromModels.IRateByFundAndBucket[]) => fromActions.loadRateByFundAndBucketComplete(res)),
                catchError((err: string) => of(fromActions.loadRateByFundAndBucketFailed(err)))    
            )
        })
    ));

    loadRateByEquity$ = createEffect( () => this.actions$.pipe(
        ofType(
            fromActions.loadRateByEquity,
        ),
        switchMap( ({date}) => {
            const formattedDate = moment(date).format('MM-DD-YYYY')
            return this.rateCardService$
            .loadRateByEquity(formattedDate)
            .pipe(
                map((res: fromModels.IRateByEquity[]) => fromActions.loadRateByEquityComplete(res)),
                catchError((err: string) => of(fromActions.loadRateByEquityFailed(err)))    
            )
        })
    ));

    loadRateCard$ = createEffect(() => this.actions$.pipe(
        ofType(
            fromActions.loadRateCard
        ),
        switchMap(({ payload }) => {
            return this.rateCardService$
                .loadRateCardBySecurity(payload)
                .pipe(
                    map((res: fromModels.IRateCard[]) => fromActions.loadRateCardComplete(res)),
                    catchError((err: string) => of(fromActions.loadRateCardFailed(err)))
                )
        })
    ));

    loadRateCardOnDateChange$ = createEffect(( ) => this.actions$.pipe(
        ofType(
            fromActions.changeStartDate,
            fromActions.changeEndDate
        ),
        withLatestFrom(
            this.store.select(fromSelectors.getStartDate), 
            this.store.select(fromSelectors.getEndDate)
        ),
        switchMap( ([action, startDate, endDate]) => {
            let payload: fromModels.IRateCardRequest = {
                start_date: moment(startDate).format('MM-DD-YYYY'),
                end_date: moment(endDate).format('MM-DD-YYYY'),
                sid: null
            }
            return this.rateCardService$
                .loadRateCardBySecurity(payload)
                .pipe(
                    map((res:fromModels.IRateCard[]) => fromActions.loadRateCardComplete(res)),
                    catchError((err: string) => of(fromActions.loadRateCardFailed(err)))
                )
        })
    ))

    loadFundingChargesOnDateChange$ = createEffect(( ) => this.actions$.pipe(
        ofType(
            fromActions.changeStartDate,
            fromActions.changeEndDate
        ),
        withLatestFrom(
            this.store.select(fromSelectors.getStartDate), 
            this.store.select(fromSelectors.getEndDate)
        ),
        switchMap( ([action, startDate, endDate]) => {
            let payload: fromModels.IFundingChargeRequest = {
                start_date: moment(startDate).format('MM-DD-YYYY'),
                end_date: moment(endDate).format('MM-DD-YYYY'),
                sid: null
            }
            return this.rateCardService$
                .loadFundingCharges(payload)
                .pipe(
                    map((res:fromModels.IFundingCharge[]) => fromActions.loadFundingChargesComplete(res)),
                    catchError((err: string) => of(fromActions.loadFundingChargesFailed(err)))
                )
        })
    ))

    loadRateCardTimeseriesData$ = createEffect(() => this.actions$.pipe(
        ofType(
            fromActions.loadRateCardTimeseriesData
        ),
        switchMap(({ payload }) => {
            return this.rateCardService$
                .loadRateCardBySecurity({
                    sid: payload.sid,
                    start_date: payload.start_date,
                    end_date: payload.end_date
                })
                .pipe(
                    map((res: fromModels.IRateCard[]) => fromActions.loadRateCardTimeseriesDataComplete(res)),
                    catchError((err: string) => of(fromActions.loadRateCardTimeseriesDataFailed(err)))
                )
        })
    ));

    loadRateCardAdminFundBucketTimeseriesData$ = createEffect(() => this.actions$.pipe(
        ofType(
            fromActions.loadRateCardAdminFundBucketTimeseriesData
        ),
        switchMap(({ payload }) => {
            return this.rateCardService$
                .loadRateCardBySecurity({
                    sid: payload.sid,
                    start_date: payload.start_date,
                    end_date: payload.end_date
                })
                .pipe(
                    map((res: fromModels.IRateCard[]) => fromActions.loadRateCardAdminFundBucketTimeseriesDataComplete(res)),
                    catchError((err: string) => of(fromActions.loadRateCardAdminFundBucketTimeseriesDataFailed(err)))
                )
        })
    ));

    loadRateCardAdminFundSecTimeseriesData$ = createEffect(() => this.actions$.pipe(
        ofType(
            fromActions.loadRateCardAdminFundSecTimeseriesData
        ),
        switchMap(({ payload }) => {
            return this.rateCardService$
                .loadRateCardBySecurity({
                    sid: payload.sid,
                    start_date: payload.start_date,
                    end_date: payload.end_date
                })
                .pipe(
                    map((res: fromModels.IRateCard[]) => fromActions.loadRateCardAdminFundSecTimeseriesDataComplete(res)),
                    catchError((err: string) => of(fromActions.loadRateCardAdminFundSecTimeseriesDataFailed(err)))
                )
        })
    ));


    loadSecurityEquityTimeseriesData$ = createEffect(() => this.actions$.pipe(
        ofType(
            fromActions.loadSecurityEquityTimeseriesData
        ),
        switchMap(({ payload }) => {
            return this.rateCardService$
                .loadRateCardBySecurity({
                    sid: payload.sid,
                    start_date: payload.start_date,
                    end_date: payload.end_date
                })
                .pipe(
                    map((res: fromModels.IRateCard[]) => fromActions.loadSecurityEquityTimeseriesDataComplete(res)),
                    catchError((err: string) => of(fromActions.loadSecurityEquityTimeseriesDataFailed(err)))
                )
        })
    ));

    loadFundingCharges$ = createEffect(() => this.actions$.pipe(
        ofType(
            fromActions.loadFundingCharges
        ),
        switchMap(({ payload }) => {
            return this.rateCardService$
                .loadFundingCharges(payload)
                .pipe(
                    map((res: fromModels.IFundingCharge[]) => fromActions.loadFundingChargesComplete(res)),
                    catchError((err: string) => of(fromActions.loadFundingChargesFailed(err)))
                )
        })
    ));

    saveRateByFundAndSecurity$ = createEffect(() => this.actions$.pipe(
        ofType(
            fromActions.saveFundAndSecurityRate
        ),
        switchMap(({ payload }) => {
            return this.rateCardService$
                .saveRateByFundAndSecurity(payload)
                .pipe(
                    map((res: fromModels.IRateByFundAndSecurity[]) => fromActions.loadRateByFundAndSecurityComplete(res)),
                    catchError((err: string) => of(fromActions.loadRateByFundAndSecurityFailed(err)))
                )
        })
    ));

    saveRateByFundAndBucket$ = createEffect(() => this.actions$.pipe(
        ofType(
            fromActions.saveFundAndBucketRate
        ),
        switchMap(({ payload }) => {
            return this.rateCardService$
                .saveRateByFundAndBucket(payload)
                .pipe(
                    map((res: fromModels.IRateByFundAndBucket[]) => fromActions.loadRateByFundAndBucketComplete(res)),
                    catchError((err: string) => of(fromActions.loadRateByFundAndBucketFailed(err)))
                )
        })
    ));
    
    saveRateByEquity$ = createEffect(() => this.actions$.pipe(
        ofType(
            fromActions.saveSecurityEquityRate
        ),
        switchMap(({ payload }) => {
            return this.rateCardService$
                .saveRateBySecurityEquity(payload)
                .pipe(
                    map((res: fromModels.IRateByEquity[]) => fromActions.saveSecurityEquityRateComplete(res)),
                    catchError((err: string) => of(fromActions.saveSecurityEquityRateFailed(err)))
                )
        })
    ));

    constructor(
        private actions$: Actions,
        private rateCardService$: fromServices.RateCardService,
        private store: Store<fromStore.RateCardState>,
        private dataService: HighchartsDataService
    ) { }    
}