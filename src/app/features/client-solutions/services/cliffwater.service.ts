import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import * as fromModel from '../models';

@Injectable()
export class CliffwaterService {
    constructor(private httpClient: HttpClient) { }

    public getCliffwaterData(payload: fromModel.ICliffwaterReq): Observable<any[]> {

        const asOfDate = payload.asOfDate.toLocaleDateString().split('/').join('-');
        const fund = payload.fund;
        return this.httpClient
            .get<any[]>(`http://prizm-map.mkpcap.com/api/v1/investor/cliffwater/${asOfDate}/${fund}`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}