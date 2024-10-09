import { Component } from '@angular/core';
import * as fromStore from '../../../../store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
    selector: 'app-pricing-engine-rv-autocomplete-cell-renderer',
    styleUrls: ['./autocomplete-dropdown.component.scss'],
    templateUrl: './autocomplete-dropdown.component.html'
})

export class PricingEngineRvAutocompleteCellRendererComponent {

  public params;
  public userInput: any = '';

  public secPrompt: any[] = []
  public secPromptSubscription$: Subscription;

  public filteredSecPrompt: any[] = [];

  constructor(private store: Store<fromStore.State>) {}

  agInit(params: any): void {
    this.params = params;
    this.filteredSecPrompt = this.secPrompt;
    this.userInput = params.name ? params.name : null;
    
    this.secPromptSubscription$ = this.store.select(fromStore.getRvSecuritySuggestions).subscribe((secPrompt) => {
      this.secPrompt = secPrompt;
      if(this.userInput){
        this.filteredSecPrompt = this.secPrompt.filter(data => data['Name'].toString().includes(this.userInput.toUpperCase()));
      }
    });  
  }

  onInputChange(userInput: any){
    if(userInput.length > 2){
      if(!isNaN(userInput)){
        userInput = parseInt(userInput);
      } 
      this.store.dispatch(fromStore.loadRvSecSuggestions(userInput));
    } else {
      this.store.dispatch(fromStore.resetRvSecSuggestions());
    }
  }

  onSelect(event: MatAutocompleteSelectedEvent){
    this.store.dispatch(fromStore.resetRvSecSuggestions());
    this.params.onSecuritySelected(event.option.value, this.params.cellParams)
  }

  onClick(event){
    this.store.dispatch(fromStore.resetRvSecSuggestions());
  }

  onFocus(event){
    this.params.onFocus();
  }

  onBlur(event){
    this.params.onBlur();
  }
}
