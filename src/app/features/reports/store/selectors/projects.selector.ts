import { createSelector } from '@ngrx/store';

import * as fromModels from '../../models';

import * as fromRouting from '../../../../store/reducers';
import * as fromFeature from '../reducers';
import * as fromProjects from '../reducers/projects.reducer';

/**
 * Projects Parsers
 */
export const getProjectsState = createSelector(
  fromFeature.getExternalReportsState,
  (state: fromFeature.ExternalReportsState) => state.projects
);

export const getProjectIds = createSelector(
    getProjectsState,
    fromProjects.getIds
);

export const getProjectEntities = createSelector(
    getProjectsState,
    fromProjects.getEntities
);

export const getProjectLoadingStatus = createSelector(
    getProjectsState,
    fromProjects.getLoadingStatus
);

export const getProjectLoadedStatus = createSelector(
    getProjectsState,
    fromProjects.getLoadedStatus
);

export const getProjectError = createSelector(
    getProjectsState,
    fromProjects.getError
);

export const getProjectUpdateStatus = createSelector(
    getProjectsState,
    fromProjects.getUpdateStatus
);

export const getProjects = createSelector(
    getProjectEntities,
    getProjectIds,
    (entities, ids) => {
        return ids.map(id => entities[id]);
    }
);

export const getSelectedProject = createSelector(
    getProjects,
    fromRouting.getRouteState,
    (projects, router): fromModels.Project => {
        if (router.state) {
            return projects.filter(project => project.shortCode === router.state.params.projectShortCode)[0];
        } else {
            return null;
        }

    }
);
