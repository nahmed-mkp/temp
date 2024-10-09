import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { GridApi, ColumnApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

import { ActualVsDriftRendererComponent } from './../renderers/act_vs_drift-renderer.component';
import { TradenameRendererComponent } from './../renderers/tradename-renderer.component';

import * as fromModels from '../../models/drift.models';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
    selector: 'app-position-drift',
    templateUrl: './position-drift.component.html',
    styleUrls: ['./position-drift.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PositionDriftComponent implements OnInit, OnChanges, OnDestroy {

    @Input() drifts: any[];
    @Input() driftsLoading: boolean;
    @Input() driftsLoaded: boolean;
    @Input() driftsError: string;
    @Input() request: fromModels.PositionsDriftRequest;
    @Input() searchCriteria$: Observable<string>;

    @Output() positionSelected: EventEmitter<fromModels.PositionDriftRequest> = new EventEmitter<fromModels.PositionDriftRequest>();

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public extraOption = { sizeColumnsToFit: true };

    public customGridOption: GridOptions = {

        defaultColDef: {
            filter: 'agTextColumnFilter',
            editable: false,
            enableCellChangeFlash: false
        },
        getRowNodeId: data => data.ID,
        deltaRowDataMode: false,
        rowSelection: 'single',
        columnDefs: [
            {
                headerName: 'Date',
                width: 95,
                field: 'AsOfDate'
            }, {
                headerName: 'Security',
                width: 270,
                field: 'Security',
                cellStyle: { 'background-color': '#f8f9e3' }
            }, {
                headerName: 'SecurityType',
                width: 100,
                field: 'SecurityType'
            }, {
                headerName: 'TradeName',
                width: 250,
                field: 'TradeName',
                cellRenderer: 'TradenameRendererComponent',
                cellStyle: { 'background-color': '#eebb88' }
            }, {
                headerName: 'TradeID',
                width: 60,
                field: 'TradeID',
                cellStyle: { 'background-color': '#eebb88' }
            }, {
                headerName: 'Total Drift (%)',
                width: 120,
                field: 'Total_Drift_Pct',
                cellStyle: { 'justify-content': 'flex-end', 'background-color': '#bcf3f2' },
                valueFormatter: this.utilities.formatPercentNumberFormatterMultiply100OrZero(2)
            },
            {
                headerName: 'Opp Drift (%)',
                field: 'Opp_Drift_Pct',
                cellStyle: { 'justify-content': 'flex-end', 'background-color': '#e2feea'},
                cellRenderer: 'ActualVsDriftRendererComponent',
                cellRendererParams: { fund: 'Opp', type: 'Position' }
            },
            {
                headerName: 'Enhanced Opp Drift (%)',
                field: 'EnhancedOpp_Drift_Pct',
                cellStyle: { 'justify-content': 'flex-end', 'background-color': '#e2feea' },
                cellRenderer: 'ActualVsDriftRendererComponent',
                cellRendererParams: { fund: 'EnhancedOpp', type: 'Position' }
            },
            {
                headerName: 'MA7 Drift (%)',
                field: 'MA7_Drift_Pct',
                cellStyle: { 'justify-content': 'flex-end', 'background-color': '#e2feea' },
                cellRenderer: 'ActualVsDriftRendererComponent',
                cellRendererParams: { fund: 'MA7', type: 'Position' }
            },
            {
                headerName: 'AlphaPort Drift (%)',
                field: 'AlphaPort_Drift_Pct',
                cellStyle: { 'justify-content': 'flex-end', 'background-color': '#e2feea' },
                cellRenderer: 'ActualVsDriftRendererComponent',
                cellRendererParams: { fund: 'AlphaPort', type: 'Position' }
            },
            {
                headerName: 'GMMK Drift (%)',
                field: 'GMMK_Drift_Pct',
                cellStyle: { 'justify-content': 'flex-end', 'background-color': '#e2feea' },
                cellRenderer: 'ActualVsDriftRendererComponent',
                cellRendererParams: { fund: 'GMMK', type: 'Position' }
            },
            {
                headerName: 'TID',
                field: 'TID',
                width: 50,
                cellStyle: { 'justify-content': 'flex-end'}
            },
            {
                headerName: 'SID',
                field: 'SID',
                width: 50,
                cellStyle: { 'justify-content': 'flex-end'}
            },
            {
                headerName: 'CRSecID',
                field: 'CRID',
                width: 50,
                cellStyle: { 'justify-content': 'flex-end'}
            }
        ],
        context: { componentParent: this },
        frameworkComponents: {
            ActualVsDriftRendererComponent: ActualVsDriftRendererComponent,
            TradenameRendererComponent: TradenameRendererComponent
        },
        onRowClicked: params => {
            const sid = params.data['SID'];
            const tid = params.data['TID'];
            this.positionSelected.emit(this.getSelectedPositionRequest(sid, tid));
            // console.log('on row clicked', params.node, targetElements);
        },
    };


    constructor(private utilities: UtilityService) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
        this.getSelectedPositionRequest = this.getSelectedPositionRequest.bind(this);
    }

    ngOnInit(): void {
        if (this.searchCriteria$) {
            this.searchCriteria$.pipe(
                debounceTime(100)
            ).subscribe((val) => {
                console.log(`Search ${val}`);
                this.gridApi.setQuickFilter(val);
            });
        }
    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes.request && this.gridApi) {
            this.customGridOption.context = { 'request': changes.request.currentValue };

            if (changes.request.currentValue.hideFXHedges === true) {
                const drifts = this.drifts.filter((drift) => !((drift['SecurityType'] === 'FXFRD' ||
                    drift['SecurityType'] === 'FXFUND') && (drift['IsFxHedged'] === true)));
                this.gridApi.setRowData(drifts);
                this.gridApi.refreshCells();
            } else {
                this.gridApi.setRowData(this.drifts);
                this.gridApi.refreshCells();
            }

        }

        if (changes.drifts && this.gridApi) {
            this.gridApi.setRowData(changes.drifts.currentValue);
            this.gridApi.refreshCells();
        }
    }

    ngOnDestroy(): void { }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.ColumnApi;
        if (this.drifts.length > 0) {
            this.gridApi.setRowData(this.drifts);
        }
    }

    onSizeChange(size: number) {
        this.gridApi.refreshCells({ columns: ['size'] });
    }

    getSelectedPositionRequest(sid: number, tid: number): fromModels.PositionDriftRequest {
        return Object.assign({}, this.request, {sid: sid, tid: tid});
    }
}
