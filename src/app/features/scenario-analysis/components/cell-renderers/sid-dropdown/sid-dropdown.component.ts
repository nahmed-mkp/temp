import { Component } from '@angular/core';
import * as fromStore from '../../../store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
    selector: 'app-scenario-analysis-delete-cell-renderer',
    styleUrls: ['./sid-dropdown.component.scss'],
    templateUrl: `./sid-dropdown.component.html`
})

export class ScenarioAnalysisSIDDropdownCellRendererComponent {

  public params;
  public userInput: any = '';

  public sidPrompt: any[] = []
  public sidPromptSubscription$: Subscription;

  public filteredSidPrompt: any[] = [];

  constructor(private store: Store<fromStore.ScenarioAnalysisState>) {}

  agInit(params: any): void {
    this.params = params;
    this.filteredSidPrompt = this.sidPrompt;
    this.userInput = params.sid ? params.sid : null;
    
    this.sidPromptSubscription$ = this.store.select(fromStore.getSIDPrompt).subscribe((sidPrompt) => {
      this.sidPrompt = sidPrompt;
      this.filteredSidPrompt = this.sidPrompt.filter(data => {
        if(isNaN(this.userInput)){
          return data['Name'].toUpperCase().includes(this.userInput.toUpperCase())
        } else {
          return data['SID'].toString().includes(this.userInput)
        }
      });
    });  
  }

  onInputChange(userInput: any){
    if(userInput.length > 2){
      if(!isNaN(userInput)){
        userInput = parseInt(userInput);
      } 
      this.store.dispatch(fromStore.getSIDSuggestions(userInput));
    } else {
      this.store.dispatch(fromStore.resetSIDSuggestions());
    }
  }

  onSelect(event: MatAutocompleteSelectedEvent){
    this.store.dispatch(fromStore.resetSIDSuggestions());
    this.params.onSIDSelected(this.params.id, event.option.value)
  }
}
