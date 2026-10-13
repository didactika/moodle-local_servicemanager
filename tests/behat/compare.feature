@local @local_servicemanager
Feature: Schema versions
  In order to know what a change did
  As an administrator
  I need to see the versions of a schema and compare two of them

  Background:
    Given I log in as "admin"
    And I have uploaded a schema with id "test.service"
    And the schema "test.service" has a second version

  @javascript
  Scenario: The history lists the versions and marks the current one
    When I am on the history page of the schema "test.service"
    Then I should see "Version History"
    And I should see "1.1.0" in the "[data-region='versions']" "css_element"
    And I should see "Current" in the "[data-region='versions']" "css_element"

  @javascript
  Scenario: Two versions are compared with what changed said in terms of the schema
    Given I am on the history page of the schema "test.service"
    When I click on "Choose version 1.0.0" "checkbox"
    And I click on "Choose version 1.1.0" "checkbox"
    And I press "Compare Versions"
    Then I should see "What changed" in the "[data-region='change-summary']" "css_element"
    And I should see "core_user_get_users" in the "[data-region='change-summary']" "css_element"
    And I should see "1.1.0" in the "[data-region='change-summary']" "css_element"
    And I should see "added" in the "[data-region='diff-counts']" "css_element"

  @javascript
  Scenario: The comparison can show only the changes or every line
    Given I am on the history page of the schema "test.service"
    And I click on "Choose version 1.0.0" "checkbox"
    And I click on "Choose version 1.1.0" "checkbox"
    And I press "Compare Versions"
    When I click on "Unified" "button"
    Then I should see "core_user_get_users" in the ".comparison-table" "css_element"
    And I click on "Only the changes" "checkbox"
    And I should see "meta:" in the ".comparison-table" "css_element"

  @javascript
  Scenario: The comparison is available only when two versions are chosen
    Given I am on the history page of the schema "test.service"
    Then "Compare Versions" "button" should not be visible
    When I click on "Choose version 1.0.0" "checkbox"
    Then the "Compare Versions" "button" should be disabled
    And I click on "Choose version 1.1.0" "checkbox"
    And the "Compare Versions" "button" should be enabled

  @javascript
  Scenario: Rolling back asks in a window and changes the history without leaving the page
    Given I am on the history page of the schema "test.service"
    Then I should see "currently 1.1.0"
    When I click on "Rollback" "button"
    Then I should see "Are you sure you want to rollback" in the "dialog[open], .modal.show" "css_element"
    When I click on "Rollback" "button" in the "dialog[open], .modal.show" "css_element"
    Then I should see "rolled back successfully"
    And I should see "currently 1.0.0"
    And "Rollback" "button" should exist
