import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { GridApi, ColumnApi, GridOptions, ValueSetterParams } from 'ag-grid-community';
import { RateCardCellRendererComponent } from '../rate-card-cell-renderer/rate-card-cell-renderer.component';

import * as fromStore from '../../store';
import * as fromModels from '../../models';
import moment from 'moment';

@Component({
    selector: 'app-rate-card-viewer',
    templateUrl: './rate-card-viewer.component.html',
    styleUrls: ['./rate-card-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RateCardViewerComponent implements OnChanges {

    @Input() data: fromModels.IRateCard[];
    @Input() dataLoading: boolean;
    @Input() selectedCurrencies: string[];
    @Input() selectedSecTypes: string[];

    @Output() requestRateTimeseriesData: EventEmitter<fromModels.ITimeseriesRequest> = new EventEmitter<fromModels.ITimeseriesRequest>();

    private filteredData = [];
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public extraOption = { sizeColumnsToFit: true };
    public customGridOption: GridOptions = {
        defaultColDef: {
            suppressMenu: true,
            cellClass: 'right-border-light',
            headerClass: 'ag-header-wrap',
            filter: 'agTextColumnFilter',
            editable: false,
            enableCellChangeFlash: false,
            flex: 1
        },
        frameworkComponents: {
            'RateCardCellRendererComponent': RateCardCellRendererComponent
          },
        onRowClicked: (event) => {
            this.showRateHistory(event)
        },
        context: this,
        floatingFilter: true,
        rowHeight: 16,
        rowClass:'small-row',
        rowSelection: 'single',
        columnDefs: [

            {
                headerName: 'As Of Date',
                field: 'AsOfDate',
                // hide: true
            }, ,
            {
                headerName: 'Currency',
                field: 'Currency',
                hide: true
            },
            {
                headerName: 'SID',
                field: 'SID',
                hide: true,
            },
            {
                headerName: 'Sec Name',
                field: 'SecurityName'
            },
            {
                headerName: 'Sec Type',
                field: 'SecurityType',
                hide: true
            },
            {
                headerName: 'Alpha Port',
                field: 'Alpha Port',
                editable: false,
                cellClass: ['right-border-light'],
                cellStyle: { 'justify-content': 'flex-end' },
                valueGetter: params => {
                    let value = params.data[params.colDef.field];
                    let override = params.data[params.colDef.field + '_override'];
                    return override || value;
                },
                valueFormatter: params => {
                    return params.value ? params.value.toFixed(3) : '';
                },
                cellRenderer: 'RateCardCellRendererComponent',
                cellRendererParams: (params) => {
                    return {
                      'val': params.data[params.colDef.field],
                      'override': params.data[params.colDef.field + '_override'],
                      'position': params.data[params.colDef.field + '_position'],
                      'isPercent': true,
                    }
                },
            },
            {
                headerName: 'BluePearl',
                field: 'BluePearl',
                editable: false,
                cellClass: ['right-border-light'],
                cellStyle: { 'justify-content': 'flex-end' },
                valueGetter: params => {
                    let value = params.data[params.colDef.field];
                    let override = params.data[params.colDef.field + '_override'];
                    return override || value;
                },
                valueFormatter: params => {
                    return params.value ? params.value.toFixed(3) : '';
                },
                cellRenderer: 'RateCardCellRendererComponent',
                cellRendererParams: (params) => {
                    return {
                      'val': params.data[params.colDef.field],
                      'override': params.data[params.colDef.field + '_override'],
                      'position': params.data[params.colDef.field + '_position'],
                      'isPercent': true,
                    }
                },
            },
            {
                headerName: 'Enhanced Opp',
                field: 'Enhanced Opportunity Master Fund',
                editable: false,
                cellClass: ['right-border-light'],
                cellStyle: { 'justify-content': 'flex-end' },
                valueGetter: params => {
                    let value = params.data[params.colDef.field];
                    let override = params.data[params.colDef.field + '_override'];
                    return override || value;
                },
                valueFormatter: params => {
                    return params.value ? params.value.toFixed(3) : '';
                },
                cellRenderer: 'RateCardCellRendererComponent',
                cellRendererParams: (params) => {
                    return {
                      'val': params.data[params.colDef.field],
                      'override': params.data[params.colDef.field + '_override'],
                      'position': params.data[params.colDef.field + '_position'],
                      'isPercent': true,
                    }
                },
            },
            {
                headerName: 'GMMK',
                field: 'GMMK',
                editable: false,
                cellClass: ['right-border-light'],
                cellStyle: { 'justify-content': 'flex-end' },
                valueGetter: params => {
                    let value = params.data[params.colDef.field];
                    let override = params.data[params.colDef.field + '_override'];
                    return override || value;
                },
                valueFormatter: params => {
                    return params.value ? params.value.toFixed(3) : '';
                },
                cellRenderer: 'RateCardCellRendererComponent',
                cellRendererParams: (params) => {
                    return {
                      'val': params.data[params.colDef.field],
                      'override': params.data[params.colDef.field + '_override'],
                      'position': params.data[params.colDef.field + '_position'],
                      'isPercent': true,
                    }
                },
            },
            {
                headerName: 'Opp Master',
                field: 'Opportunity Master Fund',
                editable: false,
                cellClass: ['right-border-light'],
                cellStyle: { 'justify-content': 'flex-end' },
                valueGetter: params => {
                    let value = params.data[params.colDef.field];
                    let override = params.data[params.colDef.field + '_override'];
                    return override || value;
                },
                valueFormatter: params => {
                    return params.value ? params.value.toFixed(3) : '';
                },
                cellRenderer: 'RateCardCellRendererComponent',
                cellRendererParams: (params) => {
                    return {
                        'val': params.data[params.colDef.field],
                        'override': params.data[params.colDef.field + '_override'],
                        'position': params.data[params.colDef.field + '_position'],
                        'isPercent': true,
                    }
                },
            }
        ],
    };

    constructor(private store: Store<fromStore.RateCardState>) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }
    ngOnChanges(changes: SimpleChanges): void {

        if (changes && changes.data && changes.data.currentValue && changes.data.currentValue.length > 0 && this.gridApi) {
            this.filteredData = this.data;
            this.applyFilters();
        }

        if (changes && changes.selectedCurrencies && changes.selectedCurrencies.currentValue && this.gridApi) {
            this.filteredData = this.data;
            this.applyFilters();
        }

        if (changes && changes.selectedSecTypes && changes.selectedSecTypes.currentValue && this.gridApi) {
            this.filteredData = this.data;
            this.applyFilters();
        }
    }

    applyFilters() { 
        if (this.selectedCurrencies && this.selectedCurrencies.length > 0) {
            this.filterByCurrency();
        }
        if (this.selectedSecTypes && this.selectedSecTypes.length > 0) {
            this.filterBySecTypes();
        }
    }


    filterBySecTypes() {
        if (this.filteredData) { 
            this.filteredData = this.filteredData.filter((row: fromModels.IRateCard) => this.selectedSecTypes.includes(row.SecurityType));
            this.gridApi.setRowData([]);
            this.gridApi.setRowData(this.filteredData)
        }
    }

    filterByCurrency() {
        if (this.filteredData) {
            this.filteredData = this.filteredData.filter((row: fromModels.IRateByFundAndSecurity) => this.selectedCurrencies.includes(row.Currency));
            this.gridApi.setRowData([]);
            this.gridApi.setRowData(this.filteredData);
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }

    showRateHistory(params){
        let payload: fromModels.ITimeseriesRequest = {
          end_date: moment(new Date()).format('MM-DD-YYYY'),
          start_date: moment(new Date()).subtract(3, 'months').format('MM-DD-YYYY'),
          sid: params.data['SID'],
          secName: params.data['SecurityName']
        }
        this.requestRateTimeseriesData.emit(payload)
      }
    

}