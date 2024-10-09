import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-timeseries-viewer-layout',
    templateUrl: './timeseries-viewer-layout.component.html',
    styleUrls: ['./timeseries-viewer-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeseriesViewerLayoutComponent implements OnInit {
    
    constructor() { }

    ngOnInit(): void { }
}
