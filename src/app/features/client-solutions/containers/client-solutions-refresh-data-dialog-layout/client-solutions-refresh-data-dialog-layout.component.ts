import { Component, OnInit, HostBinding, Inject, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

import * as fromStore from './../../store';
import * as fromModels from '../../models';




@Component({
  selector: 'app-client-solutions-refresh-data-dialog-layout',
  templateUrl: './client-solutions-refresh-data-dialog-layout.component.html',
  styleUrls: ['./client-solutions-refresh-data-dialog-layout.component.scss']
})
export class ClientSolutionsRefreshDataDialogLayoutComponent implements OnInit {

  @HostBinding('class') classes = 'vertical-flex-full-height';

  public refreshDataReqParameter: fromModels.RefreshDataReqParameter = {
    run_return_stats: true,
    mode: 'month_end',
    run_net_attribution: true,
    run_non_linear_risks: true,
    download_benchmark_returns: true,
    grouping: '',
    run_leverage: true,
    as_of_date: new Date(),
    run_linear_risks: true,
  };

  constructor(
    private store: Store<fromStore.State>,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ClientSolutionsRefreshDataDialogLayoutComponent>,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {}

  public onCloseClick() {
    this.dialogRef.close();
  }

  public onRefreshData() {
    const payload = Object.assign({}, this.refreshDataReqParameter);
    payload.as_of_date = this.refreshDataReqParameter.as_of_date.toLocaleDateString();
    this.store.dispatch(new fromStore.RefreshData(payload));
    this.onCloseClick();
    console.log('refresh data', payload);
  }

  public onModeChange() {
    if (this.refreshDataReqParameter.mode === 'month_end') {
      this.refreshDataReqParameter.as_of_date = new Date();
      this.ref.markForCheck();
    }
  }

}
