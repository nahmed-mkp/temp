import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-tracking-input-form',
    templateUrl: './user-input-form.component.html',
    styleUrls: ['./user-input-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserInputFormComponent implements OnInit {

    public dv01Form: UntypedFormGroup;
    public tenYrDV01: UntypedFormControl = new UntypedFormControl('', [Validators.required]);

    constructor() {
        this.dv01Form = new UntypedFormGroup({ tenYrDV01: this.tenYrDV01, });
    }

    ngOnInit(): void { }
}
