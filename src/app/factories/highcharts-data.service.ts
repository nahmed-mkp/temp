import { Injectable } from '@angular/core';

import * as moment from 'moment';
import * as d3 from 'd3-dsv';

@Injectable()
export class HighchartsDataService {

    public csvToObjectArrayNoDate(data: string, strColumns: string[]): any[] {
        const result = [];
        const strColumnsLower = strColumns.map((x) => x.toLowerCase());
        d3.csvParse(data, (row: d3.DSVRowString, idx: number, columns: string[]) => {
            const obj = {};
            if (idx > 0) {
                columns.map((column: string) => {
                    if (strColumnsLower.indexOf(column.toLowerCase()) >= 0) {
                        obj[column] = row[column];
                    } else {
                        obj[column] = parseFloat(row[column]);
                    }
                });
                result.push(obj);
            }
            return [];
        });
        return result;
    }

    /**
    * This function is used to normalize a csv string.
    *
    * @param data - data is a csv string
    * @param dateColumn - name of the column that represents a date
    */
    public csvToObjectArrayFromTypes(data: string, colTypes: any): any[] {
        const result = [];
        d3.csvParse(data, (row: d3.DSVRowString, idx: number, columns: string[]) => {
            const obj = {};
            if (idx >= 0) {
                columns.map((column: string) => {
                    if (colTypes[column] !== undefined) {
                        const colType = colTypes[column];
                        switch (colType) {
                            case 'date':
                                obj[column] = this.getTimezoneUnawareDate(row[column]).getDate();
                                break;
                            case 'datetime':
                                obj[column] = this.getTimezoneUnawareDate(row[column]).getTime();
                                break;
                            case 'int':
                                obj[column] = parseInt(row[column], 10);
                                break;
                            case 'number':
                            case 'float':
                                obj[column] = parseFloat(row[column]);
                                break;
                            default:
                                obj[column] = row[column];
                        }
                    }
                });
                result.push(obj);
            }
            return [];
        });
        return result;
    }

    /**
     * This function is used to normalize a csv string.
     *
     * @param data - data is a csv string
     * @param dateColumn - name of the column that represents a date
     */
    public csvToIntradayTimeseries(data: string, timeseriesColumn: string): any[] {
        const result = [];
        d3.csvParse(data, (row: d3.DSVRowString, idx: number, columns: string[]) => {
            const obj = {};
            if (idx >= 0) {
                columns.map((column: string) => {
                    if (column.toLowerCase() === timeseriesColumn.toLowerCase()) {
                        obj[timeseriesColumn] = this.getTimezoneUnawareDateFromTimestamp(row[timeseriesColumn]).getTime();
                    } else {
                        obj[column] = parseFloat(row[column]);
                    }
                });
                result.push(obj);
            }
            return [];
        });
        return result;
    }

    /**
     * This function is used to normalize a csv string.
     *
     * @param data - data is a csv string
     * @param dateColumn - name of the column that represents a date
     */
    public csvToObjectArray(data: string, dateColumn: string): any[] {
        const result = [];
        d3.csvParse(data, (row: d3.DSVRowString, idx: number, columns: string[]) => {
            const obj = {};
            if (idx >= 0) {
                columns.map((column: string) => {
                    if (column.toLowerCase() === dateColumn.toLowerCase()) {
                        obj[dateColumn] = this.getTimezoneUnawareDate(row[dateColumn]).getTime();
                    } else {
                        obj[column] = parseFloat(row[column]);
                    }
                });
                result.push(obj);
            }
            return [];
        });
        return result;
    }

    /**
     * This function is used to normalize a csv string.
     *
     * @param data - data is a csv string
     * @param dateColumn - name of the column that represents a date
     */
    public normalizeCSVData(data: string, dateColumn: string): any[] {
        const result = [];
        const series = [];
        const values = {};
        d3.csvParse(data, (row: d3.DSVRowString, idx: number, columns: string[]) => {
            if (idx === 0) {
                columns.map((column: string) => {
                    if (column.toLowerCase() !== dateColumn.toLowerCase()) {
                        series.push(column);
                        values[column] = {name: column, data: []};
                        result.push(values[column]);
                    }
                });
            }
            series.map((key) => {
                values[key].data.push([this.getTimezoneUnawareDate(row[dateColumn]).getTime(), parseFloat(row[key])]);
            });
            return [];
        });
        return this.standardizeChartColors(result);
    }

    /**
     * This function is used to normalize a timeseries array object that is represented as an object of date and series values for each of
     * the dates.
     *
     * @param data - data is a collection of json objects that contain a property that represents a timestamp.
     * The rest of the properties of the object refer to the individual timeseries. This object would represent a row of a timeseries table
     * where each column is a series. For example:
     *
     * An input timeseries looks like this -
     * [{
     *  "date": "2018-01-21",
     *  "series1": 1.5,
     *  "series2": 1.8,
     *  "series3": 2.0
     * }, ...]
     *
     * The output looks like this -
     * [{
     *  "name": "series1",
     *  "data": [["2018-01-21", 1.5], [...]]
     * }, {
     *  "name": "series2",
     *  "data": [["2018-01-21", 2.0], [...]]
     * }]
     */
    public normalizeData(data: any[], dateColumn: string, sort: string = 'asc'): any[] {
        const result = [];
        const series = [];
        const values = {};
        let sortedData = [];

        sortedData = data.sort((a, b) => {
            return a[dateColumn] >= b[dateColumn] ? 1 : -1;
        });

        sortedData.map((row) => {
            // Get all the series
            Object.keys(row)
                .filter((key) => key.toLowerCase() !== dateColumn.toLowerCase())
                .map((filteredKey) => {
                    if (series.indexOf(filteredKey) < 0) {
                        series.push(filteredKey);
                        values[filteredKey] = {name: filteredKey, data: []};
                        result.push(values[filteredKey]);
                    }
                });

            // Get all the data
            series.map((key) => {
                values[key].data.push([this.getTimezoneUnawareDate(row[dateColumn]).getTime(), parseFloat(row[key])]);
            });

        });

        return this.standardizeChartColors(result);
    }

    public standardizeChartColors(input: any[]): any[] {
        return input;
    }

    private getTimezoneUnawareDate(date: string): Date {
        const dateValue = new Date(date);
        const dateWithNoTimezone = new Date(
            dateValue.getUTCFullYear(),
            dateValue.getUTCMonth(),
            dateValue.getUTCDate(),
            dateValue.getUTCHours(),
            dateValue.getUTCMinutes(),
            dateValue.getUTCSeconds()
          );
        return dateWithNoTimezone;
    }

    private getTimezoneUnawareDateFromTimestamp(timestamp: string): Date {
        const today = new Date().toLocaleDateString().split(' ')[0];
        const dateString = `${today} ${timestamp}`;
        const dateValue = new Date(dateString);
        const dateWithNoTimezone = new Date(
            dateValue.getFullYear(),
            dateValue.getMonth(),
            dateValue.getDate(),
            dateValue.getHours(),
            dateValue.getMinutes(),
            dateValue.getSeconds()
        );
        return dateWithNoTimezone;
    }

}
