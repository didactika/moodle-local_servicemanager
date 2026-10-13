<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Behat steps for the fields of the forms of the plugin: the ones that suggest while the person types and the text of a field.
 *
 * @package    local_servicemanager
 * @category   test
 * @author     Eduardo Estrada <me@e2rd0.com>
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require_once(__DIR__ . '/../../../../lib/behat/behat_base.php');

/**
 * Steps for the fields of the forms.
 */
class behat_local_servicemanager_fields extends behat_base {
    /**
     * Type in an autocomplete field that asks the server for its suggestions and wait for them.
     *
     * Releases of Moodle before 5.0 do not wait for the answer of the server when the generic step types in such a field.
     *
     * @param string $field Label of the field.
     * @param string $value What to type.
     * @return \Behat\Mink\Element\NodeElement The text input of the field.
     */
    protected function type_in_suggesting_field(string $field, string $value) {
        $input = $this->find_field($field);
        $input->click();
        behat_base::type_keys($this->getSession(), str_split($value));
        $holder = $input->getParent()->getParent();
        for ($waited = 0; $waited < 100; $waited++) {
            if ($holder->find('css', '.form-autocomplete-suggestions > [role=option]') !== null) {
                break;
            }
            usleep(100000);
        }
        return $input;
    }

    /**
     * Type in a field that suggests and choose the first suggestion.
     *
     * @When I search for :value in the field :field and choose the first suggestion
     * @param string $value What to type.
     * @param string $field Label of the field.
     */
    public function i_search_for_in_the_field_and_choose_the_first_suggestion($value, $field) {
        $input = $this->type_in_suggesting_field($field, $value);
        $suggestion = $input->getParent()->getParent()->find('css', '.form-autocomplete-suggestions > [role=option]');
        if ($suggestion === null) {
            throw new Exception("The field '{$field}' did not suggest anything for '{$value}'");
        }
        $suggestion->click();
        behat_base::type_keys($this->getSession(), [behat_keys::ESCAPE]);
    }

    /**
     * Check how many suggestions a field gives for what is typed.
     *
     * @Then the field :field suggests at least :count options for :value
     * @param string $field Label of the field.
     * @param string $count Least number of suggestions.
     * @param string $value What to type.
     */
    public function the_field_suggests_at_least_options_for($field, $count, $value) {
        $input = $this->type_in_suggesting_field($field, $value);
        $found = count($input->getParent()->getParent()->findAll('css', '.form-autocomplete-suggestions > [role=option]'));
        behat_base::type_keys($this->getSession(), [behat_keys::ESCAPE]);
        if ($found < (int) $count) {
            throw new Exception("The field '{$field}' suggested {$found} options for '{$value}', not {$count}");
        }
    }

    /**
     * Check that the text field has a text that matches a regular expression.
     *
     * @Then the text of the field :field matches :pattern
     * @param string $field Label of the field.
     * @param string $pattern Regular expression.
     */
    public function the_text_of_the_field_matches($field, $pattern) {
        $value = (string) $this->find_field($field)->getValue();
        if (!preg_match($pattern, $value)) {
            throw new Exception("The field '{$field}' does not match {$pattern}: {$value}");
        }
    }
}
