import { rollDie } from "./Utils.js";

export default class GameLogic {
  constructor(gameState) {
    this.gameState = gameState;
  }

  getPieceFromId(pieceId) {
    return this.gameState.pieces.find(piece => piece.id == pieceId)
  }

  getPlayerFromId(playerId) {
    return this.gameState.players.find(player => player.id == playerId);
  }
  
  moveButtonClick() {
    const player = this.getPlayerFromId(this.gameState.currentPlayer);

    if (player.hasRolled) return;

    this.gameState.rollResult = rollDie([1,2,3,4,5,6]);
    player.hasRolled = true;
    player.party.pieces.forEach(piece => piece.isSelectable = true);
  }

  selectPieceClick(piece) {
    if (piece.playerId != this.gameState.currentPlayer) return;

    const player = this.getPlayerFromId(this.gameState.currentPlayer);
    if (!player.hasRolled) return;

    this.movePiece(piece, this.gameState.rollResult);
    player.hasMoved = true;
    player.party.pieces.forEach(piece => piece.isSelectable = false);
    this.endTurn();
  }

  movePiece(piece, steps){
    const { map } = this.gameState; 

    map.cells[piece.pos].occuPieces = map.cells[piece.pos].occuPieces.filter(id => id != piece.id);
    for(let i = 0; i < steps; i++){
      piece.pos = map.cells[piece.pos].next[0];
    }
    
    map.cells[piece.pos].occuPieces.push(piece.id);
  }

  addPiece(piece, des){
    const { map } = this.gameState;

    map.cells[des].occuPieces.push(piece.id);
    piece.pos = des;
  }

  endTurn() {
    const { gameState } = this;
    const currIndex = gameState.turnOrder.indexOf(gameState.currentPlayer);

    const currentPlayer = this.getPlayerFromId(gameState.currentPlayer);
    currentPlayer.hasRolled = false;
    currentPlayer.hasMoved = false;
    currentPlayer.rollResult = 0;

    gameState.turn += 1;
    gameState.currentPlayer = gameState.turnOrder[(currIndex+1) % gameState.playerCount] ;

  }
}
