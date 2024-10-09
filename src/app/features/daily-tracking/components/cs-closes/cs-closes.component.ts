import { Component, OnInit, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges } from '@angular/core';
import { DailyTrackingUtilityService } from '../../services';
import { GridApi, ColumnApi, GridOptions } from 'ag-grid-community';

@Component({
    selector: 'app-tracking-closes',
    templateUrl: './cs-closes.component.html',
    styleUrls: ['./cs-closes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CSClosesComponent implements OnInit, OnChanges {

    @Input() data: any[];
    @Input() loading: boolean;

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public extraOption = { sizeColumnsToFit: true };

    public customGridOption: GridOptions = {
        defaultColDef: {
            cellStyle: params => {
                return typeof params.value === 'number' ? { 'justify-content': 'flex-end' } : {};
            },
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false,
            cellRenderer: 'agAnimateShowChangeCellRenderer'
        },

        groupRowRendererParams: {
            suppressCount: true
        },

        getRowNodeId: data => data.CS_OTRName,
        getRowStyle: params => {
            if (params.node.leafGroup) {
                return {};
            }
            return { background: (params.node.rowIndex % 2 === 1) ? '#ffff99' : '#ccffff' };
        },
        deltaRowDataMode: true,

        columnDefs: [
            { headerName: 'Date', field: 'CS_AsOfDate', cellStyle: {'font-weight': 'bold'} },
            {
                headerName: 'OTR Ticker',
                width: 250,
                field: 'CS_OTRName',
                cellStyle: { 'font-weight': 'bold' }
            },
            {
                headerName: 'Price',
                field: 'CS_Price',
                cellStyle: { 'font-weight': 'bold' }
            },
            {
                headerName: 'Price/Ticks',
                field: 'CS_Price_ticks',
                cellStyle: { 'justify-content': 'flex-end', 'font-weight': 'bold' }
            },
            {
                headerName: 'Yield',
                field: 'CS_Yield',
                cellStyle: { 'font-weight': 'bold' }
            }
        ],
        groupUseEntireRow: true,

        headerHeight: this.utilityService.isCompactMode() ? 16 : 24,
        rowClass: this.utilityService.isCompactMode() ? 'ultra-small-row' : 'small-row',
        rowHeight: this.utilityService.isCompactMode() ? 12 : 16
    };

    constructor(private utilityService: DailyTrackingUtilityService) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.data && changes.data.currentValue && this.gridApi) {
            // if(changes.data.previousValue && changes.data.previousValue.length > 0) {
            //     const oldData = this.getRowData();
            //     const [updateRows, removeRows, addRows] = this.utilityService.gridValueUpdater(this.utilityService.deepCopy(changes.data.currentValue), oldData);
            //     this.gridApi.updateRowData({update: updateRows, remove: removeRows, add: addRows});
            //     //console.log('nodeImpacted raw', nodeImpacted)
            // } else {
            //   // console.log('complete reset data raw' )
            //   this.gridApi.setRowData(this.utilityService.deepCopy(this.data));
            // }
            this.gridApi.setRowData(changes.data.currentValue);
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        if (this.data.length > 0) { this.gridApi.setRowData(this.data); }

    }

    // Utility --------------------------------------------------------------------------

    getRowData() {
        const rowData = [];
        this.gridApi.forEachNode(function (node) {
            rowData.push(node.data);
        });
        return rowData;
    }
}
