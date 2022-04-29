export default class Piece {
  constructor(id) {
    this.id = id;
    this.pos = null;
    this.partyId = null;
    this.playerId = null;

    this.isSummoned = false;
    this.isSelectable = false;
  }
}
