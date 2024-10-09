exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: [
        // './protractor/demo-test1.spec.js',
        // './protractor/demo-test2.spec.js',
        './protractor/timeseries-analysis.spec.js'
    ],
    capabilities: {
        browserName: 'chrome',
        shardTestFiles: true,
        maxInstances: 2
    }
    

};