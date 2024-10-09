import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-new-report-layout',
    templateUrl: './new-report-layout.component.html',
    styleUrls: ['./new-report-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewReportLayoutComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}
