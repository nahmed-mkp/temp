import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromModel from '../../models';
import * as fromEuroRates from '../reducers/euro-rates.reducers';

const getEuroRateState = createSelector(
    fromFeature.getEuroRatesState,
    (state: fromFeature.EuroRateState) => state.euroRates
)

export const getFileOrder = createSelector(
    getEuroRateState,
    fromEuroRates.getFileOrder,
)

export const getFileDownloadProgress = createSelector(
    getEuroRateState,
    fromEuroRates.getFileDownloadProgress
)


export const getEuroRatesFileList = createSelector(
    getEuroRateState,
    fromEuroRates.getEuroRatesFileList
);

export const getEuroRatesFileEntities = createSelector(
    getEuroRateState,
    fromEuroRates.getEuroRatesFileEntities
);

export const getEuroRatesFileWithSortedOrder = createSelector(
    getFileOrder,
    getEuroRatesFileEntities,
    (fileOrder, fileEntities) => {
        let result: {
            'avaliable-file':  fromModel.EuroRateFile[],
            'download-file': fromModel.EuroRateFile[],
        } = {
            'avaliable-file':  [],
            'download-file': [],
        }
        if(fileOrder) {
            if(fileOrder["avaliable-file"] && fileOrder["avaliable-file"].length > 0) {
                fileOrder["avaliable-file"].forEach(id => {
                    if(fileEntities[id]) result["avaliable-file"].push(fileEntities[id])
                })
            }
            if(fileOrder["download-file"] && fileOrder["download-file"].length > 0) {
                fileOrder["download-file"].forEach(id => {
                    if(fileEntities[id]) result["download-file"].push(fileEntities[id])
                })
            }
        } else {
            Object.keys(fileEntities).forEach(id => {
                if(fileEntities[id].queueId === null || fileEntities[id].status === 'Finished') {
                    result["avaliable-file"].push(fileEntities[id])
                } else {
                    result["download-file"].push(fileEntities[id])
                }
            })
        }
        return result;
    }
);

export const getEuroRatesFileWithSortedOrderAndDownloadProgress = createSelector(
    getEuroRatesFileWithSortedOrder,
    getFileDownloadProgress,
    (files, progresses) => {
        files["avaliable-file"].forEach(file => file.progress = "pending")
        if(progresses && progresses.length === 0 || progresses === null) {
            files["download-file"].forEach(file => file.progress = "pending")
        } else {
            files["download-file"].forEach(file => {
                let targetProgress = progresses.filter(progress => progress.requestId === file.id);
                if(targetProgress.length>0) {
                    file.progress = Math.round((targetProgress[0].successCount/targetProgress[0].totalCount)*100);
                    file.status = targetProgress[0].queueStatus
                }
            })
        }
        return files;
    }
)



export const getEuroRatesFileListWithDownloadProgress = createSelector(
    getEuroRatesFileList,
    getFileDownloadProgress,
    (files, progresses) => {
        console.log('file change in selector', files, progresses);
        if(progresses && progresses.length === 0 || progresses === null) {
            files.forEach(file => file.progress = "pending")
        } else {
            files.forEach(file => {
                let targetProgress = progresses.filter(progress => progress.requestId === file.id);
                if(targetProgress.length>0) {
                    file.progress = Math.round((targetProgress[0].successCount/targetProgress[0].totalCount)*100);
                    file.status = targetProgress[0].queueStatus
                }
            })
        }
        return [...files];
    }
)

export const getloadingEuroRatesFileListStatus = createSelector(
    getEuroRateState,
    fromEuroRates.getloadingEuroRatesFileList
);

export const getloadedEuroRatesFileListStatus = createSelector(
    getEuroRateState,
    fromEuroRates.getloadedEuroRatesFileList
)

export const getloadEuroRatesFileListError = createSelector(
    getEuroRateState,
    fromEuroRates.getloadEuroRatesFileListError
);




export const getDownloadingEuroRatesFiles = createSelector(
    getEuroRateState,
    fromEuroRates.getDownloadingEuroRatesFiles
)

export const getDownloadedEuroRatesFiles = createSelector(
    getEuroRateState,
    fromEuroRates.getDownloadedEuroRatesFiles
)

export const getDownloadEuroRateFilesError = createSelector(
    getEuroRateState,
    fromEuroRates.getDownloadEuroRateFilesError
)





export const getUnqueuingDownloadingFileStatus = createSelector(
    getEuroRateState,
    fromEuroRates.getUnqueuingDownloadingFile
);

export const getUnqueuedDownloadingFileStatus = createSelector(
    getEuroRateState,
    fromEuroRates.getUnqueuedDownloadingFile
);

export const getUnqueueDownloadingFileError = createSelector(
    getEuroRateState,
    fromEuroRates.getUnqueueDownloadingFileError
);









// export const getEuroRateRealTimeConnection = createSelector(
//     getEuroRateState,
//     fromEuroRates.getEuroRateRealTimeConnection
// );

// export const getEuroRateFileDownloadProgress = createSelector(
//     getEuroRateState,
//     fromEuroRates.getEuroRateFileDownloadProgress
// );

// export const getEuroRateGeneralEventUpdate = createSelector(
//     getEuroRateState,
//     fromEuroRates.getEuroRateGeneralEventUpdate
// );

// export const getEuroRateFileOrder = createSelector(
//     getEuroRateState,
//     fromEuroRates.getEuroRateFileOrder
// )