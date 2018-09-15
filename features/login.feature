Feature: NLBC Login test
  As a user
  i want to test Login functionality of NLBC

  Background:
    Given I navigate to "http://www.nlbootcamps.com/"

  Scenario: Verify NLBC login with invalid credentials
    When I click Login Menu on home page
    Then I should see many login page
    When I enter user name  as "testu" & password as "testpass" as invalid
    And  I Click on login button
    Then I should not able to login

  Scenario: Verify NLBC login with invalid credentials using datatable
    When I click Login Menu on home page
    Then I should see many login page
    When I enter user name and password as invalid
      | username | testuser     |
      | password | testpassword |
    And  I Click on login button
    Then I should not able to login