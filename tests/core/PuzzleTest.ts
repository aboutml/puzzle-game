import {describe, it} from 'mocha';
import {expect} from 'chai';

import {Puzzle} from '../../src/core/Puzzle';

describe('Puzzle', function() {
    describe('#to2D', function () {
        it('should convert array into matrix representation', function() {
            const puzzle = new Puzzle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0], 4, 4);
            const matrix = puzzle.to2D();

            expect(matrix).is.not.undefined;
            expect(matrix).is.an('array').lengthOf(4);
            expect(matrix[0]).has.members([1, 2, 3, 4]);
            expect(matrix[1]).has.members([5, 6, 7, 8]);
            expect(matrix[2]).has.members([9, 10, 11, 12]);
            expect(matrix[3]).has.members([13, 14, 15, 0]);
        });
    });

    describe('#isSolvable', function () {
        it('should return false when puzzle is not solvable', function() {
            const puzzle = new Puzzle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 13, 14, 15], 4, 4);
            expect(puzzle.isSolvable()).equals(false);
        });

        it('should return true when puzzle is solvable', function() {
            const puzzle = new Puzzle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0], 4, 4);
            expect(puzzle.isSolvable()).equals(true);
        });
    });

    describe('#isSolved', function () {
        it('should return true when puzzle is solved', function() {
            const puzzle = new Puzzle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 4, 4);
            expect(puzzle.isSolved()).equals(true);
        });

        it('should return false when puzzle is not solved', function() {
            const puzzle = new Puzzle([15, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1], 4, 4);
            expect(puzzle.isSolved()).equals(false);
        });
    });

    describe('#tap', function() {
        it('should throw error if x is out of range', function() {
            const puzzle = new Puzzle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 13, 14, 15], 4, 4);

            try {
                puzzle.tap(10, 0);
                expect.fail('Error is not thrown');
            } catch (err) {
                expect(err.toString()).includes('X is out of range');
            }
        });

        it('should throw error if y is out of range', function() {
            const puzzle = new Puzzle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 13, 14, 15], 4, 4);

            try {
                puzzle.tap(0, 10);
                expect.fail('Error is not thrown');
            } catch (err) {
                expect(err.toString()).includes('Y is out of range');
            }
        });

        it('should not move puzzle when tap is on empty tile', function() {
            const puzzle = new Puzzle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 13, 14, 15], 4, 4);
            const meta = puzzle.tap(0, 3);

            expect(meta).is.not.undefined;
            expect(meta).has.property('x', 0);
            expect(meta).has.property('y', 3);
            expect(meta).has.property('index', 12);
            expect(meta).has.property('piece', 0);
            expect(meta?.movedTile).is.null;
        })

        it('should move puzzle when x = 0, y = 2', function() {
            const puzzle = new Puzzle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 13, 14, 15], 4, 4);
            const meta = puzzle.tap(0, 2);

            expect(meta).is.not.undefined;
            expect(meta).has.property('x', 0);
            expect(meta).has.property('y', 2);
            expect(meta).has.property('index', 8);
            expect(meta).has.property('piece', 0);
            expect(meta?.movedTile).is.not.undefined;
            expect(meta?.movedTile).has.property('index', 8);
            expect(meta?.movedTile).has.property('id', 9);
        });

        it('should move puzzle when x = 1, y = 3', function() {
            const puzzle = new Puzzle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 13, 14, 15], 4, 4);
            const meta = puzzle.tap(1, 3);

            expect(meta).is.not.undefined;
            expect(meta).has.property('x', 1);
            expect(meta).has.property('y', 3);
            expect(meta).has.property('index', 13);
            expect(meta).has.property('piece', 0);
            expect(meta?.movedTile).is.not.undefined;
            expect(meta?.movedTile).has.property('index', 13);
            expect(meta?.movedTile).has.property('id', 13);
        });

        it('should not move puzzle when tap is no near empty tile', function() {
            const puzzle = new Puzzle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 13, 14, 15], 4, 4);
            const meta = puzzle.tap(0, 0);

            expect(meta).is.not.undefined;
            expect(meta).has.property('x', 0);
            expect(meta).has.property('y', 0);
            expect(meta).has.property('index', 0);
            expect(meta).has.property('piece', 1);
            expect(meta?.movedTile).is.null;
        });
    });
});
