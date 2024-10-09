import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { tap, switchMap, catchError, take } from 'rxjs/operators';

import * as fromStore from '../store';

@Injectable()
export class ExposureLadderGuard implements CanActivate {

    constructor() { }

    canActivate(): Observable<boolean> {
       return of(true);
    }
}
