import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-timeseries-watchlist',
    templateUrl: './timeseries-watchlist.component.html',
    styleUrls: ['./timeseries-watchlist.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeseriesWatchlistComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}
