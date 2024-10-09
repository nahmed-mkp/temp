import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models/dials.models';

@Injectable()
export class DialsService {

    constructor(private client: HttpClient) { }

    loadDialSets(): Observable<fromModels.DialsSet[]> {
        return this.client
            .get<fromModels.DialsSet[]>(`http://prizm-map.mkpcap.com/api/v1/yieldbook/dialsets`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    addDialSet(payload: fromModels.NewDialsSet): Observable<fromModels.NewDialsSet> {
        return this.client
            .post<fromModels.NewDialsSet>(`http://prizm-map.mkpcap.com/api/v1/yieldbook/dialsets`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateDialSet(payload: fromModels.DialsSet): Observable<fromModels.DialsSet> {
        return this.client
            .put<fromModels.DialsSet>(`http://prizm-map.mkpcap.com/api/v1/yieldbook/dialsets/${payload.yieldbookDialsSetId}`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    deleteDialSet(payload: fromModels.DialsSet): Observable<fromModels.DialsSet> {
        return this.client
            .delete<fromModels.DialsSet>(`http://prizm-map.mkpcap.com/api/v1/yieldbook/dialsets/${payload.yieldbookDialsSetId}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    loadDials(payload: fromModels.DialsSet): Observable<fromModels.Dial[]> {
        return this.client
            .get<fromModels.Dial[]>(`http://prizm-map.mkpcap.com/api/v1/yieldbook/dials/${payload.yieldbookDialsSetId}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }

    updateDial(payload: fromModels.DialUpdate): Observable<fromModels.Dial[]> {
        return this.client
            .put<fromModels.Dial[]>(`http://prizm-map.mkpcap.com/api/v1/yieldbook/dials/${payload.yieldbookDialsSetId}/update`, payload)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
