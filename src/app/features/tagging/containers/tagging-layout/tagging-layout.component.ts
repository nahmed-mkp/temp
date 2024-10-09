import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacyTabChangeEvent as MatTabChangeEvent } from '@angular/material/legacy-tabs';

import * as fromStore from './../../store';
import * as fromModels from './../../models/tagging.models';

import { TradeNameTaggingComponent, PositionTaggingComponent, TagChangeResetConfirmationComponent, MessageDialogConfirmationComponent } from '../../components';

@Component({
    selector: 'app-tagging-layout',
    templateUrl: './tagging-layout.component.html',
    styleUrls: ['./tagging-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaggingLayoutComponent implements OnInit, OnDestroy {

    @ViewChild('tradeNameTags') tradeNameTagsCtrl: TradeNameTaggingComponent;
    @ViewChild('positionTags') positionTagsCtrl: PositionTaggingComponent;

    public tags$: Observable<any>;
    public tagsLoading$: Observable<boolean>;
    public tagsLoaded$: Observable<boolean>;
    public tagsError$: Observable<string>;

    public lookups$: Observable<any>;
    public lookupsLoading$: Observable<boolean>;
    public lookupsLoaded$: Observable<boolean>;
    public lookupsError$: Observable<string>;

    public selectedDateRange$: Observable<fromModels.IDateRange>;

    public tradeNameTags$: Observable<any[]>;
    public tradeNameTagsLoading$: Observable<boolean>;
    public tradeNameTagsLoaded$: Observable<boolean>;
    public tradeNameTagsError$: Observable<string>;
    public tradeNameTagsUpdateResult$: Observable<any[]>;

    public positionTags$: Observable<any[]>;
    public positionTagsLoading$: Observable<boolean>;
    public positionTagsLoaded$: Observable<boolean>;
    public positionTagsError$: Observable<string>;
    public positionTagsUpdateResult$: Observable<any[]>;

    public subscriptions: Subscription[] = [];

    public selectedDateRange: fromModels.IDateRange;
    public selectedTab: string = 'Position Tags';

    constructor(private store: Store<fromStore.TaggingState>, private dialog: MatDialog) {

        this.tags$ = this.store.select(fromStore.getTagsList);
        this.tagsLoading$ = this.store.select(fromStore.getTagsListLoading);
        this.tagsLoaded$ = this.store.select(fromStore.getTagsListLoaded);
        this.tagsError$ = this.store.select(fromStore.getTagsListError);

        this.lookups$ = this.store.select(fromStore.getTaggingLookups);
        this.lookupsLoading$ = this.store.select(fromStore.getTaggingLookupsLoading);
        this.lookupsLoaded$ = this.store.select(fromStore.getTaggingLookupsLoaded);
        this.lookupsError$ = this.store.select(fromStore.getTaggingLookupsError);

        this.selectedDateRange$ = this.store.select(fromStore.getSelectedDateRange);

        // TradeName tags
        this.tradeNameTags$ = this.store.select(fromStore.getTradeNameTags);
        this.tradeNameTagsLoading$ = this.store.select(fromStore.getTradeNameTagsLoading);
        this.tradeNameTagsLoaded$ = this.store.select(fromStore.getTradeNameTagsLoaded);
        this.tradeNameTagsError$ = this.store.select(fromStore.getTradeNameTagsError);
        this.tradeNameTagsUpdateResult$ = this.store.select(fromStore.getTradeNameTagsUpdateResult);

        // Position tags
        this.positionTags$ = this.store.select(fromStore.getPositionTags);
        this.positionTagsLoading$ = this.store.select(fromStore.getPositionTagsLoading);
        this.positionTagsLoaded$ = this.store.select(fromStore.getPositionTagsLoaded);
        this.positionTagsError$ = this.store.select(fromStore.getPositionTagsError);
        this.positionTagsUpdateResult$ = this.store.select(fromStore.getPositionTagsUpdateResult);

        this.subscriptions.push(
            this.selectedDateRange$
                .subscribe((range) => {
                    if (range) {
                        this.selectedDateRange = range;
                        this.loadTab(this.selectedTab, this.selectedDateRange);
                    }
                })
        );
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }

    changeDateRange(selectedDateRange: fromModels.IDateRange): void {
        this.selectedDateRange = selectedDateRange;
        this.loadTab(this.selectedTab, this.selectedDateRange);
    }

    tabChanged(e: MatTabChangeEvent): void {
        this.selectedTab = e.tab.textLabel;
        this.loadTab(this.selectedTab, this.selectedDateRange);
    }

    resetChanges(): void {
        this.loadTab(this.selectedTab, this.selectedDateRange);
    }

    loadTab(selectedTab: string, selectedDateRange: fromModels.IDateRange): void {
        if (selectedTab === 'Tradename Tags' && selectedDateRange) {
            if (this.tradeNameTagsCtrl && this.tradeNameTagsCtrl.isDirty()) {
                const dialogRef = this.dialog.open(TagChangeResetConfirmationComponent);
                this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
                    if (result === true) {
                        this.tradeNameTagsCtrl.resetChanges();
                        this.store.dispatch(new fromStore.LoadTradeNameTags(selectedDateRange));
                    }
                }));
            } else {
                this.store.dispatch(new fromStore.LoadTradeNameTags(selectedDateRange));
            }
        } else if (selectedTab === 'Position Tags' && selectedDateRange) {
            if (this.positionTagsCtrl && this.positionTagsCtrl.isDirty()) {
                const dialogRef = this.dialog.open(TagChangeResetConfirmationComponent);
                this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
                    if (result === true) {
                        this.positionTagsCtrl.resetChanges();
                        this.store.dispatch(new fromStore.LoadPositionTags(selectedDateRange));
                    }
                }));
            } else {
                this.store.dispatch(new fromStore.LoadPositionTags(selectedDateRange));
            }
        }
    }

    // saveChanges(): void {
    //     if (this.selectedTab === 'TradeName Tags') {
    //         if (this.tradeNameTagsCtrl.isDirty()) {
    //             const changes = {
    //                 'startDate': this.selectedDateRange.startDate,
    //                 'endDate': this.selectedDateRange.endDate,
    //                 'payload': this.tradeNameTagsCtrl.getChanges()
    //             };
    //             this.store.dispatch(new fromStore.UpdateTradeNameTags(changes));
    //         } else {
    //             const dialogRef = this.dialog.open(MessageDialogConfirmationComponent, {
    //                 data: {
    //                     text: 'No changes were made to the TradeName Tags!'
    //                 }});
    //         }
    //     } else if (this.selectedTab === 'Position Tags') {
    //         if (this.positionTagsCtrl.isDirty()) {
    //             this.store.dispatch(new fromStore.UpdatePositionTags(this.positionTagsCtrl.getChanges()));
    //         } else {
    //             const dialogRef = this.dialog.open(MessageDialogConfirmationComponent, {
    //                 data: {
    //                     text: 'No changes were made to the Position Tags!'
    //                 }
    //             });
    //         }
    //     }
    // }

    onUpdateTradeNameTag(event: fromModels.ITradeNameTagChanges) {
        this.store.dispatch(new fromStore.UpdateTradeNameTags(event));
    }

    onUpdatePositionTag(event: fromModels.IPositionTagChangesAdvance[]) {
        this.store.dispatch(new fromStore.UpdatePositionTags(event));
    }
}
