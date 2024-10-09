import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Column } from 'ag-grid-community';

@Component({
  selector: 'app-pool-grid-layout-configuration-dialog',
  templateUrl: './pool-grid-layout-configuration-dialog.component.html',
  styleUrls: ['./pool-grid-layout-configuration-dialog.component.scss']
})
export class PoolGridLayoutConfigurationDialogComponent implements OnInit {

  public hide: any = [];
  public pinLeft: any = [];
  public pinRight: any = [];
  public show: any;
  public SavingPublicLayout = false;
  public newLayoutName: string = 'Tony Lin';
  public newLayoutType: string;

  constructor(
    public dialogRef: MatDialogRef<PoolGridLayoutConfigurationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Column[]
  ) { }

  ngOnInit() {
    this.data = this.data.slice();
    // this.data = this.data.map(column => column.getColDef());
    // this.show = this.data.filter(item => item.hide !== true && item.pinned !== 'left' && item.pinned !== 'right');
    // this.hide = this.data.filter(item => item.hide === true);
    // this.pinLeft = this.data.filter(item => item.pinned === 'left');
    // this.pinRight = this.data.filter(item => item.pinned === 'right');

    this.show = this.data.filter(column => column.isVisible() && column.isPinned() === false);
    this.hide = this.data.filter(column => column.isVisible() === false);
    this.pinLeft = this.data.filter(column => column.isVisible() && column.isPinnedLeft());
    this.pinRight = this.data.filter(column => column.isVisible() && column.isPinnedRight());
  }

  onCloseClick($event) {
    if($event) {
      // formating
      const hideFormat = this.hide.map(column => column.getColDef());
      const showFormat = this.show.map(column => column.getColDef());
      const pinLeftFormat = this.pinLeft.map(column => column.getColDef());
      const pinRightFormat = this.pinRight.map(column => column.getColDef());

      hideFormat.forEach(element => element.hide = true);
      showFormat.forEach(element => {
        element.hide = false;
        delete element.pinned;
      });
      pinLeftFormat.forEach(element => {
        element.pinned = 'left';
        element.hide = false;
      });
      pinRightFormat.forEach(element => {
        element.pinned = 'right';
        element.hide = false;
      });
      this.dialogRef.close({
        newColDef: [...pinLeftFormat, ...pinRightFormat, ...showFormat, ...hideFormat],
        action: $event,
        newLayoutName: this.newLayoutName,
        newLayoutType: this.newLayoutType,
        SavingPublicLayout: this.SavingPublicLayout
      });
    } else {
      this.dialogRef.close();
    }
  }

  reset() {
    // this.hide.forEach(element => delete element.hide);
    // this.pinLeft.forEach(element => {
    //   delete element.pinned;
    //   delete element.hide;
    // });
    // this.pinRight.forEach(element => {
    //   delete element.pinned;
    //   delete element.hide;
    // });
    this.show = [...this.pinLeft, ...this.pinRight, ...this.show, ...this.hide];
    this.hide = [];
    this.pinLeft = [];
    this.pinRight = [];
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
