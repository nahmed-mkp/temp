import { Component, OnInit, ChangeDetectionStrategy, ViewChild, OnDestroy, HostListener, Inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromStore from './../../../../store';
import * as fromRCPMStore from '../../../../features/rcpm2-0/store';
import * as fromSocketDashboardStore from '../../../../features/sockets-dashboard/store';
import * as fromModels from './../../../../models';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { AuthService } from 'src/app/services';

@Component({
    selector: 'app-search-dialog',
    templateUrl: 'search-dialog.component.html',
})
export class SearchDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<SearchDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}

@Component({
    templateUrl: './private-layout.component.html',
    styleUrls: ['./private-layout.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivateLayoutComponent implements OnInit, OnDestroy {

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

    public drag = false;
    public sideMenuShown = true;

    public errorMenuDrag = false;
    public errorMenuShown = true;

    public authenticatedUser: fromModels.IAuthenticatedUser;
    public userSubscription$: Subscription;
    public isUserLocked$: Observable<boolean>;
    public userLockedSubscription$: Subscription;

    public sideMenuTriggerShown = true;
    public isCompaceMode: boolean;

    public errorPanelDisplay$: Observable<boolean>;
    public errorCollection$: Observable<fromModels.HttpError[]>;

    public unconfirmedTrades$: Observable<any[]>;
    public unconfirmedTradesLoading$: Observable<boolean>;
    public unconfirmedTradesLoaded$: Observable<boolean>;
    public unconfirmedTradesError$: Observable<string>;

    public dataRetrievalMethod$: Observable<any>;

    public showSearchbar = false;

    @HostListener('window:keydown', ['$event'])
    onKeyDown($event) {
        // Search
        if (($event.ctrlKey || $event.metaKey) && $event.keyCode === 81) {
            // console.log('CTRL + Q');
            // this.showSearchbar = !this.showSearchbar;
            this.openSearch();
        }
        if ($event.keyCode === 27) {
            this.showSearchbar = false;
        }

    }

    constructor(private breakpointObserver: BreakpointObserver,
        private _snackBar: MatSnackBar,
        private store: Store<fromStore.RootState>,
        private RCPMstore: Store<fromRCPMStore.RCPM2State>,
        private SocketDashboardStore: Store<fromSocketDashboardStore.SocketDashboardState>,
        private snackbar: MatSnackBar,
        private authService: AuthService,
        private dialog: MatDialog) {

        this.isUserLocked$ = this.store.select(fromStore.isUserLocked);

        this.unconfirmedTrades$ = this.store.select(fromStore.getUnconfirmedTrades);
        this.unconfirmedTradesLoading$ = this.store.select(fromStore.getUnconfirmedTradesLoading);
        this.unconfirmedTradesLoaded$ = this.store.select(fromStore.getUnconfirmedTradesLoaded);
        this.unconfirmedTradesError$ = this.store.select(fromStore.getUnconfirmedTradesError);

        this.userLockedSubscription$ = this.isUserLocked$
            .subscribe((isUserLocked) => {
                if (isUserLocked) {
                    this.store.dispatch(new fromStore.LoadUsersUnconfirmedTransactions());
                }
            });

        this.userSubscription$ = this.store.select(fromStore.getAuthenticatedUser)
            .subscribe((user) => {
                if (user) {
                    this.authenticatedUser = user;
                } else {
                    if (this.authenticatedUser) {
                        this.store.dispatch(new fromStore.Go({path: ['/public/login']}));
                        this.snackbar.open('Goodbye!', '', { duration: 3000 });
                    }
                }
            });

        if (window.location.href.includes('compact')) {
            this.isCompaceMode = true;
        }

        this.errorPanelDisplay$ = this.store.select(fromStore.getPanelDisplay);
        this.errorCollection$ = this.store.select(fromStore.getErrorCollection);
        this.dataRetrievalMethod$ = this.RCPMstore.select(fromRCPMStore.getDataRetrievalMethod);
    }

    get avatarUrl(): string {
        const baseUrl = 'https://via.placeholder.com/48x48.png';
        const initials = this.authenticatedUser ? this.authenticatedUser.initials : '';

        return `${baseUrl}?text=${initials}`;
    }

    ngOnInit(): void {
        // this.dataRetrievalMethod$.subscribe(method => {
        //     if (method === 'http') {
        //       this.openSnackBar('Data Retrieval Method Changed To HTTP', 'Hide', {verticalPosition: 'top', horizontalPosition: 'center', duration: 3000});
        //     }
        //   });
    }

    ngOnDestroy(): void {
        if (this.userSubscription$) {
            this.userSubscription$.unsubscribe();
        }
        if (this.userLockedSubscription$) {
            this.userLockedSubscription$.unsubscribe();
        }
    }

    logout(): void {
        this.store.dispatch(new fromStore.Logout());
    }

    public clearAll() {
        this.store.dispatch(new fromStore.RemoveAllErrors());
    }

    openSearch(): void {
        const searchDialogRef = this.dialog.open(SearchDialogComponent, {
            width: '450px'
        });

        searchDialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    openSnackBar(message: string, action: string, config: any) {
        this._snackBar.open(message, action, config);
    }

    mousedownListener(params){
        this.drag = false;    
    }

    mousemoveListener(params){
        this.drag = true;
    }

    adjustSideMenuVisibility(val:boolean){
        this.sideMenuShown = val;
    }

    handleMenuClick(){
        if(!this.drag){
            this.adjustSideMenuVisibility(false)
        }
    }

    /* =========================== */

    errorMenuMousedownListener(params){
        this.errorMenuDrag = false;    
    }

    errorMenuMousemoveListener(params){
        this.errorMenuDrag = true;
    }

    adjustErrorMenuVisibility(val:boolean){
        this.errorMenuShown = val;
    }

    handleErrorMenuClick(){
        if(!this.errorMenuDrag){
            this.adjustErrorMenuVisibility(false)
        }
    }

}

