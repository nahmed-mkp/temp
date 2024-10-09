
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-live-grid',
    templateUrl: './live-grid.component.html',
    styleUrls: ['./live-grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LiveGridComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}
