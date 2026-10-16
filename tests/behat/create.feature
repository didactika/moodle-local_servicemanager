@local @local_servicemanager
Feature: Schema creation
  In order to set up a web service without knowing the YAML format
  As an administrator
  I need to create schemas with a guided form or by writing their YAML

  Background:
    Given I log in as "admin"
    And I navigate to "Server > Web Service Manager > Dashboard" in site administration
    And I click on "New schema" "link"

  @javascript
  Scenario: Create a schema with the guided form
    Then I should see "Guided form"
    When I set the field "Schema ID" to "crm.sync"
    And I set the field "Name" to "CRM sync"
    And I search for "core_webservice_get_site_info" in the field "Required functions" and choose the first suggestion
    And I press "Create schema"
    Then I should see "was created successfully"
    And I should see "CRM sync"
    And I should see "core_webservice_get_site_info"
    And I should see "Token Generated Successfully"

  @javascript
  Scenario: The guided form asks for at least one function
    When I set the field "Schema ID" to "crm.sync"
    And I set the field "Name" to "CRM sync"
    And I press "Create schema"
    Then I should see "Choose at least one function."

  @javascript
  Scenario: The guided form says when the schema id is taken
    Given I have uploaded a schema with id "test.service"
    When I set the field "Schema ID" to "test.service"
    And I set the field "Name" to "Another name"
    And I search for "core_webservice_get_site_info" in the field "Required functions" and choose the first suggestion
    And I press "Create schema"
    Then I should see "A schema with ID \"test.service\" already exists."

  @javascript
  Scenario: The guided form can pass what was filled in to the YAML editor
    When I set the field "Schema ID" to "crm.sync"
    And I set the field "Name" to "CRM sync"
    And I search for "core_webservice_get_site_info" in the field "Required functions" and choose the first suggestion
    And I press "Review as YAML"
    Then I should see "YAML editor"
    And the text of the field "YAML Content" matches "/id: .crm.sync./"
    And the text of the field "YAML Content" matches "/core_webservice_get_site_info/"

  @javascript
  Scenario: The YAML that the guided form wrote warns before the page is left, since it is not saved
    Then leaving the page should not warn about unsaved changes
    When I set the field "Schema ID" to "crm.sync"
    And I set the field "Name" to "CRM sync"
    And I search for "core_webservice_get_site_info" in the field "Required functions" and choose the first suggestion
    And I press "Review as YAML"
    Then I should see "YAML editor"
    And leaving the page should warn about unsaved changes

  @javascript
  Scenario: A form that comes back with errors warns before the page is left, since what it has is not saved
    When I set the field "Schema ID" to "crm.sync"
    And I set the field "Name" to "CRM sync"
    And I press "Create schema"
    Then I should see "Choose at least one function."
    And leaving the page should warn about unsaved changes

  @javascript
  Scenario: Create a schema by writing its YAML
    When I follow "YAML editor"
    And I set the field "YAML Content" to multiline:
      """
      meta:
        id: "written.by.hand"
        name: "Written by hand"
        version: "1.0.0"
      definition:
        functions:
          - core_webservice_get_site_info
      """
    And I press "Create schema"
    Then I should see "was created successfully"
    And I should see "Written by hand"

  @javascript
  Scenario: A YAML that is not a schema is not created
    When I follow "YAML editor"
    And I set the field "YAML Content" to "this is not a schema"
    And I press "Create schema"
    Then I should not see "was created successfully"

  @javascript
  Scenario: The functions field suggests at least ten options as you type
    Then the field "Required functions" suggests at least "10" options for "core_"

  @javascript
  Scenario: The capabilities field suggests at least ten options as you type
    When I expand all fieldsets
    Then the field "Extra Capabilities" suggests at least "10" options for "moodle/"
