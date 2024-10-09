import { Injectable } from '@angular/core';
import { ColumnApi, ColGroupDef, ColumnState, ValueGetterParams } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';
import { PositionViewerService } from './position-viewer.service';

@Injectable()
export class DirectionalityViewerService {

  constructor(private utilityService: UtilityService, private positionViewerService: PositionViewerService) {}

  // public clearDirectionalityFromState(columnState: ColumnState[]) {
  //   columnState = columnState.filter(col => !col.colId.includes('directionality'));
  //   return columnState;
  // }

  // public clearDirectionalityColumnsDef(dynamicColDefs: any[]) {
  //   const result = dynamicColDefs.filter((colGroup: ColGroupDef) => colGroup.headerName !== 'Directionality');
  //   return result;
  // }

  // public setUpRegressionDynamicColumns(regressionColRaw, columnState: ColumnState[], dynamicColDefs: any[], primaryGroupingNameIdMaping, regressionNonlinearData) {
  //   const currentColumnState_clean = this.clearDirectionalityFromState(columnState);
  //   const dynamicColDefs_clean = this.clearDirectionalityColumnsDef(dynamicColDefs);

  //   // creat the new regression dynamic cols def and added into colDefs
  //   const regressionColDef: ColGroupDef = {
  //     headerName: 'Directionality',
  //     children: regressionColRaw.map(rawCol => {
  //       return {
  //         headerName: rawCol.name,
  //         field: rawCol.field,
  //         headerTooltip: rawCol.name,
  //         width: 100,
  //         valueFormatter: rawCol.field.includes('rsquared') ? 
  //           this.utilityService.formatNumberWithCommasAndDigit(2, {percent: true}) : 
  //           this.utilityService.formatNumberWithCommasAndDigit(0),
  //         valueGetter: params => {
  //           let nonlinearData;
  //           if (params.node.group === false) {
  //             nonlinearData = this.primaryGroupingNameIdMaping && this._nonlinearDataLoaderForRegression(params, params.node.data['securityName']);
  //           } else {
  //             nonlinearData = this.primaryGroupingNameIdMaping && this._nonlinearDataLoaderForRegression(params, params.node.groupData);
  //           }
  //           return nonlinearData;
  //         }
  //       }
  //     })
  //   };
  // }

  // private _nonlinearDataLoaderForRegression(params: ValueGetterParams, primaryGroupingNameIdMaping: any, regressionNonlinearData: any ) {
  //   const targetField = params.colDef.field;
  //   const formatTreePath = this.positionViewerService.getNonlinearDataPath(params.node, primaryGroupingNameIdMaping); 
  //   const nonlinearData = this.positionViewerService.getNonLinearData(formatTreePath, targetField, regressionNonlinearData);
  //   return nonlinearData
  // }

}