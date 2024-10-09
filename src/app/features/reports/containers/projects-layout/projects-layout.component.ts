import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-projects-layout',
    templateUrl: './projects-layout.component.html',
    styleUrls: ['./projects-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsLayoutComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
