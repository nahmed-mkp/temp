import { Component, OnInit, Input } from '@angular/core';
import { GridApi, GridOptions } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

@Component({
    selector: 'app-pricing-engine-ownwer-viewer',
    templateUrl: './pricing-engine-ownwer-viewer.component.html',
    styleUrls: ['./pricing-engine-ownwer-viewer.component.scss']
})
export class PricingEngineOwnwerViewerComponent implements OnInit {

    @Input() data: any[];
    @Input() loading: boolean;

    private gridApi: GridApi;
    public extraOption = {};

    public customGridOption: GridOptions = {
        defaultColDef: {
            filter: 'agSetColumnFilter',
            enableCellChangeFlash: false,
            floatingFilter: true,
            width: 100,
            cellStyle: params => {
                return typeof params.value === 'number' &&
                    params.colDef.field.toLowerCase().includes('id') === false ?
                    {'justify-content': 'flex-end'} : { };
            }
        },
        columnDefs: [
            {headerName: 'PodName', field: 'PodName'},
            {headerName: 'MacroTheme', field: 'MacroTheme'},
            {headerName: 'TradeName', field: 'TradeName', width: 150},
            {headerName: 'Notional', field: 'Notional', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(0)},
            {headerName: 'Quantity', field: 'Quantity', valueFormatter: this.utilityService.formatNumberWithCommasAndDigitAdvanceDynamic(0)},
            {headerName: 'EstimateCurrentFace', field: 'EstimateCurrentFace'},
        ]
    }

    constructor(private utilityService: UtilityService) { 
        this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit() {
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
    }

}
