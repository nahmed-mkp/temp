import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-covid-mobility-index',
    templateUrl: './covid-mobility-index.component.html',
    styleUrls: ['./covid-mobility-index.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CovidMobilityIndexComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}
