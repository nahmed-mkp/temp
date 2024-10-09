import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as fromModels from '../models';


@Injectable()
export class ExecutionTaggingService {

  constructor(private client: HttpClient) {}

  loadPortfolioManagers(): Observable<any>{
    return this.client
        .get<boolean>('api/v1/execution-tagging/portfolio-managers')
        .pipe(catchError((err: HttpErrorResponse) => Observable.throw(err.error.message)));
  }

  loadExecutions(payload: fromModels.ITagsByTraderReq): Observable<any>{
    return this.client
        .post<boolean>('api/v1/execution-tagging/tags-by-trader', payload)
        .pipe(catchError((err: HttpErrorResponse) => Observable.throw(err.error.message)));
  }

  loadReasons(): Observable<any>{
    return this.client
        .get<boolean>('api/v1/execution-tagging/reasons')
        .pipe(catchError((err: HttpErrorResponse) => Observable.throw(err.error.message)));
  }

  updateReason(payload: fromModels.IReasonsUpdateReq): Observable<any>{
    return this.client
        .post<any>('api/v1/execution-tagging/reasons', payload)
        .pipe(catchError((err: HttpErrorResponse) => Observable.throw(err.error.message)));
  }

  updateTag(payload: fromModels.ITagsUpdateReq): Observable<any>{
    return this.client
        .post<any>('api/v1/execution-tagging/tags', payload)
        .pipe(catchError((err: HttpErrorResponse) => Observable.throw(err.error.message)));
  }

}
