import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ColumnState } from 'ag-grid-community/dist/lib/columnController/columnController';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-app-grid-layout-row-grouping-configuration',
  templateUrl: './app-grid-layout-row-grouping-configuration.component.html',
  styleUrls: ['./app-grid-layout-row-grouping-configuration.component.scss']
})
export class AppGridLayoutRowGroupingConfigurationComponent implements OnInit {

  @Input() currentRowGroupings: ColumnState[];
  @Input() avaliableRowGroupings: ColumnState[];
  @Input() columnApi: ColumnApi;

  @Output() currentModifyRowGrouping = new EventEmitter<any>();

  public available: any = [];
  public show: any = [];

  public avaliableGroupings = [
    'agency',
    'dealer',
    'marketTicker',
    'parentListName',
    'podName',
    'tradeName'
  ];

  private gridApi_avaliable: GridApi;
  private gridApi_visiable: GridApi;

  public extraOption = {sizeColumnsToFit: true};
  public customGridOption_avaliable: GridOptions = {
    columnDefs: [
      {headerName: 'column', field: 'colId', rowDrag: false, filter: 'text', floatingFilter: true, checkboxSelection: true,
        sort: 'asc',
        comparator: (valueA, valueB, nodeA, nodeB) => {
          const headnameNameA = this.columnApi.getColumn(valueA).getColDef().headerName;
          const headnameNameB = this.columnApi.getColumn(valueB).getColDef().headerName;
          const targetLetterA = headnameNameA[0].toLowerCase();
          const targetLetterB = headnameNameB[0].toLowerCase();
          return targetLetterA.charCodeAt(0) - targetLetterB.charCodeAt(0);
        },
        valueFormatter: params => this.columnApi.getColumn(params.value).getColDef().headerName}
    ],
    headerHeight: 0,
    rowHeight: 25,
    getRowNodeId: data => data.colId,
    animateRows: false,
    rowSelection: 'multiple',
    // rowDragManaged: true,
    // enableMultiRowDragging: true,
    // suppressMoveWhenRowDragging: true,
  }

  public customGridOption_show: GridOptions = {
    columnDefs: [
      {headerName: 'column', field: 'colId', rowDrag: true, filter: 'text', floatingFilter: true, checkboxSelection: true,
        valueFormatter: params => this.columnApi.getColumn(params.value).getColDef().headerName}
    ],
    headerHeight: 0,
    rowHeight: 25,
    getRowNodeId: data => data.colId,
    animateRows: false,
    rowSelection: 'multiple',
    rowDragManaged: true,
    enableMultiRowDragging: true,
    suppressMoveWhenRowDragging: true,
  }



  constructor(private ref: ChangeDetectorRef) {
    this.getCurrentModifyRowGrouping = this.getCurrentModifyRowGrouping.bind(this);
    this.customGridCallBack_avaliable = this.customGridCallBack_avaliable.bind(this);
    this.customGridCallBack_visiable = this.customGridCallBack_visiable.bind(this);
  }

  ngOnInit() {
    this.currentModifyRowGrouping.emit(this.getCurrentModifyRowGrouping);

    // setTimeout(() => this.setupCrossGridDragAndDrop(), 1000)
  }

  // drop(event: CdkDragDrop<string[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(event.previousContainer.data,
  //                       event.container.data,
  //                       event.previousIndex,
  //                       event.currentIndex);
  //   }
  // }

  getCurrentModifyRowGrouping() {
    const currentGroupingRow = [];
    this.gridApi_visiable.forEachNode((node, index) => node.data['rowGroupIndex'] = index);
    this.gridApi_avaliable.forEachNode((node, index) => node.data['rowGroupIndex'] = null)
    
    // this.currentRowGroupings.forEach((column, index) => column.rowGroupIndex = index);
    // this.avaliableRowGroupings.forEach(column => column.rowGroupIndex = null);

    return this.currentRowGroupings;
  }

  public movehorizontally(type) {
    if (type === 'leftToRight') {
      const targetRows = this.gridApi_avaliable.getSelectedRows();
      this.gridApi_avaliable.applyTransaction({remove: targetRows});
      this.gridApi_visiable.applyTransaction({add: targetRows});
      setTimeout(() => this.ref.markForCheck(), 1000);
      // this.gridApi_avaliable.deselectAll();
      // console.log('what is the selected row', this.gridApi_avaliable.getSelectedRows());
      
    } else if (type === 'rightToLeft') {
      const targetRows = this.gridApi_visiable.getSelectedRows();
      this.gridApi_avaliable.applyTransaction({add: targetRows});
      this.gridApi_visiable.applyTransaction({remove: targetRows});
      this.gridApi_visiable.deselectAll();
    }
  }

  public customGridCallBack_avaliable(params) {
    this.gridApi_avaliable = params.api;
  }

  public customGridCallBack_visiable(params) {
    this.gridApi_visiable = params.api;
  }

  // private setupCrossGridDragAndDrop() {
  //   const visibleGridDropZone = this.gridApi_visiable.getRowDropZoneParams({
  //     onDragStop: params => {
  //       console.log('there is some row dragging happen', params);
  //       this.gridApi_avaliable.applyTransaction({remove: params.nodes.map(node => node.data)});
  //     }
  //   });
  //   this.gridApi_avaliable.addRowDropZone(visibleGridDropZone);

  //   const availableGridDropZone = this.gridApi_avaliable.getRowDropZoneParams({
  //     onDragStop: params => {
  //       // console.log('there is some row dragging happen', params)
  //       this.gridApi_visiable.applyTransaction({remove: params.nodes.map(node => node.data)});
  //     }
  //   });
  //   this.gridApi_visiable.addRowDropZone(availableGridDropZone);
  // }
}
