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

namespace local_servicemanager;

/**
 * The caches of the plugin, found under the class name that the running Moodle has.
 *
 * Moodle moved its cache API into the core_cache namespace in 4.4 and kept the old global class only as an alias, so the class
 * that exists is the one used.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class cache_provider {
    /**
     * The session cache that holds a freshly generated token until it is shown once.
     *
     * @return \cache_loader The cache.
     */
    public static function newtoken() {
        $class = class_exists('core_cache\cache') ? 'core_cache\cache' : 'cache';
        return $class::make('local_servicemanager', 'newtoken');
    }
}
