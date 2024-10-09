import { Component } from '@angular/core';

@Component({
    selector: 'app-timeseries-state-value-date-renderer',
    template: `<div> {{value}} <sub> <span style="margin-left:4px;color:#848484"> {{date}} </span> </sub>  </div>`
})

export class TimeseriesStateValueDateRendererComponent {

    public value: string;
    public date: string;

    agInit(params: any): void {
        this.value = params.value;
        this.date = params.date;
    }

}
