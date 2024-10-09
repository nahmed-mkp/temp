import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-new-workbook-layout',
    templateUrl: './new-workbook-layout.component.html',
    styleUrls: ['./new-workbook-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewWorkbookLayoutComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}
