import { Component, OnInit, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-vol-report-timeseries-dialog-layout',
  templateUrl: './vol-report-timeseries-dialog-layout.component.html',
  styleUrls: ['./vol-report-timeseries-dialog-layout.component.scss']
})
export class VolReportTimeseriesDialogLayoutComponent implements OnInit {

  public plotData: any[];

  constructor(@Inject(MAT_DIALOG_DATA) public data,
              public dialogRef: MatDialogRef<VolReportTimeseriesDialogLayoutComponent>) { }

  ngOnInit() {
    this.plotData = this.getData();
  }

  onClose() {
    this.dialogRef.close();
  }

  getData() {
    let arr = [];

    for (let i = 0; i < 1000; i = i + 1) {
        arr.push([
            i,
            Math.random()*1000
        ]);
    }
    return arr;
  }

}
