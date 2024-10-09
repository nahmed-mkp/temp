import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { switchMap, map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from './../actions';
import * as fromStore from '../reducers';
import * as fromModels from './../../models/snr-dashboard.models';
import * as fromServices from './../../services';
import * as fromSelector from '../selectors'
import { HighchartsDataService } from 'src/app/shared/custom/utilities';



@Injectable()
export class SNRMacroEffects {

    @Effect()
    loadDates$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SNRMacroActionTypes.LOAD_DATES_AND_COUNTRIES),
            switchMap(() => {
                return this.snrDashboardService$
                    .loadDatesAndCountries()
                    .pipe(
                        map((res: fromModels.IInput) => new fromActions.LoadDatesAndCountriesComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadDatesAndCountriesFailed(err)))
                    );
            })
        );

    @Effect()
    getChartGroupsByCountry$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SNRMacroActionTypes.GET_CHART_GROUPS_BY_COUNTRY),
            map((action: fromActions.GetChartGroupsByCountry) => action.payload),
            switchMap((payload: fromModels.ICountry) => {
                return this.snrDashboardService$
                    .getChartGroupsByCountry(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.GetChartGroupsByCountryComplete({
                            country: payload.code,
                            chartGroups: res,
                        })),
                        catchError((err: string) => of(new fromActions.GetChartGroupsByCountryFailed(err)))
                    );
            })
        );


    @Effect()
    prepareChartsByChartGroupsAndCountryAndDate$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SNRMacroActionTypes.PREPARE_CHARTS_BY_CHART_GROUPS_AND_COUNTRY),
            map((action: fromActions.PrepareChartsByChartGroupsAndCountryAndDate) => action.payload),
            withLatestFrom(
                this.store.select(fromSelector.getSNRMacroRunSelectedMacroRun),
                this.store.select(fromSelector.getChartDataByCountryAndChartGroupAndDateLoadedEntity)
            ),
            switchMap(([payload, macroRun, loadedEntity]) => {
                const completePayload: any = Object.assign({}, payload, {asOfDate: macroRun.asOfDate});
                const combineKey = macroRun.asOfDate + '|' + payload.country.code + '|' + payload.chartGroup;

                if (loadedEntity[combineKey] === true) {
                    // already loaded, will use cache result
                    return [];
                } else {
                    return [
                        new fromActions.GetChartsByChartGroupsAndCountryAndDate({combineKey: combineKey, req: completePayload})
                    ];
                }
            })
        );



    @Effect()
    getChartsByChartGroupsAndCountryAndDate$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SNRMacroActionTypes.GET_CHARTS_BY_CHART_GROUPS_AND_COUNTRY_AND_DATE),
            map((action: fromActions.GetChartsByChartGroupsAndCountryAndDate) => action.payload),
            switchMap(payload => {
                return this.snrDashboardService$
                    .getChartsByChartGroupAndCountry(payload.req)
                    .pipe(
                        map((res: any) => {
                            const missingFiles = res['missingFiles'] || [];
                            const resData = res['data'];
                            const order = res['displayOrder'];
                            const rawDataFlat = order.map(key => resData[key]);
                            let formattedResult: any[] = rawDataFlat.map(rawData => {
                                const formattedObj = {...rawData};
                                if (rawData.data) {
                                    const parseResult = this.dataService.csvToObjectArrayWithColumnHeaders(rawData.data, '') || [];
                                    const paresResultWithDateValue = this.formatDateTime(parseResult, rawData.dateInterval);
                                    paresResultWithDateValue.sort((a, b) => a['DateValue'] - b['DateValue']);
                                    formattedObj['data'] = paresResultWithDateValue;
                                } else {
                                    formattedObj['data'] = [];
                                }
                                return formattedObj;
                            });
                            formattedResult = this.enrichPlotType(formattedResult);
                            formattedResult.forEach(element => {
                                if (element['data'] && element['data'].length > 0) {
                                    element['data'] =  this.consolidatePassRecord(element['data']);
                                }
                            })
                            formattedResult = this.enrichChartType_advance(formattedResult);
                            return new fromActions.GetChartsByChartGroupsAndCountryAndDateComplete({combineKey: payload.combineKey, data: formattedResult, missingFiles: missingFiles});
                        }),
                        catchError((err: string) => of(new fromActions.GetChartsByChartGroupsAndCountryAndDateFailed({combineKey: payload.combineKey, error: err})))
                    );
            })
        );

    @Effect()
    loadMacroRuns$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.SNRMacroActionTypes.LOAD_MACRO_RUN_RESULTS),
            map((action: fromActions.LoadMacroRunResults) => action.payload),
            switchMap((payload: fromModels.IMacroRun) => {
                return this.snrDashboardService$
                    .loadMacroRuns(payload)
                    .pipe(
                        map((res: any[]) => {
                            let formattedResult: any = res.map(rawData => {
                                const formattedObj = {...rawData};
                                let parseResult;
                                if (rawData['dateInterval'] === 'Monthly' && rawData['fileType'] === 'Monthly Inflation') {
                                    parseResult = {};
                                    parseResult['core'] = this.formatDateTime(this.dataService.csvToObjectArrayWithColumnHeaders(rawData.data['core'], ''), rawData['dateInterval']).sort((a, b) => a['DateValue'] - b['DateValue']);
                                    parseResult['core'] = this.consolidatePassRecord(parseResult['core']);
                                    parseResult['headline'] = this.formatDateTime(this.dataService.csvToObjectArrayWithColumnHeaders(rawData.data['headline'], ''), rawData['dateInterval']).sort((a, b) => a['DateValue'] - b['DateValue']);
                                    parseResult['headline'] = this.consolidatePassRecord(parseResult['headline']);
                                } else {
                                    parseResult = this.formatDateTime(this.dataService.csvToObjectArrayWithColumnHeaders(rawData.data, ''), rawData['dateInterval']).sort((a, b) => a['DateValue'] - b['DateValue']);
                                    if (!rawData['fileType'].toLowerCase().includes('decomposition')) {
                                        parseResult = this.consolidatePassRecord(parseResult);
                                    }
                                }
                                formattedObj['data'] = parseResult;
                                return formattedObj;
                            })

                            formattedResult = this.enrichChartType(formattedResult);
                            return new fromActions.LoadMacroRunResultsComplete(formattedResult);
                        }),
                        catchError((err: string) => of(new fromActions.LoadMacroRunResultsFailed(err)))
                    );
            })
        );

    private formatDateTime(dataArray: any[], dateInterval?: string) {
        const formattedResult = [];
        let dateInterval_interpret: string;
        if (dateInterval === 'Monthly' || dateInterval_interpret === 'Monthly') {
            dataArray.forEach(element => {
                if (element['Date'] !== '') {
                    var [year, month] = element['Date'].split('M');
                    var monthNum = parseInt(month, 10);      
                    if (monthNum === 12) { 
                        monthNum = 0;
                        year = parseInt(year, 10) + 1;
                    }
                    const date = (new Date(`${monthNum + 1}/1/${year}`));
                    const dateValue = date.getTime() - 86400000; // -1 day
                    const newElement = {...element};
                    newElement['DateValue'] = dateValue;
                    newElement['DateValueAsDate'] = new Date(dateValue);
                    formattedResult.push(newElement);
                }
            });
        } else if (dateInterval === 'Quarterly' || dateInterval_interpret === 'Quarterly') {
            dataArray.forEach(element => {
                if (element['Date'] !== '') {
                    var [year, quarter] = element['Date'].split('Q');
                    var monthNum = parseInt(quarter, 10) * 3;
                    if (monthNum === 12) {
                        monthNum = 0;
                        year = parseInt(year, 10) + 1;
                    }
                    const date = (new Date(`${monthNum + 1}/1/${year}`));
                    const dateValue = date.getTime() - 86400000; // -1 day
                    const newElement = {...element};
                    newElement['DateValue'] = dateValue;
                    newElement['DateValueAsDate'] = new Date(dateValue);
                    formattedResult.push(newElement);
                }
            });
        } else if (dateInterval === 'Daily' || dateInterval_interpret === 'Daily') {
            dataArray.forEach(element => {
                if (element['Date'] !== '') {
                    const date = (new Date(element['Date']));
                    const dateValue = date.getTime();
                    const newElement = {...element};
                    newElement['DateValue'] = dateValue;
                    newElement['DateValueAsDate'] = new Date(dateValue);
                    formattedResult.push(newElement);
                }
            });
        }

        return formattedResult;
    }

    private consolidatePassRecord(dataArray) {

        const dataKeys = Object.keys(dataArray[0]);
        if (dataKeys.every(key => !key.toLowerCase().includes('confidence'))) {
            return dataArray;
        }

        const isTheSameArray = dataArray.map(dataObj => {
            const keys = Object.keys(dataObj);
            const model = keys.filter(key => key.toLowerCase().includes('model'))[0];
            const confidentBandKeys = keys.filter(key => key.toLowerCase().includes('confidence'));

            const isTheSame = confidentBandKeys.every(key => {
                const targetValue = typeof dataObj[key] === 'number' && parseFloat(dataObj[key].toFixed(1)) || '';
                const referenceValue = typeof dataObj[model] === 'number' && parseFloat(dataObj[model].toFixed(1)) || '';
                return targetValue === referenceValue;
            });
            return isTheSame;
        });


        const newDataArray = dataArray.map((dataObj, index) => {
            const newDataObj = {...dataObj};
            if (isTheSameArray[index] && isTheSameArray[index + 1]) {
                const keys = Object.keys(dataObj);
                const confidentBandKeys = keys.filter(key => key.toLowerCase().includes('confidence'));
                confidentBandKeys.forEach(key => {
                    delete newDataObj[key];
                });
            }
            return newDataObj;
        });

        return newDataArray;
    }

    private enrichChartType(dataArray) {
        // this enrichment is mean to be temporary
        const result = dataArray.map(element => {
            const newElement = {...element};
            if (newElement['fileType'].toLowerCase().includes('decomposition')) {
                newElement['chartGroup'] = 'Decomposition';
            } else if (newElement['fileType'].toLowerCase().includes('inflation')) {
                newElement['chartGroup'] = 'Inflation';
            } else if (newElement['fileType'].toLowerCase().includes('gdp')) {
                newElement['chartGroup'] = 'Growth';
            }
            return newElement;
        });
        return result;
    }

    private enrichPlotType(dataArray) {
        const result = dataArray.map(element => {
            const newElement = {...element};

            if (newElement.data.length === 0) {
                newElement['plotType'] = 'line';
            } else {
                const keys = Object.keys(newElement.data[0]);
                if (keys.some(key => key.includes('Confidence Bands'))) {
                    newElement['plotType'] = 'area';
                } else {
                    newElement['plotType'] = 'line';
                }
            }
            return newElement;
        });
        return result;
    }

    private enrichChartType_advance(dataArray) {
        const result = dataArray.map(element => {
            const newElement = {...element};

            if (newElement.data.length === 0) {
                return newElement;
            }
            if (newElement['fileName'].toLowerCase().includes('growth')) {
                newElement['chartType'] = 'growth';
                let dateInterval_interpret;
                if (newElement.dateInterval) {
                    dateInterval_interpret = newElement.dateInterval;
                } else {
                    const randomElement = newElement.data[10];
                    if (randomElement['Date'].includes('Q')) {
                        dateInterval_interpret = 'Quarterly';
                    } else if (randomElement['Date'].includes('M')) {
                        dateInterval_interpret = 'Monthly';
                    } else {
                        dateInterval_interpret = 'Daily';
                    }
                }
                newElement['chartType'] = newElement['chartType'] + ':' + dateInterval_interpret;
            }
            return newElement;
        });
        return result;
    }

    constructor(
        private actions$: Actions,
        private store: Store<fromStore.SNRDashboardState>,
        private snrDashboardService$: fromServices.SNRDashboardService,
        private dataService: HighchartsDataService,
    ) { }
}
