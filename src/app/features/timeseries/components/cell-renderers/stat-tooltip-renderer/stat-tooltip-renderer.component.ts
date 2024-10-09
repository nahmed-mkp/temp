import { Component, OnInit, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-timeseries-stat-tooltip',
  templateUrl: './stat-tooltip-renderer.component.html',
  styleUrls: ['./stat-tooltip-renderer.component.scss']
})
export class TimeseriesStatTooltipRendererComponent implements OnInit {

  public min: number;
  public max: number;
  public mean: number;
  public spot: number;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<TimeseriesStatTooltipRendererComponent>) { }

  ngOnInit() {
    this.mean = this.data.mean;
    this.min = this.data.min;
    this.max = this.data.max;
    this.spot = this.data.spot
  }

  onClose() {
    this.dialogRef.close();
  }

}
