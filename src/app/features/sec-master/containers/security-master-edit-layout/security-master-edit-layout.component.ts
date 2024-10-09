import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sec-master-edit-layout',
    templateUrl: './security-master-edit-layout.component.html',
    styleUrls: ['./security-master-edit-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityMasterEditLayoutComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}
