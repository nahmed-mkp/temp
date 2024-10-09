import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Inject } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Store } from '@ngrx/store';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import * as fromModels from '../../../models';
import * as fromActions from '../../../store';
import * as fromStore from '../../../store';
import {Location} from '@angular/common'; 
import { TimeseriesDeletePortfolioDialogViewerComponent } from '../delete-portfolio-dialog-viewer/delete-portfolio-dialog-viewer.component';
import { TimeseriesRenamePortfolioDialogViewerComponent } from '../rename-portfolio-dialog-viewer/rename-portfolio-dialog-viewer.component';

@Component({
  selector: 'app-timeseries-import-portfolio-dialog-viewer',
  templateUrl: './import-portfolio-dialog-viewer.component.html',
  styleUrls: ['./import-portfolio-dialog-viewer.component.scss']
})

export class TimeseriesImportPortfolioDialogViewerComponent {

  hasChild = (_: number, node: fromModels.IPortfolioImportNode) => node.expandable;

  private _transformer = (node: fromModels.IPortfolioImportNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      guid: node.guid,
      timeseries: node.timeseries, 
      derivedTimeseries: node.derivedTimeseries,
      isShared: node.isShared
    };
  };

  treeControl = new FlatTreeControl<fromModels.IPortfolioImportNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  )

  public dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data, 
    public dialogRef: MatDialogRef<TimeseriesImportPortfolioDialogViewerComponent>, 
    public renameDialogRef: MatDialogRef<TimeseriesRenamePortfolioDialogViewerComponent>, 
    private store: Store<fromStore.State>,
    public dialog: MatDialog,
    private location: Location ) {
    
      this.dataSource.data = this.generateTreeData();
  }

  handlePortfolioSelect(item: fromModels.IPortfolioImportNode){
    let portfolio: fromModels.IPortfolio = {
      name: item.name,
      timeseries: item.timeseries,
      derivedTimeseries: item.derivedTimeseries,
      guid: item.guid,
      isShared: item.isShared
    }
    this.store.dispatch(fromActions.importTimeseriesPortfolio(portfolio))
    this.dialogRef.close();
  }

  handlePortfolioRename(item: fromModels.IPortfolioImportNode){
    let portfolio: fromModels.IPortfolio = {
      name: item.name,
      timeseries: item.timeseries,
      derivedTimeseries: item.derivedTimeseries,
      guid: item.guid,
      isShared: item.isShared
    }    
    
    const renameDialogRef = this.dialog.open(TimeseriesRenamePortfolioDialogViewerComponent, {
      data: {
        portfolio: portfolio
      }
    })

    this.dialogRef.close();
  }

  handlePortfolioDelete(item: fromModels.IPortfolioImportNode){
    let portfolio: fromModels.IPortfolio = {
      name: item.name,
      timeseries: item.timeseries,
      derivedTimeseries: item.derivedTimeseries,
      guid: item.guid,
      isShared: item.isShared
    }

    const importDialogRef = this.dialog.open(TimeseriesDeletePortfolioDialogViewerComponent, {
      data: {
        portfolio: portfolio
      }
    })

    this.dialogRef.close();
  }

  generateTreeData(){
    let treeData = []

    let personalArr = this.data.personal;
    let sharedArr = this.data.shared;

    let personalArrChildren = [];
    let sharedArrChildren = [];

    personalArr.map( child => {
      personalArrChildren.push({
        name: child.name,
        guid: child.guid,
        timeseries: child.timeseries,
        derivedTimeseries: child.derivedTimeseries,
        isShared: false
      })
    })

    sharedArr.map( child => {
      sharedArrChildren.push({
        name: child.name,
        guid: child.guid,
        timeseries: child.timeseries,
        derivedTimeseries: child.derivedTimeseries,
        isShared: true
      })
    })

    treeData.push({
      name: 'Personal',
      children: personalArrChildren
    })

    treeData.push({
      name: 'Shared',
      children: sharedArrChildren
    })
    
    return treeData;
  }


  isPersonalOrShared(node){
    if(node.name === 'Personal' || node.name === 'Shared'){
      return true
    } else {
      return false
    }
  }
}
