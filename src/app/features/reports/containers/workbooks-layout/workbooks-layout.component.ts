import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-workbooks-layout',
    templateUrl: './workbooks-layout.component.html',
    styleUrls: ['./workbooks-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkbooksLayoutComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}
