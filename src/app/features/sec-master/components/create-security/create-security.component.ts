import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { CreateSecurityAdditionalDialogComponent } from '../create-security-additional-dialog/create-security-additional-dialog.component';

import * as fromModels from './../../models/sec-master-global.models';
@Component({
    selector: 'app-sec-master-create-security',
    templateUrl: './create-security.component.html',
    styleUrls: ['./create-security.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateSecurityComponent implements OnInit {

    @Input() supportedAssetClasses: string[];
    @Input() identifiers: string[];
    @Input() activeBrokers: string[];

    @Output() createNewSecurity: EventEmitter<fromModels.INewSecurity> = new EventEmitter<fromModels.INewSecurity>();

    public createForm: UntypedFormGroup;
    public isOTC: boolean = false;

    constructor(private fb: UntypedFormBuilder, private dialog: MatDialog) {
        this.createForm = this.fb.group({
            identifier: ['', Validators.required],
            identifierType: ['', Validators.required],
            assetClass: ['', Validators.required],

            isOTC: [false],
            counterparty: [null],
            contractSize: [null]
        });
    }

    ngOnInit(): void {
        // this.createForm.get('assetClass').valueChanges.subscribe(assetClass => {

        //     if (this.checkForEquityFutureOption(assetClass) === true) {

        //         const additionalDialogRef = this.dialog.open(CreateSecurityAdditionalDialogComponent, {
        //             width: '40%',
        //             height: '250px',
        //             data: {
        //                 'counterparties': this.activeBrokers
        //             }
        //         });

        //         additionalDialogRef.afterClosed().subscribe((val) => {
        //             if (val !== null && val !== undefined) {
        //                 // this.createForm.get('isOTC').setValue(val['isOTC']);
        //                 this.createForm.get('counterparty').setValue(val['counterparty']);
        //                 this.createForm.get('contractSize').setValue(val['contractSize']);
        //             } else {
        //                 // this.createForm.get('isOTC').setValue(false);
        //                 this.createForm.get('counterparty').setValue(null);
        //                 this.createForm.get('contractSize').setValue(null);
        //             }

        //             this.createForm.get('isOTC').updateValueAndValidity();
        //             this.createForm.get('counterparty').updateValueAndValidity();
        //             this.createForm.get('contractSize').updateValueAndValidity();
        //         });
        //     }
        // });
    }

    onCreateSecurity(formDirective): void {
        if (this.createForm.touched && this.createForm.valid) {
            const newSecurity: fromModels.INewSecurity = this.createForm.value;
            this.createNewSecurity.emit(newSecurity);

            // this.createForm.reset();
            this.isOTC = false;
            this.createForm.get('isOTC').setValue(false);
            this.createForm.get('identifier').setValue(null);
            this.createForm.get('counterparty').setValue(null);
            this.createForm.get('contractSize').setValue(null);
            // setTimeout(() => formDirective.resetForm(), 100);
        }
    }

    onCheckOTC() {
        this.createForm.get('isOTC').setValue(this.isOTC);
        if (this.isOTC) {
            const additionalDialogRef = this.dialog.open(CreateSecurityAdditionalDialogComponent, {
                width: '40%',
                height: '250px',
                data: {
                    'counterparties': this.activeBrokers
                }
            });

            additionalDialogRef.afterClosed().subscribe((val) => {
                if (val !== null && val !== undefined) {
                    // this.createForm.get('isOTC').setValue(val['isOTC']);
                    this.createForm.get('counterparty').setValue(val['counterparty']);
                    this.createForm.get('contractSize').setValue(val['contractSize']);
                } else {
                    // this.createForm.get('isOTC').setValue(false);
                    this.createForm.get('counterparty').setValue(null);
                    this.createForm.get('contractSize').setValue(null);
                }

                this.createForm.get('isOTC').updateValueAndValidity();
                this.createForm.get('counterparty').updateValueAndValidity();
                this.createForm.get('contractSize').updateValueAndValidity();
            });
        }
    }

    private checkForEquityFutureOption(assetClass: string): boolean {
        let result = false;
        const otcOptions = ['Commodity Future Option', 'Equity Index Option', 'Index Future Option'];
        if (otcOptions.indexOf(assetClass) >= 0) {
            result = true;
        }
        return result;
    }
}
