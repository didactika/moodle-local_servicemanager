@local @local_serviceschema
Feature: Schema dashboard
  In order to manage web service schemas
  As an administrator
  I need to view and manage schemas from the dashboard

  Background:
    Given I log in as "admin"
    And I navigate to "Plugins > Local plugins > Service Schema Manager" in site administration

  @javascript
  Scenario: View empty dashboard
    Then I should see "Service Schema Manager"
    And I should see "Upload Schema"
    And I should see "No schemas found"

  @javascript
  Scenario: Navigate to upload page
    When I click on "Upload Schema" "link"
    Then I should see "Upload Schema"
    And I should see "YAML Schema File"

  @javascript
  Scenario: Navigate to documentation page
    When I click on "Upload Schema" "link"
    And I click on "View Documentation" "link"
    Then I should see "YAML Schema Reference"
    And I should see "Schema Structure"
    And I should see "Back"
