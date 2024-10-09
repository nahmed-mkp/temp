import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of, combineLatest } from 'rxjs';
import { tap, switchMap, catchError, take, combineAll, filter } from 'rxjs/operators';

@Injectable()
export class RateCardGuard implements CanActivate {

    constructor() { }

    canActivate(): Observable<boolean> {
       return of(true)
    }

    checkStore(): Observable<boolean> {
       return of(true)
    }
}