import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, filter, switchMap, catchError, take } from 'rxjs/operators';


@Injectable()
export class ExecutionTaggingGuard implements CanActivate {

  constructor() {}

  canActivate(): Observable<boolean> {
    return of(true)
  }

  checkStore(): Observable<boolean> {
    return of(true)
  }
}
