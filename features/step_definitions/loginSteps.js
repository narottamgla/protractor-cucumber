var {defineSupportCode} = require('cucumber');

defineSupportCode(function ({Given, When, Then}) {

    Given('I navigate to {stringInDoubleQuotes}', function (stringInDoubleQuotes, callback) {
       // browser.waitForAngularEnabled(false);
        browser.get(stringInDoubleQuotes);
        expect(element(by.xpath("(.//a[@data-target='#signInModal'])[1]")).isDisplayed()).to.eventually.to.equal(true).and.notify(callback);
    });

    When('I click Login Menu on home page', function (callback) {
        element(by.xpath("(.//a[@data-target='#signInModal'])[1]")).click().then(function () {
            console.log("Clicked Login Menu")
            callback();
        })
    });

    Then('I should see many login page', function (callback) {
        browser.wait(EC.visibilityOf(element(by.css("#signInModal > div > div > div.modal-header > h5"))), 100000);
        expect(element(by.css("#signInModal > div > div > div.modal-header > h5")).isDisplayed()).to.eventually.to.equal(true).and.notify(callback);
    });

    When('I enter user name  as {stringInDoubleQuotes} & password as {stringInDoubleQuotes} as invalid', function (user, password, callback) {
        var userName = element(by.id("username"))
        var userPassword = element(by.xpath("(//*[@id=\"password\"])[2]"))
        browser.wait(EC.visibilityOf(userName), 100000);
        userName.clear().sendKeys(user);
        browser.wait(EC.visibilityOf(userName), 100000);
        userPassword.clear().sendKeys(password);
        callback();
    });

    When('I Click on login button', function (callback) {
        var loginButton = element(by.xpath("//*[@id='loginForm']/input"))
        loginButton.click();
        callback();
    });

    Then('I should not able to login', function (callback) {
        var loginButton = element(by.xpath("//*[@id='loginForm']/input"))
        expect(loginButton.isDisplayed()).to.eventually.to.equal(true).and.notify(callback);
    });

    When('I enter user name and password as invalid', function (dataTable, callback) {
            const data = dataTable.rowsHash();
            let userData = data.username;
            let passwordData = data.password;
            console.log("passwordData:" +passwordData)
            var userName = element(by.id("username"))
            var userPassword = element(by.xpath("(//*[@id=\"password\"])[2]"))
            browser.wait(EC.visibilityOf(userName), 100000);
            userName.clear().sendKeys(userData);
            browser.wait(EC.visibilityOf(userName), 100000);
            userPassword.clear().sendKeys(passwordData);
        callback();
    });

});
