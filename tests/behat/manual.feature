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
    And I draw the numbered marks:
      | selector                    | number | where     |
      | [data-region='ws-status']   | 1      | top-left  |
      | .sm-health                  | 2      | top-left  |
      | .sm-search                  | 3      | top-left  |
      | .sm-filter > .btn           | 4      | top-left  |
      | .sm-toolbar-actions         | 5      | top-right |
      | table tbody tr .sm-group    | 6      | top-right |
    And I take a screenshot of the page as "dashboard-marked"
    And I remove the numbered marks
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
    And I draw the numbered marks:
      | selector                    | number | where     |
      | [data-region='ws-status']   | 1      | top-left  |
      | [data-region='details']     | 2      | top-left  |
      | [data-region='details'] .sm-group | 3 | top-right |
      | .col-lg-4 .sm-panel, .sm-side .sm-panel | 4 | top-left |
      | .sm-functions, [data-region='functions'] | 5 | top-left |
    And I take a screenshot of the page as "schema-marked"
    And I remove the numbered marks

  Scenario: The versions and their comparison
    Given I am on the history page of the schema "crm.integration"
    And I wait "2" seconds
    And I take a screenshot of the page as "history"
    And I draw the numbered marks:
      | selector                | number | where    |
      | .sm-search              | 1      | top-left |
      | .sm-filter > .btn       | 2      | top-left |
      | [data-region='version'] | 3      | top-left |
      | [data-region='version'] .sm-group | 4 | top-right |
    And I take a screenshot of the page as "history-marked"
    And I remove the numbered marks
    And I click on "Choose version 2.1.0" "checkbox"
    And I click on "Choose version 2.2.0" "checkbox"
    And I wait "1" seconds
    And I take a screenshot of the page as "history-compare"
    And I press "Compare Versions"
    And I wait "2" seconds
    And I take a screenshot of the page as "compare"
    And I draw the numbered marks:
      | selector                       | number | where     |
      | [data-region='change-summary'] | 1      | top-left  |
      | [data-region='diff-tools']     | 2      | top-left  |
      | .comparison-table              | 3      | top-left  |
      | [data-region='change-navigator'] | 4    | top-left  |
    And I take a screenshot of the page as "compare-marked"
    And I remove the numbered marks
    And I click on "Next change" "button"
    And I wait "1" seconds
    And I take a screenshot of the page as "compare-next"

  Scenario: The window that asks before a rollback
    Given I am on the history page of the schema "crm.integration"
    And I wait "2" seconds
    When I click on "Rollback" "button"
    And I wait "1" seconds
    And I take a screenshot of the page as "history-rollback"

  Scenario: Creating a schema
    When I navigate to "Server > Web Service Manager > Dashboard" in site administration
    And I click on "New schema" "link"
    And I wait "2" seconds
    And I take a screenshot of the page as "create-guided"
    And I follow "YAML editor"
    And I wait "1" seconds
    And I take a screenshot of the page as "create-yaml"

  Scenario: The menus of the dashboard
    When I navigate to "Server > Web Service Manager > Dashboard" in site administration
    And I click on "Filters" "button"
    And I wait "1" seconds
    And I take a screenshot of the page as "dashboard-filters"
    And I click on "Filters" "button"
    And I click on "Documentation" "button"
    And I wait "1" seconds
    And I take a screenshot of the page as "dashboard-documentation-menu"

  Scenario: A schema with a role and the capabilities of a function
    Given the schema "crm.integration" has a role section
    When I navigate to "Server > Web Service Manager > Dashboard" in site administration
    And I click on "CRM integration" "link"
    And I wait "2" seconds
    And I take a screenshot of the page as "schema-role"
    And I click on "capabilities" "button"
    And I wait "1" seconds
    And I take a screenshot of the page as "schema-capabilities"

  Scenario: Editing a schema in the form that creates it
    When I navigate to "Server > Web Service Manager > Dashboard" in site administration
    And I click on "Edit" "link" in the "crm.integration" "table_row"
    And I wait "2" seconds
    And I take a screenshot of the page as "edit-guided"

  Scenario: The documentation and the import page
    When I open the page "documentation.php" of the plugin
    And I wait "2" seconds
    And I take a screenshot of the page as "documentation"
    And I open the page "import.php" of the plugin
    And I wait "2" seconds
    And I take a screenshot of the page as "import"
