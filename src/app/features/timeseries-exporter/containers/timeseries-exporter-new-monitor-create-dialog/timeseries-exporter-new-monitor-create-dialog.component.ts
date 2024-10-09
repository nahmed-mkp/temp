import { Component, OnInit, HostBinding, Inject, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromStore from './../../store';
import * as fromModels from '../../models';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-timeseries-exporter-new-monitor-create-dialog',
  templateUrl: './timeseries-exporter-new-monitor-create-dialog.component.html',
  styleUrls: ['./timeseries-exporter-new-monitor-create-dialog.component.scss']
})
export class TimeseriesExporterNewMonitorCreateDialogComponent implements OnInit, OnDestroy {

  @HostBinding('class') classes = 'vertical-flex-full-height';

  public newMonitorName: string;
  public duplicationMonitorNameWarning: boolean;

  private existedMonitorListname: string[];
  private subscription: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<TimeseriesExporterNewMonitorCreateDialogComponent>,
    private store: Store<fromStore.TimeseriesExporterState>,
  ) { }

  ngOnInit() {
    this.newMonitorName = this.data;
    this.subscription = this.store.select(fromStore.getMonitorNames).subscribe(nameList => {
      this.existedMonitorListname = nameList;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public onCloseClick() {
    this.dialogRef.close();
  }

  public onConfirm() {
    this.dialogRef.close(this.newMonitorName);
  }



  // Utiltiy -----------------------------------------------------------

  public checkIfNameValid() {
    if (this.existedMonitorListname.includes(this.newMonitorName)) {
      this.duplicationMonitorNameWarning = true;
    } else {
      this.duplicationMonitorNameWarning = false;
    }
  }

}
