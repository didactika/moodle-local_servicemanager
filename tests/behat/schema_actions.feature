@local @local_servicemanager
Feature: Changing a schema without leaving its page
  In order to keep my place while I work on a schema
  As an administrator
  I need to disable it and make its token on the same page

  Background:
    Given I log in as "admin"
    And I have uploaded a schema with id "test.service"

  @javascript
  Scenario: Disabling a schema updates the page and says so
    Given I navigate to "Server > Web Service Manager > Dashboard" in site administration
    When I click on "Test Service" "link"
    And I click on "Disable" "button"
    Then I should see "was disabled"
    And I should see "Disabled" in the ".sm-page-header" "css_element"
    And "Enable" "button" should exist

  @javascript
  Scenario: A token is made after a confirmation and shown next to the button
    Given I navigate to "Server > Web Service Manager > Dashboard" in site administration
    When I click on "Test Service" "link"
    And I click on "Generate Token" "button"
    Then I should see "Make a token for this service?"
    When I click on "Generate Token" "button" in the "dialog[open]" "css_element"
    Then I should see "Copy it now" in the "[data-region='fresh-token']" "css_element"
    And I should see "Regenerated" in the "body" "css_element"
