import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import * as fromStore from './../../store';

@Component({
    selector: 'app-timeseries-watchlist-layout',
    templateUrl: './timeseries-watchlist-layout.component.html',
    styleUrls: ['./timeseries-watchlist-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeseriesWatchlistLayoutComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}
