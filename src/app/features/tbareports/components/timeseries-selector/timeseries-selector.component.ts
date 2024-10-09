import { Component, OnInit, Output, Input, EventEmitter, OnChanges ,ChangeDetectionStrategy } from '@angular/core';

import * as fromModels from '../../models';

@Component({
    selector: 'app-tbareports-timeseries-selector',
    templateUrl: './timeseries-selector.component.html',
    styleUrls: ['./timeseries-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeseriesSelectorComponent implements OnInit {

    @Input() mode: string;

    @Input() series: fromModels.OASTimeseries[];
    @Input() selectedSeries: fromModels.OASTimeseries;
    @Input() metricTypes: fromModels.MetricType[];
    @Input() selectedMetricType: string;

    public selectedPlotType = 'OAS';

    @Output() onSeriesSelected: EventEmitter<fromModels.OASTimeseries> = new EventEmitter<fromModels.OASTimeseries>();
    @Output() onPlotTypeChanged: EventEmitter<string> = new EventEmitter<string>();
    @Output() onMetricTypeChanged: EventEmitter<string> = new EventEmitter<string>();
    // @Output() trackerModeChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() modeChanged: EventEmitter<string> = new EventEmitter<string>();
    // public selectedMode = 'regularTypeMode';

    public plotTypes = ['OAS', 'TSYOAS'];
    // public trackerTypeMode = false;
    // public regularTypeMode = false;

    constructor() { 
    }

    ngOnInit() {}

    get plotType(): string {
        return this.selectedPlotType;
    }

    changeSeries(e: any): void {
        // this.onSeriesSelected.emit(e.value);
        this.onSeriesSelected.emit(e);
    }

    changePlotType(e: string): void {
        // this.onPlotTypeChanged.emit(e.value === 'OAS' ? fromModels.PlotType.OAS : fromModels.PlotType.TSYOAS);
        // if(this.trackerTypeMode) this.changeMetricType();
        if(this.mode === 'trackerTypeMode' || this.mode === 'dialedTypeMode' || this.mode=== 'v99TypeMode') this.changeMetricType();
        this.onPlotTypeChanged.emit(e);
    }

    changeMetricType(): void {
        this.onMetricTypeChanged.emit(this.selectedMetricType);
    }

    // changeTrackerTypeMode(): void {
    //     this.trackerTypeMode = this.trackerTypeMode ? false : true;
    //     this.regularTypeMode = !this.trackerTypeMode;

    //     this.trackerModeChanged.emit(this.trackerTypeMode);
    //     if(this.trackerTypeMode === false) {
    //         // this.onMetricTypeChanged.emit(undefined);
    //         this.onPlotTypeChanged.emit(this.selectedPlotType);
    //     } else {
    //         if(this.selectedMetricType) this.onPlotTypeChanged.emit(this.selectedMetricType);
    //     }
    // }

    changeMode(): void {
        this.modeChanged.emit(this.mode);
        if(this.mode === 'regularTypeMode') this.onPlotTypeChanged.emit(this.selectedPlotType);
        if(this.mode === 'trackerTypeMode' || this.mode === 'dialedTypeMode' || this.mode=== 'v99TypeMode') {
            this.onPlotTypeChanged.emit(this.selectedMetricType);
        }
    } 
}
