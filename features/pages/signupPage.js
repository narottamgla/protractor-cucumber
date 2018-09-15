// Page class for SignUp page

var SignUpPage = function () {

    var signuppageheader = element(by.css('#signInModal > div > h5'));
    var useremailTxBx = element(by.id('user_email'));
    var firstnameTxBx = element(by.id('firstname'));
    var lastnameTxBx = element(by.id('lastname'));
    var phoneNumberTxBx = element(by.id('phoneNumber'));
    var passwordTxBx = element(by.id('password'));
    var cpasswordTxBx = element(by.id('password2'));
    var signUpButton = element(by.xpath("//*[@id='registerForm']/input"));
    var genderDropdown = element(by.id("user_male"));
    var maleOption = element(by.xpath("//*[@id='user_male']/option[2]"));
    var femaleOption = element(by.xpath("//*[@id='user_male']/option[3]"))

    this.signUpTONLBC = function (user, firstname, lastname, password, cpassword, phone, gender) {
        browser.wait(EC.visibilityOf(useremailTxBx), 100000);
        useremailTxBx.clear().sendKeys(user);
        firstnameTxBx.clear().sendKeys(firstname);
        lastnameTxBx.clear().sendKeys(lastname);
        phoneNumberTxBx.clear().sendKeys(phone);
        browser.wait(EC.visibilityOf(passwordTxBx), 100000);
        passwordTxBx.clear().sendKeys(password);
        cpasswordTxBx.clear().sendKeys(cpassword);
        selectGender(gender)
    };

    this.clickSignUpButton = function () {
        browser.wait(EC.elementToBeClickable(signUpButton), 100000);
        signUpButton.click();
    }

    this.isSignUpPageHeaderDisplayed = function () {
        browser.wait(EC.elementToBeClickable(signuppageheader), 100000);
        return signuppageheader.isDisplayed();
    }

    var selectGender = function (gender) {
        browser.wait(EC.elementToBeClickable(genderDropdown), 100000);
        genderDropdown.click();
        if (gender.toLowerCase() == "male") {
            maleOption.click()
        } else {
            femaleOption.click();
        }
    }
};

module.exports = new SignUpPage();
