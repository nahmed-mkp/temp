import { Component, OnInit, HostBinding, ViewChild, AfterViewInit, SimpleChanges } from '@angular/core';
import { MatLegacyTabChangeEvent as MatTabChangeEvent, MatLegacyTabGroup as MatTabGroup } from '@angular/material/legacy-tabs';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

import { PricingEnginePopupViewerComponent } from '../popup/value-retention-popup.component';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-pricing-engine-general-layout',
  templateUrl: './pricing-engine-general-layout.component.html',
  styleUrls: ['./pricing-engine-general-layout.component.scss']
})
export class PricingEngineGeneralLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild('tabs') tabGroup: MatTabGroup;
  @HostBinding('class') classes = 'vertical-flex-full-height';

  public latestPortfolioDate$: Observable<any>;
  public selectedPortfolioDate$: Observable<any>;
  public pricingPayload = null;

  constructor(private dialog: MatDialog, private location: Location, private router: Router, private activatedRoute: ActivatedRoute, private store: Store<fromStore.PricingEngineState>) {
  }

  ngOnInit() {
    this.latestPortfolioDate$ = this.store.select(fromStore.getLatestPortfolioDate);
    this.selectedPortfolioDate$ = this.store.select(fromStore.getSelectedDate);
    this.store.dispatch(new fromStore.GetLatestPortfolioDate());
  }

  ngAfterViewInit(): void {
    this.activatedRoute.url.subscribe((route) => {
      if (route && route.length === 1) {
        const assetClass = route[0]['path'].toLowerCase();
        const currentTabs = this.tabGroup._tabs.map((tab) => tab.textLabel.toLowerCase());
        const curIndex = currentTabs.indexOf(assetClass);
        if (curIndex >= 0) {
          this.tabGroup.selectedIndex = curIndex;
        } else {
          this.tabGroup.selectedIndex = 0;
        }
      }
    });
  }

  openValueRetentionDialog(e) {
    const dialogRef = this.dialog.open(PricingEnginePopupViewerComponent, {
        hasBackdrop: true,
        panelClass: 'event-analysis-pop-up-panel',
        width: '20rem',
        height: '10rem'
    });
    dialogRef.componentInstance.pricingData = e;
  }

  public changeTab(e: MatTabChangeEvent): void {
    const assetClass = e.tab.textLabel.toLowerCase();
    this.activateRoute(assetClass);
  }

  public activateRoute(assetClass: string): void {
    const url = this.router.createUrlTree([assetClass], { relativeTo: this.activatedRoute.parent, }).toString();
    this.location.go(url);
  }

}
