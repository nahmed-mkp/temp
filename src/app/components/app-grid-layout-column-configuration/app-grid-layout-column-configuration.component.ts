import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ColumnState } from 'ag-grid-community/dist/lib/columnController/columnController';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import * as _ from 'lodash';
import { FormGroup, UntypedFormBuilder, FormControl } from '@angular/forms';
import { startWith, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';


@Component({
  selector: 'app-app-grid-layout-column-configuration',
  templateUrl: './app-grid-layout-column-configuration.component.html',
  styleUrls: ['./app-grid-layout-column-configuration.component.scss']
})
export class AppGridLayoutColumnConfigurationComponent implements OnInit, OnChanges {

  @Input() columnApi: ColumnApi;
  @Input() enrichedColumnState: any;
  @Output() currentModifyLayoutState = new EventEmitter<any>();

  public columnGrouping: any = [];
  public hide: any = [];
  public pinLeft: any = [];
  public pinRight: any = [];
  public show: any = [];
  public groupNames: string[];
  public formatColumnState: any = [];

  public selectedGroup: string;
  // public toolbarForm: FormGroup;

  // public hiddenColumns$: Subject<any[]> = new Subject<any[]>();
  // public visibleColumns$: Subject<any[]> = new Subject<any[]>();

  private gridApi_avaliable: GridApi;
  private gridApi_visiable: GridApi;
  public extraOption = {sizeColumnsToFit: true};
  public customGridOption: GridOptions = {
    columnDefs: [
      {headerName: 'column', field: 'colId', rowDrag: false, filter: 'agTextColumnFilter', checkboxSelection: true,
       floatingFilter: true, sort: 'asc',
        comparator: (valueA, valueB, nodeA, nodeB) => {
          // const headnameNameA = this.columnApi.getColumn(valueA).getColDef().headerName;
          // const headnameNameB = this.columnApi.getColumn(valueB).getColDef().headerName;
          // const targetLetterA = headnameNameA[0].toLowerCase();
          // const targetLetterB = headnameNameB[0].toLowerCase();
          // return targetLetterA.charCodeAt(0) - targetLetterB.charCodeAt(0);
          return valueA.toLowerCase().localeCompare(valueB.toLowerCase());
        },
        // valueFormatter: params => this.columnApi.getColumn(params.value).getColDef().headerName,
        valueGetter: params => this.columnApi.getColumn(params.data['colId']).getColDef().headerName,
        filterParams: {
          textCustomComparator: this._customGridFilter,
          debounceMs: 300
      }}
    ],
    headerHeight: 0,
    rowHeight: 25,
    getRowNodeId: data => data.colId,
    animateRows: false,
    rowSelection: 'multiple',
    floatingFiltersHeight: 25,

    // rowDragManaged: false,
    // enableMultiRowDragging: false,
    // suppressMoveWhenRowDragging: true,
  }

  public customGridOption_show: GridOptions = {
    columnDefs: [
      {headerName: 'column', field: 'colId', rowDrag: true, filter: 'agTextColumnFilter', floatingFilter: true, checkboxSelection: true,
        // valueFormatter: params => this.columnApi.getColumn(params.value).getColDef().headerName},
        valueGetter: params => this.columnApi.getColumn(params.data['colId']).getColDef().headerName, 
        filterParams: {textCustomComparator: this._customGridFilter},
      }
    ],
    headerHeight: 0,
    rowHeight: 25,
    getRowNodeId: data => data.colId,
    rowDragManaged: true,
    animateRows: false,
    rowSelection: 'multiple',
    enableMultiRowDragging: true,
    suppressMoveWhenRowDragging: true,
    floatingFiltersHeight: 25,
  }


  constructor(private formBuilder: UntypedFormBuilder) {
    this.getCurrentModifyLayoutState = this.getCurrentModifyLayoutState.bind(this);
    this.customGridCallBack_avaliable = this.customGridCallBack_avaliable.bind(this);
    this.customGridCallBack_visiable = this.customGridCallBack_visiable.bind(this);
  }

  onChanges(): void {
    // this.toolbarForm.get('searchHiddenColumns').valueChanges
    //   .pipe(
    //     startWith(''),
    //     distinctUntilChanged()
    //   )
    //   .subscribe((val) => {
    //     if (val && val.length > 0) {
    //       const searchTerm = val.toLowerCase();
    //       const filteredColumns = this.hide.filter((item) => {
    //         const headerName = this.columnApi.getColumn(item.colId).getColDef().headerName;
    //         return (headerName.toLowerCase().indexOf(searchTerm) >= 0);
    //       });
    //       this.hiddenColumns$.next(filteredColumns);
    //     } else {
    //       this.hiddenColumns$.next(this.hide);
    //     }
    //   });

    // this.toolbarForm.get('searchVisibleColumns').valueChanges
    //   .pipe(
    //     startWith(''),
    //     distinctUntilChanged()
    //   )
    //   .subscribe((val) => {
    //     if (val && val.length > 0) {
    //       const searchTerm = val.toLowerCase();
    //       const filteredColumns = this.show.filter((item) => {
    //         const headerName = this.columnApi.getColumn(item.colId).getColDef().headerName;
    //         return (headerName.toLowerCase().indexOf(searchTerm) >= 0);
    //       });
    //       this.visibleColumns$.next(filteredColumns);
    //     } else {
    //       this.visibleColumns$.next(this.show);
    //     }
    //   });
  }

  ngOnInit() {
    this.currentModifyLayoutState.emit(this.getCurrentModifyLayoutState);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.enrichedColumnState && changes.enrichedColumnState.currentValue) {
      this.parseColumnState(this.enrichedColumnState);
      setTimeout(() => {
        this.onSelectedGroupChange(this.groupNames[0]);

      }, 1000);
    }
  }

  public customGridCallBack_avaliable(params) {
    this.gridApi_avaliable = params.api;
  }

  public customGridCallBack_visiable(params) {
    this.gridApi_visiable = params.api;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.previousContainer.id === 'row-group-list' || event.container.id === 'row-group-list') {
        // does not allow cross dragging between rowGroupList to other list
        return;
      } else {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
    }
  }

  public onSelectedGroupChange(targetGroup) {
    const prevGroup = this.selectedGroup;
    if (prevGroup) {
      this.adjustVisibilityAndOrder(prevGroup);
    }
    this.selectedGroup = targetGroup;
    this.hide = [];
    if (targetGroup === 'All Columns') {
      Object.keys(this.formatColumnState).forEach(key => this.hide = [...this.hide, ...this.formatColumnState[key]]);
    } else {
      this.hide = this.formatColumnState[targetGroup] || [];
    }
  }

  private parseColumnState(enrichedColumnState) {

    this.groupNames = _.uniqBy(enrichedColumnState, 'group').map(item => item.group);
    this.groupNames = ['All Columns', ...this.groupNames];
    this.show = enrichedColumnState.filter(col => col.hide === false);

    this.formatColumnState = _.groupBy(enrichedColumnState, 'group');
    this.groupNames.forEach(name => {
      if (name !== 'All Columns') {
        this.formatColumnState[name] = this.formatColumnState[name].filter(col => col.hide === true).sort((a, b) => a.order - b.order);
      }
    });
    // this.groupNames = this.groupNames.filter(name => name !== 'All Columns').sort((nameA, nameB) => {this.formatColumnState[nameA][0].order - this.formatColumnState[nameB][0].order);
    // this.groupNames.sort((nameA, nameB) => this.formatColumnState[nameA][0].order - this.formatColumnState[nameB][0].order);
  }

  private getCurrentModifyLayoutState() {

    this.adjustVisibilityAndOrder(this.selectedGroup);

    let result = [];
    this.groupNames.forEach(name => {
      if (name !== 'All Columns' && this.formatColumnState[name]) {
        result = [...result, ...this.formatColumnState[name]];
      }
    });
    const showCol = [];
    this.gridApi_visiable.forEachNode(node => showCol.push(node.data));

    result = [...showCol, ...result, ...this.pinLeft, ...this.pinRight];
    // finalize order 
    result.forEach((col, index) => {
      col.order = index;
    })
    return result;
  }

  private adjustVisibilityAndOrder(targetGroup) {

    this.gridApi_visiable.forEachNode((node, index) => {
      node.data['hide'] = false;
    });


    const tempHide = [];
    this.gridApi_avaliable.forEachNode((node, index) => {
      node.data['hide'] = true;
      tempHide.push(node.data);
    });
    if (targetGroup !== 'All Columns') {
      this.formatColumnState[targetGroup] = [...tempHide];
    } else {
      this.formatColumnState = _.groupBy(tempHide, 'group');
    }
  }

  public movehorizontally(type) {
    if (type === 'leftToRight') {
      const targetRows = this.gridApi_avaliable.getSelectedRows();
      this.gridApi_avaliable.applyTransaction({remove: targetRows});
      this.gridApi_visiable.applyTransaction({add: targetRows});
      if (targetRows.length > 0) {
        setTimeout(() => {
          const targetNodes = targetRows.map(row => this.gridApi_visiable.getRowNode(row.colId));
          this.gridApi_visiable.ensureNodeVisible(targetNodes[targetNodes.length - 1]);
          targetNodes.forEach(node => node.setSelected(true))
        }, 100);
      }
    } else if (type === 'rightToLeft') {
      const targetRows = this.gridApi_visiable.getSelectedRows();
      this.gridApi_visiable.applyTransaction({remove: targetRows});

      targetRows.forEach(row => {
        if (row.group === this.selectedGroup) {
          this.gridApi_avaliable.applyTransaction({add: [row]});
        } else {
          if (this.selectedGroup === 'All Columns') {
            this.gridApi_avaliable.applyTransaction({add: [row]});
          } else {
            row.hide = true;
            if (this.formatColumnState[row.group]) {
              this.formatColumnState[row.group].push(row);
            } else {
              this.formatColumnState[row.group] = [];
              this.formatColumnState[row.group].push(row);
            }
          }
        }
      });
    }
  }

  private _customGridFilter(filter: string, value: string, filterText: string): boolean {
    const filterTextLowerCase_tokens = filterText.toLowerCase().split(' ');
    const valueLowerCase = value.toString().toLowerCase();

    const result = filterTextLowerCase_tokens.every(token => {
      if (token === 'vol' || token === 'sigma') {
        return valueLowerCase.includes('vol') || valueLowerCase.includes('σ');
      } else {
        return valueLowerCase.includes(token);
      }
    });
    
    return result;
  }
}
