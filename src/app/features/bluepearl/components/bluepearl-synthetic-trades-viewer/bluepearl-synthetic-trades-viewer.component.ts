import {
  ChangeDetectionStrategy,
  Component,
  Input
} from "@angular/core";
import { Store } from "@ngrx/store";
import { GridApi, ColumnApi, GridOptions } from "ag-grid-community";
import moment from "moment";
import { AppGridCustomStatusBarCellValueComponent } from "src/app/components";

@Component({
  selector: "app-bluepearl-synthetic-trades-viewer",
  templateUrl: "./bluepearl-synthetic-trades-viewer.component.html",
  styleUrls: ["./bluepearl-synthetic-trades-viewer.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BluePearlSyntheticTradesViewer {
  
    @Input() syntheticTradeData;

    public extraOption = { autoSizeColumns: true };
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;

    public customGridOption: GridOptions = {
      defaultColDef: {
        suppressMenu: true,
        cellClass: "right-border-light",
        headerClass: "ag-header-wrap",
        editable: false,
      },
      floatingFilter: true,
      rowClass:'small-row',
      rowHeight: 16,
      suppressNoRowsOverlay: true,
      columnDefs: [
        { headerName: "Migration Date", field: "MigrationDate", valueFormatter: params => moment.utc(params.value).format('MM/DD/YYYY') },
        { headerName: "CRD Trade Date", field: "CRDTradeDate", valueFormatter: params => moment.utc(params.value).format('MM/DD/YYYY') },
        { headerName: "Fund Name", field: "FundName"},
        { headerName: "Sec Name", field: "SecurityName" },
        { headerName: "CRD Custodian", field: "CRDCustodian" },
        { headerName: "Pod Name", field: "PodName"},
        { headerName: "Trade Name", field: "TradeName" },
        { headerName: "CRD Settle Date", field: "CRDSettleDate",valueFormatter: params => moment.utc(params.value).format('MM/DD/YYYY') },
        { headerName: "CRD Broker", field: "CRDBroker" },
        { headerName: "CRD Sec Type", field: "CRDSecurityType" },
        { headerName: "CRD Trans Type", field: "CRDTransType"},
        { headerName: "CRD Notional", field: "CRDNotional" },
        { headerName: "CRD Exec Qty", field: "CRDExecQty" },
        { headerName: "Tax Lot Qty", field: "TaxLotQty"},
        { headerName: "FundId", field: "FundId" },
        { headerName: "PodId", field: "PodId"},
        { headerName: "TID", field: "TID"},
        { headerName: "SID", field: "SID" },
        { headerName: "CRD Trade Id", field: "CRDTradeId" },
        { headerName: "CRD Sec Id", field: "CRDSecId" }
      ],
      statusBar: {
        statusPanels: [
          { statusPanel: 'agAggregationComponent' },
          { statusPanel: 'AppGridCustomStatusBarCellValueComponent' },
        ],
      },
      frameworkComponents: {
        AppGridCustomStatusBarCellValueComponent:
        AppGridCustomStatusBarCellValueComponent,
      },
    };

    constructor() {
      this.customGridCallBack = this.customGridCallBack.bind(this);
    }

    ngOnInit(): void {}

    customGridCallBack(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    }
}
