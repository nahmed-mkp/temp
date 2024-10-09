import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models/drift-new.models';

@Injectable()
export class DriftNewService {

    constructor(public client: HttpClient) { }

    public loadFundPodTradeDrift(payload: fromModels.IDriftParams): Observable<any[]> {
        const asOfDate = payload.asOfDate;
        const mode = `${payload.mode}`;
        return this.client
            .get<any>(`http://prizm-map.mkpcap.com/api/v1/position/drift/fpt/${asOfDate}/${mode}`)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }
    
}
