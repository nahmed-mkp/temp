import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Column } from 'ag-grid-community';

@Component({
  selector: 'app-pool-grid-grouping-configuration-dialog',
  templateUrl: './pool-grid-grouping-configuration-dialog.component.html',
  styleUrls: ['./pool-grid-grouping-configuration-dialog.component.scss']
})
export class PoolGridGroupingConfigurationDialogComponent implements OnInit {

  public available: any = [];
  public show: any = [];
  public SavingPublicLayout = false;
  public newGroupingName: string = 'Tony Lin';

  public avaliableGroupings = [
    'agency',
    'dealer',
    'marketTicker',
    'parentListName',
    'podName',
    'tradeName'
  ];

  constructor(
    public dialogRef: MatDialogRef<PoolGridGroupingConfigurationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: {
      currentGroupings: string[];
  }) {}

  ngOnInit() {
    this.available = this.avaliableGroupings.filter(col => this.data.currentGroupings.indexOf(col) === -1);
    this.show = this.data.currentGroupings.slice();
  }

  onCloseClick($event) {
    if ($event) {
      this.dialogRef.close({
        newGrouping: this.show,
        newGroupingName: this.newGroupingName,
        SavingPublicLayout: this.SavingPublicLayout,
        action: $event,
      });
    } else {
      this.dialogRef.close();
    }
  }

  reset() {
    this.show = ['agency'];
    this.available = this.avaliableGroupings.filter(col => this.show.indexOf(col) === -1);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
