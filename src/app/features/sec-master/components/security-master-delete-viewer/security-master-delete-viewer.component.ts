import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridApi } from 'ag-grid-community';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { AppConfirmationComponent } from 'src/app/components';

@Component({
    selector: 'app-security-master-delete-viewer',
    templateUrl: './security-master-delete-viewer.component.html',
    styleUrls: ['./security-master-delete-viewer.component.scss']
})
export class SecurityMasterDeleteViewerComponent implements OnInit {

    @Input() data: any;
    @Input() loading: boolean;
    @Input() deletePending: boolean;

    @Output() loadSecurityForDelete = new EventEmitter<number>();
    @Output() deleteSecurity = new EventEmitter<number>();

    public crdSecId: number = null;

    constructor(private dialog: MatDialog) { }

    ngOnInit() {
    }

    public onLoadSecurityForDelete() {
        this.loadSecurityForDelete.emit(this.crdSecId);
    }

    public onDeleteSecurity() {

        const dialogRef = this.dialog.open(AppConfirmationComponent, {
            data: {
                'title': 'Confirm Delete',
                'message': `Are you sure you want to delete: ${this.data ? (this.data['SecName'] + ', ') : ''} crdSecId = ${this.crdSecId} ?`,
                'showCancel': true,
                'showOk': false,
                'showConfirm': true
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteSecurity.emit(this.crdSecId);
                this.crdSecId = null;
            }
        });
    }

}
