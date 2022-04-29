import PieceComponent from "./PieceComponent.js";
import CellComponent from "./CellComponent.js";

export default class GameUI {
    constructor(rootElement, gameLogic) {
        this.rootElement = rootElement;
        this.gameLogic = gameLogic;

        this.rootElement.innerHTML = "";

        this.pieceComponents = this.initPieceComponents();
        this.cellComponents = this.initCellComponents();

        this.boardContainer = this.initBoard();
        this.infoContainer = this.initInfo();
        this.commandContainer = this.initCommand();

        this.renderPieces();
        this.renderBoard();
        this.renderInfo();

        rootElement.append(this.boardContainer, this.infoContainer, this.commandContainer);
    }

    initBoard() {
        const boardContainer = document.createElement("div");
        boardContainer.classList.add("board-container");

        this.cellComponents.forEach(component => boardContainer.appendChild(component.element));
        
        return boardContainer;
    }

    initPieceComponents() {
        const { gameState } = this.gameLogic;
        const pieceComponents = [];

        for(let i = 0; i < gameState.pieces.length; i++){
            const pieceComponent = new PieceComponent(document.createElement("div"), gameState.pieces[i]);
            const {element, piece} = pieceComponent;
            element.classList.add("piece");
            element.textContent = piece.id;

            element.addEventListener("click", () => {
                this.gameLogic.selectPieceClick(piece);
                this.render();
            })
            pieceComponents.push(pieceComponent);
        }
        return pieceComponents;
    }

    initCellComponents() {
        const { gameState } = this.gameLogic;
        const cellComponents = [];

        for (let i = 0; i < gameState.map.width * gameState.map.height; i++){
            const cellComponent = new CellComponent(document.createElement("div"), gameState.map.cells[i]) ;
            const { element, cell } = cellComponent;
            
            switch (cell.type.name) {
                case "flag": element.classList.add("flag-cell"); break;
                case "star": element.classList.add("star-cell"); break;
                case "terrain": element.classList.add("terrain-cell"); break;
            }

            cell.occuPieces.forEach(pieceId => {
                element.appendChild(this.pieceComponents.find(component => component.piece.id == pieceId).element);
            })
            cellComponents.push(cellComponent);
        }
        return cellComponents;
    }

    initInfo() {
        const infoContainer = document.createElement("div");
        infoContainer.classList.add("info-container");

        return infoContainer;
    }

    initCommand() {
        const commandContainer = document.createElement("div");

        commandContainer.classList.add("command-container");

        const moveButton = document.createElement("button");
        moveButton.textContent = "Roll";

        moveButton.addEventListener("click", () => {
            this.gameLogic.moveButtonClick();
            this.render();
        })

        commandContainer.appendChild(moveButton);

        return commandContainer;
    }

    renderPieces() {
        this.pieceComponents.forEach(component => {
            const {element, piece} = component;

            if (piece.isSelectable) {
                element.classList.add("selectable");
            } else if (element.classList.contains("selectable")) {
                element.classList.remove("selectable");
            }
        })
    }

    renderBoard() {
        const { cellComponents } = this;

        cellComponents.forEach(cellComponent => {
            const { element, cell } = cellComponent;
            cell.occuPieces.forEach(pieceId => {
                element.appendChild(this.pieceComponents.find(component => component.piece.id == pieceId).element);
            })
        })  
    }

    renderInfo() {
        const { infoContainer } = this;

        infoContainer.innerHTML = "";

        const infoElement = document.createElement("div");
        const { gameState } = this.gameLogic;

        const turnElement = document.createElement("div");
        turnElement.textContent = `Turn: ${gameState.turn}`;
        infoElement.appendChild(turnElement);

        const currentPlayerElement = document.createElement("div");
        currentPlayerElement.textContent = `currentPlayer: ${gameState.currentPlayer}`;
        infoElement.appendChild(currentPlayerElement);

        const rollResultElement = document.createElement("div");
        rollResultElement.textContent = `rollResult: ${gameState.rollResult}`;
        infoElement.appendChild(rollResultElement);

        infoContainer.appendChild(infoElement);
    }

    render() {
        this.renderPieces();
        this.renderBoard();
        this.renderInfo();
    }
}