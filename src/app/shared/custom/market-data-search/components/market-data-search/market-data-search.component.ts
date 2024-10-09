import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ChangeDetectionStrategy,
    AfterViewInit, 
    OnChanges,
    SimpleChanges,
    ViewChild,
    ElementRef} from '@angular/core';

import * as fromModels from '../../models';
import { Subject, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'app-market-data-search-inner',
    templateUrl: './market-data-search.component.html',
    styleUrls: ['./market-data-search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketDataSearchComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {

    @Input() providers: fromModels.MarketDataProvider[];
    @Input() searchCriteria: fromModels.MarketDataSearchCriteria;
    @Input() searchResults: fromModels.MarketDataSearchResult[];

    @Output() updateProvider: EventEmitter<fromModels.MarketDataProvider> =
        new EventEmitter<fromModels.MarketDataProvider>();
    @Output() searchMarketData: EventEmitter<fromModels.MarketDataSearchCriteria> =
        new EventEmitter<fromModels.MarketDataSearchCriteria>();
    @Output() marketDataSelected: EventEmitter<fromModels.MarketDataSearchResult> =
        new EventEmitter<fromModels.MarketDataSearchResult>();
    @Output() marketDataEntered: EventEmitter<fromModels.MarketDataInput> =
        new EventEmitter<fromModels.MarketDataInput>();

    @ViewChild('search') searchInputElement: ElementRef;

    private search$: Subject<string> = new Subject<string>();

    public KEY_CODE_COLON = 186;
    public KEY_CODE_ENTER = 13;
    public KEY_CODE_DOWN = 40;
    public KEY_CODE_UP = 38;
    public KEY_CODE_ESC = 27;

    constructor() {
    }

    ngOnInit(): void {
        this.search$
            .pipe(
                debounceTime(500),
                distinctUntilChanged()
            ).subscribe((searchTerm: string) => {
                this.searchMarketData.emit(Object.assign({}, this.searchCriteria, {text: searchTerm}));
            });
    }

    ngAfterViewInit(): void {

        console.log('after view init', this.searchInputElement);
        setTimeout(() => this.searchInputElement.nativeElement.focus())
    }   

    ngOnDestroy(): void {
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.providers && changes.providers.currentValue && changes.providers.currentValue.length > 0) {
            const defaultProvider = changes.providers.currentValue.filter(provider => provider.name === 'MKP Analytics')[0];
            this.updateProvider.emit(defaultProvider);
        }
    }

    getSelectedProviderName(): string {
        return (this.searchCriteria && this.searchCriteria.provider) ? this.searchCriteria.provider : 'Providers';
    }

    selectProvider(provider: fromModels.MarketDataProvider): void {
        this.updateProvider.emit(provider);
    }

    handleKeyUpEvent(e: any): void {
        const searchTerm = e.target.value as string;
        const code = e.keyCode;

        if(code === this.KEY_CODE_DOWN || code === this.KEY_CODE_UP) {
            e.stopPropagation();
        }

        switch (code) {

            case this.KEY_CODE_COLON:

                if (searchTerm.length > 3) {
                    const filteredProviders = this.providers.filter((provider) => {
                        return provider.name.toLowerCase().startsWith(searchTerm.replace(':', '').toLowerCase());
                    });
                    if (filteredProviders.length === 1) {
                        this.updateProvider.emit(filteredProviders[0]);
                        e.target.value = '';
                    }
                }
                break;

            case this.KEY_CODE_ESC:
                e.target.value = '';
                this.searchCriteria = {text: '', provider: '', context: this.searchCriteria.context};
                this.search$.next('');
                break;

            case this.KEY_CODE_ENTER:
                if (this.searchCriteria && this.searchCriteria.provider) {
                    const payload = { expression: e.target.value, provider: this.searchCriteria.provider };
                    console.log(payload)
                    this.marketDataEntered.emit(payload);
                }
                break;

            default:
                const payload = { expression: e.target.value, provider: this.searchCriteria.provider };
                this.marketDataEntered.emit(payload);
                if (searchTerm.length >= 3) {
                    this.search$.next(searchTerm);
                }
                break;
        }
    }

    onKeyDown(event) {
        const code = event.keyCode;

        if(code === this.KEY_CODE_DOWN || code === this.KEY_CODE_UP) {
            event.stopPropagation();
        }
    }

    optionSelected(payload: MatAutocompleteSelectedEvent): void {
        if (payload.option.value) {
            this.marketDataSelected.emit(payload.option.value);
        }
    }

    displayFn(result?: any): string | undefined {
        return result ? result.displayName : undefined;
    }
}
