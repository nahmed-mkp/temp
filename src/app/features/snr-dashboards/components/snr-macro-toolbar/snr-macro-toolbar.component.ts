import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';

import * as fromModels from './../../models/snr-dashboard.models';
@Component({
    selector: 'app-snr-macro-toolbar',
    templateUrl: './snr-macro-toolbar.component.html',
    styleUrls: ['./snr-macro-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SnrMacroToolbarComponent implements OnInit, OnChanges {

    @ViewChild('allSelected') private allSelected: MatOption;

    @Input() dates: string[];
    @Input() countries: fromModels.ICountry[];

    @Input() inputsLoading: boolean;
    @Input() inputsLoaded: boolean;
    @Input() inputsError: string;

    public inputForm: UntypedFormGroup;

    @Output() inputChanged: EventEmitter<fromModels.IMacroRun> = new EventEmitter<fromModels.IMacroRun>();

    constructor(private fb: UntypedFormBuilder) {
        this.inputForm = this.fb.group({
            asOfDate: new UntypedFormControl('', [Validators.required]),
            countries: new UntypedFormControl([], [Validators.required])
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.countries && changes.countries.currentValue) {
            this.inputForm.controls.countries
                .patchValue([...changes.countries.currentValue, 0]);
        }
        if (changes.dates && changes.dates.currentValue && changes.dates.currentValue.length > 0) {
            this.inputForm.controls.asOfDate.setValue(changes.dates.currentValue[0]);
        }
        if (this.inputForm.valid) {
            this.onSubmitForm();
        }
    }

    ngOnInit(): void { }

    onSubmitForm(): void {
        if (this.inputForm.valid) {
            this.inputChanged.emit(this.inputForm.value);
        }
    }

    toggleAllCountries(): void {
        if (this.allSelected.selected) {
            this.inputForm.controls.countries
                .patchValue([...this.countries, 0]);
        } else {
            this.inputForm.controls.countries.patchValue([]);
        }
    }

    toggleSingleCountry(): boolean {
        if (this.allSelected.selected) {
            this.allSelected.deselect();
            return false;
        }
    }
}
