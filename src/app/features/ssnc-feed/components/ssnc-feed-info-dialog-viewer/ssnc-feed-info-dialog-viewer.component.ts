import { Component, Inject, OnDestroy } from "@angular/core";
import {
    MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
    MatLegacyDialogRef as MatDialogRef,
} from "@angular/material/legacy-dialog";
import { Store } from "@ngrx/store";
import { ColumnApi, GridApi, GridOptions } from "ag-grid-community";
import { Observable, Subscription } from "rxjs";
import * as fromStore from "../../store";

@Component({
  selector: "app-ssnc-feed-info-dialog-viewer",
  templateUrl: "./ssnc-feed-info-dialog-viewer.component.html",
  styleUrls: ["./ssnc-feed-info-dialog-viewer.component.scss"],
})
export class SSNCFeedDialogInfoViewer implements OnDestroy{

  public additionalData: any[];
  public extraOption = { sizeColumnsToFit: true };

  public subscriptions: Subscription[] = [];
  public additionalData$: Observable<any>;

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  public customGridOption: GridOptions = {
    defaultColDef: {
      cellClass: "right-border-light",
      headerClass: "ag-header-wrap",
      filter: "agTextColumnFilter",
      editable: false,
      enableCellChangeFlash: false,
    },
    getRowNodeId: (data) => data["ClientReference"],
    floatingFilter: true,
    columnDefs: [
      { headerName: "Client Reference", field: "ClientReference" },
      { headerName: "Create Date", field: "CreateDate" },
      { headerName: "Erorrs", field: "Errors" },
      { headerName: "Status", field: "Status" },
    ],
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<SSNCFeedDialogInfoViewer>,
    private store: Store<fromStore.State>
  ) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
    this.additionalData$ = this.store.select(
      fromStore.getAdditionalSSNCFeedData
    );

    this.subscriptions.push(
      this.additionalData$.subscribe((extraData) => {
        if (extraData) {
          this.additionalData = extraData;
        }
      })
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
}
