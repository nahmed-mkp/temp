import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ElementRef } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromModels from '../../models/search.models';
import * as fromStore from './../../store';


@Component({
    selector: 'app-security-search',
    templateUrl: './security-search.component.html',
    styleUrls: ['./security-search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecuritySearchComponent implements OnInit, AfterViewInit, OnChanges {

    @Input() value: string;
    @Input() searchResults: any[];
    @Input() searching: boolean;

    @Output() searchSecurities: EventEmitter<string> = new EventEmitter<string>();
    @Output() selectSecurity: EventEmitter<{'name': string, 'sid': number}> = new EventEmitter<{'name': string, 'sid': number}>();

    @ViewChild('search') searchInputElement: ElementRef;

    private search$: Subject<string> = new Subject<string>();
    public searchCriteria: fromModels.ISecuritySearch;

    public KEY_CODE_COLON = 186;
    public KEY_CODE_ENTER = 13;
    public KEY_CODE_DOWN = 40;
    public KEY_CODE_UP = 38;
    public KEY_CODE_ESC = 27;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
    }

    getValue(): any {
        return this.value;
    }

    ngOnInit(): void {
        this.search$
            .pipe(
                debounceTime(500),
                distinctUntilChanged()
            ).subscribe((searchTerm: string) => {
                this.searchSecurities.emit(searchTerm);
            });
    }

    ngAfterViewInit(): void {
        this.searchInputElement.nativeElement.value = this.value || null;
        setTimeout(() => this.searchInputElement.nativeElement.focus());
    }

    handleKeyUpEvent(e: any): void {
        const searchTerm = e.target.value as string;
        const code = e.keyCode;

        if (code === this.KEY_CODE_DOWN || code === this.KEY_CODE_UP) {
            e.stopPropagation();
        }

        switch (code) {

            // case this.KEY_CODE_ESC:
            //     e.target.value = '';
            //     this.searchCriteria = { text: '', numCount: 10 };
            //     this.search$.next('');
            //     break;

            case this.KEY_CODE_ENTER:
                if (this.searchCriteria && this.searchCriteria.text) {
                    this.searchSecurities.emit(this.searchCriteria.text);
                }
                break;

            default:
                // const payload = { expression: e.target.value, provider: this.searchCriteria.provider };
                // this.marketDataEntered.emit(payload);
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

    securitySelected(payload: MatAutocompleteSelectedEvent): void {
        if (payload.option.value) {
            this.selectSecurity.emit(payload.option.value);
        }
    }

    displayFn(result?: any): string | undefined {
        return result ? result.name : undefined;
    }

}
