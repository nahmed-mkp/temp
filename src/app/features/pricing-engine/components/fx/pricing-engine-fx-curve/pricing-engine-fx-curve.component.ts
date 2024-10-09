import { Component, OnInit, Input } from '@angular/core';
import { GridOptions, GridApi } from 'ag-grid-community';
import { UtilityService } from 'src/app/services';

@Component({
    selector: 'app-pricing-engine-fx-curve',
    templateUrl: './pricing-engine-fx-curve.component.html',
    styleUrls: ['./pricing-engine-fx-curve.component.scss']
})
export class PricingEngineFxCurveComponent implements OnInit {

    @Input() data: any[];
    @Input() loading: boolean;

    private gridApi: GridApi;
    public extraOption = {};

    public customGridOption: GridOptions = {
        defaultColDef: {
            filter: 'agSetColumnFilter',
            enableCellChangeFlash: false,
            floatingFilter: true,
            width: 150,
            cellStyle: params => {
                return typeof params.value === 'number' && { 'justify-content': 'flex-end' }
            },
        },
        columnDefs: [
            {headerName: 'MarksTicker', field: 'MarksTicker'},
            {headerName: 'Value', field: 'Value'},
            {headerName: 'MaturityDate', field: 'MaturityDate'},
            {headerName: 'LastUpdate', field: 'LastUpdate'},
        ],

        // Event ---------------------------------------------

        // UI ---------------------------------------------
        rowClass: 'medium-row',
        rowHeight: 22,
        groupHeaderHeight: 24,
        headerHeight: 24,
        floatingFiltersHeight: 28,
    }

    public chartOptions = {
        rangeSelector: {
            selected: 1
        },
        title: {
            text: 'Fx Curve'
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date'
            }
        },
        yAxis: {
            labels: {
                align: 'right',
                x: -3
            },
            title: {
                text: 'Net Contributions (mm)'
            },
            lineWidth: 2,
            resize: {
                enabled: true
            }
        },
        legend: {
            layout: 'horizontal',
            align: 'left',
            verticalAlign: 'bottom',
            floating: false,
            borderWidth: 1,
            enabled: true
        },
        tooltip: {
            shared: true,
            crosshairs: [true],
            borderColor: 'gray',
            borderRadius: 10,
            borderWidth: 1,
            split: false,
            formatter: function() {
              return this.points.reduce(function(s, point) {
                  return s + '<br /><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': ' + point.y.toLocaleString('en-US', {maximumFractionDigits: 0, minimumFractionDigits: 0});
              }, '<b>' + new Date(this.x).toLocaleDateString('en-US', { timeZone: 'UTC'}) + '</b>');
            }
        },
        credits: {
            enabled: false
        },
    };

    constructor() { }

    ngOnInit() {
    }

}
