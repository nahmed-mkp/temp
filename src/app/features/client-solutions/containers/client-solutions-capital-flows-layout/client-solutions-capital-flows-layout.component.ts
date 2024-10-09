import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription } from 'rxjs';

import * as moment from 'moment';

import * as fromStore from './../../store';
import * as fromModels from './../../models';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';

@Component({
    selector: 'app-cs-capital-flows-layout',
    templateUrl: './client-solutions-capital-flows-layout.component.html',
    styleUrls: ['./client-solutions-capital-flows-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSolutionsCapitalFlowsLayoutComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input() dateRange$: Observable<fromModels.DateRange>;

    public capitalFlows$: Observable<fromModels.CapitalFlow[]>;
    public capitalFlowsLoading$: Observable<boolean>;
    public capitalFlowsLoaded$: Observable<boolean>;
    public capitalFlowsError$: Observable<string>;

    public capitalFlowStats$: Observable<fromModels.CapitalFlowStats>;
    public capitalFlowStatsLoading$: Observable<boolean>;
    public capitalFlowStatsLoaded$: Observable<boolean>;
    public capitalFlowStatsError$: Observable<string>;

    public projectedAUM$: Observable<fromModels.ProjectedAUM>;
    public projectedAUMLoading$: Observable<boolean>;
    public projectedAUMLoaded$: Observable<boolean>;
    public projectedAUMError$: Observable<string>;

    public investors$: Observable<any[]>;
    public formData$: Observable<fromModels.CapitalFlowForm>;
    public formDataLoading$: Observable<boolean>;
    public formDataLoaded$: Observable<boolean>;
    public formDataError$: Observable<string>;

    public emailSending$: Observable<boolean>;
    public emailSent$: Observable<boolean>;
    public emailError$: Observable<string>;

    public canEditCapitalFlows$: Observable<boolean>;

    public chartData$: Subject<any> = new Subject<any>();

    public subscriptions: Subscription[] = [];

    constructor(private store: Store<fromStore.State>, private snackBar: MatSnackBar) {

        this.investors$ = this.store.select(fromStore.getInvestors);

        this.capitalFlows$ = this.store.select(fromStore.getCapitalFlows);
        this.capitalFlowsLoading$ = this.store.select(fromStore.getCapitalFlowsLoading);
        this.capitalFlowsLoaded$ = this.store.select(fromStore.getCapitalFlowsLoaded);
        this.capitalFlowsError$ = this.store.select(fromStore.getCapitalFlowsError);

        this.capitalFlowStats$ = this.store.select(fromStore.getCapitalFlowStats);
        this.capitalFlowStatsLoading$ = this.store.select(fromStore.getCapitalFlowStatsLoading);
        this.capitalFlowStatsLoaded$ = this.store.select(fromStore.getCapitalFlowStatsLoaded);
        this.capitalFlowStatsError$ = this.store.select(fromStore.getCapitalFlowStatsError);

        this.projectedAUM$ = this.store.select(fromStore.getCapitalFlowProjectedAUM);
        this.projectedAUMLoading$ = this.store.select(fromStore.getCapitalFlowProjectedAUMLoading);
        this.projectedAUMLoaded$ = this.store.select(fromStore.getCapitalFlowProjectedAUMLoaded);
        this.projectedAUMError$ = this.store.select(fromStore.getCapitalFlowProjectedAUMError);

        this.formData$ = this.store.select(fromStore.getCapitalFlowFormData);
        this.formDataLoading$ = this.store.select(fromStore.getCapitalFlowFormDataLoading);
        this.formDataLoaded$ = this.store.select(fromStore.getCapitalFlowFormDataLoaded);
        this.formDataError$ = this.store.select(fromStore.getCapitalFlowFormDataError);

        this.emailSending$ = this.store.select(fromStore.getCapitalFlowEmailSending);
        this.emailSent$ = this.store.select(fromStore.getCapitalFlowEmailSent);
        this.emailError$ = this.store.select(fromStore.getCapitalFlowEmailError);

        this.canEditCapitalFlows$ = this.store.select(fromStore.getCanEditCapitalFlows);

        this.subscriptions.push(this.capitalFlows$
            .subscribe((capitalFlows) => {
                this._updateChartData(capitalFlows);
        }));

        this.subscriptions.push(this.emailSent$
            .subscribe((emailSent) => {
                if (emailSent) {
                    this.snackBar.open('Emails sent successfully!', '', {duration: 3000});
                }
            }));
    }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        if (this.dateRange$) {
            this.dateRange$.subscribe((dateRange) => {
                this.loadCapitalFlows(dateRange);
            });
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    public loadCapitalFlows(dateRange: fromModels.DateRange): void {
        this.store.dispatch(new fromStore.LoadCapitalFlows(dateRange));
        this.store.dispatch(new fromStore.LoadCapitalFlowStats(dateRange));
        this.store.dispatch(new fromStore.LoadCapitalFlowProjectedAUM());
        this.store.dispatch(new fromStore.LoadCapitalFlowForm());
    }

    private _updateChartData(capitalFlows: fromModels.CapitalFlow[]): void {
        const result = {};

        // Update Total Subs/Reds
        const totalFlows = {'sub': 0, 'red': 0};

        // Update Totals by Fund
        const totalByFund = {};

        capitalFlows.map((flow) => {
            const date = moment(flow.EffectiveDate.split('T')[0], 'YYYY-MM-DD');
            const year = date.year().toString();
            const yyyymm = date.format('MMM YY');
            const fund = flow.MasterFundName;

            if (flow.TransactionType.toLowerCase() === 'subscription') {
                totalFlows['sub'] = totalFlows['sub'] + Math.round(flow.TransactionAmountUSD);
            } else {
                totalFlows['red'] = totalFlows['red'] + Math.round(Math.abs(flow.TransactionAmountUSD));
            }

            if (Object.keys(totalByFund).indexOf(yyyymm) < 0) {
                totalByFund[yyyymm] = {};
            }

            if (Object.keys(totalByFund[yyyymm]).indexOf(fund) < 0) {
                totalByFund[yyyymm][fund] = 0;
            }

            totalByFund[yyyymm][fund] = totalByFund[yyyymm][fund] + Math.round(flow.TransactionAmountUSD);

        });
        result['totalFlows'] = totalFlows;
        result['totalFlowsByFund'] = totalByFund;

        this.chartData$.next(result);
    }

    public addInvestment(payload: any): void {
        this.store.dispatch(new fromStore.AddCapitalActivity(payload));
    }

    public editInvestment(payload: any): void {
        this.store.dispatch(new fromStore.UpdateCapitalActivity(payload));
    }

    public deleteInvestment(payload: any): void {
        this.store.dispatch(new fromStore.DeleteCapitalActivity(payload));
    }

    public sendCapitalFlowEmail(): void {
        this.store.dispatch(new fromStore.SendCapitalFlowEmail());
    }
}
