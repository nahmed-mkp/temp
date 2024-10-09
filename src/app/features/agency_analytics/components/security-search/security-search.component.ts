import { ChangeDetectionStrategy, Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import * as fromStore from './../../store';
import * as fromModels from './../../models/yieldbook.models';
import { Observable } from 'rxjs';


@Component({
    selector: 'app-agency-security-search',
    templateUrl: './security-search.component.html',
    styleUrls: ['./security-search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecuritySearchComponent implements OnInit {

    public quickSearchForm: FormGroup;

    public searchResults$: Observable<fromModels.ISearchResult>;
    public searchingStatus$: Observable<boolean>;
    public searchedStatus$: Observable<boolean>;
    public searchError$: Observable<string>;

    private KEY_CODE_ENTER = 13;
    private KEY_CODE_DOWN = 40;
    private KEY_CODE_UP = 38;

    public handleKeyUpEvent_debounce: any;

    constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<SecuritySearchComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private store: Store<fromStore.AgencyAnalyticsState>)
    {
        this.quickSearchForm = this.fb.group({
            'searchText': [null, Validators.required]
        });

        this.handleKeyUpEvent_debounce = _.debounce(this.handleKeyUpEvent.bind(this), 500);

        this.searchResults$ = this.store.select(fromStore.getSearchResults);
        this.searchingStatus$ = this.store.select(fromStore.getSearchingStatus);
        this.searchedStatus$ = this.store.select(fromStore.getSearchedStatus);
        this.searchError$ = this.store.select(fromStore.getSearchError);
    }

    ngOnInit(): void { }

    public handleKeyUpEvent(e: any): void {
        const searchTerm = e.target.value as string;
        const code = e.keyCode;

        if (code === this.KEY_CODE_DOWN || code === this.KEY_CODE_UP) {
            e.stopPropagation();
            return;
        }
        switch (code) {

            case this.KEY_CODE_ENTER:
                this.submitQuickSearch(searchTerm);
                break;

            default:
                this.submitQuickSearch(searchTerm);
                break;
        }
    }

    public submitQuickSearch(searchTerm: string): void {
        const criteria: fromModels.IQuickSearch = {identifier: searchTerm};
        this.store.dispatch(new fromStore.SearchSecurity(criteria));        
    }
}
