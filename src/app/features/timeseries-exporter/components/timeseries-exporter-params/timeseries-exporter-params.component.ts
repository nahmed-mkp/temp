import { ChangeDetectorRef, EventEmitter, Inject, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { ChangeDetectionStrategy, Component, OnInit, Output } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import * as _ from 'lodash';

import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TimeseriesExporterEditorComponent } from '../timeseries-exporter-editor/timeseries-exporter-editor.component';
import { TimeseriesExporterEditiorLayoutComponent } from '../../containers';

import * as fromModels from './../../models/timeseries-exporter.models';

@Component({
    selector: 'app-timeseries-exporter-params',
    templateUrl: './timeseries-exporter-params.component.html',
    styleUrls: ['./timeseries-exporter-params.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeseriesExporterParamsComponent implements OnInit, OnDestroy, OnChanges {

    @Input() params: fromModels.IDateRange;
    @Input() monitors: fromModels.IMonitor[];
    @Input() monitorsLoading: boolean;
    @Input() monitorsLoaded: boolean;
    @Input() monitorsError: string;

    public monitorCtrl = new UntypedFormControl();
    public selectedMonitor: fromModels.IMonitor;

    public filteredMonitors$: Observable<fromModels.IMonitor[]>;

    public subscriptions: Subscription[] = [];
    public startDate: any;
    public endDate: any;

    public onDateChanged_debounce: any

    @Output()
    monitorSelected: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    paramsChanged: EventEmitter<fromModels.IDateRange> = new EventEmitter<fromModels.IDateRange>();

    @Output()
    changeViewMode: EventEmitter<'table' | 'chart'> = new EventEmitter<'table' | 'chart'>();

    @Output()
    toggleSidePane: EventEmitter<string> = new EventEmitter<string>();

    constructor(private dialog: MatDialog, private snackbar: MatSnackBar) {
        // this.params = { 'startDate': moment().subtract(1, 'year').toDate(), 'endDate': moment().toDate() };
        this.filteredMonitors$ = this.monitorCtrl.valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'string' ? value : value.name),
                map(name => name ? this._filter(name) : this.monitors.slice())
            );

        this.onDateChanged_debounce = _.debounce(this.onDateChanged.bind(this), 2000)
    }

    ngOnInit(): void { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.params && changes.params.currentValue) {
            this.startDate = new Date(this.params.startDate);
            this.endDate = new Date(this.params.endDate);
        }
    }

    ngOnDestroy(): void {
        if (this.subscriptions.length > 0) {
            this.subscriptions.forEach(subscription => subscription.unsubscribe());
        }
    }

    public onDateChanged(e: MatDatepickerInputEvent<Date>, type: string): void {
        const newRequest = Object.assign({}, this.params);
        if (type === 'startDate') {

            if (e.value && e.value.getTime() === this.startDate.getTime()) {
                return;
            }
            newRequest.startDate = moment(e.value).format('MM/DD/YYYY');
        } else {
            if (e.value && e.value.getTime() === this.endDate.getTime()) {
                return;
            }
            newRequest.endDate = moment(e.value).format('MM/DD/YYYY');
        }
        this.paramsChanged.emit(newRequest);
    }

    public onMonitorSelected(val: fromModels.IMonitor): void {
        this.selectedMonitor = val;
        this.monitorSelected.emit(val.name);
    }

    public getTimezoneUnawareDate(mmddYYYY: string): Date {
        if (mmddYYYY) {
            const dateValue = moment(mmddYYYY).toDate();
            const dateWithNoTimezone = new Date(
                dateValue.getUTCFullYear(),
                dateValue.getUTCMonth(),
                dateValue.getUTCDate(),
                dateValue.getUTCHours(),
                dateValue.getUTCMinutes(),
                dateValue.getUTCSeconds()
            );
            return dateWithNoTimezone;
        }
        return null;
    }

    public displayMonitor(monitor: fromModels.IMonitor): string {
        return monitor && monitor.name ? monitor.name : '';
    }

    public addMonitor(): void {
        const dialogExportEditor = this.dialog.open(TimeseriesExporterEditiorLayoutComponent, {
            hasBackdrop: true,
            width: '50rem',
            height: '55rem',
            data: {
                // monitor: null,
                mode: 'create'
            }
        });
    }

    public viewModeChanged(mode: 'table' | 'chart'): void {
        this.changeViewMode.emit(mode);
    }

    public sidePaneToggled(view: string): void {
        this.toggleSidePane.emit(view);
    }

    public editMonitor(): void {
        if (this.monitorCtrl.value) {
            const dialogExportEditor = this.dialog.open(TimeseriesExporterEditiorLayoutComponent, {
                hasBackdrop: true,
                width: '50rem',
                height: '55rem',
                data: {
                    // monitor: this.monitorCtrl.value,
                    mode: 'edit'
                }
            });

            this.subscriptions.push(dialogExportEditor.afterClosed().subscribe(result => {
                if (result) {
                    // This is coming from the editor
                }
            }));
        } else {
            this.snackbar.open('Please select a list to edit, first!', '', { duration: 3000 });
        }
    }

    private _filter(name: string): fromModels.IMonitor[] {
        const filterValue = name.toLowerCase();
        return this.monitors.filter(monitor => monitor.name.toLowerCase().indexOf(filterValue) === 0);
    }
}
