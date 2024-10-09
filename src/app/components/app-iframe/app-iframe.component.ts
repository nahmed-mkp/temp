import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-iframe',
    template: `<div class="iframe-container" [style.height]="height"><iframe class="iframe" [src]="src | safe"></iframe></div>`
})
export class AppIFrameComponent implements OnInit {

    @Input() src: string;
    @Input() height: string;

    constructor() { }

    ngOnInit() { }
}
