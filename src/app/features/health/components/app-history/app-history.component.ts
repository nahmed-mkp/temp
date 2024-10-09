import { ChangeDetectionStrategy, Component, Inject, Input, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

import * as fromStore from './../../store';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-app-history',
    templateUrl: './app-history.component.html',
    styleUrls: ['./app-history.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppHistoryComponent implements OnInit {

    public runHistory$: Observable<any[]>;
    public runHistoryLoading$: Observable<boolean>;
    public runHistoryLoaded$: Observable<boolean>;
    public runHistoryError$: Observable<string>;

    constructor(private store: Store<fromStore.HealthStatusState>, public dialogRef: MatDialogRef<AppHistoryComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.runHistory$ = this.store.select(fromStore.getRunHistory);
        this.runHistoryLoading$ = this.store.select(fromStore.getRunHistoryLoading);
        this.runHistoryLoaded$ = this.store.select(fromStore.getRunHistoryLoaded);
        this.runHistoryError$ = this.store.select(fromStore.getRunHistoryError);
        }

    ngOnInit(): void {
        this.store.dispatch(new fromStore.ViewRunHistory({ appName: this.data.appName, machineName: this.data.machineName }));
    }

    close() {
        this.dialogRef.close(true);
    }

}
