import {range} from 'lodash';

import {TapData} from './interfaces/TapData';
import {MovedTile} from './interfaces/MovedTile';

export class Puzzle {
    public readonly width: number;
    public readonly height: number;

    public tiles: number[] = [];

    public constructor(tiles: number[], height: number, width: number) {
        this.tiles.push(...tiles);
        this.height = this.height ?? height;
        this.width =  this.width ?? width;
    }

    public to2D(): number[][] {
        const matrixRepresentation = [];

        for (let j = 0; j < this.height; j++) {
            matrixRepresentation.push(this.tiles.slice(j * this.width, (j + 1) * this.width));
        }

        return matrixRepresentation;
    }

    public isSolvable(): boolean {
        const puzzle = this.tiles.slice();

        const emptyTileIndex = this.tiles.indexOf(0);
        const inversionList = puzzle.map((value, i) => puzzle.slice(i).filter(x => x && x < value).length);
        const inversionCount = inversionList.reduce((a, b) => a + b);

        return emptyTileIndex >= 0 && !((inversionCount + emptyTileIndex + 1) % 2);
    }

    public isSolved(): boolean {
        return range(1, this.tiles.length).every((n, i) => this.tiles[i] === n);
    }

    public tap(x: number, y: number): TapData | null {
        if (!Number.isInteger(x) || x < 0 || this.width <= x) throw new Error('X is out of range');
        if (!Number.isInteger(y) || y < 0 || this.height <= y) throw new Error('Y is out of range');

        const tappedTileIndex = x + y * this.width;
        const movedTile: MovedTile = this.getMovedTile(x, y, tappedTileIndex);

        return {
            x,
            y,
            index: tappedTileIndex,
            piece: this.tiles[tappedTileIndex],
            movedTile
        };
    }

    private getMovedTile(x: number, y: number, tappedTileIndex: number): MovedTile | null {
        const emptyTileIndex = this.tiles.indexOf(0);
        const emptyTileX = emptyTileIndex % this.width;
        const emptyTileY = Math.floor(emptyTileIndex / this.width);

        const isSameX = emptyTileX === x;

        if (isSameX && (emptyTileY === y)) return null;

        let movedTile: MovedTile = null;

        if (Puzzle.isNeighbour(x, emptyTileX, y, emptyTileY)) {
            movedTile = {index: tappedTileIndex, id: this.tiles[tappedTileIndex]};
            this.swapTiles(tappedTileIndex, emptyTileIndex);
        }

        return movedTile;
    }

    private static isNeighbour(x1: number, x2: number, y1: number, y2: number): boolean {
        return (Math.abs(x1 - x2) === 1 && y1 === y2) || (Math.abs(y1 - y2) === 1 && x1 === x2)
    }

    private swapTiles(tileIndex1: number, tileIndex2: number): void {
        [this.tiles[tileIndex1], this.tiles[tileIndex2]] = [this.tiles[tileIndex2], this.tiles[tileIndex1]];
    }
}
