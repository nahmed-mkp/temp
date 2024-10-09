import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { switchMap, map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

import * as fromActions from './../actions';
import * as fromServices from './../../services/event-analysis.services';
import * as fromModels from './../../models/event-analysis.models';
import * as fromUtilities from '../../../../shared/custom/utilities';
import * as fromSelector from '../../store/selectors';
import * as fromStore from '../reducers';

import { NotificationService } from 'src/app/factories';


@Injectable()
export class EventAnalysisEffects {


    /********************************************************************************/
    /*                                  Meta Data                                   */
    /********************************************************************************/

    @Effect()
    loadPreprocessingOptions$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EventAnalysisActionTypes.LOAD_PREPROCESSING_OPTIONS),
            switchMap(() => {
                return this.eventAnalysisService$
                    .getPreprocessOptions()
                    .pipe(
                        map((res: fromModels.PreprocessOption[]) => new fromActions.LoadPreprocessingOptionsComplete(res)),
                        catchError((err: string) => {
                            this.notificationService.openNotification(err);
                            return of(new fromActions.LoadPreprocessingOptionsFailed(err));
                        })
                    );
            })
        );

    @Effect()
    loadCustomFunctionSet$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EventAnalysisActionTypes.LOAD_CUSTOM_FUNCTIONSET),
            switchMap(() => {
                return this.eventAnalysisService$
                    .getCustomFunctionSet()
                    .pipe(
                        map((res: fromModels.customFunctionSet) => new fromActions.LoadCustomFunctionSetComplete(res)),
                        catchError((err: string) => {
                            this.notificationService.openNotification(err);
                            return of(new fromActions.LoadCustomFunctionSetFailed(err));
                        })
                    );
            })
        );




    /********************************************************************************/
    /*                                  Calendars                                   */
    /********************************************************************************/
    @Effect()
    loadCalendars: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EventAnalysisActionTypes.LOAD_EVENT_CALENDARS),
            switchMap(() => {
                return this.eventAnalysisService$
                    .getCalendars()
                    .pipe(
                        map((res: fromModels.ICalendar[]) => new fromActions.LoadEventCalendarsComplete(res)),
                        catchError((err: string) => {
                            this.notificationService.openNotification(err);
                            return of(new fromActions.LoadEventCalendarsFailed(err));
                        })
                    );
            })
        );

    @Effect()
    addCalendar: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EventAnalysisActionTypes.ADD_CALENDAR),
            map((action: fromActions.AddEventCalendar) => action.payload),
            mergeMap((payload: fromModels.ICalendar) => {
                return this.eventAnalysisService$
                    .addCalendar(payload)
                    .pipe(
                        map((res: fromModels.ICalendar) => new fromActions.AddEventCalendarComplete(res)),
                        catchError((err: string) => {
                            this.notificationService.openNotification(err);
                            return of(new fromActions.AddEventCalendarFailed(err));
                        })
                    );
            })
        );

    @Effect()
    updateCalendar: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EventAnalysisActionTypes.UPDATE_CALENDAR),
            map((action: fromActions.UpdateEventCalendar) => action.payload),
            mergeMap((payload: fromModels.ICalendar) => {
                return this.eventAnalysisService$
                    .updateCalendar(payload)
                    .pipe(
                        map((res: fromModels.ICalendar) => new fromActions.UpdateEventCalendarComplete(res)),
                        catchError((err: string) => {
                            this.notificationService.openNotification(err);
                            return of(new fromActions.UpdateEventCalendarFailed(err));
                        })
                    );
            })
        );

    @Effect()
    deleteCalendar: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EventAnalysisActionTypes.DELETE_CALENDAR),
            map((action: fromActions.DeleteEventCalendar) => action.payload),
            mergeMap((payload: fromModels.ICalendar) => {
                return this.eventAnalysisService$
                    .deleteCalendar(payload)
                    .pipe(
                        map((res: fromModels.ICalendar) => new fromActions.DeleteEventCalendarComplete(res)),
                        catchError((err: string) => {
                            this.notificationService.openNotification(err);
                            return of(new fromActions.DeleteEventCalendarFailed(err));
                        })
                    );
            })
        );

    @Effect()
    getCalendarDates: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EventAnalysisActionTypes.LOAD_CALENDAR_DATES),
            map((action: fromActions.LoadCalendarDates) => action.payload),
            mergeMap((payload: fromModels.ICalendar) => {
                return this.eventAnalysisService$
                    .getCalendarDates(payload)
                    .pipe(
                        map((res: string[]) => new fromActions.LoadCalendarDatesComplete({id: payload.id, data: res})),
                        catchError((err: string) => {
                            this.notificationService.openNotification(err);
                            return of(new fromActions.LoadCalendarDatesFailed(err));
                        })
                    );
            })
        );

    @Effect()
    addCalendarDate: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EventAnalysisActionTypes.ADD_CALENDAR_DATE),
            map((action: fromActions.AddCalendarDate) => action.payload),
            mergeMap((payload: fromModels.ICalendarDate) => {
                return this.eventAnalysisService$
                    .addCalendarDate(payload)
                    .pipe(
                        map((res: string[]) => new fromActions.AddCalendarDateComplete({id: payload.calendarId, data: res})),
                        catchError((err: string) => {
                            this.notificationService.openNotification(err);
                            return of(new fromActions.AddCalendarDateFailed(err));
                        })
                    );
            })
        );

    @Effect()
    deleteCalendarDate: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EventAnalysisActionTypes.DELETE_CALENDAR_DATE),
            map((action: fromActions.DeleteCalendarDate) => action.payload),
            mergeMap((payload: fromModels.ICalendarDate) => {
                return this.eventAnalysisService$
                    .deleteCalendarDate(payload)
                    .pipe(
                        map((res: string[]) => new fromActions.DeleteCalendarDateComplete({id: payload.calendarId, data: res})),
                        catchError((err: string) => {
                            this.notificationService.openNotification(err);
                            return of(new fromActions.DeleteCalendarDateFailed(err));
                        })
                    );
            })
        );

    /********************************************************************************/
    /*                             Timeseries Analyses                              */
    /********************************************************************************/
    @Effect()
    loadTimeseriesAnalyses$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EventAnalysisActionTypes.LOAD_TIMESERIES_ANALYSES),
            switchMap(() => {
                return this.eventAnalysisService$
                    .getAnalyses()
                    .pipe(
                        map((res: fromModels.TimeseriesAnalysis[]) => new fromActions.LoadTimeseriesAnalysesComplete(res)),
                        catchError((err: string) => {
                            this.notificationService.openNotification(err);
                            return of(new fromActions.LoadTimeseriesAnalysesFailed(err));
                        })
                    );
            })
        );

    @Effect()
    addAnalysis: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EventAnalysisActionTypes.ADD_TIMESERIES_ANALYSIS),
            map((action: fromActions.AddTimeseriesAnalysis) => action.payload),
            mergeMap((payload: fromModels.TimeseriesAnalysis) => {
                return this.eventAnalysisService$
                    .addAnalysis(payload)
                    .pipe(
                        map((res: fromModels.TimeseriesAnalysis) => new fromActions.AddTimeseriesAnalysisComplete(res[0])),
                        catchError((err: string) => {
                            this.notificationService.openNotification(err);
                            return of(new fromActions.AddTimeseriesAnalysisFailed(err));
                        })
                    );
            })
        );

    @Effect()
    updateAnalysis: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EventAnalysisActionTypes.UPDATE_TIMESERIES_ANALYSIS),
            map((action: fromActions.UpdateTimeseriesAnalysis) => action.payload),
            mergeMap((payload: fromModels.TimeseriesAnalysis) => {
                return this.eventAnalysisService$
                    .updateAnalysis(payload)
                    .pipe(
                        map((res: fromModels.TimeseriesAnalysis) => new fromActions.UpdateTimeseriesAnalysisComplete(res)),
                        catchError((err: string) => {
                            this.notificationService.openNotification(err);
                            return of(new fromActions.UpdateTimeseriesAnalysisFailed(err));
                        })
                    );
            })
        );

    @Effect()
    deleteAnalysis: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EventAnalysisActionTypes.DELETE_TIMESERIES_ANALYSIS),
            map((action: fromActions.DeleteTimeseriesAnalysis) => action.payload),
            mergeMap((payload: string) => {
                return this.eventAnalysisService$
                    .deleteAnalysis(payload)
                    .pipe(
                        map((res: fromModels.TimeseriesAnalysis) => new fromActions.DeleteTimeseriesAnalysisComplete(payload)),
                        catchError((err: string) => {
                            this.notificationService.openNotification(err);
                            return of(new fromActions.DeleteTimeseriesAnalysisFailed(err));
                        })
                    );
            })
        );

    /********************************************************************************/
    /*                               Configurations                                 */
    /********************************************************************************/
    @Effect()
    loadConfiguration$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EventAnalysisActionTypes.LOAD_CONFIGURATION),
            map((action: fromActions.LoadConfiguration) => action.payload),
            mergeMap((payload: string) => {
                return this.eventAnalysisService$
                    .loadConfiguration(payload)
                    .pipe(
                        map((res: fromModels.Configuration) => new fromActions.LoadConfigurationComplete(res)),
                        catchError((err: string) => {
                            this.notificationService.openNotification(err);
                            return of(new fromActions.LoadConfigurationFailed({error: err, guid: payload}));
                        })
                    );
            })
        );

    @Effect()
    addConfiguration$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EventAnalysisActionTypes.ADD_CONFIGURATION),
            map((action: fromActions.AddConfiguration) => action.payload),
            mergeMap((payload: fromModels.Configuration) => {
                return this.eventAnalysisService$
                    .addConfiguration(payload)
                    .pipe(
                        map((res: fromModels.Configuration) => new fromActions.AddConfigurationComplete(res)),
                        catchError((err: string) => {
                            this.notificationService.openNotification(err);
                            return of(new fromActions.AddConfigurationFailed({error: err, guid: payload.guid}));
                        })
                    );
            })
        );

    @Effect()
    updateConfiguration$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EventAnalysisActionTypes.UPDATE_CONFIGURATION),
            map((action: fromActions.UpdateConfiguration) => action.payload),
            mergeMap((payload: fromModels.Configuration) => {
                return this.eventAnalysisService$
                    .updateConfiguration(payload)
                    .pipe(
                        map((res: fromModels.Configuration) => new fromActions.UpdateConfigurationComplete(res)),
                        catchError((err: any) => {
                            this.notificationService.openNotification(err);
                            return of(new fromActions.UpdateConfigurationFailed({ error: err, guid: payload.guid }));
                        })
                    );
            })
        );

    /********************************************************************************/
    /*                               Event Analysis                                 */
    /********************************************************************************/
    @Effect()
    loadEventAnalysis$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EventAnalysisActionTypes.LOAD_EVENT_ANALYSIS),
            map((action: fromActions.LoadEventAnalysis) => action.payload),
            withLatestFrom(
                this.store.select(fromSelector.getEventAnalysisEntities),
                this.store.select(fromSelector.getConfigurationChangedForEventAnalysisUI)),
            switchMap(([payload, eventAnalysisEntity, changed]) => {
                if (eventAnalysisEntity && eventAnalysisEntity[payload.guid] && changed === false) {
                    // Check Cache and see if the configuration is changed
                    return of(new fromActions.LoadEventAnalysisComplete({guid: payload.guid, data: eventAnalysisEntity[payload.guid]}));
                }
                return this.eventAnalysisService$
                    .loadEventAnalysis(payload)
                    .pipe(
                        map((res) => new fromActions.LoadEventAnalysisComplete({guid: payload.guid, data: res})),
                        catchError((err: string) => {
                            this.notificationService.openNotification(err);
                            return of(new fromActions.LoadEventAnalysisFailed({guid: payload.guid, error: err}));
                        })
                    );
            })
        );

    @Effect()
    loadMarketData$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EventAnalysisActionTypes.LOAD_RAW_DATA),
            map((action: fromActions.LoadRawData) => action.payload),
            withLatestFrom(
                this.store.select(fromSelector.getEventAnalysisMarketDataEntities),
                this.store.select(fromSelector.getConfigurationChangedForMarketDataUI)),
            switchMap(([payload, marketData, changed]) => {
                if (marketData && marketData[payload.guid] && changed === false) {
                    // Check Cache and see if the configuration is changed
                    return of(new fromActions.LoadRawDataComplete({guid: payload.guid, data: marketData[payload.guid]}));
                } else {
                    return this.eventAnalysisService$
                    .loadRawData(payload)
                    .pipe(
                        map((res: any[]) => new fromActions.LoadRawDataComplete({ guid: payload.guid, data: res })),
                        catchError((err: any) => {
                            this.notificationService.openNotification(err);
                            return of(new fromActions.LoadRawDataFailed({ guid: payload.guid, error: err }));
                        })
                    );
                }
            })
        );

    constructor(
        private actions$: Actions,
        private eventAnalysisService$: fromServices.EventAnalysisService,
        // private highchartsService: fromUtilities.HighchartsDataService
        private snackBar: MatSnackBar,
        private notificationService: NotificationService,
        private store: Store<fromStore.EventAnalysisState>
    ) {}
}
