import { Injectable } from '@angular/core';
import { ValueGetterParams, ValueFormatterParams, RangeSelection, GridApi, CellRange} from 'ag-grid-community';
import * as d3 from 'd3';
import * as _ from 'lodash';
import * as d3Chromatic from 'd3-scale-chromatic';

@Injectable()
export class UtilityService {

    formatNumber(digit) {
        return (params: ValueGetterParams) => {
            if (params.data && params.data[params.colDef.field] !== null && params.data[params.colDef.field] !== undefined) {
                if (typeof params.data[params.colDef.field] === 'number') {
                    const result = params.data[params.colDef.field].toFixed(digit);
                    return parseFloat(result);
                }
            }
        };
    }

    formatNumberWithCommaSeperated(digit) {
        return (params: ValueGetterParams) => {
            if (params.data && params.data[params.colDef.field] !== null && params.data[params.colDef.field] !== undefined) {
                if (typeof params.data[params.colDef.field] === 'number') {
                    const result = params.data[params.colDef.field].toLocaleString('en-US', {maximumFractionDigits: digit, minimumFractionDigits: digit});
                    return result;
                }
            }
        };
    }

    formatNumberBps(digit) {
        return (params: ValueGetterParams) => {
            if (params.data && params.data[params.colDef.field] !== null && params.data[params.colDef.field] !== undefined) {
                if (typeof params.data[params.colDef.field] === 'number') {
                    const result = (params.data[params.colDef.field] * 10000).toFixed(digit);
                    return parseFloat(result) ;
                }
            }
        };
    }

    formatNumberAdvance(digit) {
        return (params: ValueFormatterParams) => {
            if (params.value !== undefined && params.value !== null) {
                return (params.value).toFixed(digit);
            }
        };
    }

    formatPercentNumber(digit) {
        return (params: ValueGetterParams) => {
            return params.data && params.data[params.colDef.field] !== null && params.data[params.colDef.field] !== undefined && (params.data[params.colDef.field] * 100).toFixed(digit) + '%';
        };
    }

    formatPercentNumberAdvance(digit) {
        return (params: ValueFormatterParams) => {
            if (params.value !== undefined && params.value !== null) {
                return (params.value * 100).toFixed(digit) + '%';
            }
        };
    }

    formatPercentNumberDivide100(digit) {
        return (params: ValueGetterParams) => {
            return params.data && params.data[params.colDef.field] !== null && params.data[params.colDef.field] !== undefined && (params.data[params.colDef.field]).toFixed(digit) + '%';
        };
    }

    formatPercentNumberDivide100Formatter(digit) {
        return (params: ValueFormatterParams) => {
            return params.data && params.data[params.colDef.field] !== null && params.data[params.colDef.field] !== undefined && (params.data[params.colDef.field]).toFixed(digit) + '%';
        };
    }

    formatPercentNumberDivide100FormatterOrZero(digit) {
        return (params: ValueFormatterParams) => {
            return (params.data && params.data[params.colDef.field] !== null &&
                params.data[params.colDef.field] !== undefined && (params.data[params.colDef.field]).toFixed(digit) + '%') || '0.00%';
        };
    }

    formatPercentNumberFormatterOrZero(digit) {
        return (params: ValueFormatterParams) => {
            return (params.data && params.data[params.colDef.field] !== null &&
                params.data[params.colDef.field] !== undefined && (params.data[params.colDef.field]).toFixed(digit) + '%') || '0.00%';
        };
    }

    formatPercentNumberFormatterMultiply100OrZero(digit) {
        return (params: ValueFormatterParams) => {
            return (params.data && params.data[params.colDef.field] !== null &&
                params.data[params.colDef.field] !== undefined && (params.data[params.colDef.field] * 100.0).toFixed(digit) + '%') || '0.00%';
        };
    }

    formatDate(params: ValueFormatterParams): string {
        if(params.value !== undefined &&  params.value !== null) {
            return (new Date(params.value)).toLocaleDateString();
        };
    }

    formatTimestamp(timeZone) {
        return (params: ValueFormatterParams) => {
            if (params.value !== undefined &&  params.value !== null) {
                if (timeZone === 'ETA') {
                    return (new Date(params.value)).toLocaleString('en-US', { timeZone: 'UTC', hour12: true });
                } else {
                    return (new Date(params.value)).toLocaleString();
                }
            }
        }
    }

    formatPriceToTicks(params: ValueFormatterParams): string { 
        if (params.value !== undefined && params.value !== null) {
            let inputPx = params.value;
            const threshold = 0.0000001;

            if (isNaN(inputPx)) { 
                return null;
            }

            inputPx = parseFloat(inputPx.toString());
            let result = '';
            if (inputPx < 0) { 
                result = '-';
                inputPx = Math.abs(inputPx);
            }

            let wholePx = parseInt(inputPx, 10);
            let frac = Math.round(((inputPx - wholePx)*1.0*256));
            if (frac === 0) { 
                result += wholePx.toString() + '-000';
            } else {                

                if (Math.abs(frac - 256) < threshold) { 
                    result += wholePx.toString() + '-000';
                } else { 
                    let strFrac = '';
                    result += wholePx.toString() + '-';
                    let fracInt = parseInt((frac / 8.0).toString());
                    let fracMod = frac % 8.0;
                    let strFracMod = parseInt(fracMod.toString()).toString();
                    if (Math.abs(fracMod - 0.0) < threshold) {
                        strFracMod = '0';
                    } else if (Math.abs(fracMod - 4.0) < threshold) { 
                        strFracMod = '+';
                    }                    
                    if (fracInt < 10) { 
                        strFrac = '0' + fracInt.toString() + strFracMod;
                    } else { 
                        strFrac = fracInt.toString() + strFracMod;
                    }
                    result += strFrac;
                }                
            }
            return result;            
        };
    }

    formatNumberWithCommasAdvance(params: ValueFormatterParams): string {

        if(params.value !== undefined && params.value !== null) {
            // return this.commasFormtter.format(params.value);
            return params.value.toLocaleString('en-us', {maximumFractionDigits: 20})
        }
    }

    formatNumberWithCommas(params: ValueFormatterParams): string {
        if(params.value !== undefined && params.value !== null) {
            return params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }

    formatNumberWithCommasAndDigit(digit, option?: any) {
        return (params: ValueFormatterParams) => {
            // console.log ('what value', params);
            if (params.value !== undefined && params.value !== null && !isNaN(params.value)) {                
                let result: any = Number(params.value);
                if (option && option['thousand']) {
                    result = this.thousandFormatter(params.value);
                } else if (option && option['percent']) {
                    result = this.percentFormatter(params.value);
                } else if (option && option['zeroCutOff']) {
                    if (Math.abs(Math.round(params.value)) < 1 ) {
                        return '  ';
                    }
                } else if (option && option['bps']) {
                    result = this.bpsFormatter(params.value);
                }

                // if (params.data && params.data['SecurityName'] === 'SWPN US 11/08/21 1MX7Y R 1.2500 CI1 LCH' && params.colDef.headerName === 'Gamma01') {
                //     
                // }

                result = result.toLocaleString('en-US', {maximumFractionDigits: digit, minimumFractionDigits: digit});

                if (option && option['percent']) {
                    return result + '%';
                } else {
                    return result;
                }
            } else {
                return undefined;
            }
        };
    }

    formatNumberWithCommasAndDigitBlankNaNs(digit, option?: any) {
        return (params: ValueFormatterParams) => {
            // console.log ('what value', params.value, typeof params.value);
            const myvalue = params.value || params.data[params.colDef.field];
            if (myvalue !== undefined && myvalue !== null && typeof myvalue === 'number') {
                let result: any = myvalue;
                if (option && option['thousand']) {
                    result = this.thousandFormatter(myvalue);
                } else if (option && option['percent']) {
                    result = this.percentFormatter(myvalue);
                } else if (option && option['zeroCutOff']) {
                    if (Math.abs(Math.round(myvalue)) < 1) {
                        return '  ';
                    }
                }
                result = result.toLocaleString('en-US', { maximumFractionDigits: digit, minimumFractionDigits: digit });
                if (result === 'NaN') {
                    result = '  ';
                }
                if (option && option['percent']) {
                    return result + '%';
                } else {
                    return result;
                }
            } else {
                return undefined;
            }
        };
    }

    formatNumberWithCommasAndDigitAdvance(digit, option?: any) {
        return (params: ValueFormatterParams) => {
            // console.log ('what value', params.value, typeof params.value);
            if (params.value !== undefined && params.value !== null && typeof params.value === 'number') {
                let result: any = params.value;
                if (option && option['thousand']) {
                    result = this.thousandFormatter(params.value);
                } 
                
                if (option && (option['percent'] || option['percent_pure'])) {
                    result = this.percentFormatter(params.value);
                }
                 if (option && option['zeroCutOff']) {
                    if (Math.abs(params.value) < 0.01 ) {
                        return '  ';
                    }
                }

                result = result.toLocaleString('en-US', {maximumFractionDigits: digit, minimumFractionDigits: digit});

                if (option && option['percent']) {
                    return result + '%';
                } else {
                    return result;
                }
            } else {
                return undefined;
            }
        }
    }

    formatNumberWithCommasAndDigitAdvanceDynamic(digit, option?: any) {
        return (params: ValueFormatterParams) => {
            // console.log ('what value', params.value, typeof params.value);
            if (params.value !== undefined && params.value !== null && typeof params.value === 'number') {
                let result: any = params.value;
                if (option && option['thousand']) {
                    result = this.thousandFormatter(params.value);
                } 
                
                if (option && (option['percent'] || option['percent_pure'])) {
                    result = this.percentFormatter(params.value);
                }
                 if (option && option['zeroCutOff']) {
                    if (Math.abs(params.value) < 0.01 ) {
                        return '  ';
                    }
                }

                result = result.toLocaleString('en-US', {maximumFractionDigits: digit});

                if (option && option['percent']) {
                    return result + '%';
                } else {
                    return result;
                }
            } else {
                return undefined;
            }
        }
    }

    private thousandFormatter(num: number) {
        return num / 1000;
    }

    private percentFormatter(num: number) {
        return num * 100;
    }

    private bpsFormatter(num: number) {
        return num * 10000;
    }


    // D3 chromatic --------------------------------------------------------------------------------------

    redYellowGreenColorCoder(min: number, max: number) {
        return d3.scaleSequential(d3Chromatic.interpolateRdYlGn).domain([min, max]);
    }

    greenYellowColorCoder(min: number, max: number) {
        // return d3.scaleSequential(d3Chromatic.interpolateYlGn).domain([min, max]);
        return d3.scaleLinear().domain([min, max]).range(['#fdff93', '#2abb2a']);
    }

    greenHueColorCoder(min: number, max: number) {
        return d3.scaleSequential(d3Chromatic.interpolateGreens).domain([min, max]);
    }

    redHueColorCoder(min: number, max: number) {
        // return d3.scaleSequential(d3Chromatic.interpolateReds).domain([min, max]);
        return d3.scaleLinear().domain([min, max]).range(['white', 'red']);
    }

    redGreenColorCoder(min: number, max: number) {
        return d3.scaleLinear().domain([min, max]).range(['red', '#2abb2a']);
    }

    redGreenLightColorCoder(min: number, max: number) {
        return d3.scaleLinear().domain([min, min + (max - min) / 2, max]).range(['#f8b0b0', 'white', '#9ce39c']);
    }

    redGreenYellowColorCoder(min: number, max: number) {
        return d3.scaleLinear().domain([min, min + (max - min) / 2, max]).range(['#6ce56c', 'yellow', '#ff7c7c']);
    }


    getTransparentColorValue(rgbString: string): string {
        if (rgbString) {
            return `rgba(${rgbString.slice(4, rgbString.length - 1)}, 0.6)`;
        } else {
            return 'white';
        }
    }


    // Ag grid ---------------------------------------------------------------------------------------------
    
    deepCopy(sourceObj) {
        return JSON.parse(JSON.stringify(sourceObj));
    }

    gridValueUpdater(newData, oldData) {
        const newDataDict: {[id: string]: any} = {};
        newData.forEach(item => {
            newDataDict[item.Id] = item;
        });

        const updateRows = [];
        const removeRows = [];
        const addRows = [];

        const oldDataDict: {[id: string]: any} = {};

        oldData.forEach(item => {
            if (item) { // there is holes in the array, warn!!
                oldDataDict[item.Id] = item;
            }
        });

        // console.log('old data', oldData, Object.keys(oldDataDict).length);

        oldData.forEach(oldItem => {
            if (oldItem) { // there is holes in the array, warn!!
                if (newDataDict[oldItem.Id] !== undefined) {
                    // Object.keys(oldItem).forEach(key => {
                    //     oldItem[key] = newDataDict[oldItem.Id][key]
                    // })
                    updateRows.push(newDataDict[oldItem.Id]);
                } else {
                    removeRows.push(oldItem);
                }
            }
        });

        newData.forEach(newItem => {
            if (newItem) {
                if (oldDataDict[newItem.Id] === undefined) {
                    addRows.push(newItem);
                }
            }
        });

        return [updateRows, removeRows, addRows];
    }



    generalGridValueUpdater(newData, oldData, identifier) {
        const newDataDict: {[id: string]: any} = {};
        newData.forEach(item => {
            newDataDict[item[identifier]] = item;
        });

        const updateRows = [];
        const removeRows = [];
        const addRows = [];

        const oldDataDict: {[id: string]: any} = {};

        oldData.forEach(item => {
            if (item) { // there is holes in the array, warn!!
                oldDataDict[item[identifier]] = item;
            }
        });

        oldData.forEach(oldItem => {
            if (oldItem) { // there is holes in the array, warn!!
                if (newDataDict[oldItem[identifier]] !== undefined) {
                    updateRows.push(newDataDict[oldItem[identifier]]);
                } else {
                    removeRows.push(oldItem);
                }
            }
        });

        newData.forEach(newItem => {
            if (newItem) {
                if (oldDataDict[newItem[identifier]] === undefined) {
                    addRows.push(newItem);
                }
            }
        });

        return [updateRows, removeRows, addRows];
    }


    getRangesCellValues(ranges: RangeSelection[], gridApi): string[] {
        const api: GridApi = gridApi;
        let resultValueArray: string[] = [];
        for (let i = 0; i < ranges.length; i++) {
            resultValueArray = [...resultValueArray, ...singleRangeStatatistics(ranges[i])];
        }

        function singleRangeStatatistics(range: RangeSelection): string[] {
            const startRow = Math.min(range.start.rowIndex, range.end.rowIndex);
            const endRow = Math.max(range.start.rowIndex, range.end.rowIndex);

            const singeRangeValueCollection: string[] = [];

            for (let rowIndex = startRow; rowIndex <= endRow; rowIndex++) {
                range.columns.forEach(function(column) {
                    const rowModel = api.getModel();
                    const rowNode = rowModel.getRow(rowIndex);
                    const value = api.getValue(column, rowNode);
                    singeRangeValueCollection.push(value);
                });
            }
            return singeRangeValueCollection;
        }
        return resultValueArray;
    }

    getMultipleGridsRangesSelectionStatistics(rangeObjs: {gridApi: GridApi, ranges: CellRange[]}[]) {
        const multipleGridRangesStatistics = rangeObjs.map(obj => this.getRangesSelectionStatisticsAdvance(obj.ranges, obj.gridApi));
        const sumOverall = _.sumBy(multipleGridRangesStatistics, 'sum');
        const counterOverall = _.sumBy(multipleGridRangesStatistics, 'counter');
        const maxOverall = _.max(multipleGridRangesStatistics.map(element => element.max));
        const minOverall = _.min(multipleGridRangesStatistics.map(element => element.min));

        return {
            sum: sumOverall,
            counter: counterOverall,
            mean: sumOverall / counterOverall,
            min: minOverall,
            max: maxOverall,
        }
    }

    getRangesSelectionStatisticsAdvance(ranges: CellRange[], gridApi: GridApi) {
        const rangesStatistic = ranges.map(range => this.getSingleRangeStatistic(range, gridApi));
        const sumOverall = _.sumBy(rangesStatistic, 'sum');
        const counterOverall = _.sumBy(rangesStatistic, 'counter');
        const maxOverall = _.max(rangesStatistic.map(element => element.max));
        const minOverall = _.min(rangesStatistic.map(element => element.min));

        return {
            sum: sumOverall,
            counter: counterOverall,
            mean: sumOverall / counterOverall,
            min: minOverall,
            max: maxOverall,
        }
    }

    getSingleRangeStatistic(range: CellRange, gridApi: GridApi) {
        let min = Infinity;
        let max = -Infinity;
        let sum = 0;
        let counter = 0;
        const startRow = Math.min(range.startRow.rowIndex, range.endRow.rowIndex);
        const endRow = Math.max(range.startRow.rowIndex, range.endRow.rowIndex);
        for (let rowIndex = startRow; rowIndex <= endRow; rowIndex++) {
            range.columns.forEach(function(column) {
                const rowModel = gridApi.getModel();
                const rowNode = rowModel.getRow(rowIndex);
                const value = gridApi.getValue(column, rowNode);
                if (typeof value === 'number') {
                  sum += value;
                  counter++;
                  if (value < min) {
                      min = value;
                  }
                  if (value > max) {
                      max = value;
                  }
                }
            });
        }

        return {sum, counter, max, min};
    }

    getRowData(gridApi: GridApi) {
        const rowData = [];
        gridApi.forEachNode(function(node) {
          rowData.push(node.data);
        });
        return rowData;
    }

    decimalToTicks(input: number | null): string { 
        if (input === null || input === undefined)
            return null;

        if (Number.isNaN(input))
            return null;

        var result = '';
        const threshold = .0000001;

        if (input < 0) { 
            result = '-';
            input = Math.abs(input);
        }

        var input_int = Math.floor(input);
        var input_frac = Math.round((input - input_int) * 256);
        if (input_frac === 0) { 
            result = result + input_int.toFixed(0) + '-000';
        } else { 
            if (Math.abs(input_frac - 256) < threshold) { 
                result = result + (input_int + 1).toFixed(0) + '-000';
            } else { 
                result = result + input_int.toFixed(0) + '-';
                var frac_int = Math.floor(input_frac / 8.0);
                var frac_mod = input_frac % 8;
                var str_frac_mod = Math.floor(frac_mod).toFixed(0);
                if (Math.abs(frac_mod - 0) < threshold)
                    str_frac_mod = '0'
                else if (Math.abs(frac_mod - 4) < threshold)
                    str_frac_mod = '+'

                var str_frac = '';
                if (frac_int < 10) { 
                    str_frac = '0' + frac_int.toFixed(0) + str_frac_mod;
                } else { 
                    str_frac = frac_int.toFixed(0) + str_frac_mod;
                }

                result += str_frac;
            }
        }
        
        return result;
    }
}
