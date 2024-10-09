import * as fromModels from './../../models';
import * as fromRouter from '@ngrx/router-store';

import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

export const getRouterState = (state: RouterReducerState<fromModels.RouterStateUrl>) => state.state;

export class CustomSerializer implements fromRouter.RouterStateSerializer<fromModels.RouterStateUrl> {

    serialize(routerState: RouterStateSnapshot): fromModels.RouterStateUrl {
        const { url } = routerState;
        const { queryParams } = routerState.root;

        let state: ActivatedRouteSnapshot = routerState.root;
        while (state.firstChild) {
            state = state.firstChild;
        }

        const { params } = state;

        return { url, queryParams, params };

    }
}
