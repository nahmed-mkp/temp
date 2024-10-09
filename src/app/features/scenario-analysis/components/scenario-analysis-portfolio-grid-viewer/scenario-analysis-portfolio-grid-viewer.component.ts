import { ChangeDetectionStrategy, Component, Inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromStore from '../../store';
import * as fromSelectors from '../../store/selectors';
import * as fromModels from '../../models';
import {
    createDashedBorder,
    currencyCountryMapper,
    getDistinctValues,
    formatNumberWithCommasAndDigitBlankNaNs,
    getNonlinearDataForFirm, 
    getNonlinearDataPathAdvance,
    isRowPinned,
    _normalize_value
  } from './utility';

import { ColumnApi, GridApi, GridOptions, RowNode, ValueGetterParams } from "ag-grid-community";

@Component({
    selector: 'scenario-analysis-portfolio-grid-viewer',
    templateUrl: './scenario-analysis-portfolio-grid-viewer.component.html',
    styleUrls: ['./scenario-analysis-portfolio-grid-viewer.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScenarioAnalysisPortfolioGridViewerComponent implements OnInit, OnChanges {

    @Input() linearData;

    public activeGroupingArr = ['Fund', 'Pod', 'Tradename', 'Security']
    public extraOption = {};
    private gridApi: GridApi;
    private gridColumnApi: ColumnApi;


    valueFormatter = (params) => {
        if (params.value) {
          return formatNumberWithCommasAndDigitBlankNaNs(params, 0, 'thousand');
        }
    };

    public customGridOption: GridOptions = {
        defaultColDef: {
          cellClass: 'right-border-light',
          headerClass: 'ag-header-wrap',
          filter: 'agSetColumnFilter',
          editable: false,
          enableCellChangeFlash: false,
          suppressToolPanel: true,
          cellStyle: params => {
              if (typeof params.value === 'number') {
                 return { 'justify-content': 'flex-end'}; 
              }
          }
        },
        autoGroupColumnDef: {
            pinned: 'left',
            cellRendererParams: {
              suppressCount: true,
            },
            headerName: 'Group',
            field: 'SecurityName',
            cellRenderer: 'agGroupCellRenderer',
            width: 375,
            sort: 'asc'
        },
        columnDefs: [
            { field: 'Firm',  headerName: 'Firm', rowGroup: true, hide: true},
            { field: 'FundName', headerName: 'Fund Name', rowGroup: true, hide: true},
            { field: 'PodName', headerName: 'Pod Name', rowGroup: true, hide: true},
            { field: 'TradeName', headerName: 'Trade Name', rowGroup: true, hide: true},
            { field: 'SecurityName', headerName: 'Security', rowGroup: true, hide: true},
            {   field: 'mvUSD', 
                headerName: 'mvUSD', 
                valueFormatter: this.valueFormatter,
                valueGetter: params => this.setLinearValueGetter(params, 'normal', 'mvUSD')
            },
            { 
                field: 'mvUSD', 
                headerName: 'mvUSD-bpsToFund (K)', 
                valueFormatter: this.valueFormatter,
                valueGetter: params => this.setLinearValueGetter(params, 'bpsToFund', 'mvUSD')
            },
            { 
                field: 'mvUSD', 
                headerName: 'mvUSD-bpsToPod (K)', 
                valueFormatter: this.valueFormatter,
                valueGetter: params => this.setLinearValueGetter(params, 'bpsToPod', 'mvUSD')
            },
            {
                field: 'Capital',
                headerName: 'Capital (K)',
                valueFormatter: this.valueFormatter,
                valueGetter: params => this.capitalGetter(params),
            },
            { 
                field: 'FundCapital', 
                headerName: 'Fund Capital (K)',
                valueFormatter: this.valueFormatter,
                valueGetter: params => this.setLinearValueGetter(params,  'normal' , 'FundCapital'),
                // hide: true
            },
            { 
                field: 'FundLeveredCapital', 
                headerName: 'Fund Levered Capital (K)',
                valueFormatter: this.valueFormatter,
                valueGetter: params => this.setLinearValueGetter(params, 'normal', 'FundLeveredCapital'),
                // hide: true
            },
            { 
                field: 'PodCapital', 
                headerName: 'Pod Capital (K)',
                valueFormatter: this.valueFormatter,
                valueGetter: params => this.setLinearValueGetter(params, 'normal', 'PodCapital'),
                // hide: true
            },
            { 
                field: 'PodLeveredCapital', 
                headerName: 'Pod Levered Capital (K)',
                valueFormatter: this.valueFormatter,
                valueGetter: params => this.podLeveredCapitalGetter(params.node),
                // hide: true
            },
            { field: 'FundID', headerName: 'Fund ID', hide: true},
            { field: 'PodID', headerName: 'Pod ID', hide: true},
            { field: 'TradeID', headerName: 'Trade ID', hide: true}
        ],
        floatingFilter: true,
        getRowStyle: params => {},
        rowHeight: 16,
        groupDefaultExpanded: 1,
        rowClass:'small-row',
        getRowNodeId: node => node['Id']
    };
    
    customGridCallBack(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    }  

    constructor(private store: Store<fromStore.ScenarioAnalysisState>) {
    
    }

    ngOnInit(): void {
        
    }


    ngOnChanges(changes: SimpleChanges): void {
       if(changes && changes.linearData){
    
       }
    }
  
    setLinearValueGetter(params: ValueGetterParams, displayMode: string, column: string) {
        if (displayMode === 'normal') {
          return this.linearValueGetter(params, column);
        }
      
        if (displayMode === 'bpsToFund') {
          const originalValue = this.linearValueGetter(params, column);
          return this.bpsToFundGetter(params, originalValue);
        }

        if (displayMode === 'bpsToPod') {
        const originalValue = this.linearValueGetter(params, column);
        return this.bpsToPodGetter(params, originalValue);
        }
    }
 
    linearValueGetter(params: ValueGetterParams, column: string) {
      if (params.node.group === true) {
      return getDistinctValues(
          params.node.allLeafChildren.map(
          (node) => node.data[column]
          )
      );
      } else {
      return params.node.data[column];
      }
  }

    bpsToFundGetter(params: ValueGetterParams, originalVal: any) {

        const useFundLeveredCapital: boolean = this.useFundLeveredCapital(params.node);
        const fundLeveredValue = params.getValue('FundLeveredCapital');

        const fundValue = params.getValue('FundCapital');
        const targetValue = originalVal;

        if (useFundLeveredCapital) {
        // return 'FundLevCap'
        return ((targetValue / fundLeveredValue) * 10000);
        }

        if ((targetValue && fundValue) && targetValue !== 0 && fundValue !== 0) {
        //  return 'FundCap'
        return ((targetValue / fundValue) * 10000);
        } else {
        return null;
        }
    }

    bpsToPodGetter(params: ValueGetterParams, originalValue: any) {

        const useFundLeveredCapital: boolean = this.useFundLeveredCapital(params.node);
        const targetPodLevel = this.activeGroupingArr.indexOf('Pod');
        const targetCrossPodLevel = -1
        const myCurrentGroupingLevel = params.node.level;

        let targetPodValue;

        if (targetPodLevel === -1 && targetCrossPodLevel === -1) {
        // Use fund capital if podName and crossPodName are not in the grouping
        targetPodValue = params.getValue('FundCapital');
        } else {
        const podLevelCollection = [
            targetPodLevel,
            targetCrossPodLevel,
        ].filter((num) => num !== -1);
        const podTrigger = Math.min(...podLevelCollection);
        if (myCurrentGroupingLevel >= podTrigger) {
            // if pod or crossPod is an ancestor of current level ... or is current level
            targetPodValue = params.getValue('PodLeveredCapital'); // use the level pod Value
        } else {
            // if the current grouping level is smaller than the pod level
            targetPodValue = params.getValue('FundLeveredCapital'); // use the level pod Value
        }
        }

        if (
        originalValue !== undefined &&
        targetPodValue !== undefined &&
        targetPodValue !== 0 &&
        originalValue !== 0
        ) {
        return ((originalValue / targetPodValue) * 10000);
        } else {
        return null;
        }
    }

    public useFundLeveredCapital(node: RowNode) {
        const currentLevel = node.level;
        const fundLevel = this.activeGroupingArr.indexOf('Fund');
        const crossFundLevel = this.activeGroupingArr.indexOf('CrossFund');

        const relevantLevels = [node.level];

        if (fundLevel > -1) {
        relevantLevels.push(fundLevel);
        }

        // if Fund is not an ancestors of the current grouping level
        if (Math.min(...relevantLevels) === currentLevel ) {
        // if current level is one of the four named categories
        if (relevantLevels.filter(x => x === currentLevel).length > 1) {
            // if currentLevel is crossFund
            return currentLevel === crossFundLevel ? true :  false;
        }
        return true;
        }
    }

    capitalGetter(params: ValueGetterParams) {

        const targetColumn = 'FundCapital';
        const mergeColumn = 'PodLeveredCapital';
    
        if (params.node.level === 0 && params.node.group === false) {
          // no grouping, every is flat;
          return params.node.data[targetColumn];
        } else if (
          params.node.level === 0
        ) {
          // at the root level and it is firm
          return getDistinctValues(
            params.node.allLeafChildren.map(
              (node) => node.data[targetColumn]
            )
          );
        } else {
          if (
            this.activeGroupingArr.includes('Fund') === false &&
            this.activeGroupingArr.includes('Pod') === false &&
            this.activeGroupingArr.includes('CrossFund') === false &&
            this.activeGroupingArr.includes('CrossPod') === false
          ) {
            return params.api.getValue(
              'FundCapital',
              params.node.parent
            );
          } else {
            const fundNameGroupLevelIndex =
            this.activeGroupingArr.indexOf('Fund');
            const podNameGroupLevelIndex =
            this.activeGroupingArr.indexOf('Pod');
            const CrossFundGroupLevelIndex =
            this.activeGroupingArr.indexOf('CrossFund');
            const CrossPodNameGroupLevelIndex =
            this.activeGroupingArr.indexOf('CrossPod') ;
            const currentLevel = params.node.level;
    
            if (
              currentLevel === fundNameGroupLevelIndex &&
              (fundNameGroupLevelIndex < podNameGroupLevelIndex ||
                podNameGroupLevelIndex === -1)
            ) {
              return getDistinctValues(
                params.node.allLeafChildren.map(
                  (node) => node.data[targetColumn]
                )
              );
            } else if (currentLevel === podNameGroupLevelIndex) {
              return getDistinctValues(
                params.node.allLeafChildren.map(
                  (node) => node.data[mergeColumn]
                )
              );
            } else if (
              currentLevel === CrossFundGroupLevelIndex &&
              (CrossFundGroupLevelIndex < CrossPodNameGroupLevelIndex ||
                CrossPodNameGroupLevelIndex === -1)
            ) {
              return getDistinctValues(
                params.node.allLeafChildren.map(
                  (node) => node.data[targetColumn]
                )
              );
            } else if (currentLevel === CrossPodNameGroupLevelIndex) {
              return getDistinctValues(
                params.node.allLeafChildren.map(
                  (node) => node.data[mergeColumn]
                )
              );
            } else if (
              (podNameGroupLevelIndex !== -1 &&
                currentLevel > podNameGroupLevelIndex) ||
              (CrossPodNameGroupLevelIndex !== -1 &&
                currentLevel > CrossPodNameGroupLevelIndex)
            ) {
    
              if (
                params.node.group === true &&
                (currentLevel === fundNameGroupLevelIndex ||
                  currentLevel === CrossFundGroupLevelIndex)
              ) {
                return getDistinctValues(
                  params.node.allLeafChildren.map(
                    (node) => node.data[mergeColumn]
                  )
                );
              } else {
                return params.api.getValue(
                  'PodLeveredCapital',
                  params.node.parent
                );
              }
            } else {
             return params.api.getValue(
                'FundCapital',
                params.node.parent
              );
            }
          }
        }
    }

    podLeveredCapitalGetter(node: RowNode) {
      if (node.group === true) {
        return getDistinctValues(
          node.allLeafChildren.map(
            (node) => node.data['PodLeveredCapital']
          )
        );
      } else {
        return node.data['PodLeveredCapital'];
      }
    }
    
}


let outline = {
	"Name": "ScenarioName",
	"CreatedBy": "",
	"GeneralShocks": [{
		"ClientServicesThemeBreakDown1": {
			"ShockType": "",
			"ShockAmount": 0
		}, 
		"ClientServicesThemeBreakDown2": {
			"ShockType": "",
			"ShockAmount": 0
		},
		"ClientServicesThemeBreakDown3": {
			"ShockType": "",
			"ShockAmount": 0
		},
		"ClientServicesThemeBreakDown4": {
			"ShockType": "",
			"ShockAmount": 0
		}
	}],
	"CustomShocks": [{
		"SID": "", // --> This will be a drop down (or something smarter) of securities in the portfolio for the as of date.
		"ShockType": "",
		"ShockAmount": 0
	}],
	"Dates": [
		"", 
		"",
		"",
		""
	]
}
 