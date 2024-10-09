import { Component, OnInit, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../store';
import * as fromModels from '../../models';

@Component({
  selector: 'app-macro-package-timeseries-dialog-layout',
  templateUrl: './macro-package-timeseries-dialog-layout.component.html',
  styleUrls: ['./macro-package-timeseries-dialog-layout.component.scss']
})
export class MacroPackageTimeseriesDialogLayoutComponent implements OnInit {

  public activeTimeseries$: Observable<any[]>;
  public loadingStatus$: Observable<boolean>;

  public targetAssetClass: string;
  public displayPropety: string;
  public sector: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<MacroPackageTimeseriesDialogLayoutComponent>,
              private store: Store<fromStore.MacroAnalyticsState>) {}

  ngOnInit() {
    this.displayPropety = this.data.displayPropety;
    this.targetAssetClass = this.data.targetAssetClass;
    this.sector = this.data.sector;

    if (this.data.type === 'equity') {
      if (this.data.sector) {
        this.loadingStatus$ = this.store.select(fromStore.getSectorTimeseriesLoadingStatus);
        this.activeTimeseries$ = this.store.select(fromStore.getEquitySectorSelectedTimeseries);
      } else {
        this.loadingStatus$ = this.store.select(fromStore.getIndexTimeseriesLoadingStatus);
        this.activeTimeseries$ = this.store.select(fromStore.getEquitySelectedTimeseries, {mode: this.data.mode});
      }
    } else if (this.data.type === 'credit') {
      this.loadingStatus$ = this.store.select(fromStore.getCreditAnalyticsTimeseriesLoadingStatus);
      this.activeTimeseries$ = this.store.select(fromStore.getCreditAnalyticsSelectedDateTimeseries);
    } else if (this.data.type === 'commodities') {
      this.loadingStatus$ = this.store.select(fromStore.getCommoditiesAnalyticsTimeseriesLoadingStatus);
      this.activeTimeseries$ = this.store.select(fromStore.getCommoditiesAnalyticsSelectedDateTimeseries);
    } else if (this.data.type === 'inflation') {
      this.loadingStatus$ = this.store.select(fromStore.getInflationAnalyticsTimeseriesLoadingStatus);
      this.activeTimeseries$ = this.store.select(fromStore.getInflationAnalyticsSelectedDateTimeseries);
    }
  }

  onClose() {
    this.dialogRef.close();
  }

}
