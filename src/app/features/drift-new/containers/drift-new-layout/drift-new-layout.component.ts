import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-drift-new-layout',
    templateUrl: './drift-new-layout.component.html',
    styleUrls: ['./drift-new-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriftNewLayoutComponent implements OnInit {
    
    constructor() { }

    ngOnInit(): void { }
}
