import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import * as fromModels from '../models';

@Injectable()
export class ProjectsService {

    private ROOT_URL = 'http://prizm-map.mkpcap.com/api/v1/externalreports/';

    constructor(private client: HttpClient) { }

    public loadProjects(): Observable<fromModels.Project[]> {
        return this.client
            .get<fromModels.Project[]>(this.ROOT_URL)
            .pipe(catchError((err: HttpErrorResponse) => {
                return throwError((err.error.message));
            }));
    }

    public addProject(project: fromModels.Project): Observable<fromModels.Project> {
        return this.client
            .post<fromModels.Project>(this.ROOT_URL, { project: project })
            .pipe(catchError((error: HttpErrorResponse) => {
                return throwError(error.error.message);
            }));
    }

    public updateProject(project: fromModels.Project): Observable<fromModels.Project> {
        return this.client
            .put<fromModels.Project>(project.projectUrl, { project: project })
            .pipe(catchError((error: HttpErrorResponse) => {
                return throwError(error.error.message);
            }));
    }

    public deleteProject(project: fromModels.Project): Observable<fromModels.Project> {
        return this.client
            .delete<fromModels.Project>(project.projectUrl)
            .pipe(catchError((error: HttpErrorResponse) => {
                return throwError(error.error.message);
            }));
    }

    public toggleFavorite(project: fromModels.Project): Observable<fromModels.Project> {
        return this.client
            .post<fromModels.Project>(project.favoritesUrl, { project: project })
            .pipe(catchError((error: HttpErrorResponse) => {
                return throwError(error.error.message);
            }));
    }
}
