import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { GridOptions, RowSelectedEvent, CellEditingStoppedEvent, GridApi } from 'ag-grid-community';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';

import * as fromModels from './../../models';
import { EventAnalysisCreateCalenderDialogComponent } from '../event-analysis-create-calender-dialog/event-analysis-create-calender-dialog.component';

@Component({
  selector: 'app-event-analysis-event-calendar-management-dialog',
  templateUrl: './event-analysis-event-calendar-management-dialog.component.html',
  styleUrls: ['./event-analysis-event-calendar-management-dialog.component.scss']
})
export class EventAnalysisEventCalendarManagementDialogComponent implements OnInit, OnChanges {

  @Input() eventCalendars: fromModels.ICalendar[];
  @Input() activeEventCalenderDates: string[];
  @Input() selectedCalenderName: string;
  @Input() activeConfiguration: fromModels.Configuration;

  @Output() updateSelectedCalendar = new EventEmitter<fromModels.ICalendar>();
  @Output() deleteSelectedCalendar = new EventEmitter<fromModels.ICalendar>();
  @Output() updateConfiguration = new EventEmitter<fromModels.Configuration>();

  @Output() loadSelectedCalenderDate = new EventEmitter<fromModels.ICalendar>();
  @Output() addNewDate = new EventEmitter<fromModels.ICalendarDate>();
  @Output() deleteDate = new EventEmitter<fromModels.ICalendarDate>();

  private gridApi: GridApi;

  public formatedTreeCalenderData: any;
  public formatedCalenderDate: {date: string}[];
  public newDate: string;
  public activeCalendar: fromModels.ICalendar;
  public treeMode = true;

  public customGridOption_detailMode: GridOptions = {
    columnDefs: [
      {headerName: 'Type', field: 'type', filter: 'agTextColumnFilter', width: 80, enableRowGroup: true},
      {headerName: 'Region', field: 'region', filter: 'agTextColumnFilter', width: 80, enableRowGroup: true},
      {headerName: 'Group', field: 'groupName', filter: 'agTextColumnFilter', enableRowGroup: true},
      {headerName: 'Owner', field: 'owner', filter: 'agTextColumnFilter', enableRowGroup: true},
      {headerName: 'Name', field: 'name', filter: 'agTextColumnFilter', editable: true},
    ],
    floatingFilter: true,
    getContextMenuItems: (params) => {

      const deleteAction = {
        name: 'Delete',
        action: () => {
          this.onDeleteCalendar(params.node.data);
        }
      };
      const createAction = {
        name: 'Create',
        action: () => {
          console.log('create new calendar incoming', params);
          if (params.node.data === undefined && params.node.allLeafChildren.length > 0) {
             this.onCreateNewCalender(params.node.allLeafChildren[0].data);
          } else if (params.node.data) {
             this.onCreateNewCalender(params.node.data);
          } else {
            alert('Could not create a new calender');
          }
        }
      };

      return ['copy', 'copyWithHeaders', 'separator', createAction, deleteAction];
    },

    onRowClicked: this.onRowSelected.bind(this),
    onCellEditingStopped: this.onUpdateCalendar.bind(this),
    rowGroupPanelShow: 'always'
  };

  public customGridOption_treeMode: GridOptions = {
    columnDefs: [
      {headerName: 'Name', field: 'name', filter: 'agTextColumnFilter', editable: true},
    ],
    autoGroupColumnDef: {
      headerName: 'Hierarchy',
      cellRendererParams: {
        suppressCount: true,
        innerRenderer: 'iconRender',
      },
      cellStyle: (params) => {
        if (params.node.canFlower === false) {
          return {'justify-content': 'flex-end', 'padding-right': 0};
        }
      },
      width: 230,
      suppressSizeToFit: true
    },

    floatingFilter: true,

    getDataPath: (data) => data.orgHierarchy,
    groupDefaultExpanded: 0,
    treeData: true,
    components: {
      iconRender: this.getIconRender()
    },

    getContextMenuItems: (params) => {

      const deleteAction = {
        name: 'Delete',
        action: () => {
          this.onDeleteCalendar(params.node.data);
        }
      };
      const createAction = {
        name: 'Create',
        action: () => {
          console.log('create new calendar incoming', params);
          if (params.node.data === undefined && params.node.allLeafChildren.length > 0) {
             this.onCreateNewCalender(params.node.allLeafChildren[0].data);
          } else if (params.node.data) {
             this.onCreateNewCalender(params.node.data);
          } else {
            alert('Could not create a new calender');
          }
        }
      };

      return ['copy', 'copyWithHeaders', 'separator', createAction, deleteAction];
    },

    onRowClicked: this.onRowSelected.bind(this),
    onCellEditingStopped: this.onUpdateCalendar.bind(this)
  };

  public customGridOption_date: GridOptions = {
    columnDefs: [
      {headerName: 'Date', field: 'date', filter: 'agTextColumnFilter', sort: 'desc', comparator: (valueA, valueB) => {
        const dateA = new Date(valueA);
        const dateB = new Date(valueB);
        return dateA.getTime() - dateB.getTime();
      }},
    ],
    floatingFilter: true,

    getContextMenuItems: (params) => {
      const deleteAction = {
        name: 'Delete',
        action: () => {
          this.onDeleteDate(params.value);
        }
      };

      return ['copy', 'copyWithHeaders', 'separator', deleteAction];
    }
  };

  public extraOption_treeMode = {
    sizeColumnsToFit: true
  };

  public extraOption_detailMode = {
    autoSizeColumns: true
  };

  constructor(private dialog: MatDialog) {
    this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnInit() {
    this.formatedTreeCalenderData = this.formatDataPath(this.eventCalendars);
    this.formatedTreeCalenderData = this.enrichDataForFilter(this.formatedTreeCalenderData);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.activeEventCalenderDates && changes.activeEventCalenderDates.currentValue) {
      this.formatedCalenderDate = this.activeEventCalenderDates.map((date) => {
        return {date: date};
      });
    }

    if (changes.eventCalendars && changes.eventCalendars.currentValue) {
      this.formatedTreeCalenderData = this.formatDataPath(this.eventCalendars);
      this.formatedTreeCalenderData = this.enrichDataForFilter(this.formatedTreeCalenderData);
      if (this.selectedCalenderName) {
        this.activeCalendar = this.formatedTreeCalenderData.filter(calendar => {
          return calendar.name === this.selectedCalenderName;
        })[0];
      }
    }
  }

  onModeSwitch() {
    this.treeMode = !this.treeMode;
  }


  // CRUD -----------------------------------------------

  onUpdateCalendar(event: CellEditingStoppedEvent) {
    this.updateSelectedCalendar.emit(event.data);
  }

  onDeleteCalendar(calendar: fromModels.ICalendar) {
    this.deleteSelectedCalendar.emit(calendar);
  }

  onRowSelected(event: RowSelectedEvent) {
    if (event.node.data) {
      this.activeCalendar = event.node.data;
      this.loadSelectedCalenderDate.emit(this.activeCalendar);
    }
  }

  onAddNewDate() {
    const newDateArray = this.newDate.split(' ');
    newDateArray.forEach(newDate => {
      this.addNewDate.emit({
        calendarId: this.activeCalendar.id,
        date: newDate
      });
    });
    this.newDate = null;
  }

  onDeleteDate(date: string) {
    this.deleteDate.emit({calendarId: this.activeCalendar.id, date: date});
  }

  onCreateNewCalender(data: any) {
    this.dialog.open(EventAnalysisCreateCalenderDialogComponent, {
      hasBackdrop: false,
      panelClass: 'event-analysis-pop-up-panel',
      data: {
        groupId: data.groupId,
        type: data.type,
        owner: data.owner
      },
      width: '20rem',
    });
  }

  onApplyNewCalenderName() {
    this.activeConfiguration.eventCalender = this.activeCalendar.name;
    if (this.activeConfiguration.daysAfter === undefined && this.activeConfiguration.daysAfter === undefined) {
      this.activeConfiguration.daysBefore = 10;
      this.activeConfiguration.daysAfter = 10;
    }
    this.updateConfiguration.emit(this.activeConfiguration);
  }


  // Uility --------------------------------------------------------------------------

  getIconRender() {
    class IconRender {
      private eGui;

      init(params) {
        const tempDiv = document.createElement('div');

        if (params.node.canFlower === false) {
          tempDiv.innerHTML = `<span class="icon-cell"><i class='material-icons' style='color: #3f51b5 '>event_note</i></span>`;
        } else {
          tempDiv.innerHTML = `<span class="icon-cell"><i class='material-icons' style='color: #f2ca00'>folder</i><i>${params.value}</i></span>`;
        }
        this.eGui = tempDiv.firstChild;
      }

      getGui() {
        return this.eGui;
      }
    }

    return IconRender;
  }

  customGridCallBack(params) {
    this.gridApi = params.api;

    // if there is pre-selected calender name from configuration panel, select it and load the date
    if (this.activeCalendar) {
      this.bringSelectedCalenderNameInView();
    }
  }

  bringSelectedCalenderNameInView() {
    this.gridApi.forEachLeafNode(rowNode => {
      if (rowNode.data.name === this.activeCalendar.name) {
        rowNode.setSelected(true);
        let rowNodeParent = rowNode.parent;
        while (rowNodeParent) {
          rowNodeParent.setExpanded(true);
          rowNodeParent = rowNodeParent.parent;
        }
        this.gridApi.ensureIndexVisible(rowNode.rowIndex);
      }
    });
    this.loadSelectedCalenderDate.emit(this.activeCalendar);
  }

  handleKeyUpEvent(event) {
    const code = event.keyCode;
    // check if enter key is press
    if (code === 13) {
      this.onAddNewDate();
    }
  }

  formatDataPath(eventCalendars: fromModels.ICalendar[]) {
    const result = eventCalendars.map(eventCalendar => {
      const path = eventCalendar.folderPath.split('\\');
      // console.log('path', path);
      if (path.length === 3 && path[1] === 'public') {
        path.splice(2, 0, 'Misc');
      }
      path.shift();
      return Object.assign({}, eventCalendar, {orgHierarchy: path});
    });
    return result;
  }

  enrichDataForFilter(eventCalendars: fromModels.ICalendar[]) {
      const result = eventCalendars.map(eventCalendar => {
        if (eventCalendar.type === 'public') {
          if (eventCalendar.orgHierarchy.length >= 3) {
            return Object.assign({}, eventCalendar, {region: eventCalendar.orgHierarchy[1]});
          }
        } else {
          return Object.assign({}, eventCalendar);
        }
      });
      // console.log('enrich data', result);
      return result;
  }
}