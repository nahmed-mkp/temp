import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';

import * as fromStore from './../../store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-option-vols-setting-layout-dialog',
  templateUrl: './option-vols-setting-layout-dialog.component.html',
  styleUrls: ['./option-vols-setting-layout-dialog.component.scss']
})
export class OptionVolsSettingLayoutDialogComponent implements OnInit {

  @HostBinding('class') class = 'vertical-flex-full-height';

  public supportedTickers$: Observable<any>;
  public futuresmapping$: Observable<any>;

  constructor(public dialogRef: MatDialogRef<OptionVolsSettingLayoutDialogComponent>,
    private store: Store<fromStore.OptionVolsState>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.supportedTickers$ = this.store.select(fromStore.getOptionChainSupportedTickers);
    this.futuresmapping$ = this.store.select(fromStore.getFuturesMapping);
  }

  onCloseClick() {
    this.dialogRef.close();
  }



  addTicker(event) {
    this.store.dispatch(new fromStore.AddSupportedTickers(event));
    // console.log('add ticker', event);
  }

  deleteTicker(event) {
    this.store.dispatch(new fromStore.DeleteSupportedTickers(event));
    // console.log('delete ticker', event);
  }

  updateTicker(event) {
    this.store.dispatch(new fromStore.UpdateSupportedTickers(event));
    // console.log('update ticker', event);
  }



  addFutureMapping(event) {
    this.store.dispatch(new fromStore.AddFuturesMapping(event));
    // console.log('add future mapping', event);
  }

  deleteFutureMapping(event) {
    this.store.dispatch(new fromStore.DeleteFuturesMapping(event));
    // console.log('delete future mapping', event);
  }

  updateFutureMapping(event) {
    this.store.dispatch(new fromStore.UpdateFuturesMapping(event));
    // console.log('update future mapping', event);
  }
  
 }
