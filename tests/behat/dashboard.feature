@local @local_servicemanager
Feature: Schema dashboard
  In order to manage web service schemas
  As an administrator
  I need to view and manage schemas from the dashboard

  Background:
    Given I log in as "admin"
    And I navigate to "Server > Web Service Manager > Dashboard" in site administration

  @javascript
  Scenario: View empty dashboard
    Then I should see "Web Service Manager"
    And I should see "Dashboard"
    And I should see "New schema"
    And I should see "Import Schemas"
    And I should see "No schemas have been defined yet"

  @javascript
  Scenario: The summary says how healthy the schemas are
    Given I have uploaded a schema with id "test.service"
    And I reload the page
    Then I should see "1 Healthy" in the "[data-region='summary']" "css_element"
    And I should see "0 Warning" in the "[data-region='summary']" "css_element"
    And I should see "Web services" in the "[data-region='ws-status']" "css_element"
    And I should see "Test Service" in the "test.service" "table_row"

  @javascript
  Scenario: A search that finds nothing says so and offers to clear it
    Given I have uploaded a schema with id "test.service"
    And I reload the page
    When I set the field "Search name..." to "nothing like this"
    Then I should see "No schemas found with the applied filters."
    And I should see "Clear" in the "[data-region='empty-state']" "css_element"

  @javascript
  Scenario: Typing in the search leaves only the schemas that match
    Given the following schemas exist:
      | id            | name           | version |
      | crm.sync      | CRM sync       | 1.0.0   |
      | reports.daily | Daily reports  | 1.0.0   |
    And I reload the page
    When I set the field "Search name..." to "reports"
    Then I should see "Daily reports" in the "reports.daily" "table_row"
    And I should not see "CRM sync"

  @javascript
  Scenario: The status is chosen in its menu, which says how many schemas each status has
    Given I have uploaded a schema with id "test.service"
    And I reload the page
    When I click on "Status" "button"
    Then I should see "Critical" in the "[data-menu='status']" "css_element"
    When I click on "Healthy" "text" in the "[data-menu='status']" "css_element"
    Then I should see "Test Service" in the "test.service" "table_row"
    And I should see "Healthy" in the "[data-menu='status'] > button" "css_element"

  @javascript
  Scenario: Choose a schema and the actions on it appear
    Given I have uploaded a schema with id "test.service"
    And I reload the page
    When I click on "Select all" "checkbox"
    Then I should see "1 selected" in the "[data-region='bulk-actions']" "css_element"
    And I should see "Export" in the "[data-region='bulk-actions']" "css_element"

  @javascript
  Scenario: Navigate to the import page
    When I click on "Import Schemas" "link"
    Then I should see "Import Schemas"
    And I should see "Import File"

  @javascript
  Scenario: Navigate to the documentation page
    When I click on "Import Schemas" "link"
    And I click on "View Documentation" "link"
    Then I should see "YAML Schema Reference"
    And I should see "Schema Structure"
    And I should see "Back"

  @javascript
  Scenario: Deleting the chosen schemas asks first and only then deletes
    Given I have uploaded a schema with id "test.service"
    And I reload the page
    When I click on "Select all" "checkbox"
    And I click on "Delete" "button" in the "[data-region='bulk-actions']" "css_element"
    Then I should see "Are you sure" in the "dialog[open], .modal.show" "css_element"
    When I click on "Cancel" "button" in the "dialog[open], .modal.show" "css_element"
    Then a schema with id "test.service" should exist

  @javascript
  Scenario: The web services and their protocols are turned on and off from the dashboard
    Given I have uploaded a schema with id "test.service"
    And I reload the page
    Then I should see "Enable web services" in the "[data-region='ws-status']" "css_element"
    When I click on "Enable web services" "button" in the "[data-region='ws-status']" "css_element"
    Then I should see "The web services of the site are on."
    When I click on "REST" "checkbox"
    Then I should see "The protocol REST is on."
    And I should see "Web services: Operational" in the "[data-region='ws-status']" "css_element"
    When I click on "Turn off web services" "button" in the "[data-region='ws-status']" "css_element"
    And I click on "Turn off web services" "button" in the ".modal.show" "css_element"
    Then I should see "The web services of the site are off."
    And I should see "Enable web services" in the "[data-region='ws-status']" "css_element"
