var {defineSupportCode} = require('cucumber');
var signUpPage = require('../pages/signupPage.js');

defineSupportCode(function ({Given, When, Then}) {

    Given('I navigate to {stringInDoubleQuotes} page', function (url, callback) {
        browser.get(url);
        expect(signUpPage.isSignUpPageHeaderDisplayed()).to.eventually.to.equal(true).and.notify(callback);
        callback();
    });

    When('I enter {stringInDoubleQuotes} , {stringInDoubleQuotes} , {stringInDoubleQuotes} , {stringInDoubleQuotes} , {stringInDoubleQuotes} , {stringInDoubleQuotes} , {stringInDoubleQuotes}', function (username, fname, lname, password, cpassword, phone, gender, callback) {
        signUpPage.signUpTONLBC(username, fname, lname, password, cpassword, phone, gender)
        callback();
    });

    When('I clicks signUp button', function (callback) {
        signUpPage.clickSignUpButton();
        callback();
    });

    Then('Sign-up to NLBC should unsuccessful', function (callback) {
        expect(signUpPage.isSignUpPageHeaderDisplayed()).to.eventually.to.equal(true).and.notify(callback);
    });
});
