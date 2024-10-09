import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-timeseries-watchlist-editor',
    templateUrl: './timeseries-watchlist-editor.component.html',
    styleUrls: ['./timeseries-watchlist-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeseriesWatchListEditorComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}
