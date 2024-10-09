import { Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MatSidenav } from '@angular/material';
import { TimeseriesSearchLayoutComponent } from '../timeseries-search-layout/timeseries-search-layout.component';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-timeseries-analysis-layout',
    templateUrl: './timeseries-analysis-layout.component.html',
    styleUrls: ['./timeseries-analysis-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeseriesAnalysisLayoutComponent implements OnInit, OnDestroy {

    @ViewChild('sidenav', { static: false }) sidenav: MatSidenav;

    private dialogRefTimeseriesSearch: MatDialogRef<TimeseriesSearchLayoutComponent>;

    public panelType: 'viewWatchlist' | 'addTimeseries';

    public subscriptions: Subscription[] = [];

    constructor(private dialog: MatDialog) { }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        })
    }

    onShowSidePanel(panelType: 'viewWatchlist' | 'addTimeseries'): void {
        this.panelType = panelType;
        this.sidenav.open();
        if (panelType === 'viewWatchlist') {
            // this.loadPMPodDetails.emit();
        }
    }

    onSearchTimeseries(): void {
        this.dialogRefTimeseriesSearch = this.dialog.open(TimeseriesSearchLayoutComponent, {
            hasBackdrop: false,
            panelClass: 'event-analysis-pop-up-panel',
            width: '60%',
            height: '80%',
            data: {
                // customStyle: JSON.parse(JSON.stringify(this.userGroupingStyle)),
                // defaultStyle: JSON.parse(JSON.stringify(this.groupingStyleDefault))
            }
        });

        this.subscriptions.push(this.dialogRefTimeseriesSearch.afterClosed().subscribe(result => {
            if (result) {
                // this.userGroupingStyle = result;
                // this.gridApi.redrawRows();
            }
        }));
    }
}
