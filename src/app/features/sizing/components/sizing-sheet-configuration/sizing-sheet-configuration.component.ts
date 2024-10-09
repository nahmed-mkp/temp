import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import * as fromModels from './../../models';

@Component({
    selector: 'app-sizing-sheet-configuration',
    templateUrl: './sizing-sheet-configuration.component.html',
    styleUrls: ['./sizing-sheet-configuration.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SizingSheetConfigurationComponent implements OnInit {

    @Input() sizingSheetSecurities: fromModels.SizingSecurity[];
    @Input() sizingSheetSecuritiesLoading: boolean;
    @Input() sizingSheetSecuritiesLoaded: boolean;
    @Input() sizingSheetSecuritiesError: string;

    @Input() defaultCapitals: fromModels.DefaultSizingCapital[];
    @Input() defaultCapitalsLoading: boolean;
    @Input() defaultCapitalsLoaded: boolean;
    @Input() defaultCapitalsError: string;

    @Output() addSecurity: EventEmitter<fromModels.SizingSecurity> = new EventEmitter<fromModels.SizingSecurity>();
    @Output() updateSecurity: EventEmitter<fromModels.SizingSecurity> = new EventEmitter<fromModels.SizingSecurity>();
    @Output() deleteSecurity: EventEmitter<fromModels.SizingSecurity> = new EventEmitter<fromModels.SizingSecurity>();
    @Output() saveSecurities: EventEmitter<fromModels.SizingSecurity[]> = new EventEmitter<fromModels.SizingSecurity[]>();

    @Output() addDefaultCapitals: EventEmitter<fromModels.DefaultSizingCapital[]> = new EventEmitter<fromModels.DefaultSizingCapital[]>();
    @Output() updateDefaultCapitals: EventEmitter<fromModels.DefaultSizingCapital[]> = new EventEmitter<fromModels.DefaultSizingCapital[]>();
    @Output() deleteDefaultCapitals: EventEmitter<fromModels.DefaultSizingCapital[]> = new EventEmitter<fromModels.DefaultSizingCapital[]>();

    constructor() { }

    ngOnInit(): void { }

    saveChanges(payload: fromModels.SizingSecurity[]): void {
        // payload.forEach((element, index) => {
        //     setTimeout(() => {
        //         if (element.status === 'added') {
        //             this.addSecurity.emit(element);
        //         } else if (element.status === 'edited') {
        //             this.updateSecurity.emit(element);
        //         } else if (element.status === 'deleted') {
        //             this.deleteSecurity.emit(element);
        //         }
        //     }, 2000 * index)
        // })
        this.saveSecurities.emit(payload);
    }
}
