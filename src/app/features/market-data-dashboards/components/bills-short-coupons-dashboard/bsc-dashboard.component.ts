import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter, SimpleChanges, OnDestroy, OnChanges, ViewEncapsulation } from '@angular/core';
import { ColDef, ColumnApi, GridApi, GridOptions, RowNode } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';
import { BondChartRequestRow, GeneratedColDef } from '../../models';
import { Store } from '@ngrx/store';
import * as d3Chromatic from 'd3-scale-chromatic';
import * as fromStore from '../../store/';
import moment from 'moment';

type loadChartReq = {
    type: string;
    title: string;
    data: any[]
}

@Component({
    selector: 'app-bsc-dashboard',
    templateUrl: './bsc-dashboard.component.html',
    styleUrls: ['./bsc-dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BillsShortCouponDashboardComponent implements OnInit, OnChanges {

    @Input() data: any;
    @Input() dataLoading: boolean;
    @Input() dataLoaded: boolean;
    @Input() dataError: string;

    @Output() loadDashboard: EventEmitter<void> = new EventEmitter<void>();
    @Output() unsubFromDashboard: EventEmitter<string> = new EventEmitter<string>();
    @Output() loadChartData: EventEmitter<loadChartReq> = new EventEmitter<loadChartReq>();

    public gridData: any;
    public currentFilter = '1bd';
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public extraOption = { autoSizeColumns: true};
    public customGridOption: GridOptions = { };
    public dynamicColDefs: ColDef[];
    
    private createGridOptions(): GridOptions  {
        return {
            defaultColDef: {
                filter: 'agTextColumnFilter',
                editable: false,
                sortable: true,
                enableCellChangeFlash: true,
            },
            rowHeight: 16,
            rowClass:'small-row',
            deltaRowDataMode: false,
            rowSelection: 'multiple',
            columnDefs: [
           
                    { headerName: '', field: 'AssetClass', rowGroup: true, showRowGroup: false, cellStyle: () => this.borderAndAlignmnetCellStyleFunc()},
                    { headerName: 'CUSIP', field:'CUSIP', cellStyle: () => this.borderAndAlignmnetCellStyleFunc()},
                    { headerName: 'Name', field:'SecDesc', cellStyle: (params) => this.highlightSecName(params)},
                    { headerName: 'MaturityDate', field:'MaturityDate', cellStyle: () => this.borderRightCellStyleFunc()},
                    { headerName: 'YrsToMaturity', field:'YrsToMaturity',  valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2), cellStyle: () => this.borderAndAlignmnetCellStyleFunc()},                    
                    { headerName: 'Mid', field: 'Mid',  valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2), cellStyle: () => this.borderRightCellStyleFunc()},
                    { headerName: 'SOFR', field: 'SOFR',  valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2), cellStyle: () => this.borderAndAlignmnetCellStyleFunc(), onCellClicked: (params)=> this.handleClick(params)},
                    { headerName: 'vsSOFR', field: 'vsSoFR',  valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2), cellStyle: (params) => this.lookbackCellStyleFunc(params, 'vsSoFR'), onCellClicked: (params)=> this.handleClick(params)},
                    { headerName: 'vs1BDSOFR', field: 'vs1BDSoFR',  valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2), cellStyle: (params) => this.lookbackCellStyleFunc(params, 'vs1BDSoFR'), onCellClicked: (params)=> this.handleClick(params)},
                    { headerName: 'vs1WKSOFR', field: 'vs1WKSoFR',  valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2), cellStyle: (params) => this.lookbackCellStyleFunc(params, 'vs1WKSoFR'), onCellClicked: (params)=> this.handleClick(params)},
                    { headerName: 'vs1MSOFR', field: 'vs1MSoFR',  valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2), cellStyle: (params) => this.lookbackCellStyleFunc(params, 'vs1MSoFR'), onCellClicked: (params)=> this.handleClick(params)},
                    { headerName: 'BidYield', field:'BidYield',  valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2), cellStyle: () => this.borderAndAlignmnetCellStyleFunc(), hide: true},
                    { headerName: 'AskYield', field:'AskYield',  valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2), cellStyle: () => this.borderAndAlignmnetCellStyleFunc(), hide: true},                    
                    { headerName: '1BD', field: '1BD', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2), cellStyle: (params) => this.lookbackCellStyleFunc(params, '1BD'), hide: true},
                    { headerName: '1BD SOFR', field: '1BD_SOFR',  valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(3), cellStyle: (params) => this.lookbackCellStyleFunc(params, '1BD_SOFR'), hide: true},
                    { headerName: '1WK', field: '1WK', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2), cellStyle: (params) => this.lookbackCellStyleFunc(params, '1WK'), hide: true},
                    { headerName: '1WK SOFR', field: '1WK_SOFR',  valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(3), cellStyle: (params) => this.lookbackCellStyleFunc(params, '1WK_SOFR'), hide: true},
                    { headerName: '1M',  field: '1M',  valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2), cellStyle: (params) => this.lookbackCellStyleFunc(params, '1M'), hide: true},
                    { headerName: '1M SOFR', field: '1M_SOFR',  valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(3), cellStyle: (params) => this.lookbackCellStyleFunc(params, '1M_SOFR'), hide: true},
                    { headerName: 'IsOTR', field: 'IsOTR', hide: true}
                    
                
            ],
            groupDefaultExpanded: 1,
            groupUseEntireRow: true,
            groupRowRendererParams: {
                suppressCount: true
            },
            autoGroupColumnDef:{
                cellStyle: () => { return { 'border-left': '1px solid black'}}
            },
            getContextMenuItems: () => {
                let arr: any = ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport', 'separator'];
                return arr;
            }
        }
    };

    ngOnInit(): void {
        this.customGridOption = this.createGridOptions();
        this.loadDashboard.emit(null);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.data && changes.data.currentValue && this.gridApi){
            this.gridData = this.dataService.csvToObjectArrayWithColumnHeaders(this.data.data, '');
        }  
    }

    customGridCallBack(params: GridOptions) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.columnApi.autoSizeAllColumns();
    }

    private _normalize_value(curValue: number, otherValues: number[]): any {
        const positiveValues = otherValues.filter(val => val >= 0);
        const negativeValues = otherValues.filter(val => val < 0);
        if (curValue > 0) { 
          const min = Math.min(...positiveValues);
          const max = Math.max(...positiveValues);
          if (max !== min) {
            const result = Math.abs((curValue - min) / (max - min));
            return result;
          }
        } else {
          const max = Math.min(...negativeValues);
          const min = Math.max(...negativeValues);
          if (max !== min) {
            const result = Math.abs((curValue - min) / (max - min));
            return result;
          }
        }
        return 0;
    }

    handleClick(params){
        let assetClass = params.data['AssetClass'];
        const field = params.colDef.field;

        let xAxisArr: any[] = [];
        let yAxisArr: any[] = [];

        this.gridData.map( item => {
            if(item['AssetClass'] === assetClass){
                xAxisArr.push(moment(item['MaturityDate']).unix() * 1000);
                yAxisArr.push(item[field]);
            }
        })
        
        xAxisArr.sort();
        yAxisArr.sort();

        let data = [];
        for(var i = 0; i < xAxisArr.length; i ++){
            if( xAxisArr[i] !== '' && yAxisArr[i] !== ''){
                data.push([xAxisArr[i], yAxisArr[i]])
            }
        }

        assetClass = assetClass.charAt(0) + assetClass.substring(1).toLowerCase();

        let requestObj: loadChartReq = {
            type: 'vsMaturity',
            title: `${assetClass} Maturity / ${field}`,
            data: data
        }
        this.loadChartData.emit(requestObj)

    }

    lookbackCellStyleFunc(params, colName){
        const other_values = []; 
        params.api.forEachLeafNode((node) => {
            if(params.data['AssetClass'] === node.data['AssetClass']) {
                other_values.push(node.data[colName]);
            }
        });
        const value = this._normalize_value(params.value, other_values);
        if (params.value < 0) {
          let color = d3Chromatic.interpolateReds(value);
          color = color.replace('rgb', 'rgba').replace(')', ', 0.45)');
          return { 'background-color': color, 'border-left': '0.2px dotted #d7d7d7;', 'justify-content':'right', 'border-right': (colName === '1M') ? '2px solid black' : '' };
        } else if (params.value > 0) {
          let color = d3Chromatic.interpolateGreens(value);
          color = color.replace('rgb', 'rgba').replace(')', ', 0.45)');
          return { 'background-color': color, 'border-left': '0.2px dotted #d7d7d7;' , 'justify-content':'right', 'border-right': (colName === '1M') ? '2px solid black' : ''};
        }
    }

    borderAndAlignmnetCellStyleFunc(){
        return { 'border-left': '0.2px dotted #d7d7d7;' , 'justify-content':'right'}
    }

    borderRightCellStyleFunc(){
        let temp = this.borderAndAlignmnetCellStyleFunc();
        return {...temp, 'border-right':'2px solid black'}
    }

    highlightSecName(params){
        let temp = this.borderAndAlignmnetCellStyleFunc();
        // console.warn(params)
        return {...temp, 'background-color': params.data['IsOTR'] === '1' ? '#ffff0040': 'none'}
    }

    constructor(private dataService: HighchartsDataService, private utilityService: UtilityService, private store: Store<fromStore.State>) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }
}
