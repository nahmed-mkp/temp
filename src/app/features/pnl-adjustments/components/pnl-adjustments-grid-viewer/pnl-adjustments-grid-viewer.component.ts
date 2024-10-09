import { ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromModels from "../../models";
import * as fromStore from "../../store";
import { MatTabChangeEvent } from "@angular/material/tabs";
import moment from "moment";
import { GridApi, ColumnApi, GridOptions, RowNode } from "ag-grid-community";
import { AppCustomGridCellCheckboxComponent } from "src/app/components";
import { isNumber } from "highcharts";
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { PnlAdjustmentsUploadDialogViewerComponent } from "../upload-dialog-viewer/pnl-adjustments-upload-dialog-viewer.component";
import { UtilityService } from "src/app/services";
import { PnlDownloadButtonCellRendererComponent } from "../download-btn-cell-renderer/download-btn-cell-renderer.component";

@Component({
  selector: "app-pnl-adjustments-grid-viewer",
  templateUrl: "./pnl-adjustments-grid-viewer.component.html",
  styleUrls: ["./pnl-adjustments-grid-viewer.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PnlAdjustmentsGridViewerComponent implements OnInit {
  
  @Input() adjustmentsData: any;
  @Input() adjustmentsDataLoading: boolean;

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  public extraOption = { };
  public customGridOption: GridOptions = {
    defaultColDef: {
      suppressMenu: true,
      cellClass: "right-border-light",
      headerClass: "ag-header-wrap",
      filter: "agSetColumnFilter",
      editable: false,
      enableCellChangeFlash: false,
      flex: 1,
      cellStyle: params => {
        if(isNumber(params.value)) {
          return { 'justify-content': 'flex-end' };
        }
      }
    },
    statusBar: {
      statusPanels: [
          {
              statusPanel: 'agAggregationComponent',
              statusPanelParams: {
                  aggFuncs: ['sum', 'min', 'max', 'count', 'avg']
              }
          },
      ],
  },
    getRowNodeId: (data) => data["Id"],
    context: this,
    floatingFilter: true,
    rowHeight: 26,
    rowClass: "medium-row",
    rowSelection: "single",

    getContextMenuItems: params => {

      const uploadSupportingDocs = {
          name: 'Upload Supporting Docs',
          icon: '<i class="material-icons small-menu-icon">construction</i>',
          action: () => {
            const path = this.uploadSupportingDocs(params.node);
              // const targetColumnIndex = this.columns.indexOf(params.column.getColId());
              // setTimeout(() => alert('Nonlinear Data Path is: ' + path + '\n targetColumn Index: ' + targetColumnIndex), 100);
          }
        };
      if(this.getSelectedRowIds().length === 0){
        return ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport'];
      }
      else {
        return ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport', 'separator', uploadSupportingDocs];
      }
    },

    columnDefs: [
      {
        headerName: "Select",
        field: "selected",
        width: 60,
        maxWidth: 60,
        minWidth: 60,
        pinned: "left",
        editable: true,
        filter: false,
        cellStyle: { paddingLeft: "0.3rem" },
        cellClass: "yellow-cell right-border-light",
        cellEditor: "agCheckboxCellEditor",
        cellRenderer: "AppCustomGridCellCheckboxComponent",
        cellRendererParams: { editable: true },
      },
      {
        headerName: "Adjustment Date",
        field: "AdjustmentDate",
        valueFormatter: (params) => {
          return moment(params.value).format("MM/DD/YYYY");
        },
        cellStyle:  { 'justify-content': 'flex-start' }
      },
      {
        headerName: "Level",
        field: "Level",
      },
      {
        headerName: "Fund Name",
        field: "FundName",
      },
      {
        headerName: "Pod Name",
        field: "PodName",
      },
      {
        headerName: "Trade Name",
        field: "TradeName",
      },
      {
        headerName: "Security Name",
        field: "SecurityName",
        pinned: "left",
      },
      {
        headerName: "Adjustment Security",
        field: "AdjustmentSecurity",
      },
      {
        headerName: "Adjustment Amount",
        field: "AdjustmentAmount",
        filter: "agTextColumnFilter",
        valueFormatter: this.utilityService.formatNumberWithCommasAndDigit(0)
      },
      {
        headerName: "Remarks",
        field: "Remarks",
      },
      {
        headerName: "Description",
        field: "Description",
      },
      {
        headerName: "Created By",
        field: "CreatedBy",
      },
      {
        headerName: "Created On",
        field: "CreatedOn",
        filter: "agTextColumnFilter",
        valueFormatter: (params) => {
          return moment(params.value).format("MM/DD/YYYY HH:mm:ss");
        },
        cellStyle:  { 'justify-content': 'flex-start' }
      },
      {
        headerName: "Updated By",
        field: "UpdatedBy",
      },
      {
        headerName: "Updated On",
        field: "UpdatedOn",
        filter: "agTextColumnFilter",
        valueFormatter: (params) => {
          return moment(params.value).format("MM/DD/YYYY HH:mm:ss");
        },
        cellStyle:  { 'justify-content': 'flex-start' }
      },
      {
        headerName: "Apply To",
        field: "ApplyTo",
      },
      { 
        headerName: 'Attachments',
        field: 'Attachments',
        width: 80,
        maxWidth: 80, 
        minWidth: 80,
        cellRenderer: 'PnlDownloadButtonCellRendererComponent',
      },
      {
        headerName: "Id",
        field: "Id",
      },
      {
        headerName: "Fund Id",
        field: "FundId",
      },
      {
        headerName: "Pod Id",
        field: "PodId",
      },
      {
        headerName: "Trade Id",
        field: "TradeId",
      },
      {
        headerName: "Actual SID",
        field: "ActualSID",
      },
      {
        headerName: "Security Id",
        field: "SecurityId",
      },
      {
        headerName: "PLAdjustType Id",
        field: "PLAdjustTypeId",
      }
    ],
    frameworkComponents: {
      AppCustomGridCellCheckboxComponent: AppCustomGridCellCheckboxComponent,
      PnlDownloadButtonCellRendererComponent: PnlDownloadButtonCellRendererComponent
      
    },
  };

  constructor(private store: Store<fromStore.PnlAdjustmentsState>, private dialog: MatDialog, private utilityService: UtilityService) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.adjustmentsData && changes.adjustmentsData.currentValue && this.gridApi) {
      this.populateGridData();
      
    }
  }

  populateGridData() {
    this.gridApi.setRowData([]);
    this.gridApi.setRowData(this.adjustmentsData);
    this.gridColumnApi.autoSizeAllColumns();
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.populateGridData();
  }

  getSelectedRowIds() {
    let rowIds = [];
    this.gridApi.forEachNode( (node: RowNode) => {
        if(node.data.selected === true){
            rowIds.push(node.data['Id']);
        }
    });
    return rowIds;
}

  uploadSupportingDocs(params) {
    this.dialog.open(PnlAdjustmentsUploadDialogViewerComponent, {
      width: '80rem',
      height: '50rem',
      data: { 
        selectedRowIds: this.getSelectedRowIds()
      }
    })
  }
}
