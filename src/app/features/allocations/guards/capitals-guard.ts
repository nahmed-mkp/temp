import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, switchMap, catchError, take } from 'rxjs/operators';

import * as fromStore from './../store';
import * as moment from 'moment';

@Injectable()
export class CapitalsGuard implements CanActivate {

    constructor(private store: Store<fromStore.AllocationsState>) { }

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getCapitalsFundComplexesLoaded).pipe(
            tap(loaded => {
                if (!loaded) {
                    this.store.dispatch(new fromStore.LoadFundComplexes());
                }
            }),
            take(1)
        );
    }
}


// @Injectable()
// export class CapitalFlowsGuard implements CanActivate {

//     constructor(private store: Store<fromStore.AllocationsState>) { }

//     canActivate(): Observable<boolean> {
//         return this.checkStore().pipe(
//             switchMap(() => of(true)),
//             catchError(() => of(false))
//         );
//     }

//     checkStore(): Observable<boolean> {
//         return this.store.select(fromStore.getFundCapitalFlowsLoaded).pipe(
//             tap(loaded => {
//                 if (!loaded) {
//                     const startDate = moment().format('MM-DD-YYYY');
//                     const endDate = moment().add(10, 'days').format('MM-DD-YYYY');

//                     this.store.dispatch(new fromStore.LoadFundCapitalFlows({
//                         'startDate': startDate,
//                         'endDate': endDate
//                     }));

//                     this.store.dispatch(new fromStore.LoadPodCapitalFlows({
//                         'startDate': startDate,
//                         'endDate': endDate
//                     }));
//                 }
//             }),
//             take(1)
//         );
//     }
// }
