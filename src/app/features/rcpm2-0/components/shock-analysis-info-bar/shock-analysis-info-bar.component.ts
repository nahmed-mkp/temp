import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-shock-analysis-info-bar',
    templateUrl: './shock-analysis-info-bar.component.html',
    styleUrls: ['./shock-analysis-info-bar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShockAnalysisInfoBarComponent implements OnInit {

    @Input() shockInfo: any;
    @Output() triggerShock = new EventEmitter()

    public Object = Object;
    public slideStatus: string = 'down';

    constructor() {}

    ngOnInit() {}

    onTriggerShock() {
        this.triggerShock.emit();
    }
}