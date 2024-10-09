import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as moment from 'moment';
import * as fromStore from './../../store';
import * as fromModels from './../../models/capitals.models';

@Component({
    selector: 'app-capitals-bottom-sheet-layout',
    templateUrl: './capitals-bottom-sheet-layout.component.html',
    styleUrls: ['./capitals-bottom-sheet-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CapitalsBottomSheetLayoutComponent implements OnInit {

    public capitalFlowsInput$: Observable<fromModels.ICapitalFlowInput>;
    public fundCapitalHistoryInput$: Observable<fromModels.ICapitalHistoryInput>;

    public fundCapitalFlows$: Observable<any[]>;
    public fundCapitalFlowsLoading$: Observable<boolean>;
    public fundCapitalFlowsLoaded$: Observable<boolean>;
    public fundCapitalFlowsError$: Observable<string>;

    public podCapitalFlows$: Observable<any[]>;
    public podCapitalFlowsLoading$: Observable<boolean>;
    public podCapitalFlowsLoaded$: Observable<boolean>;
    public podCapitalFlowsError$: Observable<string>;

    public fundCapitalHistory$: Observable<any[]>;
    public fundCapitalHistoryLoading$: Observable<boolean>;
    public fundCapitalHistoryLoaded$: Observable<boolean>;
    public fundCapitalHistoryError$: Observable<string>;

    constructor(private store: Store<fromStore.AllocationsState>,
        private bottomSheetRef: MatBottomSheetRef<CapitalsBottomSheetLayoutComponent>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {

        this.capitalFlowsInput$ = this.store.select(fromStore.getCapitalFlowsInput);
        // this.fundCapitalHistoryInput$ = this.store.select(fromStore.getFundCapitalHistoryInput);

        this.fundCapitalFlows$ = this.store.select(fromStore.getFundCapitalFlows);
        this.fundCapitalFlowsLoading$ = this.store.select(fromStore.getFundCapitalFlowsLoading);
        this.fundCapitalFlowsLoaded$ = this.store.select(fromStore.getFundCapitalFlowsLoaded);
        this.fundCapitalFlowsError$ = this.store.select(fromStore.getFundCapitalFlowsError);

        this.podCapitalFlows$ = this.store.select(fromStore.getPodCapitalFlows);
        this.podCapitalFlowsLoading$ = this.store.select(fromStore.getPodCapitalFlowsLoading);
        this.podCapitalFlowsLoaded$ = this.store.select(fromStore.getPodCapitalFlowsLoaded);
        this.podCapitalFlowsError$ = this.store.select(fromStore.getPodCapitalFlowsError);

        this.fundCapitalHistory$ = this.store.select(fromStore.getFundCapitalHistory);
        this.fundCapitalHistoryLoading$ = this.store.select(fromStore.getFundCapitalHistoryLoading);
        this.fundCapitalHistoryLoaded$ = this.store.select(fromStore.getFundCapitalHistoryLoaded);
        this.fundCapitalHistoryError$ = this.store.select(fromStore.getFundCapitalHistoryError);
    }

    ngOnInit(): void {
        const startDate = moment(this.data.input.asOfDate.replace('-', '/')).add(-30, 'days').format('MM-DD-YYYY');
        const endDate = moment(this.data.input.asOfDate.replace('-', '/')).add(10, 'days').format('MM-DD-YYYY');
        const capitalFlowInput: fromModels.ICapitalFlowInput = {startDate: startDate, endDate: endDate};
        this.changeFlowsInput(capitalFlowInput);

        // const historyEndDate = moment(endDate.replace('-', '/')).add(20, 'days').format('MM-DD-YYYY');
        // const historyStartDate = moment(startDate.replace('-', '/')).add(-60, 'days').format('MM-DD-YYYY');
        // const capitalHistoryInput: fromModels.IFundCapitalHistoryInput = { startDate: historyStartDate, endDate: historyEndDate, activeOnly: false};
        // this.changeHistoryInput(capitalHistoryInput);
    }

    changeFlowsInput(input: fromModels.ICapitalFlowInput): void {
        this.store.dispatch(new fromStore.LoadPodCapitalFlows(input));
        this.store.dispatch(new fromStore.LoadFundCapitalFlows(input));
    }

    changeHistoryInput(input: fromModels.ICapitalHistoryInput): void {
        this.store.dispatch(new fromStore.LoadFundCapitalHistory(input));
    }
}
