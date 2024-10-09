import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';

export interface Tile {
    cols: number;
    rows: number;
    text: string;
    component: string;
}

@Component({
    selector: 'app-tracking-history',
    templateUrl: './tracking-history.component.html',
    styleUrls: ['./tracking-history.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackingHistoryComponent implements OnInit {

    tiles: Tile[] = [
        { text: 'One', cols: 1, rows: 1, component: 'list' },
        { text: 'Two', cols: 7, rows: 1, component: 'chart' }
    ];

    typesOfCharts: string[] = [
        'Daily Closes',
        'OHLC',
        'Median levels (hourly)'
    ];

    public defaultSelected: 'Daily Closes';

    constructor() {
    }

    ngOnInit() {
    }
}
