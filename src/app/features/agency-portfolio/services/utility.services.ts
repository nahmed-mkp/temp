import { Injectable } from '@angular/core';
import { ValueGetterParams, ValueFormatterParams, RangeSelectionChangedEvent, RangeSelection, ColDef, CellRange, GridApi } from 'ag-grid-community';
import { BasicGridColumn } from '../models';
import * as _ from 'lodash';

@Injectable()
export class AgencyUtilityService {
    formatNumber(digit) {
        return (params: ValueGetterParams) => {
            // console.log('params.data[params.colDef.field]', params.colDef.field, params.data[params.colDef.field], params.node.rowIndex)
            const result = params.data && params.data[params.colDef.field] !== null && params.data[params.colDef.field] !== undefined && params.data[params.colDef.field].toFixed(digit);
            if (result) {
                return parseFloat(result);
            }
        };
    }

    formatNumberWithNestedField(digit) {
        return (params: ValueGetterParams) => {
            const fields = params.colDef.field.split('.');  // for two level deep nested value
            const targetValue = params.data && params.data[fields[0]] &&  params.data[fields[0]][fields[1]];
            const result = targetValue !== null && targetValue !== undefined && targetValue.toFixed(digit);
            if (result) {
                return parseFloat(result);
            }
        };
    }

    formatPercentNumber(digit) {
        return (params: ValueGetterParams) => {
            return params.data && params.data[params.colDef.field] !== null && params.data[params.colDef.field] !== undefined && (params.data[params.colDef.field] * 100).toFixed(digit) + '%';
        };
    }

    formatDate(params: ValueFormatterParams): string {
        if (params.value !== undefined &&  params.value !== null) {
            return (new Date(params.value)).toLocaleDateString();
        }
    }

    numberWithCommas(params: ValueFormatterParams): string {
        if (params.value !== undefined && params.value !== null) {
            return params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    }

    formatNumberWithCommas(value): string {
        if (value !== undefined && value !== null) {
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
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

    getRangesSelectionStatistics(event: RangeSelectionChangedEvent) {

        const api = event.api;
        const ranges = api.getRangeSelections();
        
        if (ranges === undefined || ranges === null) {
            return {sum: undefined, mean: undefined, min: undefined, max: undefined};
        }

        let sumOverall = 0;
        let countOverall = 0;
        let min = Infinity;
        let max = -Infinity;
        for (let i = 0; i < ranges.length; i++) {
            const {sum, counter} = singleRangeStatatistics(ranges[i]);
            sumOverall += sum;
            countOverall += counter;
        }

        function singleRangeStatatistics(range: RangeSelection) {
            const startRow = Math.min(range.start.rowIndex, range.end.rowIndex);
            const endRow = Math.max(range.start.rowIndex, range.end.rowIndex);
            let sum = 0;
            let counter = 0;
            for (let rowIndex = startRow; rowIndex <= endRow; rowIndex++) {
                range.columns.forEach(function(column) {
                    const rowModel = api.getModel();
                    const rowNode = rowModel.getRow(rowIndex);
                    const value = api.getValue(column, rowNode);
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
            return {sum, counter};
        }

        return {sum: sumOverall, mean: sumOverall / countOverall, min, max};
    }



    deepCopy(sourceObj) {
        return JSON.parse(JSON.stringify(sourceObj));
    }

    formatRollsData(data: any) {
        // const formatedData: any = {};
        // data.forEach(element => {
        //     if (formatedData[element.Benchmark] === undefined) {
        //         formatedData[element.Benchmark] = {};
        //     }
        //     if (formatedData[element.Benchmark][element.SecType] === undefined) {
        //         formatedData[element.Benchmark][element.SecType] = {};
        //     }
        //     formatedData[element.Benchmark][element.SecType][element.Mon] = element.Notional;
        // });
        // console.log('formatted data result', formatedData);


        const groupData = _.groupBy(data, 'Benchmark');
        Object.keys(groupData).forEach(benchmark => {
            groupData[benchmark] = _.groupBy(groupData[benchmark], 'Tradename');

            Object.keys(groupData[benchmark]).forEach(tradename => {
               const mergeData = {Benchmark: benchmark, Tradename: tradename, Id: benchmark + tradename};
               groupData[benchmark][tradename].forEach(item => {
                   if (mergeData[item.SecType] === undefined) {
                       mergeData[item.SecType] = {};
                   }
                   mergeData[item.SecType][item.Mon] = item.Notional;
               });
               groupData[benchmark][tradename] = mergeData;
            });
        });

        const formattedData =  _.flatMap(groupData).reduce((collection, tradeNameCollection) => {
            const flattenArray =  _.flatMap(tradeNameCollection);
            return [...collection, ...flattenArray];
        }, []);

        return formattedData;

        // return Object.keys(formatedData).map(key => {
        //     return Object.assign({}, formatedData[key], {BenchMark: key, Id: key});
        // });
    }

    getRollsDynamicColumnsDef(data: any): BasicGridColumn[] {
        const formattedColsDef: BasicGridColumn[] = [];
        const TBAColumnCollection: any = {};
        const ITMColumnCollection: any = {};
        data.forEach(element => {
            if (element.SecType === 'TBA') {
                TBAColumnCollection[element.Mon] = element.MonNum;
            } else {
                ITMColumnCollection[element.Mon] = element.MonNum;
            }
        });

        formattedColsDef.push({name: 'Benchmark', type: 'string', filter: 'agSetColumnFilter', sort: 'asc', rowGroup: true, hide: true});
        formattedColsDef.push({name: 'Tradename', type: 'string', filter: 'agSetColumnFilter', sort: 'asc', rowGroup: true});


        formattedColsDef.push({
            name: 'TBA Net of ITM Options',
            cellClass: 'right-border',
            children: Object.keys(TBAColumnCollection)
                .sort((keyA, keyB) => parseInt(TBAColumnCollection[keyA]) - parseInt(TBAColumnCollection[keyB]))
                .map((key, index) => {
                const result: any = {headerName: key, field: `Net.${key}`, valueGetter: this.formatNumberWithNestedField(2), valueFormatter: this.numberWithCommas, aggFunc: 'sum'};
                if (index === 0) {
                    result.cellClass = 'left-border';
                }
                return result;
            })
        });

        formattedColsDef.push({
            name: 'Expiring ITM',
            children: Object.keys(ITMColumnCollection)
                .sort((keyA, keyB) => parseInt(ITMColumnCollection[keyA]) - parseInt(ITMColumnCollection[keyB]))
                .map((key, index) => {
                const result: any = {headerName: key, field: `ITM Expiring Option.${key}`, valueGetter: this.formatNumberWithNestedField(2), valueFormatter: this.numberWithCommas, aggFunc: 'sum'};
                if (index === 0) {
                    result.cellClass = 'left-border';
                }
                return result;
            })
        });

        formattedColsDef.push({
            name: 'TBA',
            children: Object.keys(TBAColumnCollection)
                .sort((keyA, keyB) => parseInt(TBAColumnCollection[keyA]) - parseInt(TBAColumnCollection[keyB]))
                .map((key, index) => {
                const result: any = {headerName: key, field: `TBA.${key}`, valueGetter: this.formatNumberWithNestedField(2), valueFormatter: this.numberWithCommas, aggFunc: 'sum'};
                if (index === 0) {
                    result.cellClass = 'left-border';
                }
                return result;
            })
        });

        return formattedColsDef;
    }
}
