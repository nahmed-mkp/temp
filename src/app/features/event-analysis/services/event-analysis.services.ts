import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models/event-analysis.models';

@Injectable()
export class EventAnalysisService {

    constructor(private http: HttpClient) {}

    /********************************************************************************/
    /*                            Meta Data Management                              */
    /********************************************************************************/

    getPreprocessOptions(): Observable<fromModels.PreprocessOption[]> {
        // return this.http
        //     .get<fromModels.PreprocessOption[]>('http://prizm-map.mkpcap.com/api/v1/timeseries-analysis/preprocessOptions')
        //     .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
        return of([
            {displayName: "Backward Fill", name: "bfill"},
            {displayName: "Forward Fill", name: "ffill"}
        ])
    }

    getCustomFunctionSet(): Observable<fromModels.customFunctionSet> {
        return this.http
            .get<fromModels.customFunctionSet>('http://prizm-map.mkpcap.com/api/v1/timeseries/custom_functions')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    /********************************************************************************/
    /*                            Calendars Management                              */
    /********************************************************************************/

    getCalendars(): Observable<fromModels.ICalendar[]> {
        return this.http
            .get<fromModels.ICalendar[]>(`http://prizm-map.mkpcap.com/api/v1/events/calendars`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    addCalendar(payload: fromModels.ICalendar): Observable<fromModels.ICalendar> {
        return this.http
            .post<fromModels.ICalendar>(`http://prizm-map.mkpcap.com/api/v1/events/calendars`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateCalendar(payload: fromModels.ICalendar): Observable<fromModels.ICalendar> {
        return this.http
            .put<fromModels.ICalendar>(`http://prizm-map.mkpcap.com/api/v1/events/calendars/${payload.id}`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    deleteCalendar(payload: fromModels.ICalendar): Observable<fromModels.ICalendar> {
        console.log('delete Calendar', payload);
        return this.http
            .delete<fromModels.ICalendar>(`http://prizm-map.mkpcap.com/api/v1/events/calendars/${payload.id}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    getCalendarDates(payload: fromModels.ICalendar): Observable<string[]> {
        return this.http
            .get<string[]>(`http://prizm-map.mkpcap.com/api/v1/events/calendars/${payload.id}/dates`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    addCalendarDate(payload: fromModels.ICalendarDate): Observable<string[]> {
        const data = Object.assign({}, payload, {'action': 'add'});
        return this.http
            .post<string[]>(`http://prizm-map.mkpcap.com/api/v1/events/calendars/${payload.calendarId}/dates`, data)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    deleteCalendarDate(payload: fromModels.ICalendarDate): Observable<string[]> {
        const data = Object.assign({}, payload, { 'action': 'delete' });
        return this.http
            .post<string[]>(`http://prizm-map.mkpcap.com/api/v1/events/calendars/${payload.calendarId}/dates`, data)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    /********************************************************************************/
    /*                       Timeseries Analyses Management                         */
    /********************************************************************************/

    getAnalyses(): Observable<fromModels.TimeseriesAnalysis[]> {
        return this.http
            .get<fromModels.TimeseriesAnalysis[]>('http://prizm-map.mkpcap.com/api/v1/timeseries')
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    addAnalysis(payload: fromModels.TimeseriesAnalysis): Observable<fromModels.TimeseriesAnalysis> {
        return this.http
            .post<fromModels.TimeseriesAnalysis>('http://prizm-map.mkpcap.com/api/v1/timeseries/', payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
        // return of(payload);
    }

    updateAnalysis(payload: fromModels.TimeseriesAnalysis): Observable<fromModels.TimeseriesAnalysis> {
        return this.http
            .put<fromModels.TimeseriesAnalysis>(`http://prizm-map.mkpcap.com/api/v1/timeseries/${payload.guid}`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    deleteAnalysis(guid: string): Observable<fromModels.TimeseriesAnalysis> {
        return this.http
            .delete<fromModels.TimeseriesAnalysis>(`http://prizm-map.mkpcap.com/api/v1/timeseries/${guid}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }


    /********************************************************************************/
    /*                           Configuration Management                           */
    /********************************************************************************/

    loadConfiguration(guid: string): Observable<fromModels.Configuration> {
        return this.http
            .get<fromModels.Configuration>(`http://prizm-map.mkpcap.com/api/v1/timeseries/configurations/${guid}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    addConfiguration(payload: fromModels.Configuration): Observable<fromModels.Configuration> {
        return this.http
            .post<fromModels.Configuration>(`http://prizm-map.mkpcap.com/api/v1/timeseries/configurations/${payload.guid}`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateConfiguration(payload: fromModels.Configuration): Observable<fromModels.Configuration> {
        return this.http
            .put<fromModels.Configuration>(`http://prizm-map.mkpcap.com/api/v1/timeseries/configurations/${payload.guid}`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    deleteConfiguration(payload: fromModels.Configuration): Observable<fromModels.Configuration> {
        return this.http
            .delete<fromModels.Configuration>(`http://prizm-map.mkpcap.com/api/v1/timeseries-analysis/configurations/${payload.guid}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    /********************************************************************************/
    /*                             Analysis Management                              */
    /********************************************************************************/

    loadRawData(payload: fromModels.Configuration): Observable<any> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/timeseries/marketdata/${payload.guid}`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadPlotData(payload: fromModels.Configuration): Observable<any> {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/timeseries-analysis/${payload.guid}/plotdata`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadEventAnalysis(payload: fromModels.Configuration): Observable<any> {
        return this.http
        .post<any>(`http://prizm-map.mkpcap.com/api/v1/timeseries/events/${payload.guid}`, payload)
        .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadStatistics(payload: fromModels.Configuration): any {
        return this.http
            .post<any>(`http://prizm-map.mkpcap.com/api/v1/timeseries-analysis/${payload.guid}/statistics`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    enrichHighChartSymbolLib(highchart) {
        highchart.SVGRenderer.prototype.symbols['square-regular'] = function (x, y, w, h) {
            return ['M', x, y, 'L', x + w, y,
                    'M', x + w, y, 'L', x + w, y + h,
                    'M', x + w, y + h, 'L', x, y + h,
                    'M', x, y + h, 'L', x, y,
                    'z'];
        };

        highchart.SVGRenderer.prototype.symbols['triangle-regular'] = function (x, y, w, h) {
            return ['M', x + w / 2, y, 'L', x + w, y + h,
                    'M', x + w, y + h, 'L', x, y + h,
                    'M', x, y + h, 'L',  x + w / 2, y,
                    'z'];
        };

        highchart.SVGRenderer.prototype.symbols['diamond-regular'] = function (x, y, w, h) {
            return ['M', x + w / 2, y, 'L', x + w, y + h / 2,
                    'M', x + w, y + h / 2, 'L', x + w / 2, y + h,
                    'M', x + w / 2, y + h, 'L', x, y + h / 2,
                    'M', x, y + h / 2, 'L', x + w / 2, y,
                    'z'];
        };

        highchart.SVGRenderer.prototype.symbols['star-regular'] = function(x, y, w, h) {
            const alpha = (2 * Math.PI) / 10;
            const starX = x + w / 2;
            const starY = y + h / 2;
            let points = [];

            let tempX = starX;
            let tempY = starY;
            for (let i = 11; i !== 0; i--) {
                const r = (h / 2) * (i % 2 + 1) / 2 * 1.3;
                const omega = alpha * i;
                points = points.concat(['M', tempX, tempY]);
                points = points.concat(['L', r * Math.sin(omega) + starX, (r * Math.cos(omega)) + starY]);
                tempX = r * Math.sin(omega) + starX;
                tempY = (r * Math.cos(omega)) + starY;
            }
            return points.concat('Z');
        };

        highchart.SVGRenderer.prototype.symbols['star'] = function(x, y, w, h) {
            const alpha = (2 * Math.PI) / 10;
            const starX = x + w / 2;
            const starY = y + h / 2;
            let points = [];
            for (let i = 11; i !== 0; i--) {
                const r = (h / 2) * (i % 2 + 1) / 2 * 1.3;
                const omega = alpha * i;
                points = points.concat([r * Math.sin(omega) + starX, (r * Math.cos(omega)) + starY]);
            }
            return ['M', points[0], points[1], 'L'].concat(points).concat('Z');
        };

        highchart.SVGRenderer.prototype.symbols['spade-regular'] = function(x, y, w, h) {
            return ['M', x + w / 2, y, 'L', x + w, y + h / 2,
                    'M', x + w, y + h / 2, 'L', x + w, y + h * 3 / 4,
                    'M', x + w, y + h * 3 / 4, 'L', x,  y + h * 3 / 4,
                    'M', x,  y + h * 3 / 4, 'L', x, y + h / 2,
                    'M', x, y + h / 2, 'L', x + w / 2, y,
                    'M', x + w / 2, y + h * 3 / 4, 'L', x + w * 3 / 4, y + h,
                    'M', x + w * 3 / 4, y + h, 'L', x + w / 4, y + h,
                    'M', x + w / 4, y + h, 'L', x + w / 2, y + h * 3 / 4,
                    'z']
        };

        highchart.SVGRenderer.prototype.symbols['spade'] = function(x, y, w, h) {
            return ['M', x + w / 2, y, 'L', x + w, y + h / 2,
                    'L', x + w, y + h * 3 / 4,
                    'L', x,  y + h * 3 / 4,
                    'L', x, y + h / 2,
                    'L', x + w / 2, y,
                    'M', x + w / 2, y + h * 3 / 4, 'L', x + w * 3 / 4, y + h,
                    'L', x + w / 4, y + h,
                    'L', x + w / 2, y + h * 3 / 4,
                    'z']
        };

        highchart.SVGRenderer.prototype.symbols['shield-regular'] = function(x, y, w, h) {
            return ['M', x + w / 5, y, 'L', x + w * 4 / 5, y,
                    'M',  x + w * 4 / 5, y, 'L', x + w * 3 / 4, y + h * 2 / 3,
                    'M', x + w * 3 / 4, y + h * 2 / 3, 'L', x + w / 2, y + h,
                    'M', x + w / 2, y + h, 'L', x + w / 4, y + h * 2 / 3,
                    'M', x + w / 4, y + h * 2 / 3, 'L',  x + w / 5, y,
                    'z'];
        };

        highchart.SVGRenderer.prototype.symbols['shield'] = function(x, y, w, h) {
            return ['M', x + w / 5, y, 'L', x + w * 4 / 5, y,
                    'L', x + w * 3 / 4, y + h * 2 / 3,
                    'L', x + w / 2, y + h,
                    'L', x + w / 4, y + h * 2 / 3,
                    'L',  x + w / 5, y,
                    'z'];
        };

        highchart.SVGRenderer.prototype.symbols['circle-regular'] = function(x, y, w, h) {
            const centerX = x + w / 2;
            const centerY = y + h / 2;
            const radius = w / 2;

            return ['M', centerX, centerY - radius,
                    'A', radius, radius, 0, 1, 0, centerX, centerY + radius,
                    'A', radius, radius, 0, 1, 0, centerX, centerY - radius,
                    'Z',
                    'M', centerX, centerY - radius,
                    'A', radius, radius, 0, 1, 1, centerX, centerY + radius,
                    'A', radius, radius, 0, 1, 1, centerX, centerY - radius,
                    'Z',
                ];
        };

        return highchart;
    }

}





