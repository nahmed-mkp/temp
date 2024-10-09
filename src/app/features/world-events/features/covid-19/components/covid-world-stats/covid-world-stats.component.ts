import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-covid-world-stats',
    templateUrl: './covid-world-stats.component.html',
    styleUrls: ['./covid-world-stats.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CovidWorldStatsComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}
