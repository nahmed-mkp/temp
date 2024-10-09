import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-report-layout',
    templateUrl: './report-layout.component.html',
    styleUrls: ['./report-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportLayoutComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}
