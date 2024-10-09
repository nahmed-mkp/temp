import { EventEmitter, Input, ChangeDetectionStrategy, Component, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import * as fromModels from '../../models/timeseries-exporter.models';

@Component({
    selector: 'app-timeseries-exporter-monitor',
    templateUrl: './timeseries-exporter-monitor.component.html',
    styleUrls: ['./timeseries-exporter-monitor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeseriesMonitorComponent implements OnInit {

    @Input() selectedMonitor: fromModels.IMonitor;
    @Output()
    monitorSelected: EventEmitter<fromModels.IMonitor> = new EventEmitter<fromModels.IMonitor>();

    constructor() {
    }

    ngOnInit(): void {
    }
}
