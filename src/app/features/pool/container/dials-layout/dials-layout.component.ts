import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Output, EventEmitter} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromModels from './../../models';
import * as fromStore from './../../store';

@Component({
    selector: 'app-dials-layout',
    templateUrl: './dials-layout.component.html',
    styleUrls: ['./dials-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialsLayoutComponent implements OnInit, OnDestroy {

    @Output() closeSideNav = new EventEmitter<boolean>();

    public editedDial: fromModels.DialUpdate;

    public dialsSets$: Observable<fromModels.DialsSet[]>;
    public selectedDialsSet$: Observable<fromModels.DialsSet>;
    public dials$: Observable<fromModels.Dial[]>;

    public dialsSetSubscription$: Subscription;

    constructor(private store: Store<fromStore.State>) {
        // Dials Sets
        this.dialsSets$ = this.store.select(fromStore.getAgencyAnalyticsDialsSets);
        this.selectedDialsSet$ = this.store.select(fromStore.getAgencyAnalyticsSelectedDialsSet);

        // Dials
        this.dials$ = this.store.select(fromStore.getAgencyAnalyticsSelectedDialsSetDials);

        this.dialsSetSubscription$ = this.selectedDialsSet$
            .subscribe((dialsSet: fromModels.DialsSet) => {
                if (dialsSet) {
                    this.store.dispatch(new fromStore.LoadDials(dialsSet));
                }
            });
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        if (this.dialsSetSubscription$) {
            this.dialsSetSubscription$.unsubscribe();
        }
    }

    onclose() {
        this.closeSideNav.emit(true);
    }

    /** Dials Sets **/

    public loadDialsSets(): void {
        this.store.dispatch(new fromStore.LoadDialsSets());
    }

    public addDialsSet(payload: fromModels.DialsSet): void {
        this.store.dispatch(new fromStore.AddDialsSet(payload));
    }

    public cloneDialsSet(payload: fromModels.DialsSet): void {
        this.store.dispatch(new fromStore.CloneDialsSet(payload));
    }

    public updateDialsSet(payload: fromModels.DialsSet): void {
        this.store.dispatch(new fromStore.UpdateDialsSet(payload));
    }

    public deleteDialsSet(payload: fromModels.DialsSet): void {
        this.store.dispatch(new fromStore.DeleteDialsSet(payload));
    }

    public selectDialsSet(payload: fromModels.DialsSet): void {
      this.store.dispatch(new fromStore.SelectDialsSet(payload));
    }

    /** Dials **/

    public onDialChange(payload: fromModels.DialUpdate): void {
        this.editedDial = payload;
    }

    public loadDials(payload: fromModels.DialsSet): void {
        this.store.dispatch(new fromStore.LoadDials(payload));
    }

    public updateDial(): void {
        console.log('saving the new dial', this.editedDial);
        this.store.dispatch(new fromStore.UpdateDial(this.editedDial));
    }

}

