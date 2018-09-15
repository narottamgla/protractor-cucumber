Feature: NLBC signup test
  As a user
  i want to test sign-up functionality of NLBC

  @dev
  Scenario: Verify NLBC Signup with invalid details
    Given I navigate to "https://nlbootcamps.com/register/student" page
    When I enter "user" , "fanme" , "lname" , "pasword" , "password" , "242424" , "Male"
    And  I clicks signUp button
    Then Sign-up to NLBC should unsuccessful

  @stag
  Scenario Outline: Verify NLBC Signup with invalid details
    Given I navigate to "https://nlbootcamps.com/register/student" page
    When I enter "<username>" , "<firstname>" , "<lastname>" , "<password>" , "<confirmpassword>" , "<phone>" , "<gender>"
    And I clicks signUp button
    Then Sign-up to NLBC should unsuccessful
    Examples:
      | username  | firstname | lastname | password   | confirmpassword | phone     | gender |
      | usertest  | testname  | tset     | password   | password        | 776655555 | Male   |
      | usertest1 | testname2 | tset 2   | password1  | password2       | 776655555 | Female |
      | usertest5 | testname2 | tset 12  | password12 | password21      | 776655555 | Female |