import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Column, GridApi, ColumnApi, ColDef, ColGroupDef } from 'ag-grid-community';
import * as _ from 'lodash';
import { ColumnState } from 'ag-grid-community/dist/lib/columnController/columnController';

@Component({
  selector: 'app-app-grid-layout-management',
  templateUrl: './app-grid-layout-management.component.html',
  styleUrls: ['./app-grid-layout-management.component.scss']
})
export class AppGridLayoutManagementComponent implements OnInit {

  private gridApi: GridApi;
  private colDefs: ColGroupDef[];

  public layoutState: ColumnState[];
  public columnApi: ColumnApi;
  public currentRowGroupings: ColumnState[];
  public avaliableRowGroupings: ColumnState[];
  public enrichedColumnState: any;

  public newLayoutName: string;
  public oldLayoutName: string;
  public getCurrentModifyLayoutState: any;
  public getCurrentModifyRowGrouping: any;
  public default: boolean;
  public isShared: boolean;

  private extraAvaliableRowGroupings = ['fundName', 'podName', 'tradeName'];


  constructor(public dialogRef: MatDialogRef<AppGridLayoutManagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.columnApi = this.data.columnApi;
    this.colDefs = this.data.colDefs;
    this.layoutState = this.columnApi.getColumnState();
    // this.layoutState.shift();
    this.layoutState = this.layoutState.filter(col => col.colId !== 'ag-Grid-AutoColumn');
    this.enrichedColumnState = this.enrichLayoutInfo(this.layoutState, this.colDefs);

    if (this.data.targetLayout) {
      this.newLayoutName = this.data.targetLayout.layoutName;
      this.oldLayoutName = this.data.targetLayout.layoutName;
      this.default = this.data.targetLayout.default;
      this.isShared = this.data.targetLayout.isShared;
    }
    console.log('enrichedColumnState', this.enrichedColumnState, this.colDefs);

    this.currentRowGroupings = this.enrichedColumnState.filter(column => column.rowGroupIndex !== null).sort((a, b) => a.rowGroupIndex - b.rowGroupIndex);
    console.log('current row grouping', this.currentRowGroupings);
    this.avaliableRowGroupings = this.enrichedColumnState.filter(column => {
      return (column.group === 'Grouping' && column.rowGroupIndex === null) || 
      (this.extraAvaliableRowGroupings.indexOf(column.colId) !== -1 && column.rowGroupIndex === null)
    })
    // console.log('rowGroupings', this.currentRowGroupings, this.avaliableRowGroupings);

  }

  onCloseClick(event) {

    const currentLayout = this.getCurrentModifyLayoutState();
    const rowGroupings = this.getCurrentModifyRowGrouping();
    if (event === 'apply'){
      console.log('getCurrentModifyLayoutStat', currentLayout);
      this.columnApi.setColumnState(currentLayout);
      // this.dialogRef.close(); dont close after user hit apply
    } else if (event === 'save') {
      this.columnApi.setColumnState(currentLayout);
      let saveResult = {
        layoutName: this.newLayoutName,
        layout: currentLayout,
        rowGroupings: rowGroupings,
        default: this.default,
        isShared: this.isShared,
      };

      if (this.data.targetLayout && this.newLayoutName === this.oldLayoutName) {
        // meaning the user only make update on the existing layout since layout name did not change
        saveResult = Object.assign({}, this.data.targetLayout, saveResult);
        this.dialogRef.close({action: 'update', layoutName: this.newLayoutName, layout: saveResult});
      } else if (this.data.targetLayout && this.newLayoutName !== this.oldLayoutName) {
        // clone a existed layout
        this.dialogRef.close({action: 'save as', layoutName: this.newLayoutName, layout: saveResult});
      } else if (this.newLayoutName !== this.oldLayoutName) {
        this.dialogRef.close({action: 'update', layoutName: this.newLayoutName, layout: saveResult});
      }
      // console.log('saveResult', saveResult);
      // localStorage.setItem(this.newLayoutName, JSON.stringify(saveResult));
      
    } else if (event === 'delete') {
      // localStorage.removeItem(this.newLayoutName);
      this.dialogRef.close({action: 'delete', layoutName: this.newLayoutName, layout: this.data.targetLayout});
    } else {
      this.dialogRef.close();
    }
  }

  reset() {
    
  }

  private enrichLayoutInfo(layoutState: ColumnState[], colGroups: ColGroupDef[]) {

    const colGroupingInfoDict: any = {};
    colGroups.forEach(group => {
      group.children.forEach((col: ColDef) => {
        colGroupingInfoDict[col.field] = group.headerName;
      });
    });
    
    const enrichGroupInfo = layoutState.map((col: any, index) => {
      col.group = colGroupingInfoDict[col.colId];
      col.order = index;
      return col;
    });
    return enrichGroupInfo;

    // const enrichedColumnState = _.groupBy(enrichGroupInfo, 'group');
    // return enrichedColumnState;
  }

  currentModifyLayoutState(event) {
    this.getCurrentModifyLayoutState = event;
  }

  currentModifyRowGrouping(event) {
    this.getCurrentModifyRowGrouping = event;
  }

}
