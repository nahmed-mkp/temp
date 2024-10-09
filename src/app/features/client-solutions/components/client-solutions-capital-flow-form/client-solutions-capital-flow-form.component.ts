import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Subject } from 'rxjs';
import { CapitalFlowDeleteConfirmationDialogComponent } from '../flow-delete-confirmation-dialog/flow-delete-confirmation-dialog.component';

import * as fromModels from './../../models';

@Component({
    selector: 'app-cs-capital-flow-form',
    templateUrl: 'client-solutions-capital-flow-form.component.html',
    styleUrls: ['client-solutions-capital-flow-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientSolutionsCapitalFlowFormComponent implements OnInit, OnChanges {

    @Input() investors: any[];
    @Input() formData: fromModels.CapitalFlowForm;
    @Input() formDataLoading: boolean;
    @Input() formDataLoaded: boolean;
    @Input() formDataError: string;

    @Input() investmentId: number;
    @Input() mode: 'Add' | 'Edit' | 'Delete';

    public disableEvents = false;

    isLinear = false;
    fundFormGroup: UntypedFormGroup;
    newInvestorFormGroup: UntypedFormGroup;
    existingInvestorFormGroup: UntypedFormGroup;
    investmentFormGroup: UntypedFormGroup;

    constructor(public dialogRef: MatDialogRef<ClientSolutionsCapitalFlowFormComponent>,
                @Inject(MAT_DIALOG_DATA) public data, private _formBuilder: UntypedFormBuilder, private dialog: MatDialog) {

        this.disableEvents = true;

        // fund Details
        let masterFund = null;
        let feederFund = null;
        const isNewInvestment = false;

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

        // Transaction Details
        let transactionId = null;
        let effectiveDate = null;
        let transactionType = null;
        let isFullRedemption = false;
        let transactionAmountUSD = null;
        let transactionNotes = null;

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
                feederFund = selectedRow['FundName'];
                investorName = selectedRow['InvestorName'];
                fundId = selectedRow['FundId'];
                investorId = selectedRow['InvestorId'];
                investorType = selectedRow['InvestorType'] || null;
                relationship = selectedRow['Relationship'] || null;
                region = selectedRow['Region'] || null;
                consultant = selectedRow['Consultant'] || null;

                const investorInfo = this.investors.filter((investor) => (investor['InvestorName'] === investorName) &&
                  (investor['FundId'] === fundId));

                if (investorInfo.length > 0) {
                    investmentId = investorInfo[0]['Id'];
                    managementFee = investorInfo[0]['MgmtFee'] || 0.0;
                    incentiveFee = investorInfo[0]['IncFee'] || 0.0;
                    feeNotes = investorInfo[0]['Notes'];
                    investorType = investorType ? investorType : investorInfo[0]['InvestorType'];
                    relationship = relationship ? relationship : investorInfo[0]['Relationship'];
                    region = region ? region : investorInfo[0]['Region'];
                    consultant = consultant ? consultant : investorInfo[0]['Consultant'];
                }

                transactionId = selectedRow['TransactionId'];
                effectiveDate = this.parseDate(selectedRow['EffectiveDate']);
                transactionType = selectedRow['TransactionType'];
                isFullRedemption = selectedRow['Full'];
                transactionAmountUSD = selectedRow['TransactionAmountUSD'];
                transactionNotes = selectedRow['Notes'];
            }
        }

        this.fundFormGroup = this._formBuilder.group({
            masterFund: [masterFund, Validators.required],
            feederFund: [feederFund, Validators.required],
            isNewInvestment: [isNewInvestment, Validators.required]
        });

        this.newInvestorFormGroup = this._formBuilder.group({
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

        this.investmentFormGroup = this._formBuilder.group({
            transactionId: [transactionId],
            effectiveDate: [effectiveDate, Validators.required],
            transactionType: [transactionType, Validators.required],
            isFullRedemption: [isFullRedemption, Validators.required],
            transactionAmountUSD: [transactionAmountUSD, Validators.required],
            notes: [transactionNotes]
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

    public getInvestors(): any[] {
        if (this.investors) {
            let result = [...this.investors];
            const masterFund = this.fundFormGroup.controls['masterFund'].value || null;
            const fund = this.fundFormGroup.controls['feederFund'].value || null;
            if (masterFund) {
                result = result.filter((inv) => inv.MasterFundName === masterFund);
            }
            if (fund) {
                result = result.filter((inv) => inv.Fund === fund);
            }
            return result.sort((a, b) => {
                const invNameA = (a.InvestorName || '').toLowerCase();
                const invNameB = (b.InvestorName || '').toLowerCase();
                if (invNameA < invNameB) {
                    return -1;
                } else if (invNameA > invNameB) {
                    return 1;
                } else {
                    const fundIdA = (a.FundId || '').toLowerCase();
                    const fundIdB = (b.FundId || '').toLowerCase();
                    if (fundIdA < fundIdB) {
                        return -1;
                    } else if (fundIdA > fundIdB) {
                        return 1;
                    } else {
                        return  0;
                    }
                }
            });
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

    public isNewInvestor(): boolean {
        if (this.fundFormGroup && this.fundFormGroup.get('isNewInvestment')) {
            return this.fundFormGroup.get('isNewInvestment').value || false;
        }
        return false;
    }

    public isRedemption(): boolean {
        if (this.investmentFormGroup && this.investmentFormGroup.get('transactionType')) {
            return this.investmentFormGroup.get('transactionType').value  === 'Redemption';
        }
        return false;
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
                this.newInvestorFormGroup.controls['fundId'].patchValue('GMMKSerA');
                this.newInvestorFormGroup.controls['investorId'].patchValue('GMMKSerA');
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
                this.newInvestorFormGroup.controls['fundId'].patchValue('GMMKSerA');
                this.newInvestorFormGroup.controls['investorId'].patchValue('GMMKSerA');
            }
        }
    }

    public changeInvestor(val: MatOptionSelectionChange): void {
        if (this.disableEvents || this.mode === 'Edit') {
            return;
        }
        if (val.source.selected) {
            const investor = val.source.value;
            this.existingInvestorFormGroup.controls['investmentId'].patchValue(investor.Id);
            this.existingInvestorFormGroup.controls['investorName'].patchValue(investor.InvestorName);
            this.existingInvestorFormGroup.controls['fundId'].patchValue(investor.FundId);
            this.existingInvestorFormGroup.controls['investorId'].patchValue(investor.InvestorId);
            this.existingInvestorFormGroup.controls['investorType'].patchValue(investor.InvestorType);
            this.existingInvestorFormGroup.controls['relationship'].patchValue(investor.Relationship);
            this.existingInvestorFormGroup.controls['region'].patchValue(investor.Region);
            this.existingInvestorFormGroup.controls['consultant'].patchValue(investor.Consultant);
            this.existingInvestorFormGroup.controls['managementFee'].patchValue(investor.MgmtFee);
            this.existingInvestorFormGroup.controls['incentiveFee'].patchValue(investor.IncFee);
            this.existingInvestorFormGroup.controls['feeNotes'].patchValue(investor.Notes);
        }
    }

    public changeTransactionType(val: MatOptionSelectionChange): void {
        if (this.disableEvents) {
            return;
        }
        if (val.source.selected) {
            const transactionType = val.source.value;
            if (transactionType !== 'Redemption') {
                this.investmentFormGroup.controls['isFullRedemption'].patchValue(false);
            }
        }
    }

    public changeFullRedemption(checked: boolean): void {
        if (this.disableEvents) {
            return;
        }
        this.investmentFormGroup.controls['isFullRedemption'].patchValue(checked);
    }

    public resetForm(formGroup: string): void {
        let form = null;
        if (formGroup === 'fundFormGroup') {
            form = this.fundFormGroup;
        } else if (formGroup === 'newInvestorFormGroup') {
            form = this.newInvestorFormGroup;
        } else if (formGroup === 'existingInvestorFormGroup') {
            form = this.existingInvestorFormGroup;
        } else if (formGroup === 'investmentFormGroup') {
            form = this.investmentFormGroup;
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
        this.resetForm('fundFormGroup');
        this.resetForm('newInvestorFormGroup');
        this.resetForm('existingInvestorFormGroup');
        this.resetForm('investmentFormGroup');
    }

    public displayInvestorName(investor: any): string {
        return investor && investor.InvestorName ? investor.InvestorName : '';
    }

    public displayEffectiveDate(): string {
        const effDate = this.investmentFormGroup.controls['effectiveDate'].value;
        if (effDate) {
            return effDate.toDateString();

        } else {
            return 'MM/DD/YYYY';
        }
    }

    public displayManagementFee(): string {
        const mgmtFee = this.isNewInvestor()  ? this.newInvestorFormGroup.controls['managementFee'].value :
            this.existingInvestorFormGroup.controls['managementFee'].value;
        if (mgmtFee) {
            return (mgmtFee * 100.0).toFixed(2) + '%';
        }
        return '';
    }

    public displayIncentiveFee(): string {
        const incentiveFee = this.isNewInvestor() ? this.newInvestorFormGroup.controls['incentiveFee'].value :
            this.existingInvestorFormGroup.controls['incentiveFee'].value;
        if (incentiveFee) {
            return (incentiveFee * 100.0).toFixed(2) + '%';
        }
        return '';
    }

    public displayTransactionAmountUSD(): string {
        const val = this.investmentFormGroup.controls['transactionAmountUSD'].value;
        if (val) {
            return val.toLocaleString('en-US', { maximumFractionDigits: 0, minimumFractionDigits: 0 });
        }
        return '';
    }

    public displayTransactionNotes(): string {
        const val = this.investmentFormGroup.controls['notes'].value;
        if (val) {
            return val;
        }
        return '';
    }

    public areFormsValid(): boolean {
        let result = false;
        if (this.fundFormGroup.valid) {
            if (this.investmentFormGroup.valid) {
                if (this.isNewInvestor() && this.newInvestorFormGroup.valid) {
                    result = true;
                } else if (!this.isNewInvestor() && this.existingInvestorFormGroup.valid) {
                    result = true;
                }
            }
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
        return new Date(year, month - 1, date);
    }

    public submitForm(): void {
        if (this.areFormsValid()) {
            const finalPayload = this.getFinalPayload();
            if (this.mode === 'Add') {
                const actionPayload = Object.assign({}, finalPayload, { 'action': 'Add' });
                this.dialogRef.close(actionPayload);
            } else if (this.mode === 'Edit') {
                const actionPayload = Object.assign({}, finalPayload, { 'action': 'Edit' });
                this.dialogRef.close(actionPayload);
            }
        }
    }

    public deleteTransaction(): void {
        const payload = this.getFinalPayload();
        const dialogRef = this.dialog.open(CapitalFlowDeleteConfirmationDialogComponent, {
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
        payload = Object.assign({}, payload, this.isNewInvestor() ? this.newInvestorFormGroup.value : this.existingInvestorFormGroup.value);
        payload = Object.assign({}, payload, this.investmentFormGroup.value);
        return payload;
    }

}
