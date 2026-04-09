import {random} from 'lodash';

import {Puzzle} from './Puzzle';
import {size, puzzle_entry_states} from './config.json';

export class RandomPuzzleGenerator {
    /* Main idea of random puzzle generator - to use pre-generated solvable puzzles.
     * Thanks to it, our solution is scalable, and we don't need to check outside whether we could solve it.
     * If we decide to use only random - the amount of possible retries might be infinite (if we always generate non-solvable puzzle).
     * It's not difficult to create hundreds of solvable puzzles -> no impact on user experience.
     */
    public static generate(): Puzzle {
        return new Puzzle(puzzle_entry_states[random(0, puzzle_entry_states.length - 1)], size, size);
    }
}
