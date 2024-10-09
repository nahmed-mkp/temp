import { Component, OnInit, Input, OnChanges, SimpleChanges, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { GridApi, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-app-grid-layout-basic-row-grouping-configuration',
  templateUrl: './app-grid-layout-basic-row-grouping-configuration.component.html',
  styleUrls: ['./app-grid-layout-basic-row-grouping-configuration.component.scss']
})
export class AppGridLayoutBasicRowGroupingConfigurationComponent implements OnInit, OnChanges {

  @Input() currentGroupings: string[] = [];
  @Input() availableGroupings: string[] = [];

  @Output() currentModifyRowGrouping = new EventEmitter<any>();

  private gridApi_avaliable: GridApi;
  private gridApi_visiable: GridApi;
  public extraOption = {sizeColumnsToFit: true};
  public enrichCurrentGroupings: any[];
  public enrichAvailableGroupings: any[];

  public customGridOption_avaliable: GridOptions = {
    columnDefs: [
      {headerName: 'Column', field: 'colId', rowDrag: false, filter: 'text', 
        floatingFilter: true, checkboxSelection: true, sort: 'asc'}
    ],
    headerHeight: 0,
    rowHeight: 25,
    animateRows: false,
    rowSelection: 'multiple',
    getRowNodeId: data => data.colId,
  }

  public customGridOption_show: GridOptions = {
    columnDefs: [
      {headerName: 'column', field: 'colId', rowDrag: true, filter: 'text', 
        floatingFilter: true, checkboxSelection: true}
    ],
    headerHeight: 0,
    rowHeight: 25,
    animateRows: false,
    rowSelection: 'multiple',
    rowDragManaged: true,
    enableMultiRowDragging: true,
    suppressMoveWhenRowDragging: true,
    getRowNodeId: data => data.colId,
  }

  constructor(private ref: ChangeDetectorRef) {
    this.customGridCallBack_avaliable = this.customGridCallBack_avaliable.bind(this);
    this.customGridCallBack_visiable = this.customGridCallBack_visiable.bind(this);
    this.getCurrentModifyRowGrouping = this.getCurrentModifyRowGrouping.bind(this);
  }

  ngOnInit() {
    this.currentModifyRowGrouping.emit(this.getCurrentModifyRowGrouping);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.currentGroupings && changes.currentGroupings.currentValue) {
      this.enrichCurrentGroupings = this._enrichData(changes.currentGroupings.currentValue);
    }

    if (changes.availableGroupings && changes.availableGroupings.currentValue) {
      let filterAvaiableGroupings
      if (this.currentGroupings) {
        filterAvaiableGroupings = this._filterGroupings(changes.availableGroupings.currentValue, this.currentGroupings);
      } else {
        filterAvaiableGroupings = changes.availableGroupings.currentValue;
      }
      this.enrichAvailableGroupings = this._enrichData(filterAvaiableGroupings);
    }
  }


  public customGridCallBack_avaliable(params) {
    this.gridApi_avaliable = params.api;
  }

  public customGridCallBack_visiable(params) {
    this.gridApi_visiable = params.api;
  }


  public movehorizontally(type) {
    if (type === 'leftToRight') {
      const targetRows = this.gridApi_avaliable.getSelectedRows();
      this.gridApi_avaliable.applyTransaction({remove: targetRows});
      this.gridApi_visiable.applyTransaction({add: targetRows});
      setTimeout(() => this.ref.markForCheck(), 1000);
      
    } else if (type === 'rightToLeft') {
      const targetRows = this.gridApi_visiable.getSelectedRows();
      this.gridApi_avaliable.applyTransaction({add: targetRows});
      this.gridApi_visiable.applyTransaction({remove: targetRows});
      this.gridApi_visiable.deselectAll();
    }
  }

  public getCurrentModifyRowGrouping(): string[] {
    const currentGroupingRow = [];
    this.gridApi_visiable.forEachNode((node, index) => {
      currentGroupingRow.push(node.data['colId']);
    });
    return currentGroupingRow;
  }

  public _enrichData(data: string[]) {
    const enrichData = data.map(element => {
      return {colId: element}
    });
    return enrichData;
  }

  public _filterGroupings(sourceValue: string[], filterValues: string[]) {
    return sourceValue.filter(value => filterValues.includes(value) === false);
  }

}
