import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-order-book-notes',
    templateUrl: './order-book-notes.component.html',
    styleUrls: ['./order-book-notes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderBookNotesComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}
