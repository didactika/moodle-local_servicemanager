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

namespace local_servicemanager\output;

use core\output\react_component_renderable;

/**
 * Draws a page that a React component builds, with a placeholder that holds its place until the component is there.
 *
 * Moodle writes an empty element and the script fills it in once it has loaded, which leaves the page blank for a moment. The
 * placeholder is written inside that element and is replaced when the component mounts, so it costs nothing once the page is up.
 *
 * @package    local_servicemanager
 * @copyright  2026 Didactika.org
 * @author     Hector Arrechea <hectorlazaroarrechea@gmail.com>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class react_page {
    /** @var string[] The shapes of placeholder: a list with its tools, a page of cards in two columns, or a page of text. */
    public const SHAPES = ['list', 'detail', 'text'];

    /**
     * Draw a page.
     *
     * @param react_component_renderable $page The page.
     * @param string $shape One of the shapes of placeholder.
     * @return string The HTML.
     */
    public static function render(react_component_renderable $page, string $shape = 'text'): string {
        global $OUTPUT;

        $html = $OUTPUT->render($page);
        $placeholder = self::placeholder(in_array($shape, self::SHAPES, true) ? $shape : 'text');
        // The element is empty, so the placeholder goes right before its closing tag.
        return preg_replace('~</div>\s*$~', $placeholder . '</div>', $html, 1);
    }

    /**
     * The placeholder of a shape.
     *
     * @param string $shape The shape.
     * @return string The HTML.
     */
    private static function placeholder(string $shape): string {
        // The placeholders of Bootstrap: grey bars in the shape of what is coming, which glow while the page loads.
        $line = static fn(string $width, string $class = '') =>
            '<span class="placeholder d-block mb-2 ' . $class . '" style="width:' . $width . '"></span>';
        $card = static fn(string $body) => '<div class="card mb-3"><div class="card-body">' . $body . '</div></div>';
        $head = '<div class="mb-3">' . $line('14rem', 'placeholder-lg') . $line('7rem') . '</div>';

        switch ($shape) {
            case 'list':
                $rows = str_repeat('<div class="d-flex gap-3">' . $line('1rem') . $line('30%') . $line('10%') . $line('8%') .
                    $line('18%') . '</div>', 5);
                $body = $head . $card($line('100%', 'placeholder-lg')) . $card($line('18rem', 'placeholder-lg') . $rows);
                break;
            case 'detail':
                $rows = static fn(int $count) => str_repeat($line('35%') . $line('90%'), $count);
                $left = $card($line('11rem', 'placeholder-lg') . $line('60%') . $rows(2)) . $card($line('8rem', 'placeholder-lg') .
                    $rows(2)) . $card($line('12rem', 'placeholder-lg') . $rows(3));
                $right = $card($line('14rem', 'placeholder-lg') . $rows(3)) . $card($line('6rem', 'placeholder-lg') . $rows(3));
                $body = $head . '<div class="row"><div class="col-lg-7">' . $left . '</div><div class="col-lg-5">' . $right .
                    '</div></div>';
                break;
            default:
                $body = $head . $card($line('70%') . $line('95%') . $line('85%') . $line('60%') . $line('90%'));
        }
        return '<div class="placeholder-glow" aria-hidden="true">' . $body . '</div>'
            . '<span class="visually-hidden" role="status">' . get_string('loading', 'local_servicemanager') . '</span>';
    }
}
