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
  Scenario: The page of a schema shows the state of the web services as the dashboard does
    Given I navigate to "Server > Web Service Manager > Dashboard" in site administration
    When I click on "Test Service" "link"
    Then I should see "Enable web services" in the "[data-region='ws-status']" "css_element"

  @javascript
  Scenario: A token is made after a confirmation and shown next to the button
    Given I navigate to "Server > Web Service Manager > Dashboard" in site administration
    When I click on "Test Service" "link"
    And I click on "Generate Token" "button"
    Then I should see "Make a token for this service?"
    When I click on "Generate Token" "button" in the "dialog[open], .modal.show" "css_element"
    Then I should see "Copy it now" in the "[data-region='fresh-token']" "css_element"
    And I should see "Regenerated" in the "body" "css_element"

  @javascript
  Scenario: A long list of capabilities has a button that shows all of them
    Given the schema "test.service" has many extra capabilities
    When I navigate to "Server > Web Service Manager > Dashboard" in site administration
    And I click on "Test Service" "link"
    Then I should not see "moodle/category:manage" in the "[data-region='access']" "css_element"
    When I click on "Show all 10" "button"
    Then I should see "moodle/category:manage" in the "dialog[open], .modal.show" "css_element"
