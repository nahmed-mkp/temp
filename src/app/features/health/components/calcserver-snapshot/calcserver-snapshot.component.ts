import { EventEmitter, Output } from '@angular/core';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Subscription } from 'rxjs';

import { ProcessRestartConfirmationComponent } from '../process-restart-confirmation/process-restart-confirmation.component';
import { AppHistoryComponent } from './../app-history/app-history.component';

import * as fromModels from './../../models';

@Component({
    selector: 'app-calcserver-snapshot',
    templateUrl: './calcserver-snapshot.component.html',
    styleUrls: ['./calcserver-snapshot.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalcServerSnapshotComponent implements OnInit {

    @Input() calcServerStatus: any[];
    
    @Output() restartCalcServer: EventEmitter<fromModels.AppRestartRequest> = new EventEmitter<fromModels.AppRestartRequest>();
    @Output() restartAllCalcServers: EventEmitter<string> = new EventEmitter<string>();

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

    onRestartAllCalcServers(): void {
        this.dialogRef = this.dialog.open(ProcessRestartConfirmationComponent, {
            hasBackdrop: true,
            width: '35rem',
            height: '15rem',
            data: {
                processName: 'all calc servers',
                serverName: 'all machines',
                action: 'restart'
            }
        });

        this.subscription = this.dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.restartAllCalcServers.emit();
            }
        });
    }

    onRestartCalcServer(appName: string, machineName: string): void {
        this.dialogRef = this.dialog.open(ProcessRestartConfirmationComponent, {
            hasBackdrop: true,
            width: '35rem',
            height: '15rem',
            data: {
                processName: appName,
                serverName: machineName,
                action: 'restart'
            }
        });

        this.subscription = this.dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.restartCalcServer.emit({'appName': appName, 'machineName': machineName});
            }
        });
    }

    onRestartAll(): void {
        if (this.calcServerStatus && this.calcServerStatus.length > 0) { 
            const serverName = this.calcServerStatus[0].MachineName;
            this.dialogRef = this.dialog.open(ProcessRestartConfirmationComponent, {
                hasBackdrop: true,
                width: '35rem',
                height: '15rem',
                data: {
                    processName: 'All Calc Servers',
                    serverName: serverName,
                    action: 'restart'
                }
            });

            this.subscription = this.dialogRef.afterClosed().subscribe(result => {
                if (result === true) {
                    this.restartAllCalcServers.emit(serverName);
                }
            });
        }
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

    onViewHistory(appName: string, machineName: string): void {
        this.dialog.open(AppHistoryComponent, {
            hasBackdrop: true,
            width: '65rem',
            height: '50rem',
            data: {
                appName: appName,
                machineName: machineName
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
}
