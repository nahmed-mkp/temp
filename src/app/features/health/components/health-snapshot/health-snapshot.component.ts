import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import * as fromModels from './../../models/health.models';
@Component({
    selector: 'app-health-snapshot',
    templateUrl: './health-snapshot.component.html',
    styleUrls: ['./health-snapshot.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HealthSnapshotComponent implements OnInit {

    @Input() healthStatus: any;
    @Input() healthStatusLoading: boolean;
    @Input() healthStatusLoaded: boolean;
    @Input() healthStatusError: string;

    @Output() loginAndRestartBloomberg: EventEmitter<string> = new EventEmitter<string>();
    @Output() restartBloombergRT: EventEmitter<string> = new EventEmitter<string>();

    @Output() restartMDServerAndTradewebFeed: EventEmitter<string> = new EventEmitter<string>();
    @Output() restartTradewebFeed: EventEmitter<string> = new EventEmitter<string>();

    @Output() restartJobScheduler: EventEmitter<string> = new EventEmitter<string>();
    
    @Output() restartCalcServer: EventEmitter<string> = new EventEmitter<string>();
    @Output() restartAllCalcServers: EventEmitter<string> = new EventEmitter<string>();

    @Output() restartRiskServer: EventEmitter<string> = new EventEmitter<string>();
    @Output() restartSimGen: EventEmitter<string> = new EventEmitter<string>();

    @Output() killProcess: EventEmitter<fromModels.ProcessKillRequest> = new EventEmitter<fromModels.ProcessKillRequest>();
    
    constructor() { }

    ngOnInit(): void { }

    onLoginAndRestartBloombergServer(serverName: string): void {
        this.loginAndRestartBloomberg.emit(serverName);
    }
    
    onRestartBloombergServer(serverName: string): void {
        this.restartBloombergRT.emit(serverName);
    }
    
    onRestartJobScheduler(serverName: string): void {
        this.restartJobScheduler.emit(serverName);
    }

    onRestartCalcServer(serverName: string): void {
        this.restartCalcServer.emit(serverName);
    }

    onRestartAllCalcServers(serverName: string): void { 
        this.restartAllCalcServers.emit(serverName);
    }

    onRestartMDServerAndTradewebFeed(serverName: string): void {
        this.restartMDServerAndTradewebFeed.emit(serverName);
    }

    onRestartTradewebFeed(serverName: string): void {
        this.restartTradewebFeed.emit(serverName);
    }

    onRestartRiskServer(serverName: string): void {
        this.restartRiskServer.emit(serverName);
    }

    onRestartSimGen(serverName: string): void {
        this.restartSimGen.emit(serverName);
    }

    onKillProcess(request: fromModels.ProcessKillRequest): void {
        this.killProcess.emit(request);
    }
}

