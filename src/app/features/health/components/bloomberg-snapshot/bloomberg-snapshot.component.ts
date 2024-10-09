import { EventEmitter, Output } from '@angular/core';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { Subscription } from 'rxjs';

import { ProcessRestartConfirmationComponent } from '../process-restart-confirmation/process-restart-confirmation.component';
import { AppHistoryComponent } from './../app-history/app-history.component';

import * as fromModels from './../../models/health.models';

@Component({
    selector: 'app-bbg-snapshot',
    templateUrl: './bloomberg-snapshot.component.html',
    styleUrls: ['./bloomberg-snapshot.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BloombergSnapshotComponent implements OnInit {

    @Input() bbgStatus: any[];
    @Input() twebStatus: any[];
    
    @Output() loginAndRestartBloombergServer: EventEmitter<string> = new EventEmitter<string>();    
    @Output() restartBloombergServer: EventEmitter<string> = new EventEmitter<string>();

    @Output() restartMDServerAndTradewebFeed: EventEmitter<string> = new EventEmitter<string>();
    @Output() restartTradewebFeed: EventEmitter<string> = new EventEmitter<string>();

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

    onLoginAndRestartBloomberg(bbgServer: string): void {
        this.dialogRef = this.dialog.open(ProcessRestartConfirmationComponent, {
            hasBackdrop: true,
            width: '40rem',
            height: '15rem',
            data: {
                processName: 'Bloomberg RT',
                serverName: bbgServer,
                action: 'login and restart'
            }
        });

        this.subscription = this.dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.loginAndRestartBloombergServer.emit(bbgServer);
            }
        });
    }

    onRestartMDLinkServerAndFeeds(twebServer: string): void {
        this.dialogRef = this.dialog.open(ProcessRestartConfirmationComponent, {
            hasBackdrop: true,
            width: '40rem',
            height: '15rem',
            data: {
                processName: 'Tradeweb Feed',
                serverName: twebServer,
                action: 'login and restart'
            }
        });

        this.subscription = this.dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.restartMDServerAndTradewebFeed.emit(twebServer);
            }
        });
    }

    onRestartBloomberg(bbgServer: string): void {
        this.dialogRef = this.dialog.open(ProcessRestartConfirmationComponent, {
            hasBackdrop: true,
            width: '40rem',
            height: '15rem',
            data: {
                processName: 'Bloomberg RT',
                serverName: bbgServer,
                action: 'restart'
            }
        });

        this.subscription = this.dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.restartBloombergServer.emit(bbgServer);
            }
        });
    }

    onRestartTradeweb(server: string): void {
        this.dialogRef = this.dialog.open(ProcessRestartConfirmationComponent, {
            hasBackdrop: true,
            width: '40rem',
            height: '15rem',
            data: {
                processName: 'Tradeweb Feed',
                serverName: server,
                action: 'restart'
            }
        });

        this.subscription = this.dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.restartTradewebFeed.emit(server);
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
                this.killProcess.emit({'appName': row['AppName'], 'machineName': row['MachineName'], 'pid': row['PID']});
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

    public isMachineAvailable(name: string){
        if(name !== 'RISKBBG01' && name !== 'RISKBBG004'){
            return true;
        } else {
            return false;
        }
    }
}
