import { ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { ColDef, ColumnApi, ColumnMovedEvent, DragStartedEvent, DragStoppedEvent, GridApi, GridOptions, ICellRendererParams } from 'ag-grid-community';
import { AppGridCustomStatusBarCellValueComponent } from 'src/app/components';
import * as fromStore from '../../store';

import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Subscription } from 'rxjs';
import { AssetTargetSecurityCellRendererComponent } from '../asset-target-security-renderer/asset-target-security-renderer.component';
import { AssetTargetsHistoryViewerComponent } from '../asset_targets-history-viewer/asset-targets-history-viewer.component';
import * as fromModels from './../../models/asset_targets.models';
import { AssetTargetsCalculatorComponent } from '../asset-targets-calculator/asset-targets-calculator.component';

@Component({
    selector: 'app-asset-targets',
    templateUrl: './asset_targets.component.html',
    styleUrls: ['./asset_targets.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetTargetsComponent implements OnInit {

    @Input() params: fromModels.IAssetTargetsParam;
    @Input() mode: 'Live' | 'Historical' = 'Live';
    @Input() country: string;
    @Input() data: any[]
    @Input() scenarios: any[];    
    @Input() scenarioList: any;
    @Input() timeseries: any[];
    @Input() overridenValues: any;
    @Input() initAssetCalculatorInputs: fromModels.ICalculatorInput[];
    @Input() editedAssetCalculatorInputs: fromModels.ICalculatorInput[];
    @Input() assetCalculatorInputs: fromModels.ICalculatorInput[];

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    private columnDefs: any[];
    
    private colComparisonState: any = [];
    private movedCol: ColDef;
    
    public userProbabilityOverrides: {}

    public subscriptions: Subscription[] = [];

    private dialogRef: MatDialogRef<AssetTargetsCalculatorComponent>;

    public customGridOption: GridOptions = {

        onDragStarted: params => this.onDragStarted(params),
        onDragStopped: params => this.onDragStopped(params, this.scenarioList, this.movedCol, this.country),
        onColumnMoved: params => this.onColumnMoved(params),
        
        defaultColDef: {
            cellStyle: params => {
                return typeof params.value === 'number' &&
                    params.colDef.field.toLowerCase().includes('CrossPodName') === false ?
                    { 'justify-content': 'flex-end' } : {};
            },
            resizable: true,
            autoHeight: true,
            sortable: false,
            suppressMenu: true,
            width: 100
        },
        headerHeight:  70,
        rowHeight: 16,
        rowClass:'small-row',
        sideBar: false,
        domLayout: 'autoHeight',
        floatingFilter: false,
        deltaRowDataMode: true,
        context: { componentParent: this },
        enableSorting: false, 

        getRowStyle: (params) => {
            if (params.node.rowPinned) {
                return { 'font-weight': 'bold', 'background-color': '#c4fdf5' };
            }
        },

        getRowNodeId: data => data.Security,

        statusBar: {
            statusPanels: [
                {
                    statusPanel: 'agAggregationComponent',
                    statusPanelParams: {
                        aggFuncs: ['sum']
                    }
                },
                {
                    statusPanel: 'AppGridCustomStatusBarCellValueComponent',
                    statusPanelParams: {
                        fractionDigits: 2
                    }
                },
            ],
        },

        frameworkComponents: {
            'AppGridCustomStatusBarCellValueComponent': AppGridCustomStatusBarCellValueComponent,
            'AssetTargetSecurityCellRendererComponent': AssetTargetSecurityCellRendererComponent
        },
    };

    public extraOption = {};


    constructor(private dialog: MatDialog,  private store: Store<fromStore.AssetTargetsState>) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges) {
        if (this.gridApi && changes.data && changes.data.currentValue && changes.scenarios && changes.scenarios.currentValue) {

            this.columnDefs = this.getColumnDefs(changes.scenarios.currentValue);
            // this.gridApi.setColumnDefs(this.columnDefs);
            this.gridApi.setRowData([])
            this.gridApi.setRowData(this.getSecurityRows(changes.data.currentValue));
            this.gridApi.setPinnedTopRowData(this.getProbabilitiesRow(changes.data.currentValue));
        }

        if (this.gridApi && changes.params && changes.params.currentValue) { 

            //this.columnDefs = [];
            // this.gridApi.setColumnDefs([]);

            this.gridApi.setRowData([]);
            this.gridApi.setPinnedTopRowData([]);

            let oldColDef = this.columnDefs
            this.columnDefs = this.getColumnDefs(this.scenarios);

            // avoid un-needed col changes to keep highlighted rows 
            let changeColDefs = false;
            oldColDef.map( (col, i) => {
                if(col.headerName !== this .columnDefs[i].headerName){
                    changeColDefs = true;
                }
            })
            if(changeColDefs){
                this.gridApi.setColumnDefs(this.columnDefs);
            }
        
            this.gridApi.setRowData([])
            this.gridApi.setRowData(this.getSecurityRows(this.data));
            this.gridApi.setPinnedTopRowData(this.getProbabilitiesRow(this.data));
            this.gridApi.refreshCells({force: true, suppressFlash: false});
        }
        
        if(this.gridApi && changes.overridenValues && changes.overridenValues.currentValue){
            this.gridApi.redrawRows()
        }

    }

    getColumnDefs(scenarios: any[]): any {

        if (scenarios.length === 0) {
            return [];
        }

        const colDefs = [{
            id: 'Security',
            headerName: 'Security',
            field: 'Security',
            width: 110,
            cellRenderer: 'AssetTargetSecurityCellRendererComponent',
            cellRendererParams: { 'scenarios': this.scenarios }
        }];
        
        if (this.mode === 'Live') {
            // Scenarios Col Defs
            scenarios.forEach((scenario) => colDefs.push(this.getScenarioColDef(scenario)));

            colDefs.push(this.getTargetLevelOrMoveColDef());
            colDefs.push(this.getCarryAdjustedTargetLevelMoveColDef());
            colDefs.push(this.getScoreColDef());
            colDefs.push(this.getSpotPriceColDef());
            // this.getVolsAndCarryColDefs().forEach((colDef) => {
            //     colDefs.push(colDef);
            // })
            
        } else {
            // Scenarios Col Defs
            scenarios.forEach((scenario) => colDefs.push(this.getHistoricalScenarioColDef(scenario)));
            colDefs.push(this.getHistoricalTargetLevelOrMoveColDef());
            this.getHistoricalAdditionalColDefs().forEach(colDef => {
                colDefs.push(colDef);
            });
            colDefs.push(this.getHistoricalPriceColDef());
            
            // This has to be historical also...
            // this.getVolsAndCarryColDefs().forEach((colDef) => {
            //     colDefs.push(colDef);
            // });
        }

        return colDefs;
    }
    
    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;

        if (this.data && this.data.length > 0 && this.scenarios && this.scenarios.length > 0) {
            this.columnDefs = this.getColumnDefs(this.scenarios);
            this.gridApi.setColumnDefs(this.columnDefs);
            this.gridApi.setRowData(this.getSecurityRows(this.data));
            this.gridApi.setPinnedTopRowData(this.getProbabilitiesRow(this.data));
        }
    }

    getProbabilitiesRow(data: any[]): any[] {
        return this.data.filter((row) => row['Security'] === 'Probabilities');
    }

    getSecurityRows(data: any[]): any[] {
        return this.data.filter((row) => row['Security'] !== 'Probabilities');
    }

    /*** Dynamic Columns  ***/

    getScenarioColDef(scenario: any): any {
        const colDef = {
            id: scenario['ScenarioCode'],
            headerClass: 'text-center',
            headerName: scenario['ScenarioDescription'],
            field: scenario['ScenarioDescription'],
            editable: params => {
                if (params.data['Security'] === 'Probabilities') { 
                    return true;
                }
                return false;
            },
            valueGetter: params => {
                return this.getScenarioCellValue(params.data, params.column['colId'], params.colDef.field);
            },
            valueSetter: params => {
                const prop = params.column.colId;
                const newValue = params.newValue;
   
                let payload = ({
                    country: params.data['CountryCode'],
                    field: prop,
                    old_data: params.oldValue,
                    override_data: parseFloat(newValue)
                })
        
                if (newValue === '' || newValue === null || newValue === undefined) { 
                    delete params.data[prop + '_override'];
                    this.store.dispatch(fromStore.deleteOverrideProbability(payload))
                } 
                else {
                    params.data[prop + '_override'] = newValue;
                    this.store.dispatch(fromStore.overrideAssetTargetProbability(payload))
                }
                this.gridApi.redrawRows();
                return false;
            },
            valueFormatter: params => {
                return this.formatCell(params, false);
            },
            cellRenderer: (params) => this.probabilityCellRenderer(params),
        };
        return colDef;
    }

    getHistoricalScenarioColDef(scenario: any): any {
        const colDef = {
            id: scenario['ScenarioCode'],
            headerClass: 'text-center',
            headerName: scenario['ScenarioDescription'],
            field: scenario['ScenarioDescription'],
            valueGetter: params => {
                return this.getHistoricalScenarioCellValue(params);
            },
            valueFormatter: params => {
                return this.formatCell(params, false);
            }
        };
        return colDef;
    }

    getSpotPriceColDef(): any {
        const colDef = {
            id: 'LivePx',
            headerName: 'Live Price',
            field: 'LivePx',
            cellStyle: params => {
                if (!params.node.rowPinned) {
                    return { 'background-color': '#e4f9d2', 'justify-content': 'end' };
                }
            },
            cellRenderer: (params) => this.priceCellRenderer(params)
        };
        return colDef;
    }

    getHistoricalPriceColDef(): any {
        const colDef = {
            id: 'ClosePx',
            headerName: 'ClosePx',
            field: 'AssetPrice',
            cellStyle: params => {
                if (!params.node.rowPinned) {
                    return { 'background-color': '#e4f9d2', 'justify-content': 'end' };
                }
            },
            valueFormatter: params => {
                return this.priceFormatter(params.value, params.data['DisplayFormat']);
            }
        };
        return colDef;
    }

    getVolsAndCarryColDefs(): any {
        const colDefs = [{
            id: '3moCarry',
            headerName: '3M carry',
            field: '3mCarry',
            cellStyle: params => {
                if (!params.node.rowPinned) {
                    return { 'background-color': '#f3fdfe', 'justify-content': 'end' };
                }
            },
            valueGetter: params => {
                let result = null;
                if (!this.params.showLevels) {
                    result = params.data['3mCarry'];
                }            
                return result
            },
            valueFormatter: params => {
                return this.priceFormatter(params.value, 'decimal2');
            }
        }, {
            id: '1mo. Vol.',
            headerName: '1mo. Vol',
            field: '1mVol',
            cellStyle: params => {
                if (!params.node.rowPinned) {
                    return { 'background-color': '#f3fdfe', 'justify-content': 'end' };
                }
            },
            valueGetter: params => {
                let result = null;
                if (!this.params.showLevels) {
                    result = params.data['1mVol']
                }
                return result;
            },
            valueFormatter: params => {
                return this.priceFormatter(params.value, 'decimal2');
            }
        }, {
            id: 'Asset Target Vol',
            headerName: 'Asset Target Vol',
            field: '3mCarry',
            cellStyle: params => {
                if (!params.node.rowPinned) {
                    return { 'background-color': '#f3fdfe', 'justify-content': 'end' };
                }
            },
            valueGetter: params => {
                let result = null;
                if (!this.params.showLevels) {
                    const targetLevelMove = this.calculateTargetLevelMove(params.data, this.getProbabilitiesRow(this.data)[0]);
                    result = this.calculateAssetTargetVol(params.data, this.getProbabilitiesRow(this.data)[0], targetLevelMove);
                }
                return result;
            },
            valueFormatter: params => {
                return this.priceFormatter(params.value, 'decimal2');
            }
        }];
        return colDefs;
    }

    getTargetLevelOrMoveColDef(): any {
        const header = this.params.showLevels ? 'Target Level' : 'Fair Value Move';
        const result = {
            id: 'TargetLevelOrMove',
            headerName: header,
            field: 'LivePx',
            cellStyle: params => {
                if (!params.node.rowPinned) {
                    return { 'background-color': '#fbfae3', 'justify-content': 'end' };
                }
            },
            valueGetter: params => {
                if (this.params.showLevels) {
                    return this.calculateTarget(params.data, this.getProbabilitiesRow(this.data)[0]);
                } else {
                    return this.calculateTargetLevelMove(params.data, this.getProbabilitiesRow(this.data)[0]);
                }
            },
            valueFormatter: params => {
                return this.formatCell(params, true);
            },
        };
        return result;
    }

    getCarryAdjustedTargetLevelMoveColDef(): any { 
        const result = {
            id: '3moCarryFMV',
            headerName: 'Carry Adjusted Fair Value Move',
            headerTooltip: '3M Carry',
            field: '3mCarry',
            hide: this.params.showLevels,
            cellStyle: params => {
                if (!params.node.rowPinned) {
                    return { 'background-color': '#fbfae3', 'justify-content': 'end' };
                }
            },
            valueGetter: params => {
                let result = null;
                if (!this.params.showLevels) {
                    const security = params.data['Security'];
                    if (security === 'Probabilities') {
                        return null;
                    }
                    const move = this.calculateTargetLevelMove(params.data, this.getProbabilitiesRow(this.data)[0]);
                    const carry = params.data['3mCarry'];
                    if(this.country == 'US'){
                      console.warn(move)
                      console.warn(carry)  
                    }
                    result = move + (carry ? carry : 0);
                }
                return result
            },
            valueFormatter: params => {
                return this.formatCell(params, true);
            }
        }
        return result;
    }

    getScoreColDef(): any {
        const result = {
            id: 'Score',
            headerName: 'Score',
            headerTooltip: 'Carry adjusted FV move normalized by forecast variance',
            field: '3mCarry',
            hide: this.params.showLevels,
            cellStyle: params => {
                if (!params.node.rowPinned) {
                    return { 'background-color': '#fbfae3', 'justify-content': 'end' };
                }
            },
            valueGetter: params => {
                let result = null;
                if (!this.params.showLevels) {
                    const security = params.data['Security'];
                    if (security === 'Probabilities') {
                        return null;
                    }
                    const move = this.calculateTargetLevelMove(params.data, this.getProbabilitiesRow(this.data)[0]);
                    const carry = params.data['3mCarry'];
                    const adjFVMove = move + (carry ? carry : 0);
                    const assetTargetVol = this.calculateAssetTargetVol(params.data, this.getProbabilitiesRow(this.data)[0], move)
                    result = Math.abs(assetTargetVol - 0) < .0001 ? null : (adjFVMove / assetTargetVol);
                    result = result * Math.sqrt(6);
                }
                return result 
            },
            valueFormatter: params => {
                return this.priceFormatter(params.value, 'decimal2');
            }
        }
        return result;
    }

    getHistoricalTargetLevelOrMoveColDef(): any {
        const header = this.params.showLevels ? 'Target Level' : 'Fair Value Move';
        const result = {
            id: 'TargetLevelOrMove',
            headerName: header,
            field: 'TargetLevel',
            cellStyle: params => {
                if (!params.node.rowPinned) {
                    return { 'background-color': '#fbfae3', 'justify-content': 'end' };
                }
            },
            valueGetter: params => {
                if (this.params.showLevels) {
                    return params.data['TargetLevel'];
                } else {
                    return params.data['TargetLevelMove'];
                }
            },
            valueFormatter: params => {
                return this.formatCell(params, true);
            },
        };
        return result;
    }

    getHistoricalAdditionalColDefs(): any { 
        const result = [];
        result.push({
            id: 'AdjustedTargetLevelMove',
            headerName: 'Carry adjusted Fair Value Move',
            headerTooltip: '3M Carry',
            field: 'AdjFVMove',
            cellStyle: params => {
                if (!params.node.rowPinned) {
                    return { 'background-color': '#fbfae3', 'justify-content': 'end' };
                }
            },
            valueGetter: params => {
                let result = null;
                if (!this.params.showLevels) {
                    return params.data['AdjFVMove'];
                } 
                return result;
            },
            valueFormatter: params => {
                return this.formatCell(params, true);
            },
        });

        result.push({
            id: 'HistoricalScore',
            headerName: 'Score',
            headerTooltip: 'Carry adjusted FV move normalized by forecast variance',
            field: 'Score',
            cellStyle: params => {
                if (!params.node.rowPinned) {
                    return { 'background-color': '#fbfae3', 'justify-content': 'end' };
                }
            },
            valueGetter: params => {
                let result = null;
                if (!this.params.showLevels) {
                    return params.data['Score'];
                }
                return result;
            },
            valueFormatter: params => {
                return this.formatCell(params, true);
            },
        });

        return result;
    }

    getScenarioCellValue(data: any, scenarioCode: string, scenarioName: string): number {
        let cellValue = data[scenarioCode];
        if(cellValue === undefined){
            cellValue = data[scenarioName]
        }
        if (data['Security'] === 'Probabilities') {
            return cellValue;
        } else {
            if (this.params.showLevels) {
                return cellValue;
            } else {
                const spotPx = data['LivePx'];
                const isPrice = data['IsPrice'] ? data['IsPrice'] : false;
                if(spotPx === undefined || isPrice === undefined){
                    return null
                }
                let result = this.getTargetLevelMove(cellValue, spotPx, isPrice);
                return result;
            }
        }
    }
    
    getHistoricalScenarioCellValue(params: any): Number {
        let cellValue = params.data[params.column['colId']];
        if(cellValue === undefined){
            cellValue = params.data[params.colDef.field]
        }
        if (params.data['Security'] === 'Probabilities') {
            return cellValue;
        } else {
            if (this.params.showLevels) {
                return cellValue;
            } else {
                const spotPx = params.data['AssetPrice'];
                const isPrice = params.data['IsPrice'] ? params.data['IsPrice'] : false;
                if(spotPx === undefined || isPrice === undefined){
                    return null
                }
                return this.getTargetLevelMove(cellValue, spotPx, isPrice);
            }
        }
    }

    getTargetLevelMove(targetValue: number, spotValue: number, isPrice): number {
        if (isPrice) {
            return targetValue / spotValue - 1;
        }
        return targetValue - spotValue;
    }

    calculateTarget(data: any, probabilities: any): number {
        const security = data['Security'];
        if (security === 'Probabilities') { 
            return null;
        }
        let target = 0;
        this.scenarios.forEach((scenario) => {
            let probability = probabilities[scenario.ScenarioDescription]
            if (probabilities.hasOwnProperty(scenario.ScenarioDescription + '_override')){
                probability = probabilities[scenario.ScenarioDescription + '_override'];
            }
            if (probabilities.hasOwnProperty(scenario.ScenarioDescription + '_1_override')){
                probability = probabilities[scenario.ScenarioDescription + '_1_override'];
            }
            target += data[scenario.ScenarioDescription] * probability;
        });
        return target;
    }

    calculateTargetLevelMove(data: any, probabilities: any): number {
        const security = data['Security'];
        if (security === 'Probabilities') {
            return null;
        }
        const isPrice = data['IsPrice'];
        const spotPx = data['LivePx'];
        let target: number = 0;
        this.scenarios.forEach((scenario) => {
            const targetLevel = data[scenario.ScenarioDescription];
            let probability = probabilities[scenario.ScenarioDescription]

            if (probabilities.hasOwnProperty(scenario.ScenarioDescription + '_override')){
                probability = probabilities[scenario.ScenarioDescription + '_override'];
            }

            if (probabilities.hasOwnProperty(scenario.ScenarioDescription + '_1_override')){
                probability = probabilities[scenario.ScenarioDescription + '_1_override'];
            }

            target += this.getTargetLevelMove(targetLevel, spotPx, isPrice) * probability;                            
        });
        return target;
    }

    calculateAssetTargetVol(data: any, probabilities: any, targetLevelMove: number): number { 
        const security = data['Security'];
        if (security === 'Probabilities') {
            return null;
        }
        let target: number = 0;
        let total = 0;
        const spotPx = data['LivePx'];
        const isPrice = data['IsPrice'] ? data['IsPrice'] : false;
        if (spotPx === undefined || isPrice === undefined) {
            return null
        }
        this.scenarios.forEach((scenario) => {
            let cellValue = data[scenario.ScenarioCode];
            if (cellValue === undefined) {
                cellValue = data[scenario.ScenarioDescription]
            }
            let scenarioLevelMove = this.getTargetLevelMove(cellValue, spotPx, isPrice);
            
            let probability = probabilities[scenario.ScenarioDescription]

            if (probabilities.hasOwnProperty(scenario.ScenarioDescription + '_override')) {
                probability = probabilities[scenario.ScenarioDescription + '_override'];
            }

            if (probabilities.hasOwnProperty(scenario.ScenarioDescription + '_1_override')) {
                probability = probabilities[scenario.ScenarioDescription + '_1_override'];
            }

            // if (data['Security'] === 'GT5') { 
            //     console.log(`
            //         ScenarioName: ${scenario.ScenarioDescription}, 
            //         Move: ${scenarioLevelMove}, 
            //         Probability: ${probability}
            //         TargetMove: ${targetLevelMove}
            //     `);
            // }

            let tmp = (scenarioLevelMove - targetLevelMove) * (scenarioLevelMove - targetLevelMove) * probability;
            total += tmp;            
        });
        target = Math.sqrt(total);
        // if (data['Security'] === 'GT5') { 
        //     console.log(`AssetTargetVol: ${target}`);
        // }
        return target;
    }
        
    formatCell(params: any, nullPinnedRow: boolean): any {
        const showLevels = this.params.showLevels;
        if (params.data['Security'] === 'Probabilities') {
            if (nullPinnedRow)
                return null;
            return (params.value * 100).toFixed(0) + '%';
        } else {
            if (params.value) {
                const displayFormat = params.data['DisplayFormat'];
                if (showLevels) {
                    if (displayFormat && displayFormat === 'integer') {
                        return params.value.toFixed(0);
                    } else if (displayFormat && displayFormat.startsWith('decimal')) {
                        return params.value.toFixed(parseInt(displayFormat.replace('decimal', ''), 10));
                    }
                    return params.value.toFixed(2);
                } else {
                    const isPrice = params.data['IsPrice'];
                    if (isPrice) {
                        return (params.value * 100).toFixed(0) + '%';
                    } else if (displayFormat && displayFormat === 'integer') {
                        return params.value.toFixed(0);
                    } else if (displayFormat && displayFormat.startsWith('decimal')) {
                        return params.value.toFixed(parseInt(displayFormat.replace('decimal', ''), 10));
                    }
                }
            } 
        }
        return params.value;
    }

    getNumFactors(): number { 
        return this.data.length;
    }

    probabilityCellRenderer(params: ICellRendererParams): string {
        if (params.data['Security'] === 'Probabilities') { 

            const scenarioName = params.column.getColId().replace('_1', '') + '_override';
            const altScenarioName = params.column.getColId().replace('_1', '') + '_1_override';

            let origValueText = Math.round(params.value * 100) + '%';

            if (params.data.hasOwnProperty(scenarioName)) { 
                const newValueText = Math.round(params.data[scenarioName] * 100) + '%';
                return `${newValueText}  <strike style="color:gray">${origValueText}</strike>`
            } 
            if (params.data.hasOwnProperty(altScenarioName)) { 
                const newValueText = Math.round(params.data[altScenarioName] * 100) + '%';
                return `${newValueText}  <strike style="color:gray">${origValueText}</strike>`
            } 
            if(params.data.CountryCode === 'US' && params.data.SecuritySortOrder === -1){
                let t = params.column.getColId().replace('_1', '');
            }
            return origValueText;
        }
        return this.formatCell(params, false);
    }

    priceCellRenderer(params: ICellRendererParams): string {
        if (params.data['Security'] === 'Probabilities') {
            return null;
        } else {
            let formattedValue = this.priceFormatter(params.value, params.data['DisplayFormat']);
            let isDelayed: boolean = false;
            // let updateTs = moment(params.data["LiveUpdateTs"]);
            // let totalSeconds = Math.abs(new Date().valueOf() - updateTs.toDate().valueOf()) / 1000;
            // isDelayed = totalSeconds > 300; // More than 5 minutes have passed since the last update            
            if (!isDelayed) { 
                return `<span title="${params.data["LiveUpdateTs"]}">${formattedValue}</span>`
            } else {
                return `<span style='color:red;font-weight:bold;'><sup>D</sup></span>&nbsp;&nbsp;<span title="${params.data["LiveUpdateTs"]}">${formattedValue}</span>`;
            }
        }
    }

    priceFormatter(value: number, displayFormat: string): string {
        let formattedValue = null;
        if (value) {
            if (displayFormat && displayFormat === 'integer') {
                formattedValue = value.toFixed(0);
            } else if (displayFormat && displayFormat.startsWith('decimal')) {
                formattedValue = value.toFixed(parseInt(displayFormat.replace('decimal', ''), 10));
            } else {
                formattedValue = value.toFixed(2);
            }
        }
        return formattedValue;
    }

    resetProbabilityOverrides(): void {
        this.store.dispatch(fromStore.deleteAllOverrides());
        this.gridApi.redrawRows();
        // const probrow = this.data.filter((row) => row['Security'] === 'Probabilities')[0];
        // const propsToRemove = [];
        // Object.keys(probrow).forEach(prop => {
        //     if (prop.endsWith('_override'))
        //         propsToRemove.push(prop);
        // });
        // propsToRemove.forEach(prop => {
        //     delete probrow[prop];
        // })
        // this.gridApi.redrawRows();
    }

    showHistory(security: string): void {
        if (security && this.timeseries) { 
            const selTimeseries = this.timeseries.filter((ts) => ts.name === security);
            if (selTimeseries.length === 1) { 
                const dialogRef = this.dialog.open(AssetTargetsHistoryViewerComponent, {
                    hasBackdrop: true,
                    panelClass: 'event-analysis-pop-up-panel',
                    width: '800px',
                    height: '800px',
                    data: {
                        'timeseries': selTimeseries[0]
                    }
                });
            }
        }
    }

    
    onDragStarted(e: DragStartedEvent){
        this.colComparisonState = e.columnApi.getColumnState();
    }

    onDragStopped(e: DragStoppedEvent, scenarioList: any, movedCol: ColDef, country: string){

        let output: fromModels.ISortOrderUpdatePayload[] = [];
        let newColState = e.columnApi.getColumnState();
        let isDiff:boolean = false;
      
        this.colComparisonState.map( (item, index) => {
            if(item.colId !== newColState[index].colId){
                isDiff = true;
            }
        })

        if(isDiff){

            // Get new col stat header name 
            let simplifiedColState = [];
            newColState.map( col => {
                simplifiedColState.push(col.colId.replace('_1', ''))
            })

            // Get relevant scenario list header names
            let filteredScenarioList = Object.assign([], this.scenarioList).filter(item => item.CountryCode === country);
            let simplifiedScenarioList = []
            filteredScenarioList.map( scenario => simplifiedScenarioList.push(scenario.ScenarioDescription))

            // trim excess columns like security, live price, etc
            for(var i = simplifiedColState.length - 1; i >= 0 ; i --){
                if(!simplifiedScenarioList.includes(simplifiedColState[i])){
                    simplifiedColState.splice(i, 1)
                }
            }
            
            filteredScenarioList.map( (scenario,idx) => {
                let payload: fromModels.ISortOrderUpdatePayload = {
                    scenarioId: scenario.ScenarioID,
                    sortOrder: simplifiedColState.indexOf(scenario.ScenarioDescription) + 1
                }
                output.push(payload)
            })

            if(output.length > 0){
                this.store.dispatch(fromStore.updateScenarioSortOrder(output))
            }

        }
    }

    onColumnMoved(params: any){
        this.movedCol = params.column.colDef
    }
  
    toggleCalculatorView(): void {
        this.dialogRef = this.dialog.open(AssetTargetsCalculatorComponent, {
            height: '99vh',
            width: '95vw',
            data: {
                country: this.country,
                oldData: this.data,
                initCalcValues: this.initAssetCalculatorInputs,
                editedCalcValues: this.editedAssetCalculatorInputs,
                calcValues: this.assetCalculatorInputs
            }
        });
        this.dialogRef.afterClosed().subscribe(res => {
            this.gridApi.refreshCells();
            if(res.event === 'Refresh'){
                // this.toggleCalculatorView();
            }
        })
    }
}
