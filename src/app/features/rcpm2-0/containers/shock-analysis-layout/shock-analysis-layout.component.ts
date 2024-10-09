import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as fromStore from '../../store';

@Component({
    selector: 'app-portfolio-shock-analysis-layout',
    templateUrl: './shock-analysis-layout.component.html',
    styleUrls: ['./shock-analysis-layout.component.scss']
})
export class ShockAnalysisLayoutComponent implements OnInit, OnDestroy {

    public shockInfo$: Observable<any>;
    private subscription: Subscription;

    constructor(private store: Store<fromStore.RCPM2State>) { }

    ngOnInit(): void {
        this.store.dispatch(new fromStore.LoadShockInfo());
        this.shockInfo$ = this.store.select(fromStore.getShockInfo);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    triggerShock() {
        console.log('trigger shock');
        this.store.dispatch(new fromStore.HitShockTrigger());
    }

    get tableauUrl(): string {
      // return `http://mkpnycreports01.mkpcap.com/views/PortfolioShockAnalysis/Commodities?iframeSizedToWindow=true&:embed=y&:showAppBanner=false&:display_count=no&:showVizHome=no&uuid=29f457b1-4e32-b1b6-0aeb-b1b9d8912518&refresh=y`;
      return `http://mkpnycreports01.mkpcap.com/views/PortfolioShockAnalysis/Commodities`;
  }
}
