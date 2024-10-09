import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { GridApi, ColumnApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

import { ActualVsDriftRendererComponent } from './../renderers/act_vs_drift-renderer.component';
import { TradenameRendererComponent } from './../renderers/tradename-renderer.component';

import * as fromModels from '../../models/drift.models';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
    selector: 'app-tradename-drift',
    templateUrl: './tradename-drift.component.html',
    styleUrls: ['./tradename-drift.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradeNameDriftComponent implements OnInit, OnChanges, OnDestroy {

    @Input() drifts: any[];
    @Input() driftsLoading: boolean;
    @Input() driftsLoaded: boolean;
    @Input() driftsError: string;
    @Input() request: fromModels.PositionsDriftRequest;
    @Input() searchCriteria$: Observable<string>;

    @Output() tradeNameSelected: EventEmitter<string> = new EventEmitter<string>();

    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;
    public selectedTradeID: string;

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
                headerName: 'TradeName',
                width: 250,
                field: 'TradeName',
                // cellRenderer: 'TradenameRendererComponent',
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
            }, {
                headerName: 'TID',
                field: 'TID',
                width: 50,
                cellStyle: { 'justify-content': 'flex-end' }
            }
        ],
        context: { componentParent: this },
        frameworkComponents: {
            ActualVsDriftRendererComponent: ActualVsDriftRendererComponent,
            TradenameRendererComponent: TradenameRendererComponent
        },
        onRowClicked: params => {
            const tradeID = params.data['TradeID'];
            this.setSelectedTradeID(tradeID);
        },
    };


    constructor(private utilities: UtilityService) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
        this.setSelectedTradeID = this.setSelectedTradeID.bind(this);
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

    setSelectedTradeID(tradeID: string): string {
        this.selectedTradeID = tradeID;
        this.tradeNameSelected.emit(tradeID);
        return tradeID;
    }
}
