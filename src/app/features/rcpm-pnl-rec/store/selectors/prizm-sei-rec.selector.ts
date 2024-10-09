import { createSelector } from '@ngrx/store';

import * as fromPnlRec from '../reducers/prizm-sei-rec.reducer';
import * as fromFeature from '../reducers';

export const getPrizmSEIPnlRecState = createSelector(
    fromFeature.getRCPMPnlRecState,
    (state: fromFeature.RCPMPnlRecState) => state.prizmSeiPnlRec
);

export const getPrizmSEIPnlFilesToUpload = createSelector(
    getPrizmSEIPnlRecState,
    fromPnlRec.getFilesToUpload
);

export const getPrizmSEIPnlFileUploadLoadingStatus = createSelector(
    getPrizmSEIPnlRecState,
    fromPnlRec.getFilesUploading
);

export const getPrizmSEIPnlFileUploadLoadedStatus = createSelector(
    getPrizmSEIPnlRecState,
    fromPnlRec.getFilesUploaded
);


export const getPrizmSEIPnlFileUploadErrorStatus = createSelector(
    getPrizmSEIPnlRecState,
    fromPnlRec.getFilesUploadError
);

export const getPrizmSEIPnlFunds = createSelector(
    getPrizmSEIPnlRecState,
    fromPnlRec.getFunds
);

export const getPrizmSEIPnl = createSelector(
    getPrizmSEIPnlRecState,
    fromPnlRec.getSEIPnl
);

export const getPrizmSEIFundListInDB = createSelector(
    getPrizmSEIPnlRecState,
    fromPnlRec.getFundListInDB
);

export const getPrizmSEIFundListInDBError = createSelector(
    getPrizmSEIPnlRecState,
    fromPnlRec.getFundListInDBError
);

export const getPrizmSEIFundReconciliation = createSelector(
    getPrizmSEIPnlRecState,
    fromPnlRec.getReconciliations
);

export const getPrizmSEIFundReconciliationLoading = createSelector(
    getPrizmSEIPnlRecState,
    fromPnlRec.getReconciliationsLoading
);

export const getPrizmSEIFundReconciliationLoaded = createSelector(
    getPrizmSEIPnlRecState,
    fromPnlRec.getReconciliationsLoaded
);

export const getPrizmSEIFundReconciliationError = createSelector(
    getPrizmSEIPnlRecState,
    fromPnlRec.getReconciliationsError
);

