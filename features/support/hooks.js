// Before And After hooks used while feature executes

var outputDir = './reports/';
var screenshotDir = './reports/screenshots/';
var targetJson = outputDir + 'cucumber_report.json';

var JsonFormatter = require('cucumber').JsonFormatter;
var fse = require('fs-extra');
var reporter = require('cucumber-html-reporter');

var {defineSupportCode, After, Before} = require('cucumber');

defineSupportCode(function ({Before,registerHandler}) {
    registerHandler('BeforeFeatures', function () {
        var configData = require('../../data/config.json');
        console.log("Launching test in environment: ", browser.params.testEnv);
        config = configData[browser.params.testEnv];
        browser.driver.manage().window().maximize();
        browser.waitForAngularEnabled(false);
        browser.get(config.appUrl);

    });

    Before(function () {
        console.log("Before All hook====")
    });

    Before("@dev", function () {
        console.log("Execution started for Scenarios tag as @dev")
    });

    Before("@stag", function () {
        console.log("Execution started for Scenarios tag as @stag")
    });

});

defineSupportCode(function ({setDefaultTimeout}) {
    setDefaultTimeout(10 * 60 * 1000);
});

defineSupportCode(function ({After, registerListener}) {

    var writeScreenshotToFile = function (image) {

        if (!fse.existsSync(screenshotDir)) {
            fse.mkdirSync(screenshotDir);
        }
        var date = new Date();
        var timestamp = date.getTime();
        var filename = "error_" + timestamp + ".png";
        var stream = fse.createWriteStream(screenshotDir + filename);
        stream.write(image);
        stream.end();
    };

    After("@dev", function () {
        console.log("Execution done for Scenarios tag as @dev")
    });

    After("@stag", function () {
        console.log("Execution done for Scenarios tag as @stag")
    });

    After(function () {
        console.log("After All hook====")
    });

    After(function (scenario, done) {
        let self = this;
        if (scenario.isFailed()) {
            browser.takeScreenshot().then(function (png) {
                let decodedImage = new Buffer(png.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
                writeScreenshotToFile(decodedImage);
                self.attach(decodedImage, 'image/png');
                done();
            }, function (err) {
                done(err);
            });
        } else {
            done();
        }
    });

    var createHtmlReport = function (sourceJson) {

        var options = {
            theme: 'bootstrap',
            jsonFile: sourceJson,
            output: outputDir + 'cucumber_report.html',
            reportSuiteAsScenarios: true,
            launchReport: true
        };

        reporter.generate(options);
    };

    jsonFormatter = new JsonFormatter;
    jsonFormatter.log = function (string) {
        if (!fse.existsSync(outputDir)) {
            fse.mkdirSync(outputDir);
        }

        fse.writeFile(targetJson, string, function (err) {
            if (err) {
                console.log('Failed to save cucumber test results to json file.');
                console.log(err);
            } else {
                createHtmlReport(targetJson);
            }
        });
    };

    registerListener(jsonFormatter);
});
