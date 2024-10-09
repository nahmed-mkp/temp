import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { CellValueChangedEvent, ColumnApi, GridApi, GridOptions, RowClickedEvent } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';
import { PricingEngineUtilityService } from '../../services';
import * as fromModels from '../../models';
import moment from 'moment';
import { RowNode } from 'ag-grid-community';
import { AppCustomGridCellCheckboxComponent } from "src/app/components";
import { SecurityEditorGeneralDialogComponent } from 'src/app/features/security-editor/containers';
import { PricingEngineRvAutocompleteCellRendererComponent } from './cell-renderers/autocomplete-dropdown/autocomplete-dropdown.component';

@Component({
  selector: 'app-pricing-engine-rv-viewer',
  templateUrl: './pricing-engine-rv-viewer.component.html',
  styleUrls: ['./pricing-engine-rv-viewer.component.scss']
})
export class PricingEngineRvViewerComponent implements OnChanges {
  
    @Input() data: fromModels.IRvDataRes[];
    @Input() loading: boolean;
    @Input() mode: string = 'live';

    @Output() onSecNameSelected = new EventEmitter<fromModels.IMdidEnrichmentReq | fromModels.IDataInputEnrichmentReq>();
    @Output() onSecDeletionRequested = new EventEmitter<number[]>();
    @Output() onEditing = new EventEmitter<boolean>();

    private gridApi: GridApi;
    private colApi: ColumnApi;
    public extraOption = { sizeColumnsToFit: true };

    public customGridOption: GridOptions = {
        defaultColDef: {
            filter: 'agTextColumnFilter',
            enableCellChangeFlash: false,
            floatingFilter: true,
            editable: false,
            cellStyle: params => {
              if(!isNaN(params.value)) {
                return { 'justify-content': 'right','padding-left': '10px', 'padding-right': '10px' };
              }
              return {'padding-left': '10px', 'padding-right': '10px'}
            },
            cellClass: ['right-border-light'],
        },
        suppressColumnVirtualisation: true,
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
            cellStyle: params => {
              if (params.node.data['id'] === -1) {
                return { 'display': 'none' };
              } else {
                return { 'padding-left': '0.3rem' };
              }
            },
            cellClass: "yellow-cell right-border-light",
            cellEditor: "agCheckboxCellEditor",
            cellRenderer: 'AppCustomGridCellCheckboxComponent',
            cellRendererParams: { editable: true },
          },
          {
            headerName: 'Source Name', 
            field: 'SourceName', 
            editable: false, 
            minWidth: 400, 
            width: 400, 
            maxWidth: 400, 
            cellRenderer: 'PricingEngineRvAutocompleteCellRendererComponent', 
            cellStyle: null,
            cellRendererParams: params => {
            return {
              name: params.data['SourceName'],
              field: 'SourceName',
              onSecuritySelected: this.onSecuritySelected,
              cellParams: params,
              cellClass: 'yellow-cell'
            }
          }},
          {
            headerName: 'Target Name', 
            field: 'TargetName', 
            editable: false, 
            minWidth: 400, 
            width: 400, 
            maxWidth: 400, 
            cellRenderer: 'PricingEngineRvAutocompleteCellRendererComponent', 
            cellStyle: null,
            cellRendererParams: params => {
            return {
              name: params.data['TargetName'],
              field: 'TargetName',
              onSecuritySelected: this.onSecuritySelected,
              cellParams: params,
              onFocus: params => {
                this.onEditing.emit(true);
              },
              onBlur: params => {
                this.onEditing.emit(false);
              },
              cellClass: 'yellow-cell',
            }
          }},

          {headerName: 'Spread', field: 'Spread', width: 100, minWidth: 100, maxWidth: 100, onCellValueChanged: params => this.onSpreadChanged(params), cellClass: ['yellow-cell', 'right-border-light'], editable: true},
          {headerName: 'Type', field: 'Type'},

          {headerName: 'SourceValue_Live', field: 'SourceValue_Live', hide: this.hideIfClose()},
          {headerName: 'SourceValue_Close', field: 'SourceValue_Close', hide:  this.hideIfLive()},

          {headerName: 'TargetValue_Live', field: 'TargetValue_Live',  hide: this.hideIfClose()},
          {headerName: 'TargetValue_Close', field: 'TargetValue_Close', hide: this.hideIfLive()},
          
          {headerName: 'TargetLastUpdate_Live', field: 'TargetLastUpdate_Live', hide: this.hideIfClose(), valueFormatter: params => params.value ? moment.utc(params.value).format('MM/DD/YYYY HH:mm:ss') : null},
          {headerName: 'SourceLastUpdate_Live', field: 'SourceLastUpdate_Live', hide: this.hideIfClose(), valueFormatter: params => params.value ? moment.utc(params.value).format('MM/DD/YYYY HH:mm:ss') : null},

          {headerName: 'Update Name', field: 'UpdateName',},
          {headerName: 'Update Date', field: 'UpdateDate',},

          {headerName: 'Id', field: 'id', hide: true},
          {headerName: 'Source MDID', field: 'SourceMDID', hide: true},
          {headerName: 'Target MDID', field: 'TargetMDID', hide: true },

        ],
        rowSelection: 'single',
        deltaRowDataMode: true,
        getRowNodeId: data => data['id'],
        rowClass: 'medium-row',
        rowHeight: 25,
        groupHeaderHeight: 25,
        headerHeight: 25,
        floatingFiltersHeight: 28,
        
        onCellEditingStarted: params => {
          this.onEditing.emit(true);
        },
        onCellEditingStopped: params => {
            this.onEditing.emit(false);
        },

        getContextMenuItems: params => {

          const deleteSelectedItems = {
            name: 'Delete Selected Items',
            action: () => {
              this.deleteSelectedItems();
            }
          };

          if(this.getSelectedRowMdids().length === 0) {
            return ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport', 'separator'];
          }
          else {
            return ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport', 'separator', deleteSelectedItems];
          }
        },

        frameworkComponents: {
            PricingEngineRvAutocompleteCellRendererComponent: PricingEngineRvAutocompleteCellRendererComponent,
            AppCustomGridCellCheckboxComponent: AppCustomGridCellCheckboxComponent,
        },
    };

    constructor(private utilityService: UtilityService,private dialog: MatDialog, private pricingEngineUtilityService: PricingEngineUtilityService) { 
        this.customGridCallBack = this.customGridCallBack.bind(this);
        this.onSecuritySelected = this.onSecuritySelected.bind(this);
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes && changes.mode && changes.mode.currentValue && this.colApi) {
          if(this.mode === 'live'){
            this.colApi.setColumnVisible('SourceValue_Live', true);
            this.colApi.setColumnVisible('TargetValue_Live', true);
            this.colApi.setColumnVisible('SourceLastUpdate_Live', true);
            this.colApi.setColumnVisible('TargetLastUpdate_Live', true);
          
            this.colApi.setColumnVisible('SourceValue_Close', false);
            this.colApi.setColumnVisible('TargetValue_Close', false);

            this.gridApi.sizeColumnsToFit();
          }
          if(this.mode === 'close'){
            this.colApi.setColumnVisible('SourceValue_Close', true);
            this.colApi.setColumnVisible('TargetValue_Close', true);
            
            this.colApi.setColumnVisible('SourceValue_Live', false);
            this.colApi.setColumnVisible('TargetValue_Live', false);
            this.colApi.setColumnVisible('SourceLastUpdate_Live', false);
            this.colApi.setColumnVisible('TargetLastUpdate_Live', false);

            this.gridApi.sizeColumnsToFit();
          }
        }
        if (changes.data && changes.data.currentValue && changes.data.currentValue.length > 0) {
          this.redrawGrid();
        }
    }

    redrawGrid(){
      if (this.gridApi) {

        let inputRow = {
          id: -1, 
          SourceName: '',
          TargetName: '',
          Spread: 0,
          Type: 'Price'
        }    
        // this.gridApi.setRowData([]);
        this.gridApi.setRowData([...this.data, inputRow])
      }
    }

    customGridCallBack(params) {
        this.gridApi = params.api;
        this.colApi = params.columnApi;
        if (this.data && this.data.length > 0) {
          this.redrawGrid();
        }
        this.gridApi.sizeColumnsToFit();
    }

    onSpreadChanged(params) {
      if(params.node.data['id'] === -1){

        const payload: fromModels.IDataInputEnrichmentReq = {
          sourceName: params.data['SourceName'],
          targetName: params.data['TargetName'],
          spread: params.data['Spread'],
          type: params.data['Type']
        }

        if(this.isValidInputRow(payload)){
          this.onSecNameSelected.emit(payload);
        }
      } 
      else {
        const payload: fromModels.IMdidEnrichmentReq = {
          sourceName: params.data['SourceName'],
          targetName: params.data['TargetName'],
          spread: params.data['Spread'],
          type: params.data['Type'],
          previousSourceMdid: params.data['SourceMDID'],
          previousTargetMdid: params.data['TargetMDID']
        }
        this.onSecNameSelected.emit(payload);
      }
    }

    private onSecuritySelected(value: string, params: any) {
      if(params.node.data['id'] === -1){

        this.gridApi.getRowNode(params.node.data['id']).setDataValue(params.colDef.field, value);

        const payload: fromModels.IDataInputEnrichmentReq = {
          sourceName: params.data['SourceName'],
          targetName: params.data['TargetName'],
          spread: params.data['Spread'],
          type: params.data['Type']
        }
        if(params.colDef.field === 'SourceName') {
          payload.sourceName = value;
        }
        if(params.colDef.field === 'TargetName') {
          payload.targetName = value;
        }

        if(this.isValidInputRow(payload)){
          this.onSecNameSelected.emit(payload);
        }
      } 
      else {
        const payload: fromModels.IMdidEnrichmentReq = {
          sourceName: params.data['SourceName'],
          targetName: params.data['TargetName'],
          spread: params.data['Spread'],
          type: params.data['Type'],
          previousSourceMdid: params.data['SourceMDID'],
          previousTargetMdid: params.data['TargetMDID']
        }
        if(params.colDef.field === 'SourceName') {
          payload.sourceName = value;
        }
        if(params.colDef.field === 'TargetName') {
          payload.targetName = value;
        }
        this.onSecNameSelected.emit(payload);
      }
    };
  
    public onOpenSecurityEditor(event: RowNode) {
        this.dialog.open(SecurityEditorGeneralDialogComponent, {
            hasBackdrop: false,
            panelClass: ['event-analysis-pop-up-panel'],
            width: '80rem',
            height: '50rem',
            data: {
                sid: event.data['SID'],
                rowData: { 'securityName': event.data['SecurityName'], 'sid': event.data['SID'], 'securityType': event.data['SecurityType']},
            },
        });
    }

    hideIfLive() {
        if (this.mode === 'live') {
            return true;
        }
        return false;
    }

    hideIfClose(){
        if (this.mode === 'close') {
            return true;
        }
        return false
    }

    isValidInputRow(inputRow){
      if( inputRow.sourceName === '' || inputRow.sourceName === null || inputRow.sourceName === undefined ){
        return false;
      }
      if( inputRow.targetName === '' || inputRow.targetName === null || inputRow.targetName === undefined ){
        return false;
      }
      if( inputRow.spread === '' || inputRow.spread === null || inputRow.spread === undefined ){
        return false;
      }
      return true
    }

    getSelectedRowMdids(): number[] {
      let rowIds = [];
      this.gridApi.forEachNode( (node: RowNode) => {
          if(node.data.selected === true){
              rowIds.push(node.data['TargetMDID']);
          }
      });
      return rowIds;
    }

    deleteSelectedItems(){
      let selectedRowMdidsArr: number[] = this.getSelectedRowMdids();
      if(selectedRowMdidsArr.length > 0){
        this.onSecDeletionRequested.emit(selectedRowMdidsArr);
      }
    }
  
}
