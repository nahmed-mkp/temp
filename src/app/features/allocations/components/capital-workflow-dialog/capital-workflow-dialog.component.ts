import { Component, OnInit, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-capital-workflow-dialog',
    templateUrl: './capital-workflow-dialog.component.html',
    styleUrls: ['./capital-workflow-dialog.component.scss']
})
export class CapitalWorkflowDialogComponent implements OnInit {

    public layoutName: string;

    constructor(public dialogRef: MatDialogRef<CapitalWorkflowDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data,
                private _formBuilder: UntypedFormBuilder) { }

    isLinear = true;
    firstFormGroup: UntypedFormGroup;
    secondFormGroup: UntypedFormGroup;

    ngOnInit() {
        this.firstFormGroup = this._formBuilder.group({
            firstCtrl: ['', Validators.required]
        });
        this.secondFormGroup = this._formBuilder.group({
            secondCtrl: ['', Validators.required]
        });
    }
    onClose() {
        this.dialogRef.close();
    }

    // onSave() {
    //     this.store.dispatch(new fromStore.SaveLayout({
    //         name: this.layoutName,
    //         subCategory: this.data.category,
    //         layoutData: this.data.columnStates
    //     }));
    //     this.onClose();
    // }

    // onUpdate() {
    //     this.store.dispatch(new fromStore.SaveLayout({
    //         name: this.layoutName,
    //         subCategory: this.data.category,
    //         layoutData: this.data.columnStates
    //     }));
    //     this.onClose();
    // }

}
