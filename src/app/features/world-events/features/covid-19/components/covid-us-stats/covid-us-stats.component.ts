import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-covid-us-stats',
    templateUrl: './covid-us-stats.component.html',
    styleUrls: ['./covid-us-stats.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CovidUSStatsComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}
