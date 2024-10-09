import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, OnDestroy, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { MatOption } from '@angular/material/core';
import { MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef } from '@angular/material/legacy-dialog';
import { MatLegacyMenuTrigger as MatMenuTrigger } from '@angular/material/legacy-menu';

import { DialsSetCreateDialogComponent } from '../dials-set-create-dialog/dials-set-create-dialog.component';
import * as fromModels from '../../models/dials.models';

@Component({
    selector: 'app-dials-set-selector',
    templateUrl: './dials-set-selector.component.html',
    styleUrls: ['./dials-set-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialsSetSelectorComponent implements OnInit, OnChanges, OnDestroy {

    @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;
    @ViewChild('triggerDelete') triggerDelete: MatMenuTrigger;

    @Input() dialsSets: fromModels.DialsSet[];
    @Input() selectedDialsSet: fromModels.DialsSet;
    @Input() editedDial: fromModels.DialUpdate;

    @Output() selectDialsSet: EventEmitter<fromModels.DialsSet> = new EventEmitter<fromModels.DialsSet>();
    @Output() addDialsSet: EventEmitter<fromModels.NewDialsSet> = new EventEmitter<fromModels.NewDialsSet>();
    @Output() disableDialsSet: EventEmitter<fromModels.DialsSet> = new EventEmitter<fromModels.DialsSet>();
    @Output() deleteDialset: EventEmitter<fromModels.DialsSet> = new EventEmitter<fromModels.DialsSet>(); 
    @Output() updateDial = new EventEmitter();

    // private subscription: Subscription;
    // private dialogRef: MatDialogRef<DialsSetCreateDialogComponent>;

    public saveAllow: boolean = false;
    public newDialsSetName: string;

    filteredDialsSets$: Observable<fromModels.DialsSet[]>;
    fitleredCloneDialsSets$: Observable<fromModels.DialsSet[]>;

    searchFilter: UntypedFormControl = new UntypedFormControl();
    searchCloneFilter: UntypedFormControl = new UntypedFormControl();

    viewForm = false;

    constructor(private dialog: MatDialog) {
        this.filteredDialsSets$ = this.searchFilter.valueChanges
            .pipe(
                startWith<string | fromModels.DialsSet>(''),
                map(value => typeof value === 'string' ? value : value.yieldbookDialsName),
                map(name => name ? this._filter(name) : this.dialsSets.slice())
            );
        this.fitleredCloneDialsSets$ = this.searchCloneFilter.valueChanges
            .pipe(
                startWith<string | fromModels.DialsSet>(''),
                map(value => typeof value === 'string' ? value : value.yieldbookDialsName),
                map(name => name ? this._filter(name) : this.dialsSets.slice())
            );
    }

    ngOnChanges(changes: SimpleChanges) {
        if(changes.editedDial && changes.editedDial.currentValue) {
            this.saveAllow = true;
        }
    }

    ngOnInit(): void {}

    ngOnDestroy(): void {
        // if(this.subscription) this.subscription.unsubscribe();
    }

    /**  Events **/

    changeDialsSet(payload: fromModels.DialsSet): void {
        this.selectDialsSet.emit(payload);
        this.searchCloneFilter.setValue(payload);
    }

    // addClicked(): void {
    //     this.viewForm = true;
    //     this.dialogRef = this.dialog.open(DialsSetCreateDialogComponent);
    //     this.subscription = this.dialogRef.afterClosed().subscribe(result => {
    //         if(result && result.newDialSetName){
    //             // this.addDialsSet.emit(result.newDialSetName);
    //         }
    //     })
    // }

    onDeleteDialset(): void {
        if(this.selectedDialsSet) {
            this.deleteDialset.emit(this.selectedDialsSet);
            this.onCloseDeleteDialsSetMenu();
        } else alert('select a dials set');
    } 

    disableClicked(): void {
        if (this.selectedDialsSet) {
            this.disableDialsSet.emit(this.selectedDialsSet);
        }
    }

    onUpdateDial(): void {
        this.updateDial.emit();
        this.saveAllow = false;
    }

    onAddDialsSet(): void {
        const newDialsSet = {
            yieldbookDialsName: this.newDialsSetName,
            copyDialsFromId: this.searchCloneFilter.value.yieldbookDialsSetId
        }
        this.addDialsSet.emit(newDialsSet);
        this.onCloseNewDialsSetMenu();
    }

    onCloseNewDialsSetMenu(): void {
        this.menuTrigger.closeMenu();
    }

    onCloseDeleteDialsSetMenu(): void {
        this.triggerDelete.closeMenu();
    }

    /** Helper methods **/

    displayFn(dialsSet: fromModels.DialsSet): string {
        return dialsSet ? dialsSet.yieldbookDialsName : undefined;
    }

    private _filter(value: string): fromModels.DialsSet[] {
        const filterValue = value.toLowerCase();
        return this.dialsSets.filter(dialsSet => dialsSet.yieldbookDialsName.toLowerCase().indexOf(filterValue) === 0);
    }
}
