import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import { Store } from "@ngrx/store";
import { GridApi, ColumnApi, GridOptions, ICellRendererParams, ColDef, Column } from "ag-grid-community";
import moment from "moment";
import { MatLegacyDialogRef as MatDialogRef,  MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { AppGridCustomStatusBarCellValueComponent } from "src/app/components";
import * as fromUtilityService from '../../services/utility.service';
import { BluePearlRepoDialogViewerComponent } from "../bluepearl-repo-dialog-viewer/bluepearl-repo-dialog-viewer.component";

  @Component({
    selector: "app-bluepearl-settlement-ladder-viewer",
    templateUrl: "./bluepearl-settlement-ladder-viewer.component.html",
    styleUrls: ["./bluepearl-settlement-ladder-viewer.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class BluePearlSettlementLadderViewer implements OnChanges{
    
      @Input() settlementLadderData;
      @Input() settlementLadderDataLoading;
      @Input() repoGovs;
  
      private repoDialogRef: MatDialogRef<BluePearlRepoDialogViewerComponent>;
      public extraOption = { };
    
      private gridApi: GridApi;
      private gridColumnApi: ColumnApi;
  
      public updatedColDefs: ColDef[] = [];
      public customGridOption: GridOptions = {

        getContextMenuItems: params => {
          if(params.node.data['HasRepo'] === true){

            const viewRepoGovts = {
              name: 'View Repos',
              icon: '<i class="material-icons small-menu-icon">list</i>',
              action: () => {
                
                let sid = params.node.data['SID'];
                let matchingRepos = [];

                this.repoGovs.map(repo => {
                  if(repo.UnderlyingCollateral === sid){
                    matchingRepos.push(repo)
                  }
                })

                this.repoDialogRef = this.dialog.open(BluePearlRepoDialogViewerComponent, {
                  width: '1400px',
                  height: '500px',
                  data: {
                     repos: matchingRepos,
                     colDefs: this.updatedColDefs,
                     secName: params.node.data['SecurityName']
                  }
                });
              }
            };


            return ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport', viewRepoGovts];
          } else {
            return ['copy', 'copyWithHeaders', 'separator', 'csvExport', 'excelExport'];
          }
        },

        getRowNodeId: data => data['SID'],

        getRowStyle: params => {
          if(params.data['AvailableToTransfer'] === 0 && params.data['HasRepo'] === true){
            return {'color': '#d3d3d3'}
          }
        },

        defaultColDef: {
          suppressMenu: true,
          cellClass: "right-border-light",
          headerClass: "ag-header-wrap",
          sortable: true,
          editable: false,
        },
        floatingFilter: true,
        rowClass:'small-row',
        rowHeight: 16,
        
       
        suppressNoRowsOverlay: true,
        columnDefs: [
          { headerName: "As Of Date", field: "AsOfDate", valueFormatter: params => moment.utc(params.value).format('MM-DD-YYYY'), cellStyle: params => {return{'justify-content': 'center'}}, width: 100, pinned: 'left'},
          { headerName: "Security Type", field: "SecurityType", width: 100, sortedAt:0, pinned: 'left'},
          { headerName: "Security Name", field: "SecurityName", cellRenderer: (params) => fromUtilityService.syntheticCellRenderer(params), width: 280, sortedAt: 1, pinned: 'left'},
          { headerName: "Currency", field: "Currency", width: 60},      
          { headerName: "Maturity Date", field: "MaturityDate", valueFormatter: params => params.value ? moment.utc(params.value).format('MM-DD-YYYY') : null, cellStyle: params => {return{'justify-content': 'center'}}, width: 100},
       

          { headerName: "Has Repo", field: "HasRepo", hide: true},
          { headerName: "Available To Transfer", field: "AvailableToTransfer", valueGetter: fromUtilityService.formatNumberWithCommaSeperated(0), cellStyle: params => {return{'justify-content': 'flex-end', 'background-color': '#ffffce'}}, width: 120},
          { headerName: "Settled Repo Amount", field: "SettledRepoAmount", valueGetter: fromUtilityService.formatNumberWithCommaSeperated(0), cellStyle: params => {return{'justify-content': 'flex-end'}}, width: 120},
          { headerName: "Underlying Collateral", field: "UnderlyingCollateral", cellStyle: params => {return{'justify-content': 'flex-end'}}, width: 100 },
          { headerName: "Unsettled Repo Amount", field: "UnsettledRepoAmount", valueGetter: fromUtilityService.formatNumberWithCommaSeperated(0), cellStyle: params => {return{'justify-content': 'flex-end'}}, width: 100},
  
          { headerName: "Synthetic Move", field: "SyntheticMove",width: 80 },


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
  
      constructor(private dialog: MatDialog,) {
        this.customGridCallBack = this.customGridCallBack.bind(this);
      }
  
      ngOnInit(): void {}

      ngOnChanges(changes: SimpleChanges){
        if(changes && changes.settlementLadderData && changes.settlementLadderData.currentValue && changes.settlementLadderData.currentValue.length > 0){
        
          let incoming_cols = Object.keys(this.settlementLadderData[0])
          let existing_cols: any[] = [];
          let newColDefs: ColDef[] = [];
        
          if(this.gridColumnApi){
            this.gridColumnApi.getColumnState().map(col => existing_cols.push(col.colId))
            existing_cols = existing_cols.slice(0, this.customGridOption.columnDefs.length)
  
            incoming_cols.map( (incoming_col: string) => {
              if(!existing_cols.includes(incoming_col) && incoming_col !== 'SID' && incoming_col !== 'FundId'){
                newColDefs.push({
                  headerName: incoming_col,
                  field: incoming_col,
                  width: 80,
                  cellStyle: incoming_col.includes('On/Before') ? { 'justify-content': 'flex-end', 'background-color': '#ffffce' } : { 'justify-content': 'flex-end'},
                  valueGetter: fromUtilityService.formatNumberWithCommaSeperated(0),
                })
              }
            })
            newColDefs.unshift(newColDefs.pop())
  
            this.updatedColDefs = this.customGridOption.columnDefs.concat(newColDefs)
            
            this.updatedColDefs = this.updatedColDefs.concat([
              { headerName: "Fund Id", field: "FundId", width: 60},
              { headerName: "SID", field: "SID", width: 60},
            ])
  
            this.gridApi.setColumnDefs([])
            this.gridApi.setColumnDefs(this.updatedColDefs)
          }
          
         
        }

      }
  
      customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
      }

      customFlexEndCellRenderer(params){
        return {'justify-content': 'flex-end'}
        
      }
}
  