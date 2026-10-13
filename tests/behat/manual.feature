@local @local_servicemanager @javascript @servicemanager_manual
Feature: The screenshots of the wiki
  In order to keep the wiki true to the interface
  As a maintainer
  I need the screenshots to be taken from the real pages, with data that makes them worth looking at

  Background:
    Given I log in as "admin"
    And I change viewport size to "1500x1000"
    And the following schemas exist:
      | id                | name                 | version |
      | crm.integration   | CRM integration      | 2.1.0   |
      | reports.readonly  | Reports (read-only)  | 1.0.0   |
      | lms.sync          | LMS synchronisation  | 1.4.2   |
    And the schema "crm.integration" has a second version

  Scenario: The dashboard
    When I navigate to "Server > Web Service Manager > Dashboard" in site administration
    And I wait "2" seconds
    And I take a screenshot of the page as "dashboard"
    And I click on "Select all" "checkbox"
    And I wait "1" seconds
    And I take a screenshot of the page as "dashboard-selection"

  Scenario: The dashboard in the dark mode
    Given colour modes are enabled for the screenshots
    When I navigate to "Server > Web Service Manager > Dashboard" in site administration
    And I show the page in dark mode
    And I wait "2" seconds
    And I take a screenshot of the page as "dashboard-dark"

  Scenario: A schema
    When I navigate to "Server > Web Service Manager > Dashboard" in site administration
    And I click on "CRM integration" "link"
    And I wait "2" seconds
    And I take a screenshot of the page as "schema"

  Scenario: The versions and their comparison
    Given I am on the history page of the schema "crm.integration"
    And I wait "2" seconds
    And I take a screenshot of the page as "history"
    And I click on "Choose version 2.1.0" "checkbox"
    And I click on "Choose version 2.2.0" "checkbox"
    And I wait "1" seconds
    And I take a screenshot of the page as "history-compare"
    And I press "Compare Versions"
    And I wait "2" seconds
    And I take a screenshot of the page as "compare"

  Scenario: Creating a schema
    When I navigate to "Server > Web Service Manager > Dashboard" in site administration
    And I click on "New schema" "link"
    And I wait "2" seconds
    And I take a screenshot of the page as "create-guided"
    And I follow "YAML editor"
    And I wait "1" seconds
    And I take a screenshot of the page as "create-yaml"
