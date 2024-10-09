import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-sec-master-security-search',
    templateUrl: './security-search.component.html',
    styleUrls: ['./security-search.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecuritySearchComponent implements OnInit {

    constructor() { }

    ngOnInit(): void { }
}
