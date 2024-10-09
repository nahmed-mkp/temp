import { createAction } from "@ngrx/store";
import * as fromModels from '../../models';

export const loadPnlAdjustments = createAction('[PnlAdjustments] Load PnlAdjustments');
export const loadPnlAdjustmentsComplete = createAction('[PnlAdjustments] Load PnlAdjustments Success', (res: fromModels.IPnlAdjustment[]) => ({res}));
export const loadPnlAdjustmentsFailed = createAction('[PnlAdjustments] Load PnlAdjustments Failure', (err: string) => ({err}));

export const changeStartDate = createAction('[PnlAdjustments] Change Start Date', (startDate: string) => ({startDate}));
export const changeEndDate = createAction('[PnlAdjustments] Change End Date', (endDate: string) => ({endDate}));

export const downloadAdjustmentAttachments = createAction('[PnlAdjustments] Download adjustment attachments', (payload: fromModels.IDownloadAdjustmentAttachments) => ({payload}));

export const uploadAdjustmentAttachmentsComplete = createAction('[PnlAdjustments] Upload adjustment attachments success', (res: any) => ({res}));
export const uploadAdjustmentAttachmentsFailed = createAction('[PnlAdjustments] Upload adjustment attachments failure', (err: string) => ({err}));