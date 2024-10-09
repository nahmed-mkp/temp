import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { startWith, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UntypedFormControl, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

@Component({
    selector: 'app-sec-master-toolbar',
    templateUrl: './security-master-toolbar.component.html',
    styleUrls: ['./security-master-toolbar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecMasterToolbarComponent implements OnInit {

    @Output() searchSecurities = new EventEmitter<string>();

    public toolbarForm: UntypedFormGroup;

    constructor(private formBuilder: UntypedFormBuilder, private router: Router, private location: Location) {
    }

    ngOnInit(): void {
        this.toolbarForm = this.formBuilder.group({
            search: new UntypedFormControl()
        });

        this.onChanges();
    }

    onChanges(): void {
        this.toolbarForm.get('search').valueChanges
            .pipe(
                startWith(''),
                debounceTime(500),
                distinctUntilChanged()
            )
            .subscribe((val) => {
                this.searchSecurities.emit(val);
            });
    }

    selectSecurityMaster(input: MatButtonToggleChange): void {
        if (input.value === 'global') {
            this.router.navigateByUrl(this.router.url.replace('rcpm', 'global'));
        } else {
            this.router.navigateByUrl(this.router.url.replace('global', 'rcpm'));
        }
    }
}
