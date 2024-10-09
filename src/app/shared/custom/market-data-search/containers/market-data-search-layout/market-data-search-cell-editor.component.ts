import {Component} from "@angular/core";
import { ICellEditorAngularComp } from "ag-grid-angular";

import * as fromModels from '../../models';

@Component({
    selector: 'market-data-search-cell-editor',
    template: `
        <app-market-data-search
            [searchContext]="'EventAnalysis'"
            (marketDataSelected)="marketDataSelected($event)"
            (marketDataEntered)="marketDataEntered($event)">
        </app-market-data-search>
    `,
})
export class MarketDataSearchCellEditorComponent implements ICellEditorAngularComp {

    private params: any;
    public value: any; 
    
    agInit(params: any): void {
        this.params = params;
        this.value = this.params.value;
    }

    getValue(): any {
        // console.log('the current value is', this.value);
        return this.value
    }

    marketDataSelected(event: fromModels.MarketDataSearchResult) {
        // console.log('marketDataSelected', event)
        this.value = this.buildExpressionFromSearchResult(event);
        this.params.api.stopEditing();
    }

    marketDataEntered(event: fromModels.MarketDataInput) {
        // console.log('marketDataEntered', event)
        this.value = this.buildExpressionFromUserInput(event);
    }

    private buildExpressionFromUserInput(payload: fromModels.MarketDataInput) {
        return {
          source: 'custom',
          expression: payload.expression,
          displayName: payload.expression,
          alias: payload.expression,
        };
    }

    private buildExpressionFromSearchResult(payload: fromModels.MarketDataSearchResult) {
        return {
          source: payload.provider,
          expression: payload.expression,
          displayName: payload.displayName,
          alias: payload.displayName,
        };
      }
}

