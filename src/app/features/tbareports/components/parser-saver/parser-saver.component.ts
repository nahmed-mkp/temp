import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-tbareports-parser-saver',
    templateUrl: './parser-saver.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParserSaverComponent implements OnInit {

    @Input() results: any[];
    @Output() onSaveResults: EventEmitter<void> = new EventEmitter<void>();

    constructor() { }

    ngOnInit() { }

    public getResults(input: string): any[] {
        return JSON.parse(input);
    }

    public saveResults(): void {
        this.onSaveResults.emit();
    }
}
