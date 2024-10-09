import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import * as fromStore from '../../../../store';
import * as fromModels from '../../../../models';

@Component({
    selector: 'app-pricing-engine-bval-autocomplete-cell-renderer',
    styleUrls: ['./autocomplete-dropdown.component.scss'],
    templateUrl: './autocomplete-dropdown.component.html'
})

export class PricingEngineBVALAutocompleteCellRendererComponent implements OnInit, OnDestroy {

  public params;
  public userInput: any = '';
  public prevValue: any = ''; 

  public secPrompt: any[] = []
  public subscriptions$: Subscription[] = [];

  public filteredSecPrompt$: BehaviorSubject<fromModels.IBVALSuggestion[]> = new BehaviorSubject<fromModels.IBVALSuggestion[]>([]);

  constructor(private store: Store<fromStore.State>) {}
  
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(subscription => subscription.unsubscribe());
  }

  agInit(params: any): void {
    this.params = params;
    this.userInput = params.name ? params.name: null;
    this.prevValue = params.name ? params.name: null;
    this.subscriptions$.push(this.store.select(fromStore.getBVALSecuritySuggestions).subscribe((secPrompt) => {
      this.secPrompt = secPrompt;
      if(this.userInput && this.secPrompt && this.secPrompt.length > 0 && this.userInput.length > 2 && this.userInput !== this.prevValue) {        
        const selItems = this.secPrompt.filter(data => data['name'].toUpperCase().includes(this.userInput.toUpperCase()));
        this.filteredSecPrompt$.next(selItems);
      } else {
        this.filteredSecPrompt$.next([]);
      }
    }));
  }

  onInputChange(userInput: any) {
    this.userInput = userInput;
    if(userInput.length > 2) {
      this.store.dispatch(new fromStore.LoadBVALSecSuggestions(userInput));
    } else {
      this.store.dispatch(new fromStore.ResetBVALSecSuggestions());
    }
  }

  onSelect(event: MatAutocompleteSelectedEvent) {    
    this.userInput = event.option.value.name;
    this.params.onSecuritySelected(event.option.value, this.params.cellParams);
    this.store.dispatch(new fromStore.ResetBVALSecSuggestions());
  }

  onClick(event){
    this.store.dispatch(new fromStore.ResetBVALSecSuggestions());
  }

  onFocus(event){
    this.params.onFocus();
  }

  onBlur(event){
    this.params.onBlur();
  }

  onKeyDown(event: KeyboardEvent) { 
    if(event.key === 'Enter'){
      if ((this.userInput === null || this.userInput === '') && (this.prevValue !== null || this.prevValue !== '')) {
        this.params.onSecurityCleared(this.params.cellParams);
      }
    } else { 
      // console.log(event.key);
    }
  }

  public displayFn(value) {
    if (typeof value === 'string' || value instanceof String)
      return value;
    else if (value && value.name) {
      return value.name;
    }
    return value;
  }

  clearInput() {
    this.userInput = '';
    this.params.onSecurityCleared(this.params.cellParams);
  }

}
