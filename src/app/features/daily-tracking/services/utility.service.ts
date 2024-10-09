import { Injectable } from '@angular/core';
import { ValueGetterParams, ValueFormatterParams} from 'ag-grid-community';

@Injectable()
export class DailyTrackingUtilityService {

    formatNumberStrict(digit) {
        return (params: ValueGetterParams) => {
            if (params.data) {
                if (params.data[params.colDef.field] === '') {
                    return null;
                } else {
                    const result = params.data && params.data[params.colDef.field] !== null && params.data[params.colDef.field] !== undefined && params.data[params.colDef.field].toFixed(digit);
                    return result;
                }
            }
        };
    }

    formatNumberStrictWithBrackets(digit) {
        return (params: ValueGetterParams) => {
            if (params.data) {
                if (params.data[params.colDef.field] === '') {
                    return null;
                } else {
                    const result = params.data && params.data[params.colDef.field] !== null && params.data[params.colDef.field] !== undefined && params.data[params.colDef.field].toFixed(digit);
                    return result.startsWith('-') ? `${result.replace('-', '(') + ')'}` : result;
                }
            }
        };
    }

    formatNumber(digit) {
        return (params: ValueGetterParams) => {
            if (params.data[params.colDef.field] === '') {
                return null;
            } else {
                const result = params.data && params.data[params.colDef.field] !== null && params.data[params.colDef.field] !== undefined && params.data[params.colDef.field].toFixed(digit);
                if (result) {
                    return parseFloat(result);
                }
            }
        };
    }

    numberWithCommas(params: ValueFormatterParams): string {
        if (params.value !== undefined && params.value !== null) {
            return params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    }

    formatPercentNumber(digit) {
        return (params: ValueGetterParams) => {
            return params.data && params.data[params.colDef.field] !== null && params.data[params.colDef.field] !== undefined && (params.data[params.colDef.field] * 100).toFixed(digit) + '%';
        };
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

    deepCopy(sourceObj) {
        return JSON.parse(JSON.stringify(sourceObj));
    }


    isCompactMode(): boolean {
        return window.location.href.includes('compact');
    }
}
