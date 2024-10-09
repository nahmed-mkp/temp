import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Subject } from 'rxjs';
import { CapitalFlowDeleteConfirmationDialogComponent } from '../flow-delete-confirmation-dialog/flow-delete-confirmation-dialog.component';

import * as fromModels from '../../models';
import { InvestorDeleteConfirmationDialogComponent } from '../investor-delete-confirmation-dialog/investor-delete-confirmation-dialog.component';

@Component({
    selector: 'app-cs-investor-form',
    templateUrl: 'client-solutions-investor-form.component.html',
    styleUrls: ['client-solutions-investor-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSolutionsInvestorFormComponent implements OnInit, OnChanges {

    @Input() investors: any[];
    @Input() formData: fromModels.CapitalFlowForm;
    @Input() formDataLoading: boolean;
    @Input() formDataLoaded: boolean;
    @Input() formDataError: string;

    @Input() investmentId: number;
    @Input() mode: 'Edit' | 'Delete';

    public disableEvents = false;

    public masterFund: string;
    public feederFund: string;

    isLinear = false;
    fundFormGroup: UntypedFormGroup;
    existingInvestorFormGroup: UntypedFormGroup;

    constructor(public dialogRef: MatDialogRef<ClientSolutionsInvestorFormComponent>,
                @Inject(MAT_DIALOG_DATA) public data, private _formBuilder: UntypedFormBuilder, private dialog: MatDialog) {

        this.disableEvents = true;

        // fund Details
        let masterFund = null;
        let feederFund = null;

        // investor Details
        let investmentId = null; // This is the investorName and FundId combo
        let investorName = null;
        let fundId = null;
        let investorId = null;
        let investorType = null;
        let relationship = null;
        let region = null;
        let consultant = null;
        let managementFee = null;
        let incentiveFee = null;
        let feeNotes = null;

        if (this.data) {
            this.investors = this.data['investors'];
            this.formData = this.data['formData'];
            this.formDataLoading = this.data['formDataLoading'];
            this.formDataLoaded = this.data['formDataLoaded'];
            this.formDataError = this.data['formDataError'];
            this.mode = this.data['mode'];
            const selectedRow = this.data['selectedRow'] || null;
            if (selectedRow) {
                masterFund = selectedRow['MasterFundName'];
                feederFund = selectedRow['Fund'];
                investmentId = selectedRow['Id'];
                investorName = selectedRow['InvestorName'];
                fundId = selectedRow['FundId'];
                investorId = selectedRow['InvestorId'];
                investorType = selectedRow['InvestorType'] || null;
                relationship = selectedRow['Relationship'] || null;
                region = selectedRow['Region'] || null;
                consultant = selectedRow['Consultant'] || null;
                feeNotes = selectedRow['Notes'] || null;
                managementFee = selectedRow['MgmtFee'] || 0.0;
                incentiveFee = selectedRow['IncFee'] || 0.0;
            }
        }

        this.fundFormGroup = this._formBuilder.group({
            masterFund: [masterFund, Validators.required],
            feederFund: [feederFund, Validators.required]
        });

        this.existingInvestorFormGroup = this._formBuilder.group({
            investmentId: [investmentId, Validators.required],
            investor: [investorName, Validators.required],
            investorName: [investorName, Validators.required],
            fundId: [fundId, Validators.required],
            investorId: [investorId],
            investorType: [investorType, Validators.required],
            relationship: [relationship, Validators.required],
            region: [region, Validators.required],
            consultant: [consultant, Validators.required],
            managementFee: [managementFee, Validators.required],
            incentiveFee: [incentiveFee, Validators.required],
            feeNotes: [feeNotes]
        });

        this.disableEvents = false;

    }

    ngOnChanges(changes: SimpleChanges): void {

    }

    ngOnInit() {
    }

    public getMasterFunds(): string[] {
        if (this.investors) {
            return this.investors.map((investor) => investor.MasterFundName).filter(this._unique);
        }
        return [];
    }

    public getFeederFunds(): string[] {
        if (this.investors && this.fundFormGroup.get('masterFund').value !== null) {
            return this.investors
                .filter((investor) => investor.MasterFundName === this.fundFormGroup.get('masterFund').value)
                .map((investor) => investor.Fund)
                .filter(this._unique);
        }
        return [];
    }

    public hasFeederFund(): boolean {
        if (this.fundFormGroup && this.fundFormGroup.get('masterFund')) {
            const feederFunds = this.getFeederFunds();
            if (feederFunds.length > 1) {
                return true;
            }
        }
        return false;
    }

    public getInvestorTypes(): string[] {
        if (this.formData && this.formData.investorTypes) {
            return this.formData.investorTypes;
        }
        return [];
    }

    public getRelationships(): string[] {
        if (this.formData && this.formData.relationships) {
            return this.formData.relationships;
        }
        return [];
    }

    public getRegions(): string[] {
        if (this.formData && this.formData.regions) {
            return this.formData.regions;
        }
        return [];
    }

    public getConsultants(): string[] {
        if (this.formData && this.formData.consultants) {
            return this.formData.consultants;
        }
        return [];
    }

    public getTransactionTypes(): string[] {
        return ['Subscription', 'Redemption'];
    }

    public changeMasterFund(val: MatOptionSelectionChange): void {
        if (this.disableEvents || this.mode === 'Edit') {
            return;
        }
        if (val.source.selected) {
            const masterFund = val.source.value;
            this.fundFormGroup.controls['masterFund'].patchValue(masterFund);
            this.fundFormGroup.controls['feederFund'].patchValue(null);
            if (masterFund === 'GMMK') {
                this.existingInvestorFormGroup.controls['fundId'].patchValue('GMMKSerA');
                this.existingInvestorFormGroup.controls['investorId'].patchValue('GMMKSerA');
            }
            if (!this.hasFeederFund()) {
                const feederFunds = this.getFeederFunds();
                this.fundFormGroup.controls['feederFund'].patchValue(feederFunds[0]);
            }
        }
    }

    public changeFeederFund(val: MatOptionSelectionChange): void {
        if (this.disableEvents) {
            return;
        }
        if (val.source.selected) {
            const feederFund = val.source.value;
            if (feederFund === 'GMMK') {
                this.existingInvestorFormGroup.controls['fundId'].patchValue('GMMKSerA');
                this.existingInvestorFormGroup.controls['investorId'].patchValue('GMMKSerA');
            }
        }
    }

    public resetForm(formGroup: string): void {
        let form = null;
        if (formGroup === 'existingInvestorFormGroup') {
            form = this.existingInvestorFormGroup;
        }
        Object.keys(form.controls).forEach((ctrlName: string) => {
            const ctrl: UntypedFormControl = form.controls[ctrlName];
            ctrl.markAsPristine();
            ctrl.markAsUntouched();
            ctrl.reset();
        });
        form.markAsPristine();
        form.markAsUntouched();
        form.reset();
    }

    public resetAll(): void {
        this.resetForm('existingInvestorFormGroup');
    }

    public displayInvestorName(investor: any): string {
        return investor && investor.InvestorName ? investor.InvestorName : '';
    }

    public displayManagementFee(): string {
        const mgmtFee = this.existingInvestorFormGroup.controls['managementFee'].value;
        if (mgmtFee) {
            return (mgmtFee * 100.0).toFixed(2) + '%';
        }
        return '';
    }

    public displayIncentiveFee(): string {
        const incentiveFee = this.existingInvestorFormGroup.controls['incentiveFee'].value;
        if (incentiveFee) {
            return (incentiveFee * 100.0).toFixed(2) + '%';
        }
        return '';
    }

    public areFormsValid(): boolean {
        let result = false;
        if (this.existingInvestorFormGroup.valid) {
            result = true;
        }
        return result;
    }

    public onClose() {
        this.dialogRef.close(null);
    }

    private _unique(value, index, self) {
        return self.indexOf(value) === index;
    }

    private parseDate(strDate: string): Date {
        const dateParts = strDate.split('T')[0].split('-');
        const year = parseInt(dateParts[0], 10);
        const month = parseInt(dateParts[1], 10);
        const date = parseInt(dateParts[2], 10);
        return new Date(year, month, date);
    }

    public submitForm(): void {
        if (this.areFormsValid()) {
            const finalPayload = this.getFinalPayload();
            if (this.mode === 'Edit') {
                const actionPayload = Object.assign({}, finalPayload, { 'action': 'Edit' });
                this.dialogRef.close(actionPayload);
            }
        }
    }

    public deleteInvestor(): void {
        const payload = this.getFinalPayload();
        const dialogRef = this.dialog.open(InvestorDeleteConfirmationDialogComponent, {
            hasBackdrop: true,
            panelClass: 'event-analysis-pop-up-panel',
            data: payload,
            height: '150px',
            width: '600px'
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                const actionPayload = Object.assign({}, payload, {'action': 'Delete'});
                this.dialogRef.close(actionPayload);
            }
        });
    }

    public getFinalPayload(): any {
        let payload = this.fundFormGroup.value;
        payload = Object.assign({}, payload, this.existingInvestorFormGroup.value);
        return payload;
    }

}
