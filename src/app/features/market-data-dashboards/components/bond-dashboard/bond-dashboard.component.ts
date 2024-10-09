import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter, SimpleChanges, OnDestroy } from '@angular/core';
import { ColDef, ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';
import { GeneratedColDef, BondChartRequestRow } from '../../models';
import { Store } from '@ngrx/store';
import * as d3Chromatic from 'd3-scale-chromatic';
import * as fromStore from '../../store/';
import moment from 'moment';
import { StrategyRendererComponent } from 'src/app/features/allocations/components';

@Component({
    selector: 'app-bond-dashboard',
    templateUrl: './bond-dashboard.component.html',
    styleUrls: ['./bond-dashboard.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class BondDashboardComponent implements OnInit, OnDestroy {

    @Input() lookbacks: string[];
    @Input() instruments: any[];

    @Input() data: any;
    @Input() dataLoading: boolean;
    @Input() dataLoaded: boolean;
    @Input() dataError: string;

    @Output() loadDashboard: EventEmitter<void> = new EventEmitter<void>();
    @Output() loadChartData: EventEmitter<BondChartRequestRow[]> = new EventEmitter<BondChartRequestRow[]>();
    @Output() loadChartSpreadData: EventEmitter<BondChartRequestRow[]> = new EventEmitter<BondChartRequestRow[]>();

    @Output() unsubFromDashboard: EventEmitter<any> = new EventEmitter<any>();

    public gridData: any;
    public currentFilter = '1bd'
    public selectedCurrencies: {ticker: string}[] = [];

    public minTs: string; 
    public maxTs: string;

    public chart_api_params: BondChartRequestRow[] = [];

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public extraOption = {
        sizeColumnsToFit: true
    };
    public customGridOption: GridOptions = { };
    public dynamicColDefs: ColDef[];
    
    private createGridOptions(): GridOptions  {
        return {
            defaultColDef: {
                filter: 'agTextColumnFilter',
                editable: false,
                sortable: true,
                enableCellChangeFlash: true,
                headerClass:'bond-col',
            },
            rowHeight: 16,
            rowClass:'small-row',
            getRowNodeId: data => data.USD,
            deltaRowDataMode: false,
            onCellClicked: this.onCellClicked.bind(this),
            onSelectionChanged: this.onSelectionChanged.bind(this),
            rowSelection: 'multiple',
            columnDefs: [],
            groupDefaultExpanded: 1,
            groupUseEntireRow: true,
            groupRowRendererParams: {
                suppressCount: true
            },
   
            getContextMenuItems: () => {
                let context = this;
                let lookbackArr = [];
                let arr: any = ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport', 'separator'];
                this.lookbacks.map(lookback => {
                    lookbackArr.push({
                        name: `${lookback}`,
                        action: () => this.applyFilter(`${lookback}`)
                    })
                })
                arr.push({
                    name: 'Lookbacks',
                    subMenu: lookbackArr
                })
                arr.push('separator', 
                        { name: 'Chart As Dataset(s)', action: () => this.drawChart(context)}, 
                        { name: 'Chart As Spread', action: () => this.drawChartSpread(context)}
                );
                return arr;
            }
        }
    };

    ngOnInit(): void {
        this.customGridOption = this.createGridOptions();
        this.loadDashboard.emit(null);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.data && changes.data.currentValue) {
            this.gridData = this.dataService.csvToObjectArrayWithColumnHeaders(this.data.data, '');
            if(!this.dynamicColDefs && this.gridApi){
                this.applyFilter(this.currentFilter);
            }
        }
    }
    
    customGridCallBack(params: GridOptions) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.sizeColumnsToFit();
    }

    generateColDefs() {
        const currencies = this.data.config.currencies;
        const lookbacks = this.lookbacks.map( val => val.toLowerCase());
        const generatedColDefs: GeneratedColDef[] = currencies.map ( currency => {
            return {
                headerName: currency,
                children: (() => {
                    let arr = [];
                    arr.push({
                        field: `${currency}`,
                        headerName: 'Live',
                        width: 50,
                        valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2),
                        cellStyle: () => {
                            return { 'border-left': '0.2px dotted #d7d7d7;' , 'justify-content':'right'}
                        }
                    })
                    lookbacks.map( (lookback, index) => {
                        arr.push({
                            field: `${currency}_${lookback}`,
                            headerName: `${lookback.toUpperCase()}`,
                            width: 55,
                            valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvance(2),
                            hide: true,
                            cellStyle: (params) => {
                                const other_values = []; 
                                params.api.forEachLeafNode((node) => {
                                    if(params.data['asset_class'] === node.data['asset_class']) {
                                        other_values.push(node.data[`${currency}_${lookback}`]);
                                    }
                                });
                                const value = this._normalize_value(params.value, other_values);
                                if (params.value < 0) {
                                  let color = d3Chromatic.interpolateReds(value);
                                  color = color.replace('rgb', 'rgba').replace(')', ', 0.45)');
                                  return { 'background-color': color, 'border-left': '0.2px dotted #d7d7d7;', 'justify-content':'right' };
                                } else if (params.value > 0) {
                                  let color = d3Chromatic.interpolateGreens(value);
                                  color = color.replace('rgb', 'rgba').replace(')', ', 0.45)');
                                  return { 'background-color': color, 'border-left': '0.2px dotted #d7d7d7;' , 'justify-content':'right'};
                                }
                              }
                        });
                    })
                    return arr;
                })()
            }
        })
        return generatedColDefs;
    }

    applyFilter(newFilter){
        this.dynamicColDefs = [
            { field: 'asset_class', rowGroup: true, hide: true, cellClass:'bond-dashboard-group'},
            { field: 'alias', headerName:'', width: 100, cellStyle: { 'justify-content': 'right'}},
        ];
        let filteredColDefs = this.generateColDefs();
        filteredColDefs.map( col => {
            col.children.filter( child => {
                if(child.field.includes(this.currentFilter.toLowerCase())) {
                    child.hide = true;
                }
                if(child.field.includes(newFilter.toLowerCase())) {
                    child.hide = false;
                }
            })
        })
        this.dynamicColDefs = this.dynamicColDefs.concat(filteredColDefs);
        this.currentFilter = newFilter;
        this.gridApi.setColumnDefs(this.dynamicColDefs);
    }

    onCellClicked(params){
        // only selected 'Live' values will be stored (to be charted if needed)
        let headerName = params.api.getFocusedCell()['column']['colDef'].headerName;
        if(headerName === 'Live') {
            const config = this.data.config.sections;
            let ticker = params.api.getFocusedCell()['column']['colId'];
            let asset_class_data = config[params.data['asset_class']].tickers;
            let currency_arr_data = asset_class_data[`${ticker}`];
            currency_arr_data.map( item => {
                if(item['alias'] === params.data['alias'].toString()) {
                    this.chart_api_params.push({...item, asset_class:`${params.data['asset_class']}`, ticker:`${ticker}` })
                }
            })
        }
    }

    onSelectionChanged(params){ 
        if(params.api.getSelectedRows().length === 1) {
            while(this.chart_api_params.length > 1){
                this.chart_api_params = this.chart_api_params.slice(1);
            }
        }
    }

    drawChart(params){
        if(this.chart_api_params.length > 0) {
            this.loadChartData.emit(this.chart_api_params);
        }
    }

    drawChartSpread(params){
        if(this.chart_api_params.length > 0 && this.chart_api_params.length === 2) {
            this.loadChartSpreadData.emit(this.chart_api_params);
        } 
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
    
    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.unsubFromDashboard.emit()
    }

    constructor(private dataService: HighchartsDataService, private utilityService: UtilityService, private store: Store<fromStore.State>) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }
}
