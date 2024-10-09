import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-drift-new-params',
    templateUrl: './drift-new-params.component.html',
    styleUrls: ['./drift-new-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriftNewParamsComponent implements OnInit {
    
    constructor() { }

    ngOnInit(): void { }
}
