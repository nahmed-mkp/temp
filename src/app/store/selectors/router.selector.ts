import { createSelector } from '@ngrx/store';

import * as fromModels from '../../models';

import * as fromFeature from '../reducers';
import * as fromLogin from '../reducers/login.reducer';

/**
 * Router Selector
 */
export const getAuthenticatedUser = createSelector(
    fromFeature.getAuthState,
    fromLogin.getAuthenticatedUser
);

export const getAuthenticationError = createSelector(
    fromFeature.getAuthState,
    fromLogin.getAuthError
);

export const isFreshLogin = createSelector(
    fromFeature.getAuthState,
    fromLogin.isFreshLogin
);
