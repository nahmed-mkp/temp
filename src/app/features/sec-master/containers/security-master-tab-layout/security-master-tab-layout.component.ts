import { Component, OnInit, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatLegacyTabChangeEvent as MatTabChangeEvent } from '@angular/material/legacy-tabs';

import * as fromStore from './../../store';

@Component({
  selector: 'app-security-master-tab-layout',
  templateUrl: './security-master-tab-layout.component.html',
  styleUrls: ['./security-master-tab-layout.component.scss']
})
export class SecurityMasterTabLayoutComponent implements OnInit {

  @HostBinding('class') classes = 'vertical-flex-full-height';

  public displayMode: 'Global' | 'Market Data Groups' | 'Future Info' | 'Manage Future Roots' |string = 'Global';

  constructor(private store: Store<fromStore.SecurityMasterState>) { }

  ngOnInit() {
    setTimeout(() => {
      this.store.dispatch(new fromStore.LoadUserActivity);
      this.store.dispatch(new fromStore.LoadSecurityViewerDynamicTabDict);
    }, 100);
  }





  // Event -----------------------------

  public onTabChanged(event: MatTabChangeEvent) {
    this.displayMode = event.tab.textLabel;
    this._onLoadData();
  }

  // Utility --------------------------------

  private _onLoadData() {
    if (this.displayMode === 'Global') {
      setTimeout(() => this.store.dispatch(new fromStore.LoadAssetClassFieldMap), 100);
    } else if (this.displayMode === 'Bloomberg Data Mapping') {
      setTimeout(() => this.store.dispatch(new fromStore.LoadBbgDataMap), 100);
    } else if (this.displayMode === 'Setup Market Data Groups') {
      setTimeout(() => this.store.dispatch(new fromStore.LoadMarketDataDefaults), 100);
    } else if (this.displayMode === 'Configure Downstream Mappings') {
      setTimeout(() => this.store.dispatch(new fromStore.LoadDownstreamMapping), 100);
    } else if (this.displayMode === 'Manage Future Roots') {
      setTimeout(() => this.store.dispatch(new fromStore.LoadFuturesRoots), 100);
    } else if (this.displayMode === 'Create Security') {
      setTimeout(() => this.store.dispatch(new fromStore.LoadUserActivity), 100);
    } else if (this.displayMode === 'Do Not Update Flag Security List') {
      setTimeout(() => this.store.dispatch(new fromStore.LoadSecurityDoNotUpdateFlagList), 100);
    }
  }

}
