import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-factor-exposure-histogram',
    templateUrl: './histogram-viewer.component.html',
    styleUrls: ['./histogram-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistogramViewerComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
