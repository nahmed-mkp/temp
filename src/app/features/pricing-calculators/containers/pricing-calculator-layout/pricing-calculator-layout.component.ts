import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { MatLegacyTabChangeEvent as MatTabChangeEvent, MatLegacyTabGroup as MatTabGroup } from '@angular/material/legacy-tabs';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-pricer-layout',
    templateUrl: './pricing-calculator-layout.component.html',
    styleUrls: ['./pricing-calculator-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class PricingCalculatorLayoutComponent implements OnInit, AfterViewInit {

    @ViewChild('tabs') tabGroup: MatTabGroup;
    @HostBinding('class') classes = 'vertical-flex-full-height';

    constructor(private location: Location, private router: Router, private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this.activatedRoute.url.subscribe((route) => {
            if (route && route.length === 1) {
                const assetClass = route[0]['path'].toLowerCase().replace(/ /g, '');
                const currentTabs = this.tabGroup._tabs.map((tab) => tab.textLabel.toLowerCase().replace(/ /g, ''));
                const curIndex = currentTabs.indexOf(assetClass);
                if (curIndex >= 0) {
                    this.tabGroup.selectedIndex = curIndex;
                } else {
                    this.tabGroup.selectedIndex = 0;
                }
            }
        });
    }

    public changeTab(e: MatTabChangeEvent): void {
        const assetClass = e.tab.textLabel.toLowerCase();
        this.activateRoute(assetClass);
    }

    public activateRoute(assetClass: string): void {
        const url = this.router.createUrlTree([assetClass], { relativeTo: this.activatedRoute.parent, }).toString();
        this.location.go(url);
    }

}
