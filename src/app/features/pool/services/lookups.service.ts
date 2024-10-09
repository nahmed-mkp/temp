import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from './../models/lookups.models';

@Injectable()
export class LookupsService {

    constructor(private client: HttpClient) { }

    loadAllLookups(): Observable<fromModels.ILookups> {
        return this.client
            .get<fromModels.ILookups>(`http://prizm-map.mkpcap.com/api/v1/portfolios/lookups`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
