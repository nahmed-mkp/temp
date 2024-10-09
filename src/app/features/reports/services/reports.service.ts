import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models';

@Injectable()
export class ReportsService {

    constructor(private client: HttpClient) { }

    public loadReports(workbook: fromModels.Workbook): Observable<fromModels.Report[]> {
        return this.client
            .get<fromModels.Report[]>(workbook.reportsUrl)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public addReport(report: fromModels.Report): Observable<fromModels.Report> {
        return this.client
            .post<fromModels.Report>(report.reportsUrl, { report: report })
            .pipe(catchError((error: HttpErrorResponse) => {
                return throwError(error.error.message);
            }));
    }

    public updateReport(report: fromModels.Report): Observable<fromModels.Report> {
        return this.client
            .put<fromModels.Report>(report.reportUrl, { report: report })
            .pipe(catchError((error: HttpErrorResponse) => {
                return throwError(error.error.message);
            }));
    }

    public deleteReport(report: fromModels.Report): Observable<fromModels.Report> {
        return this.client
            .delete<fromModels.Report>(report.reportUrl)
            .pipe(catchError((error: HttpErrorResponse) => {
                return throwError(error.error.message);
            }));
    }

    public toggleFavorite(report: fromModels.Report): Observable<fromModels.Report> {
        return this.client
            .post<fromModels.Report>(report.favoritesUrl, { report: report })
            .pipe(catchError((error: HttpErrorResponse) => {
                return throwError(error.error.message);
            }));
    }

    public viewReport(report: fromModels.Report): Observable<fromModels.Report> {
        return this.client
            .post<fromModels.Report>(report.viewCountUrl, { report: report })
            .pipe(catchError((error: HttpErrorResponse) => {
                return throwError(error.error.message);
            }));
    }
}
