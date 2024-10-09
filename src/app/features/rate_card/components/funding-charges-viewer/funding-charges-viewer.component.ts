import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { GridApi, ColumnApi, GridOptions, ValueSetterParams, ValueFormatterParams } from 'ag-grid-community';
import { RateCardCellRendererComponent } from '../rate-card-cell-renderer/rate-card-cell-renderer.component';

import * as fromStore from '../../store';
import * as fromModels from '../../models';
import { UtilityService } from 'src/app/services';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';

@Component({
    selector: 'app-funding-charges-viewer',
    templateUrl: './funding-charges-viewer.component.html',
    styleUrls: ['./funding-charges-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FundingChargesViewerComponent implements OnChanges {

    @Input() data: fromModels.IFundingCharge[];
    @Input() dataLoading: boolean;
    @Input() selectedCurrencies: string[];
    @Input() selectedSecTypes: string[];

    private filteredData = [];
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public extraOption = { autoSizeAllColumns: true };
    public customGridOption: GridOptions = {
        defaultColDef: {
            suppressMenu: true,
            cellClass: 'right-border-light',
            headerClass: 'ag-header-wrap',
            filter: 'agTextColumnFilter',
            editable: false,
            enableCellChangeFlash: false,
        },
        autoGroupColumnDef: {
            headerName: 'Group',
            field: 'SecurityName',
            pinned: 'left',
            cellRenderer: 'agGroupCellRenderer',
            width: 150,
            minWidth: 150,
            cellRendererParams: {
                suppressCount: true,
              },
        }, 
        statusBar: {
            statusPanels: [
            {statusPanel: 'agAggregationComponent', statusPanelParams: {aggFuncs: ['sum', 'avg']}},
            {statusPanel: 'AppGridCustomStatusBarCellValueComponent' },
          ]
        },
        frameworkComponents: {
            'AppGridCustomStatusBarCellValueComponent': AppGridCustomStatusBarCellValueComponent
          },
        rowHeight: 16,
        rowClass:'small-row',
        onColumnPivotModeChanged: (params) => this.onPivotModeChanged(params),
        groupMultiAutoColumn: false,
        suppressAggFuncInHeader: true,
        floatingFilter: true,
        sideBar: 'columns',
        rowSelection: 'single',
        getRowNodeId: data => {
            return `${ data['SID'] + data['TID'] + data['FundingCharges'] }`
        },
        columnDefs: [
            {
                headerName: 'As Of Date',
                field: 'AsOfDate',
                enableValue: true,
                hide: true,
            }, 
            {
                headerName: 'Currency',
                field: 'Currency',
                enableValue: true,
                filter: 'agSetColumnFilter',
            },
            {
                headerName: 'Sec Name',
                field: 'SecurityName',
                enableRowGroup: true,
            },
            {
                headerName: 'SID',
                field: 'SID',
                enableRowGroup: true,
            },
            {
                headerName: 'Sec Type',
                field: 'SecurityType',
                enableValue: true,
            },
            {
                headerName: 'Funding Charges',
                field: 'FundingCharges',
                aggFunc: 'sum',
                enableValue: true,
                valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0),
            },
            {
                headerName: 'Funding Rate',
                field: 'FundingRate',
                aggFunc: params => this.customAggFunc(params),
                enableValue: true,
                valueFormatter: params => params.value ? params.value.toFixed(3) + '%' : '',
            },
            {
                headerName: "Haircut",
                field: "HairCut",
                aggFunc: params => this.customAggFunc(params),
                enableValue: true,
                valueFormatter: params => params.value ? params.value.toFixed(3) + '%' : '',
            },
            {
                headerName: "Haircut Adjusted Settled MV",
                field: "HairCutAdjustedSettledMV",
                aggFunc: params => this.customAggFunc(params),
                enableValue: true,
                valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0),
            }, 
            {
                headerName: 'Num Days',
                aggFunc: params => this.customAggFunc(params),
                field: "NumDays",
          
                enableValue: true,
            },
            {
                headerName: "Settled MV",
                field: "SettledMV",
                aggFunc: params => this.customAggFunc(params),
                enableValue: true,
                valueFormatter: this.utilities.formatNumberWithCommasAndDigitAdvance(0),
            },        
            {
                headerName: "Fund ID",
                field: "FundID",
                hide: true,
            },
            {
                headerName: "Fund",
                field: "FundName",
                enableRowGroup: true,
                enablePivot: true,
                pivot: true,
                filter: 'agSetColumnFilter',
            },
            {
                headerName: "Pod ID",
                field: "PodID",
                hide: true,
            },
            {
                headerName: "Pod",
                field: "PodName",
                enableRowGroup: true,
                enablePivot: true,
                filter: 'agSetColumnFilter',
            },
            {
                headerName: "TID",
                field: "TID",
                hide: true
            
            },
            {
                headerName: "TradeName",
                field: 'TradeName',
                enableRowGroup: true,
                enablePivot: true,
                filter: 'agSetColumnFilter',
            },
            {
                headerName: "CrossPod",
                field: "CrossPodName",
                enableRowGroup: true,
                enablePivot: true,
                filter: 'agSetColumnFilter',
            },
            {
                headerName: "CrossPod ID",
                field: "CrossPodID",
                hide: true
            },
            {
                headerName: "CrossFund",
                field:"CrossFund",
                enableRowGroup: true,
                enablePivot: true,
                filter: 'agSetColumnFilter',
            },
            {
                headerName: "CrossFund ID",
                field: "CrossFundID",
                hide: true
            },
            {
                headerName: "Client Services Trade Theme",
                field: "ClientServicesTradeTheme",
                enableRowGroup: true,
                enablePivot: true,
                filter: 'agSetColumnFilter',
            },
            {
                headerName: "Security Name Excluding CP",
                field: "SecurityNameExcludingCP",
                filter: 'agSetColumnFilter',
            }
        ],
    };

    constructor(private store: Store<fromStore.RateCardState>, private utilities: UtilityService) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.data && changes.data.currentValue && changes.data.currentValue.length > 0 && this.gridApi) {
            this.filteredData = this.data;
            if (this.selectedCurrencies) {
                this.filterByCurrency();
            }
            if (this.selectedSecTypes) {
                this.filterBySecTypes();
            }
        }

        if (changes && changes.selectedCurrencies && changes.selectedCurrencies.currentValue && this.gridApi) {
            this.filteredData = this.data;
            if (this.selectedSecTypes) {
                this.filterBySecTypes()
            }
            this.filterByCurrency();
        }

        if (changes && changes.selectedSecTypes && changes.selectedSecTypes.currentValue && changes.selectedSecTypes.currentValue.length > 0 && this.gridApi) {
            this.filteredData = this.data;
            if (this.selectedCurrencies) {
                this.filterByCurrency();
            }
            this.filterBySecTypes();
        }
    }


    filterBySecTypes() {
        if(this.filteredData){
            this.filteredData = this.filteredData.filter((row: fromModels.IRateCard) => this.selectedSecTypes.includes(row.SecurityType));
            this.gridApi.setRowData([]);
            this.gridApi.setRowData(this.filteredData)
        } 
    }

    filterByCurrency() {
        if(this.filteredData){
            this.filteredData = this.filteredData.filter((row: fromModels.IRateByFundAndSecurity) => this.selectedCurrencies.includes(row.Currency));
            this.gridApi.setRowData([]);
            this.gridApi.setRowData(this.filteredData);
        }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        // this.gridColumnApi.setPivotMode(true);
    }

    onPivotModeChanged(params: {type: string, api: GridApi, columnApi: ColumnApi}){
        if(!params.columnApi.isPivotMode()){
            params.api.sizeColumnsToFit();
        }
    }
 
    formatNumberWithCommas(value): string {
        if (value !== undefined && value !== null) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    }
    
    customAggFunc(params){
        if(typeof params[0] === 'string'){
            return params[0]
        }
        let total = 0;
        params.map(val =>  {
            if(val !== null && val !== undefined){
                total += parseFloat(val)
            }
        })
        params = params.filter(val => val !== null && val !== undefined)
        total = total / (params.length)

        if(Number.isNaN(total) || total === 0){
            return null
        }
        return this.formatNumberWithCommas(total.toFixed(2));
    }
}