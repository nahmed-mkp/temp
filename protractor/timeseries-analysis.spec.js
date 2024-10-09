// import { browser, element, by } from "protractor";

// Npm start the project before running the test
 //(set env variable prizm_map_username and prizm_map_password with your own credential before running the test)

describe('Timeseries analysis testing: ', function() {

    //Authentication
    const loginUserNameInput = element(by.css('.test-username'));
    const loginUserPasswordInput = element(by.css('.test-password'));
    const loginButton = element(by.css('mat-card-actions button'));
    const logoutButton = element(by.css('.test-logout'));
    const userName = 'mkprisk@mkpcap.com';
    const password = "Manifold1mk";

    //Navigation
    const navMenuToggle = $('.test-sidenav-toggle');
    const timeseriesAnalysisNavButton = element(by.css('.test-timeseries-analysis-nav'));
    
    const rawDataViewTabLabel = element(by.css('.test-timeseries-analysis-result-viewer .mat-tab-label-container .mat-tab-labels .mat-tab-label:nth-child(1)'));
    const rawDataPlotViewTabLabel = element(by.css('.test-timeseries-analysis-result-viewer .mat-tab-label-container .mat-tab-labels .mat-tab-label:nth-child(2)'));
    const eventPlotViewTabLabel = element(by.css('.test-timeseries-analysis-result-viewer .mat-tab-label-container .mat-tab-labels .mat-tab-label:nth-child(3)'));
    const eventStatisticsTabLabel = element(by.css('.test-timeseries-analysis-result-viewer .mat-tab-label-container .mat-tab-labels .mat-tab-label:nth-child(4)'));

    //Timeseries Analysis Feature Test Component
    const timeseriesAnalysisLayout = element(by.css('app-event-analysis-layout'));
    const portfolioPoolLayout = element(by.css('app-pool-layout'));
    const timeseriesAnalysisResultViewer = element(by.css('.test-timeseries-analysis-result-viewer'));
    const timeseriesAnalysisFormulaSetting = element(by.css('app-event-analysis-formula-timeseries-setting'));
    const timeseriesAnalysisConfiguration = element(by.css('app-event-analysis-configuration-panel'));

    const rawDataViewerInstruction = element(by.css('app-event-analysis-rawdata-viewer .instruction h4'));
    const formulaSettingInstruction = element(by.css('app-event-analysis-formula-timeseries-setting .instruction h4'));
    const configurationInstruction = element(by.css('app-event-analysis-configuration-panel .instruction h4'));

    const analysisRecordButton = element(by.css('app-event-analysis-configuration-panel .test-analysis-record-button'));
    const analysisRecordViewer = element(by.css('app-event-analysis-archive-records-viewer'));
    const analysisRecordSearch = element(by.css('.test-analysis-record-search'));
    const analysisRecordItem = element(by.css('app-event-analysis-archive-records-viewer ag-grid-angular .ag-row .ag-cell:first-child'));
    const AnalysisPlayButton = element(by.css('app-event-analysis-archive-records-viewer .test-load-analysis-button'));

    const generalSettingSection = element(by.css('app-event-analysis-configuration-panel .test-timeseries-analysis-general-setting .mat-expansion-panel-body'));
    const eventSettingSection = element(by.css('app-event-analysis-configuration-panel .test-timeseries-analysis-event-setting .mat-expansion-panel-body'))

    const sampleTestConfigurationGUID = '0c2c4300-99d2-11e9-82fa-8773f1b77c80';
    const timeseriesAnalysisPlotViewer = element(by.css('app-event-analysis-plot-viewer'));
    const timeseriesAnalysisPlotViewerHighChart = element(by.css('app-event-analysis-plot-viewer highcharts-chart'));

    const timeseriesAnalysisRawDataViewer = element(by.css('app-event-analysis-rawdata-viewer'));
    const timeseriesAnalysisRawDataViewerGrid = element(by.css('app-event-analysis-rawdata-viewer app-base-grid'));

    const timeseriesAnalysisEventPlotViewer = element(by.css('app-event-analysis-event-plot-viewer'));
    const timeseriesAnalysisEventPlotViewerHighChart = element(by.css('app-event-analysis-event-plot-viewer highcharts-chart'));

    const timeseriesAnalysisEventStatisticsViewer = element(by.css('app-event-analysis-statistic-viewer'));
    const timeseriesAnalysisEventStatisticsViewerGrid = element(by.css('app-event-analysis-statistic-viewer app-base-grid'))
 
     

    beforeAll(() => {
        browser.get('http://localhost:4205/app');
        loginUserNameInput.sendKeys(userName);
        loginUserPasswordInput.sendKeys(password);
        loginButton.click();
    })

    //Basic Workflow Test -------------------------------------------------------
    
    it('It should land on the timeseries analysis page', () => {
        navMenuToggle.click().then(() => {
            timeseriesAnalysisNavButton.click();
            expect(timeseriesAnalysisLayout.isPresent()).toBeTruthy();
            expect(timeseriesAnalysisLayout.isPresent()).not.toBeFalsy();
            expect(portfolioPoolLayout.isPresent()).toBeFalsy();
        });
    });

    it('The inner major components of timeseries analysis should be present', () => {
        expect(timeseriesAnalysisResultViewer.isPresent()).toBeTruthy();
        expect(timeseriesAnalysisFormulaSetting.isPresent()).toBeTruthy();
        expect(timeseriesAnalysisConfiguration.isPresent()).toBeTruthy();
    });

    it('It should start from stratch (land on raw data viewer), all component should be empty or contain instruction', () => {
        expect(timeseriesAnalysisRawDataViewer.isPresent()).toBeTruthy();

        expect(rawDataViewerInstruction.getText()).toContain('Instruction');
        expect(formulaSettingInstruction.getText()).toContain('No Data to Show');
        expect(configurationInstruction.getText()).toContain('Instruction');
    })




    
    // Timeseries Analysis Workflow 1: load existing configuration

    it('User can open timeseries analysis record pop up', () => {
        expect(analysisRecordButton.isPresent()).toBeTruthy();
        analysisRecordButton.click();
        expect(analysisRecordViewer.isPresent()).toBeTruthy();
    });

    it('User can search the protractor test configuration record', () => {
        expect(analysisRecordSearch.isPresent()).toBeTruthy();
        analysisRecordSearch.sendKeys('protractor work flow test');
        expect(analysisRecordItem.isPresent()).toBeTruthy();
    });

    it('User can select the targeted test record and replay the analysis', () => {
        analysisRecordItem.click();
        expect(AnalysisPlayButton.isPresent()).toBeTruthy();
        AnalysisPlayButton.click();
    });

    it(`When the test configuration record is loaded: url should changed and 
        include configuration ID that match the existed value`, () => {
        expect(browser.getCurrentUrl()).toContain(`?configuration=${sampleTestConfigurationGUID}`);
    });

    it('When the test configuration record is loaded, analysis record pop up should be closed', () => {
        expect(analysisRecordViewer.isPresent()).toBeFalsy();
    });

    it(`When the test configuration record first loaded, the active tab should be plot (including url)
        it should render the plot data`, () => {
        expect(browser.getCurrentUrl()).toContain('activeTab=plot');
        expect(timeseriesAnalysisRawDataViewer.isPresent()).toBeFalsy();
        expect(timeseriesAnalysisPlotViewer.isPresent()).toBeTruthy();
        expect(timeseriesAnalysisPlotViewerHighChart.isPresent()).toBeTruthy();
    });

    it('User can switch to raw data tap and view the result, active tab will change accordingly', () => {
        expect(rawDataViewTabLabel.isPresent()).toBeTruthy();
        rawDataViewTabLabel.click();
        expect(timeseriesAnalysisRawDataViewerGrid.isPresent()).toBeTruthy();

        const currentUrl = browser.getCurrentUrl();
        expect(currentUrl).toContain(`?configuration=${sampleTestConfigurationGUID}&activeTab=raw%20data`);
    });

    it('When viewing raw data result, the general setting should expand under configuration pannel', () => {
        expect(generalSettingSection.isDisplayed()).toBeTruthy();
        expect(eventSettingSection.isDisplayed()).toBeFalsy();
    });

    it('User can switch to event analysis plot tap and view the result, active tab will change accordingly', () => {
        expect(eventPlotViewTabLabel.isPresent()).toBeTruthy();
        eventPlotViewTabLabel.click();
        expect(timeseriesAnalysisEventPlotViewer.isPresent()).toBeTruthy();
        expect(timeseriesAnalysisEventPlotViewerHighChart.isPresent()).toBeTruthy();

        const currentUrl = browser.getCurrentUrl();
        expect(currentUrl).toContain(`?configuration=${sampleTestConfigurationGUID}&activeTab=event%20analysis`);
    });

    it('When viewing event plot result, the event setting should expand under configuration pannel', () => {
        expect(generalSettingSection.isDisplayed()).toBeFalsy();
        expect(eventSettingSection.isDisplayed()).toBeTruthy();
    });

    it('User can switch to event statistic grid tap and view the result, active tab will change accordingly', () => {
        expect(eventStatisticsTabLabel.isPresent()).toBeTruthy();
        eventStatisticsTabLabel.click();
        expect(timeseriesAnalysisEventStatisticsViewer.isPresent()).toBeTruthy();
        expect(timeseriesAnalysisEventStatisticsViewerGrid.isPresent()).toBeTruthy();

        const currentUrl = browser.getCurrentUrl();
        expect(currentUrl).toContain(`?configuration=${sampleTestConfigurationGUID}&activeTab=event%20statistics`);
    });
    
    it('When viewing event statistic result, the event setting should expand under configuration pannel', () => {
        expect(generalSettingSection.isDisplayed()).toBeFalsy();
        expect(eventSettingSection.isDisplayed()).toBeTruthy();
    });


    afterAll(() => {
        browser.sleep(1000).then(()=> {
            logoutButton.click();
            browser.close()
        })
    })
})