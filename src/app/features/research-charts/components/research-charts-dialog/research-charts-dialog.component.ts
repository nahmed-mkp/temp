import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

import * as fromModels from './../../models/chart.models';

@Component({
    selector: 'app-research-chart-dialog',
    templateUrl: './research-charts-dialog.component.html',
    styleUrls: ['./research-charts-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResearchChartDialogComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<ResearchChartDialogComponent>, 
        @Inject(MAT_DIALOG_DATA) public data: fromModels.IChartPackImage) { }

    ngOnInit(): void { }
}
