import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { GridOptions, GridApi, ColumnApi, ColDef } from 'ag-grid-community';

import * as fromModels from '../../models';

@Component({
    selector: 'app-jbot-heatmap',
    templateUrl: './jbot-heatmap.component.html',
    styleUrls: ['./jbot-heatmap.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JbotHeatmapComponent implements OnInit {

    @Input() plotData: fromModels.JbotSummaryGridData[];
    @Input() sortBy: string;
    @Input() loadingStatus: boolean;

    @Output() onSelectItem = new EventEmitter<{instrument: string; signal: string}>();

    constructor() {}

    ngOnInit() {
    }

    public chunkify(arr: fromModels.JbotSummaryGridData[], size: number) {
        const result = [];
        if (this.sortBy === 'Instrument') {
            arr.sort(this.instrumentComparer);
        } else if (this.sortBy === 'JBot') {
            arr.sort(this.jbotSignalComparer);
        } else if (this.sortBy === 'JBotTech') {
            arr.sort(this.jbotTechSignalComparer);
        } else if (this.sortBy === 'JDataMonitor') {
            arr.sort(this.jDataMonitorSignalComparer);
        }
        for (let i = 0, j = arr.length; i < j; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    }

    public instrumentComparer(a: fromModels.JbotSummaryGridData, b: fromModels.JbotSummaryGridData): number {
        const instrumentA = a.Instrument.toUpperCase();
        const instrumentB = b.Instrument.toUpperCase();
        if (instrumentA < instrumentB) {
            return -1;
        }
        if (instrumentA > instrumentB) {
            return 1;
        }
        return 0;
    }

    public jbotSignalComparer(a: fromModels.JbotSummaryGridData, b: fromModels.JbotSummaryGridData): number {
        const jbotSignalA = a.JBotSignal.toUpperCase();
        const jbotSignalB = b.JBotSignal.toUpperCase();

        const instrumentA = a.Instrument.toUpperCase();
        const instrumentB = b.Instrument.toUpperCase();

        const jbotSignalNumA = jbotSignalA === 'UP' ? 1 :
            ((jbotSignalA === 'NEUTRAL' || jbotSignalA === 'NO SIGNAL') ? 2 : 3);

        const jbotSignalNumB = jbotSignalB === 'UP' ? 1 :
            ((jbotSignalB === 'NEUTRAL' || jbotSignalB === 'NO SIGNAL') ? 2 : 3);

        if (jbotSignalNumA === jbotSignalNumB) {
            if (instrumentA < instrumentB) {
                return -1;
            }
            if (instrumentA > instrumentB) {
                return 1;
            }
            return 0;
        } else {
            if (jbotSignalNumA > jbotSignalNumB) {
                return 1;
            } return -1;
        }
    }

    public jbotTechSignalComparer(a: fromModels.JbotSummaryGridData, b: fromModels.JbotSummaryGridData): number {
        const jbotTechSignalA = a.JBotTechSignal.toUpperCase();
        const jbotTechSignalB = b.JBotTechSignal.toUpperCase();

        const instrumentA = a.Instrument.toUpperCase();
        const instrumentB = b.Instrument.toUpperCase();

        const jbotTechSignalNumA = jbotTechSignalA === 'UP' ? 1 :
            ((jbotTechSignalA === 'NEUTRAL' || jbotTechSignalA === 'NOSIGNAL') ? 2 : 3);

        const jbotTechSignalNumB = jbotTechSignalB === 'UP' ? 1 :
            ((jbotTechSignalB === 'NEUTRAL' || jbotTechSignalB === 'NOSIGNAL') ? 2 : 3);

        if (jbotTechSignalNumA === jbotTechSignalNumB) {
            if (instrumentA < instrumentB) {
                return -1;
            }
            if (instrumentA > instrumentB) {
                return 1;
            }
            return 0;
        } else {
            if (jbotTechSignalNumA > jbotTechSignalNumB) {
                return 1;
            } return -1;
        }
    }

    public jDataMonitorSignalComparer(a: fromModels.JbotSummaryGridData, b: fromModels.JbotSummaryGridData): number {
        const jDataMonitorSignalA = a.JDataMonitorSignal.toUpperCase();
        const jDataMonitorSignalB = b.JDataMonitorSignal.toUpperCase();

        const instrumentA = a.Instrument.toUpperCase();
        const instrumentB = b.Instrument.toUpperCase();

        const jDataMonitorSignalNumA = jDataMonitorSignalA === 'UP' ? 1 :
            ((jDataMonitorSignalA === 'NEUTRAL' || jDataMonitorSignalA === 'NOSIGNAL') ? 2 : 3);

        const jDataMonitorSignalNumB = jDataMonitorSignalB === 'UP' ? 1 :
            ((jDataMonitorSignalB === 'NEUTRAL' || jDataMonitorSignalB === 'NOSIGNAL') ? 2 : 3);

        if (jDataMonitorSignalNumA === jDataMonitorSignalNumB) {
            if (instrumentA < instrumentB) {
                return -1;
            }
            if (instrumentA > instrumentB) {
                return 1;
            }
            return 0;
        } else {
            if (jDataMonitorSignalNumA > jDataMonitorSignalNumB) {
                return 1;
            } return -1;
        }
    }

    public getClass(a: fromModels.JbotSummaryGridData): string {
        if (this.sortBy === 'JBot') {
            const jbotSignal = a.JBotSignal.toUpperCase();
            if (jbotSignal === 'UP') {
                return 'cell cell-green';
            } else if (jbotSignal === 'DOWN') {
                return 'cell cell-red';
            } else if (jbotSignal === 'NEUTRAL' || jbotSignal === 'NOSIGNAL') {
                return 'cell cell-gray';
            }
        } else if (this.sortBy === 'JBotTech') {
            const jbotTechSignal = a.JBotTechSignal.toUpperCase();
            if (jbotTechSignal === 'UP') {
                return 'cell cell-green';
            } else if (jbotTechSignal === 'DOWN') {
                return 'cell cell-red';
            } else if (jbotTechSignal === 'NEUTRAL' || jbotTechSignal === 'NOSIGNAL') {
                return 'cell cell-gray';
            }
        } else if (this.sortBy === 'JDataMonitor') {
            const jDataMonitorSignal = a.JDataMonitorSignal.toUpperCase();
            if (jDataMonitorSignal === 'UP') {
                return 'cell cell-green';
            } else if (jDataMonitorSignal === 'DOWN') {
                return 'cell cell-red';
            } else if (jDataMonitorSignal === 'NEUTRAL' || jDataMonitorSignal === 'NOSIGNAL') {
                return 'cell cell-gray';
            }
        }
        return 'cell';
    }

    public navigateTo(instrument: string, signal: string) {
        this.onSelectItem.emit({instrument, signal});
    }
}
