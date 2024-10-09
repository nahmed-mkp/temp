import { Component, OnInit, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromModels from './../../models';
import * as fromStore from './../../store';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-timeseries-exporter-editior-layout',
  templateUrl: './timeseries-exporter-editior-layout.component.html',
  styleUrls: ['./timeseries-exporter-editior-layout.component.scss']
})
export class TimeseriesExporterEditiorLayoutComponent implements OnInit {

  public selectedMonitor$: Observable<fromModels.IMonitor>;
  public existedMonitorNames$: Observable<string[]>;
  public mode: 'edit' | 'create' = 'edit';

  public monitors$: Observable<fromModels.IMonitor[]>;
  public monitorsLoading$: Observable<boolean>;
  public monitorsLoaded$: Observable<boolean>;
  public monitorsError$: Observable<string>;

  private subscription: Subscription;

  // constructor(private store: Store<fromStore.TimeseriesExporterState>,
  //   public dialogRef: MatDialogRef<TimeseriesExporterEditiorLayoutComponent>,
  //   @Inject(MAT_DIALOG_DATA) public data: any) {
  //     this.mode = data && data.mode;
  // }

  constructor(private store: Store<fromStore.TimeseriesExporterState>) {}

  ngOnInit() {
    if (this.mode === 'edit') {
      this.selectedMonitor$ = this.store.select(fromStore.getSelectedMonitorEntity);
    }
    this.existedMonitorNames$ = this.store.select(fromStore.getMonitorNames);

    this.monitors$ = this.store.select(fromStore.getMonitors);
    this.monitorsLoading$ = this.store.select(fromStore.getMonitorsLoadingStatus);
    this.monitorsLoaded$ = this.store.select(fromStore.getMonitorsLoadedStatus);
    this.monitorsError$ = this.store.select(fromStore.getMonitorsErrorStatus);
  }

  onUpdateMonitor(event: any) {
    console.log('update monitor', event);
  }

  onApplyChanges(event) {
    console.log('update package', event);
    this.store.dispatch(new fromStore.SaveMonitor(event));
    // this.dialogRef.close();
  }

  onDeleteList(event: string) {
    this.store.dispatch(new fromStore.DeleteMonitorList(event));
    // this.dialogRef.close();
  }

  onCancel(event) {
    // this.dialogRef.close();
  }

  selectMonitor(monitor: string): void {
    this.store.dispatch(new fromStore.SelectMonitor(monitor));
  }

  onRunTempList(payload: any): void {
    // this.store.dispatch(new fromStore)
    this.store.dispatch(new fromStore.LoadTimeseriesWithMdidList(payload));
  }
}
