import { EventEmitter, Output } from '@angular/core';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Subscription } from 'rxjs';

import { ProcessRestartConfirmationComponent } from '../process-restart-confirmation/process-restart-confirmation.component';
import { AppHistoryComponent } from './../app-history/app-history.component';

import * as fromModels from './../../models/health.models';

@Component({
    selector: 'app-riskserver-snapshot',
    templateUrl: './riskserver-snapshot.component.html',
    styleUrls: ['./riskserver-snapshot.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RiskServerSnapshotComponent implements OnInit {

    @Input() riskServerStatus: any[];
    @Input() simGenStatus: any[];

    @Output() restartRiskServer: EventEmitter<string> = new EventEmitter<string>();
    @Output() restartSimGen: EventEmitter<string> = new EventEmitter<string>();

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

    onRestartRiskServer(riskServer: string): void {
        this.dialogRef = this.dialog.open(ProcessRestartConfirmationComponent, {
            hasBackdrop: true,
            width: '35rem',
            height: '15rem',
            data: {
                processName: 'Risk Server',
                serverName: riskServer,
                action: 'restart'
            }
        });

        this.subscription = this.dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.restartRiskServer.emit(riskServer);
            }
        });
    }

    onRestartSimGen(simGen: string): void {
        this.dialogRef = this.dialog.open(ProcessRestartConfirmationComponent, {
            hasBackdrop: true,
            width: '40rem',
            height: '15rem',
            data: {
                processName: 'SimGen Server',
                serverName: simGen,
                action: 'restart'
            }
        });

        this.subscription = this.dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.restartSimGen.emit(simGen);
            }
        });
    }

    onKillProcess(row: any): void {
        this.dialogRef = this.dialog.open(ProcessRestartConfirmationComponent, {
            hasBackdrop: true,
            width: '40rem',
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

    onViewHistory(server: string, appName: string): void {
        this.dialog.open(AppHistoryComponent, {
            hasBackdrop: true,
            width: '65rem',
            height: '50rem',
            data: {
                appName: appName,
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
}
