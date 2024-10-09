import { Component, OnInit, OnDestroy, Output, EventEmitter, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription, Subject, combineLatest } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

import * as fromStore from '../../store';
import * as fromModels from '../../models/agreements.models';


@Component({
    selector: 'app-agreements-layout',
    templateUrl: './agreements-layout.component.html',
    styleUrls: ['./agreements-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradeAgreementsLayoutComponent implements OnInit, OnDestroy {

    @HostBinding('class') classes = 'vertical-flex-full-height';

    public agreementTypes$: Observable<fromModels.ITradeAgreementType[]>;
    public agreementSecTypes$: Observable<{ [type: string]: fromModels.ITradeAgreementSecType[] }>;

    public agreementTypesLoading$: Observable<boolean>;
    public agreementTypesLoaded$: Observable<boolean>;
    public agreementTypesError$: Observable<string>;

    public agreementsSubscription$: Subscription;

    public selectedTradeAgreementTypes$: Observable<fromModels.ITradeAgreementType[]>;
    public agreementsWithSecTypes$: Subject<fromModels.ITradeAgreement[]> = new Subject<fromModels.ITradeAgreement[]>();

    public agreements$: Observable<fromModels.ITradeAgreement[]>;
    public agreementsLoading$: Observable<boolean>;
    public agreementsLoaded$: Observable<boolean>;
    public agreementsError$: Observable<string>;

    public selectedTradeAgreementSubscription$: Subscription;
    public filteredTradeAgreements$: Subject<fromModels.ITradeAgreement[]> = new Subject<fromModels.ITradeAgreement[]>();

    constructor(private store: Store<fromStore.AllocationsState>) {

        this.agreementTypes$ = this.store.select(fromStore.getTradeAgreementTypes);
        this.agreementSecTypes$ = this.store.select(fromStore.getTradeAgreementSecTypeEntities);

        this.agreementTypesLoading$ = this.store.select(fromStore.getTradeAgreementTypesLoading);
        this.agreementTypesLoaded$ = this.store.select(fromStore.getTradeAgreementTypesLoaded);
        this.agreementTypesError$ = this.store.select(fromStore.getTradeAgreementTypesError);
        this.selectedTradeAgreementTypes$ = this.store.select(fromStore.getSelectedTradeAgreementTypes);

        this.selectedTradeAgreementTypes$ = this.store.select(fromStore.getSelectedTradeAgreementTypes);

        this.agreements$ = this.store.select(fromStore.getTradeAgreements);
        this.agreementsLoading$ = this.store.select(fromStore.getTradeAgreementsLoading);
        this.agreementsLoaded$ = this.store.select(fromStore.getTradeAgreementsLoaded);
        this.agreementsError$ = this.store.select(fromStore.getTradeAgreementsError);

        this.selectedTradeAgreementSubscription$ = combineLatest(this.selectedTradeAgreementTypes$, this.agreementsWithSecTypes$)
            .subscribe( ([agreementTypes, agreements]) => {
                if (agreementTypes && agreementTypes.length > 0) {
                    const agreementTypeCodes = agreementTypes.map((agreementType) => agreementType.code);
                    this.filteredTradeAgreements$.next(agreements.filter((agreement) => agreementTypeCodes.indexOf(agreement.tradeAgreement) >= 0));
                } else {
                    setTimeout(() => this.filteredTradeAgreements$.next(agreements));
                }
            });

        this.agreementsSubscription$ = combineLatest(this.agreements$, this.agreementSecTypes$)
            .subscribe(([agreements, agreementsSecTypes]) => {
                if (agreements && agreementsSecTypes && agreements.length > 0 && Object.keys(agreementsSecTypes).length > 0) {
                    const result = agreements.map((agreement) => {
                        const excludedSecTypes = (agreement.excludedSecTypes && agreement.excludedSecTypes.length > 0) ?
                            agreement.excludedSecTypes.split(',').map((excludedSecType) => excludedSecType.trim()) : [];

                        let secTypes = [];
                        // console.log('agreementsSecTypes', agreementsSecTypes, agreement.tradeAgreement);
                        if (agreementsSecTypes[agreement.tradeAgreement] !== undefined) {
                            secTypes = agreementsSecTypes[agreement.tradeAgreement].map((agreementSecType) => {
                                return agreementSecType.secType;
                            });
                        }

                        if (excludedSecTypes.length > 0) {
                            secTypes = secTypes.filter((secType) => excludedSecTypes.indexOf(secType) < 0);
                        }

                        let underlyingSecTypes = [];
                        if (agreementsSecTypes[agreement.tradeAgreement] !== undefined) {
                            underlyingSecTypes = agreementsSecTypes[agreement.tradeAgreement].map((agreementSecType) => {
                                return agreementSecType.underlyingSecType;
                            });
                        }
                        const uniqueSecTypes = secTypes.filter((item, idx) => secTypes.indexOf(item) === idx);
                        const uniqueUnderlyingSecTypes = underlyingSecTypes.filter((item, idx) => underlyingSecTypes.indexOf(item) === idx);
                        return Object.assign({},
                            agreement,
                            {
                                'secTypes': uniqueSecTypes.join(', '),
                                'underlyingSecTypes': uniqueUnderlyingSecTypes.join(', ')
                            });
                    });
                    this.agreementsWithSecTypes$.next(result);
                }
            });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        if (this.selectedTradeAgreementSubscription$) {
            this.selectedTradeAgreementSubscription$.unsubscribe();
        }

        if (this.agreementsSubscription$) {
            this.agreementsSubscription$.unsubscribe();
        }
    }

    changeAgreementTypes(agreementTypes: fromModels.ITradeAgreementType[]): void {
        if (agreementTypes && agreementTypes.length === 0) {
            this.store.dispatch(new fromStore.ClearAgreementTypes);
        } else {
            this.store.dispatch(new fromStore.SelectAgreementTypes(agreementTypes));
        }
    }

    addAgreement(event: fromModels.ITradeAgreement) {
        this.store.dispatch(new fromStore.AddTradeAgreement(event));
    }

    updateAgreement(event: fromModels.ITradeAgreement) {
        this.store.dispatch(new fromStore.UpdateTradeAgreement(event));
    }

    deleteAgreement(event: fromModels.ITradeAgreement) {
        this.store.dispatch(new fromStore.DeleteTradeAgreement(event));
    }

    resetAgreementGrid(event) {
        this.store.dispatch(new fromStore.ResetAgreementGrid());
    }

    updateAllocationCache(event) {
        this.store.dispatch(new fromStore.UpdateTradeAgreementAllocationCache());
    }

}
