import { createAction } from "@ngrx/store";
import * as fromModels from '../../models';

export const addIdToActivePath = createAction('[Tree Navigation] Add catalogId to current path', (payload: number) => ({payload}));
export const overwriteActivePath = createAction('[Tree Navigation] Overwrite active path', (payload: number[]) => ({payload}));

export const addToConstructedHierarchy = createAction('[Tree Navigation] Add data to constructed hierarhcy', (payload: fromModels.TimeseriesNode[]) => ({payload}));
export const overwriteConstructedHierarchy = createAction('[Tree Navigation] Overwrite constructed hierarchy', (payload: fromModels.TimeseriesNode[][]) => ({payload}));