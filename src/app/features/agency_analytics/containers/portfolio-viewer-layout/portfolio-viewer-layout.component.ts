import { ChangeDetectionStrategy, Component, OnInit, Input, OnDestroy, 
    EventEmitter, OnChanges, SimpleChanges, Output } from '@angular/core';

import * as fromStore from './../../store';
import * as fromModels from './../../models/agency-analytics.models';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Component({
    selector: 'app-portfolio-viewer-layout',
    templateUrl: './portfolio-viewer-layout.component.html',
    styleUrls: ['./portfolio-viewer-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioViewerLayoutComponent implements OnInit, OnDestroy, OnChanges {

    @Input() mode$: Observable<'Live' | 'Close'>;
    @Input() lookups: Observable<any>;
    @Input() portfolio: fromModels.IPortfolio;
    @Input() selectedViews: fromModels.IGridViews;
    @Input() selectedItems: fromModels.ISecurityDetail[];
    @Output() updateSelectedItems: EventEmitter<fromModels.IPortfolioSelection> = new EventEmitter<fromModels.IPortfolioSelection>();

    public securityDetails$: Observable<fromModels.ISecurityDetail[]>;
    public securityDetailsLoading$: Observable<boolean>;
    public securityDetailsLoaded$: Observable<boolean>;
    public securityDetailsError$: Observable<string>;

    private portfolio$: BehaviorSubject<fromModels.IPortfolio> = new BehaviorSubject<fromModels.IPortfolio>(null);
    
    private subscriptions: Subscription[] = [];    

    constructor(private store:Store<fromStore.AgencyAnalyticsState>) {
        this.subscriptions.push(this.portfolio$
            .subscribe((portfolio) => {
                if (portfolio) {
                    this.securityDetails$ = this.store.select(fromStore.getSelectedPortfolioDetails(this.portfolio.guid));
                    this.securityDetailsLoading$ = this.store.select(fromStore.getSelectedPortfolioDetailsLoading(this.portfolio.guid));
                    this.securityDetailsLoaded$ = this.store.select(fromStore.getSelectedPortfolioDetailsLoaded(this.portfolio.guid));
                    this.securityDetailsError$ = this.store.select(fromStore.getSelectedPortfolioDetailsError(this.portfolio.guid));
                }
            }))
    }
    
    ngOnInit(): void { }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        })
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.portfolio && changes.portfolio.currentValue) { 
            this.portfolio$.next(changes.portfolio.currentValue);
        }        
    }

    onUpdateSelectedItems(items: fromModels.ISecurityDetail[]): void {
        this.updateSelectedItems.emit({guid: this.portfolio.guid, items: [...items]});
    }
}
