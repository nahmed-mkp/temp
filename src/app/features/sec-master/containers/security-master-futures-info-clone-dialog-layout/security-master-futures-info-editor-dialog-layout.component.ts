import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import * as fromModel from '../../models';
import { UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-security-master-futures-info-editor-dialog-layout',
    templateUrl: './security-master-futures-info-editor-dialog-layout.component.html',
    styleUrls: ['./security-master-futures-info-editor-dialog-layout.component.scss']
})
export class SecurityMasterFuturesInfoEditorDialogLayoutComponent implements OnInit {

    @HostBinding('class') classes = 'vertical-flex-full-height';

    public futuresInfo: fromModel.IFutureRoot;
    public isNew: boolean;
    public uniqueValueDict: any;

    public futuresInfoForm = this.fb.group({
        aifm_position_sub_asset_type: [null, Validators.required],
        aifm_transaction_sub_asset_type: [null, Validators.required],
        benchmark_cusip: [null],
        blbg_job_name: [null],
        blbg_suffix: [null, Validators.required],
        category: [null, Validators.required],
        cpo_pqr_sub_asset_class: [null, Validators.required],
        currency: [null, Validators.required],
        country_id: [null, Validators.required],
        deliverable_prefix: [null],
        deposit_days: [null],
        exchange: [null, Validators.required],
        exposure_type: [null, Validators.required],
        form_pf_sub_asset_class: [null, Validators.required],
        generic_contract_frequency: [null],
        get_deliverables: [false],
        index_sid: [null],
        is_bond_future: [false, Validators.required],
        is_mid_curve: [false],
        is_rate_future: [false, Validators.required],
        is_weekly: [false],
        key: [null],
        mkp_curve_name: [null, Validators.required],
        name: [null, Validators.required],
        num_units: [null, Validators.required],
        opt_eod_price_method: [null],
        opt_intraday_price_method: [null],
        option_num_units: [null],
        otr_underlying_security: [null],
        futures_id: [null, Validators.required],
        region: [null, Validators.required],
        rm_long_name: [null],
        root: [null, Validators.required],
        round_to: [null],
        strike_step: [null],
        term: [null],
        use_index_price: [false],
        weekly_underlier_id: [null],
        standard_exchange_name: [null],
        create_roll_adjusted_timseries: [false],
        roll_adjustment_method: [null]
    });

    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef: MatDialogRef<SecurityMasterFuturesInfoEditorDialogLayoutComponent>,
        private store: Store<fromStore.SecurityMasterState>,
        private fb: UntypedFormBuilder) { }

    ngOnInit() {
        this.uniqueValueDict = this.data['lists'];
        this.futuresInfo = this.data['futuresInfo'];
        if (this.futuresInfo === null) {
            this.futuresInfo = this._createNewFutureInfo();
            this.isNew = true;
        }
        this._patchValues(this.futuresInfo);
    }

    close(): void {
        this.dialogRef.close();
    }

    save(): void {
        const value = this.futuresInfoForm.value;
        if (!value['is_weekly']) {
            value['weekly_underlier_id'] = null;
        }
        console.log(this.futuresInfoForm.value);
        this.dialogRef.close(this.futuresInfoForm.value);
    }

    private _createNewFutureInfo(): fromModel.IFutureRoot {

        const newFutureInfo: fromModel.IFutureRoot = {
            aifm_position_sub_asset_type: null,
            aifm_transaction_sub_asset_type: null,
            benchmark_cusip: null,
            blbg_job_name: null,
            blbg_suffix: null,
            category: null,
            cpo_pqr_sub_asset_class: null,
            country_id: null,
            currency: null,
            deliverable_prefix: null,
            deposit_days: null,
            exchange: null,
            exposure_type: null,
            form_pf_sub_asset_class: null,
            generic_contract_frequency: null,
            get_deliverables: false,
            index_sid: null,
            is_bond_future: false,
            is_latest: false,
            is_mid_curve: false,
            is_rate_future: false,
            is_weekly: false,
            mkp_curve_name: null,
            name: null,
            num_units: null,
            opt_eod_price_method: null,
            opt_intraday_price_method: null,
            option_num_units: null,
            otr_underlying_security: null,
            futures_id: this.uniqueValueDict['last_index'] + 1,
            region: null,
            rm_long_name: null,
            root: null,
            round_to: null,
            strike_step: null,
            term: null,
            use_index_price: false,
            weekly_underlier_id: null,
            standard_exchange_name: null,
            create_roll_adjusted_timeseries: null,
            roll_adjustment_method: null
        };
        return newFutureInfo;
    }

    public getContractFrequency(selectedValue: string): string {
        if (selectedValue === '4') {
            return 'Quarterly';
        } else if (selectedValue === '12') {
            return 'Monthly';
        }
    }

    public onUpdateRmLongName() {
        const rootValue: string = this.futuresInfoForm.get('root').value;
        const exchangeValue: string =  this.futuresInfoForm.get('exchange').value;
        const RmLongName = `FUTURES.${exchangeValue.toUpperCase()}.${rootValue.toUpperCase()}`;

        const rmLongNameControl = this.futuresInfoForm.get('rm_long_name');
        rmLongNameControl.setValue(RmLongName);
    }

    public onUpdateCurveName() {
        const rootValue: string = this.futuresInfoForm.get('root').value;
        const curveName = `FUT.${rootValue.toUpperCase()}`;

        const curveNameControl = this.futuresInfoForm.get('mkp_curve_name');
        curveNameControl.setValue(curveName);
    }

    private _patchValues(root: fromModel.IFutureRoot): void {
        this.futuresInfoForm.patchValue(root);
    }

}
