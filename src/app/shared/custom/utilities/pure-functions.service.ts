import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import * as moment from 'moment';


@Injectable()
export class PureFunctionsService {

    getFunctionFromString(input): any {
        if (input === 'date') {
            return this.dateFormatter;
        } else if (input === 'thousands') {
            return this.thousandsFormatter;
        } else if (input  === 'numbersWithCommas') {
            return this.numbersWithCommaFormatter;
        } else if (input === 'stringConcat') {
            return this.stringConcat;
        } else if (input === 'blank999s') {
            return this.blank999s;
        } else {
            return this.sameVal;
        }
    }

    /** Formatters **/

    sameVal(params): any {
        return params.value;
    }

    dateFormatter(params): string {
        if (params.value) {
            return moment(params.value).format('MM/DD/YYYY');
        } else {
            return params.value;
        }
    }

    thousandsFormatter(params): string {
        if (params.value) {
            const val = Number(params.value);
            if (isNaN(val)) {
                return params.value;
            } else {
                return (val / 1000.0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
        } else {
            return params.value;
        }
    }

    blank999s(params): string {
        if (params.value) {
            const val = Number(params.value);
            if (!isNaN(val)) {
                return -999 === val ? '' : val.toString();
            }
        }
        return params.value;
    }

    numbersWithCommaFormatter(params): string {
        if (params.value) {
            const val = Number(params.value);
            if (isNaN(val)) {
                return params.value;
            } else {
                return params.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            }
        } else {
            return params.value;
        }
    }

    /** Agg Functions **/
    stringConcat(params): string {
        if (params.value && params.value.length > 0) {
            return 'Multiple Values';
        } else {
            return params.value;
        }
    }
}

