import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HighchartsFactory } from '../../../factories';

import * as Highcharts from 'highcharts';

@Component({
    selector: 'app-barchart',
    template: `
        <highcharts-chart
            style="width:100%;display:block;"
            [Highcharts]="Highcharts"
            [callbackFunction]="callbackFn"
            [update]="updateFlag"
            [oneToOne]="oneToOne"
            (updateChange)=changeUpdateFlag($event)
            [options]="options"></highcharts-chart>
        `
})
export class AppBarChartComponent implements OnInit {

    @Input() options: any;
    @Input() updateFlag = false;
    @Input() oneToOne = false;
    @Input() callbackFn: any;

    public Highcharts: any;

    @Output() chartUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(public chartFactory: HighchartsFactory) {
        this.Highcharts = this.chartFactory.Highcharts;
    }

    ngOnInit() {
    }

    changeUpdateFlag(val: boolean): void {
        this.chartUpdated.emit(val);
    }

    clear(): void {
    }
}
