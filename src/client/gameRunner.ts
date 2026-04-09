import inquirer from 'inquirer';

import {RandomPuzzleGenerator} from '../core/RandomPuzzleGenerator';
import {Puzzle} from '../core/Puzzle';
import {size} from '../core/config.json';

const puzzle = RandomPuzzleGenerator.generate();

const isValidUserInput = (index: number): boolean => {
    if (isNaN(index)) {
        console.log('Inputs should have type number');
        return false;
    }

    return index >= 0 && index < size;
};

const printPuzzle = (puzzle: Puzzle): void => {
    const matrix = puzzle.to2D();
    let row = '';

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            row += `${matrix[i][j]} ${matrix[i][j] > 9 ? ' ' : '  '}`;
        }
        console.log(row);
        row = '';
    }
};

const processTap = async (): Promise<void> => {
    const {x, y} = await inquirer.prompt([
        {
            type: 'number',
            name: 'x',
            message: 'Enter x index:'
        },
        {
            type: 'number',
            name: 'y',
            message: 'Enter y index:'
        }
    ]);

    if (!isValidUserInput(x) || !(isValidUserInput(y))) return;

    puzzle.tap(x, y);

    printPuzzle(puzzle);
};

(async () => {
    console.log('Puzzle game: \n');
    console.log('To succeed in the game you need to order tiles from 1 to 15, tile 0 - empty. \n');

    printPuzzle(puzzle);

    console.log('\n');

    while(!puzzle.isSolved()) {
        await processTap();
    }

    console.log('Game is finished');
})();
