import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

import { On, Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { MatSelectChange } from '@angular/material/select';

import * as fromModels from './../../models/agency-dials.models';
import * as fromStore from './../../store';

@Component({
    selector: 'app-agency-dials-layout',
    templateUrl: './agency-dials-layout.component.html',
    styleUrls: ['./agency-dials-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgencyDialsLayoutComponent implements OnInit, OnDestroy {

    public defaultTemplate$: Observable<fromModels.IDialDetail>;
    public defaultTemplateLoading$: Observable<boolean>;
    public defaultTemplateLoaded$: Observable<boolean>;
    public defaultTemplateError$: Observable<string>;

    public dials$: Observable<fromModels.IDial[]>;
    public dialsLoading$: Observable<boolean>;
    public dialsLoaded$: Observable<boolean>;
    public dialsError$: Observable<string>;

    public selectedDialId$: Observable<string>;
    public selectedDial$: Observable<fromModels.IDial>;
    public selectedDialDetail$: Observable<fromModels.IDialDetail>;
    public selectedDialLoading$: Observable<boolean>;
    public selectedDialLoaded$: Observable<boolean>;
    public selectedDialError$: Observable<string>;

    public selectedDialSubject$: BehaviorSubject<fromModels.IDial> = new BehaviorSubject<fromModels.IDial>(null);

    private subscriptions$: Subscription[] = [];

    constructor(public dialogRef: MatDialogRef<AgencyDialsLayoutComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private store: Store<fromStore.AgencyAnalyticsState>) {

        this.defaultTemplate$ = this.store.select(fromStore.getDefaultTemplateDial);
        this.defaultTemplateLoaded$ = this.store.select(fromStore.getDefaultTemplateLoaded);
        this.defaultTemplateLoading$ = this.store.select(fromStore.getDefaultTemplateLoading);
        this.defaultTemplateError$ = this.store.select(fromStore.getDefaultTemplateError);

        this.dials$ = this.store.select(fromStore.getDials);
        this.dialsLoading$ = this.store.select(fromStore.getDialsLoading);
        this.dialsLoaded$ = this.store.select(fromStore.getDialsLoaded);
        this.dialsError$ = this.store.select(fromStore.getDialsError);

        this.selectedDialId$ = this.store.select(fromStore.getSelectedDialId);
        this.selectedDial$ = this.store.select(fromStore.getSelectedDial);
        this.selectedDialDetail$ = this.store.select(fromStore.getSelectedDialDetail);
        this.selectedDialLoading$ = this.store.select(fromStore.getSelectedDialLoading);
        this.selectedDialLoaded$ = this.store.select(fromStore.getSelectedDialLoaded);
        this.selectedDialError$ = this.store.select(fromStore.getSelectedDialError);

        this.subscriptions$.push(this.selectedDial$
            .subscribe((selectedDial: fromModels.IDial) => {
                this.selectedDialSubject$.next(selectedDial);
            }));
    }
    ngOnDestroy(): void {
        this.subscriptions$.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }

    ngOnInit(): void { }

    onDialSelected(event: MatSelectChange): void { 
        const selectedDial = event.value;
        if (selectedDial) { 
            this.store.dispatch(new fromStore.LoadDial(selectedDial));
        }
    }

    onClose() {        
        this.dialogRef.close();
        this.store.dispatch(new fromStore.ClearSelectedDial());
    }

    onCreateDial(dialDetail: fromModels.INewDialDetail): void {
        this.store.dispatch(new fromStore.AddDial(dialDetail));
    }

    onCloneDial(dialDetail: fromModels.IClonedDialDetail): void {
        this.store.dispatch(new fromStore.CloneDial(dialDetail));
    }

    onUpdateDial(dialDetail: fromModels.IDialDetail): void {
        this.store.dispatch(new fromStore.UpdateDial(dialDetail));
    }

    onDeleteDial(dialDetail: fromModels.IDialDetail): void {
        this.store.dispatch(new fromStore.DeleteDial(dialDetail));
    }
}
