import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import * as fromModels from '../../models';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-market-data-search-general',
  templateUrl: './market-data-search-general.component.html',
  styleUrls: ['./market-data-search-general.component.scss']
})
export class MarketDataSearchGeneralComponent implements OnInit {

  @Input() searchResults: fromModels.MarketDataForTimeseriesExporter[];
  @Input() value: string;

  @Output() marketDataSelected: EventEmitter<fromModels.MarketDataForTimeseriesExporter> =
  new EventEmitter<fromModels.MarketDataForTimeseriesExporter>();
  @Output() onSearchMarketData: EventEmitter<string> = new EventEmitter<string>();

  private search$: Subject<string> = new Subject<string>();
  public KEY_CODE_COLON = 186;
  public KEY_CODE_ENTER = 13;
  public KEY_CODE_DOWN = 40;
  public KEY_CODE_UP = 38;
  public KEY_CODE_ESC = 27;

  constructor() { }

  ngOnInit() {
    console.log(' i am inside the general market data search')
    this.search$
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe((searchTerm: string) => {
        this.onSearchMarketData.emit(searchTerm);
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
        this.onSearchMarketData.emit(searchTerm);
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
        this.marketDataSelected.emit(payload.option.value);
    }
  }

}
