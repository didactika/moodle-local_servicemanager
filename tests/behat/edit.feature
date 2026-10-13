@local @local_servicemanager
Feature: Schema editing
  In order to update web service configurations
  As an administrator
  I need to edit existing schemas in the same form that creates them

  Background:
    Given I log in as "admin"
    And I have uploaded a schema with id "test.service"

  @javascript
  Scenario: Editing opens the creation form filled in with the schema
    Given I navigate to "Server > Web Service Manager > Dashboard" in site administration
    When I click on "Edit" "link" in the "test.service" "table_row"
    Then I should see "Edit Schema"
    And I should see "Guided form"
    And the field "Schema ID" matches value "test.service"
    And the field "Name" matches value "Test Service"
    And the field "Version" matches value "1.0.0"
    And I should not see "Generate token automatically"

  @javascript
  Scenario: Save schema changes from the guided form
    Given I navigate to "Server > Web Service Manager > Dashboard" in site administration
    When I click on "Edit" "link" in the "test.service" "table_row"
    And I set the field "Name" to "Updated Service"
    And I press "Save changes"
    Then I should see "was updated successfully"
    And I should see "Updated Service"

  @javascript
  Scenario: Save schema changes from the YAML editor
    Given I navigate to "Server > Web Service Manager > Dashboard" in site administration
    When I click on "Edit" "link" in the "test.service" "table_row"
    And I click on "YAML editor" "link"
    And I set the field "YAML Content" to multiline:
      """
      meta:
        id: "test.service"
        name: "Updated By Yaml"
        version: "1.0.0"
      definition:
        functions:
          - core_webservice_get_site_info
      """
    And I press "Save changes"
    Then I should see "was updated successfully"
    And I should see "Updated By Yaml"

  @javascript
  Scenario: The id of a schema cannot be changed
    Given I navigate to "Server > Web Service Manager > Dashboard" in site administration
    When I click on "Edit" "link" in the "test.service" "table_row"
    And I click on "YAML editor" "link"
    And I set the field "YAML Content" to multiline:
      """
      meta:
        id: "another.service"
        name: "Test Service"
        version: "1.0.0"
      definition:
        functions:
          - core_webservice_get_site_info
      """
    And I press "Save changes"
    Then I should not see "was updated successfully"

  @javascript
  Scenario: Cancel editing
    Given I navigate to "Server > Web Service Manager > Dashboard" in site administration
    When I click on "Edit" "link" in the "test.service" "table_row"
    And I press "Cancel"
    Then I should see "Test Service"
    And I should not see "Guided form"
