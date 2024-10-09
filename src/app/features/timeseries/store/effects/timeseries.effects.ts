import { Injectable } from '@angular/core';
import { Observable, of, empty, from } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { switchMap, map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { Location } from '@angular/common';
import * as fromActions from '../actions';
import * as fromServices from '../../services';
import * as fromStore from '../../store';
import * as fromModels from './../../models/timeseries.models';
import * as fromSelectors from '../selectors';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';
import moment from 'moment';

@Injectable()
export class TimeseriesEffects {


    /* ========================== LOAD NAV DATA ============================== */

    loadTimeseriesHierarchyData$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadTimeseriesHierarchyData),
        switchMap( () => {
            return this.timeseriesService$
            .loadTimeseriesHierarchy()
            .pipe(
                map((res: any) => fromActions.loadTimeseriesHierarchyDataComplete(res)),
                catchError((err: string) => of(fromActions.loadTimeseriesHierarchyDataFailed(err)))    
            )
        })
    ))

    loadParentCatalogData$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadParentCatalogData),
        switchMap( () => {
            return this.timeseriesService$
                .loadParentCatalogData()
                .pipe(
                    map((res: any) => fromActions.loadParentCatalogDataComplete(res)),
                    catchError((err: string) => of(fromActions.loadParentCatalogDataFailed(err)))    
                )
        })
    ))

    loadTimeseriesById$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadTimeseriesByIdData),
        switchMap( (payload) => {
            return this.timeseriesService$
            .loadTimeseriesById(payload.id)
            .pipe(
                map((res: any) => { return res.length > 0 ? fromActions.loadTimeseriesByIdDataComplete(res) : null;}),
                catchError((err: string) => of(fromActions.loadTimeseriesByIdDataFailed(err)))    
            )
        })
    ))


    /* ========================== PORTFOLIOS ==================================== */

    createPortfolio$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.createPortfolio),
        switchMap((payload: fromModels.IPortfolio) => {
            return this.timeseriesService$
                .createPortfolio(payload)
                .pipe(
                    map((res: fromModels.IPortfolio) => {
                        this.location.go('/app/charting/portfolio/' + res.guid)
                        return fromActions.createPortfolioComplete({portfolio: res})
                    }),
                    catchError((err: string) => of(fromActions.createPortfolioFailed))
                )
        })
    ))

    updatePortfolioName$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.updatePortfolioName, fromActions.updateCurrPortfolioName),
        switchMap(({portfolio}) => {
            let editedPortfolio = Object.assign({}, portfolio);
            portfolio.timeseries.map(ts => ts.regression = undefined)
            return this.timeseriesService$
                .updateTimeseriesPortfolioData(editedPortfolio)
                .pipe(
                    map((res: fromModels.IPortfolio[]) => fromActions.updatePortfolioNameComplete(res)),
                    catchError((err: string) => of(fromActions.updatePortfolioNameFailed(err)))
                )
        })
    ))

    loadAllPortfolios$ = createEffect(() => this.actions$.pipe(
        ofType(
            fromActions.loadImportablePortfolios,
            fromActions.updatePortfolioNameComplete
        ),
        switchMap(() => {
            return this.timeseriesService$
                .loadAllImportableTimeseriesPortfolios()
                .pipe(
                    map((res: any) => fromActions.loadImportablePortfoliosComplete(res)),
                    catchError((err: string) => of(fromActions.loadImportablePortfoliosFailed(err)))
                )
        })
    ))

    deletePortfolio$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.deletePortfolio),
        switchMap(({portfolio}) => {
            return this.timeseriesService$
                .deletePortfolio(portfolio)
                .pipe(
                    map((res: any) => fromActions.deletePortfolioComplete(res)),
                    catchError((err: string) => of(fromActions.deletePortfolioError(err)))
                )
        })
    ))

    deleteScratchpad$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.deleteScratchpad),
        switchMap(({ guid }) => {
            return this.timeseriesService$
                .deletePortfolioByGuid(guid)
                .pipe(
                    map((res: any) => fromActions.deleteScratchpadComplete(res)),
                    catchError((err: string) => of(fromActions.deleteScratchpadError(err)))
                )
        })
    ))

    loadPortfoliosAfterDelete$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.deletePortfolioComplete),
        switchMap(({res}) => {
            return this.timeseriesService$
                .loadAllImportableTimeseriesPortfolios()
                .pipe(
                    map((res: any) => fromActions.loadImportablePortfoliosComplete(res)),
                    catchError((err: string) => of(fromActions.loadImportablePortfoliosFailed(err)))
                )
        })
    ))


    /* ======-=================== PORTFOLIO UPDATES ============================= */

    updatePortfolioTrigger$ = createEffect( () => this.actions$.pipe(
        ofType(
            // fromActions.updateTimeseriesExpression,
            fromActions.updateTimeseriesAxis, 
            fromActions.updateDerivedTimeseriesAxis,
            fromActions.updateTimeseriesAlias, 
            fromActions.updateDerivedTimeseriesAlias,
            fromActions.updateDerivedTimeseriesExpression,
            fromActions.deleteTimeseriesFromNav, 
            fromActions.deleteTimeseriesFromSelection,
            fromActions.deleteDerivedTimeseriesFromSelection,
            fromActions.selectTimeseriesfromNav,
            fromActions.createDerivedTimeseries,
            fromActions.updateDerivedTimeseriesLabel,
        ),
        withLatestFrom(this.store.select(fromSelectors.getCurrTab)),
        switchMap( ([action,tab]) => {
            let portfolio = Object.assign({}, tab.portfolio);

            if(portfolio.timeseries){
                portfolio.timeseries.map(ts => ts.regression = undefined)
            }

            if(portfolio.derivedTimeseries){
                portfolio.derivedTimeseries.map(ts => ts.regression = undefined)
            }

            return this.timeseriesService$
            .updateTimeseriesPortfolioData(portfolio)
            .pipe(
                map((res: any) => {
                    return fromActions.updatePortfolioComplete(res)
                }),
                catchError((err: string) => of(fromActions.updatePortfolioFailed(err)))
            )
        })
    ))

    /* ================================ CHART =================================== */

    updateChartData$ = createEffect( () => this.actions$.pipe(
        ofType(
            fromActions.updatePortfolioComplete,
            fromActions.importTimeseriesPortfolio,
            fromActions.updateStartDate,
            fromActions.updateEndDate,
            fromActions.switchTab,
            fromActions.deletePortfolioTab,
            fromActions.loadPortfolioFromURL,
            fromActions.loadPortfolioDataFromLocalStorageComplete,
        ),
        withLatestFrom(
            this.store.select(fromSelectors.getCurrTab),
            this.store.select(fromSelectors.getStartDate),
            this.store.select(fromSelectors.getEndDate)
        ),
        switchMap( ([action,currTab, startDate, endDate]) => {
            if(currTab && currTab.portfolio){
                const payload: fromModels.IPortfolioDataRequest = {
                    portfolio: currTab.portfolio,
                    startDate: moment(startDate).format('MM-DD-YYYY'),
                    endDate: moment(endDate).format('MM-DD-YYYY'),
                } 
                if(currTab.portfolio.timeseries.length === 0){
                    return empty()
                } else {
                    return this.timeseriesService$.loadTimeseriesPortfolioData(payload)
                    .pipe(
                        map((res: any) => {
                            let formattedData = this.highchartDataService$.csvToObjectArrayHandleNaN(res, 'Date')
                            return fromActions.loadPortfolioTimeseriesDataComplete(formattedData)
                        }),
                        catchError((err: string) => of(fromActions.loadPortfolioTimeseriesDataFailed(err)))
                    )
                }
            } else {
                return empty()
            }
        })
    ))

    /* ================================ STATS =================================== */

    updateStats$ = createEffect( () => this.actions$.pipe(
        ofType(
            fromActions.updatePortfolioComplete,
            fromActions.importTimeseriesPortfolio,
            fromActions.updateStartDate,
            fromActions.updateEndDate,
            fromActions.switchTab,
            fromActions.deletePortfolioTab,
            fromActions.loadPortfolioDataFromLocalStorageComplete,
            fromActions.loadPortfolioFromURLComplete
        ),
        withLatestFrom(
            this.store.select(fromSelectors.getCurrTab),
            this.store.select(fromSelectors.getStartDate),
            this.store.select(fromSelectors.getEndDate)
        ),
        switchMap( ([action,currTab, startDate, endDate]) => {
            if(currTab && currTab.portfolio){
                let newPortfolio = Object.assign({}, currTab.portfolio);
                const payload: fromModels.IPortfolioDataRequest = {
                    portfolio: newPortfolio,
                    startDate: moment(startDate).format('MM-DD-YYYY'),
                    endDate: moment(endDate).format('MM-DD-YYYY'),
                } 
                if(newPortfolio.timeseries.length === 0){
                    return empty()
                } else {
                    return this.timeseriesService$
                    .loadTimeseriesPortfolioStats(payload)
                    .pipe(
                        map((res: any) => fromActions.loadTimeseriesStatsDataComplete(this.highchartDataService$.csvToObjectArrayWithColumnHeaders(res, ''))),
                        catchError((err: string) => of(fromActions.loadTimeseriesStatsDataFailed(err)))
                    )
                }
            } else {
                return empty()
            }
        
        })
    ))

    /* ================================ DRAWDOWN =================================== */
    
    
    loadDrawdown$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.loadDrawdownData),
        withLatestFrom(
            this.store.select(fromSelectors.getCurrTab),
            this.store.select(fromSelectors.getStartDate),
            this.store.select(fromSelectors.getEndDate)
        ),
        switchMap( ([action, currTab, startDate, endDate]) => {
            let req = Object.assign({}, action.request)
            req['startDate'] = moment(startDate).format('MM-DD-YYYY');
            req['endDate'] = moment(endDate).format('MM-DD-YYYY');
            req.guid = currTab.portfolio.guid;
            return this.timeseriesService$
                .loadDrawdownData(req)
                .pipe(
                    map((res: any) =>{ 
                        res.data = this.highchartDataService$.csvToObjectArray(res.data, 'Date')
                        return fromActions.loadDrawdownDataComplete(res)
                    }),
                    catchError((err: string) => of(fromActions.loadDrawdownDataFailed(err)))
                )
        })
    ))


   /* =========================== REGRESSION ======================================= */


   updateTimeseriesRegression$ = createEffect(() => this.actions$.pipe(
        ofType(
            fromActions.updateTimeseriesRegression,
            fromActions.updateDerivedTimeseriesRegression,
            fromActions.updateStartDate,
            fromActions.updateEndDate,
        ),
        withLatestFrom(
            this.store.select(fromSelectors.getCurrTab),
            this.store.select(fromSelectors.getStartDate),
            this.store.select(fromSelectors.getEndDate)
        ),
        switchMap(([action, currTab, startDate, endDate]) => {

            // payload validation to automatically run regressions 
            let regressionPayloadValidated: boolean = false;
            let regressionArr = {};
            let dataSourceTimeseriesRegressionItems = (currTab && currTab.portfolio && currTab.portfolio.timeseries ) ? currTab.portfolio.timeseries.filter(ts => ts.regression) : [];
            let derivedTimeseriesRegressionItems = (currTab && currTab.portfolio && currTab.portfolio.derivedTimeseries) ? currTab.portfolio.derivedTimeseries.filter(ts => ts.regression) : [];
            let regressionItems = [...dataSourceTimeseriesRegressionItems, ...derivedTimeseriesRegressionItems];

            regressionItems.map( (ts: any) => regressionArr[ts.regression] =  ts.timeseriesId ? ts.timeseriesId : ts.variable)

            if(Object.keys(regressionArr).includes('y') && Object.keys(regressionArr).includes('x1')){
                regressionPayloadValidated = true;
            }

            if(regressionPayloadValidated){
                let req: fromModels.IRegressionReq = {
                    startDate: moment(startDate).format('MM-DD-YYYY'),
                    endDate: moment(endDate).format('MM-DD-YYYY'),
                    xy: regressionArr
                }
                return this.timeseriesService$
                    .loadRegressionData(req, currTab.portfolio.guid)
                    .pipe(
                        map((res: any) => {
                            const formattedRegData = this.highchartDataService$.csvToObjectArrayWithColumnHeaders(res['regressionPlot'], '');
                            const formattedData = this.highchartDataService$.csvToObjectArray(res['actualVsPredicted'], 'Date');
                            let obj : fromModels.IRegressionRes = {
                                timeseries: formattedData,
                                expr: res.expr,
                                mse: res.mse,
                                r2: res.r2,
                                observations: res.observations,
                                regressionPlot: formattedRegData,
                                regressionLine: res.regressionLine,
                                curPoint: res.curPoint
                            }
                            return fromActions.loadRegressionDataComplete(obj)}),
                        catchError((err: string) => of(fromActions.loadRegressionDataFailed(err)))
                    )
            }
            return of(fromActions.loadRegressionDataFailed('Regression payload not validated'))
        })
    ))

    /* =============================== NAVIGATION =========================== */

    // if auto-generated portfolio
    autoGenPortfolio$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.selectTimeseriesfromNav),
        withLatestFrom(this.store.select(fromSelectors.getCurrTab)),
        switchMap(([action, tab]) => {
            if(tab.portfolio.timeseries.length === 1){
                this.location.go('/app/charting/portfolio/' + tab.portfolio.guid)
            }
            return empty()
        })
    ))


    deleteLastExistingTab$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.deletePortfolioTab),
        withLatestFrom(this.store.select(fromSelectors.getTabs)),
        switchMap(([action, tabs]) => {
            if(tabs.length === 0){
                this.location.go('/app/charting')
            }
            return empty()
        })
    ))

    importTabAndChangeURL$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.importTimeseriesPortfolio),
        withLatestFrom(this.store.select(fromSelectors.getCurrTab)),
        switchMap(([action, currTab]) => {
            this.location.go('/app/charting/portfolio/' + currTab.portfolio.guid)
            return empty()
        })
    ))

    switchTabAndChangeURL$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.switchTab),
        withLatestFrom(this.store.select(fromSelectors.getCurrTab)),
        switchMap(([action, currTab]) => {
            this.location.go('/app/charting/portfolio/' + currTab.portfolio.guid)
            return empty()
        })
    ))

    deleteTabAndChangeURL$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.deletePortfolioTab),
        withLatestFrom(this.store.select(fromSelectors.getCurrTab)),
        switchMap(([action, currTab]) => {
            if(currTab){
                this.location.go('/app/charting/portfolio/' + currTab.portfolio.guid)
            }
            return empty()
        })
    ))
    /* ============================ LOCAL STORAGE ==================================== */

    loadPortfolioDataFromLocalStorage$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.loadPortfolioDataFromLocalStorage),
        mergeMap(({req}) => {
            return this.timeseriesService$
            .loadTimeseriesPortfolio(req.portfolio)
            .pipe(
                map((res: fromModels.IPortfolio) => {
                    return fromActions.loadPortfolioDataFromLocalStorageComplete({
                        startDate: req.startDate,
                        endDate: req.endDate,
                        portfolio: res
                    })
                }),
                catchError((err: string) => of(fromActions.loadPortfolioDataFromLocalStorageFailed(err)))
            )
        })
    ))


    addTabFromLocalStorage$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.addTabFromLocalStorage),
        switchMap(({tab}) => {
            this.location.go('/app/charting/portfolio/' + tab.portfolio.guid)
            return of(fromActions.addTab(tab))
        }
    )))

    /* ================================= GUID URL =================================== */


    loadPortfolioFromURL$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.loadPortfolioFromURL),
        withLatestFrom( this.store.select(fromSelectors.getStartDate), this.store.select(fromSelectors.getEndDate), this.store.select(fromStore.getCurrTab)),
        switchMap( ([action, startDate, endDate, currTab]) => {
            return this.timeseriesService$
                .loadTimeseriesPortfolio({
                    guid: action.guid,
                    name: null,
                    timeseries: [],
                    derivedTimeseries: [],
                })
                .pipe(
                    switchMap((res: fromModels.IPortfolio) => {
                        let newTabTemplate: fromModels.ITab = {
                            portfolio: {
                                name: res.name,
                                timeseries: [],
                                derivedTimeseries: [],
                                guid: res.guid,
                                isShared: true
                            },
                            chartData: [],
                            chartDataLoaded: false,
                            chartDataLoading: false,
                            statData: [],
                            statDataLoading: false,
                            statDataLoaded: false,
                            regressionData: {
                                expr: '',
                                mse: 0,
                                r2: 0,
                                timeseries: [],
                                observations: 0,
                                regressionPlot: null,
                                regressionLine: null,
                                curPoint: null
                            },
                            regressionDataLoading: false,
                            regressionDataLoaded: false,
                            drawdownData: { data: [], drawdown: [] },
                            drawdownDataLoading: false,
                            drawdownDataLoaded: false,
                            regressionViewMode: 'regression',
                            selectedDrawdownTimeseries:' ',
                            selectedRegressionTimeseries:null
                        }
                        return [
                            fromActions.addTab(newTabTemplate),
                            fromActions.loadPortfolioFromURLComplete({
                                startDate: startDate,
                                endDate: endDate,
                                portfolio: res
                            }),
                        ]
                    }
                    ),
                    catchError((err: string) => {
                        this.location.go('/app/charting/portfolio/' + currTab.portfolio.guid)
                        return of(fromActions.loadPortfolioFromURLFailed(err))
                    })
                )
        })
    ));

    /* ======================== TECHNICAL INDICATORS ============================ */

    loadRelativeStrengthIndicatorData$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.loadRelativeStrengthIndicatorData),
        switchMap(({req}) => {
            return this.timeseriesService$
                .loadRelativeStrengthIndicatorData(req)
                .pipe(
                    map((res: any) => fromActions.loadRelativeStrengthIndicatorDataComplete(this.highchartDataService$.csvToObjectArray(res, 'Date'))),
                    catchError((err: string) => of(fromActions.loadRelativeStrengthIndicatorDataFailed(err)))
                )
        })
    ))

    loadSimpleMovingAvgData$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.loadSimpleMovingAvgData),
        switchMap(({req}) => {
            return this.timeseriesService$
                .loadSimpleMovingAverageData(req)
                .pipe(
                    map((res: any) => fromActions.loadSimpleMovingAvgDataComplete(this.highchartDataService$.csvToObjectArray(res, 'Date'))),
                    catchError((err: string) => of(fromActions.loadSimpleMovingAvgDataFailed(err)))
                )
        })
    ))

    loadBollingerBandsData$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.loadBollingerBandsData),
        switchMap(({req}) => {
            return this.timeseriesService$
                .loadBollingerBandsData(req)
                .pipe(
                    map((res: any) => fromActions.loadBollingerBandsDataComplete(this.highchartDataService$.csvToObjectArray(res, 'Date'))),
                    catchError((err: string) => of(fromActions.loadBollingerBandsDataFailed(err)))
                )
        })
    ))

    loadMACDData$ = createEffect(() => this.actions$.pipe(
        ofType(fromActions.loadMovingAverageConvergenceDivergenceData),
        switchMap(({req}) => {
            return this.timeseriesService$
                .loadMovingAverageConvergenceDivergenceData(req)
                .pipe(
                    map((res: any) => fromActions.loadMovingAverageConvergenceDivergenceDataComplete(this.highchartDataService$.csvToObjectArray(res, 'Date'))),
                    catchError((err: string) => of(fromActions.loadMovingAverageConvergenceDivergenceDataFailed(err)))
                )
        })
    ))

    constructor(
        private actions$: Actions,
        private timeseriesService$: fromServices.TimeseriesService,
        private highchartDataService$: HighchartsDataService,
        private store: Store<fromStore.TimeseriesState>,
        private location: Location
    ) { }
    
}

