import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-sec-master-layout',
    templateUrl: './security-master-layout.component.html',
    styleUrls: ['./security-master-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecMasterLayoutComponent implements OnInit {

    constructor(private router: Router, private location: Location, private activeRoute: ActivatedRoute) { }

    public defaultSecMaster = 'global';

    ngOnInit(): void {
        if (this.router.url.endsWith('rcpm')) {
            this.defaultSecMaster = 'rcpm';
        }
    }
}
