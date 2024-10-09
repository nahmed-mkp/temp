
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-live-grid-layout',
    templateUrl: './live-grid-layout.component.html',
    styleUrls: ['./live-grid-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveGridLayoutComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}
