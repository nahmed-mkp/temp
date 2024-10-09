import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
    selector: 'app-create-security-additional-dialog',
    templateUrl: './create-security-additional-dialog.component.html',
    styleUrls: ['./create-security-additional-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateSecurityAdditionalDialogComponent implements OnInit {

    public otcForm: UntypedFormGroup;

    public counterparties: string[];

    constructor(public dialogRef: MatDialogRef<CreateSecurityAdditionalDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: UntypedFormBuilder) {
            this.otcForm = this.fb.group({
                'isOTC': [false],
                'counterparty': [null],
                'contractSize': [null]
            });
            this.counterparties = data['counterparties'];
        }

    ngOnInit(): void {
        this.otcForm.get('isOTC').valueChanges.subscribe((val) => {
            if (val) {
                this.otcForm.get('counterparty').setValidators(Validators.required);
                this.otcForm.get('contractSize').setValidators(Validators.required);
            } else {
                this.otcForm.get('counterparty').clearValidators();
                this.otcForm.get('contractSize').clearValidators();
            }
            this.otcForm.get('counterparty').updateValueAndValidity();
            this.otcForm.get('contractSize').updateValueAndValidity();
        });
    }

    onApply(): void {
        // const isOtc = this.otcForm.get('isOTC').value;
        // if (!isOtc) {
        //     this.dialogRef.close(null);
        // } else {
        //     if (this.otcForm.touched && this.otcForm.valid) {
        //         this.dialogRef.close(this.otcForm.value);
        //     }
        // }
        this.dialogRef.close(this.otcForm.value);
    }

    onCancel(): void {
        this.dialogRef.close(null);
    }
}
