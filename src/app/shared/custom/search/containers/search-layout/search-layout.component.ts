import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-search-layout',
    templateUrl: './search-layout.component.html',
    styleUrls: ['./search-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchLayoutComponent implements OnInit {

    searchForm = new UntypedFormControl();
    options: string[] = ['One', 'Two', 'Three', 'Four', 'Five', 'Six'];
    filteredOptions: Observable<string[]>;
    
    constructor() { }

    ngOnInit(): void {
        this.filteredOptions = this.searchForm.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }
}
