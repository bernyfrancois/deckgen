// DeckGen by okafrancois
/**
@description Le script permet de générer un jeux de cartes(Deck)
Sur la base d'un nombre de symboles choisis par le joueur
Chaque cartes du deck contient 4 symboles
Qui forment une combinaison de symboles unique dans le deck
L'emplacement d'un symbole n'est pas une caractériste d'une carte
 **/

let startBtn = document.querySelector("#start");
let plyrNameZone = document.querySelector("#playerName");
let symbolsListZone = document.querySelector("#symbols");
let messageZone = document.querySelector("#message");

const allSymbols = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

class Player {
    /**
     *
     * @param {string} playerName le nom du joueur
     * @param {number} symbolsNb le nombre de symboles que le joueur souhaite utiliser pour son jeux de cartes
     */
    constructor(playerName, symbolsNb) {
        this.playerName = playerName;
        this.symbolNumber = symbolsNb ? symbolsNb : 10;
        this.symbols = this.getSymbols(this.symbolNumber, allSymbols);
        this.deck = [];

    }

    /**
     *
     * @param {number} symbolsqty le nombre de symbol que le joueur a choisis d'utiliser
     * @param {any[]} baseSymbols le tableau de symboles qu'on va réduire au à la quantité de symboles voulu par le joueur
     * @returns {any[]}
     */
    getSymbols(symbolsqty, baseSymbols){
        let base = baseSymbols.slice();
        base.splice(symbolsqty, base.length - symbolsqty);
        return base
    }
    listSymbols() {
        console.log(this.deck)
    }
    /**
     *
     * @param {any[]} baseSymbols la liste de symboles qu'on va utiliser pour générer le jeux de cartes
     * @descriptions Créer 4 tableaux à partir du tableau de base et génère des cartes valides à partir en parcourant ces tableaux
     */
    generateDeck(baseSymbols){
        let b0 = baseSymbols;
        b0.forEach((symbol, index) => {
            let b1 = b0.slice(index+1);
            let symbol1 = symbol;
            b1.forEach((symbol, index) => {
                let symbol2 = symbol;
                let b2 = b1.slice(index+1);
                b2.forEach((symbol, index) => {
                    let b3 = b2.slice(index+1);
                    let symbol3 = symbol;
                    b3.forEach((symbol, index) => {
                        let symbol4 = symbol;
                            let card = {
                                symbol1: symbol1,
                                symbol2: symbol2,
                                symbol3: symbol3,
                                symbol4: symbol4
                            }
                            this.deck.push(card)
                    } )
                })
            })
        });
    }
    describe(){
        plyrNameZone.textContent = this.playerName;
        symbolsListZone.textContent = this.symbols.join(", ");
        messageZone.textContent = `Pour une base de ${this.symbols.length} symboles vous avez ${this.deck.length} ${this.deck.length>1? 'cartes valides' : 'carte valide'} possible, ouvrez la console pour voir la liste des cartes`
    }
};

const startGame = () => {
    let playerNameIn = prompt("Bienvenue sur DeckGen\nSous quel nom veux-tu jouer ?");
    let symbolNumberiN = getSymbolNumber();
    let player1 = new Player(playerNameIn, symbolNumberiN)
    player1.generateDeck(player1.symbols);
    player1.describe();
    player1.listSymbols()
};

/**
 *
 * @returns {number} un nombre compris entre 4 et 21 rentré par l'utilisateur
 */
const getSymbolNumber = () => {
    let number;
    do {
        number = Number(prompt("Avec combien de symboles souhaite-tu jouer ? (entre de 4 à 21 possible)"));
    } while (isNaN(number) || number<4 || number>21)
    return number;
};

startBtn.addEventListener('click', startGame)