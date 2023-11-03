import {setScore, getScore} from "./utils.js";

export class Cell {
    constructor(x, y, element) {
        this.x = x;
        this.y = y;
        this.element = element;
    }

    linkTile(tile) {
        tile.setXY(this.x, this.y);
        this.linkedTile = tile;
    }

    getLinkedTile() {
        return this.linkedTile;
    }

    unlinkTile() {
        this.linkedTile = null;
    }

    isEmpty() {
        return !this.linkedTile;
    }

    linkTileForMerge(tile) {
        tile.setXY(this.x, this.y);
        this.linkedTileForMerge = tile;
    }
    unlinkTileForMerge() {
        this.linkedTileForMerge = null;
    }

    hasTileForMerge() {
        return !!this.linkedTileForMerge;
    }

    canAccept(newTile) {
        return (
            this.isEmpty() ||
            (!this.hasTileForMerge() && this.linkedTile.value === newTile.value)
        );
    }



    mergeTiles() {
        this.linkedTile.setValue(this.linkedTile.value << 1);
        setScore(getScore() + this.linkedTile.value);
        this.linkedTileForMerge.remove();
        this.unlinkTileForMerge();
    }

}
