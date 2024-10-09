import { Component, OnInit, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-macro-package-data-tooltip',
  templateUrl: './macro-package-data-tooltip.component.html',
  styleUrls: ['./macro-package-data-tooltip.component.scss']
})
export class MacroPackageDataTooltipComponent implements OnInit {

  public min: number;
  public max: number;
  public week: number;
  public spot: number;

  public minPercent: number;
  public maxPercent: number;
  public weekPercent: number;
  public spotPercent: number;
  public key: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<MacroPackageDataTooltipComponent>) { }

  ngOnInit() {
    // console.log('data', this.data);
    const nodeData = this.data.nodeData;
    this.key = this.data.targetKey;
    this.week = nodeData[this.key + 'LevelAtPercentile1W'].toFixed(2);
    this.min = nodeData[this.key + 'LevelAtPercentileMin1M'].toFixed(2);
    this.max = nodeData[this.key + 'LevelAtPercentileMax1M'].toFixed(2);
    this.spot = nodeData['Spot'].toFixed(2);

    this.minPercent = nodeData[this.key + 'PercentileMin1M'].toFixed(2);
    this.maxPercent = nodeData[this.key + 'PercentileMax1M'].toFixed(2);
    this.weekPercent = nodeData[this.key + 'Percentile1W'].toFixed(2);
    this.spotPercent = nodeData[this.key + 'Percentile'].toFixed(2);
  }

  onClose() {
    this.dialogRef.close();
  }

}
