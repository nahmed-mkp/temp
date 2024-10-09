import { Component, OnInit, Input } from '@angular/core';

import * as fromModels from '../../models';

@Component({
    selector: 'app-tbareports-missing-dates',
    templateUrl: './parser-missing-dates.component.html',
    styleUrls: ['./parser-missing-dates.scss']
})
export class MissingReportsComponent implements OnInit {

    @Input() missingDates: fromModels.MissingDate[];

    constructor() { }

    ngOnInit() { }
}
