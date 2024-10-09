import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HighchartsFactory } from '../../../factories';

import * as Highcharts from 'highcharts';

// Radialize the colors
Highcharts.setOptions({
    colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {
                cx: 0.5,
                cy: 0.3,
                r: 0.7
            },
            stops: [
                [0, color],
                [1, Highcharts.color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    })
});


@Component({
    selector: 'app-piechart',
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
export class AppPieChartComponent implements OnInit {

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
