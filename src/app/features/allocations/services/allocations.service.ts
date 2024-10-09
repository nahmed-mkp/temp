import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, empty, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models/allocations.models';

@Injectable()
export class AllocationsService {

    constructor(private http: HttpClient) { }

    getAllocationTriggers(): Observable<fromModels.IAllocationTrigger[]> {
        return this.http
            .get<fromModels.IAllocationTrigger[]>(`http://prizm-map.mkpcap.com/api/v1/allocations/triggers`)
            .pipe(catchError((err: HttpErrorResponse) => throwError(err.error.message)));
    }
}
