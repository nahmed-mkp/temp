import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { GridApi, ColumnApi, GridOptions, ColDef, CellMouseOverEvent } from 'ag-grid-community';
import moment from 'moment';
import { UtilityService } from 'src/app/services';
import * as fromStore from '../../store';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { TimeseriesStatisticsRangeCellViewerComponent } from '../cell-renderers/stat-range-graph.renderer';
import { TimeseriesStateValueDateRendererComponent } from '../cell-renderers/stat-value-date.renderer';
import { CellRendererComponent } from 'ag-grid-community/dist/lib/components/framework/componentTypes';
import { TimeseriesStatTooltipRendererComponent } from '../cell-renderers/stat-tooltip-renderer/stat-tooltip-renderer.component';

@Component({
  selector: 'app-timeseries-statistics-viewer',
  templateUrl: './timeseries-statistics-viewer.component.html',
  styleUrls: ['./timeseries-statistics-viewer.component.scss']
})
export class TimeseriesStatisticsViewerComponent implements OnChanges{

  @Input() statData: any[] = [];

  public extraOption = {sizeColumnsToFit: true};

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;
  private currentRowIndexHover: number;
  private dialogRef: MatDialogRef<TimeseriesStatTooltipRendererComponent>;

  public customGridOption: GridOptions = {
      defaultColDef: {
          cellClass: 'right-border-light',
          headerClass: 'ag-header-wrap',
          filter: 'agTextColumnFilter',
          editable: false,
          enableCellChangeFlash: false,
          flex: 1
      },
      getRowNodeId: data => data.index,
      floatingFilter: true,
      suppressNoRowsOverlay: true,
      columnDefs: [],
      suppressFieldDotNotation: true,
      onCellMouseOver: params => {
        if(params.colDef.headerName === 'Range Viewer'){ 
          if(this.currentRowIndexHover !== params.rowIndex){
            this.openToolTip(params);
            this.currentRowIndexHover = params.rowIndex;
          }
        }
      },
      frameworkComponents:{ 
        statisticsRangeCellRenderer: TimeseriesStatisticsRangeCellViewerComponent,
        statisticsValueDateRenderer: TimeseriesStateValueDateRendererComponent,
        statisticsTooltipRenderer: TimeseriesStatTooltipRendererComponent
      }
  };

  constructor(private store: Store<fromStore.State>, private utilities: UtilityService, private dialog: MatDialog) {
      this.customGridCallBack = this.customGridCallBack.bind(this);
  }

  ngOnChanges(changes: SimpleChanges){
    if(this.statData && this.statData.length > 0 && this.gridApi){
      this.generateColDefs();
    }
  }

  customGridCallBack(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    if(this.statData && this.statData.length > 0){
      this.generateColDefs();
    }
  }

  generateColDefs(){
    let keys = Object.keys(this.statData[0])
    keys = [
      "index",
      "count",
      "cur",
      "mean",
      "std",
      "min",
      "max",
      "25%",
      "50%",
      "75%"
  ]
    let colDefs = [];
    keys.map( key => {
      colDefs.push({
        field: key,
        headerName: key === 'index' ? 'Timeseries' : key.charAt(0).toUpperCase() + key.slice(1),
        pivot: key === 'state',
        width : key === 'index' ? 400 : 150,
        valueFormatter: params => {
          if(key !== 'index'){
            if(typeof(params.value) === 'number'){
              if(key === 'count'){
                return Math.round(params.value)
              } 
              else {
                return params.value.toFixed(2)
              }
            }
          }
        },
        cellRendererParams: (params) => { 
          return {
            value: params.value.toFixed(2),
            date: params.colDef.field === 'min' ? params.data['minDate'] :  params.data['maxDate']
          }
        },
        cellRenderer: key === 'min' || key === 'max' ? 'statisticsValueDateRenderer' : null,
      })
    })
    colDefs.push(
      {
        headerName: 'Range Viewer',
        width: 250,
        cellRenderer: 'statisticsRangeCellRenderer',
        cellRendererParams: (params) => { 
          return {
            max: params.data['max'],
            min: params.data['min'],
            mean: params.data['mean'],
            spot: params.data['cur'],
            stdev: params.data['std']
          }
        },
        cellClass: ['left-border', 'right-border'],
        suppressFilter: true
      }
    )
    this.gridApi.setColumnDefs([])
    this.gridApi.setColumnDefs(colDefs)
  }

  
  openDataSummaryToolTip(params) {
    this.dialogRef = this.dialog.open(TimeseriesStatTooltipRendererComponent, {
        hasBackdrop: false,
        panelClass: ['event-analysis-pop-up-panel', 'round-border-radius'],
        width: '10rem',
        height: '7rem',
        position: {
            left: params.event.x.toString() + 'px',
            top: params.event.y.toString() + 'px'
        },
        data: {
            mean: params.data['mean'].toFixed(2),
            max: params.data['max'].toFixed(2),
            min: params.data['min'].toFixed(2),
            spot: params.data['cur'].toFixed(2)
        }
    });
  }


  openToolTip(params: CellMouseOverEvent) {
    if (this.dialogRef) {
      // this.dialog.closeAll();
      this.dialogRef.close();
    }
    if(params.colDef.headerName.includes('Range Viewer')) {
        this.openDataSummaryToolTip(params);
    }
  }

  onMouseLeave() {
    if (this.dialog) {
        this.currentRowIndexHover = -1;
        this.dialog.closeAll();
        this.dialogRef.close();
    }
  }


}