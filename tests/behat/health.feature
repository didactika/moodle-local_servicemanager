@local @local_servicemanager @javascript
Feature: Health checks of a schema
  In order to know how a schema has been doing
  As an administrator
  I need to see a summary of its health checks and all of them a page at a time

  Background:
    Given I log in as "admin"
    And I have uploaded a schema with id "test.service"
    And the schema "test.service" has 30 health checks

  Scenario: The page of a schema sums the checks up and leads to all of them
    When I navigate to "Server > Web Service Manager > Dashboard" in site administration
    And I click on "Test Service" "link"
    Then I should see "Latest check" in the "[data-region='health']" "css_element"
    And I should see "All checks passed" in the "[data-region='health']" "css_element"
    And "[data-region='health'] table" "css_element" should not exist
    When I click on "View all health checks" "link"
    Then I should see "Health checks"
    And I should see "Showing 1 to 25 of 30" in the "[data-region='health-showing']" "css_element"

  Scenario: The checks are shown a page at a time
    Given I am on the health checks page of the schema "test.service"
    When I click on "2" "link" in the ".pagination" "css_element"
    Then I should see "Showing 26 to 30 of 30" in the "[data-region='health-showing']" "css_element"

  Scenario: The checks are narrowed to one status
    Given I am on the health checks page of the schema "test.service"
    When I click on "Warning" "link" in the "[data-region='health-filters']" "css_element"
    Then I should see "Showing 1 to 10 of 10" in the "[data-region='health-showing']" "css_element"
    And I should see "Token: expired" in the "[data-region='health-table']" "css_element"
    And I should not see "Healthy" in the "[data-region='health-table']" "css_element"

  Scenario: A schema that was never checked says so
    Given the following schemas exist:
      | id            | name          | version |
      | other.service | Other Service | 1.0.0   |
    When I am on the health checks page of the schema "other.service"
    Then I should see "has not been checked yet"
