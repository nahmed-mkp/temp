import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as fromModels from '../../models';

@Component({
    selector: 'app-tbareports-timeseries-cacher',
    templateUrl: './timeseries-cacher.component.html'
})
export class TimeseriesCacherComponent implements OnInit {

    @Output() refreshCache: EventEmitter<string> = new EventEmitter<string>();

    constructor() { }

    ngOnInit() { }

    cacheRefresh(e: any): void {
        this.refreshCache.emit('OAS');
        this.refreshCache.emit('TSYOAS');
        e.preventDefault();
    }

}
