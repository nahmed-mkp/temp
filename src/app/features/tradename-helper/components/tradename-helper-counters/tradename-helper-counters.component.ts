import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';

import * as moment from 'moment';
import { AppCustomGridCellCheckboxComponent } from 'src/app/components';
import { UtilityService } from 'src/app/services';

import * as fromModels from '../../models';

@Component({
    selector: 'app-tradename-helper-counters',
    templateUrl: './tradename-helper-counters.component.html',
    styleUrls: ['./tradename-helper-counters.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradeNameHelperCountersComponent implements OnInit, OnChanges {

    @Input() tradeNameCounters: fromModels.ITradeNameCounter[];
    @Input() tradeNameCountersLoading: boolean;
    @Input() tradeNameCountersLoaded: boolean;
    @Input() tradeNameCountersError: string;

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public size = 25;
    public extraOption = { sizeColumnsToFit: true };
    public customGridOption: GridOptions = {

        defaultColDef: {
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false,
            editable: false,
            flex: 1
        },
        floatingFilter: true,
        getRowNodeId: data => data.CRDPrefix,
        columnDefs: [
            {
                colId: 'CRDPrefix',
                headerName: 'CRDPrefix',
                maxWidth: 100,
                field: 'CRDPrefix',
                filter: true,
                sort: 'asc',
                sortedAt: 2
            },
            {
                colId: 'TradeID',
                headerName: 'TradeID',
                maxWidth: 200,
                field: 'TradeID',
                filter: true
            },
            {
                colId: 'TradeName',
                headerName: 'TradeName',
                width: 350,
                field: 'TradeName',
                hide: false
            },
            {
                colId: 'HasTaxLots',
                headerName: 'Has Positions',
                width: 100,
                field: 'HasTaxLots',
                editable: false,
                cellRenderer: 'AppCustomGridCellCheckboxComponent',
                cellRendererParams: { key: 'HasTaxLots', editable: false },
                hide: false,
                cellStyle: { 'justify-content': 'center' },
                sort: 'desc',
                sortedAt: 1
            }
        ],
        frameworkComponents: {
            AppCustomGridCellCheckboxComponent: AppCustomGridCellCheckboxComponent
        },
    };

    constructor(private utilities: UtilityService) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnChanges(changes: SimpleChanges): void {
        // if (changes.tradeNames && changes.tradeNames.currentValue && changes.tradeNames.currentValue.length > 0) {
        //     const groupedData = this.getGroupedData(changes.tradeNames.currentValue);
        //     this.gridApi.setRowData(groupedData);
        // }
    }

    ngOnInit(): void { }


    onSizeChange(size: number) {
        this.gridApi.refreshCells({ columns: ['size'] });
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
    }
}
