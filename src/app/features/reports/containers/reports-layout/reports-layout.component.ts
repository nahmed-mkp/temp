import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-reports-layout',
    templateUrl: './reports-layout.component.html',
    styleUrls: ['./reports-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsLayoutComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}
