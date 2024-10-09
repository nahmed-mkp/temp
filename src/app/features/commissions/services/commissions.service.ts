import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as fromModels from '../models';


@Injectable()
export class CommissionsService {

    constructor(private httpClient: HttpClient) { }

    public getCommissions(): Observable<fromModels.ICommission[]> {
        return this.httpClient
            .get<fromModels.ICommission[]>(`http://prizm-map.mkpcap.com/api/v1/commissions/`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
