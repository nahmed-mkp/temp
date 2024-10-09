import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { switchMap, map, catchError, withLatestFrom} from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromModels from '../../models/factor-exposure.models';
import * as fromActions from '../actions';
import * as fromServices from '../../services';
import { State } from './../reducers';
import moment from 'moment';
import { HighchartsDataService } from 'src/app/shared/custom/utilities/highcharts-data.service';
import * as fromSelector from '../../store/selectors';

@Injectable()
export class FactorExposureEffects {

    
    @Effect()
    checkUserAccess$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.FactorExposureActionTypes.CHECK_USER_ACCESS),
            switchMap((payload) => {
                return this.factorExposureService
                    .checkAccessLevel()
                    .pipe(
                        map( (res: boolean) => new fromActions.CheckUserAccessComplete(res)),
                        catchError(err => of(new fromActions.CheckUserAccessFailed(err)))
                    );
            })
        );


    @Effect()
    paramsChanged$: any = this.actions$
    .pipe(
        ofType(fromActions.FactorExposureActionTypes.PARAMS_CHANGED),
        map((action: fromActions.ParamsChanged) => action.payload),
        switchMap( (res: fromModels.IFactorExposureParams) => {
            let actionArr = [];
            actionArr.push(new fromActions.SetActiveDate(res.activeDate));
            // optimize this - dont change the grouping if the incoming grouping is the same
            actionArr.push(new fromActions.SetActiveGrouping(res.activeGrouping));
            return actionArr;
        })
    )


    @Effect()
    setActiveDate$: any = this.actions$
    .pipe(
        ofType(fromActions.FactorExposureActionTypes.SET_ACTIVE_DATE),
        map((action: fromActions.SetActiveDate) => action.payload),
        switchMap( (res: string) => {
            let actionArr = [];
            actionArr.push(new fromActions.SetActiveDateComplete(res));
            actionArr.push(new fromActions.LoadFactorsTabGridData());
            actionArr.push(new fromActions.LoadPositionsLiteData());
            return actionArr;
        })
    )

    @Effect()
    setActiveGrouping$:any = this.actions$
    .pipe(
        ofType(fromActions.FactorExposureActionTypes.SET_ACTIVE_GROUPING),
        map((action: fromActions.SetActiveGrouping) => action.payload),
        switchMap( (res: any ) => {
            let actionArr = [];
            actionArr.push(new fromActions.SetActiveGroupingComplete(res));
            actionArr.push(new fromActions.LoadPositionsLiteData());
            actionArr.push(new fromActions.AddNewTabGrouping(res))
            actionArr.push(new fromActions.LoadPositionsGrouping());
            actionArr.push(new fromActions.LoadGroupingTabGridData());

            return actionArr;
        })
    )

    @Effect()
    addNewTabGrouping$: any = this.actions$
    .pipe(
        ofType(fromActions.FactorExposureActionTypes.ADD_NEW_TAB_GROUPING),
        map((action: fromActions.AddNewTabGrouping) => action.payload),
        map( (res: string) => new fromActions.AddNewTabGroupingComplete(res))
    )

    @Effect()
    loadDropdownDates$: any = this.actions$
        .pipe(
            ofType(fromActions.FactorExposureActionTypes.LOAD_DROPDOWN_DATES),
            switchMap(() => {
                return this.factorExposureService
                    .loadDropdownDates()
                    .pipe(
                        switchMap( (res: string[]) => {
                           let actionArr = [];
                           actionArr.push( new fromActions.LoadDropdownDatesComplete(res))
                           actionArr.push( new fromActions.SetActiveDate(res[0]))
                           actionArr.push( new fromActions.LoadDropdownGroupings(res[0]))
                           actionArr.push( new fromActions.LoadFactorsTabGridData())
                           return  actionArr;
                        }),
                        catchError(err => of(new fromActions.LoadDropdownDatesFailed(err)))
                    );
            })
        );


    @Effect()
    loadDropdownGroupings$: any = this.actions$
        .pipe(
            ofType(fromActions.FactorExposureActionTypes.LOAD_DROPDOWN_GROUPINGS),
            map((action: fromActions.LoadDropdownGroupings) => action.payload),
            switchMap((payload: string) => {
                // optimize this - check if activeDate is being used in this effect
                return this.factorExposureService
                    .loadDropdownGroupings()
                    .pipe(
                        switchMap( (res: string[]) => {
                            let actionArr = [];
                            actionArr.push(new fromActions.LoadDropdownGroupingsComplete(res))
                            if (res.length > 0) { 
                                if (res.indexOf('PortfolioBreakout|CrossPod|TradeName|SecurityName|Fund|Position') >= 0) {
                                    actionArr.push(new fromActions.SetActiveGrouping(res.find(i => i === 'PortfolioBreakout|CrossPod|TradeName|SecurityName|Fund|Position')));
                                } else {
                                    actionArr.push(new fromActions.SetActiveGrouping(res[0]));
                                }
                            }
                            return actionArr
                        }),
                        catchError(err => of(new fromActions.LoadDropdownGroupingsFailed(err)))
                    );
            })
        );

    @Effect()
    loadGroupingsByDate$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.FactorExposureActionTypes.LOAD_GROUPINGS_BY_DATE),
            switchMap((payload) => {
                return this.factorExposureService
                    .loadGroupingsByDate(payload)
                    .pipe(
                        map(res => new fromActions.LoadGroupingsByDateComplete(res)),
                        catchError(err => of(new fromActions.LoadGroupingsByDateFailed(err)))
                    );
            })
        );

    @Effect()
    loadFactorTabGridData$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.FactorExposureActionTypes.LOAD_FACTORS_TAB_GRID_DATA),
            withLatestFrom(this.store.select(fromSelector.getActiveDate)),
            switchMap(([payload, activeDate]) => {
                let newDate = moment(activeDate).format('MM-DD-YYYY');
                return this.factorExposureService 
                    .loadFactorsTabGridData(newDate)
                    .pipe(
                        switchMap( (res: any) => {
                            let actionArr = [];
                            actionArr.push( new fromActions.LoadFactorsTabGridDataComplete(res))
                            actionArr.push( new fromActions.SetTimestamp(res.timestamp))
                            return actionArr
                        }),
                        catchError(err => of(new fromActions.LoadFactorsTabGridDataFailed(err)))
                    );
            })
        );

    @Effect()
    loadGroupingTabGridData$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.FactorExposureActionTypes.LOAD_GROUPING_TAB_GRID_DATA),
            withLatestFrom(
                this.store.select(fromSelector.getActiveDate),
                this.store.select(fromSelector.getActiveGrouping)
            ),
            switchMap(([payload, activeDate, activeGrouping]) => {
                let newDate = moment(activeDate).format('MM-DD-YYYY');
                return this.factorExposureService 
                    .loadGroupingTabGridData({activeGrouping: activeGrouping, activeDate: newDate})
                    .pipe(
                        switchMap( (res: any) => {
                            let actionArr = [];
                            actionArr.push( new fromActions.LoadGroupingTabGridDataComplete(res, activeGrouping))
                            actionArr.push( new fromActions.SetTimestamp(res.timestamp))
                            return actionArr
                        }),
                        catchError(err => of(new fromActions.LoadGroupingTabGridDataFailed(err)))
                    );
            })
        );


    @Effect()
    loadPositionsLite$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.FactorExposureActionTypes.LOAD_POSITIONS_LITE_DATA),
            withLatestFrom(
                this.store.select(fromSelector.getActiveDate),
            ),
            switchMap(([payload, activeDate]) => {
                let newDate = moment(activeDate).format('MM-DD-YYYY');
                return this.factorExposureService 
                    .loadPositionsLiteData(newDate)
                    .pipe(
                        map(res => new fromActions.LoadPositionsLiteDataComplete(res)),
                        catchError(err => of(new fromActions.LoadPositionsLiteDataFailed(err)))
                    );
            })
        );
        
    @Effect()                
    loadSetting$: Observable<Action> = this.actions$    
        .pipe(
            ofType(fromActions.FactorExposureActionTypes.LOAD_SETTINGS),
            switchMap(() => {
                return this.factorExposureService
                    .loadSettings()
                    .pipe(
                        map(res => new fromActions.LoadSettingsComplete(res)),
                        catchError(err => of(new fromActions.LoadSettingsFailed(err)))
                    );
            })
        );

    @Effect()
    loadPositionsGrouping$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.FactorExposureActionTypes.LOAD_POSITIONS_GROUPING),
            withLatestFrom(
                this.store.select(fromSelector.getActiveDate),
            ),
            switchMap(([payload, activeDate]) => {
               let newDate = moment(activeDate).format('MM-DD-YYYY');
                return this.factorExposureService 
                    .loadPositionGrouping(newDate)
                    .pipe(
                        map( (res:any) => {
                            if (res.data !== null) {
                                const parseResult = this.dataService.csvToObjectArrayWithColumnHeaders(res.data, '');
                                return new fromActions.LoadPositionsGroupingComplete(parseResult);
                            } else {
                                return new fromActions.LoadPositionsGroupingComplete([]);
                            }
                        }),
                        catchError(err => of(new fromActions.LoadPositionsGroupingFailed(err)))
                    )
                })
        );


    @Effect()
    saveSetting$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.FactorExposureActionTypes.SAVE_SETTINGS),
            map((action: fromActions.SaveSettings) => action.payload),
            switchMap((payload: any) => {
                return this.factorExposureService
                    .saveSettings(payload)
                    .pipe(
                        map(res => new fromActions.SaveSettingsComplete(res)),
                        catchError(err => of(new fromActions.SaveSettingsFailed(err)))
                    );
            })
        );

    constructor(
        private actions$: Actions,
        private factorExposureService: fromServices.FactorExposureService,
        private store: Store<State>,
        private dataService: HighchartsDataService
    ) {}
}
