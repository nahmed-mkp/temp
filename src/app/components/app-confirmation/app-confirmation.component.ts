import { Component, OnInit, Input, Inject } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
    selector: 'app-confirmation',
    templateUrl: './app-confirmation.component.html',
    styleUrls: ['./app-confirmation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppConfirmationComponent implements OnInit {

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    }

    ngOnInit() {
    }
}
