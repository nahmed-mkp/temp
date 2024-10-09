import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
    selector: 'app-security-master-security-viewer-subtab',
    templateUrl: './security-master-security-viewer-subtab.component.html',
    styleUrls: ['./security-master-security-viewer-subtab.component.scss']
})
export class SecurityMasterSecurityViewerSubtabComponent implements OnInit, OnChanges {

    @Input() tabName: string;
    @Input() fields: any[];
    @Input() loading: boolean;
    @Input() securityDetail: any;

    @Output() valueGetterCallBack = new EventEmitter<any>();


    public value: number;
    public targetFieldNames: string[] = [];
    public newFormGroup = this.formBuilder.group({});
    
    constructor(private formBuilder: UntypedFormBuilder) {
        this.getValue = this.getValue.bind(this);
    }

    ngOnInit() {
        this.valueGetterCallBack.emit(this.getValue);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.fields && changes.fields.currentValue) {
            this._createForm(this.fields[0] || []);
        }

        if (changes.securityDetail && changes.securityDetail.currentValue) {
            this._bindFormValue(this.securityDetail);
        }
    }

    public onSumbit() {
        console.log('form Value change', this.newFormGroup.value);
    }

    private _createForm(fields: any[]) {
        fields.forEach(field => {
            this.targetFieldNames.push(field['PSMAttributeName']);
            this.newFormGroup.addControl(field['PSMAttributeName'], this.formBuilder.control(''));
        });
    }

    private _bindFormValue(securityDetail: any) {
        let keys = Object.keys(securityDetail);
        if (securityDetail['identifiers']) {
            keys = [...keys, ...Object.keys(securityDetail['identifiers'])];
        }
        this.targetFieldNames.forEach(name => {
            if (keys.includes(name)) {
                const targetFormControl = this.newFormGroup.get(name);
                let targetSecurityDetailValue;
                if (this.tabName === 'Identifiers') {
                    targetSecurityDetailValue = securityDetail[name] || securityDetail['identifiers'][name]
                } else {
                    targetSecurityDetailValue = securityDetail[name];
                }
                targetFormControl.setValue(targetSecurityDetailValue);
            }
        });
    }

    public getValue() {
        return this.newFormGroup.value;
    }

}
