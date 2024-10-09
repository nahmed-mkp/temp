export interface Project {
    id: number;
    name: string;
    description: string;
    shortCode: string;

    editable: boolean;
    favorited: boolean;

    numFavorited: number;
    numWorkbooks: number;
    numReports: number;
    numViews: number;

    projectUrl: string; // for PUT, DELETE
    projectsUrl: string; // for GET, POST
    workbooksUrl: string;

    favoritesUrl: string;
}

export interface Workbook {
    id: number;
    name: string;
    description: string;
    shortCode: string;
    projectId: number;
    projectShortCode: string;

    editable: boolean;
    favorited: boolean;

    numFavorited: number;
    numReports: number;
    numViews: number;

    workbookUrl: string; // for PUT, DELETE
    workbooksUrl: string; // for GET, POST
    reportsUrl: string;
    viewCountUrl: string; // for managing #times report gets viewed

    favoritesUrl: string;
}

export interface Report {
    id: number;
    name: string;
    description: string;
    shortCode: string;
    type: string;
    tags: string[];

    editable: boolean;
    favorited: boolean;

    numFavorited: number;
    numViews: number;
    isUserSpecific: boolean;

    url: string;
    height: string;

    workbookId: number;
    workbookShortCode: string;

    reportUrl: string;
    reportsUrl: string;
    workbookUrl: string;

    favoritesUrl: string;
    viewCountUrl: string;
}
