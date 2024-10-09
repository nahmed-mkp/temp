import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-security-master-security-viewer-subtab-rules',
    templateUrl: './security-master-security-viewer-subtab-rules.component.html',
    styleUrls: ['./security-master-security-viewer-subtab-rules.component.scss']
})
export class SecurityMasterSecurityViewerSubtabRulesComponent implements OnInit, OnChanges {

    @Input() rules: any;

    public rulesFormatted: any[];

    constructor() { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.rules && changes.rules.currentValue) {
            const keys = Object.keys(this.rules) || [];
            this.rulesFormatted = keys.map(key => {
                const value = this.rules[key];
                if (value === 'Success') {
                    return {ruleName: key, status: 'Success', message: 'Success'};
                } else {
                    return {ruleName: key, status: 'Error', message: value};
                }
            });

            // console.log('rulesFormatted', this.rulesFormatted);
        }
    }

    ngOnInit() {
    }

}
