export default class Player {
    constructor(id, name, party) {
        this.id = id;
        this.name = name;
        this.rollResult = 0;
        this.hasRolled = false;
        this.hasMoved = false;

        this.party = party;
        this.party.playerId = this.id;
        this.party.pieces.forEach(piece => {piece.partyId = this.party.id; piece.playerId = this.id});
    }
}