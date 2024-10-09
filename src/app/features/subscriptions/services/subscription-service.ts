import { Injectable } from '@angular/core';
import { EMPTY, } from 'rxjs';
import * as fromModels from './../models/subscription.models';


@Injectable()
export class SubscriptionService {

    constructor() {
    }

    public subscribeToPositions(payload: fromModels.IPositionSubscriptionRequest): any {
        // tslint:disable-next-line: deprecation
        return EMPTY;
    }
}
