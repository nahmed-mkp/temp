import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import * as fromModels from './../../models';

@Component({
    selector: 'app-market-data-security-search',
    templateUrl: './market-data-security-search.component.html',
    styleUrls: ['./market-data-security-search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketDataSecuritySearchComponent implements OnInit {

    public selectedSID?: number;

    @Input() searchResults: fromModels.MarketDataForTimeseriesExporter[];
    @Input() value: string;

    @Output() securitySelected: EventEmitter<number> = new EventEmitter<number>();
    @Output() onSearchSecurity: EventEmitter<string> = new EventEmitter<string>();
    @Output() marketDataSelected: EventEmitter<fromModels.MarketDataForTimeseriesExporter> =
        new EventEmitter<fromModels.MarketDataForTimeseriesExporter>();

    private search$: Subject<string> = new Subject<string>();
    public KEY_CODE_COLON = 186;
    public KEY_CODE_ENTER = 13;
    public KEY_CODE_DOWN = 40;
    public KEY_CODE_UP = 38;
    public KEY_CODE_ESC = 27;

    constructor() { }

    ngOnInit() {
        this.search$
            .pipe(
                debounceTime(500),
                distinctUntilChanged()
            ).subscribe((searchTerm: string) => {
                this.onSearchSecurity.emit(searchTerm);
            });
    }

    handleKeyUpEvent(e: any): void {
        const searchTerm = e.target.value as string;
        const code = e.keyCode;

        if (code === this.KEY_CODE_DOWN || code === this.KEY_CODE_UP) {
            e.stopPropagation();
        }

        switch (code) {
            case this.KEY_CODE_ENTER:
                this.onSearchSecurity.emit(searchTerm);
                break;

            default:
                if (searchTerm.length >= 3) {
                    this.search$.next(searchTerm);
                }
                break;
        }
    }

    onKeyDown(event) {
        const code = event.keyCode;

        if (code === this.KEY_CODE_DOWN || code === this.KEY_CODE_UP) {
            event.stopPropagation();
        }
    }

    optionSelected(payload: MatAutocompleteSelectedEvent): void {
        if (payload.option.value) {
            this.selectedSID = payload.option.value.sid;
            this.securitySelected.emit(payload.option.value);
        }
    }

}
