import { Component, OnInit, HostBinding, Inject, OnDestroy } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { ColumnApi } from 'ag-grid-community';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromStore from './../../store';
import * as fromModels from './../../models';


@Component({
  selector: 'app-pnl-attribution-custom-grouping-dialog',
  templateUrl: './pnl-attribution-custom-grouping-dialog.component.html',
  styleUrls: ['./pnl-attribution-custom-grouping-dialog.component.scss']
})
export class PnlAttributionCustomGroupingDialogComponent implements OnInit, OnDestroy {

  @HostBinding('class') class = 'vertical-flex-full-height';

  public layoutName: string;
  public layoutGrouping$: Observable<string[]>;
  public layoutInfo$: Observable<any>;


  public supportedGroupings$: Observable<string[]>;
  public getCurrentModifyRowGrouping: any;
  public default: boolean = false;
  public isShared: boolean = false;
  
  private attributionRequest: fromModels.IAttributionRequest;
  private subscriptions: Subscription[] = [];

  constructor(
    public dialogRef: MatDialogRef<PnlAttributionCustomGroupingDialogComponent>,
    private store: Store<fromStore.PnlAttributionState>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {

    this.layoutName = this.data.layoutName;
    this.layoutGrouping$ = this.store.select(fromStore.getLayoutGroupingByLayoutName(this.layoutName))
    this.supportedGroupings$ = this.store.select(fromStore.getCustomGroupingAttributes);

    this.subscriptions.push(this.store.select(fromStore.getAttributionRequestByLayoutName(this.layoutName)).subscribe(request => {
      this.attributionRequest = request;
    }));
    // this.store.select(fromStore.getLayoutInfoByLayoutName(this.layoutName)).subscribe(layoutInfo => {
    //   this.default = layoutInfo['default'];
    //   this.isShared = layoutInfo['isShared'];
    // });

    this.subscriptions.push(this.store.select(fromStore.getLayoutDefaultByLayoutName(this.layoutName)).subscribe(result => {
      this.default = result || false;
    }));
    this.subscriptions.push(this.store.select(fromStore.getLayoutIsSharedByLayoutName(this.layoutName)).subscribe(result => {
      this.isShared = result || false;
    }));
  } 

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  onCloseClick(event) {
    console.log('modify row grouping', this.getCurrentModifyRowGrouping());

    const modifyGrouping = this.getCurrentModifyRowGrouping();
    if (event === 'apply') {
      this.store.dispatch(new fromStore.UpdateLayoutGrouping({layoutName: this.layoutName, grouping: modifyGrouping}));
      this.store.dispatch(new fromStore.LoadPnlAttribution({request: this.attributionRequest, layoutName: this.layoutName}));
    }

    if (event === 'save') {
      this.store.dispatch(new fromStore.UpdateLayoutGrouping({layoutName: this.layoutName, grouping: modifyGrouping}));
      this.store.dispatch(new fromStore.SaveLayout(
        {layoutName: this.layoutName, info: {default: this.default, isShared: this.isShared}}
      ));

      this.store.dispatch(new fromStore.LoadPnlAttribution({request: this.attributionRequest, layoutName: this.layoutName}));
      this.store.dispatch(new fromStore.SaveLayoutCloud(this.layoutName));
    }

    if (event === 'delete') {
      this.store.dispatch(new fromStore.DeleteLayout(this.layoutName));
    }
    this.dialogRef.close();
  }

  public currentModifyRowGrouping(event) {
    this.getCurrentModifyRowGrouping = event;
  }

}
