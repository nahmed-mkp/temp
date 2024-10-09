import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { ColumnApi, GridApi, GridOptions, RowSelectedEvent } from 'ag-grid-community';
import moment from 'moment';
import * as fromRootStore from '../../../../store';
import * as fromModels from '../../models';
import * as fromStore from '../../store';

@Component({
    selector: 'app-timeseries-drawdown-grid-viewer-component',
    templateUrl: './timeseries-drawdown-grid-viewer.component.html',
    styleUrls: ['./timeseries-drawdown-grid-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeseriesDrawdownGridViewerComponent implements OnInit, OnChanges {

    @Input() drawdownData: {drawdown: any[], data: any[]};
    @Input() drawdownDataLoading: boolean;
    @Input() selectedDrawdownDataTs: string;
    @Input() currTab: fromModels.ITab;
    @Input() selectedPoint: {date: string; value: number};

    public timeseriesArr: fromModels.ITimeseries[] = [];    
    public extraOption = {sizeColumnsToFit: true};
    public rowData = [];

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public customGridOption: GridOptions = {

    };


    constructor(private rootStore: Store<fromRootStore.RootState>, private store: Store<fromStore.TimeseriesState>) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnChanges(changes: SimpleChanges): void {

        if(changes && changes.currTab){
            this.timeseriesArr = this.currTab.portfolio.timeseries
        }

        if(changes && changes.drawdownData && changes.drawdownData.currentValue && this.gridApi){
            if(this.selectedDrawdownDataTs !== null){
                this.refreshGrid();
            } 
        }

        if(changes && changes.selectedDrawdownDataTs && changes.selectedDrawdownDataTs.currentValue && this.gridApi){
            if(this.drawdownData !== null){
                this.refreshGrid();
            }
        }

        if(changes && changes.selectedPoint && changes.selectedPoint.currentValue) {
            this.searchTimeRange(changes.selectedPoint.currentValue);
        }
    }

    refreshGrid(){
        let tempRowData = [];
        Object.values(this.drawdownData.drawdown).map((arr) => {
            tempRowData = tempRowData.concat(arr)
        })
        this.rowData = tempRowData;
        this.gridApi.setRowData([]);
        this.gridApi.setRowData(this.rowData)
        this.gridApi.refreshCells();
    }

    searchTimeRange(point) {
        let targetTime = new Date(point.date);
        let targetNode = [];
        this.gridApi.forEachNode((node, index) => {
            let drawdown_end = new Date(node.data.drawdown_end);
            let drawdown_start = new Date(node.data.drawdown_start);
            if(targetTime >= drawdown_start && targetTime <= drawdown_end) {
                targetNode.push(index);
                node.setSelected(true)
            }
        })
    }

    ngOnInit(){
        this.customGridOption = {
            defaultColDef: {
                suppressMenu: true,
                cellClass: 'right-border-light',
                headerClass: 'ag-header-wrap',
                filter: 'agTextColumnFilter',
                editable: false,
                enableCellChangeFlash: false,
                flex: 1
            },
            floatingFilter: true,
            enableRangeSelection: true,
            rowSelection: 'single',
            onRowClicked: this.onRowSelected.bind(this),
            getRowNodeId: data => data['drawdown_value'],
            columnDefs: [
                { headerName: 'Start Date', field: 'drawdown_start', valueFormatter: params => moment(params.value).format('MM-DD-YYYY'), sort: 'asc'},
                { headerName: 'End Date', field: 'drawdown_end', valueFormatter: params => moment(params.value).format('MM-DD-YYYY')},
                { headerName: 'Start Value', field: 'drawdown_start_level', valueFormatter: params => params.value.toFixed(3)},
                { headerName: 'End Value', field: 'drawdown_end_level', valueFormatter: params => params.value.toFixed(3)},
                { headerName: 'Drawdown', field: 'drawdown_value', valueFormatter: params => params.value.toFixed(3)},
                { headerName: 'Observation Start', field: 'obs_start', valueFormatter: params => moment(params.value).format('MM-DD-YYYY')},
                { headerName: 'Observation End', field: 'obs_end', valueFormatter: params => moment(params.value).format('MM-DD-YYYY')},
            ],
            frameworkComponents: {}
        };
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    onRowSelected(event: RowSelectedEvent) {
        let data = event.node.data;
        this.store.dispatch(fromStore.selectDrawdownTimeseriesRow(data))

    }
}


