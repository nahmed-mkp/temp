import { Component, OnInit, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../store';
import * as fromModels from '../../models';


@Component({
  selector: 'app-jbot-timeseries-dialog-layout',
  templateUrl: './jbot-timeseries-dialog-layout.component.html',
  styleUrls: ['./jbot-timeseries-dialog-layout.component.scss']
})
export class JbotTimeseriesDialogLayoutComponent implements OnInit {

  public displayPropety: string;
  public activeJbotTimeseries$: Observable<fromModels.JbotTimeseriesResponse>;
  public loadingStatus$: Observable<boolean>;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<JbotTimeseriesDialogLayoutComponent>,
              private store: Store<fromStore.JbotState>) { }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadJbotTimeseries({
      category: this.data.category,
      seriesName: this.data.seriesName
    }));
    // this.store.dispatch(new fromStore.SetActiveSeries(this.data.seriesName));
    this.loadingStatus$ = this.store.select(fromStore.getJbotTimeseriesLoadingStatus);
    this.displayPropety = this.data.column;
    this.activeJbotTimeseries$ = this.store.select(fromStore.getActiveJbotTimeseries, {seriesName: this.data.seriesName});
  }

  onClose() {
    this.dialogRef.close();
  }
}
