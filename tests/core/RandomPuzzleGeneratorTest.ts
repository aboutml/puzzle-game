import {describe, it} from 'mocha';
import {expect} from 'chai';

import {RandomPuzzleGenerator} from '../../src/core/RandomPuzzleGenerator';
import {Puzzle} from '../../src/core/Puzzle';

describe('RandomPuzzleGenerator', function () {
    describe('#generate', function() {
        [1, 2, 3, 4, 5].forEach((attempt: number) => {
            it(`should generate solvable puzzle for attempt ${attempt}`, function() {
                const puzzle = RandomPuzzleGenerator.generate();

                expect(puzzle).to.be.an.instanceOf(Puzzle);
                expect(puzzle.tiles).is.an('array').lengthOf(16);
                expect(puzzle.tiles).has.members([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
                expect(puzzle.width).equals(4);
                expect(puzzle.height).equals(4);
                expect(puzzle.isSolvable()).equals(true);
            });
        });
    });
});
