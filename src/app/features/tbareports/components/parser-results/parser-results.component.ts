import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as fromModels from '../../models';

@Component({
    selector: 'app-tbareports-parser-results',
    templateUrl: './parser-results.component.html'
})
export class ParserResultsComponent implements OnInit {

    @Input() results: fromModels.ParserResult;

    constructor() { }

    ngOnInit() { }

    public getResults(input: string): any[] {
        return JSON.parse(input);
    }
}
