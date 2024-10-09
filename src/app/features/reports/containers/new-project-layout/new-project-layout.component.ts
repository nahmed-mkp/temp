import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-new-project-layout',
    templateUrl: './new-project-layout.component.html',
    styleUrls: ['./new-project-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewProjectLayoutComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}
