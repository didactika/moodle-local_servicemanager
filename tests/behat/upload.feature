@local @local_serviceschema
Feature: Schema upload
  In order to create web services from YAML
  As an administrator
  I need to upload and process schema files

  Background:
    Given I log in as "admin"
    And I navigate to "Plugins > Local plugins > Service Schema Manager" in site administration

  @javascript @_file_upload
  Scenario: Upload valid YAML schema
    When I click on "Upload Schema" "link"
    And I upload "local/serviceschema/examples/sample_schema.yaml" file to "YAML Schema File" filemanager
    And I set the field "Generate token automatically" to "1"
    And I press "Upload Schema"
    Then I should see "Schema created successfully"
    And I should see "Token generated"

  @javascript
  Scenario: Attempt upload without file
    When I click on "Upload Schema" "link"
    And I press "Upload Schema"
    Then I should see "Required"

  @javascript
  Scenario: View uploaded schema details
    Given I have uploaded a schema with id "test.service"
    When I click on "Test Service" "link"
    Then I should see "test.service"
    And I should see "Functions"
    And I should see "Back"
