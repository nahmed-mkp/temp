import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

import * as fromModels from '../../models/market-data.models';

@Component({
    selector: 'app-market-data-toolbar',
    templateUrl: './market-data-toolbar.component.html',
    styleUrls: ['./market-data-toolbar.component.scss']
})
export class MarketDataToolbarComponent implements OnInit, AfterViewInit {

    @ViewChild('search') search: ElementRef;

    @Input() searchCriteria: fromModels.IMarketDataSearch;
    @Output() searchMarketData: EventEmitter<fromModels.IMarketDataSearch> = new EventEmitter<fromModels.IMarketDataSearch>();

    constructor() { }

    ngOnInit(): void { }

    ngAfterViewInit(): void {
        fromEvent(this.search.nativeElement, 'keyup')
            .pipe(
                filter(Boolean),
                debounceTime(150),
                distinctUntilChanged(),
                tap((text) => {
                    const newSearch = Object.assign({}, this.searchCriteria, { 'searchTerm': this.search.nativeElement.value})
                    this.searchMarketData.emit(newSearch);
                })
            )
            .subscribe();
    }

    
}
