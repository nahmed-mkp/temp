import { EventEmitter, Output } from '@angular/core';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Subscription } from 'rxjs';

import { ProcessRestartConfirmationComponent } from '../process-restart-confirmation/process-restart-confirmation.component';
import { AppHistoryComponent } from './../app-history/app-history.component';

import * as fromModels from './../../models';
@Component({
    selector: 'app-jobscheduler-snapshot',
    templateUrl: './jobscheduler-snapshot.component.html',
    styleUrls: ['./jobscheduler-snapshot.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobSchedulerSnapshotComponent implements OnInit {

    @Input() jobSchedulers: any[];
    @Output() restartJobScheduler: EventEmitter<string> = new EventEmitter<string>();
    @Output() killProcess: EventEmitter<fromModels.ProcessKillRequest> = new EventEmitter<fromModels.ProcessKillRequest>();

    private dialogRef: MatDialogRef<ProcessRestartConfirmationComponent>;

    private subscription: Subscription;
    
    constructor(private dialog: MatDialog) { }

    ngOnInit(): void { }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onRestartJobScheduler(server: string): void {
        this.dialogRef = this.dialog.open(ProcessRestartConfirmationComponent, {
            hasBackdrop: true,
            width: '40rem',
            height: '15rem',
            data: {
                processName: 'Job Scheduler',
                serverName: server
            }
        });

        this.subscription = this.dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.restartJobScheduler.emit(server);
            }
        });
    }

    onKillProcess(row: any): void {
        this.dialogRef = this.dialog.open(ProcessRestartConfirmationComponent, {
            hasBackdrop: true,
            width: '35rem',
            height: '15rem',
            data: {
                processName: row.AppName,
                serverName: row.MachineName,
                pid: row.PID,
                action: 'kill'
            }
        });

        this.subscription = this.dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.killProcess.emit({ 'appName': row['AppName'], 'machineName': row['MachineName'], 'pid': row['PID'] });
            }
        });
    }

    onViewHistory(server: string): void {
        this.dialog.open(AppHistoryComponent, {
            hasBackdrop: true,
            width: '65rem',
            height: '50rem',
            data: {
                appName: 'JobScheduler',
                machineName: server
            }
        });
    }

    public getTimezoneUnawareDate(date: string): Date {
        const dateValue = new Date(date);
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

    public isJobSchedulerAvailable(name: string){
        if(name !== 'RISKBBG004'){
            return true;
        } else {
            return false;
        }
    }
}
