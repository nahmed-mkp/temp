import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as fromRoot from './../../../../store';
import * as fromModels from './../../models/health.models';
import * as fromStore from './../../store';
import * as fromSocketActions from '../../../../shared/custom/sockets/store/actions';

@Component({
    selector: 'app-health-layout',
    templateUrl: './health-layout.component.html',
    styleUrls: ['./health-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HealthLayoutComponent implements OnInit, OnDestroy {

    public processMonitorData$: Observable<any>;
    public healthStatus$: Observable<any>;
    public healthStatusLoading$: Observable<boolean>;
    public healthStatusLoaded$: Observable<boolean>;
    public healthStatusError$: Observable<string>;

    public currentUser$: Subscription;
    public currentUser: string;

    public subScreenOpen =  false;
    public activeSubScreen: 'processMonitor';

    constructor(private store: Store<fromStore.HealthStatusState>, private rootStore: Store<fromRoot.RootState>) {
        this.processMonitorData$ = this.rootStore.select(fromStore.getSocketProcessMonitorData);
        this.healthStatus$ = this.store.select(fromStore.getHealthStatus);
        this.healthStatusLoading$ = this.store.select(fromStore.getHealthStatusLoading);
        this.healthStatusLoaded$ = this.store.select(fromStore.getHealthStatusLoaded);
        this.healthStatusError$ = this.store.select(fromStore.getHealthStatusError);

        this.currentUser$ = this.rootStore.select(fromRoot.getAuthenticatedUser)
        .subscribe((user) => {
            this.currentUser = user.ntName;
        });
    }

    ngOnInit(): void {
        this.rootStore.dispatch(new fromStore.LoadProcessMonitorNames());
        this.rootStore.dispatch(new fromStore.SubToProcessMonitorData());
        setInterval(() => {
            this.store.dispatch(new fromStore.LoadHealthStatus());
        }, 10000);
    }

    onChangeSubscreen(screen: 'processMonitor') {

        if (this.subScreenOpen === false) {
          this.subScreenOpen = true;
          this.activeSubScreen = screen;
        } else {
          if (this.activeSubScreen === screen) {
            this.activeSubScreen = undefined;
            this.subScreenOpen = false;
          } else {
            this.activeSubScreen = screen;
          }
        }

      }

    loginAndRestartBloombergServer(server: string): void {
        this.store.dispatch(new fromStore.LoginAndRestartBloomberg({machineName: server, userName: this.currentUser, requestType: 'Login And Restart Bloomberg' }))
    }

    restartBloombergServer(server: string): void {
        const payload = { 'appName': 'BloombergRT', 'machineName': server };
        this.restartApp(payload);
    }

    restartMDServerAndTradewebFeed(server: string): void {
        this.store.dispatch(new fromStore.LoginAndRestartTradeweb({ machineName: server, userName: this.currentUser, requestType: 'Login and Restart Tradeweb'}))
    }

    restartTradewebFeed(server: string): void {
        const payload = { 'appName': 'TradewebFeed', 'machineName': server };
        this.restartApp(payload);
    }

    restartJobScheduler(server: string): void {
        const payload = { 'appName': 'JobScheduler', 'machineName': server };
        this.restartApp(payload);
    }

    restartRiskServer(server: string): void {
        const payload = { 'appName': 'RiskServer', 'machineName': server };
        this.restartApp(payload);
    }

    restartSimGen(server: string): void {
        const payload = { 'appName': 'SimGen', 'machineName': server };
        this.restartApp(payload);
    }

    restartCalcServer(request: fromModels.AppRestartRequest): void {
        this.restartApp(request);
    }

    restartAllCalcServers(serverName: string): void {
        this.store.dispatch(new fromStore.RestartAllCalcServers({machineName: serverName, userName: this.currentUser, requestType: 'Restart All Calc Servers'}));
    }

    restartApp(request: fromModels.AppRestartRequest): void {
        request = Object.assign({}, request, {'userName': this.currentUser});
        this.store.dispatch(new fromStore.RestartApp(request));
    }

    killProcess(request: fromModels.ProcessKillRequest): void {
        request = Object.assign({}, request, { 'userName': this.currentUser });
        this.store.dispatch(new fromStore.KillMonitoredProcess(request));
    }

    ngOnDestroy(): void {
        this.store.dispatch(new fromStore.UnsubFromProcessMonitorData());
    }
}
