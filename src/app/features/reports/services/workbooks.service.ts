import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models';

@Injectable()
export class WorkbooksService {

    constructor(private client: HttpClient) { }

    public loadWorkbooks(project: fromModels.Project): Observable<fromModels.Workbook[]> {
        return this.client
            .get<fromModels.Workbook[]>(`http://prizm-map.mkpcap.com/api/v1/externalreports/${project.id}/workbooks`)
            .pipe(catchError((error: HttpErrorResponse) => {
                return throwError(error.error.message);
            }));
    }

    public addWorkbook(workbook: fromModels.Workbook): Observable<fromModels.Workbook> {
        return this.client
            .post<fromModels.Workbook>(`http://prizm-map.mkpcap.com/api/v1/externalreports/${workbook.projectId}/workbooks`, { workbook: workbook })
            .pipe(catchError((error: HttpErrorResponse) => {
                return throwError(error.error.message);
            }));
    }

    public updateWorkbook(workbook: fromModels.Workbook): Observable<fromModels.Workbook> {
        return this.client
            .put<fromModels.Workbook>(workbook.workbookUrl, { workbook: workbook })
            .pipe(catchError((error: HttpErrorResponse) => {
                return throwError(error.error.message);
            }));
    }

    public deleteWorkbook(workbook: fromModels.Workbook): Observable<fromModels.Workbook> {
        return this.client
            .delete<fromModels.Workbook>(workbook.workbookUrl)
            .pipe(catchError((error: HttpErrorResponse) => {
                return throwError(error.error.message);
            }));
    }

    public toggleFavorite(workbook: fromModels.Workbook): Observable<fromModels.Workbook> {
        return this.client
            .post<fromModels.Workbook>(workbook.favoritesUrl, { workbook: workbook })
            .pipe(catchError((error: HttpErrorResponse) => {
                return throwError(error.error.message);
            }));
    }
}
