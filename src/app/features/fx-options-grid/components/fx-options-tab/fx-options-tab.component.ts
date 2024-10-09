
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-fx-options-tab',
    templateUrl: './fx-options-tab.component.html',
    styleUrls: ['./fx-options-tab.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FXOptionsTabComponent implements OnInit, OnChanges {

    @Input() currency: string;
    @Input() grid: any;

    public filteredGrid: any;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.currency && changes.currency.currentValue && changes.grid && changes.grid.currentValue) { 
            this.filteredGrid = this.grid[this.currency];
        }
    }

    ngOnInit(): void {
    }

    getExpiries(grid: any[]): string[] {
        const result = [];
        grid.forEach((row) => {
            const expiry = row.expiry;
            if (result.indexOf(expiry) < 0) {
                result.push(expiry);
            }
        });
        return result;
    }

    getSurface(grid: any[], expiry: string): any[] {
        return grid.filter((row) => row.expiry === expiry);
    }
}
