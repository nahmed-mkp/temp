import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-market-data-search-results',
    templateUrl: './market-data-search-results.component.html',
    styleUrls: ['./market-data-search-results.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MarketDataSearchResultsComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}
